export function CodeExample({ label, code }: { label?: string; code: string }) {
  return (
    <figure className="scheme-dark overflow-hidden rounded-lg border border-terminal-border bg-terminal">
      {label ? (
        <figcaption className="border-b border-terminal-border px-3 py-1.5 font-mono text-[11px] tracking-wide text-terminal-muted uppercase">
          {label}
        </figcaption>
      ) : null}
      <pre className="overflow-x-auto px-3 py-3 font-mono text-sm leading-6 text-terminal-foreground">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
