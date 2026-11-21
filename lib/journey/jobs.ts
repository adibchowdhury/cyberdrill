export type JobStatus = "available" | "coming-soon";

export type CareerLevel = "Entry" | "Entry to Mid" | "Mid" | "Mid to Senior" | "Senior";

export type Job = {
  slug: string;
  title: string;
  summary: string;
  level: CareerLevel;
  skillAreas: string[];
  status: JobStatus;
};

export const CAREER_LEVELS: readonly CareerLevel[] = [
  "Entry",
  "Entry to Mid",
  "Mid",
  "Mid to Senior",
  "Senior",
];

export const jobs: readonly Job[] = [
  {
    slug: "vulnerability-management-analyst",
    title: "Vulnerability Management Analyst",
    summary:
      "Finds weaknesses on systems the organization uses, checks which findings are real, and helps the right people fix the ones that matter first.",
    level: "Entry to Mid",
    skillAreas: [
      "Vulnerability scanning",
      "Finding validation",
      "Risk prioritization",
      "Remediation tracking",
      "Reporting",
    ],
    status: "available",
  },
  {
    slug: "soc-analyst",
    title: "SOC Analyst",
    summary:
      "Watches security alerts, decides which ones need a closer look, and writes down what happened so the next person can follow the case.",
    level: "Entry",
    skillAreas: ["Alert triage", "Log review", "Incident notes", "Security monitoring"],
    status: "coming-soon",
  },
  {
    slug: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    summary:
      "Looks across alerts, vulnerabilities, and control gaps, then explains what should be fixed and what evidence supports that judgment.",
    level: "Entry to Mid",
    skillAreas: ["Threat analysis", "Control review", "Vulnerability review", "Security reporting"],
    status: "coming-soon",
  },
  {
    slug: "grc-analyst",
    title: "GRC Analyst",
    summary:
      "Maps security work to policies and requirements, checks whether the stated controls exist, and keeps the evidence organized.",
    level: "Entry to Mid",
    skillAreas: ["Policy review", "Control mapping", "Evidence collection", "Risk registers"],
    status: "coming-soon",
  },
  {
    slug: "security-compliance-analyst",
    title: "Security Compliance Analyst",
    summary:
      "Checks systems and processes against a stated requirement, records the gaps, and tracks the work that is supposed to close them.",
    level: "Entry to Mid",
    skillAreas: ["Control testing", "Gap tracking", "Audit evidence", "Requirement mapping"],
    status: "coming-soon",
  },
  {
    slug: "iam-analyst",
    title: "IAM Analyst",
    summary:
      "Manages who can reach which systems, reviews group membership, and helps remove access that is no longer needed.",
    level: "Entry to Mid",
    skillAreas: ["Access reviews", "Account lifecycle", "Group membership", "Authentication"],
    status: "coming-soon",
  },
  {
    slug: "security-administrator",
    title: "Security Administrator",
    summary:
      "Keeps security tools and account controls running, applies approved changes, and checks that those changes did what they were supposed to do.",
    level: "Entry to Mid",
    skillAreas: ["Security tooling", "Account administration", "Change control", "Configuration review"],
    status: "coming-soon",
  },
  {
    slug: "threat-intelligence-analyst",
    title: "Threat Intelligence Analyst",
    summary:
      "Turns reporting about attacker behavior into notes a defender can use: what to look for, and which items still need a source check.",
    level: "Mid",
    skillAreas: ["Source evaluation", "Indicator review", "Threat reporting", "Collection notes"],
    status: "coming-soon",
  },
  {
    slug: "incident-response-analyst",
    title: "Incident Response Analyst",
    summary:
      "Investigates a suspected security incident, builds a timeline from the evidence, and recommends what to contain while facts are still being checked.",
    level: "Mid",
    skillAreas: ["Incident triage", "Timeline building", "Evidence handling", "Containment notes"],
    status: "coming-soon",
  },
  {
    slug: "digital-forensics-analyst",
    title: "Digital Forensics Analyst",
    summary:
      "Preserves and examines digital evidence so someone else can see what was collected and how a conclusion was reached.",
    level: "Mid",
    skillAreas: ["Evidence preservation", "Artifact review", "Timeline analysis", "Forensic notes"],
    status: "coming-soon",
  },
  {
    slug: "penetration-tester",
    title: "Penetration Tester",
    summary:
      "Practices authorized testing, records how a weakness could be used, and explains a fix the system owner can act on.",
    level: "Mid",
    skillAreas: ["Scoped testing", "Finding documentation", "Reproduction notes", "Remediation advice"],
    status: "coming-soon",
  },
  {
    slug: "security-engineer",
    title: "Security Engineer",
    summary:
      "Builds and maintains security controls, such as logging, access rules, and detection content, and checks that they still work after a change.",
    level: "Mid",
    skillAreas: ["Control implementation", "Detection content", "Logging", "Secure configuration"],
    status: "coming-soon",
  },
  {
    slug: "network-security-engineer",
    title: "Network Security Engineer",
    summary:
      "Reviews firewalls, remote access, and network segmentation so traffic that should be blocked stays blocked.",
    level: "Mid",
    skillAreas: ["Firewall review", "Network segmentation", "Remote access", "Traffic analysis"],
    status: "coming-soon",
  },
  {
    slug: "cloud-security-engineer",
    title: "Cloud Security Engineer",
    summary:
      "Reviews cloud accounts, identities, and storage so the configuration matches the access the organization actually intends.",
    level: "Mid",
    skillAreas: ["Cloud identity", "Storage exposure", "Network controls", "Configuration review"],
    status: "coming-soon",
  },
  {
    slug: "application-security-engineer",
    title: "Application Security Engineer",
    summary:
      "Reviews how an application handles input, authentication, and dependencies, and describes fixes that fit the way the code is built.",
    level: "Mid",
    skillAreas: ["Code review", "Dependency review", "Authentication flaws", "Secure design"],
    status: "coming-soon",
  },
  {
    slug: "detection-engineer",
    title: "Detection Engineer",
    summary:
      "Turns a described attacker behavior into a detection, tests it against sample data, and writes down what a true alert should look like.",
    level: "Mid to Senior",
    skillAreas: ["Detection logic", "Log sources", "Rule testing", "Alert quality"],
    status: "coming-soon",
  },
  {
    slug: "security-architect",
    title: "Security Architect",
    summary:
      "Decides how major security controls fit together across systems, and writes the tradeoffs down so a later change does not quietly undo them.",
    level: "Senior",
    skillAreas: ["Security architecture", "Control design", "Trust boundaries", "Design review"],
    status: "coming-soon",
  },
  {
    slug: "ai-security-engineer",
    title: "AI Security Engineer",
    summary:
      "Reviews how a system uses a model, what data that model can see, and which mistakes or abuses need a control.",
    level: "Mid to Senior",
    skillAreas: ["Model use review", "Data exposure", "Prompt abuse", "Control design"],
    status: "coming-soon",
  },
  {
    slug: "third-party-risk-analyst",
    title: "Third-Party Risk Analyst",
    summary:
      "Reviews the security information a vendor provides, notes the gaps, and tracks the questions that still need an answer.",
    level: "Entry to Mid",
    skillAreas: ["Vendor review", "Questionnaire review", "Risk notes", "Follow-up tracking"],
    status: "coming-soon",
  },
  {
    slug: "security-awareness-specialist",
    title: "Security Awareness Specialist",
    summary:
      "Teaches the security behaviors a specific job requires, and checks whether the guidance is clear enough for someone to follow.",
    level: "Entry to Mid",
    skillAreas: ["Security guidance", "Training design", "Phishing education", "Audience feedback"],
    status: "coming-soon",
  },
];

const jobsBySlug = new Map(jobs.map((job) => [job.slug, job]));

export function getJob(slug: string): Job | undefined {
  return jobsBySlug.get(slug);
}

export function getAvailableJobs(): Job[] {
  return jobs.filter((job) => job.status === "available");
}
