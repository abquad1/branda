import { Suspense } from "react";
import Link from "next/link";
import type { Market } from "@/lib/types";
import { MarketSwitcher } from "./market-switcher";
import { CartLink } from "./cart-link";
import { CategoryNav, CategoryNavLinks } from "./category-nav";

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

        {/* Desktop links */}
        <Suspense
          fallback={
            <CategoryNavLinks
              marketCode={market.code}
              variant="desktop"
              activeId={null}
            />
          }
        >
          <CategoryNav marketCode={market.code} variant="desktop" />
        </Suspense>

        <div className="ml-auto flex items-center gap-2">
          <MarketSwitcher current={market.code} />
          <CartLink market={market.code} />
        </div>
      </div>

      {/* Mobile links */}
      <Suspense
        fallback={
          <CategoryNavLinks
            marketCode={market.code}
            variant="mobile"
            activeId={null}
          />
        }
      >
        <CategoryNav marketCode={market.code} variant="mobile" />
      </Suspense>
    </header>
  );
}
