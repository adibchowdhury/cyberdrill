"use client";

import Link from "next/link";
import { useEffect, useId, type ReactNode } from "react";
import { CloseIcon } from "@/components/icons";
import { useJourney } from "@/components/journey/journey-provider";
import { STEPS } from "@/lib/journey/steps";

export function MobileMenu({
  open,
  onClose,
  pathname,
  account,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  account: ReactNode;
}) {
  const titleId = useId();
  const { selectedJob, ready } = useJourney();

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  const items = [{ href: "/", label: "Home", number: null as number | null }, ...STEPS.map((step) => ({
    href: step.href,
    label: step.navLabel,
    number: step.number > 1 ? step.number : null,
  }))];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" aria-label="Close menu" className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-y-0 right-0 flex w-[min(22rem,92vw)] flex-col border-l border-line bg-surface shadow-md"
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-4">
          <p id={titleId} className="text-sm font-semibold text-foreground">
            Menu
          </p>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-lg outline-none hover:bg-raised focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <CloseIcon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-col gap-1 p-3">
          {items.map((item) => {
            const current = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                onClick={onClose}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                  current ? "bg-accent/10 font-semibold text-accent" : "text-foreground hover:bg-raised"
                }`}
              >
                <span>{item.label}</span>
                {item.number ? <span className="font-mono text-xs text-muted">{item.number}</span> : null}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto space-y-3 border-t border-line p-4">
          {ready && selectedJob ? (
            <p className="text-sm text-foreground">
              {selectedJob.title}{" "}
              <Link href="/jobs" onClick={onClose} className="font-medium text-accent">
                Change
              </Link>
            </p>
          ) : null}
          {account}
        </div>
      </div>
    </div>
  );
}
