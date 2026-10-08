import type { Market } from "./types";

export function formatPrice(usd: number, m: Market) {
  return new Intl.NumberFormat(m.locale, {
    style: "currency",
    currency: m.currency,
    maximumFractionDigits: m.currency === "NGN" ? 0 : 2,
  }).format(usd * m.rate);
}
