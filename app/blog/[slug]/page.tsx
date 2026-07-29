import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import ClinicNavbar from "../../components/home/ClinicNavbar";
import ScrollMotion from "../../components/home/ScrollMotion";
import { SiteFooter } from "../../components/home/SiteFooter";
import FloatingWhatsApp from "../../components/home/FloatingWhatsApp";

import AuthorCard, { AuthorByline } from "../../components/blog/AuthorCard";
import InlineCta from "../../components/blog/InlineCta";
import KeyTakeaways from "../../components/blog/KeyTakeaways";
import PostFaqs from "../../components/blog/PostFaqs";
import ReadingProgress from "../../components/blog/ReadingProgress";
import RelatedPosts from "../../components/blog/RelatedPosts";
import ShareButtons from "../../components/blog/ShareButtons";
import TableOfContents from "../../components/blog/TableOfContents";

import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "../../lib/blog/queries";
import { extractHeadings, formatDate, sanitizeHtml } from "../../lib/blog/format";
import { SITE_URL } from "../../lib/site";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Article not found | Reverse Aesthetics" };

  const title = post.seo_title ?? `${post.title} | Reverse Aesthetics`;
  const description =
    post.seo_description ?? post.excerpt ?? undefined;
  const image = post.og_image_url ?? post.cover_image_url ?? undefined;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: post.author ? [post.author.name] : undefined,
      images: image ? [{ url: image, alt: post.cover_image_alt ?? post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const related = await getRelatedPosts(post, 3);

  const { html, headings } = extractHeadings(
    sanitizeHtml(post.body_html ?? "")
  );

  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.og_image_url ?? post.cover_image_url ?? undefined;
  const wasUpdated =
    post.published_at != null &&
    new Date(post.updated_at).getTime() - new Date(post.published_at).getTime() >
      1000 * 60 * 60 * 24;

  const faqs = post.faqs.filter((f) => f.question?.trim() && f.answer?.trim());

  const graph: Record<string, unknown>[] = [
    {
      "@type": "MedicalWebPage",
      "@id": `${url}#page`,
      url,
      name: post.title,
      description: post.seo_description ?? post.excerpt ?? undefined,
      inLanguage: "en-NG",
      isPartOf: { "@id": `${SITE_URL}#website` },
      ...(post.reviewer
        ? {
            reviewedBy: {
              "@type": "Person",
              name: post.reviewer.name,
              jobTitle: post.reviewer.role ?? undefined,
            },
          }
        : {}),
    },
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.excerpt ?? undefined,
      image: image ? [image] : undefined,
      datePublished: post.published_at ?? undefined,
      dateModified: post.updated_at,
      mainEntityOfPage: { "@id": `${url}#page` },
      articleSection: post.category?.name ?? undefined,
      keywords: post.tags.map((t) => t.name).join(", ") || undefined,
      author: post.author
        ? {
            "@type": "Person",
            name: post.author.name,
            jobTitle: post.author.role ?? undefined,
            description: post.author.credentials ?? undefined,
            ...(post.author.same_as?.length
              ? { sameAs: post.author.same_as }
              : {}),
          }
        : { "@type": "Organization", name: "Reverse Aesthetics" },
      publisher: {
        "@type": "Organization",
        name: "Reverse Aesthetics",
        url: SITE_URL,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${SITE_URL}/blog`,
        },
        ...(post.category
          ? [
              {
                "@type": "ListItem",
                position: 3,
                name: post.category.name,
                item: `${SITE_URL}/blog/category/${post.category.slug}`,
              },
            ]
          : []),
        {
          "@type": "ListItem",
          position: post.category ? 4 : 3,
          name: post.title,
          item: url,
        },
      ],
    },
  ];

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return (
    <div
      className="w-full bg-white text-[var(--color-clinic-navy)]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
        }}
      />

      <ReadingProgress />
      <ClinicNavbar />
      <div className="h-[118px] md:h-[126px] bg-[var(--color-clinic-hero-top)]" />

      {/* HEADER */}
      <header className="bg-[var(--color-clinic-hero-top)]">
        <div className="mx-auto max-w-[820px] px-[20px] pb-[38px] pt-[10px] md:pb-[48px] md:pt-[22px]">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-[22px] flex flex-wrap items-center gap-[6px] text-[12px] text-[#8a857f]"
          >
            <Link href="/" className="transition-colors hover:text-[var(--color-clinic-teal)]">
              Home
            </Link>
            <ChevronRight className="h-[13px] w-[13px]" aria-hidden />
            <Link href="/blog" className="transition-colors hover:text-[var(--color-clinic-teal)]">
              Blog
            </Link>
            {post.category && (
              <>
                <ChevronRight className="h-[13px] w-[13px]" aria-hidden />
                <Link
                  href={`/blog/category/${post.category.slug}`}
                  className="transition-colors hover:text-[var(--color-clinic-teal)]"
                >
                  {post.category.name}
                </Link>
              </>
            )}
          </nav>

          {post.category && (
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="mb-[16px] inline-block text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] transition-colors hover:text-[var(--color-clinic-teal-dark)]"
            >
              {post.category.name}
            </Link>
          )}

          <h1 className="mb-[20px] text-[30px] font-semibold leading-[1.16] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[44px] md:leading-[1.1]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mb-[28px] max-w-[680px] text-[17px] leading-[1.7] text-[#5a5651] md:text-[19px]">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-col gap-[16px] border-t border-[#e2ded8] pt-[22px] md:flex-row md:items-center md:justify-between">
            <AuthorByline author={post.author} reviewer={post.reviewer} />
            <div className="flex items-center gap-[10px] text-[12px] text-[#8a857f]">
              <span>
                {wasUpdated ? "Updated " : ""}
                {formatDate(wasUpdated ? post.updated_at : post.published_at)}
              </span>
              <span className="h-[3px] w-[3px] rounded-full bg-[#cfcac4]" />
              <span>{post.reading_minutes} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* COVER */}
      {post.cover_image_url && (
        <div className="bg-[var(--color-clinic-hero-top)] pb-[50px] md:pb-[70px]">
          <div className="mx-auto max-w-[1000px] px-[20px] md:px-[40px]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-[#e4f1f2] md:aspect-[21/9]">
              <Image
                src={post.cover_image_url}
                alt={post.cover_image_alt ?? post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1000px) 100vw, 1000px"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* BODY */}
      <div className="motion-scope">
        <ScrollMotion />

        <section className={post.cover_image_url ? "pb-[20px]" : "pt-[50px] md:pt-[64px]"}>
          <div className="mx-auto max-w-[1080px] px-[20px] md:px-[40px]">
            <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-[64px]">
              {/* TOC */}
              <aside className="mb-[36px] hidden lg:block">
                <TableOfContents headings={headings} />
              </aside>

              <div className="max-w-[720px]">
                {post.key_takeaways.length > 0 && (
                  <div className="mb-[38px]">
                    <KeyTakeaways items={post.key_takeaways} />
                  </div>
                )}

                <article
                  id="article-body"
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: html }}
                />

                {post.tags.length > 0 && (
                  <div className="mt-[40px] flex flex-wrap items-center gap-[8px]">
                    <span className="mr-[4px] text-[11px] font-bold uppercase tracking-[0.16em] text-[#8a857f]">
                      Topics
                    </span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-flex h-[32px] items-center rounded-full bg-[#f4f2ee] px-[14px] text-[12px] font-medium text-[#5a5651]"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-[34px] border-t border-[#eeebe6] pt-[26px]">
                  <ShareButtons url={url} title={post.title} />
                </div>

                <div className="mt-[48px]">
                  <InlineCta category={post.category} />
                </div>

                {faqs.length > 0 && (
                  <div className="mt-[56px]">
                    <PostFaqs faqs={faqs} />
                  </div>
                )}

                {post.author && (
                  <div className="mt-[56px]">
                    <AuthorCard author={post.author} />
                  </div>
                )}

                {post.reviewer && post.reviewer.id !== post.author?.id && (
                  <p className="mt-[22px] text-[13px] leading-[1.7] text-[#8a857f]">
                    Medically reviewed by{" "}
                    <span className="font-semibold text-[var(--color-clinic-navy)]">
                      {post.reviewer.name}
                    </span>
                    {post.reviewer.credentials ? ` — ${post.reviewer.credentials}` : ""}
                    . This article is for general information and is not a
                    substitute for a personal consultation.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-[70px] md:mt-[90px]">
          <RelatedPosts posts={related} />
        </div>
      </div>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
