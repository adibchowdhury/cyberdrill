import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PathwayCard } from "@/components/pathway-card";
import { pathways } from "@/lib/pathways";

export const metadata: Metadata = {
  title: "Pathways",
  description: "Choose a pathway. Linux Administration is open. Each level is a set of short skill speedruns.",
};

export default function PathwaysPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Learn"
        title="Pathways"
        description="Pick a pathway, then a level, then one skill. Linux Administration is open. The others are coming soon."
      />
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {pathways.map((pathway) => (
          <li key={pathway.slug} className="min-w-0">
            <PathwayCard pathway={pathway} />
          </li>
        ))}
      </ul>
    </div>
  );
}
