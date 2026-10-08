import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { CATEGORIES, getService } from "@/lib/data";
import { getMarket } from "@/lib/markets";
import { alternates } from "@/lib/seo";
import type { Service } from "@/lib/types";

type HomeProps = {
  params: Promise<{ market: string }>;
};

// This runs on the server and fills in the <title> and description for Google
export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { market: marketCode } = await params;
  const market = getMarket(marketCode)!;

  return {
    title: `Branding services in ${market.country}`,
    description: market.sub,
    alternates: alternates(market.code, ""),
  };
}

export default async function Home({ params }: HomeProps) {
  // 1. Get the market code from the URL ("ng", "us", ...)
  const { market: marketCode } = await params;

  // 2. Get that market's settings
  const market = getMarket(marketCode)!;

  // 3. Turn the list of featured slugs into full service objects
  const featured: Service[] = [];
  for (const slug of market.featured) {
    const service = getService(slug);
    if (service) {
      featured.push(service);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="rounded-2xl bg-ink px-6 py-14 text-white sm:px-12 sm:py-20">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
          {market.headline}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white/80">{market.sub}</p>
        <Link
          href={`/${market.code}/services`}
          className="mt-8 inline-block rounded-md bg-sun px-6 py-3 font-bold text-ink hover:bg-white"
        >
          Browse all services
        </Link>
      </section>

      {/* Categories */}
      <section aria-labelledby="cats" className="mt-12">
        <h2 id="cats" className="text-2xl font-bold">
          Shop by category
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          {CATEGORIES.map((category) => (
            <li key={category.id}>
              <Link
                href={`/${market.code}/services?category=${category.id}`}
                className="block h-full rounded-xl border border-ink/10 bg-white p-4 hover:border-brand"
              >
                <span className="block font-bold">{category.label}</span>
                <span className="text-sm text-ink/60">{category.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured services for this market */}
      <section aria-labelledby="feat" className="mt-12">
        <h2 id="feat" className="text-2xl font-bold">
          Popular in {market.country}
        </h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              market={market}
              priority={index < 2}
            />
          ))}
        </div>
      </section>
    </>
  );
}
