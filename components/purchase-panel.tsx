"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { VARIATIONS, unitPrice } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import type { Market, Service } from "@/lib/types";
import { useCart } from "./cart-provider";
import { QtyStepper } from "./qty-stepper";

type PurchasePanelProps = {
  service: Service;
  market: Market;
};

export function PurchasePanel({ service, market }: PurchasePanelProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  // The choices for this service's category, e.g. Package: Basic / Standard / Premium
  const variation = VARIATIONS[service.category];

  // What the user has picked so far
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  // Price of ONE item, with the chosen option applied (still in USD)
  const selectedOption = variation.options[selectedIndex];
  const unitUsd = unitPrice(service) * selectedOption.mult;
  const totalUsd = unitUsd * quantity;

  // Put the chosen item into the cart
  const addItem = () => {
    addToCart(
      {
        key: `${service.slug}:${selectedOption.name}`,
        slug: service.slug,
        name: service.name,
        option: `${variation.label}: ${selectedOption.name}`,
        unitUsd,
      },
      quantity,
    );
  };

  const handleOrderNow = () => {
    addItem();
    router.push(`/${market.code}/cart`);
  };

  const handleAddToCart = () => {
    addItem();
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* 1. Option picker */}
      <fieldset>
        <legend className="mb-2 font-semibold">{variation.label}</legend>
        <div className="flex flex-wrap gap-2">
          {variation.options.map((option, index) => {
            const isSelected = index === selectedIndex;

            return (
              <label
                key={option.name}
                className={`cursor-pointer rounded-md border px-4 py-2 text-sm has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand ${
                  isSelected
                    ? "border-brand bg-brand/10 font-semibold"
                    : "border-ink/20 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="variation"
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => setSelectedIndex(index)}
                />
                {option.name}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 2. Quantity */}
      <div>
        <p className="mb-2 font-semibold">Quantity</p>
        <QtyStepper value={quantity} onChange={setQuantity} label="Quantity" />
      </div>

      {/* 3. Live price */}
      <p className="text-2xl font-extrabold">
        {formatPrice(totalUsd, market)}
        <span className="ml-2 text-sm font-normal text-ink/60">
          ({formatPrice(unitUsd, market)} each)
        </span>
      </p>

      {/* 4. Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleOrderNow}
          className="rounded-md bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark"
        >
          Order now
        </button>
        <button
          onClick={handleAddToCart}
          className="rounded-md border-2 border-ink px-6 py-3 font-semibold hover:bg-ink hover:text-white"
        >
          Add to cart
        </button>
      </div>

      {/* Message read out by screen readers when something is added */}
      <p role="status" className="h-5 text-sm font-medium text-green-700">
        {showAdded ? "Added to your cart." : ""}
      </p>
    </div>
  );
}
