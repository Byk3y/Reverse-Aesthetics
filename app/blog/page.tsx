import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTABanner from "../components/CTABanner";

export const metadata: Metadata = {
  title: "Blog | Reverse Aesthetics",
  description: "Insights, advice, and stories from Nigeria's leading aesthetic experts on skincare, wellness, and cosmetic treatments.",
};

const posts = [
  {
    title: "Understanding Your Skin Barrier: Why Less is More",
    excerpt: "Before investing in active ingredients, understanding your skin's natural defense system is crucial for a healthy, glowing complexion.",
    category: "Skincare",
    date: "March 15, 2026",
    readingTime: "4 min read",
    image: "/images/generated/blog_skincare.avif",
    slug: "understanding-skin-barrier",
  },
  {
    title: "Holistic Wellness: The Connection Between Gut Health and Skin",
    excerpt: "How what you eat affects the appearance of your skin, and why true aesthetic longevity starts from within.",
    category: "Wellness",
    date: "March 02, 2026",
    readingTime: "6 min read",
    image: "/images/generated/blog_wellness.avif",
    slug: "gut-health-and-skin",
  },
  {
    title: "Veneers vs. Bonding: Choosing Your Perfect Smile",
    excerpt: "A comprehensive guide to cosmetic dental options, their longevity, and what to expect during your transformation journey.",
    category: "Dental Aesthetics",
    date: "February 20, 2026",
    readingTime: "5 min read",
    image: "/images/generated/blog_dental.avif",
    slug: "veneers-vs-bonding",
  },
];

export default function BlogPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-16 bg-ivory border-b border-warm-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze mb-5">
              The Blog
            </p>
            <h1
              className="text-charcoal mb-6 text-4xl lg:text-5xl font-light"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              <span className="italic">Expert insights</span> on aesthetics, wellness, and beauty.
            </h1>
            <p className="text-warm-gray-400 text-lg leading-relaxed font-light">
              Educational resources, treatment guides, and clinical advice written
              by our medical team.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <Link href={`/blog/${posts[0].slug}`} className="relative aspect-[4/3] overflow-hidden group block">
              <Image
                src={posts[0].image}
                alt={posts[0].title}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1">
                <span className="text-[10px] font-medium text-charcoal uppercase tracking-[0.2em]">
                  Featured
                </span>
              </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] mb-5">
                <span className="text-bronze font-medium">{posts[0].category}</span>
                <span className="w-1 h-1 rounded-full bg-warm-gray-200" />
                <span className="text-warm-gray-400">{posts[0].date}</span>
              </div>
              <h2
                className="text-3xl lg:text-4xl text-charcoal mb-4 font-light hover:text-bronze transition-colors"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                <Link href={`/blog/${posts[0].slug}`}>
                  {posts[0].title}
                </Link>
              </h2>
              <p className="text-warm-gray-400 text-lg leading-relaxed mb-8 font-light">
                {posts[0].excerpt}
              </p>

              <div className="flex items-center gap-4">
                <Link href={`/blog/${posts[0].slug}`} className="btn-outline">
                  Read Article
                </Link>
                <span className="text-sm text-warm-gray-300">{posts[0].readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Posts */}
      <section className="pb-24 lg:pb-32 bg-white border-t border-warm-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-16">
          <h3
            className="text-2xl text-charcoal mb-10 font-light"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Latest Articles
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <article
                key={post.slug}
                className="group cursor-pointer flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1">
                    <span className="text-[10px] font-medium text-charcoal uppercase tracking-[0.2em]">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-warm-gray-400 mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-warm-gray-200" />
                    <span>{post.readingTime}</span>
                  </div>
                  <h4
                    className="text-xl text-charcoal mb-3 font-light group-hover:text-bronze transition-colors"
                    style={{ fontFamily: "var(--font-display), serif" }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h4>
                  <p className="text-warm-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow font-light">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative inline-block text-[11px] font-medium text-charcoal uppercase tracking-[0.2em]"
                    >
                      Read More
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-bronze group-hover:w-full transition-all duration-400" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to start your journey?"
        subtitle="Consult with our experts for professional, medically-sound advice."
      />
      <Footer />
    </main>
  );
}
