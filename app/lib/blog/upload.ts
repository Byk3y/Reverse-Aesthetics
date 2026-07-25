"use client";

import { browserClient } from "../supabase/browser";
import { MEDIA_BUCKET } from "../supabase/config";
import { slugify } from "./format";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export type UploadResult =
  | { ok: true; url: string; path: string }
  | { ok: false; error: string };

/**
 * Uploads straight from the browser to Supabase Storage.
 *
 * The bucket's insert policy requires an admin, so the session cookie does
 * the authorising — no service-role key ever reaches the client.
 */
export async function uploadMedia(file: File): Promise<UploadResult> {
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "That file isn't an image." };
  }
  if (file.size > MAX_BYTES) {
    return {
      ok: false,
      error: `That image is ${(file.size / 1024 / 1024).toFixed(1)} MB — please keep uploads under 8 MB.`,
    };
  }

  const supabase = browserClient();

  const extension = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  // Random suffix keeps same-named uploads from colliding.
  const suffix = Math.random().toString(36).slice(2, 8);
  const now = new Date();
  const folder = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}`;
  const path = `${folder}/${base}-${suffix}.${extension}`;

  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { cacheControl: "31536000", upsert: false });

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
