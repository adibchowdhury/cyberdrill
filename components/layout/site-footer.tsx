import Link from "next/link";
import { publicNav } from "@/components/layout/public-nav";

const links = [
  ...publicNav,
  { href: "/login", label: "Log in" },
  { href: "/signup", label: "Sign up" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-foreground">CyberDrill</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40 motion-safe:transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-muted">© CyberDrill</p>
      </div>
    </footer>
  );
}
