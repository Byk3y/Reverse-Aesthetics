import Link from "next/link";
import ClinicNavbar from "../home/ClinicNavbar";
import ScrollMotion from "../home/ScrollMotion";
import { SiteFooter } from "../home/SiteFooter";
import FloatingWhatsApp from "../home/FloatingWhatsApp";
import { BOOKING_URL } from "../home/homeData";
import CategoryChips from "./CategoryChips";
import Pagination from "./Pagination";
import { FeaturedPostCard, PostCard } from "./PostCard";
import type { Category, PostCard as PostCardData } from "../../lib/blog/types";

interface Props {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  intro: string;
  categories: Category[];
  activeCategorySlug?: string;
  featured?: PostCardData | null;
  posts: PostCardData[];
  page: number;
  totalPages: number;
  paginationBase?: string;
  gridHeading?: string;
}

export default function BlogIndexView({
  eyebrow,
  titleLead,
  titleAccent,
  intro,
  categories,
  activeCategorySlug,
  featured,
  posts,
  page,
  totalPages,
  paginationBase = "/blog",
  gridHeading = "Latest articles",
}: Props) {
  const hasContent = Boolean(featured) || posts.length > 0;

  return (
    <div
      className="w-full bg-white text-[var(--color-clinic-navy)]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <ClinicNavbar />
      <div className="h-[118px] md:h-[126px] bg-[var(--color-clinic-hero-top)]" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--color-clinic-hero-top)]">
        <div className="mx-auto max-w-[820px] px-[20px] pb-[46px] pt-[18px] text-center md:pb-[62px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            {eyebrow}
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[50px] md:leading-[1.08]">
            {titleLead}{" "}
            <span className="text-[var(--color-clinic-hero-accent)]">
              {titleAccent}
            </span>
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[24px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            {intro}
          </p>
        </div>

        {/* Category filter */}
        <div className="mx-auto max-w-[1160px] px-[20px] pb-[34px] md:px-[40px] md:pb-[44px]">
          <div className="flex justify-center">
            <CategoryChips
              categories={categories}
              activeSlug={activeCategorySlug}
            />
          </div>
        </div>
      </section>

      <div className="motion-scope">
        <ScrollMotion />

        {!hasContent ? (
          <EmptyState />
        ) : (
          <>
            {featured && (
              <section className="border-b border-[#eeebe6] bg-white py-[60px] md:py-[80px]">
                <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
                  <FeaturedPostCard post={featured} />
                </div>
              </section>
            )}

            {posts.length > 0 && (
              <section className="bg-white py-[60px] md:py-[80px]">
                <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
                  <h2 className="motion-heading mb-[38px] text-[22px] font-semibold tracking-[-0.01em] text-[var(--color-clinic-navy)] md:text-[26px]">
                    {gridHeading}
                  </h2>

                  <div className="grid gap-x-[28px] gap-y-[48px] md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post, i) => (
                      <PostCard key={post.id} post={post} priority={i < 3} />
                    ))}
                  </div>

                  <Pagination
                    base={paginationBase}
                    page={page}
                    totalPages={totalPages}
                  />
                </div>
              </section>
            )}
          </>
        )}

        {/* CTA band */}
        <section className="bg-[var(--color-clinic-navy)] py-[64px] md:py-[86px]">
          <div className="mx-auto max-w-[760px] px-[20px] text-center">
            <h2 className="reveal-on-scroll mb-[18px] text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] text-white md:text-[36px]">
              Reading is a good start.{" "}
              <span className="text-[var(--color-clinic-teal)]">
                A consultation is better.
              </span>
            </h2>
            <p className="reveal-on-scroll mx-auto mb-[32px] max-w-[540px] text-[16px] leading-[1.7] text-white/70">
              Every article here is written by our clinical team — but nothing
              replaces a plan built around your skin, your goals, and your
              history.
            </p>
            <Link
              href={BOOKING_URL}
              className="reveal-on-scroll inline-flex h-[50px] items-center justify-center rounded-full bg-[var(--color-clinic-teal)] px-[42px] text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
            >
              Book Appointment
            </Link>
          </div>
        </section>
      </div>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}

function EmptyState() {
  return (
    <section className="bg-white py-[80px] md:py-[110px]">
      <div className="mx-auto max-w-[560px] px-[20px] text-center">
        <div className="mx-auto mb-[26px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#eef5f2]">
          <svg
            viewBox="0 0 24 24"
            className="h-[28px] w-[28px] text-[var(--color-clinic-teal)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden
          >
            <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h9A1.5 1.5 0 0 1 16 5.5V20l-6-3-6 3V5.5Z" />
            <path d="M16 8h2.5A1.5 1.5 0 0 1 20 9.5V20" />
          </svg>
        </div>
        <h2 className="mb-[14px] text-[24px] font-semibold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
          No articles here yet
        </h2>
        <p className="text-[16px] leading-[1.7] text-[#5a5651]">
          Our clinical team is writing. Check back shortly — or book a
          consultation and ask us directly.
        </p>
      </div>
    </section>
  );
}
