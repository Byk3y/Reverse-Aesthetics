import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPage from "@/app/components/lp/LandingPage";
import { LP_SERVICES, getService } from "@/app/components/lp/lpData";

export function generateStaticParams() {
  return LP_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/lp/${service.slug}` },
    // Kept out of the organic index on purpose. These pages target the same
    // intent as /treatments/* — indexing both would split link signals and let
    // Google rank the nav-less ad page for a query the treatment page should
    // win. Google Ads serves noindexed destinations without issue.
    robots: { index: false, follow: true },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [{ url: service.image }],
    },
  };
}

export default async function LandingRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <LandingPage service={service} />;
}
