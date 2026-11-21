"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/pathways", label: "Pathways" },
] as const;

function isCurrent(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isSkillPage(pathname: string): boolean {
  return /^\/pathways\/[^/]+\/[^/]+\/[^/]+$/.test(pathname);
}

export function AppShell({
  children,
  account,
  menuAccount,
}: {
  children: ReactNode;
  account?: ReactNode;
  menuAccount?: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const skillPage = isSkillPage(pathname);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onWide(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    const media = window.matchMedia("(min-width: 768px)");
    document.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onWide);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onWide);
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

      <header className="relative sticky top-0 z-40 border-b border-line bg-surface">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-accent/40" onClick={() => setOpen(false)}>
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-xs font-semibold text-accent">
              CD
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground">CyberDrill</span>
          </Link>

          <nav aria-label="Primary" className="ml-4 hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const active = isCurrent(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                    active ? "bg-accent/10 font-medium text-accent" : "text-foreground hover:bg-raised"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden md:block">{account}</div>

          <button
            type="button"
            className="ml-auto grid h-9 w-9 place-items-center rounded-lg border border-line text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:hidden"
            aria-expanded={open}
            aria-controls="app-menu"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>

        {open ? (
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 top-16 z-30 bg-foreground/20 md:hidden"
            onClick={() => setOpen(false)}
          />
        ) : null}

        {open ? (
          <div id="app-menu" className="absolute inset-x-0 top-full z-40 border-b border-line bg-surface px-4 py-3 shadow-md md:hidden">
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navigation.map((item) => {
                const active = isCurrent(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                      active ? "bg-accent/10 font-medium text-accent" : "text-foreground hover:bg-raised"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div
              className="mt-3 border-t border-line pt-3"
              onClick={(event) => {
                const target = event.target;
                if (target instanceof Element && target.closest("a, button")) setOpen(false);
              }}
            >
              {menuAccount}
            </div>
          </div>
        ) : null}
      </header>

      <main
        id="main"
        className={
          skillPage
            ? "w-full px-4 py-8 sm:px-6 lg:py-10 lg:pr-10 lg:pl-[calc(17.5rem+2.5rem)]"
            : "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
        }
      >
        {children}
      </main>
    </div>
  );
}
