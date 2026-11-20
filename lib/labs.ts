export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type LabStatus = "not-started" | "in-progress" | "completed";

export type Lab = {
  slug: string;
  code: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  durationMinutes: number;
  status: LabStatus;
  summary: string;
  briefing: readonly string[];
  objectives: readonly string[];
  skills: readonly string[];
  completedAt?: string;
  score?: number;
};

export const difficulties = ["Beginner", "Intermediate", "Advanced"] as const;

export const labs: readonly Lab[] = [
  {
    slug: "var-log-disk-pressure",
    code: "CD-101",
    title: "Disk pressure on /var",
    category: "Linux Administration",
    difficulty: "Beginner",
    durationMinutes: 25,
    status: "completed",
    completedAt: "2026-10-06",
    score: 92,
    summary:
      "A host is rejecting writes because /var is full. Find what consumed the volume and restore enough space for services to run.",
    briefing: [
      "Monitoring reported that app-01 has almost no free space on /var, and the application can no longer rotate its own logs. SSH still answers. Nothing in the change calendar shows a package install or a new data directory during the window.",
      "Find which paths are responsible, recover space without throwing away logs you may still need, and confirm the service can write again.",
    ],
    objectives: [
      "Identify the directories responsible for the growth",
      "Recover space while keeping recent logs available",
      "Confirm the affected service can write to disk",
      "Record a follow-up so the volume does not fill the same way again",
    ],
    skills: ["Filesystems", "Logging", "Capacity"],
  },
  {
    slug: "edge-certificate-expiry",
    code: "CD-102",
    title: "Expired certificate on the edge proxy",
    category: "Web Infrastructure",
    difficulty: "Beginner",
    durationMinutes: 20,
    status: "completed",
    completedAt: "2026-10-12",
    score: 88,
    summary:
      "Visitors see a browser warning on the public site. The proxy is up, and the certificate presented at the edge is no longer valid.",
    briefing: [
      "Support started receiving reports of a certificate warning on www. The edge proxy process is running and still routes health checks. The warning appeared at the start of the business day, with no deploy in that window.",
      "Confirm what the proxy is presenting, why it is no longer trusted, and what has to be replaced so clients can connect without disabling verification.",
    ],
    objectives: [
      "Confirm the certificate the proxy is presenting",
      "Identify why clients no longer trust it",
      "Restore a valid certificate for the public name",
      "Verify the site loads without a browser warning",
    ],
    skills: ["TLS", "Reverse proxies", "Change windows"],
  },
  {
    slug: "ssh-admin-lockout",
    code: "CD-103",
    title: "SSH lockout after repeated failures",
    category: "Identity & Access",
    difficulty: "Beginner",
    durationMinutes: 30,
    status: "completed",
    completedAt: "2026-10-19",
    score: 94,
    summary:
      "On-call administrators can no longer open SSH after a burst of failed logins. Access needs to return without turning protection off.",
    briefing: [
      "Administrators who use the bastion began receiving authentication failures, including people who had not mistyped a password. Logs show a burst of failed attempts against several accounts from one external address, then denials for known staff.",
      "Determine what is rejecting the legitimate sessions, restore access for the on-call group, and leave the brute-force protection in place.",
    ],
    objectives: [
      "Identify which control is rejecting the sessions",
      "Confirm the source of the failed attempts",
      "Restore SSH for the approved administrator accounts",
      "Verify repeated failures are still blocked",
    ],
    skills: ["SSH", "Access control", "Log review"],
  },
  {
    slug: "unexpected-cron-entry",
    code: "CD-104",
    title: "Unexpected scheduled job",
    category: "Incident Response",
    difficulty: "Intermediate",
    durationMinutes: 40,
    status: "completed",
    completedAt: "2026-11-02",
    score: 81,
    summary:
      "A host launches a script every few minutes from cron. The entry is not part of the configuration managed for that server.",
    briefing: [
      "Process accounting shows a short-lived shell on batch-03 every few minutes. The command is not part of the application, and the cron entry does not appear in the configuration repository for that role.",
      "Establish when the entry appeared, what it runs, and whether it should be removed. Preserve enough detail for the incident record before you change the host.",
    ],
    objectives: [
      "Locate the scheduled entry and the command it runs",
      "Determine when it was added and under which account",
      "Preserve the relevant details for the incident record",
      "Remove the unapproved job and confirm it does not return",
    ],
    skills: ["Persistence", "Timeline", "Host triage"],
  },
  {
    slug: "management-firewall-block",
    code: "CD-105",
    title: "Management access blocked by a firewall change",
    category: "Network Security",
    difficulty: "Beginner",
    durationMinutes: 25,
    status: "in-progress",
    summary:
      "After a firewall update, the management network can no longer reach SSH. Other services on the host still answer.",
    briefing: [
      "A firewall change was applied to edge-fw this morning. Application health checks still succeed, but administrators on the management network can no longer open SSH to the Linux hosts behind it.",
      "Compare the intended management access with the rules that are active, restore the approved path, and avoid opening the management port to the public internet.",
    ],
    objectives: [
      "Confirm the failure is limited to the management path",
      "Find the rule that dropped the approved traffic",
      "Restore SSH from the management network only",
      "Check that the public exposure of the host did not change",
    ],
    skills: ["Firewalls", "SSH", "Change review"],
  },
  {
    slug: "sudoers-recovery",
    code: "CD-106",
    title: "Broken sudo policy after an emergency edit",
    category: "Identity & Access",
    difficulty: "Intermediate",
    durationMinutes: 35,
    status: "in-progress",
    summary:
      "An emergency edit to the sudo policy left administrators unable to elevate. A console session is still open.",
    briefing: [
      "During an incident bridge, an administrator edited sudoers directly. New shells can no longer elevate, and sudo reports a policy error. One console session from before the edit is still open on the host.",
      "Recover a valid policy, confirm the intended administrators can elevate, and leave a record of what the broken edit changed.",
    ],
    objectives: [
      "Read the policy error without making another untested edit",
      "Restore a valid sudo policy",
      "Confirm the approved group can elevate again",
      "Note how the broken change should be avoided next time",
    ],
    skills: ["Privilege", "Policy", "Recovery"],
  },
  {
    slug: "unfamiliar-dns-pattern",
    code: "CD-107",
    title: "Repeating DNS queries to an unfamiliar name",
    category: "Logging & Detection",
    difficulty: "Advanced",
    durationMinutes: 45,
    status: "not-started",
    summary:
      "Resolver logs show one workstation asking for the same unusual name on a steady interval. Identify the process and decide whether the lookup should continue.",
    briefing: [
      "DNS logs for the office resolver show workstation ws-14 querying a domain that does not appear in the software inventory. The queries repeat on a regular interval and began late yesterday.",
      "Identify the process responsible, decide whether it belongs to an approved application, and recommend whether the name should be blocked. Do not wipe the host before the observation is recorded.",
    ],
    objectives: [
      "Confirm the query pattern and when it started",
      "Identify the process issuing the lookups",
      "Decide whether the software is approved",
      "Recommend containment that preserves the evidence already collected",
    ],
    skills: ["DNS logs", "Host triage", "Containment"],
  },
  {
    slug: "gateway-502",
    code: "CD-108",
    title: "502 responses after a proxy reload",
    category: "Web Infrastructure",
    difficulty: "Beginner",
    durationMinutes: 20,
    status: "not-started",
    summary:
      "The public site began returning 502 after a configuration reload. The upstream application process is still running.",
    briefing: [
      "A configuration reload on the public proxy completed without a reported error, and immediately afterward clients started receiving 502 responses. The application process on the upstream host is still running and listening.",
      "Find why the proxy can no longer reach a healthy upstream, restore normal responses, and confirm the reload did not leave a second problem behind.",
    ],
    objectives: [
      "Confirm the proxy is the component returning 502",
      "Compare the upstream address with what is actually listening",
      "Restore successful responses through the proxy",
      "Check the reloaded configuration for a related mistake",
    ],
    skills: ["Reverse proxies", "Upstreams", "HTTP status"],
  },
  {
    slug: "unexpected-privileged-account",
    code: "CD-109",
    title: "Unfamiliar account in the administrators group",
    category: "Identity & Access",
    difficulty: "Intermediate",
    durationMinutes: 30,
    status: "not-started",
    summary:
      "A local account that is not in the access inventory was added to the administrator group sometime yesterday.",
    briefing: [
      "A daily access review flagged user `svc-backup2` on file-02. The account is local, it is a member of the wheel group, and it does not appear in the approved access list. The real backup service uses a different account.",
      "Determine when the account appeared, whether it has been used, and remove access that was not approved. Keep the artifacts you used to make that decision.",
    ],
    objectives: [
      "Confirm the account is absent from the access inventory",
      "Find when it was created and when it was granted administrator rights",
      "Check whether the account has an active or recent session",
      "Remove the unapproved privilege and document the finding",
    ],
    skills: ["Accounts", "Groups", "Access review"],
  },
  {
    slug: "authentication-log-gap",
    code: "CD-110",
    title: "Gap in authentication logs",
    category: "Logging & Detection",
    difficulty: "Advanced",
    durationMinutes: 40,
    status: "not-started",
    summary:
      "Authentication logs for one host are missing a two-hour window overnight. Nearby hosts recorded events normally during that period.",
    briefing: [
      "The central log store has no authentication events from jump-02 between 01:10 and 03:05 UTC. Hosts in the same role forwarded logs throughout that window. jump-02 is online now and is sending new events.",
      "Determine whether the host stopped producing logs, stopped shipping them, or whether records were removed. Describe the gap clearly enough for the incident timeline.",
    ],
    objectives: [
      "Confirm the gap is specific to this host",
      "Check whether the logging service was stopped or restarted",
      "Look for signs that existing log records were altered",
      "Summarize what the timeline can and cannot show",
    ],
    skills: ["Log integrity", "Timelines", "Forwarding"],
  },
  {
    slug: "service-account-session",
    code: "CD-111",
    title: "Interactive session on a service account",
    category: "Incident Response",
    difficulty: "Advanced",
    durationMinutes: 45,
    status: "not-started",
    summary:
      "A service account that should only run a daemon has an interactive session and an outbound connection outside its published behavior.",
    briefing: [
      "The application account `app-worker` on job-07 owns an interactive shell. That account is supposed to run a single service and has no approved login. The same session has an outbound connection to an address the service does not use.",
      "Identify the session, record the connection, and contain the account without taking down unrelated jobs on the host.",
    ],
    objectives: [
      "Identify the interactive session and its owner",
      "Record the unexpected outbound connection",
      "Contain the account while leaving unrelated services running",
      "Note how an interactive login became possible",
    ],
    skills: ["Sessions", "Service accounts", "Containment"],
  },
  {
    slug: "sustained-cpu-process",
    code: "CD-112",
    title: "Sustained CPU from an unfamiliar process",
    category: "Linux Administration",
    difficulty: "Intermediate",
    durationMinutes: 35,
    status: "not-started",
    summary:
      "A production host has been near full CPU for an hour. The busiest process is not part of the installed application stack.",
    briefing: [
      "api-04 has held high CPU since 13:40 UTC. The busiest process name does not match the application, its agents, or the usual package set for that role. The service itself is still answering, but latency has climbed.",
      "Identify the process, decide whether it belongs on the host, and remove or stop it if it does not. Check that the application returns to normal latency afterward.",
    ],
    objectives: [
      "Identify the process consuming the CPU",
      "Determine whether it is part of the approved stack",
      "Stop the unapproved work without stopping the application",
      "Confirm host latency returns to the normal range",
    ],
    skills: ["Processes", "Performance", "Host triage"],
  },
];

const labsBySlug = new Map(labs.map((lab) => [lab.slug, lab]));

export const categories = [...new Set(labs.map((lab) => lab.category))];

export function getLab(slug: string): Lab | undefined {
  return labsBySlug.get(slug);
}

export type CatalogStats = {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  completionRate: number;
  averageScore: number;
  minutesCompleted: number;
};

export function getCatalogStats(): CatalogStats {
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;
  let scoreTotal = 0;
  let scored = 0;
  let minutesCompleted = 0;

  for (const lab of labs) {
    if (lab.status === "completed") {
      completed += 1;
      minutesCompleted += lab.durationMinutes;
      if (lab.score !== undefined) {
        scoreTotal += lab.score;
        scored += 1;
      }
    } else if (lab.status === "in-progress") {
      inProgress += 1;
    } else {
      notStarted += 1;
    }
  }

  const total = labs.length;

  return {
    total,
    completed,
    inProgress,
    notStarted,
    completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
    averageScore: scored === 0 ? 0 : Math.round(scoreTotal / scored),
    minutesCompleted,
  };
}

export type SkillSummary = {
  category: string;
  total: number;
  completed: number;
  inProgress: number;
  mastery: number;
};

export function getSkillSummaries(): SkillSummary[] {
  const grouped = new Map<
    string,
    { total: number; completed: number; inProgress: number }
  >();

  for (const lab of labs) {
    const current = grouped.get(lab.category) ?? {
      total: 0,
      completed: 0,
      inProgress: 0,
    };
    current.total += 1;
    if (lab.status === "completed") current.completed += 1;
    if (lab.status === "in-progress") current.inProgress += 1;
    grouped.set(lab.category, current);
  }

  return [...grouped.entries()]
    .map(([category, counts]) => ({
      category,
      ...counts,
      mastery:
        counts.total === 0
          ? 0
          : Math.round(
              ((counts.completed + counts.inProgress * 0.45) / counts.total) *
                100,
            ),
    }))
    .sort((a, b) => b.mastery - a.mastery || a.category.localeCompare(b.category));
}

export function getRecommendedLabs(limit = 3): Lab[] {
  const weakestFirst = getSkillSummaries()
    .slice()
    .sort((a, b) => a.mastery - b.mastery || a.category.localeCompare(b.category));
  const categoryRank = new Map(weakestFirst.map((skill, index) => [skill.category, index]));

  return labs
    .filter((lab) => lab.status !== "completed")
    .slice()
    .sort((a, b) => {
      const statusDelta =
        Number(a.status !== "in-progress") - Number(b.status !== "in-progress");
      if (statusDelta !== 0) return statusDelta;
      return (categoryRank.get(a.category) ?? 0) - (categoryRank.get(b.category) ?? 0);
    })
    .slice(0, limit);
}

export type CompletedLab = Lab & { completedAt: string; score: number };

export function getCompletionHistory(): CompletedLab[] {
  return labs
    .flatMap((lab) =>
      lab.status === "completed" && lab.completedAt && lab.score !== undefined
        ? [{ ...lab, completedAt: lab.completedAt, score: lab.score }]
        : [],
    )
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt));
}

export type DifficultyBreakdown = {
  difficulty: Difficulty;
  total: number;
  completed: number;
  rate: number;
};

export function getDifficultyBreakdown(): DifficultyBreakdown[] {
  return difficulties.map((difficulty) => {
    let total = 0;
    let completed = 0;
    for (const lab of labs) {
      if (lab.difficulty !== difficulty) continue;
      total += 1;
      if (lab.status === "completed") completed += 1;
    }
    return {
      difficulty,
      total,
      completed,
      rate: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  });
}
