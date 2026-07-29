import Image from "next/image";

/**
 * The WhatsApp mark, in the two forms the site needs.
 *
 * `brand` is the supplied full-colour asset — correct wherever it sits on white
 * or a light surface. `mono` is the same logo drawn in currentColor, for the
 * filled teal/navy buttons where the icon has to read as white; a green mark on
 * a green button is effectively invisible. WhatsApp sanctions a solid one-colour
 * version for exactly that case, so both are legitimate uses of the logo.
 */
export default function WhatsAppIcon({
  variant = "brand",
  className = "h-[16px] w-[16px]",
}: {
  variant?: "brand" | "mono";
  className?: string;
}) {
  if (variant === "mono") {
    return (
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
        className={className}
      >
        <path d="M16.04 3.2c-7.02 0-12.72 5.64-12.72 12.6 0 2.26.61 4.46 1.76 6.38L3.2 29l7-1.82a12.9 12.9 0 0 0 5.84 1.4c7.02 0 12.72-5.64 12.72-12.6S23.06 3.2 16.04 3.2Zm0 23.24c-1.84 0-3.64-.48-5.22-1.4l-.38-.22-4.16 1.08 1.1-4.02-.26-.42a10.36 10.36 0 0 1-1.58-5.48c0-5.78 4.72-10.48 10.5-10.48 5.8 0 10.5 4.7 10.5 10.48s-4.7 10.46-10.5 10.46Zm5.76-7.84c-.32-.16-1.86-.92-2.14-1.02-.28-.1-.5-.16-.7.16-.2.3-.8 1.02-.98 1.22-.18.2-.36.22-.68.08-.32-.16-1.34-.5-2.56-1.58-.94-.84-1.58-1.88-1.76-2.2-.18-.3-.02-.48.14-.64.14-.14.32-.36.48-.54.16-.18.2-.3.32-.52.1-.2.06-.38-.02-.54-.08-.16-.7-1.68-.96-2.3-.26-.6-.52-.52-.7-.54h-.6c-.2 0-.54.08-.82.38-.28.3-1.08 1.06-1.08 2.58s1.1 2.98 1.26 3.18c.16.2 2.18 3.32 5.28 4.66.74.32 1.32.5 1.76.64.74.24 1.42.2 1.96.12.6-.1 1.86-.76 2.12-1.5.26-.72.26-1.36.18-1.5-.08-.12-.28-.2-.6-.36Z" />
      </svg>
    );
  }

  return (
    <Image
      src="/images/whatsapp.png"
      alt=""
      aria-hidden
      width={256}
      height={260}
      sizes="64px"
      className={className}
    />
  );
}
