import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { CATEGORIES, USE_CASES } from "@/lib/data";
import { getMarket } from "@/lib/markets";
import { buildHref, parseFilters, queryServices } from "@/lib/query";
import { alternates } from "@/lib/seo";
import type { Filters } from "@/lib/types";

// Filters live in the URL, so this page is rendered fresh on every request.
export const dynamic = "force-dynamic";

type ServicesPageProps = {
  params: Promise<{ market: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const SORT_OPTIONS = [
  { value: "popular", label: "Most popular" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

//  SEO tags: title and description change with the chosen category
export async function generateMetadata({
  params,
  searchParams,
}: ServicesPageProps): Promise<Metadata> {
  const { market: marketCode } = await params;
  const market = getMarket(marketCode)!;
  const filters = parseFilters(await searchParams);

  const category = CATEGORIES.find((c) => c.id === filters.category);
  const categoryQuery = category ? `?category=${category.id}` : "";

  return {
    title: category
      ? `${category.label} branding services`
      : "All branding services",
    description: `Compare branding services and prices in ${market.currency}. ${category?.tagline ?? ""}`,
    alternates: alternates(market.code, `/services${categoryQuery}`),
  };
}

type FilterLinkProps = {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
};

function FilterLink({ href, isActive, children }: FilterLinkProps) {
  const style = isActive
    ? "border-brand bg-brand text-white"
    : "border-ink/20 bg-white hover:border-brand";

  return (
    <Link
      href={href}
      aria-current={isActive ? "true" : undefined}
      className={`rounded-full border px-3 py-1.5 text-sm ${style}`}
    >
      {children}
    </Link>
  );
}

export default async function ServicesPage({
  params,
  searchParams,
}: ServicesPageProps) {
  const { market: marketCode } = await params;
  const market = getMarket(marketCode)!;

  // Read the URL filters and run the search
  const filters = parseFilters(await searchParams);
  const { items, total, pages, page } = queryServices(filters);

  // Builds a link that keeps current filters and changes only what we pass
  const linkWith = (change: Partial<Filters>) =>
    buildHref(market.code, filters, change);

  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Branding services</h1>

      {/* Search box: a normal form, no JavaScript needed */}
      <form
        action={`/${market.code}/services`}
        role="search"
        className="mt-5 flex gap-2"
      >
        {/* Hidden inputs carry the other filters through when searching */}
        {filters.category && (
          <input type="hidden" name="category" value={filters.category} />
        )}
        {filters.useCase && (
          <input type="hidden" name="useCase" value={filters.useCase} />
        )}
        {filters.urgency && (
          <input type="hidden" name="urgency" value={filters.urgency} />
        )}
        {filters.sort !== "popular" && (
          <input type="hidden" name="sort" value={filters.sort} />
        )}

        <label className="flex-1">
          <span className="sr-only">Search services</span>
          <input
            name="q"
            defaultValue={filters.q}
            placeholder="Search logos, mugs, banners…"
            className="w-full rounded-md border border-ink/20 bg-white px-4 py-3"
          />
        </label>
        <button className="rounded-md bg-ink px-5 font-semibold text-white hover:bg-brand">
          Search
        </button>
      </form>

      {/* Filters */}
      <div className="mt-5 space-y-3">
        <nav aria-label="Category filter" className="flex flex-wrap gap-2">
          <FilterLink
            href={linkWith({ category: undefined })}
            isActive={!filters.category}
          >
            All
          </FilterLink>
          {CATEGORIES.map((category) => (
            <FilterLink
              key={category.id}
              href={linkWith({ category: category.id })}
              isActive={filters.category === category.id}
            >
              {category.label}
            </FilterLink>
          ))}
        </nav>

        <nav
          aria-label="Use case and urgency filter"
          className="flex flex-wrap items-center gap-2"
        >
          <span className="text-sm font-semibold">Use case</span>
          {USE_CASES.map((useCase) => {
            const isActive = filters.useCase === useCase.id;
            return (
              <FilterLink
                key={useCase.id}
                // Clicking the active one again turns it off
                href={linkWith({ useCase: isActive ? undefined : useCase.id })}
                isActive={isActive}
              >
                {useCase.label}
              </FilterLink>
            );
          })}

          <span className="ml-3 text-sm font-semibold">Urgency</span>
          <FilterLink
            href={linkWith({
              urgency: filters.urgency ? undefined : "express",
            })}
            isActive={!!filters.urgency}
          >
            Ready in 2 days
          </FilterLink>
        </nav>

        <nav aria-label="Sort" className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold">Sort</span>
          {SORT_OPTIONS.map((option) => (
            <FilterLink
              key={option.value}
              href={linkWith({ sort: option.value })}
              isActive={filters.sort === option.value}
            >
              {option.label}
            </FilterLink>
          ))}
        </nav>
      </div>

      {/* Result count, read aloud by screen readers when it changes */}
      <p className="mt-6 text-sm text-ink/60" role="status">
        {total} {total === 1 ? "service" : "services"} found
      </p>

      {/* Results, or the empty state */}
      {items.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-ink/30 bg-white p-10 text-center">
          <p className="text-lg font-bold">No services match your search</p>
          <p className="mt-1 text-ink/70">
            Try a different word or clear your filters.
          </p>
          <Link
            href={`/${market.code}/services`}
            className="mt-4 inline-block rounded-md bg-brand px-4 py-2 font-semibold text-white"
          >
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              market={market}
              priority={index < 3}
            />
          ))}
        </div>
      )}

      {/* Pagination: only when there is more than one page */}
      {pages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-10 flex items-center justify-center gap-2"
        >
          {pageNumbers.map((number) => (
            <Link
              key={number}
              href={linkWith({ page: number })}
              aria-current={number === page ? "page" : undefined}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                number === page
                  ? "border-brand bg-brand text-white"
                  : "border-ink/20 bg-white hover:border-brand"
              }`}
            >
              {number}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
