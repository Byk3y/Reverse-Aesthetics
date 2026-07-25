import Link from "next/link";
import { ExternalLink, Plus, Star } from "lucide-react";
import PostRowActions from "../../components/admin/PostRowActions";
import { getPostCounts, listAllPosts } from "../../lib/blog/admin-queries";
import { formatDateShort } from "../../lib/blog/format";
import type { PostStatus } from "../../lib/blog/types";

const STATUS_STYLES: Record<PostStatus, string> = {
  draft: "bg-[#f0eeea] text-[#6b6660]",
  scheduled: "bg-[#fdf3dd] text-[#8a6516]",
  published: "bg-[#e6f3ec] text-[var(--color-clinic-teal-dark)]",
};

const FILTERS: { label: string; value?: PostStatus }[] = [
  { label: "All" },
  { label: "Published", value: "published" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Drafts", value: "draft" },
];

interface Props {
  searchParams: Promise<{ status?: string; q?: string }>;
}

export default async function AdminPostsPage({ searchParams }: Props) {
  const { status: statusParam, q } = await searchParams;

  const status = FILTERS.find((f) => f.value === statusParam)?.value;

  const [posts, counts] = await Promise.all([
    listAllPosts({ status, search: q }),
    getPostCounts(),
  ]);

  const countFor = (value?: PostStatus) =>
    value ? counts[value] : counts.all;

  return (
    <main className="mx-auto max-w-[1180px] px-[20px] py-[36px] md:px-[32px] md:py-[48px]">
      <div className="mb-[30px] flex flex-wrap items-end justify-between gap-[16px]">
        <div>
          <h1 className="text-[26px] font-semibold tracking-[-0.01em] text-[var(--color-clinic-navy)] md:text-[30px]">
            Posts
          </h1>
          <p className="mt-[6px] text-[14px] text-[#8a857f]">
            {counts.published} published · {counts.scheduled} scheduled ·{" "}
            {counts.draft} draft
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex h-[44px] items-center gap-[8px] rounded-full bg-[var(--color-clinic-navy)] px-[24px] text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-black"
        >
          <Plus className="h-[15px] w-[15px]" aria-hidden />
          New post
        </Link>
      </div>

      {/* Filters + search */}
      <div className="mb-[20px] flex flex-wrap items-center justify-between gap-[14px]">
        <nav className="flex flex-wrap gap-[8px]">
          {FILTERS.map((filter) => {
            const active = filter.value === status;
            return (
              <Link
                key={filter.label}
                href={filter.value ? `/admin?status=${filter.value}` : "/admin"}
                className={`inline-flex h-[34px] items-center gap-[7px] rounded-full px-[15px] text-[12px] font-semibold transition-colors ${
                  active
                    ? "bg-[var(--color-clinic-navy)] text-white"
                    : "border border-[#e0dcd6] bg-white text-[#5a5651] hover:border-[#b9b4ad]"
                }`}
              >
                {filter.label}
                <span className={active ? "text-white/60" : "text-[#a8a39c]"}>
                  {countFor(filter.value)}
                </span>
              </Link>
            );
          })}
        </nav>

        <form action="/admin" className="flex items-center gap-[8px]">
          {status && <input type="hidden" name="status" value={status} />}
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search titles…"
            className="h-[36px] w-[190px] rounded-full border border-[#e0dcd6] bg-white px-[15px] text-[13px] outline-none transition-colors focus:border-[var(--color-clinic-teal)]"
          />
          <button
            type="submit"
            className="h-[36px] rounded-full border border-[#e0dcd6] bg-white px-[16px] text-[12px] font-semibold text-[#5a5651] transition-colors hover:border-[#b9b4ad]"
          >
            Search
          </button>
        </form>
      </div>

      {/* Table */}
      {posts.length === 0 ? (
        <EmptyState hasFilter={Boolean(status || q)} />
      ) : (
        <div className="overflow-hidden rounded-[16px] border border-[#e6e2dc] bg-white">
          <div className="hidden grid-cols-[1fr_150px_120px_130px_60px] gap-[16px] border-b border-[#eeebe6] bg-[#faf9f7] px-[22px] py-[13px] text-[11px] font-bold uppercase tracking-[0.12em] text-[#8a857f] md:grid">
            <span>Title</span>
            <span>Category</span>
            <span>Status</span>
            <span>Date</span>
            <span />
          </div>

          <ul className="divide-y divide-[#f1efeb]">
            {posts.map((post) => (
              <li
                key={post.id}
                className="grid gap-[10px] px-[22px] py-[16px] md:grid-cols-[1fr_150px_120px_130px_60px] md:items-center md:gap-[16px]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-[8px]">
                    {post.featured && (
                      <Star
                        className="h-[13px] w-[13px] shrink-0 fill-[var(--color-clinic-gold)] text-[var(--color-clinic-gold)]"
                        aria-label="Featured post"
                      />
                    )}
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="truncate text-[15px] font-semibold text-[var(--color-clinic-navy)] transition-colors hover:text-[var(--color-clinic-teal)]"
                    >
                      {post.title}
                    </Link>
                  </div>
                  <div className="mt-[3px] flex items-center gap-[8px] text-[12px] text-[#a8a39c]">
                    <span className="truncate font-mono">/blog/{post.slug}</span>
                    {post.status === "published" && (
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="inline-flex shrink-0 items-center gap-[3px] transition-colors hover:text-[var(--color-clinic-teal)]"
                      >
                        <ExternalLink className="h-[11px] w-[11px]" aria-hidden />
                        View
                      </Link>
                    )}
                  </div>
                </div>

                <span className="text-[13px] text-[#5a5651]">
                  {post.category?.name ?? (
                    <span className="text-[#c2bdb6]">Uncategorised</span>
                  )}
                </span>

                <span>
                  <span
                    className={`inline-flex h-[24px] items-center rounded-full px-[10px] text-[11px] font-bold uppercase tracking-[0.08em] ${STATUS_STYLES[post.status]}`}
                  >
                    {post.status}
                  </span>
                </span>

                <span className="text-[13px] text-[#8a857f]">
                  {formatDateShort(post.published_at ?? post.updated_at)}
                </span>

                <PostRowActions
                  id={post.id}
                  title={post.title}
                  status={post.status}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

function EmptyState({ hasFilter }: { hasFilter: boolean }) {
  return (
    <div className="rounded-[16px] border border-dashed border-[#dcd8d2] bg-white px-[24px] py-[64px] text-center">
      <h2 className="mb-[8px] text-[18px] font-semibold text-[var(--color-clinic-navy)]">
        {hasFilter ? "Nothing matches that" : "No posts yet"}
      </h2>
      <p className="mx-auto mb-[24px] max-w-[380px] text-[14px] leading-[1.65] text-[#8a857f]">
        {hasFilter
          ? "Try a different filter or search term."
          : "Write the first article — it'll appear on the blog the moment you publish."}
      </p>
      {!hasFilter && (
        <Link
          href="/admin/posts/new"
          className="inline-flex h-[44px] items-center gap-[8px] rounded-full bg-[var(--color-clinic-navy)] px-[26px] text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-black"
        >
          <Plus className="h-[15px] w-[15px]" aria-hidden />
          New post
        </Link>
      )}
    </div>
  );
}
