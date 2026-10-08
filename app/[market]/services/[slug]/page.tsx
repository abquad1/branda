import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/gallery";
import { PurchasePanel } from "@/components/purchase-panel";
import { ServiceCard } from "@/components/service-card";
import { SERVICES, getService, imageUrl, relatedServices } from "@/lib/data";
import { MARKET_CODES, getMarket } from "@/lib/markets";
import { alternates } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{ market: string; slug: string }>;
};

export function generateStaticParams() {
  const pages = [];

  for (const marketCode of MARKET_CODES) {
    for (const service of SERVICES) {
      pages.push({ market: marketCode, slug: service.slug });
    }
  }

  return pages;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { market: marketCode, slug } = await params;

  const service = getService(slug);
  const market = getMarket(marketCode);

  if (!service || !market) {
    return {};
  }

  const title = `${service.name} in ${market.country}`;

  return {
    title,
    description: service.blurb,
    alternates: alternates(market.code, `/services/${service.slug}`),
    openGraph: {
      title,
      description: service.blurb,
      type: "website",
      locale: market.locale.replace("-", "_"), // "en-NG" becomes "en_NG"
      images: [
        {
          url: imageUrl(service.slug, 1, 1200, 630),
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: service.blurb,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { market: marketCode, slug } = await params;

  const service = getService(slug);
  const market = getMarket(marketCode)!;

  if (!service) {
    notFound();
  }

  const relatedList = relatedServices(service);
  const dayLabel = service.turnaroundDays === 1 ? "day" : "days";

  return (
    <article>
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink/60">
        <Link href={`/${market.code}/services`} className="hover:text-brand">
          Services
        </Link>{" "}
        /{" "}
        <Link
          href={`/${market.code}/services?category=${service.category}`}
          className="capitalize hover:text-brand"
        >
          {service.category}
        </Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left: pictures */}
        <Gallery slug={service.slug} name={service.name} />

        {/* Right: details and buying */}
        <div>
          <h1 className="text-3xl font-extrabold">{service.name}</h1>
          <p className="mt-2 text-ink/70">{service.blurb}</p>

          <p className="mt-3 inline-block rounded bg-sun/60 px-3 py-1 text-sm font-semibold">
            Ready in about {service.turnaroundDays} {dayLabel}
          </p>

          <div className="mt-6">
            <PurchasePanel service={service} market={market} />
          </div>

          <section aria-labelledby="included-title" className="mt-8">
            <h2 id="included-title" className="text-lg font-bold">
              What&apos;s included
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-ink/80">
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section aria-labelledby="related-title" className="mt-14">
        <h2 id="related-title" className="text-2xl font-bold">
          Pairs well with
        </h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedList.map((related) => (
            <ServiceCard key={related.slug} service={related} market={market} />
          ))}
        </div>
      </section>
    </article>
  );
}
