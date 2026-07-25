/**
 * Turns the files in content/posts/ into SQL that upserts them into Supabase.
 *
 * Why this exists: a post is stored twice — `body` holds Tiptap JSON (what the
 * editor loads) and `body_html` holds the rendered HTML (what the public page
 * prints). Hand-writing both invites them to drift, and a post whose JSON is
 * empty opens blank in the editor and loses its HTML on the next save.
 *
 * So the HTML in a content file is treated as a draft, not as truth. It gets
 * parsed into Tiptap JSON using the *same extension list the editor registers*,
 * then serialised back out. Anything the editor can't represent is dropped here
 * rather than silently disappearing the first time someone opens the post.
 *
 *   node scripts/build-post-sql.mjs            # write scripts/out/posts.sql
 *   node scripts/build-post-sql.mjs --slug=x   # just one post
 */

import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { generateHTML, generateJSON } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { Image as TiptapImage } from "@tiptap/extension-image";
import { Link as TiptapLink } from "@tiptap/extension-link";

const HERE = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(HERE, "..", "content", "posts");
const OUT_FILE = join(HERE, "out", "posts.sql");

/**
 * Must mirror app/components/admin/RichTextEditor.tsx. If the editor gains an
 * extension, add it here too, or authored content using it will be stripped.
 */
const EXTENSIONS = [
  StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: false }),
  TiptapLink.configure({
    openOnClick: false,
    autolink: true,
    HTMLAttributes: { rel: "noopener noreferrer" },
  }),
  TiptapImage.configure({ HTMLAttributes: { loading: "lazy" } }),
];

/** Mirrors readingMinutes() in app/admin/actions.ts. */
function readingMinutes(html) {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Postgres string literal. Doubling the quote is the whole escape rule. */
const lit = (value) =>
  value == null ? "null" : `'${String(value).replace(/'/g, "''")}'`;

/**
 * Dollar-quoted literal, for blobs where escaping every quote would be
 * unreadable. The tag is chosen to not appear in the payload.
 */
function dollar(value, tag) {
  const body = typeof value === "string" ? value : JSON.stringify(value);
  if (body.includes(`$${tag}$`)) {
    throw new Error(`Dollar-quote tag $${tag}$ collides with content`);
  }
  return `$${tag}$${body}$${tag}$`;
}

function statementFor(post, json, html) {
  const { meta } = post;

  for (const field of ["slug", "title", "category", "author"]) {
    if (!meta[field]) throw new Error(`${meta.slug ?? "post"}: missing "${field}"`);
  }
  if (meta.status && !["draft", "scheduled", "published"].includes(meta.status)) {
    throw new Error(`${meta.slug}: bad status "${meta.status}"`);
  }

  return `
-- ${meta.slug}
insert into public.posts (
  slug, title, excerpt, body, body_html,
  category_id, author_id, reviewer_id,
  status, published_at, featured, reading_minutes,
  key_takeaways, faqs, seo_title, seo_description
)
select
  ${lit(meta.slug)}, ${lit(meta.title)}, ${lit(meta.excerpt)},
  ${dollar(json, "body_json")}::jsonb,
  ${dollar(html, "body_html")},
  c.id, a.id, ${meta.reviewer ? "r.id" : "null"},
  ${lit(meta.status ?? "draft")}, ${meta.published_at ? lit(meta.published_at) : "null"},
  ${meta.featured ? "true" : "false"}, ${readingMinutes(html)},
  ${dollar(meta.key_takeaways ?? [], "kt")}::jsonb,
  ${dollar(meta.faqs ?? [], "faq")}::jsonb,
  ${lit(meta.seo_title)}, ${lit(meta.seo_description)}
from public.categories c
join public.authors a on a.slug = ${lit(meta.author)}
${meta.reviewer ? `join public.authors r on r.slug = ${lit(meta.reviewer)}` : ""}
where c.slug = ${lit(meta.category)}
on conflict (slug) do update set
  title           = excluded.title,
  excerpt         = excluded.excerpt,
  body            = excluded.body,
  body_html       = excluded.body_html,
  category_id     = excluded.category_id,
  author_id       = excluded.author_id,
  reviewer_id     = excluded.reviewer_id,
  reading_minutes = excluded.reading_minutes,
  key_takeaways   = excluded.key_takeaways,
  faqs            = excluded.faqs,
  seo_title       = excluded.seo_title,
  seo_description = excluded.seo_description
-- Deliberately NOT overwriting status, published_at, or the image columns:
-- those are owned by whoever is working in the admin, and clobbering them
-- would unpublish a live post or wipe an uploaded cover on every re-run.
;`.trim();
}

const only = process.argv.find((a) => a.startsWith("--slug="))?.slice(7);

const files = (await readdir(POSTS_DIR))
  .filter((f) => f.endsWith(".mjs"))
  .filter((f) => !only || f === `${only}.mjs`)
  .sort();

if (files.length === 0) {
  console.error(only ? `No post named "${only}"` : "No posts in content/posts/");
  process.exit(1);
}

const statements = [];

for (const file of files) {
  const post = await import(pathToFileURL(join(POSTS_DIR, file)).href);

  // HTML in -> canonical Tiptap JSON -> HTML back out. The round trip is the
  // point: what lands in the database is exactly what the editor would emit.
  const json = generateJSON(post.html, EXTENSIONS);
  const html = generateHTML(json, EXTENSIONS);

  const headings = [...html.matchAll(/<h([23])[^>]*>(.*?)<\/h\1>/g)];
  statements.push(statementFor(post, json, html));

  console.log(
    `${post.meta.slug}: ${readingMinutes(html)} min, ${headings.length} headings, ` +
      `${(post.meta.faqs ?? []).length} faqs` +
      (headings.length < 2 ? "  [!] under 2 headings, no table of contents" : "")
  );
}

await mkdir(dirname(OUT_FILE), { recursive: true });
await writeFile(OUT_FILE, statements.join("\n\n") + "\n", "utf8");
console.log(`\n-> ${OUT_FILE}`);
