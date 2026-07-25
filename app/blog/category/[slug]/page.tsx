import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndexView from "../../../components/blog/BlogIndexView";
import {
  getCategories,
  getCategoryBySlug,
  getPostsByCategory,
} from "../../../lib/blog/queries";

export const revalidate = 300;

/**
 * Categories show up to 24 posts on a single page. Once any single category
 * outgrows that, add /blog/category/[slug]/page/[page] mirroring /blog/page/[page].
 */
const CATEGORY_PER_PAGE = 24;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return { title: "Category not found | Reverse Aesthetics" };

  return {
    title: `${category.name} | Reverse Aesthetics Blog`,
    description:
      category.description ??
      `Articles on ${category.name.toLowerCase()} from the Reverse Aesthetics clinical team.`,
    alternates: { canonical: `/blog/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [category, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ]);

  if (!category) notFound();

  const { posts, total } = await getPostsByCategory(slug, {
    perPage: CATEGORY_PER_PAGE,
  });

  return (
    <BlogIndexView
      eyebrow={`Blog · ${category.name}`}
      titleLead="Everything we've written on"
      titleAccent={category.name.toLowerCase() + "."}
      intro={
        category.description ??
        `Guides and clinical insight on ${category.name.toLowerCase()} from our medical team.`
      }
      categories={categories}
      activeCategorySlug={category.slug}
      posts={posts}
      page={1}
      totalPages={1}
      gridHeading={`${total} article${total === 1 ? "" : "s"}`}
    />
  );
}
