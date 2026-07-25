import type { Metadata } from "next";
import BlogIndexView from "../components/blog/BlogIndexView";
import {
  POSTS_PER_PAGE,
  getCategories,
  getFeaturedPost,
  getPosts,
} from "../lib/blog/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog | Expert Aesthetic & Skin Advice — Reverse Aesthetics",
  description:
    "Evidence-based guides on skin, injectables, weight loss, hair, and dental aesthetics — written and medically reviewed by the Reverse Aesthetics clinical team in Lagos and Abuja.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedPost(),
  ]);

  const { posts, total } = await getPosts({
    page: 1,
    excludeId: featured?.id,
  });

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  return (
    <BlogIndexView
      eyebrow="The Reverse Aesthetics Blog"
      titleLead="Evidence-based advice on"
      titleAccent="skin, body, hair, and smile."
      intro="Treatment guides, honest answers, and clinical insight — written by our medical team and reviewed before it reaches you."
      categories={categories}
      featured={featured}
      posts={posts}
      page={1}
      totalPages={totalPages}
    />
  );
}
