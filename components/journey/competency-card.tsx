import type { Competency } from "@/lib/journey/pathways";

export function CompetencyCard({ competency }: { competency: Competency }) {
  return (
    <article className="rounded-xl border border-line bg-surface p-5 shadow-sm">
      <p className="text-xs font-medium tracking-wide text-muted uppercase">Competency area</p>
      <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground">{competency.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{competency.description}</p>
      <p className="mt-4 text-sm font-medium text-foreground">Not yet assessed</p>
    </article>
  );
}
