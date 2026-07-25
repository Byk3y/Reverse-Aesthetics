import { PostCard } from "./PostCard";
import type { PostCard as PostCardData } from "../../lib/blog/types";

export default function RelatedPosts({ posts }: { posts: PostCardData[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-[#eeebe6] bg-white py-[60px] md:py-[80px]">
      <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
        <h2 className="motion-heading mb-[36px] text-[22px] font-semibold tracking-[-0.01em] text-[var(--color-clinic-navy)] md:text-[26px]">
          Keep reading
        </h2>
        <div className="grid gap-x-[28px] gap-y-[44px] md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
