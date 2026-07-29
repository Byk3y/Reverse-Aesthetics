"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ExternalLink,
  GripVertical,
  Loader2,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";

import RichTextEditor from "./RichTextEditor";
import { savePost, type PostInput } from "../../admin/actions";
import { uploadMedia } from "../../lib/blog/upload";
import { readingMinutes, slugify } from "../../lib/blog/format";
import type { Author, Category, Faq, PostStatus } from "../../lib/blog/types";
import type { PostForEdit } from "../../lib/blog/admin-queries";

/* -------------------------------------------------- datetime-local helpers */

/** ISO → the "YYYY-MM-DDTHH:mm" local-time string the input expects. */
function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

function fromLocalInput(value: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/* ------------------------------------------------------------ shared styles */

const FIELD =
  "w-full rounded-[10px] border border-[#e0dcd6] bg-white px-[13px] py-[10px] text-[14px] text-[var(--color-clinic-navy)] outline-none transition-colors focus:border-[var(--color-clinic-teal)]";
const LABEL = "mb-[6px] block text-[12px] font-semibold text-[#5a5651]";
const CARD = "rounded-[14px] border border-[#e6e2dc] bg-white p-[18px]";

/* --------------------------------------------------------------- component */

interface Props {
  post: PostForEdit | null;
  categories: Category[];
  authors: Author[];
}

export default function PostEditor({ post, categories, authors }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugLocked, setSlugLocked] = useState(Boolean(post));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");

  const [body, setBody] = useState<unknown>(post?.body ?? null);
  const [bodyHtml, setBodyHtml] = useState(post?.body_html ?? "");

  const [coverUrl, setCoverUrl] = useState(post?.cover_image_url ?? "");
  const [coverAlt, setCoverAlt] = useState(post?.cover_image_alt ?? "");
  const [coverBusy, setCoverBusy] = useState(false);

  const [categoryId, setCategoryId] = useState(post?.category_id ?? "");
  const [authorId, setAuthorId] = useState(
    post?.author_id ?? authors[0]?.id ?? ""
  );
  const [reviewerId, setReviewerId] = useState(post?.reviewer_id ?? "");

  const [status, setStatus] = useState<PostStatus>(post?.status ?? "draft");
  const [publishedAt, setPublishedAt] = useState(
    toLocalInput(post?.published_at ?? null)
  );
  const [featured, setFeatured] = useState(post?.featured ?? false);

  const [takeaways, setTakeaways] = useState<string[]>(
    post?.key_takeaways?.length ? post.key_takeaways : [""]
  );
  const [faqs, setFaqs] = useState<Faq[]>(
    post?.faqs?.length ? post.faqs : [{ question: "", answer: "" }]
  );
  const [tags, setTags] = useState((post?.tag_names ?? []).join(", "));

  const [seoTitle, setSeoTitle] = useState(post?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(
    post?.seo_description ?? ""
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const coverInput = useRef<HTMLInputElement>(null);

  const minutes = useMemo(() => readingMinutes(bodyHtml), [bodyHtml]);

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (!slugLocked) setSlug(slugify(value));
  };

  const handleBody = useCallback(
    ({ json, html }: { json: unknown; html: string }) => {
      setBody(json);
      setBodyHtml(html);
    },
    []
  );

  const uploadCover = async (file: File) => {
    setCoverBusy(true);
    setError(null);
    const result = await uploadMedia(file, "cover");
    if (result.ok) setCoverUrl(result.url);
    else setError(result.error);
    setCoverBusy(false);
    if (coverInput.current) coverInput.current.value = "";
  };

  const submit = async (nextStatus?: PostStatus) => {
    const effectiveStatus = nextStatus ?? status;
    setSaving(true);
    setError(null);

    const input: PostInput = {
      id: post?.id,
      slug: slug || slugify(title),
      title,
      excerpt,
      body,
      body_html: bodyHtml,
      cover_image_url: coverUrl || null,
      cover_image_alt: coverAlt || null,
      category_id: categoryId || null,
      author_id: authorId || null,
      reviewer_id: reviewerId || null,
      status: effectiveStatus,
      published_at: fromLocalInput(publishedAt),
      featured,
      key_takeaways: takeaways,
      faqs,
      seo_title: seoTitle || null,
      seo_description: seoDescription || null,
      og_image_url: coverUrl || null,
      tag_names: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const result = await savePost(input);
    setSaving(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setStatus(effectiveStatus);
    setSavedAt(new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }));

    if (!post) {
      router.replace(`/admin/posts/${result.data.id}`);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="mx-auto max-w-[1180px] px-[20px] py-[28px] md:px-[32px] md:py-[36px]">
      {/* Top bar */}
      <div className="mb-[26px] flex flex-wrap items-center justify-between gap-[14px]">
        <div>
          <Link
            href="/admin/posts"
            className="text-[13px] font-semibold text-[#8a857f] transition-colors hover:text-[var(--color-clinic-teal)]"
          >
            ← All posts
          </Link>
          <h1 className="mt-[6px] text-[22px] font-semibold tracking-[-0.01em] text-[var(--color-clinic-navy)] md:text-[26px]">
            {post ? "Edit post" : "New post"}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-[10px]">
          {savedAt && !saving && (
            <span className="text-[12px] text-[#8a857f]">Saved {savedAt}</span>
          )}
          {post?.status === "published" && (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="inline-flex h-[40px] items-center gap-[6px] rounded-full border border-[#dcd8d2] px-[16px] text-[12px] font-semibold text-[#5a5651] transition-colors hover:border-[#b9b4ad]"
            >
              View live
              <ExternalLink className="h-[13px] w-[13px]" aria-hidden />
            </Link>
          )}
          <button
            type="button"
            disabled={saving}
            onClick={() => submit("draft")}
            className="inline-flex h-[40px] items-center gap-[7px] rounded-full border border-[#dcd8d2] bg-white px-[20px] text-[11px] font-bold uppercase tracking-[0.1em] text-[#5a5651] transition-colors hover:border-[#b9b4ad] disabled:opacity-60"
          >
            Save draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => submit(status === "scheduled" ? "scheduled" : "published")}
            className="inline-flex h-[40px] items-center gap-[7px] rounded-full bg-[var(--color-clinic-teal)] px-[24px] text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)] disabled:opacity-60"
          >
            {saving && <Loader2 className="h-[14px] w-[14px] animate-spin" aria-hidden />}
            {status === "scheduled" ? "Schedule" : "Publish"}
          </button>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mb-[20px] rounded-[12px] bg-[#fdecec] px-[16px] py-[12px] text-[13px] leading-[1.55] text-[#a3312c]"
        >
          {error}
        </p>
      )}

      <div className="grid gap-[22px] lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* ---------------------------------------------------------- MAIN */}
        <div className="grid gap-[22px]">
          <div className={CARD}>
            <label className={LABEL} htmlFor="post-title">
              Title
            </label>
            <input
              id="post-title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="How long do dermal fillers actually last?"
              className={`${FIELD} !text-[19px] !font-semibold`}
            />

            <div className="mt-[16px]">
              <label className={LABEL} htmlFor="post-slug">
                URL slug
              </label>
              <div className="flex items-center gap-[8px]">
                <span className="shrink-0 font-mono text-[13px] text-[#a8a39c]">
                  /blog/
                </span>
                <input
                  id="post-slug"
                  value={slug}
                  onChange={(e) => {
                    setSlugLocked(true);
                    setSlug(slugify(e.target.value));
                  }}
                  className={`${FIELD} font-mono !text-[13px]`}
                />
              </div>
            </div>

            <div className="mt-[16px]">
              <label className={LABEL} htmlFor="post-excerpt">
                Excerpt
                <span className="ml-[6px] font-normal text-[#a8a39c]">
                  shown on cards and in search results
                </span>
              </label>
              <textarea
                id="post-excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className={`${FIELD} resize-y`}
                placeholder="One or two sentences summarising the article."
              />
            </div>
          </div>

          {/* Body */}
          <div>
            <div className="mb-[8px] flex items-center justify-between">
              <span className={LABEL}>Article body</span>
              <span className="text-[12px] text-[#a8a39c]">
                {minutes} min read
              </span>
            </div>
            <RichTextEditor initialContent={post?.body ?? null} onChange={handleBody} />
          </div>

          {/* Key takeaways */}
          <div className={CARD}>
            <p className={LABEL}>
              Key takeaways
              <span className="ml-[6px] font-normal text-[#a8a39c]">
                shown in a box above the article — the passage AI search is most
                likely to quote
              </span>
            </p>
            <RepeatableList
              items={takeaways}
              onChange={setTakeaways}
              placeholder="Fillers typically last 6–18 months depending on the product and area."
              addLabel="Add takeaway"
            />
          </div>

          {/* FAQs */}
          <div className={CARD}>
            <p className={LABEL}>
              Frequently asked questions
              <span className="ml-[6px] font-normal text-[#a8a39c]">
                published as FAQ schema for Google and AI search
              </span>
            </p>

            <div className="grid gap-[14px]">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-[10px] border border-[#eeebe6] bg-[#faf9f7] p-[14px]"
                >
                  <div className="mb-[8px] flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#a8a39c]">
                      Question {i + 1}
                    </span>
                    <button
                      type="button"
                      aria-label={`Remove question ${i + 1}`}
                      onClick={() =>
                        setFaqs(
                          faqs.length === 1
                            ? [{ question: "", answer: "" }]
                            : faqs.filter((_, index) => index !== i)
                        )
                      }
                      className="text-[#b9b4ad] transition-colors hover:text-[#a3312c]"
                    >
                      <Trash2 className="h-[14px] w-[14px]" aria-hidden />
                    </button>
                  </div>
                  <input
                    value={faq.question}
                    onChange={(e) =>
                      setFaqs(
                        faqs.map((f, index) =>
                          index === i ? { ...f, question: e.target.value } : f
                        )
                      )
                    }
                    placeholder="Is the treatment painful?"
                    className={`${FIELD} mb-[8px]`}
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) =>
                      setFaqs(
                        faqs.map((f, index) =>
                          index === i ? { ...f, answer: e.target.value } : f
                        )
                      )
                    }
                    rows={3}
                    placeholder="Most patients describe it as mild discomfort…"
                    className={`${FIELD} resize-y`}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
              className="mt-[12px] inline-flex items-center gap-[6px] text-[13px] font-semibold text-[var(--color-clinic-teal)] transition-colors hover:text-[var(--color-clinic-teal-dark)]"
            >
              <Plus className="h-[14px] w-[14px]" aria-hidden />
              Add question
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------- SIDEBAR */}
        <aside className="grid content-start gap-[18px]">
          {/* Publish */}
          <div className={CARD}>
            <p className="mb-[14px] text-[12px] font-bold uppercase tracking-[0.12em] text-[#8a857f]">
              Publishing
            </p>

            <label className={LABEL} htmlFor="post-status">
              Status
            </label>
            <select
              id="post-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as PostStatus)}
              className={FIELD}
            >
              <option value="draft">Draft — not visible</option>
              <option value="published">Published — live now</option>
              <option value="scheduled">Scheduled — goes live later</option>
            </select>

            <div className="mt-[14px]">
              <label className={LABEL} htmlFor="post-date">
                {status === "scheduled" ? "Goes live at" : "Publish date"}
              </label>
              <input
                id="post-date"
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className={FIELD}
              />
              {status === "published" && !publishedAt && (
                <p className="mt-[6px] text-[12px] text-[#a8a39c]">
                  Leave empty to use the current time.
                </p>
              )}
            </div>

            <label className="mt-[16px] flex cursor-pointer items-start gap-[9px]">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="mt-[3px] h-[15px] w-[15px] accent-[var(--color-clinic-teal)]"
              />
              <span className="text-[13px] leading-[1.5] text-[#5a5651]">
                Feature at the top of the blog
                <span className="block text-[12px] text-[#a8a39c]">
                  Replaces the current featured post.
                </span>
              </span>
            </label>
          </div>

          {/* Cover */}
          <div className={CARD}>
            <p className="mb-[12px] text-[12px] font-bold uppercase tracking-[0.12em] text-[#8a857f]">
              Cover image
            </p>

            {coverUrl ? (
              <div className="relative mb-[12px] aspect-[16/10] overflow-hidden rounded-[10px] bg-[#f0eeea]">
                <Image
                  src={coverUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="320px"
                  unoptimized
                />
              </div>
            ) : (
              <div className="mb-[12px] flex aspect-[16/10] items-center justify-center rounded-[10px] border border-dashed border-[#dcd8d2] bg-[#faf9f7] text-[12px] text-[#a8a39c]">
                No cover yet
              </div>
            )}

            <input
              ref={coverInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void uploadCover(file);
              }}
            />

            <div className="flex gap-[8px]">
              <button
                type="button"
                disabled={coverBusy}
                onClick={() => coverInput.current?.click()}
                className="inline-flex h-[36px] flex-1 items-center justify-center gap-[6px] rounded-full border border-[#dcd8d2] px-[14px] text-[12px] font-semibold text-[#5a5651] transition-colors hover:border-[#b9b4ad] disabled:opacity-60"
              >
                {coverBusy ? (
                  <Loader2 className="h-[13px] w-[13px] animate-spin" aria-hidden />
                ) : (
                  <Upload className="h-[13px] w-[13px]" aria-hidden />
                )}
                {coverUrl ? "Replace" : "Upload"}
              </button>
              {coverUrl && (
                <button
                  type="button"
                  onClick={() => setCoverUrl("")}
                  className="inline-flex h-[36px] items-center justify-center rounded-full border border-[#dcd8d2] px-[12px] text-[#8a857f] transition-colors hover:border-[#a3312c] hover:text-[#a3312c]"
                  aria-label="Remove cover image"
                >
                  <Trash2 className="h-[13px] w-[13px]" aria-hidden />
                </button>
              )}
            </div>

            <div className="mt-[12px]">
              <label className={LABEL} htmlFor="cover-alt">
                Alt text
              </label>
              <input
                id="cover-alt"
                value={coverAlt}
                onChange={(e) => setCoverAlt(e.target.value)}
                placeholder="Describe the image"
                className={FIELD}
              />
            </div>
          </div>

          {/* Classification */}
          <div className={CARD}>
            <p className="mb-[12px] text-[12px] font-bold uppercase tracking-[0.12em] text-[#8a857f]">
              Classification
            </p>

            <label className={LABEL} htmlFor="post-category">
              Category
            </label>
            <select
              id="post-category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={FIELD}
            >
              <option value="">Uncategorised</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <div className="mt-[14px]">
              <label className={LABEL} htmlFor="post-author">
                Author
              </label>
              <select
                id="post-author"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className={FIELD}
              >
                <option value="">No byline</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-[14px]">
              <label className={LABEL} htmlFor="post-reviewer">
                Medically reviewed by
              </label>
              <select
                id="post-reviewer"
                value={reviewerId}
                onChange={(e) => setReviewerId(e.target.value)}
                className={FIELD}
              >
                <option value="">Not reviewed</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-[14px]">
              <label className={LABEL} htmlFor="post-tags">
                Tags
                <span className="ml-[6px] font-normal text-[#a8a39c]">
                  comma separated
                </span>
              </label>
              <input
                id="post-tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="botox, ageing, injectables"
                className={FIELD}
              />
            </div>
          </div>

          {/* SEO */}
          <div className={CARD}>
            <p className="mb-[12px] text-[12px] font-bold uppercase tracking-[0.12em] text-[#8a857f]">
              Search appearance
            </p>

            <label className={LABEL} htmlFor="seo-title">
              Meta title
              <Counter value={seoTitle.length} limit={60} />
            </label>
            <input
              id="seo-title"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder={title || "Defaults to the post title"}
              className={FIELD}
            />

            <div className="mt-[14px]">
              <label className={LABEL} htmlFor="seo-description">
                Meta description
                <Counter value={seoDescription.length} limit={155} />
              </label>
              <textarea
                id="seo-description"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                rows={3}
                placeholder={excerpt || "Defaults to the excerpt"}
                className={`${FIELD} resize-y`}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- sub-widgets */

function Counter({ value, limit }: { value: number; limit: number }) {
  if (value === 0) return null;
  return (
    <span
      className={`ml-[6px] font-normal ${
        value > limit ? "text-[#a3312c]" : "text-[#a8a39c]"
      }`}
    >
      {value}/{limit}
    </span>
  );
}

function RepeatableList({
  items,
  onChange,
  placeholder,
  addLabel,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  addLabel: string;
}) {
  return (
    <div>
      <div className="grid gap-[8px]">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-[8px]">
            <GripVertical
              className="mt-[11px] h-[14px] w-[14px] shrink-0 text-[#d6d1ca]"
              aria-hidden
            />
            <textarea
              value={item}
              onChange={(e) =>
                onChange(items.map((v, index) => (index === i ? e.target.value : v)))
              }
              rows={2}
              placeholder={placeholder}
              className={`${FIELD} resize-y`}
            />
            <button
              type="button"
              aria-label={`Remove item ${i + 1}`}
              onClick={() =>
                onChange(items.length === 1 ? [""] : items.filter((_, index) => index !== i))
              }
              className="mt-[9px] shrink-0 text-[#b9b4ad] transition-colors hover:text-[#a3312c]"
            >
              <Trash2 className="h-[14px] w-[14px]" aria-hidden />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="mt-[12px] inline-flex items-center gap-[6px] text-[13px] font-semibold text-[var(--color-clinic-teal)] transition-colors hover:text-[var(--color-clinic-teal-dark)]"
      >
        <Plus className="h-[14px] w-[14px]" aria-hidden />
        {addLabel}
      </button>
    </div>
  );
}
