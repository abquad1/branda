import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";
import { getMarket } from "@/lib/markets";

export const metadata: Metadata = {
  title: "Your cart",
  robots: { index: false },
};

export default async function CartPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  return <CartView market={getMarket((await params).market)!} />;
}
