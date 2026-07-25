/** Shared formatting helpers for the blog (public + admin). */

export function formatDate(value: string | null | undefined): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(value: string | null | undefined): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** ~200 wpm, rounded up, floor of 1. */
export function readingMinutes(html: string): number {
  const words = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Light sanitiser for stored article HTML.
 *
 * Bodies are written by authenticated admins through Tiptap, so this isn't
 * the primary defence — it's a backstop against a pasted payload surviving
 * into `dangerouslySetInnerHTML`.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<\s*(script|style|iframe|object|embed|form)[^>]*>[\s\S]*?<\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|style|iframe|object|embed|form)[^>]*\/?>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, "")
    .replace(/(href|src)\s*=\s*"\s*javascript:[^"]*"/gi, '$1="#"')
    .replace(/(href|src)\s*=\s*'\s*javascript:[^']*'/gi, "$1='#'");
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Pull h2/h3 headings out of the rendered body and give each a stable id,
 * so the article page can render a table of contents that actually links
 * somewhere. Returns the rewritten HTML alongside the headings.
 */
export function extractHeadings(html: string): {
  html: string;
  headings: Heading[];
} {
  if (!html) return { html: "", headings: [] };

  const headings: Heading[] = [];
  const used = new Set<string>();

  const rewritten = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, levelStr: string, attrs: string, inner: string) => {
      const level = Number(levelStr) as 2 | 3;
      const text = inner.replace(/<[^>]*>/g, "").trim();
      if (!text) return `<h${level}${attrs}>${inner}</h${level}>`;

      let id = slugify(text) || `section-${headings.length + 1}`;
      let n = 2;
      while (used.has(id)) id = `${slugify(text)}-${n++}`;
      used.add(id);

      headings.push({ id, text, level });

      // Drop any id the editor may have emitted, then set ours.
      const cleaned = attrs.replace(/\s*id="[^"]*"/gi, "");
      return `<h${level}${cleaned} id="${id}">${inner}</h${level}>`;
    }
  );

  return { html: rewritten, headings };
}
