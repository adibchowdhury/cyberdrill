import type { PathwayIconName } from "@/components/icons";

export type LevelId = "beginner" | "intermediate" | "advanced";

export type TeachingBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; label?: string; code: string }
  | { type: "permissions"; mode: string; note: string };

export type Choice = {
  id: string;
  label: string;
};

export type MultipleChoiceQuestion = {
  id: string;
  type: "multiple-choice";
  prompt: string;
  choices: Choice[];
  correctId: string;
  explanation: string;
};

export type VisualQuestion = {
  id: string;
  type: "visual";
  prompt: string;
  output: { caption: string; lines: string[] };
  choices: Choice[];
  correctId: string;
  explanation: string;
};

export type TerminalQuestion = {
  id: string;
  type: "terminal";
  prompt: string;
  scenario: string;
  accepted: string[];
  explanation: string;
};

export type Question = MultipleChoiceQuestion | VisualQuestion | TerminalQuestion;

export type Skill = {
  id: string;
  slug: string;
  pathway: string;
  level: LevelId;
  title: string;
  description: string;
  minutes: number;
  teaching: TeachingBlock[];
  questions: Question[];
  placeholder: boolean;
};

export type PathwayLevel = {
  id: LevelId;
  title: string;
  description: string;
  skills: Skill[];
};

export type Pathway = {
  slug: string;
  name: string;
  description: string;
  icon: PathwayIconName;
  available: boolean;
  levels: PathwayLevel[];
};

const LINUX = "linux-administration";

function preview(
  pathway: string,
  level: LevelId,
  slug: string,
  title: string,
  description: string,
  minutes: number,
): Skill {
  return {
    id: `${pathway}/${level}/${slug}`,
    slug,
    pathway,
    level,
    title,
    description,
    minutes,
    placeholder: true,
    teaching: [
      {
        type: "paragraph",
        text: "This speedrun is a placeholder. A short lesson and a few challenges will be added here later, on the same page used by every other skill.",
      },
    ],
    questions: [],
  };
}

const readFilePermissions: Skill = {
  id: `${LINUX}/beginner/read-file-permissions`,
  slug: "read-file-permissions",
  pathway: LINUX,
  level: "beginner",
  title: "Read Linux File Permissions",
  description: "Decode rwx strings and numeric modes so you can tell who can read, change, or run a file.",
  minutes: 6,
  placeholder: false,
  teaching: [
    {
      type: "paragraph",
      text: "After the file-type character, a Linux permission string is nine letters. The first three belong to the owner, the next three to the group, and the last three to everyone else.",
    },
    {
      type: "list",
      items: [
        "r means read, and it is worth 4",
        "w means write, and it is worth 2",
        "x means execute, and it is worth 1",
        "- means that permission is off",
      ],
    },
    {
      type: "paragraph",
      text: "Add the numbers in one trio to get one chmod digit. rwx is 7, r-x is 5, and r-- is 4.",
    },
    {
      type: "permissions",
      mode: "rwxr-xr--",
      note: "rwxr-xr-- is mode 754. The owner can read, write, and execute. The group can read and execute. Everyone else can only read.",
    },
    {
      type: "heading",
      text: "Commands you will use",
    },
    {
      type: "code",
      label: "See a mode, then set one",
      code: "ls -l notes.txt\nchmod 644 notes.txt\nchmod 755 deploy.sh\nchmod u+x script.sh",
    },
    {
      type: "paragraph",
      text: "644 is rw-r--r--: the owner can read and write, and everyone else can read. 755 is rwxr-xr-x: the owner can do all three, and the group and others can read and execute. u+x adds execute for the owner and leaves every other bit alone.",
    },
  ],
  questions: [
    {
      id: "owner-bits",
      type: "multiple-choice",
      prompt: "A file shows the permission string rwxr-xr--. What can the owner do?",
      choices: [
        { id: "read", label: "Read only" },
        { id: "read-write", label: "Read and write" },
        { id: "all", label: "Read, write, and execute" },
        { id: "execute", label: "Execute only" },
      ],
      correctId: "all",
      explanation:
        "The first three characters belong to the owner. rwx means read, write, and execute are all allowed.",
    },
    {
      id: "group-bits",
      type: "visual",
      prompt:
        "What can members of the group do with secrets.txt? The first character is the file type. The next nine are the permissions.",
      output: {
        caption: "ls -l secrets.txt",
        lines: ["-rw-r----- 1 alex staff 2048 secrets.txt"],
      },
      choices: [
        { id: "all", label: "Read, write, and execute" },
        { id: "read-write", label: "Read and write" },
        { id: "read", label: "Read only" },
        { id: "none", label: "Nothing" },
      ],
      correctId: "read",
      explanation:
        "Skip the leading file-type dash. The group owns characters four through six: r--. The group can read the file and cannot write or execute it.",
    },
    {
      id: "mode-755",
      type: "multiple-choice",
      prompt: "What does the numeric mode 755 grant?",
      choices: [
        { id: "rwx-rx-rx", label: "Owner rwx, group r-x, others r-x" },
        { id: "rw-r-r", label: "Owner rw, group r, others r" },
        { id: "all", label: "Owner rwx, group rwx, others rwx" },
        { id: "swapped", label: "Owner r-x, group rwx, others rwx" },
      ],
      correctId: "rwx-rx-rx",
      explanation: "7 = 4+2+1 = rwx. 5 = 4+1 = r-x. So 755 is rwxr-xr-x.",
    },
    {
      id: "choose-chmod",
      type: "multiple-choice",
      prompt:
        "notes.txt should be readable and writable by the owner, and only readable by the group and everyone else. Which command sets that?",
      choices: [
        { id: "644", label: "chmod 644 notes.txt" },
        { id: "755", label: "chmod 755 notes.txt" },
        { id: "600", label: "chmod 600 notes.txt" },
        { id: "777", label: "chmod 777 notes.txt" },
      ],
      correctId: "644",
      explanation:
        "644 is rw-r--r--. 755 adds execute. 600 removes access for everyone except the owner. 777 lets everyone write.",
    },
    {
      id: "chmod-deploy",
      type: "terminal",
      prompt:
        "deploy.sh is in the current directory. The owner must be able to read, write, and execute it. The group and everyone else must be able to read and execute it, but not change it. Enter the chmod command.",
      scenario: "student@lab:~",
      accepted: [
        "chmod 755 deploy.sh",
        "chmod 755 ./deploy.sh",
        "chmod 0755 deploy.sh",
        "chmod 0755 ./deploy.sh",
        "chmod u=rwx,go=rx deploy.sh",
        "chmod u=rwx,go=rx ./deploy.sh",
        "chmod u=rwx,g=rx,o=rx deploy.sh",
        "chmod u=rwx,g=rx,o=rx ./deploy.sh",
        "chmod go=rx,u=rwx deploy.sh",
        "chmod go=rx,u=rwx ./deploy.sh",
        "chmod g=rx,o=rx,u=rwx deploy.sh",
        "chmod g=rx,o=rx,u=rwx ./deploy.sh",
        "chmod a=rx,u+w deploy.sh",
        "chmod a=rx,u+w ./deploy.sh",
        "chmod ugo=rx,u+w deploy.sh",
        "chmod ugo=rx,u+w ./deploy.sh",
      ],
      explanation:
        "That access is rwxr-xr-x, numeric 755. One command that sets it is chmod 755 deploy.sh. chmod +x deploy.sh only adds execute, and chmod 777 deploy.sh also grants write to everyone.",
    },
  ],
};

const beginnerSkills: Skill[] = [
  preview(
    LINUX,
    "beginner",
    "navigate-the-linux-filesystem",
    "Navigate the Linux Filesystem",
    "Move between directories and tell where you are.",
    5,
  ),
  readFilePermissions,
  preview(
    LINUX,
    "beginner",
    "change-permissions-with-chmod",
    "Change Permissions with chmod",
    "Set access with a numeric mode or a symbolic change.",
    6,
  ),
  preview(
    LINUX,
    "beginner",
    "manage-file-ownership",
    "Manage File Ownership",
    "Change the user and the group that own a file.",
    6,
  ),
  preview(
    LINUX,
    "beginner",
    "create-and-delete-files",
    "Create and Delete Files",
    "Make, copy, move, and remove files without guessing.",
    5,
  ),
  preview(
    LINUX,
    "beginner",
    "find-files-and-directories",
    "Find Files and Directories",
    "Locate a file by name from the directory you are in.",
    7,
  ),
  preview(
    LINUX,
    "beginner",
    "read-and-search-log-files",
    "Read and Search Log Files",
    "Open a log and jump to the lines that matter.",
    8,
  ),
  preview(
    LINUX,
    "beginner",
    "manage-linux-processes",
    "Manage Linux Processes",
    "See what is running and stop one process.",
    7,
  ),
  preview(
    LINUX,
    "beginner",
    "start-stop-and-restart-services",
    "Start, Stop, and Restart Services",
    "Control a service without rebooting the machine.",
    6,
  ),
  preview(
    LINUX,
    "beginner",
    "check-disk-and-memory-usage",
    "Check Disk and Memory Usage",
    "See which filesystem is full and what is using memory.",
    6,
  ),
  preview(
    LINUX,
    "beginner",
    "manage-users-and-groups",
    "Manage Users and Groups",
    "Add a user and place that user in a group.",
    8,
  ),
  preview(
    LINUX,
    "beginner",
    "understand-linux-networking-commands",
    "Understand Linux Networking Commands",
    "Check an address, a route, and an open connection.",
    7,
  ),
];

const intermediateSkills: Skill[] = [
  preview(LINUX, "intermediate", "redirect-output-and-errors", "Redirect Output and Errors", "Send command output and errors to a file or another command.", 8),
  preview(LINUX, "intermediate", "search-text-with-grep", "Search Text with grep", "Find matching lines in a file from the shell.", 7),
  preview(LINUX, "intermediate", "follow-a-log-with-tail", "Follow a Log with tail", "Watch new log lines as they are written.", 6),
  preview(LINUX, "intermediate", "edit-a-file-in-the-shell", "Edit a File in the Shell", "Open a file, change one line, and save it.", 8),
];

const advancedSkills: Skill[] = [
  preview(LINUX, "advanced", "write-a-simple-shell-script", "Write a Simple Shell Script", "Put a few commands in a file and run that file.", 10),
  preview(LINUX, "advanced", "configure-ssh-key-login", "Configure SSH Key Login", "Create a key pair and use it to sign in.", 10),
  preview(LINUX, "advanced", "read-a-systemd-unit", "Read a systemd Unit", "Find what a service runs and when it starts.", 9),
  preview(LINUX, "advanced", "inspect-listening-ports", "Inspect Listening Ports", "See which process is listening on a port.", 8),
];

function levelsFor(skills: { beginner: Skill[]; intermediate: Skill[]; advanced: Skill[] }): PathwayLevel[] {
  return [
    {
      id: "beginner",
      title: "Beginner",
      description: "Core commands you can use the same day.",
      skills: skills.beginner,
    },
    {
      id: "intermediate",
      title: "Intermediate",
      description: "Everyday administration, one skill at a time.",
      skills: skills.intermediate,
    },
    {
      id: "advanced",
      title: "Advanced",
      description: "Deeper Linux work, still in a short speedrun.",
      skills: skills.advanced,
    },
  ];
}

export const pathways: Pathway[] = [
  {
    slug: LINUX,
    name: "Linux Administration",
    description: "Files, users, processes, and the commands you use on a Linux host.",
    icon: "linux",
    available: true,
    levels: levelsFor({
      beginner: beginnerSkills,
      intermediate: intermediateSkills,
      advanced: advancedSkills,
    }),
  },
  {
    slug: "networking",
    name: "Networking",
    description: "Addresses, ports, and the path a packet takes.",
    icon: "networking",
    available: false,
    levels: [],
  },
  {
    slug: "windows-powershell",
    name: "Windows & PowerShell",
    description: "Windows administration from the command line.",
    icon: "windows",
    available: false,
    levels: [],
  },
  {
    slug: "active-directory",
    name: "Active Directory",
    description: "Users, groups, and domain authentication.",
    icon: "directory",
    available: false,
    levels: [],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    description: "Threats, controls, and how defenders investigate them.",
    icon: "engineering",
    available: false,
    levels: [],
  },
  {
    slug: "cloud-security",
    name: "Cloud Security",
    description: "Identity, storage, and network controls in the cloud.",
    icon: "cloud",
    available: false,
    levels: [],
  },
  {
    slug: "penetration-testing",
    name: "Penetration Testing",
    description: "Find and explain weaknesses in a system you are allowed to test.",
    icon: "pentest",
    available: false,
    levels: [],
  },
];

export function isLevelId(value: string): value is LevelId {
  return value === "beginner" || value === "intermediate" || value === "advanced";
}

export function getPathway(slug: string): Pathway | undefined {
  return pathways.find((pathway) => pathway.slug === slug);
}

export function getLevel(pathwaySlug: string, levelId: string): PathwayLevel | undefined {
  if (!isLevelId(levelId)) return undefined;
  return getPathway(pathwaySlug)?.levels.find((level) => level.id === levelId);
}

export function getSkill(pathwaySlug: string, levelId: string, skillSlug: string): Skill | undefined {
  return getLevel(pathwaySlug, levelId)?.skills.find((skill) => skill.slug === skillSlug);
}

export function getNextSkill(pathwaySlug: string, levelId: string, skillSlug: string): Skill | undefined {
  const skills = getLevel(pathwaySlug, levelId)?.skills ?? [];
  const index = skills.findIndex((skill) => skill.slug === skillSlug);
  if (index < 0) return undefined;
  return skills[index + 1];
}

export function skillHref(pathwaySlug: string, levelId: string, skillSlug: string): string {
  return `/pathways/${pathwaySlug}/${levelId}/${skillSlug}`;
}

export function pathwaySkillCount(pathway: Pathway): number {
  return pathway.levels.reduce((total, level) => total + level.skills.length, 0);
}

export function pathwaySkillIds(pathway: Pathway): string[] {
  return pathway.levels.flatMap((level) => level.skills.map((skill) => skill.id));
}

export function getFeaturedSkills(): Skill[] {
  const slugs = ["read-file-permissions", "navigate-the-linux-filesystem", "manage-linux-processes"];
  return slugs.flatMap((slug) => {
    const skill = getSkill(LINUX, "beginner", slug);
    return skill ? [skill] : [];
  });
}

export function pathwayParams(): { pathway: string }[] {
  return pathways.filter((pathway) => pathway.available).map((pathway) => ({ pathway: pathway.slug }));
}

export function levelParams(): { pathway: string; level: string }[] {
  return pathways.flatMap((pathway) =>
    pathway.levels.map((level) => ({ pathway: pathway.slug, level: level.id })),
  );
}

export function skillParams(): { pathway: string; level: string; skill: string }[] {
  return pathways.flatMap((pathway) =>
    pathway.levels.flatMap((level) =>
      level.skills.map((skill) => ({
        pathway: pathway.slug,
        level: level.id,
        skill: skill.slug,
      })),
    ),
  );
}
