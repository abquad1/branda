"use client";
import Link from "next/link";
import { useCart } from "./cart-provider";

export function CartLink({ market }: { market: string }) {
  const { count } = useCart();
  return (
    <Link
      href={`/${market}/cart`}
      className="rounded-md bg-ink px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand"
    >
      Cart{" "}
      <span
        aria-label={`${count} items`}
        className="ml-1 rounded-full bg-sun px-2 text-ink"
      >
        {count}
      </span>
    </Link>
  );
}
