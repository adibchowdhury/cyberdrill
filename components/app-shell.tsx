"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { CloseIcon, DashboardIcon, MenuIcon, PathwaysIcon } from "@/components/icons";

const navigation = [
  { href: "/", label: "Home", icon: DashboardIcon },
  { href: "/pathways", label: "Pathways", icon: PathwaysIcon },
] as const;

function isCurrent(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onWide(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    const media = window.matchMedia("(min-width: 1024px)");
    document.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onWide);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onWide);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (/^\/labs\/[^/]+\/workspace$/.test(pathname)) {
    return <div className="h-dvh overflow-hidden bg-background">{children}</div>;
  }

  return (
    <div className="min-h-full">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:text-foreground"
      >
        Skip to content
      </a>

      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        id="app-sidebar"
        className={`${open ? "flex" : "hidden"} fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-line bg-sidebar lg:flex`}
      >
        <div className="flex items-center gap-3 px-5 py-5">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-xs font-semibold text-accent">
            CD
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">CyberDrill</p>
            <p className="text-xs text-muted">Skill speedruns</p>
          </div>
        </div>

        <nav aria-label="Primary" className="flex flex-1 flex-col gap-1 px-3">
          {navigation.map((item) => {
            const active = isCurrent(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                  active
                    ? "bg-accent/10 font-medium text-foreground shadow-[inset_3px_0_0_0_var(--color-accent)]"
                    : "text-muted hover:bg-raised hover:text-foreground"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-accent" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <p className="px-5 py-5 text-xs leading-5 text-muted">Skills in 5–10 minutes</p>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-line bg-background/90 px-4 backdrop-blur lg:hidden">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-foreground outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
            aria-expanded={open}
            aria-controls="app-sidebar"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
          <p className="text-sm font-semibold tracking-tight">CyberDrill</p>
        </header>

        <main id="main" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
