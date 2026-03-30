import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Aesthetics & Dermatology",
    description:
      "Advanced skincare, injectables, skin tightening, and glow treatments tailored to your unique complexion.",
    image: "/images/generated/aesthetics_service.png",
    href: "/clinics/aesthetics",
    treatments: ["Botox & Fillers", "HIFU & Thread Lift", "Laser Treatments", "Chemical Peels"],
  },
  {
    title: "Weight Loss",
    description:
      "Medical programs, injection support, and body contouring for sustainable, healthy transformation.",
    image: "/images/generated/weightloss_service.png",
    href: "/clinics",
    treatments: ["Medical Programs", "Injection Support", "Body Contouring", "Wellness Plans"],
  },
  {
    title: "Dental Aesthetics",
    description:
      "Smile makeovers, whitening, veneers, and gum aesthetics for your most confident smile.",
    image: "/images/services/dental.avif",
    href: "/clinics",
    treatments: ["Teeth Whitening", "Veneers", "Smile Design", "Gum Contouring"],
  },
  {
    title: "Hair Restoration",
    description:
      "Transplant, regeneration, and hair health optimization with surgical and non-surgical solutions.",
    image: "/images/services/hair-services.jpg",
    href: "/clinics",
    treatments: ["Hair Transplant", "Beard & Eyebrow", "PRP Therapy", "Scalp Treatments"],
  },
];

export default function ServiceCards() {
  return (
    <section className="section-padding bg-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-14">
          <hr className="divider-gold mx-auto mb-6" />
          <h2
            className="text-plum mb-4"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Our Clinics
          </h2>
          <p className="text-plum-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Four specialist clinics under one roof, each led by accredited professionals
            delivering world-class results.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="card-luxury group flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 lg:h-72 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/40 to-transparent" />
                <h3
                  className="absolute bottom-4 left-6 text-white text-2xl"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {service.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-plum-muted text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Treatment Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.treatments.map((treatment) => (
                    <span
                      key={treatment}
                      className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full font-medium"
                    >
                      {treatment}
                    </span>
                  ))}
                </div>

                {/* Explore Link */}
                <div className="mt-auto flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wide group-hover:gap-3 transition-all duration-300">
                  <span>Explore</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
