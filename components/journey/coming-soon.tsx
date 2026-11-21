import type { ReactNode } from "react";

export function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center rounded-md bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning-text">
      Coming soon
    </span>
  );
}

export function ComingSoon({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-dashed border-warning/40 bg-surface p-5 shadow-sm">
      <ComingSoonBadge />
      <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-2 space-y-3 text-sm leading-6 text-muted">{children}</div>
    </section>
  );
}
