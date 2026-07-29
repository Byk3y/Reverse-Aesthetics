import Image from "next/image";
import Link from "next/link";
import { formatDateShort } from "../../lib/blog/format";
import type { PostCard as PostCardData } from "../../lib/blog/types";

function CoverPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#e4f1f2]">
      <span
        className="text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)]"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

export function PostCard({
  post,
  priority = false,
}: {
  post: PostCardData;
  priority?: boolean;
}) {
  return (
    <article className="motion-card reveal-on-scroll group flex flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="motion-image-frame relative mb-[20px] block aspect-[4/3] overflow-hidden rounded-[16px] bg-[#e4f1f2]"
      >
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.cover_image_alt ?? post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1160px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <CoverPlaceholder label="Reverse Aesthetics" />
        )}
      </Link>

      <div className="flex flex-1 flex-col">
        {post.category && (
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="mb-[12px] inline-block self-start text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)] transition-colors hover:text-[var(--color-clinic-teal-dark)]"
          >
            {post.category.name}
          </Link>
        )}

        <h3 className="mb-[10px] text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-[var(--color-clinic-navy)] md:text-[21px]">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-[var(--color-clinic-teal)]"
          >
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="mb-[16px] line-clamp-3 text-[15px] leading-[1.65] text-[#5a5651]">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center gap-[10px] text-[12px] text-[#8a857f]">
          <span>{formatDateShort(post.published_at)}</span>
          <span className="h-[3px] w-[3px] rounded-full bg-[#cfcac4]" />
          <span>{post.reading_minutes} min read</span>
        </div>
      </div>
    </article>
  );
}

/** Wide, image-left layout used for the lead post on the index page. */
export function FeaturedPostCard({ post }: { post: PostCardData }) {
  return (
    <article className="grid items-center gap-[28px] md:grid-cols-2 md:gap-[48px]">
      <Link
        href={`/blog/${post.slug}`}
        className="motion-image-frame reveal-on-scroll relative block aspect-[4/3] overflow-hidden rounded-[20px] bg-[#e4f1f2] md:aspect-[5/4]"
      >
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.cover_image_alt ?? post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <CoverPlaceholder label="Reverse Aesthetics" />
        )}
        <span className="absolute left-[16px] top-[16px] rounded-full bg-white/95 px-[14px] py-[6px] text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-navy)] backdrop-blur-sm">
          Featured
        </span>
      </Link>

      <div className="reveal-on-scroll">
        <div className="mb-[16px] flex items-center gap-[10px] text-[11px] font-bold uppercase tracking-[0.14em]">
          {post.category && (
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="text-[var(--color-clinic-teal)] transition-colors hover:text-[var(--color-clinic-teal-dark)]"
            >
              {post.category.name}
            </Link>
          )}
          <span className="h-[3px] w-[3px] rounded-full bg-[#cfcac4]" />
          <span className="font-medium tracking-[0.06em] text-[#8a857f]">
            {post.reading_minutes} min read
          </span>
        </div>

        <h2 className="mb-[18px] text-[26px] font-semibold leading-[1.18] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[36px]">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-[var(--color-clinic-teal)]"
          >
            {post.title}
          </Link>
        </h2>

        {post.excerpt && (
          <p className="mb-[26px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[17px]">
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-[18px]">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex h-[48px] items-center justify-center rounded-full bg-[var(--color-clinic-navy)] px-[34px] text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-black"
          >
            Read Article
          </Link>
          <span className="text-[13px] text-[#8a857f]">
            {formatDateShort(post.published_at)}
          </span>
        </div>
      </div>
    </article>
  );
}
