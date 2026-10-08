import { notFound } from "next/navigation";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/navbar";
import { MARKET_CODES, getMarket } from "@/lib/markets";

// export const dynamicParams = false;

export function generateStaticParams() {
  return MARKET_CODES.map((code) => ({ market: code }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ market: string }>;
};

export default async function MarketLayout({ children, params }: LayoutProps) {
  const { market: marketCode } = await params;

  const market = getMarket(marketCode);

  if (!market) {
    notFound();
  }

  //   const date = new Date();
  //   const year = date.getFullYear();

  return (
    <CartProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3"
      >
        Skip to content
      </a>

      <Header market={market} />

      <main id="main" className="mx-auto max-w-6xl px-4 py-8">
        {children}
      </main>

      <footer className="mt-16 border-t border-ink/10 py-8 text-center text-sm text-ink/60">
        &copy; 2026 Branda · Prices shown in {market.currency}
      </footer>
    </CartProvider>
  );
}
