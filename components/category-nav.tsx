"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/data";

type CategoryNavLinksProps = {
  marketCode: string;
  variant: "desktop" | "mobile";
  activeId: string | null;
};

export function CategoryNavLinks({
  marketCode,
  variant,
  activeId,
}: CategoryNavLinksProps) {
  const isMobile = variant === "mobile";

  const linkClass = (isActive: boolean) =>
    `border-b-[3px] py-1 hover:text-brand ${isMobile ? "shrink-0" : ""} ${
      isActive ? "border-brand" : "border-transparent"
    }`;

  return (
    <nav
      aria-label={isMobile ? "Categories" : "Main"}
      className={
        isMobile
          ? "flex items-center gap-4 overflow-x-auto border-t border-ink/10 px-4 py-2 text-sm md:hidden"
          : "ml-4 hidden gap-5 text-sm md:flex font-bold"
      }
    >
      {isMobile && (
        <Link
          href={`/${marketCode}/services`}
          className={linkClass(activeId === "all")}
          aria-current={activeId === "all" ? "page" : undefined}
        >
          All
        </Link>
      )}

      {CATEGORIES.map((category) => {
        const isActive = activeId === category.id;

        return (
          <Link
            key={category.id}
            href={`/${marketCode}/services?category=${category.id}`}
            className={linkClass(isActive)}
            aria-current={isActive ? "page" : undefined}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}

// Reads the URL and check which link is active
export function CategoryNav({
  marketCode,
  variant,
}: {
  marketCode: string;
  variant: "desktop" | "mobile";
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onServicesPage = pathname === `/${marketCode}/services`;
  const category = searchParams.get("category");

  const activeId = onServicesPage ? (category ?? "all") : null;

  return (
    <CategoryNavLinks
      marketCode={marketCode}
      variant={variant}
      activeId={activeId}
    />
  );
}
