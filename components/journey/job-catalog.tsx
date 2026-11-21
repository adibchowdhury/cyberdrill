"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/journey/empty-state";
import { JobCard } from "@/components/journey/job-card";
import { useJourney } from "@/components/journey/journey-provider";
import { CAREER_LEVELS, jobs, type CareerLevel } from "@/lib/journey/jobs";

export function JobCatalog() {
  const { selectedJob, clearJob, ready } = useJourney();
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<CareerLevel | "all">("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const levelMatch = level === "all" || job.level === level;
      const text = `${job.title} ${job.skillAreas.join(" ")}`.toLowerCase();
      return levelMatch && (needle.length === 0 || text.includes(needle));
    });
  }, [query, level]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor="job-search" className="text-sm font-medium text-foreground">
            Search jobs
          </label>
          <input
            id="job-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or skill area"
            className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-foreground outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-accent/40"
          />
        </div>
        <div className="sm:w-56">
          <label htmlFor="job-level" className="text-sm font-medium text-foreground">
            Career level
          </label>
          <select
            id="job-level"
            value={level}
            onChange={(event) => setLevel(event.target.value as CareerLevel | "all")}
            className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <option value="all">All levels</option>
            {CAREER_LEVELS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-sm text-muted" aria-live="polite">
        Showing {visible.length} of {jobs.length} roles.
        {ready && selectedJob ? ` ${selectedJob.title} is selected.` : ""}
      </p>
      {ready && selectedJob ? (
        <button
          type="button"
          onClick={clearJob}
          className="text-sm font-medium text-accent outline-none hover:text-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          Clear selected role
        </button>
      ) : null}
      {visible.length === 0 ? (
        <EmptyState title="No matching roles">No roles match that search. Clear the text or choose all levels.</EmptyState>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((job) => (
            <li key={job.slug}>
              <JobCard job={job} featured={job.status === "available"} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
