"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2, MoreHorizontal } from "lucide-react";
import { deletePost, setPostStatus } from "../../admin/actions";
import type { PostStatus } from "../../lib/blog/types";

export default function PostRowActions({
  id,
  title,
  status,
}: {
  id: string;
  title: string;
  status: PostStatus;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = (fn: () => Promise<{ ok: boolean; error?: string }>) => {
    setOpen(false);
    setError(null);
    startTransition(async () => {
      const result = await fn();
      if (!result.ok) setError(result.error ?? "Something went wrong.");
      else router.refresh();
    });
  };

  const item =
    "block w-full px-[14px] py-[9px] text-left text-[13px] text-[#3f3b37] transition-colors hover:bg-[#f4f2ee]";

  return (
    <div className="relative flex items-center justify-end gap-[8px]">
      {error && (
        <span className="max-w-[200px] text-[11px] leading-[1.4] text-[#a3312c]">
          {error}
        </span>
      )}

      {pending ? (
        <Loader2
          className="h-[16px] w-[16px] animate-spin text-[#8a857f]"
          aria-hidden
        />
      ) : (
        <button
          type="button"
          aria-label={`Actions for ${title}`}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-full text-[#8a857f] transition-colors hover:bg-[#f0eeea] hover:text-[var(--color-clinic-navy)]"
        >
          <MoreHorizontal className="h-[17px] w-[17px]" aria-hidden />
        </button>
      )}

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[40] cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-[36px] z-[50] w-[190px] overflow-hidden rounded-[12px] border border-[#e6e2dc] bg-white py-[5px] shadow-[0_12px_34px_rgba(0,0,0,0.12)]">
            {status !== "published" && (
              <button
                type="button"
                className={item}
                onClick={() => run(() => setPostStatus(id, "published"))}
              >
                Publish now
              </button>
            )}
            {status === "published" && (
              <button
                type="button"
                className={item}
                onClick={() => run(() => setPostStatus(id, "draft"))}
              >
                Revert to draft
              </button>
            )}
            <button
              type="button"
              className={`${item} text-[#a3312c]`}
              onClick={() => {
                if (
                  window.confirm(
                    `Delete "${title}"? This removes the post permanently.`
                  )
                ) {
                  run(() => deletePost(id));
                }
              }}
            >
              Delete post
            </button>
          </div>
        </>
      )}
    </div>
  );
}
