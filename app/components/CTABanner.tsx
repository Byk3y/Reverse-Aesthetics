import Link from "next/link";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  variant?: "gold" | "purple";
}

export default function CTABanner({
  title = "Ready to begin your transformation?",
  subtitle = "Book a consultation with our expert team and discover what's possible.",
  buttonText = "Book a Visit",
  buttonHref = "/booking",
}: CTABannerProps) {
  return (
    <section className="relative overflow-hidden border-t border-warm-gray-100">
      <div className="bg-charcoal">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 py-24 lg:py-32 text-center relative z-10">
          <hr className="divider-gold mx-auto mb-8" />
          <h2
            className="text-[1.75rem] lg:text-[2.75rem] mb-5 text-white font-bold leading-[1.15]"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            {title}
          </h2>
          <p className="text-white/55 text-base lg:text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={buttonHref}
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-charcoal text-[12px] font-semibold uppercase tracking-[0.08em] rounded-[20px] transition-all duration-300 hover:bg-bronze hover:text-white"
            >
              {buttonText}
            </Link>
            <a
              href="https://wa.me/2349159188094"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 border border-white/30 text-white text-[12px] font-semibold uppercase tracking-[0.08em] rounded-[20px] transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
