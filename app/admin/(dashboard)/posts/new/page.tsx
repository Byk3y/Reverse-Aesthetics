import PostEditor from "../../../../components/admin/PostEditor";
import {
  listAuthors,
  listCategoriesForAdmin,
} from "../../../../lib/blog/admin-queries";

export default async function NewPostPage() {
  const [categories, authors] = await Promise.all([
    listCategoriesForAdmin(),
    listAuthors(),
  ]);

  return <PostEditor post={null} categories={categories} authors={authors} />;
}
