import type { CategoryId, Service, UseCase } from "./types";

export const CATEGORIES: { id: CategoryId; label: string; tagline: string }[] = [
  { id: "digital", label: "Digital", tagline: "Logos, social kits and web assets" },
  { id: "gifts", label: "Gifts", tagline: "Branded items people keep" },
  { id: "create", label: "Create", tagline: "Strategy, copy and packaging" },
  { id: "studio", label: "Studio", tagline: "Photo and video production" },
  { id: "prints", label: "Prints", tagline: "Cards, banners and apparel" },
];

export const USE_CASES: { id: UseCase; label: string }[] = [
  { id: "business", label: "Business" },
  { id: "events", label: "Events" },
  { id: "gifting", label: "Gifting" },
  { id: "retail", label: "Retail" },
];

export const VARIATIONS: Record<CategoryId, { label: string; options: { name: string; mult: number }[] }> = {
  digital: { label: "Package", options: [{ name: "Basic", mult: 1 }, { name: "Standard", mult: 1.6 }, { name: "Premium", mult: 2.4 }] },
  gifts: { label: "Material", options: [{ name: "Standard", mult: 1 }, { name: "Eco", mult: 1.2 }, { name: "Premium", mult: 1.35 }] },
  create: { label: "Scope", options: [{ name: "Starter", mult: 1 }, { name: "Full", mult: 1.8 }] },
  studio: { label: "Duration", options: [{ name: "Half day", mult: 1 }, { name: "Full day", mult: 1.7 }] },
  prints: { label: "Size", options: [{ name: "Small", mult: 1 }, { name: "Medium", mult: 1.4 }, { name: "Large", mult: 2 }] },
};

const inc = (...x: string[]) => x;
// [slug, name, category, USD price, popularity, useCase, days, discount, blurb, includes]
type Row = [string, string, CategoryId, number, number, UseCase, number, number | undefined, string, string[]];
const rows: Row[] = [
  ["logo-design", "Logo Design", "digital", 60, 98, "business", 3, 15, "A distinctive logo with three concepts and unlimited feedback rounds.", inc("3 initial concepts", "2 revision rounds", "Vector + PNG files", "Brand colour codes")],
  ["brand-identity-kit", "Brand Identity Kit", "digital", 250, 90, "business", 7, undefined, "Logo, palette, typography and usage guide in one package.", inc("Logo suite", "Colour palette", "Typography pairing", "PDF brand guide")],
  ["social-media-kit", "Social Media Kit", "digital", 80, 84, "retail", 2, 10, "Profile images, covers and 10 post templates.", inc("10 post templates", "Profile + cover art", "Editable source files")],
  ["web-banner-set", "Web Banner Set", "digital", 45, 60, "retail", 1, undefined, "Ad and hero banners in all standard sizes.", inc("6 banner sizes", "2 variations", "Web-optimised files")],
  ["branded-mugs", "Branded Mugs", "gifts", 12, 92, "gifting", 4, 20, "Ceramic mugs printed with your logo, dishwasher safe.", inc("Full-colour print", "Gift-ready packing", "Digital proof")],
  ["custom-tote-bags", "Custom Tote Bags", "gifts", 9, 78, "events", 5, undefined, "Cotton totes for events, retail and giveaways.", inc("1 to 2 colour print", "Reinforced handles", "Digital proof")],
  ["branded-notebooks", "Branded Notebooks", "gifts", 7, 66, "business", 6, undefined, "A5 notebooks with embossed or printed covers.", inc("A5, 80 pages", "Cover branding", "Digital proof")],
  ["corporate-gift-box", "Corporate Gift Box", "gifts", 45, 88, "gifting", 7, 10, "Curated gift box with branded packaging and insert card.", inc("Custom box", "3 branded items", "Insert card")],
  ["brand-strategy-workshop", "Brand Strategy Workshop", "create", 180, 55, "business", 5, undefined, "A guided session to define positioning, audience and voice.", inc("2 hour session", "Positioning document", "Follow-up call")],
  ["brand-voice-copywriting", "Brand Voice Copywriting", "create", 90, 62, "business", 4, undefined, "Taglines, boilerplate and tone-of-voice guidance.", inc("5 tagline options", "About-us copy", "Tone guide")],
  ["packaging-design", "Packaging Design", "create", 140, 80, "retail", 8, 12, "Box, pouch or label design ready for print.", inc("Dieline setup", "2 concepts", "Print-ready files")],
  ["motion-logo", "Motion Logo", "create", 110, 58, "business", 4, undefined, "A short animated logo sting for video and social.", inc("5 second animation", "MP4 + GIF", "Alpha version")],
  ["product-photography", "Product Photography", "studio", 150, 86, "retail", 3, undefined, "Clean studio shots of your products on white or styled sets.", inc("Up to 15 products", "Edited images", "Web + print sizes")],
  ["brand-video-shoot", "Brand Video Shoot", "studio", 400, 70, "business", 10, undefined, "A 60 second brand film, shot and edited by our crew.", inc("Scripting", "Shoot + edit", "2 cutdowns")],
  ["team-headshots", "Team Headshots", "studio", 120, 64, "business", 2, 8, "Consistent professional headshots for your whole team.", inc("Studio session", "Retouched images", "LinkedIn crops")],
  ["business-cards", "Business Cards", "prints", 20, 97, "business", 2, undefined, "Premium 350gsm cards with matte or gloss finish.", inc("100 cards", "Both sides printed", "Digital proof")],
  ["event-backdrops", "Event Backdrops", "prints", 95, 89, "events", 3, 15, "Step-and-repeat banners for launches and conferences.", inc("Wrinkle-free fabric", "Full-colour print", "Carry bag")],
  ["flyers-brochures", "Flyers & Brochures", "prints", 30, 72, "retail", 3, undefined, "Folded and flat print collateral on quality stock.", inc("100 copies", "Layout check", "Digital proof")],
  ["roll-up-banners", "Roll-up Banners", "prints", 55, 74, "events", 2, undefined, "Portable banner stands for shows and storefronts.", inc("Aluminium stand", "Printed banner", "Carry case")],
  ["branded-tshirts", "Branded T-shirts", "prints", 15, 91, "events", 5, 10, "Soft cotton tees with screen or DTF printing.", inc("Cotton tee", "Front print", "Size run")],
];

export const SERVICES: Service[] = rows.map(([slug, name, category, basePrice, popularity, useCase, turnaroundDays, discountPct, blurb, includes]) => ({
  slug, name, category, basePrice, popularity, useCase, turnaroundDays, discountPct, blurb, includes,
}));

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const unitPrice = (s: Service) => s.basePrice * (1 - (s.discountPct ?? 0) / 100);
export const imageUrl = (slug: string, n = 1, w = 800, h = 600) => `https://picsum.photos/seed/${slug}-${n}/${w}/${h}`;

/** Related services: same category first, then complementary services from other categories. */
export function relatedServices(s: Service, n = 4) {
  const same = SERVICES.filter((x) => x.category === s.category && x.slug !== s.slug);
  const cross = SERVICES.filter((x) => x.category !== s.category && x.useCase === s.useCase).sort((a, b) => b.popularity - a.popularity);
  return [...same.slice(0, 1), ...cross].slice(0, n);
}
