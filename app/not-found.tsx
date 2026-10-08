import Link from "next/link";
export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-extrabold">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 text-ink/70">
        The link may be old, or the service may have moved.
      </p>
      <Link
        href="/ng/services"
        className="mt-6 inline-block rounded-md bg-brand px-5 py-3 font-semibold text-white"
      >
        Browse services
      </Link>
    </main>
  );
}
