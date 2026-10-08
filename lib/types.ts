export type CategoryId = "digital" | "gifts" | "create" | "studio" | "prints";
export type UseCase = "business" | "events" | "gifting" | "retail";
export type MarketCode = "ng" | "us" | "uk" | "ca";

export interface Service {
  slug: string;
  name: string;
  category: CategoryId;
  basePrice: number; // USD, converted per market for display
  discountPct?: number;
  popularity: number;
  useCase: UseCase;
  turnaroundDays: number;
  blurb: string;
  includes: string[];
}

export interface Market {
  code: MarketCode;
  country: string;
  flag: string;
  currency: string;
  locale: string; // BCP-47, also used for hreflang
  rate: number; // 1 USD -> currency (mock rates)
  taxRate: number;
  taxLabel: string;
  headline: string;
  sub: string;
  featured: string[];
}

export interface Filters {
  q?: string;
  category?: CategoryId;
  useCase?: UseCase;
  urgency?: "express";
  sort?: "popular" | "price-asc" | "price-desc";
  page: number;
}
