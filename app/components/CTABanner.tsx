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
  variant = "gold",
}: CTABannerProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        className={`${
          variant === "gold"
            ? "bg-gradient-to-br from-gold-100 via-gold-50 to-ivory"
            : "bg-gradient-to-br from-purple-100 via-purple-50 to-ivory"
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl" />

        <div className="mx-auto max-w-4xl px-6 lg:px-12 py-20 lg:py-28 text-center relative z-10">
          <hr className="divider-gold mx-auto mb-8" />
          <h2
            className="text-3xl lg:text-4xl mb-4 text-plum"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {title}
          </h2>
          <p className="text-plum-muted text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={buttonHref}
              className={variant === "gold" ? "btn-gold" : "btn-purple"}
            >
              {buttonText}
            </Link>
            <a
              href="https://wa.me/2349159188094"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
