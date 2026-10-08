import { MARKETS, MARKET_CODES } from "./markets";
import type { MarketCode } from "./types";

/** Canonical + hreflang alternates for a path that exists in every market. */
export function alternates(market: MarketCode, path: string) {
  return {
    canonical: `/${market}${path}`,
    languages: {
      ...Object.fromEntries(MARKET_CODES.map((c) => [MARKETS[c].locale, `/${c}${path}`])),
      "x-default": `/ng${path}`,
    },
  };
}
