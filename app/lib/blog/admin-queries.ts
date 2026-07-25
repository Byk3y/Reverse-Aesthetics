import { serverClient } from "../supabase/server";
import { isSupabaseConfigured } from "../supabase/config";
import type { Author, Category, Post, PostStatus, Tag } from "./types";

/**
 * Admin-side reads. These use the cookie-bound client, so RLS returns drafts
 * and scheduled posts too (via the `is_admin()` branch of the read policy).
 *
 * Each one returns empty when Supabase isn't configured. The admin layout shows
 * a setup notice in that case, but layouts and pages render in parallel — the
 * layout short-circuiting does not stop the page from running, so the guard has
 * to live here too.
 */

export interface AdminPostRow {
  id: string;
  slug: string;
  title: string;
  status: PostStatus;
  published_at: string | null;
  updated_at: string;
  featured: boolean;
  reading_minutes: number;
  category: Pick<Category, "name" | "slug"> | null;
  author: Pick<Author, "name"> | null;
}

const LIST_SELECT = `
  id, slug, title, status, published_at, updated_at, featured, reading_minutes,
  category:categories(name, slug),
  author:authors!posts_author_id_fkey(name)
`;

function one<T>(value: T | T[] | null | undefined): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export async function listAllPosts({
  status,
  search,
}: { status?: PostStatus; search?: string } = {}): Promise<AdminPostRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await serverClient();

  let query = supabase
    .from("posts")
    .select(LIST_SELECT)
    .order("updated_at", { ascending: false });

  if (status) query = query.eq("status", status);
  if (search?.trim()) query = query.ilike("title", `%${search.trim()}%`);

  const { data, error } = await query;

  if (error) {
    console.error("[admin] listAllPosts:", error.message);
    return [];
  }

  return (data ?? []).map((input) => {
    const row = input as Record<string, unknown>;
    return {
      ...(row as unknown as AdminPostRow),
      category: one(row.category as AdminPostRow["category"]),
      author: one(row.author as AdminPostRow["author"]),
    };
  });
}

export interface PostForEdit extends Post {
  tag_names: string[];
}

export async function getPostForEdit(id: string): Promise<PostForEdit | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*, tags:post_tags(tag:tags(name))")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as Record<string, unknown>;
  const tagRows = (row.tags ?? []) as { tag: { name: string } | { name: string }[] | null }[];

  return {
    ...(row as unknown as Post),
    tag_names: tagRows
      .map((t) => one(t.tag)?.name)
      .filter((name): name is string => Boolean(name)),
  };
}

export async function listAuthors(): Promise<Author[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await serverClient();
  const { data } = await supabase.from("authors").select("*").order("name");
  return (data ?? []) as Author[];
}

export async function listCategoriesForAdmin(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await serverClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");
  return (data ?? []) as Category[];
}

export async function listTags(): Promise<Tag[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await serverClient();
  const { data } = await supabase.from("tags").select("*").order("name");
  return (data ?? []) as Tag[];
}

export interface PostCounts {
  all: number;
  draft: number;
  scheduled: number;
  published: number;
}

export async function getPostCounts(): Promise<PostCounts> {
  if (!isSupabaseConfigured())
    return { all: 0, draft: 0, scheduled: 0, published: 0 };
  const supabase = await serverClient();

  const count = async (status?: PostStatus) => {
    let q = supabase.from("posts").select("id", { count: "exact", head: true });
    if (status) q = q.eq("status", status);
    const { count: n } = await q;
    return n ?? 0;
  };

  const [all, draft, scheduled, published] = await Promise.all([
    count(),
    count("draft"),
    count("scheduled"),
    count("published"),
  ]);

  return { all, draft, scheduled, published };
}
