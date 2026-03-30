import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTABanner from "../components/CTABanner";

export const metadata: Metadata = {
  title: "Journal | Reverse Aesthetics",
  description: "Insights, advice, and stories from Nigeria's leading aesthetic experts on skincare, wellness, and cosmetic treatments.",
};

const posts = [
  {
    title: "Understanding Your Skin Barrier: Why Less is More",
    excerpt: "Before investing in active ingredients, understanding your skin's natural defense system is crucial for a healthy, glowing complexion.",
    category: "Skincare",
    date: "March 15, 2026",
    readingTime: "4 min read",
    image: "/images/generated/blog_skincare.png",
    slug: "understanding-skin-barrier",
  },
  {
    title: "Holistic Wellness: The Connection Between Gut Health and Skin",
    excerpt: "How what you eat affects the appearance of your skin, and why true aesthetic longevity starts from within.",
    category: "Wellness",
    date: "March 02, 2026",
    readingTime: "6 min read",
    image: "/images/generated/blog_wellness.png",
    slug: "gut-health-and-skin",
  },
  {
    title: "Veneers vs. Bonding: Choosing Your Perfect Smile",
    excerpt: "A comprehensive guide to cosmetic dental options, their longevity, and what to expect during your transformation journey.",
    category: "Dental Aesthetics",
    date: "February 20, 2026",
    readingTime: "5 min read",
    image: "/images/generated/blog_dental.png",
    slug: "veneers-vs-bonding",
  },
];

export default function BlogPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="pt-28 lg:pt-32 pb-16 bg-ivory border-b border-warm-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              The Journal
            </p>
            <h1
              className="text-plum mb-6 text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              <span className="italic">Expert insights</span> on aesthetics, wellness, and beauty.
            </h1>
            <p className="text-plum-muted text-lg leading-relaxed">
              Educational resources, treatment guides, and clinical advice written
              by our medical team.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post (First item) */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <Link href={`/blog/${posts[0].slug}`} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group block">
              <Image
                src={posts[0].image}
                alt={posts[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-xs font-semibold text-plum uppercase tracking-wider">
                  Featured
                </span>
              </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-gold font-medium uppercase tracking-widest mb-4">
                <span>{posts[0].category}</span>
                <span className="w-1 h-1 rounded-full bg-warm-gray-300" />
                <span className="text-plum-muted">{posts[0].date}</span>
              </div>
              <h2
                className="text-3xl lg:text-4xl text-plum mb-4 hover:text-purple-600 transition-colors"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                <Link href={`/blog/${posts[0].slug}`}>
                  {posts[0].title}
                </Link>
              </h2>
              <p className="text-plum-muted text-lg leading-relaxed mb-8">
                {posts[0].excerpt}
              </p>
              
              <div className="flex items-center gap-4">
                <Link href={`/blog/${posts[0].slug}`} className="btn-outline">
                  Read Article
                </Link>
                <span className="text-sm text-plum-muted">{posts[0].readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Posts */}
      <section className="pb-24 lg:pb-32 bg-white border-t border-warm-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-16">
          <h3
            className="text-2xl text-plum mb-10"
            style={{ fontFamily: "var(--font-playfair), serif" }}
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
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <span className="text-xs font-semibold text-plum uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-plum-muted uppercase tracking-widest mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-warm-gray-200" />
                    <span>{post.readingTime}</span>
                  </div>
                  <h4
                    className="text-xl text-plum mb-3 group-hover:text-purple-600 transition-colors"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h4>
                  <p className="text-plum-muted text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-gold font-semibold text-sm uppercase tracking-wide inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                    >
                      Read More
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        variant="gold"
        title="Ready to start your journey?"
        subtitle="Consult with our experts for professional, medically-sound advice."
      />
      <Footer />
    </main>
  );
}
