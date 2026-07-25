"use server";

import { revalidatePath } from "next/cache";
import { serverClient, currentAdmin } from "../lib/supabase/server";
import { readingMinutes, slugify } from "../lib/blog/format";
import type { Faq, PostStatus } from "../lib/blog/types";

export interface PostInput {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  body: unknown;
  body_html: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  category_id: string | null;
  author_id: string | null;
  reviewer_id: string | null;
  status: PostStatus;
  published_at: string | null;
  featured: boolean;
  key_takeaways: string[];
  faqs: Faq[];
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  tag_names: string[];
}

export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string };

/** Refresh every public surface a post can appear on. */
async function revalidateBlog(slug: string, categorySlug?: string | null) {
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/blog/feed.xml");
  revalidatePath("/sitemap.xml");
  if (categorySlug) revalidatePath(`/blog/category/${categorySlug}`);
}

export async function savePost(
  input: PostInput
): Promise<ActionResult<{ id: string; slug: string }>> {
  const admin = await currentAdmin();
  if (!admin) return { ok: false, error: "Not authorised." };

  const title = input.title.trim();
  if (!title) return { ok: false, error: "A title is required." };

  const slug = slugify(input.slug || title);
  if (!slug) return { ok: false, error: "Could not build a URL slug from that title." };

  // Publishing without an explicit date means "now"; scheduling requires one.
  let publishedAt = input.published_at;
  if (input.status === "published" && !publishedAt) {
    publishedAt = new Date().toISOString();
  }
  if (input.status === "scheduled") {
    if (!publishedAt) {
      return { ok: false, error: "Pick a date and time to schedule this post." };
    }
    if (new Date(publishedAt).getTime() <= Date.now()) {
      return {
        ok: false,
        error: "A scheduled post needs a future date — publish it now instead.",
      };
    }
  }

  const supabase = await serverClient();

  const row = {
    slug,
    title,
    excerpt: input.excerpt.trim() || null,
    body: input.body ?? null,
    body_html: input.body_html || null,
    cover_image_url: input.cover_image_url,
    cover_image_alt: input.cover_image_alt?.trim() || null,
    category_id: input.category_id,
    author_id: input.author_id,
    reviewer_id: input.reviewer_id,
    status: input.status,
    published_at: publishedAt,
    featured: input.featured,
    reading_minutes: readingMinutes(input.body_html || ""),
    key_takeaways: input.key_takeaways.map((t) => t.trim()).filter(Boolean),
    faqs: input.faqs.filter((f) => f.question.trim() && f.answer.trim()),
    seo_title: input.seo_title?.trim() || null,
    seo_description: input.seo_description?.trim() || null,
    og_image_url: input.og_image_url,
  };

  const { data, error } = input.id
    ? await supabase
        .from("posts")
        .update(row)
        .eq("id", input.id)
        .select("id, slug")
        .single()
    : await supabase.from("posts").insert(row).select("id, slug").single();

  if (error) {
    const message =
      error.code === "23505" || error.message.includes("duplicate")
        ? `The slug "${slug}" is already used by another post.`
        : error.message;
    return { ok: false, error: message };
  }

  // Only one post can hold the featured slot.
  if (input.featured) {
    await supabase
      .from("posts")
      .update({ featured: false })
      .eq("featured", true)
      .neq("id", data.id);
  }

  const tagResult = await syncTags(data.id, input.tag_names);
  if (!tagResult.ok) return tagResult;

  const { data: category } = input.category_id
    ? await supabase
        .from("categories")
        .select("slug")
        .eq("id", input.category_id)
        .maybeSingle()
    : { data: null };

  await revalidateBlog(data.slug, category?.slug ?? null);

  return { ok: true, data: { id: data.id, slug: data.slug } };
}

async function syncTags(
  postId: string,
  names: string[]
): Promise<ActionResult> {
  const supabase = await serverClient();

  const cleaned = Array.from(
    new Map(
      names
        .map((name) => name.trim())
        .filter(Boolean)
        .map((name) => [slugify(name), name])
    ).entries()
  ).filter(([slug]) => slug.length > 0);

  // Clear the old links first so removing a tag actually removes it.
  const { error: clearError } = await supabase
    .from("post_tags")
    .delete()
    .eq("post_id", postId);

  if (clearError) return { ok: false, error: clearError.message };
  if (cleaned.length === 0) return { ok: true, data: undefined };

  const { data: tags, error: tagError } = await supabase
    .from("tags")
    .upsert(
      cleaned.map(([slug, name]) => ({ slug, name })),
      { onConflict: "slug" }
    )
    .select("id");

  if (tagError) return { ok: false, error: tagError.message };

  const { error: linkError } = await supabase
    .from("post_tags")
    .insert((tags ?? []).map((tag) => ({ post_id: postId, tag_id: tag.id })));

  if (linkError) return { ok: false, error: linkError.message };
  return { ok: true, data: undefined };
}

export async function deletePost(id: string): Promise<ActionResult> {
  const admin = await currentAdmin();
  if (!admin) return { ok: false, error: "Not authorised." };

  const supabase = await serverClient();

  const { data: post } = await supabase
    .from("posts")
    .select("slug, category:categories(slug)")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  if (post?.slug) {
    const category = Array.isArray(post.category) ? post.category[0] : post.category;
    await revalidateBlog(post.slug, (category as { slug?: string } | null)?.slug ?? null);
  }

  return { ok: true, data: undefined };
}

/** Quick status flip from the post list, without opening the editor. */
export async function setPostStatus(
  id: string,
  status: PostStatus
): Promise<ActionResult> {
  const admin = await currentAdmin();
  if (!admin) return { ok: false, error: "Not authorised." };

  const supabase = await serverClient();

  const patch: { status: PostStatus; published_at?: string } = { status };

  if (status === "published") {
    const { data: existing } = await supabase
      .from("posts")
      .select("published_at")
      .eq("id", id)
      .maybeSingle();

    if (!existing?.published_at) patch.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("posts")
    .update(patch)
    .eq("id", id)
    .select("slug, category:categories(slug)")
    .single();

  if (error) return { ok: false, error: error.message };

  const category = Array.isArray(data.category) ? data.category[0] : data.category;
  await revalidateBlog(data.slug, (category as { slug?: string } | null)?.slug ?? null);

  return { ok: true, data: undefined };
}
