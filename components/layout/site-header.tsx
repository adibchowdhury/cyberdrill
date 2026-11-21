"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { MenuIcon } from "@/components/icons";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { publicNav } from "@/components/layout/public-nav";

export function SiteHeader({ account, menuAccount }: { account: ReactNode; menuAccount: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-base font-semibold tracking-tight text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent/40 motion-safe:transition-colors"
        >
          CyberDrill
        </Link>
        <nav aria-label="Primary" className="ml-6 hidden items-center gap-1 lg:flex">
          {publicNav.map((item) => {
            const current = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`inline-flex h-9 items-center rounded-lg px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent/40 motion-safe:transition-colors ${
                  current ? "bg-accent/10 font-semibold text-accent" : "text-foreground hover:bg-raised"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto hidden items-center lg:flex">{account}</div>
        <button
          type="button"
          className="ml-auto inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm font-medium text-foreground outline-none hover:bg-raised focus-visible:ring-2 focus-visible:ring-accent/40 motion-safe:transition-colors lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
        >
          <MenuIcon className="h-4 w-4" />
          Menu
        </button>
      </div>
      <div id="mobile-navigation">
        <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} account={menuAccount} />
      </div>
    </header>
  );
}
