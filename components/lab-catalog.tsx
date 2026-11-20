"use client";

import { useState } from "react";
import { LabCard } from "@/components/lab-card";
import { SearchIcon } from "@/components/icons";
import type { Lab } from "@/lib/labs";

const difficultyOptions = ["All", "Beginner", "Intermediate", "Advanced"] as const;

type DifficultyFilter = (typeof difficultyOptions)[number];

function FilterButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`h-8 rounded-md border px-3 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 ${
        pressed
          ? "border-accent/40 bg-accent/10 text-foreground"
          : "border-line bg-surface text-muted hover:bg-raised hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function LabCatalog({
  labs,
  categories,
}: {
  labs: readonly Lab[];
  categories: readonly string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");

  const normalizedQuery = query.trim().toLowerCase();
  const visibleLabs = labs.filter((lab) => {
    const matchesDifficulty = difficulty === "All" || lab.difficulty === difficulty;
    const matchesCategory = category === "All" || lab.category === category;
    if (!matchesDifficulty || !matchesCategory) return false;
    if (normalizedQuery.length === 0) return true;
    const haystack = `${lab.title} ${lab.summary} ${lab.category} ${lab.code}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  const filtersActive =
    normalizedQuery.length > 0 || category !== "All" || difficulty !== "All";

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setDifficulty("All");
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-line bg-surface p-4 shadow-sm sm:p-5">
        <label htmlFor="lab-search" className="text-xs font-medium text-muted">
          Search
        </label>
        <div className="relative mt-2">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="lab-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, topic, or lab code"
            className="h-10 w-full rounded-lg border border-line bg-background pr-3 pl-9 text-sm text-foreground outline-none placeholder:text-muted focus-visible:border-cyan"
          />
        </div>

        <fieldset className="mt-4">
          <legend className="text-xs font-medium text-muted">Category</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <FilterButton pressed={category === "All"} onClick={() => setCategory("All")}>
              All
            </FilterButton>
            {categories.map((item) => (
              <FilterButton
                key={item}
                pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </FilterButton>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className="text-xs font-medium text-muted">Difficulty</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {difficultyOptions.map((option) => (
              <FilterButton
                key={option}
                pressed={difficulty === option}
                onClick={() => setDifficulty(option)}
              >
                {option}
              </FilterButton>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite">
          Showing {visibleLabs.length} of {labs.length}
        </p>
        {filtersActive ? (
          <button
            type="button"
            onClick={resetFilters}
            className="text-sm text-cyan-text outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
          >
            Reset filters
          </button>
        ) : null}
      </div>

      {visibleLabs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line px-6 py-16 text-center">
          <p className="text-sm font-medium text-foreground">No labs match these filters</p>
          <p className="mt-1 text-sm text-muted">Try another search, or clear the current filters.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 text-sm font-medium text-cyan-text outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleLabs.map((lab) => (
            <li key={lab.slug} className="min-w-0">
              <LabCard lab={lab} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
