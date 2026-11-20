import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-muted">
                  /
                </span>
              ) : null}
              {item.href && !current ? (
                <Link
                  href={item.href}
                  className="text-cyan-text outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={current ? "font-medium text-foreground" : "text-muted"} aria-current={current ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm text-cyan-text outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      {label}
    </Link>
  );
}
