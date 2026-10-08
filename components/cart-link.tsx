"use client";
import Link from "next/link";
import { useCart } from "./cart-provider";
import { MdOutlineShoppingCart } from "react-icons/md";

export function CartLink({ market }: { market: string }) {
  const { count } = useCart();
  return (
    <Link
      href={`/${market}/cart`}
      className="relative flex items-center rounded-md px-3 py-1.5 text-sm font-semibold text-white"
    >
      <MdOutlineShoppingCart className="text-ink" size={20} />{" "}
      <span
        aria-label={`${count} items`}
        className="ml-1 rounded-full bg-sun px-1.5 text-ink absolute left-5 -top-1"
      >
        {count}
      </span>
    </Link>
  );
}
