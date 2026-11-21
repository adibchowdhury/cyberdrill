import { ComingSoonBadge } from "@/components/journey/coming-soon";
import type { TrainingModule } from "@/lib/journey/pathways";

const kindLabel: Record<TrainingModule["kind"], string> = {
  learn: "Learn",
  practice: "Practice",
  apply: "Apply",
  simulation: "Simulation",
};

export function TrainingModuleCard({ module }: { module: TrainingModule }) {
  return (
    <article className="rounded-xl border border-line bg-surface p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-muted">{String(module.order).padStart(2, "0")}</span>
        <span className="rounded-md bg-raised px-2 py-0.5 text-xs font-medium text-foreground">
          {kindLabel[module.kind]}
        </span>
        <ComingSoonBadge />
      </div>
      <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground">{module.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{module.description}</p>
    </article>
  );
}
