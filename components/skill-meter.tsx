export function SkillMeter({
  label,
  value,
  detail,
}: {
  label: string;
  value: number;
  detail?: string;
}) {
  const width = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <div>
          <p className="text-sm text-foreground">{label}</p>
          {detail ? <p className="mt-0.5 text-xs text-muted">{detail}</p> : null}
        </div>
        <p className="font-mono text-xs text-muted">{width}%</p>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-line"
        role="meter"
        aria-label={label}
        aria-valuenow={width}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="meter-fill h-full rounded-full" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
