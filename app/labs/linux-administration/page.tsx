import type { Metadata } from "next";
import Link from "next/link";
import { LabCatalog } from "@/components/lab-catalog";
import { PageHeader } from "@/components/page-header";
import { categories, labs } from "@/lib/labs";

export const metadata: Metadata = {
  title: "Training Labs",
};

export default function LinuxAdministrationLabsPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/labs"
          className="text-sm text-cyan-text outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-cyan/70"
        >
          Back to categories
        </Link>
        <div className="mt-4">
          <PageHeader
            eyebrow="Catalog"
            title="Training Labs"
            description="Linux administration and security troubleshooting scenarios. Filter by topic or difficulty, then open a briefing."
          />
        </div>
      </div>
      <LabCatalog labs={labs} categories={categories} />
    </div>
  );
}
