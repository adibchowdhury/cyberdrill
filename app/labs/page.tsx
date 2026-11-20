import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Training Labs",
};

const categories = [
  {
    name: "Linux Administration",
    description: "Host administration, logging, access, and service troubleshooting.",
    href: "/labs/linux-administration",
  },
  {
    name: "Windows & PowerShell Administration",
    description: "Workstations, servers, and day-to-day PowerShell operations.",
  },
  {
    name: "Active Directory",
    description: "Directory services, accounts, groups, and authentication paths.",
  },
  {
    name: "Networking",
    description: "Routing, firewalls, name resolution, and connectivity.",
  },
  {
    name: "Cybersecurity Engineering",
    description: "Control design, hardening, and defensive architecture.",
  },
  {
    name: "Vulnerability Management",
    description: "Findings, prioritization, and remediation tracking.",
  },
  {
    name: "SOC & Incident Response",
    description: "Detection, triage, and incident handling.",
  },
  {
    name: "Cloud Security",
    description: "Identity, configuration, and workload security in cloud environments.",
  },
  {
    name: "Penetration Testing",
    description: "Authorized testing scenarios and reporting.",
  },
  {
    name: "DevSecOps & Automation",
    description: "Pipelines, policy checks, and security automation.",
  },
] as const;

export default function TrainingCategoriesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Catalog"
        title="Training Labs"
        description="Choose a training category. Linux Administration is open in this preview."
      />
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) =>
          "href" in category ? (
            <li key={category.name} className="min-w-0">
              <article className="group relative flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-sm transition-colors hover:border-accent/40 hover:shadow-md has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/40">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-semibold tracking-tight text-foreground group-hover:text-cyan-text">
                    <Link
                      href={category.href}
                      className="outline-none after:absolute after:inset-0 focus-visible:outline-none"
                    >
                      {category.name}
                    </Link>
                  </h2>
                  <span className="shrink-0 text-xs font-medium text-cyan-text">Open</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{category.description}</p>
              </article>
            </li>
          ) : (
            <li key={category.name} className="min-w-0">
              <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-semibold tracking-tight text-foreground">
                    {category.name}
                  </h2>
                  <span className="shrink-0 text-xs font-medium text-muted">Coming soon</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{category.description}</p>
              </article>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
