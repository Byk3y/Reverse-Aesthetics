import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndexView from "../../../components/blog/BlogIndexView";
import {
  POSTS_PER_PAGE,
  getCategories,
  getFeaturedPost,
  getPosts,
} from "../../../lib/blog/queries";

export const revalidate = 300;

interface Props {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog — Page ${page} | Reverse Aesthetics`,
    description:
      "More evidence-based guides on skin, injectables, weight loss, hair, and dental aesthetics from the Reverse Aesthetics clinical team.",
    alternates: { canonical: `/blog/page/${page}` },
    robots: { index: false, follow: true },
  };
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { page: pageParam } = await params;
  const page = Number(pageParam);

  if (!Number.isInteger(page) || page < 2) notFound();

  // The featured post is pinned to page 1, so it is excluded everywhere to
  // keep it from appearing twice across the listing.
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedPost(),
  ]);

  const { posts, total } = await getPosts({ page, excludeId: featured?.id });

  if (posts.length === 0) notFound();

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  return (
    <BlogIndexView
      eyebrow="The Reverse Aesthetics Blog"
      titleLead="Evidence-based advice on"
      titleAccent="skin, body, hair, and smile."
      intro="Treatment guides, honest answers, and clinical insight — written by our medical team and reviewed before it reaches you."
      categories={categories}
      posts={posts}
      page={page}
      totalPages={totalPages}
      gridHeading={`More articles — page ${page}`}
    />
  );
}
