export type PostStatus = "draft" | "scheduled" | "published";

export interface Author {
  id: string;
  slug: string;
  name: string;
  role: string | null;
  credentials: string | null;
  bio: string | null;
  avatar_url: string | null;
  same_as: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  clinic_href: string | null;
  cta_label: string | null;
  sort_order: number;
}

export interface Tag {
  id: string;
  slug: string;
  name: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;

  body: unknown | null;
  body_html: string | null;

  cover_image_url: string | null;
  cover_image_alt: string | null;

  category_id: string | null;
  author_id: string | null;
  reviewer_id: string | null;

  status: PostStatus;
  published_at: string | null;
  featured: boolean;
  reading_minutes: number;

  key_takeaways: string[];
  faqs: Faq[];

  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;

  created_at: string;
  updated_at: string;
}

/** A post with its joined relations, as returned by the public queries. */
export interface PostWithRelations extends Post {
  category: Category | null;
  author: Author | null;
  reviewer: Author | null;
  tags: Tag[];
}

/** Trimmed shape used by cards and lists. */
export interface PostCard {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  published_at: string | null;
  reading_minutes: number;
  featured: boolean;
  category: Pick<Category, "slug" | "name"> | null;
  author: Pick<Author, "name" | "avatar_url"> | null;
}
