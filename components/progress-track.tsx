export function ProgressTrack({
  value,
  label,
  fillClassName = "meter-fill",
}: {
  value: number;
  label: string;
  fillClassName?: string;
}) {
  const width = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
        <span className="text-muted">{label}</span>
        <span className="font-mono text-foreground">{width}%</span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-line"
        role="meter"
        aria-label={label}
        aria-valuenow={width}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={`h-full rounded-full ${fillClassName}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
