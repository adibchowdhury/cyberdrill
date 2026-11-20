export type LabWorkspaceInfo = {
  hostname: string;
  hints: readonly string[];
};

const workspaces: Record<string, LabWorkspaceInfo> = {
  "var-log-disk-pressure": {
    hostname: "app-01",
    hints: [
      "The alert is about free space on one volume. Confirm which volume is full before looking elsewhere.",
      "Narrow the search to directories that grew, and keep recent logs available.",
      "When space is available again, check that the application can write.",
    ],
  },
  "edge-certificate-expiry": {
    hostname: "edge-proxy",
    hints: [
      "The proxy is running. Compare the certificate it presents with the name clients request.",
      "Note the dates and the name on the certificate before replacing anything.",
      "After the change, confirm clients can open the site without ignoring warnings.",
    ],
  },
  "ssh-admin-lockout": {
    hostname: "bastion",
    hints: [
      "Separate the burst of failed attempts from the later denials of known administrators.",
      "Find the control that is rejecting approved sessions. Leave that protection enabled.",
      "Restore the on-call accounts, then confirm repeated failures are still blocked.",
    ],
  },
  "unexpected-cron-entry": {
    hostname: "batch-03",
    hints: [
      "The short-lived process is scheduled. Find the entry and the account that owns it.",
      "Record when it appeared and what it runs before you remove it.",
      "After removal, confirm the same command is not scheduled again.",
    ],
  },
  "management-firewall-block": {
    hostname: "app-02",
    hints: [
      "Application checks still succeed. Limit the investigation to the management path.",
      "Compare the approved management access with the rules that are active now.",
      "Restore that path only. Do not expose management access to the public internet.",
    ],
  },
  "sudoers-recovery": {
    hostname: "console-01",
    hints: [
      "Read the policy error before editing the file again.",
      "The open console session is the safe place to restore a valid policy.",
      "Confirm the approved group can elevate, and note what the broken edit changed.",
    ],
  },
  "unfamiliar-dns-pattern": {
    hostname: "ws-14",
    hints: [
      "Confirm the repeating query and when it started before naming a cause.",
      "Identify the process that sends the lookups, then compare it with approved software.",
      "Recommend containment that keeps the records you already collected.",
    ],
  },
  "gateway-502": {
    hostname: "proxy-01",
    hints: [
      "The status is coming from the proxy. The upstream process is still running.",
      "Compare the upstream address in the reloaded configuration with what is listening.",
      "After responses succeed, review the reloaded configuration for a second mistake.",
    ],
  },
  "unexpected-privileged-account": {
    hostname: "file-02",
    hints: [
      "Compare the flagged account with the approved access inventory.",
      "Find when it was created, when it gained administrator rights, and whether it was used.",
      "Remove the unapproved access and keep the records that support that decision.",
    ],
  },
  "authentication-log-gap": {
    hostname: "jump-02",
    hints: [
      "Check whether the same gap exists on the other hosts in this role.",
      "Look for a stop, a restart, or a break in forwarding during the missing window.",
      "Describe what the timeline can show, including what it cannot prove.",
    ],
  },
  "service-account-session": {
    hostname: "job-07",
    hints: [
      "This account should not have an interactive login. Identify that session first.",
      "Record the outbound connection before you close it.",
      "Contain the account without stopping unrelated jobs on the host.",
    ],
  },
  "sustained-cpu-process": {
    hostname: "api-04",
    hints: [
      "Name the process using the CPU and compare it with the approved stack.",
      "Stop the unapproved work without stopping the application.",
      "Check that latency returns to the normal range afterward.",
    ],
  },
};

const fallbackWorkspace: LabWorkspaceInfo = {
  hostname: "lab-host",
  hints: [
    "Read the briefing and note what changed.",
    "Work through the objectives in order.",
    "Record what you can prove before changing the host.",
  ],
};

export function getLabWorkspace(slug: string): LabWorkspaceInfo {
  return workspaces[slug] ?? fallbackWorkspace;
}
