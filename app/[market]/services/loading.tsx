export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4"
    >
      {/* The spinner: a grey ring with one blue edge, rotating */}
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-ink/10 border-t-brand" />

      <p className="text-sm font-medium text-ink/60">Loading services…</p>
    </div>
  );
}
