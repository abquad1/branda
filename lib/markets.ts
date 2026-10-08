import type { Market, MarketCode } from "./types";

export const MARKETS: Record<MarketCode, Market> = {
  ng: {
    code: "ng", country: "Nigeria", flag: "🇳🇬", currency: "NGN", locale: "en-NG", rate: 1500, taxRate: 0.075, taxLabel: "VAT (7.5%)",
    headline: "Brand your business from Lagos to Abuja",
    sub: "Logos, packaging, branded gifts and event prints, produced locally and delivered nationwide.",
    featured: ["logo-design", "business-cards", "event-backdrops", "branded-tshirts"],
  },
  us: {
    code: "us", country: "United States", flag: "🇺🇸", currency: "USD", locale: "en-US", rate: 1, taxRate: 0.08, taxLabel: "Sales tax (8%)",
    headline: "Branding that gets your startup noticed",
    sub: "Brand identity, merch and studio shoots for US teams, with fast shipping coast to coast.",
    featured: ["brand-identity-kit", "branded-mugs", "product-photography", "corporate-gift-box"],
  },
  uk: {
    code: "uk", country: "United Kingdom", flag: "🇬🇧", currency: "GBP", locale: "en-GB", rate: 0.79, taxRate: 0.2, taxLabel: "VAT (20%)",
    headline: "Branding for UK businesses, big and small",
    sub: "From logo design to branded packaging and print, all priced in pounds.",
    featured: ["packaging-design", "business-cards", "custom-tote-bags", "social-media-kit"],
  },
  ca: {
    code: "ca", country: "Canada", flag: "🇨🇦", currency: "CAD", locale: "en-CA", rate: 1.37, taxRate: 0.05, taxLabel: "GST (5%)",
    headline: "Branding that travels from Vancouver to Halifax",
    sub: "Design, merch and print for Canadian brands, priced in Canadian dollars.",
    featured: ["logo-design", "roll-up-banners", "branded-notebooks", "brand-video-shoot"],
  },
};

export const MARKET_CODES = Object.keys(MARKETS) as MarketCode[];
export const getMarket = (code: string): Market | undefined => MARKETS[code as MarketCode];
