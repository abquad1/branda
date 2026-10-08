"use client";
export default function ServicesError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
      <h2 className="text-xl font-bold">We couldn&apos;t load services</h2>
      <p className="mt-1 text-ink/70">Check your connection and try again.</p>
      <button onClick={reset} className="mt-4 rounded-md bg-brand px-5 py-2 font-semibold text-white">Try again</button>
    </div>
  );
}
