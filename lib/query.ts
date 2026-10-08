import { SERVICES, unitPrice } from "./data";
import type { Filters, MarketCode } from "./types";

export const PAGE_SIZE = 9;
type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function parseFilters(sp: SP): Filters {
  const sort = one(sp.sort);
  return {
    q: one(sp.q)?.trim() || undefined,
    category: one(sp.category) as Filters["category"],
    useCase: one(sp.useCase) as Filters["useCase"],
    urgency: one(sp.urgency) === "express" ? "express" : undefined,
    sort: sort === "price-asc" || sort === "price-desc" ? sort : "popular",
    page: Math.max(1, Number(one(sp.page)) || 1),
  };
}

export function queryServices(f: Filters) {
  const q = f.q?.toLowerCase();
  let items = SERVICES.filter(
    (s) =>
      (!f.category || s.category === f.category) &&
      (!f.useCase || s.useCase === f.useCase) &&
      (!f.urgency || s.turnaroundDays <= 2) &&
      (!q || `${s.name} ${s.blurb} ${s.category} ${s.useCase}`.toLowerCase().includes(q)),
  );
  items = [...items].sort((a, b) =>
    f.sort === "price-asc" ? unitPrice(a) - unitPrice(b) : f.sort === "price-desc" ? unitPrice(b) - unitPrice(a) : b.popularity - a.popularity,
  );
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(f.page, pages);
  return { items: items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), total, pages, page };
}

/** Builds a shareable URL; any filter change resets to page 1. */
export function buildHref(market: MarketCode, f: Filters, patch: Partial<Filters>) {
  const n = { ...f, page: 1, ...patch };
  const u = new URLSearchParams();
  if (n.q) u.set("q", n.q);
  if (n.category) u.set("category", n.category);
  if (n.useCase) u.set("useCase", n.useCase);
  if (n.urgency) u.set("urgency", n.urgency);
  if (n.sort && n.sort !== "popular") u.set("sort", n.sort);
  if (n.page > 1) u.set("page", String(n.page));
  const qs = u.toString();
  return `/${market}/services${qs ? `?${qs}` : ""}`;
}
