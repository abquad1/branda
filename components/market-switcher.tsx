"use client";
import { usePathname, useRouter } from "next/navigation";
import { MARKETS, MARKET_CODES } from "@/lib/markets";
import type { MarketCode } from "@/lib/types";

export function MarketSwitcher({ current }: { current: MarketCode }) {
  const pathname = usePathname();
  const router = useRouter();

  function change(code: string) {
    const search = window.location.search.slice(1); // read at click time: keeps the page statically renderable
    const rest = pathname.split("/").slice(2).join("/");
    router.push(
      `/${code}${rest ? `/${rest}` : ""}${search ? `?${search}` : ""}`,
    );
  }

  return (
    <label className="flex items-center gap-1 text-sm">
      <span className="sr-only">Country and currency</span>
      <select
        value={current}
        onChange={(e) => change(e.target.value)}
        className="rounded-md border border-ink/20 bg-white px-2 py-1.5"
      >
        {MARKET_CODES.map((c) => (
          <option key={c} value={c}>
            {MARKETS[c].flag} {MARKETS[c].country} ({MARKETS[c].currency})
          </option>
        ))}
      </select>
    </label>
  );
}
