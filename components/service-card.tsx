import Image from "next/image";
import Link from "next/link";
import { imageUrl, unitPrice } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import type { Market, Service } from "@/lib/types";

export function ServiceCard({
  service: s,
  market,
  priority = false,
}: {
  service: Service;
  market: Market;
  priority?: boolean;
}) {
  const href = `/${market.code}/services/${s.slug}`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-ink/10 bg-white">
      <Link
        href={href}
        className="relative block aspect-4/3 overflow-hidden bg-ink/5"
      >
        <Image
          src={imageUrl(s.slug, 1, 600, 450)}
          alt={`${s.name} sample work`}
          fill
          priority={priority}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {s.discountPct && (
          <span className="absolute left-3 top-3 rounded bg-sun px-2 py-1 text-xs font-bold">
            {s.discountPct}% off
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-sm text-ink/60 capitalize">{s.category}</p>
        <h3 className="text-lg font-bold leading-tight">
          <Link href={href} className="hover:text-brand">
            {s.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-ink/70">{s.blurb}</p>
        <div className="mt-auto flex items-end justify-between pt-3">
          <p>
            <span className="text-sm text-ink/60">From </span>
            <span className="text-lg font-bold">
              {formatPrice(unitPrice(s), market)}
            </span>
            {s.discountPct && (
              <span className="ml-2 text-sm text-ink/50 line-through">
                {formatPrice(s.basePrice, market)}
              </span>
            )}
          </p>
          <Link
            href={href}
            className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            View service
          </Link>
        </div>
      </div>
    </article>
  );
}
