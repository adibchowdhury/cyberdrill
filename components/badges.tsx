import type { Difficulty, LabStatus } from "@/lib/labs";

const difficultyClass: Record<Difficulty, string> = {
  Beginner: "border border-success/30 bg-success/10 text-success-text",
  Intermediate: "border border-warning/30 bg-warning/10 text-warning-text",
  Advanced: "border border-expert/30 bg-expert/10 text-expert-text",
};

const statusClass: Record<LabStatus, string> = {
  completed: "text-success-text",
  "in-progress": "text-cyan-text",
  "not-started": "text-muted",
};

const statusLabel: Record<LabStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  "not-started": "Not started",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${difficultyClass[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}

export function StatusBadge({ status }: { status: LabStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${statusClass[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusLabel[status]}
    </span>
  );
}
