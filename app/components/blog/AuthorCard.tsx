import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import type { Author } from "../../lib/blog/types";

function Avatar({ author, size }: { author: Author; size: number }) {
  const initials = author.name
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full bg-[#e4f1f2]"
      style={{ height: size, width: size }}
    >
      {author.avatar_url ? (
        <Image
          src={author.avatar_url}
          alt={author.name}
          fill
          className="object-cover"
          sizes={`${size}px`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[13px] font-bold text-[var(--color-clinic-teal)]">
          {initials}
        </div>
      )}
    </div>
  );
}

/** Compact byline shown in the article header. */
export function AuthorByline({
  author,
  reviewer,
}: {
  author: Author | null;
  reviewer: Author | null;
}) {
  if (!author && !reviewer) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[10px]">
      {author && (
        <div className="flex items-center gap-[10px]">
          <Avatar author={author} size={38} />
          <span className="text-[14px] leading-[1.35]">
            <span className="block font-semibold text-[var(--color-clinic-navy)]">
              {author.name}
            </span>
            {author.role && (
              <span className="block text-[12px] text-[#8a857f]">
                {author.role}
              </span>
            )}
          </span>
        </div>
      )}

      {reviewer && (
        <span className="inline-flex items-center gap-[7px] rounded-full bg-[#ecf7f7] px-[12px] py-[6px] text-[12px] font-semibold text-[var(--color-clinic-teal-dark)]">
          <ShieldCheck className="h-[14px] w-[14px]" aria-hidden />
          Medically reviewed by {reviewer.name}
        </span>
      )}
    </div>
  );
}

/** Full bio card shown at the foot of the article. */
export default function AuthorCard({ author }: { author: Author }) {
  return (
    <section className="rounded-[18px] border border-[#eeebe6] bg-[#faf9f7] p-[24px] md:p-[30px]">
      <div className="flex flex-col gap-[18px] sm:flex-row sm:gap-[22px]">
        <Avatar author={author} size={64} />
        <div>
          <p className="mb-[3px] text-[11px] font-bold uppercase tracking-[0.16em] text-[#8a857f]">
            Written by
          </p>
          <h2 className="text-[19px] font-semibold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
            {author.name}
          </h2>
          {author.role && (
            <p className="mt-[2px] text-[14px] text-[var(--color-clinic-teal-dark)]">
              {author.role}
            </p>
          )}
          {author.credentials && (
            <p className="mt-[8px] text-[13px] font-medium text-[#8a857f]">
              {author.credentials}
            </p>
          )}
          {author.bio && (
            <p className="mt-[14px] text-[15px] leading-[1.7] text-[#5a5651]">
              {author.bio}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
