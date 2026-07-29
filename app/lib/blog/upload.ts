"use client";

import { browserClient } from "../supabase/browser";
import { MEDIA_BUCKET } from "../supabase/config";
import { slugify } from "./format";

/** Rejected before we try to decode it — a guard against absurd input. */
const MAX_SOURCE_BYTES = 25 * 1024 * 1024;
/** What may actually reach the bucket, measured after re-encoding. */
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

/**
 * Covers double as the Open Graph image, and social scrapers fetch the stored
 * file directly instead of going through next/image. JPEG is the format every
 * scraper decodes, so a cover is never WebP — WhatsApp silently drops the
 * preview otherwise. 2400px covers the 1000px hero container at 2x.
 *
 * In-article images are emitted as a plain <img> inside body_html, which
 * next/image never sees either, but only browsers load those. WebP is safe
 * there and roughly a third smaller. 1600px covers the 720px article column
 * at 2x.
 */
const RULES = {
  cover: { maxEdge: 2400, type: "image/jpeg", extension: "jpg", matte: true },
  inline: { maxEdge: 1600, type: "image/webp", extension: "webp", matte: false },
} as const;

export type MediaKind = keyof typeof RULES;
type Rule = (typeof RULES)[MediaKind];

/** Tried in order until one lands under MAX_UPLOAD_BYTES. */
const QUALITY_STEPS = [0.82, 0.7, 0.6];

export type UploadResult =
  | { ok: true; url: string; path: string }
  | { ok: false; error: string };

const mb = (bytes: number) => (bytes / 1024 / 1024).toFixed(1);

function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("undecodable"));
    img.src = url;
  });
}

function toBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

/**
 * Downscales and re-encodes in the browser before anything is sent.
 *
 * Returns null whenever the original should be uploaded untouched — an
 * undecodable file, a format that must not be resampled, or a re-encode that
 * came out no smaller than what we started with.
 *
 * Stripping EXIF is a side effect of drawing to a canvas, and a welcome one:
 * phone photos carry GPS coordinates and the bucket is public.
 */
async function reencode(
  file: File,
  rule: Rule
): Promise<{ blob: Blob; extension: string } | null> {
  // Re-encoding a GIF keeps only the first frame, and an SVG has no pixels to
  // resample. Both go up exactly as they arrived.
  if (file.type === "image/gif" || file.type === "image/svg+xml") return null;

  let source: ImageBitmap | HTMLImageElement | null = null;
  let objectUrl: string | null = null;

  try {
    if (typeof createImageBitmap === "function") {
      // "from-image" applies the EXIF rotation a phone camera writes. Without
      // it, portrait photos land sideways.
      source = await createImageBitmap(file, { imageOrientation: "from-image" });
    } else {
      objectUrl = URL.createObjectURL(file);
      source = await loadImageElement(objectUrl);
    }

    const { width, height } = source;
    if (!width || !height) return null;

    const scale = Math.min(1, rule.maxEdge / Math.max(width, height));
    const targetWidth = Math.round(width * scale);
    const targetHeight = Math.round(height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // JPEG has no alpha channel, so transparent pixels encode as black unless
    // something opaque is painted underneath first.
    if (rule.matte) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }
    ctx.drawImage(source, 0, 0, targetWidth, targetHeight);

    for (const quality of QUALITY_STEPS) {
      const blob = await toBlob(canvas, rule.type, quality);
      if (!blob) return null;
      if (blob.size > MAX_UPLOAD_BYTES) continue;

      // An already-optimised file that needed no downscaling can come back
      // larger than it went in. Keep whichever is smaller.
      if (scale === 1 && blob.size >= file.size) return null;
      return { blob, extension: rule.extension };
    }

    return null;
  } catch {
    // Nothing here is worth failing an upload over — send the original and let
    // the size check below have the final say.
    return null;
  } finally {
    if (source && "close" in source) source.close();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }
}

/**
 * Uploads straight from the browser to Supabase Storage.
 *
 * The bucket's insert policy requires an admin, so the session cookie does
 * the authorising — no service-role key ever reaches the client.
 */
export async function uploadMedia(
  file: File,
  kind: MediaKind = "inline"
): Promise<UploadResult> {
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "That file isn't an image." };
  }
  if (file.size > MAX_SOURCE_BYTES) {
    return {
      ok: false,
      error: `That image is ${mb(file.size)} MB — please keep uploads under ${MAX_SOURCE_BYTES / 1024 / 1024} MB.`,
    };
  }

  const optimized = await reencode(file, RULES[kind]);
  const payload: Blob = optimized?.blob ?? file;

  if (payload.size > MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      error: `That image is still ${mb(payload.size)} MB after compression — please upload a smaller one.`,
    };
  }

  const supabase = browserClient();

  const extension =
    optimized?.extension ?? (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  // Random suffix keeps same-named uploads from colliding.
  const suffix = Math.random().toString(36).slice(2, 8);
  const now = new Date();
  const folder = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}`;
  const path = `${folder}/${base}-${suffix}.${extension}`;

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, payload, {
    cacheControl: "31536000",
    upsert: false,
    // A Blob carries no filename for Supabase to sniff a type from, so the
    // content type has to be stated or the object is served as octet-stream.
    contentType: payload.type || file.type,
  });

  if (error) {
    const message = /row-level security|Unauthorized/i.test(error.message)
      ? "Upload refused — this account isn't on the admin roster."
      : error.message;
    return { ok: false, error: message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);

  return { ok: true, url: publicUrl, path };
}
