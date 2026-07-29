"use client";

import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image as TiptapImage } from "@tiptap/extension-image";
import { Link as TiptapLink } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { uploadMedia } from "../../lib/blog/upload";

interface Props {
  initialContent: unknown | null;
  onChange: (value: { json: unknown; html: string }) => void;
}

export default function RichTextEditor({ initialContent, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    // Required in Next.js — rendering the editor during SSR causes a
    // hydration mismatch.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        // Registered separately below so the options are explicit.
        link: false,
      }),
      TiptapLink.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
      TiptapImage.configure({ HTMLAttributes: { loading: "lazy" } }),
      Placeholder.configure({
        placeholder: "Write the article… Use Heading 2 for each main section.",
      }),
    ],
    content: (initialContent as object) ?? "",
    editorProps: {
      attributes: {
        class: "article-body min-h-[420px] outline-none",
      },
    },
    onUpdate: ({ editor: e }) => {
      onChange({ json: e.getJSON(), html: e.getHTML() });
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const input = window.prompt("Link URL", previous ?? "https://");
    if (input === null) return;

    if (input.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: input.trim() })
      .run();
  }, [editor]);

  const insertImage = async (file: File) => {
    if (!editor) return;
    setUploading(true);
    setUploadError(null);

    const result = await uploadMedia(file, "inline");

    if (!result.ok) {
      setUploadError(result.error);
    } else {
      const alt = window.prompt("Describe this image (for accessibility & SEO)") ?? "";
      editor.chain().focus().setImage({ src: result.url, alt }).run();
    }

    setUploading(false);
    if (fileInput.current) fileInput.current.value = "";
  };

  if (!editor) {
    return (
      <div className="h-[480px] animate-pulse rounded-[12px] border border-[#e0dcd6] bg-[#faf9f7]" />
    );
  }

  return (
    <div className="overflow-hidden rounded-[12px] border border-[#e0dcd6] bg-white">
      <div className="flex flex-wrap items-center gap-[3px] border-b border-[#eeebe6] bg-[#faf9f7] px-[10px] py-[8px]">
        <ToolButton
          editor={editor}
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-[15px] w-[15px]" aria-hidden />
        </ToolButton>
        <ToolButton
          editor={editor}
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-[15px] w-[15px]" aria-hidden />
        </ToolButton>

        <Divider />

        <ToolButton
          editor={editor}
          label="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="h-[16px] w-[16px]" aria-hidden />
        </ToolButton>
        <ToolButton
          editor={editor}
          label="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="h-[16px] w-[16px]" aria-hidden />
        </ToolButton>

        <Divider />

        <ToolButton
          editor={editor}
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-[16px] w-[16px]" aria-hidden />
        </ToolButton>
        <ToolButton
          editor={editor}
          label="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-[16px] w-[16px]" aria-hidden />
        </ToolButton>
        <ToolButton
          editor={editor}
          label="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-[15px] w-[15px]" aria-hidden />
        </ToolButton>
        <ToolButton
          editor={editor}
          label="Divider"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="h-[16px] w-[16px]" aria-hidden />
        </ToolButton>

        <Divider />

        <ToolButton
          editor={editor}
          label="Add link"
          active={editor.isActive("link")}
          onClick={setLink}
        >
          <Link2 className="h-[16px] w-[16px]" aria-hidden />
        </ToolButton>
        {editor.isActive("link") && (
          <ToolButton
            editor={editor}
            label="Remove link"
            onClick={() => editor.chain().focus().unsetLink().run()}
          >
            <Link2Off className="h-[16px] w-[16px]" aria-hidden />
          </ToolButton>
        )}
        <ToolButton
          editor={editor}
          label="Insert image"
          disabled={uploading}
          onClick={() => fileInput.current?.click()}
        >
          {uploading ? (
            <Loader2 className="h-[16px] w-[16px] animate-spin" aria-hidden />
          ) : (
            <ImagePlus className="h-[16px] w-[16px]" aria-hidden />
          )}
        </ToolButton>

        <Divider />

        <ToolButton
          editor={editor}
          label="Undo"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 className="h-[15px] w-[15px]" aria-hidden />
        </ToolButton>
        <ToolButton
          editor={editor}
          label="Redo"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 className="h-[15px] w-[15px]" aria-hidden />
        </ToolButton>
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void insertImage(file);
        }}
      />

      {uploadError && (
        <p className="border-b border-[#f6dede] bg-[#fdecec] px-[16px] py-[9px] text-[12px] text-[#a3312c]">
          {uploadError}
        </p>
      )}

      <div className="px-[20px] py-[22px] md:px-[26px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function Divider() {
  return <span className="mx-[4px] h-[20px] w-px bg-[#e0dcd6]" aria-hidden />;
}

function ToolButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  editor: Editor;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-[32px] w-[32px] items-center justify-center rounded-[8px] transition-colors disabled:opacity-35 ${
        active
          ? "bg-[var(--color-clinic-navy)] text-white"
          : "text-[#5a5651] hover:bg-[#eeebe6] hover:text-[var(--color-clinic-navy)]"
      }`}
    >
      {children}
    </button>
  );
}
