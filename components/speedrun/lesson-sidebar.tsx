"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStoredProgress } from "@/components/speedrun/use-stored-progress";
import { advancedLevelNote, skillHref } from "@/lib/pathways";

export type LessonSkill = {
  id: string;
  slug: string;
  pathway: string;
  level: string;
  title: string;
  placeholder: boolean;
};

export type LessonGroup = {
  id: string;
  title: string;
  domains: {
    id: string;
    title: string;
    skills: LessonSkill[];
  }[];
};

export function LessonSidebar({
  levels,
  currentLevel,
  currentSlug,
}: {
  levels: LessonGroup[];
  currentLevel: string;
  currentSlug: string;
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => ({ [currentLevel]: true }));

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function toggle(levelId: string) {
    setExpanded((current) => ({ ...current, [levelId]: !current[levelId] }));
  }

  return (
    <div>
      <button
        type="button"
        className="inline-flex h-10 items-center rounded-lg border border-line bg-surface px-3 text-sm font-medium text-foreground outline-none hover:bg-raised focus-visible:ring-2 focus-visible:ring-accent/40 lg:hidden"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        Lessons
      </button>

      <aside className="fixed top-16 bottom-0 left-0 z-30 hidden w-[17.5rem] overflow-y-auto border-r border-line bg-surface lg:block">
        <LessonList
          levels={levels}
          currentLevel={currentLevel}
          currentSlug={currentSlug}
          expanded={expanded}
          onToggle={toggle}
        />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close lessons" className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col border-r border-line bg-surface shadow-md">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="text-sm font-semibold text-foreground">Lessons</p>
              <button
                type="button"
                className="rounded-md px-2 py-1 text-sm text-muted outline-none hover:bg-raised hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <LessonList
                levels={levels}
                currentLevel={currentLevel}
                currentSlug={currentSlug}
                expanded={expanded}
                onToggle={toggle}
                onNavigate={() => setOpen(false)}
              />
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

function LessonList({
  levels,
  currentLevel,
  currentSlug,
  expanded,
  onToggle,
  onNavigate,
}: {
  levels: LessonGroup[];
  currentLevel: string;
  currentSlug: string;
  expanded: Record<string, boolean>;
  onToggle: (levelId: string) => void;
  onNavigate?: () => void;
}) {
  const records = useStoredProgress();

  return (
    <div className="py-2">
      {levels.map((level) => {
        const isOpen = expanded[level.id] ?? false;
        return (
          <section key={level.id} className="border-b border-line last:border-b-0">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => onToggle(level.id)}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-[11px] font-semibold tracking-[0.14em] text-muted uppercase outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              {level.title}
              <span aria-hidden="true">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen ? (
              level.domains.length === 0 ? (
                <p className="px-3 pb-3 text-sm leading-5 text-muted">
                  {level.id === "advanced" ? advancedLevelNote : "No skills in this level yet."}
                </p>
              ) : (
                <div className="pb-2">
                  {level.domains.map((domain) => (
                    <section key={domain.id}>
                      <h3 className="px-3 pt-2 pb-1 text-xs font-medium leading-5 text-foreground">{domain.title}</h3>
                      <ul>
                        {domain.skills.map((skill) => {
                          const current = skill.level === currentLevel && skill.slug === currentSlug;
                          const completed = Boolean(records[skill.id]);
                          return (
                            <li key={skill.id}>
                              <Link
                                href={skillHref(skill.pathway, skill.level, skill.slug)}
                                aria-current={current ? "page" : undefined}
                                onClick={onNavigate}
                                className={`flex items-center gap-2 py-1.5 pr-3 pl-5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                                  current
                                    ? "bg-accent/10 font-medium text-foreground shadow-[inset_3px_0_0_0_var(--color-accent)]"
                                    : skill.placeholder
                                      ? "text-muted hover:bg-raised hover:text-foreground"
                                      : "text-foreground hover:bg-raised"
                                }`}
                              >
                                <StatusMark completed={completed} />
                                <span className="min-w-0 flex-1 truncate">{skill.title}</span>
                                {skill.placeholder ? (
                                  <span className="shrink-0 text-[10px] font-medium tracking-wide text-muted uppercase">Soon</span>
                                ) : null}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ))}
                </div>
              )
            ) : null}
          </section>
        );
      })}
    </div>
  );
}

function StatusMark({ completed }: { completed: boolean }) {
  if (completed) {
    return (
      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-success/15 text-success" aria-label="Completed">
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
        </svg>
      </span>
    );
  }

  return <span className="h-4 w-4 shrink-0 rounded-full border border-line" aria-label="Not started" />;
}
