"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { MenuIcon } from "@/components/icons";
import { useJourney } from "@/components/journey/journey-provider";
import { JobSkeleton } from "@/components/journey/selected-job-bar";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { STEPS } from "@/lib/journey/steps";

const nav = [
  { href: "/", label: "Home", number: null as number | null },
  ...STEPS.map((step) => ({
    href: step.href,
    label: step.navLabel,
    number: step.number > 1 ? step.number : null,
  })),
];

export function SiteHeader({ account, menuAccount }: { account: ReactNode; menuAccount: ReactNode }) {
  const pathname = usePathname();
  const { selectedJob, ready } = useJourney();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-base font-semibold tracking-tight text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent/40">
          CyberDrill
        </Link>
        <nav aria-label="Primary" className="ml-4 hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const current = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                  current ? "bg-accent/10 font-semibold text-accent" : "text-foreground hover:bg-raised"
                }`}
              >
                {item.number ? <span className="font-mono text-[11px] text-muted">{item.number}</span> : null}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          {!ready ? <JobSkeleton className="h-9 w-40" /> : null}
          {ready && selectedJob ? (
            <p className="flex max-w-64 items-center gap-2 text-sm text-foreground">
              <span className="truncate">{selectedJob.title}</span>
              <Link href="/jobs" className="shrink-0 font-medium text-accent outline-none focus-visible:ring-2 focus-visible:ring-accent/40">
                Change
              </Link>
            </p>
          ) : null}
          {account}
        </div>
        <button
          type="button"
          className="ml-auto inline-flex h-10 items-center gap-2 rounded-lg border border-line px-3 text-sm font-medium text-foreground outline-none hover:bg-raised focus-visible:ring-2 focus-visible:ring-accent/40 lg:hidden"
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
