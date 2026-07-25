import { publicClient } from "../supabase/public";
import { warnUnconfigured } from "../supabase/config";
import type {
  Category,
  PostCard,
  PostWithRelations,
  Tag,
} from "./types";

/**
 * Public blog data access.
 *
 * Everything here runs through the cookie-less anon client, so RLS already
 * hides drafts and future-dated posts. The explicit status/date filters are
 * belt-and-braces — they also give PostgREST the index it wants for ordering.
 *
 * Every function degrades to an empty result when Supabase isn't configured
 * yet, so the site builds and serves before the keys land.
 */

const CARD_SELECT = `
  id, slug, title, excerpt, cover_image_url, cover_image_alt,
  published_at, reading_minutes, featured,
  category:categories(slug, name),
  author:authors!posts_author_id_fkey(name, avatar_url)
`;

const FULL_SELECT = `
  *,
  category:categories(*),
  author:authors!posts_author_id_fkey(*),
  reviewer:authors!posts_reviewer_id_fkey(*),
  tags:post_tags(tag:tags(*))
`;

/** PostgREST types to-one joins loosely; normalise them here. */
function one<T>(value: T | T[] | null | undefined): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

/** Accepts `unknown` because PostgREST's generated row types don't narrow cleanly. */
function toCard(input: unknown): PostCard {
  const row = input as Record<string, unknown>;
  return {
    ...(row as unknown as PostCard),
    category: one(row.category as PostCard["category"]),
    author: one(row.author as PostCard["author"]),
  };
}

export const POSTS_PER_PAGE = 9;

// ---------------------------------------------------------------- categories

export async function getCategories(): Promise<Category[]> {
  const supabase = publicClient();
  if (!supabase) {
    warnUnconfigured("getCategories");
    return [];
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[blog] getCategories:", error.message);
    return [];
  }
  return (data ?? []) as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = publicClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  return (data as Category | null) ?? null;
}

// -------------------------------------------------------------------- posts

interface ListOptions {
  page?: number;
  perPage?: number;
  /** Exclude a post (used to keep the featured post out of the grid). */
  excludeId?: string;
}

export async function getPosts({
  page = 1,
  perPage = POSTS_PER_PAGE,
  excludeId,
}: ListOptions = {}): Promise<{ posts: PostCard[]; total: number }> {
  const supabase = publicClient();
  if (!supabase) {
    warnUnconfigured("getPosts");
    return { posts: [], total: 0 };
  }

  const from = (page - 1) * perPage;

  let query = supabase
    .from("posts")
    .select(CARD_SELECT, { count: "exact" })
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .range(from, from + perPage - 1);

  if (excludeId) query = query.neq("id", excludeId);

  const { data, error, count } = await query;

  if (error) {
    console.error("[blog] getPosts:", error.message);
    return { posts: [], total: 0 };
  }

  return {
    posts: (data ?? []).map((row) => toCard(row)),
    total: count ?? 0,
  };
}

/**
 * Posts in a category. Filtering on an embedded resource needs an inner join,
 * otherwise PostgREST returns every post with a null category.
 */
export async function getPostsByCategory(
  categorySlug: string,
  { page = 1, perPage = POSTS_PER_PAGE }: { page?: number; perPage?: number } = {}
): Promise<{ posts: PostCard[]; total: number }> {
  const supabase = publicClient();
  if (!supabase) return { posts: [], total: 0 };

  const from = (page - 1) * perPage;

  const { data, error, count } = await supabase
    .from("posts")
    .select(
      CARD_SELECT.replace(
        "category:categories(slug, name)",
        "category:categories!inner(slug, name)"
      ),
      { count: "exact" }
    )
    .eq("categories.slug", categorySlug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .range(from, from + perPage - 1);

  if (error) {
    console.error("[blog] getPostsByCategory:", error.message);
    return { posts: [], total: 0 };
  }

  return {
    posts: (data ?? []).map((row) => toCard(row)),
    total: count ?? 0,
  };
}

/** The post flagged `featured`, falling back to the most recent one. */
export async function getFeaturedPost(): Promise<PostCard | null> {
  const supabase = publicClient();
  if (!supabase) return null;

  const { data: flagged } = await supabase
    .from("posts")
    .select(CARD_SELECT)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (flagged) return toCard(flagged);

  const { data: latest } = await supabase
    .from("posts")
    .select(CARD_SELECT)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return latest ? toCard(latest) : null;
}

export async function getPostBySlug(
  slug: string
): Promise<PostWithRelations | null> {
  const supabase = publicClient();
  if (!supabase) {
    warnUnconfigured("getPostBySlug");
    return null;
  }

  const { data, error } = await supabase
    .from("posts")
    .select(FULL_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error || !data) return null;

  const row = data as Record<string, unknown>;
  const tagRows = (row.tags ?? []) as { tag: Tag | Tag[] | null }[];

  return {
    ...(row as unknown as PostWithRelations),
    category: one(row.category as PostWithRelations["category"]),
    author: one(row.author as PostWithRelations["author"]),
    reviewer: one(row.reviewer as PostWithRelations["reviewer"]),
    tags: tagRows.map((t) => one(t.tag)).filter((t): t is Tag => Boolean(t)),
  };
}

/** Same-category posts first; used for the "Keep reading" strip. */
export async function getRelatedPosts(
  post: Pick<PostWithRelations, "id" | "category_id">,
  limit = 3
): Promise<PostCard[]> {
  const supabase = publicClient();
  if (!supabase) return [];

  const base = () =>
    supabase
      .from("posts")
      .select(CARD_SELECT)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .neq("id", post.id)
      .order("published_at", { ascending: false });

  const collected: PostCard[] = [];

  if (post.category_id) {
    const { data } = await base().eq("category_id", post.category_id).limit(limit);
    collected.push(
      ...(data ?? []).map((row) => toCard(row))
    );
  }

  if (collected.length < limit) {
    const { data } = await base().limit(limit * 2);
    for (const row of data ?? []) {
      const card = toCard(row);
      if (collected.length >= limit) break;
      if (!collected.some((c) => c.id === card.id)) collected.push(card);
    }
  }

  return collected.slice(0, limit);
}

/** Slugs + timestamps for generateStaticParams and the sitemap. */
export async function getAllPostSlugs(): Promise<
  { slug: string; updated_at: string; published_at: string | null }[]
> {
  const supabase = publicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("posts")
    .select("slug, updated_at, published_at")
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[blog] getAllPostSlugs:", error.message);
    return [];
  }
  return data ?? [];
}
