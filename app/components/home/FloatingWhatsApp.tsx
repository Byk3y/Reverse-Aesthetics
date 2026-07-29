import WhatsAppIcon from "../WhatsAppIcon";
import { WHATSAPP_URL } from "./homeData";

/**
 * Just the mark — no pill, no plate behind it. The artwork is already a green
 * bubble with its own glow, so wrapping it in a white circle inside a green pill
 * stacked green-on-white-on-green and read as a blob at thumb size.
 * The drop shadow is what keeps it legible over photography.
 */
export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Reverse Aesthetics on WhatsApp"
      className="fixed bottom-[18px] right-[18px] z-[120] block h-[58px] w-[58px] drop-shadow-[0_10px_22px_rgba(8,122,64,0.45)] transition-transform duration-200 [animation:whatsapp-float-in_560ms_cubic-bezier(0.2,0.8,0.2,1)_700ms_both] hover:-translate-y-[3px] md:bottom-[22px] md:right-[22px] md:h-[62px] md:w-[62px]"
    >
      <WhatsAppIcon className="h-full w-full" />
    </a>
  );
}
