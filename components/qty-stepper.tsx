"use client";
export function QtyStepper({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
}) {
  const btn =
    "h-9 w-9 rounded-md border border-ink/20 bg-white text-lg font-bold hover:bg-ink/5";
  return (
    <div
      className="inline-flex items-center gap-2"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-8 text-center font-semibold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
