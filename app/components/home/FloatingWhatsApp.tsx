import { WHATSAPP_URL } from "./homeData";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className="h-full w-full">
      <path d="M16.04 3.2c-7.02 0-12.72 5.64-12.72 12.6 0 2.26.61 4.46 1.76 6.38L3.2 29l7-1.82a12.9 12.9 0 0 0 5.84 1.4c7.02 0 12.72-5.64 12.72-12.6S23.06 3.2 16.04 3.2Zm0 23.24c-1.84 0-3.64-.48-5.22-1.4l-.38-.22-4.16 1.08 1.1-4.02-.26-.42a10.36 10.36 0 0 1-1.58-5.48c0-5.78 4.72-10.48 10.5-10.48 5.8 0 10.5 4.7 10.5 10.48s-4.7 10.46-10.5 10.46Zm5.76-7.84c-.32-.16-1.86-.92-2.14-1.02-.28-.1-.5-.16-.7.16-.2.3-.8 1.02-.98 1.22-.18.2-.36.22-.68.08-.32-.16-1.34-.5-2.56-1.58-.94-.84-1.58-1.88-1.76-2.2-.18-.3-.02-.48.14-.64.14-.14.32-.36.48-.54.16-.18.2-.3.32-.52.1-.2.06-.38-.02-.54-.08-.16-.7-1.68-.96-2.3-.26-.6-.52-.52-.7-.54h-.6c-.2 0-.54.08-.82.38-.28.3-1.08 1.06-1.08 2.58s1.1 2.98 1.26 3.18c.16.2 2.18 3.32 5.28 4.66.74.32 1.32.5 1.76.64.74.24 1.42.2 1.96.12.6-.1 1.86-.76 2.12-1.5.26-.72.26-1.36.18-1.5-.08-.12-.28-.2-.6-.36Z" />
    </svg>
  );
}

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Reverse Aesthetics on WhatsApp"
      className="group fixed bottom-[18px] right-[18px] z-[120] inline-flex items-center gap-[10px] rounded-full border border-white/40 bg-[linear-gradient(135deg,#18b75f,#087a40)] p-[11px] pr-[16px] text-white shadow-[0_24px_55px_-24px_rgba(8,122,64,0.95),inset_0_1px_0_rgba(255,255,255,0.28)] transition-transform duration-200 [animation:whatsapp-float-in_560ms_cubic-bezier(0.2,0.8,0.2,1)_700ms_both] hover:-translate-y-[3px] md:bottom-[22px] md:right-[22px]"
    >
      <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/96 p-[6px] text-[#087a40]">
        <WhatsAppIcon />
      </span>
      <span className="hidden flex-col leading-[1.05] sm:flex">
        <strong className="text-[0.95rem] font-bold">WhatsApp</strong>
        <small className="text-[0.74rem] font-bold text-white/85">Book directly</small>
      </span>
    </a>
  );
}
