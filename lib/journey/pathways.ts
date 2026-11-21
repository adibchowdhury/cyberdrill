export type Competency = {
  id: string;
  title: string;
  description: string;
};

export type TrainingModule = {
  id: string;
  order: number;
  title: string;
  description: string;
  kind: "learn" | "practice" | "apply" | "simulation";
};

export type JobPathway = {
  jobSlug: string;
  competencies: Competency[];
  modules: TrainingModule[];
  finalAssessment: {
    title: string;
    description: string;
    tasks: string[];
  };
  portfolioSections: { title: string; description: string }[];
};

const vulnerabilityManagement: JobPathway = {
  jobSlug: "vulnerability-management-analyst",
  competencies: [
    {
      id: "vulnerability-management-fundamentals",
      title: "Vulnerability management fundamentals",
      description:
        "Explain the life of a finding, from discovery through validation, priority, fix, and closure, in language a ticket owner can follow.",
    },
    {
      id: "vulnerability-scanning",
      title: "Vulnerability scanning",
      description:
        "Set the scope of a scan, review what it covered, and tell a complete result from one that missed the assets you named.",
    },
    {
      id: "scan-troubleshooting",
      title: "Scan troubleshooting",
      description:
        "Find why a scan failed, timed out, or skipped hosts, and separate a tool problem from a real exposure.",
    },
    {
      id: "vulnerability-analysis-and-validation",
      title: "Vulnerability analysis and validation",
      description:
        "Check a finding against the asset and the evidence, then mark it confirmed, not reproducible, or still needing information.",
    },
    {
      id: "risk-prioritization",
      title: "Risk prioritization",
      description:
        "Order confirmed findings by the practical risk of leaving them in place, including exposure and how hard the fix is to carry out.",
    },
    {
      id: "remediation-management",
      title: "Remediation management",
      description:
        "Name an owner, record what they were asked to change, and keep the status honest while the fix is still open.",
    },
    {
      id: "remediation-verification",
      title: "Remediation verification",
      description:
        "Check that the agreed fix actually removed the finding, and reopen it when the evidence says it is still present.",
    },
    {
      id: "reporting-and-documentation",
      title: "Reporting and documentation",
      description:
        "Write what was scanned, what was confirmed, what was fixed, and what is still open, so someone else can review the decision.",
    },
  ],
  modules: [
    {
      id: "vulnerability-management-fundamentals",
      order: 1,
      title: "Vulnerability Management Fundamentals",
      description:
        "Learn how a program decides what to scan, how often, and what done means for a finding.",
      kind: "learn",
    },
    {
      id: "vulnerability-scanning",
      order: 2,
      title: "Vulnerability Scanning",
      description:
        "Practice reading what a scanner was asked to cover and what a finished scan is supposed to produce.",
      kind: "practice",
    },
    {
      id: "scan-troubleshooting",
      order: 3,
      title: "Scan Troubleshooting",
      description:
        "Practice telling a failed or partial scan from a clean result, and list the checks to make before trusting it.",
      kind: "practice",
    },
    {
      id: "vulnerability-analysis",
      order: 4,
      title: "Vulnerability Analysis",
      description:
        "Apply a repeatable check to decide whether a reported weakness is real, already mitigated, or still missing evidence.",
      kind: "apply",
    },
    {
      id: "risk-prioritization",
      order: 5,
      title: "Risk Prioritization",
      description:
        "Apply a simple risk order using exposure and impact, without treating the scanner score as the whole decision.",
      kind: "apply",
    },
    {
      id: "remediation-management",
      order: 6,
      title: "Remediation Management",
      description:
        "Apply how an analyst records an owner, a requested change, and the evidence that the request was made.",
      kind: "apply",
    },
    {
      id: "remediation-verification",
      order: 7,
      title: "Remediation Verification",
      description:
        "Apply how you confirm a fix, what you would rescan, and what you do when the finding is still open.",
      kind: "apply",
    },
    {
      id: "job-simulation",
      order: 8,
      title: "Job Simulation",
      description:
        "A planned workplace case that moves one finding from a bad scan through validation, priority, remediation, and a written result.",
      kind: "simulation",
    },
  ],
  finalAssessment: {
    title: "Practical vulnerability management assessment",
    description:
      "A planned assessment with a scan that did not finish cleanly, findings to validate, and a short written result. It is not available to take yet.",
    tasks: [
      "Investigate why a scan did not complete",
      "Validate which findings are real",
      "Prioritize the confirmed findings by risk",
      "Recommend remediation an owner can carry out",
      "Document what you checked and what is still open",
    ],
  },
  portfolioSections: [
    {
      title: "Demonstrated competencies",
      description: "A planned list of competency areas shown in an assessment. Nothing is recorded yet.",
    },
    {
      title: "Assessment history",
      description: "A planned record of assessments you finish. There is no history until an assessment exists.",
    },
    {
      title: "Work samples",
      description: "A planned place for write-ups produced during training. This version does not collect samples.",
    },
    {
      title: "Shareable portfolio",
      description: "A planned page you could later show to someone else. Sharing is not available.",
    },
  ],
};

const pathways: Record<string, JobPathway> = {
  "vulnerability-management-analyst": vulnerabilityManagement,
};

export function getPathway(jobSlug: string): JobPathway | undefined {
  return pathways[jobSlug];
}
