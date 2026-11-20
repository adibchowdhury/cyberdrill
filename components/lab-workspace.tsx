"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LabBriefingPanel } from "@/components/lab-briefing-panel";
import { LabTerminal } from "@/components/lab-terminal";
import type { Lab } from "@/lib/labs";
import type { LabWorkspaceInfo } from "@/lib/workspace";

const minPanel = 28;
const maxPanel = 68;

export function LabWorkspace({ lab, workspace }: { lab: Lab; workspace: LabWorkspaceInfo }) {
  const [session, setSession] = useState(0);
  const [leftWidth, setLeftWidth] = useState(40);
  const [mobilePanel, setMobilePanel] = useState<"briefing" | "terminal">("briefing");
  const [confirmReset, setConfirmReset] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!confirmReset) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setConfirmReset(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [confirmReset]);

  function resizeTo(clientX: number) {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds || bounds.width === 0) return;
    const next = ((clientX - bounds.left) / bounds.width) * 100;
    setLeftWidth(Math.min(maxPanel, Math.max(minPanel, next)));
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-line bg-sidebar px-3 sm:gap-3 sm:px-4">
        <Link
          href="/labs/linux-administration"
          className="shrink-0 rounded-md px-2 py-1 text-sm text-muted outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-cyan/70"
        >
          <span className="sm:hidden">Back</span>
          <span className="hidden sm:inline">Back to Labs</span>
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-sm font-semibold tracking-tight text-foreground">
          {lab.title}
        </h1>
        <p className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          Active
        </p>
        <button
          type="button"
          onClick={() => setConfirmReset(true)}
          className="shrink-0 rounded-md border border-line px-2.5 py-1 text-sm text-foreground outline-none hover:bg-raised focus-visible:ring-2 focus-visible:ring-cyan/70"
        >
          <span className="sm:hidden">Reset</span>
          <span className="hidden sm:inline">Reset Lab</span>
        </button>
        <Link
          href={`/labs/${lab.slug}`}
          className="shrink-0 rounded-md border border-line px-2.5 py-1 text-sm text-foreground outline-none hover:bg-raised focus-visible:ring-2 focus-visible:ring-cyan/70"
        >
          <span className="sm:hidden">Exit</span>
          <span className="hidden sm:inline">Exit Lab</span>
        </Link>
      </header>

      <div className="flex shrink-0 border-b border-line lg:hidden" role="tablist" aria-label="Workspace panels">
        <button
          type="button"
          role="tab"
          aria-selected={mobilePanel === "briefing"}
          onClick={() => setMobilePanel("briefing")}
          className={`h-10 flex-1 border-b-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 ${
            mobilePanel === "briefing" ? "border-cyan text-foreground" : "border-transparent text-muted"
          }`}
        >
          Briefing
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobilePanel === "terminal"}
          onClick={() => setMobilePanel("terminal")}
          className={`h-10 flex-1 border-b-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 ${
            mobilePanel === "terminal" ? "border-cyan text-foreground" : "border-transparent text-muted"
          }`}
        >
          Terminal
        </button>
      </div>

      <div key={session} ref={containerRef} className="flex min-h-0 flex-1">
        <section
          className={`min-h-0 overflow-y-auto ${
            mobilePanel === "briefing" ? "w-full" : "hidden"
          } lg:block lg:w-[var(--panel-width)] lg:shrink-0`}
          style={{ ["--panel-width" as string]: `${leftWidth}%` }}
          aria-label="Lab briefing"
        >
          <LabBriefingPanel lab={lab} hints={workspace.hints} />
        </section>

        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panels"
          aria-valuemin={minPanel}
          aria-valuemax={maxPanel}
          aria-valuenow={Math.round(leftWidth)}
          tabIndex={0}
          className="relative hidden w-1.5 shrink-0 cursor-col-resize bg-line outline-none hover:bg-cyan focus-visible:bg-cyan lg:block"
          onPointerDown={(event) => {
            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
            resizeTo(event.clientX);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              setLeftWidth((current) => Math.max(minPanel, current - 2));
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              setLeftWidth((current) => Math.min(maxPanel, current + 2));
            }
          }}
        />

        <div
          className={`min-h-0 min-w-0 flex-1 flex-col ${
            mobilePanel === "terminal" ? "flex" : "hidden"
          } lg:flex`}
        >
          <LabTerminal hostname={workspace.hostname} active={mobilePanel === "terminal"} />
        </div>
      </div>

      {confirmReset ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-lab-title"
            className="w-full max-w-sm rounded-xl border border-line bg-surface p-5 shadow-lg"
          >
            <h2 id="reset-lab-title" className="text-base font-semibold tracking-tight">
              Reset this lab?
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              This clears the timer, checked objectives, revealed hints, and the terminal transcript on this page.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => setConfirmReset(false)}
                className="rounded-md border border-line px-3 py-1.5 text-sm outline-none hover:bg-raised focus-visible:ring-2 focus-visible:ring-cyan/70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setSession((current) => current + 1);
                  setConfirmReset(false);
                }}
                className="rounded-md bg-accent px-3 py-1.5 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                Reset Lab
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
