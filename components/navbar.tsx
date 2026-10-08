import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import type { Market } from "@/lib/types";
import { MarketSwitcher } from "./market-switcher";
import { CartLink } from "./cart-link";

export function Header({ market }: { market: Market }) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link
          href={`/${market.code}`}
          className="text-xl font-extrabold tracking-tight"
        >
          Branda<span className="text-brand">.</span>
        </Link>
        <nav aria-label="Main" className="ml-4 hidden gap-5 text-sm md:flex">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/${market.code}/services?category=${c.id}`}
              className="py-1 hover:text-brand"
            >
              {c.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <MarketSwitcher current={market.code} />
          <CartLink market={market.code} />
        </div>
      </div>
      <nav
        aria-label="Categories"
        className="flex gap-4 overflow-x-auto border-t border-ink/10 px-4 py-2 text-sm md:hidden"
      >
        <Link
          href={`/${market.code}/services`}
          className="shrink-0 font-semibold"
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={`/${market.code}/services?category=${c.id}`}
            className="shrink-0"
          >
            {c.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
