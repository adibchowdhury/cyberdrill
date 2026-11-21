export function EmptyState({ title, children }: { title: string; children: string }) {
  return (
    <div className="rounded-xl border border-line bg-raised/60 px-5 py-6">
      <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{children}</p>
    </div>
  );
}
