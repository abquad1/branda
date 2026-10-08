"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { imageUrl } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import type { Market } from "@/lib/types";
import { CartItemType, useCart } from "./cart-provider";
import { QtyStepper } from "./qty-stepper";

type Order = {
  id: string;
  items: CartItemType[];
  subtotal: number;
  tax: number;
  total: number;
};

type SummaryProps = {
  items: CartItemType[];
  subtotal: number;
  tax: number;
  total: number;
  market: Market;
};

// Shows the itemized list and totals. Used before AND after placing the order.
function OrderSummary({ items, subtotal, tax, total, market }: SummaryProps) {
  const price = (usd: number) => formatPrice(usd, market);

  return (
    <section
      aria-labelledby="summary-title"
      className="rounded-xl border border-ink/10 bg-white p-5"
    >
      <h2 id="summary-title" className="text-lg font-bold">
        Order summary
      </h2>

      <ul className="mt-3 space-y-1 text-sm">
        {items.map((item) => (
          <li key={item.key} className="flex justify-between gap-3">
            <span>
              {item.qty} × {item.name}{" "}
              <span className="text-ink/60">({item.option})</span>
            </span>
            <span>{price(item.qty * item.unitUsd)}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-1 border-t border-ink/10 pt-3 text-sm">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>{price(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>{market.taxLabel}</dt>
          <dd>{price(tax)}</dd>
        </div>
        <div className="flex justify-between border-t border-ink/10 pt-2 text-lg font-extrabold">
          <dt>Total</dt>
          <dd>{price(total)}</dd>
        </div>
      </dl>
    </section>
  );
}

export function CartView({ market }: { market: Market }) {
  const {
    cart,
    subtotalUsd,
    isLoaded,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const [order, setOrder] = useState<Order | null>(null);

  // Money maths
  const tax = subtotalUsd * market.taxRate;
  const total = subtotalUsd + tax;
  const price = (usd: number) => formatPrice(usd, market);

  const placeOrder = () => {
    setOrder({
      id: `BR-${Date.now().toString(36).toUpperCase()}`,
      items: cart,
      subtotal: subtotalUsd,
      tax,
      total,
    });
    clearCart();
  };

  if (order) {
    return (
      <div className="mx-auto max-w-xl space-y-5 text-center">
        <h1 className="text-3xl font-extrabold">Order confirmed</h1>
        <p className="text-ink/70">
          Thanks! Your order <strong>{order.id}</strong> is in. This is a demo,
          so no payment was taken.
        </p>
        <div className="text-left">
          <OrderSummary
            items={order.items}
            subtotal={order.subtotal}
            tax={order.tax}
            total={order.total}
            market={market}
          />
        </div>
        <Link
          href={`/${market.code}/services`}
          className="inline-block rounded-md bg-brand px-5 py-3 font-semibold text-white"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (!isLoaded) {
    return <p role="status">Loading your cart…</p>;
  }

  if (cart.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-ink/30 bg-white p-12 text-center">
        <h1 className="text-2xl font-extrabold">Your cart is empty</h1>
        <p className="mt-2 text-ink/70">
          Add a logo, some mugs or a banner to get started.
        </p>
        <Link
          href={`/${market.code}/services`}
          className="mt-5 inline-block rounded-md bg-brand px-5 py-3 font-semibold text-white"
        >
          Browse services
        </Link>
      </div>
    );
  }

  //  cart
  return (
    <div>
      <h1 className="text-3xl font-extrabold">Your cart</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left: the items */}
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item.key}
              className="flex gap-4 rounded-xl border border-ink/10 bg-white p-4"
            >
              <Image
                src={imageUrl(item.slug, 1, 160, 120)}
                alt=""
                width={96}
                height={72}
                className="h-18 w-24 rounded-md object-cover"
              />

              <div className="flex-1">
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-ink/60">{item.option}</p>

                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <QtyStepper
                    value={item.qty}
                    label={`Quantity for ${item.name}`}
                    onChange={(newQty) => updateQuantity(item.key, newQty)}
                  />
                  <button
                    onClick={() => removeFromCart(item.key)}
                    className="text-sm font-semibold text-red-700 underline"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <p className="font-bold">{price(item.qty * item.unitUsd)}</p>
            </li>
          ))}
        </ul>

        {/* Right: summary and checkout */}
        <div className="space-y-4 self-start">
          <OrderSummary
            items={cart}
            subtotal={subtotalUsd}
            tax={tax}
            total={total}
            market={market}
          />
          <button
            onClick={placeOrder}
            className="w-full rounded-md bg-brand py-3 font-semibold text-white hover:bg-brand-dark"
          >
            Place order · {price(total)}
          </button>
        </div>
      </div>
    </div>
  );
}
