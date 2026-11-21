export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow ? (
        <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
      <p className="mt-3 text-base leading-7 text-muted">{description}</p>
    </header>
  );
}
