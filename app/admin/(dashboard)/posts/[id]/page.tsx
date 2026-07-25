import { notFound } from "next/navigation";
import PostEditor from "../../../../components/admin/PostEditor";
import {
  getPostForEdit,
  listAuthors,
  listCategoriesForAdmin,
} from "../../../../lib/blog/admin-queries";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;

  const [post, categories, authors] = await Promise.all([
    getPostForEdit(id),
    listCategoriesForAdmin(),
    listAuthors(),
  ]);

  if (!post) notFound();

  return <PostEditor post={post} categories={categories} authors={authors} />;
}
