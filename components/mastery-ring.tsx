export function MasteryRing({ value, label }: { value: number; label: string }) {
  const safe = Math.max(0, Math.min(100, value));

  return (
    <div className="flex items-center gap-4">
      <div
        className="grid h-24 w-24 shrink-0 place-items-center rounded-full"
        style={{
          background: `conic-gradient(var(--color-accent) ${safe * 3.6}deg, var(--color-line) 0deg)`,
        }}
        role="img"
        aria-label={`${label}: ${safe} percent`}
      >
        <div className="grid h-[4.6rem] w-[4.6rem] place-items-center rounded-full bg-surface">
          <span className="font-mono text-lg text-foreground">{safe}%</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-sm leading-6 text-muted">
          Share of the current catalog marked complete.
        </p>
      </div>
    </div>
  );
}
