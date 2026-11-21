import type { PathwayIconName } from "@/components/icons";

export type LevelId = "beginner" | "intermediate" | "advanced" | "expert";

export type DomainId =
  | "fundamentals"
  | "users-permissions"
  | "processes-services"
  | "packages"
  | "storage"
  | "networking"
  | "logging-troubleshooting"
  | "scripting"
  | "security-hardening"
  | "performance"
  | "backup-recovery"
  | "production-ops";

export const DOMAINS: readonly { id: DomainId; name: string }[] = [
  { id: "fundamentals", name: "Linux Fundamentals and Filesystem" },
  { id: "users-permissions", name: "Users, Groups, and Permissions" },
  { id: "processes-services", name: "Processes and Service Management" },
  { id: "packages", name: "Package and Software Management" },
  { id: "storage", name: "Storage and Filesystems" },
  { id: "networking", name: "Networking and Connectivity" },
  { id: "logging-troubleshooting", name: "Logging and Troubleshooting" },
  { id: "scripting", name: "Bash Scripting and Automation" },
  { id: "security-hardening", name: "Linux Security and Hardening" },
  { id: "performance", name: "Performance and Resource Management" },
  { id: "backup-recovery", name: "Backup and Recovery" },
  { id: "production-ops", name: "Infrastructure and Production Operations" },
];

export const levelBenchmarkNote = "Levels are competency benchmarks, not job qualifications.";

export const advancedLevelNote = "Advanced is mostly hands-on challenges. Coming soon.";

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
  domain: DomainId;
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
  id: string,
  pathway: string,
  level: LevelId,
  domain: DomainId,
  slug: string,
  title: string,
  description: string,
  minutes: number,
): Skill {
  return {
    id,
    slug,
    pathway,
    level,
    domain,
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
  domain: "users-permissions",
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

const navigateTheLinuxFilesystem: Skill = {
  id: `${LINUX}/beginner/navigate-the-linux-filesystem`,
  slug: "navigate-the-linux-filesystem",
  pathway: LINUX,
  level: "beginner",
  domain: "fundamentals",
  title: "Navigate the Linux Filesystem",
  description: "Move between directories and tell where you are.",
  minutes: 5,
  placeholder: false,
  teaching: [
    {
      "type": "paragraph",
      "text": "The shell always has one current directory. Commands that use a relative path start from there. An absolute path starts with / and means the same thing from anywhere."
    },
    {
      "type": "list",
      "items": [
        "pwd prints the absolute path of the current directory",
        "ls lists names. -l is the long listing, -a includes hidden names, and -h prints sizes like 1.2K",
        "cd /var/log is absolute. cd projects is relative and only works if projects is inside the current directory",
        "cd .. moves to the parent. cd ~ and cd with no path both move to your home directory",
        "cd - switches to the previous directory and prints that path",
        "/etc holds configuration, /var/log holds logs, /home holds user homes, /tmp holds temporary files, /usr/bin holds programs, and /root is root's home"
      ]
    },
    {
      "type": "paragraph",
      "text": "A name that starts with a dot is hidden. ls leaves it out. ls -a shows it, including the two special entries . (this directory) and .. (the parent). /tmp is world-writable with the sticky bit, so you can create files there but you can delete only your own."
    },
    {
      "type": "heading",
      "text": "Commands you will use"
    },
    {
      "type": "code",
      "label": "Find where you are, look, then move",
      "code": "pwd\nls -lh\nls -a\ncd /var/log\ncd ..\ncd ~\ncd -"
    },
    {
      "type": "code",
      "label": "Example",
      "code": "alex@web-1:~$ pwd\n/home/alex\nalex@web-1:~$ ls -lh\ntotal 8.0K\n-rwxr-xr-x 1 alex alex  128 Nov 20 09:10 backup.sh\ndrwxr-xr-x 2 alex alex 4.0K Nov 20 09:14 projects"
    },
    {
      "type": "heading",
      "text": "Common mistake"
    },
    {
      "type": "paragraph",
      "text": "cd var/log from /tmp looks for /tmp/var/log and fails. The leading slash is what makes cd /var/log work from any directory. ls with no -a is the other miss: a dotfile is still there when a plain ls does not show it."
    }
  ],
  questions: [
    {
      "id": "print-location",
      "type": "multiple-choice",
      "prompt": "You are in /home/alex/projects. Which command prints /home/alex/projects?",
      "choices": [
        {
          "id": "pwd",
          "label": "pwd"
        },
        {
          "id": "ls",
          "label": "ls"
        },
        {
          "id": "cd",
          "label": "cd"
        },
        {
          "id": "whoami",
          "label": "whoami"
        }
      ],
      "correctId": "pwd",
      "explanation": "pwd prints the absolute path of the current directory. ls only prints the names inside it, so it does not tell you the path."
    },
    {
      "id": "absolute-cd",
      "type": "multiple-choice",
      "prompt": "You are in /tmp. Which command changes the current directory to /var/log?",
      "choices": [
        {
          "id": "absolute",
          "label": "cd /var/log"
        },
        {
          "id": "relative",
          "label": "cd var/log"
        },
        {
          "id": "parent",
          "label": "cd .."
        },
        {
          "id": "list",
          "label": "ls /var/log"
        }
      ],
      "correctId": "absolute",
      "explanation": "cd /var/log is an absolute path, so it works from /tmp. cd var/log is relative and looks for /tmp/var/log. ls /var/log lists the directory and leaves you in /tmp."
    },
    {
      "id": "log-dir",
      "type": "multiple-choice",
      "prompt": "On Ubuntu, where do system logs such as syslog usually live?",
      "choices": [
        {
          "id": "var-log",
          "label": "/var/log"
        },
        {
          "id": "etc",
          "label": "/etc"
        },
        {
          "id": "usr-bin",
          "label": "/usr/bin"
        },
        {
          "id": "root",
          "label": "/root"
        }
      ],
      "correctId": "var-log",
      "explanation": "/var/log is the log directory. /etc holds configuration, /usr/bin holds programs, and /root is the root user's home."
    },
    {
      "id": "hidden-file",
      "type": "visual",
      "prompt": "Which entry is a hidden regular file? The first character is the file type.",
      "output": {
        "caption": "ls -la /home/alex",
        "lines": [
          "total 8",
          "drwxr-xr-x 3 alex alex 4096 Nov 20 09:14 .",
          "drwxr-xr-x 4 root root 4096 Nov 20 08:00 ..",
          "-rw-r--r-- 1 alex alex  220 Nov 20 09:02 .notes",
          "drwxr-xr-x 2 alex alex 4096 Nov 20 09:14 projects"
        ]
      },
      "choices": [
        {
          "id": "notes",
          "label": ".notes"
        },
        {
          "id": "projects",
          "label": "projects"
        },
        {
          "id": "dot",
          "label": "."
        },
        {
          "id": "dotdot",
          "label": ".."
        }
      ],
      "correctId": "notes",
      "explanation": ".notes starts with a dot and its type character is -, so it is a hidden regular file. projects is a directory. . and .. are the directory itself and its parent, not a file you created."
    },
    {
      "id": "list-etc",
      "type": "terminal",
      "prompt": "You are in /home/alex. List /etc in long format and include hidden names, including the . and .. entries. Use only the long-format option and the all option, in short or long form, in any order. A trailing slash on /etc is fine. Do not add other options such as -h.",
      "scenario": "alex@web-1:~",
      "accepted": [
        "ls -la /etc",
        "ls -al /etc",
        "ls -l -a /etc",
        "ls -a -l /etc",
        "ls -l --all /etc",
        "ls --all -l /etc",
        "ls -a --format=long /etc",
        "ls -a --format long /etc",
        "ls --format=long -a /etc",
        "ls --format long -a /etc",
        "ls --all --format=long /etc",
        "ls --all --format long /etc",
        "ls --format=long --all /etc",
        "ls --format long --all /etc",
        "ls -a --format=verbose /etc",
        "ls -a --format verbose /etc",
        "ls --format=verbose -a /etc",
        "ls --format verbose -a /etc",
        "ls --all --format=verbose /etc",
        "ls --all --format verbose /etc",
        "ls --format=verbose --all /etc",
        "ls --format verbose --all /etc",
        "ls -la /etc/",
        "ls -al /etc/",
        "ls -l -a /etc/",
        "ls -a -l /etc/",
        "ls -l --all /etc/",
        "ls --all -l /etc/",
        "ls -a --format=long /etc/",
        "ls -a --format long /etc/",
        "ls --format=long -a /etc/",
        "ls --format long -a /etc/",
        "ls --all --format=long /etc/",
        "ls --all --format long /etc/",
        "ls --format=long --all /etc/",
        "ls --format long --all /etc/",
        "ls -a --format=verbose /etc/",
        "ls -a --format verbose /etc/",
        "ls --format=verbose -a /etc/",
        "ls --format verbose -a /etc/",
        "ls --all --format=verbose /etc/",
        "ls --all --format verbose /etc/",
        "ls --format=verbose --all /etc/",
        "ls --format verbose --all /etc/"
      ],
      "explanation": "ls -la /etc is the long listing plus hidden names. -l and -a can be written separately, as --format=long and --all, and /etc/ is the same directory. ls -l /etc hides dotfiles, and ls /etc is not a long listing."
    }
  ],
};

const changePermissionsWithChmod: Skill = {
  id: `${LINUX}/beginner/change-permissions-with-chmod`,
  slug: "change-permissions-with-chmod",
  pathway: LINUX,
  level: "beginner",
  domain: "users-permissions",
  title: "Change Permissions with chmod",
  description: "Set access with a numeric mode or a symbolic change.",
  minutes: 6,
  placeholder: false,
  teaching: [
    {
      "type": "paragraph",
      "text": "chmod changes the mode you already learned to read. A numeric mode sets all nine bits at once. A symbolic change names who it affects and whether to add, remove, or replace bits."
    },
    {
      "type": "list",
      "items": [
        "644 is rw-r--r--: owner read and write, everyone else read",
        "755 is rwxr-xr-x: owner everything, group and others read and execute",
        "600 is rw-------: owner read and write, nobody else",
        "700 is rwx------: owner everything, nobody else",
        "u, g, o, and a mean user, group, other, and all. + adds, - removes, and = replaces",
        "chmod -R applies the same change to a directory and everything inside it"
      ]
    },
    {
      "type": "permissions",
      "mode": "rwx------",
      "note": "700. The owner can read, write, and execute. The group and everyone else have no access. This is a normal mode for a private script."
    },
    {
      "type": "heading",
      "text": "Commands you will use"
    },
    {
      "type": "code",
      "label": "Numeric and symbolic changes",
      "code": "chmod 644 notes.txt\nchmod 755 backup.sh\nchmod 600 id_rsa\nchmod 700 private.sh\nchmod u+x deploy.sh\nchmod o-r notes.txt\nchmod u=rwx,go= private.sh"
    },
    {
      "type": "paragraph",
      "text": "u+x adds execute for the owner and leaves every other bit as it was. o-r removes read from everyone who is not the owner or the group. u=rwx,go= replaces the bits, so the result is 700 no matter what the old mode was. 777 is rwxrwxrwx: every account on the machine can change or replace the file."
    },
    {
      "type": "heading",
      "text": "Common mistake"
    },
    {
      "type": "paragraph",
      "text": "chmod -R 777 / makes the whole system writable by every user, and chmod -R on a large tree also overwrites modes you needed to keep. Never point -R at / or at a directory you have not identified. Prefer a single file, or a mode such as 755, over 777."
    }
  ],
  questions: [
    {
      "id": "mode-644",
      "type": "multiple-choice",
      "prompt": "notes.txt should be rw-r--r--. Which command sets that?",
      "choices": [
        {
          "id": "644",
          "label": "chmod 644 notes.txt"
        },
        {
          "id": "755",
          "label": "chmod 755 notes.txt"
        },
        {
          "id": "600",
          "label": "chmod 600 notes.txt"
        },
        {
          "id": "777",
          "label": "chmod 777 notes.txt"
        }
      ],
      "correctId": "644",
      "explanation": "644 is rw-r--r--. 755 adds execute for everyone. 600 removes read from the group and others. 777 lets every account write the file."
    },
    {
      "id": "symbolic-remove",
      "type": "multiple-choice",
      "prompt": "A file is mode 644. What does chmod o-r notes.txt change?",
      "choices": [
        {
          "id": "others",
          "label": "Others lose read. The owner and group stay rw- and r--"
        },
        {
          "id": "everyone",
          "label": "Everyone loses read, including the owner"
        },
        {
          "id": "execute",
          "label": "Others gain execute"
        },
        {
          "id": "seven",
          "label": "The file becomes mode 777"
        }
      ],
      "correctId": "others",
      "explanation": "o-r removes read only for others, so 644 (rw-r--r--) becomes 640 (rw-r-----). It does not remove the owner's read bit, and it does not add execute."
    },
    {
      "id": "why-not-777",
      "type": "multiple-choice",
      "prompt": "Why is chmod 777 deploy.sh a bad way to make a script runnable?",
      "choices": [
        {
          "id": "world-write",
          "label": "It lets every account on the machine change the script"
        },
        {
          "id": "no-execute",
          "label": "777 does not grant execute"
        },
        {
          "id": "owner-only",
          "label": "777 grants execute only to the owner"
        },
        {
          "id": "root-only",
          "label": "777 means only root can run it"
        }
      ],
      "correctId": "world-write",
      "explanation": "777 is rwxrwxrwx, so execute is there, but write is there for everyone too. chmod 755 deploy.sh makes it runnable without letting other accounts edit it."
    },
    {
      "id": "read-600",
      "type": "visual",
      "prompt": "What numeric mode is this? The first character is the file type.",
      "output": {
        "caption": "ls -l /home/alex/.ssh/id_rsa",
        "lines": [
          "-rw------- 1 alex alex 420 Nov 20 09:30 id_rsa"
        ]
      },
      "choices": [
        {
          "id": "600",
          "label": "600"
        },
        {
          "id": "644",
          "label": "644"
        },
        {
          "id": "700",
          "label": "700"
        },
        {
          "id": "755",
          "label": "755"
        }
      ],
      "correctId": "600",
      "explanation": "Skip the leading file-type dash. rw------- is owner read and write, and no bits for anyone else, which is 600. 644 would show rw-r--r--, and 700 would show an x for the owner."
    },
    {
      "id": "set-700",
      "type": "terminal",
      "prompt": "You are in /home/alex. backup.sh must end as mode 700: the owner can read, write, and execute it, and nobody else has any access. Use chmod. Numeric or symbolic is fine. A ./ or the absolute path is fine. Do not add extra options such as -R or -v.",
      "scenario": "alex@web-1:~",
      "accepted": [
        "chmod 700 backup.sh",
        "chmod 700 ./backup.sh",
        "chmod 700 /home/alex/backup.sh",
        "chmod 0700 backup.sh",
        "chmod 0700 ./backup.sh",
        "chmod 0700 /home/alex/backup.sh",
        "chmod 00700 backup.sh",
        "chmod 00700 ./backup.sh",
        "chmod 00700 /home/alex/backup.sh",
        "chmod u=rwx,go= backup.sh",
        "chmod u=rwx,go= ./backup.sh",
        "chmod u=rwx,go= /home/alex/backup.sh",
        "chmod u=rwx,g=,o= backup.sh",
        "chmod u=rwx,g=,o= ./backup.sh",
        "chmod u=rwx,g=,o= /home/alex/backup.sh",
        "chmod u=rwx,o=,g= backup.sh",
        "chmod u=rwx,o=,g= ./backup.sh",
        "chmod u=rwx,o=,g= /home/alex/backup.sh",
        "chmod go=,u=rwx backup.sh",
        "chmod go=,u=rwx ./backup.sh",
        "chmod go=,u=rwx /home/alex/backup.sh",
        "chmod g=,o=,u=rwx backup.sh",
        "chmod g=,o=,u=rwx ./backup.sh",
        "chmod g=,o=,u=rwx /home/alex/backup.sh",
        "chmod o=,g=,u=rwx backup.sh",
        "chmod o=,g=,u=rwx ./backup.sh",
        "chmod o=,g=,u=rwx /home/alex/backup.sh",
        "chmod g=,u=rwx,o= backup.sh",
        "chmod g=,u=rwx,o= ./backup.sh",
        "chmod g=,u=rwx,o= /home/alex/backup.sh",
        "chmod o=,u=rwx,g= backup.sh",
        "chmod o=,u=rwx,g= ./backup.sh",
        "chmod o=,u=rwx,g= /home/alex/backup.sh",
        "chmod a=,u=rwx backup.sh",
        "chmod a=,u=rwx ./backup.sh",
        "chmod a=,u=rwx /home/alex/backup.sh",
        "chmod a=,u+rwx backup.sh",
        "chmod a=,u+rwx ./backup.sh",
        "chmod a=,u+rwx /home/alex/backup.sh",
        "chmod ugo=,u=rwx backup.sh",
        "chmod ugo=,u=rwx ./backup.sh",
        "chmod ugo=,u=rwx /home/alex/backup.sh",
        "chmod ugo=,u+rwx backup.sh",
        "chmod ugo=,u+rwx ./backup.sh",
        "chmod ugo=,u+rwx /home/alex/backup.sh",
        "chmod a=rwx,go= backup.sh",
        "chmod a=rwx,go= ./backup.sh",
        "chmod a=rwx,go= /home/alex/backup.sh",
        "chmod a=rwx,g=,o= backup.sh",
        "chmod a=rwx,g=,o= ./backup.sh",
        "chmod a=rwx,g=,o= /home/alex/backup.sh",
        "chmod a=rwx,o=,g= backup.sh",
        "chmod a=rwx,o=,g= ./backup.sh",
        "chmod a=rwx,o=,g= /home/alex/backup.sh"
      ],
      "explanation": "700 is rwx------. chmod 700 backup.sh sets it in one step. chmod 755 backup.sh still lets other accounts read and execute it, and chmod +x backup.sh only adds execute."
    }
  ],
};

const manageFileOwnership: Skill = {
  id: `${LINUX}/beginner/manage-file-ownership`,
  slug: "manage-file-ownership",
  pathway: LINUX,
  level: "beginner",
  domain: "users-permissions",
  title: "Manage File Ownership",
  description: "Change the user and the group that own a file.",
  minutes: 6,
  placeholder: false,
  teaching: [
    {
      "type": "paragraph",
      "text": "In ls -l, the third column is the owner and the fourth is the group. Permissions use those two identities: the owner bits apply to that user, and the group bits apply to members of that group."
    },
    {
      "type": "code",
      "label": "Example",
      "code": "ls -l /var/www/html/index.html\n-rw-r--r-- 1 www-data www-data 4096 Nov 20 08:01 index.html"
    },
    {
      "type": "list",
      "items": [
        "chown www-data index.html changes the owner and leaves the group",
        "chown www-data:www-data index.html changes the owner and the group",
        "chown www-data: index.html changes the owner and sets the group to that user's primary group",
        "chgrp www-data index.html changes only the group",
        "chown -R and chgrp -R walk a directory and everything inside it"
      ]
    },
    {
      "type": "paragraph",
      "text": "Giving a file to a different user requires root, so the usual command is sudo chown. The owner of a file can chgrp it to another group they belong to, without becoming root. On Ubuntu the web server account is www-data. On RHEL and Fedora the matching account is usually apache, not www-data."
    },
    {
      "type": "heading",
      "text": "Commands you will use"
    },
    {
      "type": "code",
      "label": "Read the owner, then change it",
      "code": "ls -l /var/www/html/index.html\nsudo chown www-data /var/www/html/index.html\nsudo chown www-data:www-data /var/www/html/index.html\nsudo chgrp www-data /var/www/html/index.html\nsudo chown -R www-data:www-data /var/www/html"
    },
    {
      "type": "heading",
      "text": "Common mistake"
    },
    {
      "type": "paragraph",
      "text": "chown -R www-data / changes the owner of the whole system, not just the site. Name the directory you mean, such as /var/www/html, and check it with ls -ld before you add -R."
    }
  ],
  questions: [
    {
      "id": "both-fields",
      "type": "multiple-choice",
      "prompt": "Which command makes alex the owner and staff the group of notes.txt?",
      "choices": [
        {
          "id": "both",
          "label": "chown alex:staff notes.txt"
        },
        {
          "id": "owner",
          "label": "chown alex notes.txt"
        },
        {
          "id": "group",
          "label": "chgrp staff notes.txt"
        },
        {
          "id": "mode",
          "label": "chmod alex:staff notes.txt"
        }
      ],
      "correctId": "both",
      "explanation": "chown alex:staff sets the owner and the group. chown alex changes only the owner, and chgrp staff changes only the group. chmod changes mode bits, not ownership."
    },
    {
      "id": "why-sudo",
      "type": "multiple-choice",
      "prompt": "You own report.txt. Why does chown www-data report.txt fail with Operation not permitted?",
      "choices": [
        {
          "id": "root",
          "label": "Only root can give a file to a different user"
        },
        {
          "id": "mode",
          "label": "The file must be mode 777 before chown works"
        },
        {
          "id": "group",
          "label": "chown can change the group, but never the owner"
        },
        {
          "id": "path",
          "label": "chown only works on directories"
        }
      ],
      "correctId": "root",
      "explanation": "A normal user cannot hand a file to another account. sudo chown www-data report.txt runs it as root. The file's mode does not have to be 777."
    },
    {
      "id": "recursive-target",
      "type": "multiple-choice",
      "prompt": "You need every file under /var/www/html owned by www-data:www-data. Which command does that and nothing broader?",
      "choices": [
        {
          "id": "site",
          "label": "sudo chown -R www-data:www-data /var/www/html"
        },
        {
          "id": "root",
          "label": "sudo chown -R www-data:www-data /"
        },
        {
          "id": "one",
          "label": "sudo chown www-data:www-data /var/www/html"
        },
        {
          "id": "chmod",
          "label": "sudo chmod -R 755 /var/www/html"
        }
      ],
      "correctId": "site",
      "explanation": "The -R on /var/www/html changes that directory and its contents. The same -R on / changes the whole machine. Without -R, chown changes the directory itself and leaves the files inside it."
    },
    {
      "id": "read-owner",
      "type": "visual",
      "prompt": "Who is the owner of index.html, and which group is it in?",
      "output": {
        "caption": "ls -l /var/www/html/index.html",
        "lines": [
          "-rw-r--r-- 1 www-data www-data 4096 Nov 20 08:01 index.html"
        ]
      },
      "choices": [
        {
          "id": "both",
          "label": "Owner www-data, group www-data"
        },
        {
          "id": "size",
          "label": "Owner 4096, group index.html"
        },
        {
          "id": "alex",
          "label": "Owner alex, group alex"
        },
        {
          "id": "root",
          "label": "Owner root, group root"
        }
      ],
      "correctId": "both",
      "explanation": "After the link count, ls -l prints the owner and then the group. Both are www-data. 4096 is the size in bytes, not an owner."
    },
    {
      "id": "set-owner",
      "type": "terminal",
      "prompt": "You are in /var/www/html. Make www-data both the owner and the group of index.html. Use one chown command. index.html, ./index.html, or the absolute path is fine. sudo is optional. Do not add -R.",
      "scenario": "alex@web-1:/var/www/html",
      "accepted": [
        "chown www-data:www-data index.html",
        "chown www-data:www-data ./index.html",
        "chown www-data:www-data /var/www/html/index.html",
        "chown www-data.www-data index.html",
        "chown www-data.www-data ./index.html",
        "chown www-data.www-data /var/www/html/index.html",
        "chown www-data: index.html",
        "chown www-data: ./index.html",
        "chown www-data: /var/www/html/index.html"
      ],
      "explanation": "chown www-data:www-data index.html sets both fields. chown www-data index.html changes the owner only, so the group can stay as alex."
    }
  ],
};

const createAndDeleteFiles: Skill = {
  id: `${LINUX}/beginner/create-and-delete-files`,
  slug: "create-and-delete-files",
  pathway: LINUX,
  level: "beginner",
  domain: "fundamentals",
  title: "Create and Delete Files",
  description: "Make, copy, move, and remove files without guessing.",
  minutes: 5,
  placeholder: false,
  teaching: [
    {
      "type": "paragraph",
      "text": "These commands change the filesystem immediately. Linux has no recycle bin for shell deletes. rm unlinks the name, and the data is gone unless another name or a running process still has it open."
    },
    {
      "type": "list",
      "items": [
        "touch notes.txt creates an empty file, or updates the timestamp if the file already exists. It does not empty an existing file",
        "mkdir backups creates one directory. mkdir -p backups/daily creates missing parents and is fine if the directory already exists",
        "cp notes.txt /tmp/notes.txt copies a file. cp -r projects /tmp/projects copies a directory. On Ubuntu, cp -R and cp --recursive are the same as cp -r",
        "mv notes.txt notes.bak renames it. mv notes.txt /tmp/ moves it",
        "rm notes.bak removes a file. rm -r old/ removes a directory tree. rmdir removes a directory only when it is already empty"
      ]
    },
    {
      "type": "heading",
      "text": "Commands you will use"
    },
    {
      "type": "code",
      "label": "Make, copy, rename, remove",
      "code": "touch /home/alex/notes.txt\nmkdir -p /home/alex/backups/daily\ncp notes.txt /tmp/notes.txt\ncp -r projects /tmp/projects\nmv notes.txt notes.bak\nrm notes.bak\nrmdir /tmp/empty\nrm -r /tmp/projects"
    },
    {
      "type": "code",
      "label": "Example",
      "code": "alex@web-1:~$ mkdir -p /home/alex/backups/daily\nalex@web-1:~$ ls -ld /home/alex/backups/daily\ndrwxr-xr-x 2 alex alex 4096 Nov 20 09:20 /home/alex/backups/daily"
    },
    {
      "type": "heading",
      "text": "Common mistake"
    },
    {
      "type": "paragraph",
      "text": "rm -rf does not ask. A space is a second target: rm -rf /home/alex /backups deletes /home/alex and then /backups. The path you meant was /home/alex/backups. Read the command once before you run it, and do not point rm -rf at /."
    }
  ],
  questions: [
    {
      "id": "parents",
      "type": "multiple-choice",
      "prompt": "/home/alex/backups does not exist yet. Which command creates /home/alex/backups/daily?",
      "choices": [
        {
          "id": "parents",
          "label": "mkdir -p /home/alex/backups/daily"
        },
        {
          "id": "plain",
          "label": "mkdir /home/alex/backups/daily"
        },
        {
          "id": "touch",
          "label": "touch /home/alex/backups/daily"
        },
        {
          "id": "rmdir",
          "label": "rmdir /home/alex/backups/daily"
        }
      ],
      "correctId": "parents",
      "explanation": "mkdir -p creates the missing backups parent and then daily. mkdir without -p fails because backups does not exist. touch would create a file, and only after the parent directory already exists."
    },
    {
      "id": "empty-dir",
      "type": "multiple-choice",
      "prompt": "old-logs contains three files. Which command removes the directory and those files?",
      "choices": [
        {
          "id": "recursive",
          "label": "rm -r old-logs"
        },
        {
          "id": "rmdir",
          "label": "rmdir old-logs"
        },
        {
          "id": "rm",
          "label": "rm old-logs"
        },
        {
          "id": "touch",
          "label": "touch old-logs"
        }
      ],
      "correctId": "recursive",
      "explanation": "rm -r deletes the directory and its contents. rmdir refuses a directory that is not empty, and rm without -r refuses a directory. touch does not delete anything."
    },
    {
      "id": "rename",
      "type": "multiple-choice",
      "prompt": "You want the file notes.txt to be named notes.bak in the same directory. Which command does that?",
      "choices": [
        {
          "id": "mv",
          "label": "mv notes.txt notes.bak"
        },
        {
          "id": "cp",
          "label": "cp notes.txt notes.bak"
        },
        {
          "id": "touch",
          "label": "touch notes.bak"
        },
        {
          "id": "rm",
          "label": "rm notes.txt notes.bak"
        }
      ],
      "correctId": "mv",
      "explanation": "mv notes.txt notes.bak renames the file, so only notes.bak remains. cp leaves notes.txt in place as well. touch notes.bak creates an empty second file."
    },
    {
      "id": "directory-mark",
      "type": "visual",
      "prompt": "What did this command create?",
      "output": {
        "caption": "ls -ld /home/alex/backups/daily",
        "lines": [
          "drwxr-xr-x 2 alex alex 4096 Nov 20 09:20 /home/alex/backups/daily"
        ]
      },
      "choices": [
        {
          "id": "dir",
          "label": "A directory named daily"
        },
        {
          "id": "file",
          "label": "An empty file named daily"
        },
        {
          "id": "deleted",
          "label": "A deleted file, because the line starts with d"
        },
        {
          "id": "link",
          "label": "A symlink to /home/alex"
        }
      ],
      "correctId": "dir",
      "explanation": "The leading d is the directory type. A regular file would start with -, and a symlink would start with l. d does not mean deleted."
    },
    {
      "id": "make-daily",
      "type": "terminal",
      "prompt": "Create the directory /home/alex/backups/daily and any missing parents. A trailing slash is fine. Use mkdir. Do not add other options.",
      "scenario": "alex@web-1:~",
      "accepted": [
        "mkdir -p /home/alex/backups/daily",
        "mkdir -p /home/alex/backups/daily/",
        "mkdir --parents /home/alex/backups/daily",
        "mkdir --parents /home/alex/backups/daily/"
      ],
      "explanation": "mkdir -p creates missing parent directories. mkdir /home/alex/backups/daily fails when backups does not exist yet. --parents is the long form of -p."
    }
  ],
};

const findFilesAndDirectories: Skill = {
  id: `${LINUX}/beginner/find-files-and-directories`,
  slug: "find-files-and-directories",
  pathway: LINUX,
  level: "beginner",
  domain: "fundamentals",
  title: "Find Files and Directories",
  description: "Locate a file by name from the directory you are in.",
  minutes: 7,
  placeholder: false,
  teaching: [
    {
      "type": "paragraph",
      "text": "find walks a directory tree and tests each entry. which does not walk a tree. It searches the directories in PATH and prints the first matching program. locate answers from a database, not from the live disk."
    },
    {
      "type": "list",
      "items": [
        "find /home/alex -name notes.txt matches that exact case. -iname ignores case",
        "-type f is a regular file. -type d is a directory",
        "-size +10M is larger than 10 MiB. find rounds a size up to the next mebibyte before it compares. -size -10M is smaller than 10 MiB",
        "-mtime -1 was modified less than 24 hours ago. -mtime +7 was modified more than 7 days ago",
        "which python3 prints the program PATH would run. It will not find a config file",
        "locate notes.txt only knows what the last database update indexed. On Ubuntu, sudo updatedb refreshes the plocate database"
      ]
    },
    {
      "type": "heading",
      "text": "Commands you will use"
    },
    {
      "type": "code",
      "label": "Search by name, type, size, and PATH",
      "code": "find /home/alex -name notes.txt\nfind /home/alex -iname notes.txt\nfind /var/log -type f -name \"*.log\"\nfind /var/log -type d -name nginx\nfind /home/alex -type f -size +10M\nfind /home/alex -type f -mtime -1\nwhich python3"
    },
    {
      "type": "code",
      "label": "Example",
      "code": "alex@web-1:~$ find /home/alex -type f -name notes.txt\n/home/alex/notes.txt\n/home/alex/projects/notes.txt"
    },
    {
      "type": "heading",
      "text": "Common mistake"
    },
    {
      "type": "paragraph",
      "text": "locate notes.txt printing nothing does not prove the file is absent. It proves the database has not seen it. Use find when you need the disk as it is right now. which is the wrong tool for that search too, because it never leaves PATH."
    }
  ],
  questions: [
    {
      "id": "case-name",
      "type": "multiple-choice",
      "prompt": "You need files whose name is exactly notes.txt, not Notes.txt. Which test is right?",
      "choices": [
        {
          "id": "name",
          "label": "find /home/alex -name notes.txt"
        },
        {
          "id": "iname",
          "label": "find /home/alex -iname notes.txt"
        },
        {
          "id": "which",
          "label": "which notes.txt"
        },
        {
          "id": "size",
          "label": "find /home/alex -size notes.txt"
        }
      ],
      "correctId": "name",
      "explanation": "-name is case-sensitive, so Notes.txt does not match. -iname ignores case and would include Notes.txt. which only searches PATH for a program."
    },
    {
      "id": "which-limit",
      "type": "multiple-choice",
      "prompt": "python3 runs, but you want the path of the program that the shell will start. Which command answers that?",
      "choices": [
        {
          "id": "which",
          "label": "which python3"
        },
        {
          "id": "find-name",
          "label": "find / -name python3"
        },
        {
          "id": "locate",
          "label": "locate python3"
        },
        {
          "id": "pwd",
          "label": "pwd"
        }
      ],
      "correctId": "which",
      "explanation": "which searches PATH in order and prints the first match, which is the program the shell starts. find / walks the whole disk and can print a different copy. locate depends on an old database."
    },
    {
      "id": "locate-db",
      "type": "multiple-choice",
      "prompt": "You just created /home/alex/new-report.txt. locate new-report.txt prints nothing. What is the best next check?",
      "choices": [
        {
          "id": "find",
          "label": "find /home/alex -name new-report.txt"
        },
        {
          "id": "missing",
          "label": "The file was not created, because locate is a live search"
        },
        {
          "id": "which",
          "label": "which new-report.txt"
        },
        {
          "id": "pwd",
          "label": "pwd"
        }
      ],
      "correctId": "find",
      "explanation": "locate reads a database and will miss a file created after the last updatedb. find reads the directory now. which only searches PATH, so it will not see a report in your home directory."
    },
    {
      "id": "which-match",
      "type": "visual",
      "prompt": "This output came from find /home/alex -type f -name notes.txt. Which match is inside a subdirectory?",
      "output": {
        "caption": "find /home/alex -type f -name notes.txt",
        "lines": [
          "/home/alex/notes.txt",
          "/home/alex/projects/notes.txt"
        ]
      },
      "choices": [
        {
          "id": "projects",
          "label": "/home/alex/projects/notes.txt"
        },
        {
          "id": "home",
          "label": "/home/alex/notes.txt"
        },
        {
          "id": "both",
          "label": "Both are inside projects"
        },
        {
          "id": "neither",
          "label": "Neither. find only prints directories"
        }
      ],
      "correctId": "projects",
      "explanation": "/home/alex/projects/notes.txt sits under projects. /home/alex/notes.txt is directly in the directory where the search started. -type f is why both lines are regular files."
    },
    {
      "id": "find-notes",
      "type": "terminal",
      "prompt": "You are in /home/alex. Find regular files named exactly notes.txt under the current directory. Case matters. Start at . or at /home/alex. A trailing slash or a ./ start is fine. Quotes around notes.txt are fine. -print is optional. Use only -name and -type as tests. Do not use -iname.",
      "scenario": "alex@web-1:~",
      "accepted": [
        "find . -name notes.txt -type f",
        "find . -type f -name notes.txt",
        "find . -name notes.txt -type f -print",
        "find . -type f -name notes.txt -print",
        "find . -name 'notes.txt' -type f",
        "find . -type f -name 'notes.txt'",
        "find . -name 'notes.txt' -type f -print",
        "find . -type f -name 'notes.txt' -print",
        "find . -name \"notes.txt\" -type f",
        "find . -type f -name \"notes.txt\"",
        "find . -name \"notes.txt\" -type f -print",
        "find . -type f -name \"notes.txt\" -print",
        "find ./ -name notes.txt -type f",
        "find ./ -type f -name notes.txt",
        "find ./ -name notes.txt -type f -print",
        "find ./ -type f -name notes.txt -print",
        "find ./ -name 'notes.txt' -type f",
        "find ./ -type f -name 'notes.txt'",
        "find ./ -name 'notes.txt' -type f -print",
        "find ./ -type f -name 'notes.txt' -print",
        "find ./ -name \"notes.txt\" -type f",
        "find ./ -type f -name \"notes.txt\"",
        "find ./ -name \"notes.txt\" -type f -print",
        "find ./ -type f -name \"notes.txt\" -print",
        "find /home/alex -name notes.txt -type f",
        "find /home/alex -type f -name notes.txt",
        "find /home/alex -name notes.txt -type f -print",
        "find /home/alex -type f -name notes.txt -print",
        "find /home/alex -name 'notes.txt' -type f",
        "find /home/alex -type f -name 'notes.txt'",
        "find /home/alex -name 'notes.txt' -type f -print",
        "find /home/alex -type f -name 'notes.txt' -print",
        "find /home/alex -name \"notes.txt\" -type f",
        "find /home/alex -type f -name \"notes.txt\"",
        "find /home/alex -name \"notes.txt\" -type f -print",
        "find /home/alex -type f -name \"notes.txt\" -print",
        "find /home/alex/ -name notes.txt -type f",
        "find /home/alex/ -type f -name notes.txt",
        "find /home/alex/ -name notes.txt -type f -print",
        "find /home/alex/ -type f -name notes.txt -print",
        "find /home/alex/ -name 'notes.txt' -type f",
        "find /home/alex/ -type f -name 'notes.txt'",
        "find /home/alex/ -name 'notes.txt' -type f -print",
        "find /home/alex/ -type f -name 'notes.txt' -print",
        "find /home/alex/ -name \"notes.txt\" -type f",
        "find /home/alex/ -type f -name \"notes.txt\"",
        "find /home/alex/ -name \"notes.txt\" -type f -print",
        "find /home/alex/ -type f -name \"notes.txt\" -print"
      ],
      "explanation": "find . -name notes.txt -type f walks the current tree and keeps regular files with that exact name. -iname would also match Notes.txt. which notes.txt only searches PATH."
    }
  ],
};

const readAndSearchLogFiles: Skill = {
  id: `${LINUX}/beginner/read-and-search-log-files`,
  slug: "read-and-search-log-files",
  pathway: LINUX,
  level: "beginner",
  domain: "logging-troubleshooting",
  title: "Read and Search Log Files",
  description: "Open a log and jump to the lines that matter.",
  minutes: 8,
  placeholder: false,
  teaching: [
    {
      "type": "paragraph",
      "text": "A log is a text file or a journal stream. Read the smallest piece that can answer the question, then search. On Ubuntu with rsyslog, general system messages go to /var/log/syslog and authentication messages, including SSH and sudo, go to /var/log/auth.log. On RHEL and Fedora the traditional files are /var/log/messages and /var/log/secure. Current Fedora often has no rsyslog, so those files may be missing and the journal is the log."
    },
    {
      "type": "list",
      "items": [
        "cat prints the whole file. less pages it: Space moves forward and q quits",
        "head -n 20 prints the first 20 lines. tail -n 20 prints the last 20 and then exits",
        "tail -f keeps the file open and prints new lines until you press Ctrl-C",
        "grep -i ignores case, -n prints the line number, and -r searches a directory tree",
        "journalctl -u nginx shows that service. --since \"1 hour ago\" limits the window. -f follows the journal"
      ]
    },
    {
      "type": "heading",
      "text": "Commands you will use"
    },
    {
      "type": "code",
      "label": "Read, follow, and search",
      "code": "less /var/log/syslog\nhead -n 20 /var/log/syslog\ntail -n 20 /var/log/syslog\ntail -f /var/log/syslog\ngrep -n \"Failed password\" /var/log/auth.log\ngrep -ri error /var/log/nginx\njournalctl -u nginx --since \"1 hour ago\"\njournalctl -u nginx -f"
    },
    {
      "type": "code",
      "label": "Example",
      "code": "Nov 20 09:14:02 web-1 sshd[2104]: Accepted publickey for alex from 192.168.1.50 port 51322 ssh2\nNov 20 09:15:41 web-1 sshd[2188]: Failed password for root from 203.0.113.10 port 44102 ssh2"
    },
    {
      "type": "heading",
      "text": "Common mistake"
    },
    {
      "type": "paragraph",
      "text": "tail -n 20 prints a snapshot and exits, so a failure that happens next will not appear. tail -f is the command that keeps watching. The other mix-up is the path: an SSH failure on Ubuntu is in auth.log, not syslog, and on RHEL it is in secure, not messages."
    }
  ],
  questions: [
    {
      "id": "follow-log",
      "type": "multiple-choice",
      "prompt": "You want new lines from /var/log/syslog to appear as they are written. Which command does that?",
      "choices": [
        {
          "id": "follow",
          "label": "tail -f /var/log/syslog"
        },
        {
          "id": "last",
          "label": "tail -n 20 /var/log/syslog"
        },
        {
          "id": "head",
          "label": "head -n 20 /var/log/syslog"
        },
        {
          "id": "cat",
          "label": "cat /var/log/syslog"
        }
      ],
      "correctId": "follow",
      "explanation": "tail -f stays open and prints lines as they are appended. tail -n 20 prints the last 20 lines and exits, so anything written afterward is invisible."
    },
    {
      "id": "auth-path",
      "type": "multiple-choice",
      "prompt": "On Ubuntu with rsyslog, where do you look for a failed SSH password?",
      "choices": [
        {
          "id": "auth",
          "label": "/var/log/auth.log"
        },
        {
          "id": "messages",
          "label": "/var/log/messages"
        },
        {
          "id": "secure",
          "label": "/var/log/secure"
        },
        {
          "id": "passwd",
          "label": "/etc/passwd"
        }
      ],
      "correctId": "auth",
      "explanation": "Ubuntu records authentication in /var/log/auth.log. /var/log/secure is the RHEL file for that same kind of event, and /var/log/messages is the RHEL general log, not Ubuntu's SSH log."
    },
    {
      "id": "grep-case",
      "type": "multiple-choice",
      "prompt": "The log contains both Error and error. Which command matches both in /var/log/syslog?",
      "choices": [
        {
          "id": "insensitive",
          "label": "grep -i error /var/log/syslog"
        },
        {
          "id": "sensitive",
          "label": "grep error /var/log/syslog"
        },
        {
          "id": "head",
          "label": "head -n error /var/log/syslog"
        },
        {
          "id": "which",
          "label": "which error"
        }
      ],
      "correctId": "insensitive",
      "explanation": "grep -i ignores case, so Error and error both match. grep error without -i misses the capital Error. which searches PATH for a program and does not read the log."
    },
    {
      "id": "failed-line",
      "type": "visual",
      "prompt": "Which line is a failed SSH login?",
      "output": {
        "caption": "grep sshd /var/log/auth.log",
        "lines": [
          "Nov 20 09:14:02 web-1 sshd[2104]: Accepted publickey for alex from 192.168.1.50 port 51322 ssh2",
          "Nov 20 09:15:41 web-1 sshd[2188]: Failed password for root from 203.0.113.10 port 44102 ssh2",
          "Nov 20 09:16:03 web-1 systemd[1]: Started nginx.service - A high performance web server."
        ]
      },
      "choices": [
        {
          "id": "failed",
          "label": "The Failed password line at 09:15:41"
        },
        {
          "id": "accepted",
          "label": "The Accepted publickey line at 09:14:02"
        },
        {
          "id": "nginx",
          "label": "The Started nginx.service line at 09:16:03"
        },
        {
          "id": "none",
          "label": "None of these lines are about SSH"
        }
      ],
      "correctId": "failed",
      "explanation": "Failed password for root is a rejected SSH login. Accepted publickey is a successful login, not a failure. The nginx line is a service start and is not from sshd."
    },
    {
      "id": "last-twenty",
      "type": "terminal",
      "prompt": "Print the last 20 lines of /var/log/syslog and then exit. Do not follow the file. Options may come before or after the path. Do not add other options.",
      "scenario": "alex@web-1:~",
      "accepted": [
        "tail -n 20 /var/log/syslog",
        "tail -n20 /var/log/syslog",
        "tail --lines=20 /var/log/syslog",
        "tail --lines 20 /var/log/syslog",
        "tail -20 /var/log/syslog",
        "tail /var/log/syslog -n 20",
        "tail /var/log/syslog -n20",
        "tail /var/log/syslog --lines=20",
        "tail /var/log/syslog --lines 20",
        "tail /var/log/syslog -20"
      ],
      "explanation": "tail -n 20 /var/log/syslog prints twenty lines and exits. tail -f would keep running. head -n 20 prints the start of the file, not the latest lines."
    }
  ],
};

const manageLinuxProcesses: Skill = {
  id: `${LINUX}/beginner/manage-linux-processes`,
  slug: "manage-linux-processes",
  pathway: LINUX,
  level: "beginner",
  domain: "processes-services",
  title: "Manage Linux Processes",
  description: "See what is running and stop one process.",
  minutes: 7,
  placeholder: false,
  teaching: [
    {
      "type": "paragraph",
      "text": "A process is a running program with a numeric pid. You stop the pid you identified, not a pid you guessed from a nearby column. On Linux, killall and pkill select by name. killall here does not mean \"stop every process on the machine.\""
    },
    {
      "type": "list",
      "items": [
        "ps aux shows every process. USER, PID, %CPU, %MEM, VSZ, RSS, TTY, STAT, START, TIME, then COMMAND",
        "VSZ is virtual memory. RSS is physical memory. STAT S means sleeping, R means running, and Z means zombie",
        "top refreshes the same kind of view. q quits",
        "pgrep nginx prints matching pids. pgrep -a adds the command line",
        "kill 4821 sends SIGTERM, signal 15. The process can catch it, flush work, and exit",
        "kill -9 4821 sends SIGKILL. It cannot be caught or ignored, so the process gets no cleanup. Use it only after TERM failed",
        "pkill nginx and killall nginx send SIGTERM to processes named nginx"
      ]
    },
    {
      "type": "heading",
      "text": "Commands you will use"
    },
    {
      "type": "code",
      "label": "Identify a pid, then signal it",
      "code": "ps aux\ntop\npgrep -a python3\nkill 4821\nkill -9 4821\npkill nginx\nkillall nginx"
    },
    {
      "type": "code",
      "label": "Example",
      "code": "USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         744  0.0  0.2  15420  5120 ?        Ss   Nov19   0:01 sshd: /usr/sbin/sshd -D\nalex        4821  2.4  1.1 186432 24576 pts/0    S+   09:14   0:02 python3 app.py"
    },
    {
      "type": "heading",
      "text": "Common mistake"
    },
    {
      "type": "paragraph",
      "text": "kill -9 is not the normal stop button. SIGKILL skips cleanup, so files and locks can be left behind. Send SIGTERM first, with kill 4821. Reach for -9 only when that process is still there afterward. Also read the PID column: 24576 in the example is RSS, not the pid."
    }
  ],
  questions: [
    {
      "id": "default-signal",
      "type": "multiple-choice",
      "prompt": "You run kill 4821 and do not name a signal. What is sent?",
      "choices": [
        {
          "id": "term",
          "label": "SIGTERM, signal 15, which the process can catch"
        },
        {
          "id": "kill",
          "label": "SIGKILL, signal 9, which cannot be caught"
        },
        {
          "id": "hup",
          "label": "SIGHUP, signal 1, which reloads the configuration"
        },
        {
          "id": "stop",
          "label": "SIGSTOP, which only pauses the process"
        }
      ],
      "correctId": "term",
      "explanation": "kill with no signal sends SIGTERM. The process can catch it and exit cleanly. SIGKILL is kill -9, a different command, and it cannot be caught."
    },
    {
      "id": "why-not-nine",
      "type": "multiple-choice",
      "prompt": "python3 app.py ignored nothing. It is just slow to exit. Why is kill 4821 the better first command than kill -9 4821?",
      "choices": [
        {
          "id": "cleanup",
          "label": "SIGTERM lets the process flush work and exit. SIGKILL cannot be handled"
        },
        {
          "id": "stronger",
          "label": "SIGTERM is stronger than SIGKILL and always works instantly"
        },
        {
          "id": "name",
          "label": "kill -9 selects the process by name instead of pid"
        },
        {
          "id": "root",
          "label": "kill -9 can only be run by the owner of pid 1"
        }
      ],
      "correctId": "cleanup",
      "explanation": "SIGTERM can be caught, so the program can close files and exit. SIGKILL cannot be caught or ignored, so it is the last resort after TERM did not work, not the first try."
    },
    {
      "id": "by-name",
      "type": "multiple-choice",
      "prompt": "Several worker processes are named nginx. You want SIGTERM sent to each of them. Which command does that?",
      "choices": [
        {
          "id": "pkill",
          "label": "pkill nginx"
        },
        {
          "id": "one",
          "label": "kill 912"
        },
        {
          "id": "nine",
          "label": "kill -9 nginx"
        },
        {
          "id": "ps",
          "label": "ps aux nginx"
        }
      ],
      "correctId": "pkill",
      "explanation": "pkill nginx matches the name and sends SIGTERM to each match. kill 912 signals only that one pid. kill -9 nginx is the wrong shape: -9 is a signal, and kill expects a pid, not a name."
    },
    {
      "id": "read-pid",
      "type": "visual",
      "prompt": "Which pid is the python3 app.py process?",
      "output": {
        "caption": "ps aux",
        "lines": [
          "USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND",
          "root         744  0.0  0.2  15420  5120 ?        Ss   Nov19   0:01 sshd: /usr/sbin/sshd -D",
          "alex        4821  2.4  1.1 186432 24576 pts/0    S+   09:14   0:02 python3 app.py"
        ]
      },
      "choices": [
        {
          "id": "app",
          "label": "4821"
        },
        {
          "id": "rss",
          "label": "24576"
        },
        {
          "id": "sshd",
          "label": "744"
        },
        {
          "id": "vsz",
          "label": "186432"
        }
      ],
      "correctId": "app",
      "explanation": "4821 is the PID on the python3 app.py row. 24576 is RSS and 186432 is VSZ, both memory sizes. 744 is sshd, a different process."
    },
    {
      "id": "stop-app",
      "type": "terminal",
      "prompt": "Stop pid 4821, the python3 app, with SIGTERM. Do not use SIGKILL. kill with no signal, -15, -TERM, or -SIGTERM is fine, including the long signal option. Any letter case for the signal name is fine.",
      "scenario": "alex@web-1:~",
      "accepted": [
        "kill 4821",
        "kill -15 4821",
        "kill -TERM 4821",
        "kill -SIGTERM 4821",
        "kill -term 4821",
        "kill -sigterm 4821",
        "kill -s 15 4821",
        "kill -s TERM 4821",
        "kill -s SIGTERM 4821",
        "kill -s term 4821",
        "kill -s sigterm 4821",
        "kill -n 15 4821",
        "kill --signal 15 4821",
        "kill --signal TERM 4821",
        "kill --signal SIGTERM 4821",
        "kill --signal term 4821",
        "kill --signal sigterm 4821",
        "kill --signal=15 4821",
        "kill --signal=TERM 4821",
        "kill --signal=SIGTERM 4821",
        "kill --signal=term 4821",
        "kill --signal=sigterm 4821"
      ],
      "explanation": "kill 4821 sends SIGTERM, the default. kill -9 4821 is SIGKILL and skips cleanup. 24576 is a memory column from ps, not the pid."
    }
  ],
};

const startStopAndRestartServices: Skill = {
  id: `${LINUX}/beginner/start-stop-and-restart-services`,
  slug: "start-stop-and-restart-services",
  pathway: LINUX,
  level: "beginner",
  domain: "processes-services",
  title: "Start, Stop, and Restart Services",
  description: "Control a service without rebooting the machine.",
  minutes: 6,
  placeholder: false,
  teaching: [
    {
      "type": "paragraph",
      "text": "systemctl talks to systemd. A unit can be running now, set to start at boot, both, or neither. Those are two different switches. nginx.service and nginx are the same unit."
    },
    {
      "type": "list",
      "items": [
        "start, stop, and restart change the current process. restart stops it and starts it again, which drops current connections",
        "reload asks the running process to reread its configuration. It fails if the unit has no ExecReload. nginx supports reload",
        "enable and disable change the next boot only. enable does not start the service. disable does not stop it",
        "enable --now enables boot start and starts the service in one command. disable --now disables boot start and stops it",
        "is-active nginx prints a one-word state, usually active or inactive. It can also print failed. status shows the current state and whether the unit is enabled"
      ]
    },
    {
      "type": "heading",
      "text": "Commands you will use"
    },
    {
      "type": "code",
      "label": "Now, versus the next boot",
      "code": "systemctl status nginx\nsystemctl start nginx\nsystemctl stop nginx\nsystemctl restart nginx\nsystemctl reload nginx\nsystemctl enable nginx\nsystemctl enable --now nginx\nsystemctl disable nginx\nsystemctl is-active nginx"
    },
    {
      "type": "code",
      "label": "Example",
      "code": "● nginx.service - A high performance web server and a reverse proxy server\n     Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; preset: enabled)\n     Active: active (running) since Thu 2026-11-20 09:01:12 UTC; 14min ago\n   Main PID: 912 (nginx)"
    },
    {
      "type": "heading",
      "text": "Common mistake"
    },
    {
      "type": "paragraph",
      "text": "systemctl enable nginx does not start nginx today, and systemctl start nginx does not start it again after a reboot. If you need both, use systemctl enable --now nginx. restart is also the wrong tool for a config change you wanted nginx to apply in place: use reload when the unit supports it."
    }
  ],
  questions: [
    {
      "id": "boot-only",
      "type": "multiple-choice",
      "prompt": "nginx is already running. You want it to start on the next boot, and you do not want to interrupt it now. Which command?",
      "choices": [
        {
          "id": "enable",
          "label": "systemctl enable nginx"
        },
        {
          "id": "start",
          "label": "systemctl start nginx"
        },
        {
          "id": "restart",
          "label": "systemctl restart nginx"
        },
        {
          "id": "disable",
          "label": "systemctl disable nginx"
        }
      ],
      "correctId": "enable",
      "explanation": "enable only adds the boot start. It leaves the running process alone. start does not change boot behavior, and restart drops current connections."
    },
    {
      "id": "reload-vs-restart",
      "type": "multiple-choice",
      "prompt": "You edited nginx.conf. The nginx unit has ExecReload, and you want it to reread the file without dropping open connections. Which command?",
      "choices": [
        {
          "id": "reload",
          "label": "systemctl reload nginx"
        },
        {
          "id": "restart",
          "label": "systemctl restart nginx"
        },
        {
          "id": "enable",
          "label": "systemctl enable nginx"
        },
        {
          "id": "active",
          "label": "systemctl is-active nginx"
        }
      ],
      "correctId": "reload",
      "explanation": "reload asks nginx to reread its configuration in place. restart stops the process and starts it again, which drops current connections. enable only affects the next boot."
    },
    {
      "id": "enable-now",
      "type": "multiple-choice",
      "prompt": "nginx is stopped and is not enabled. Which one command starts it now and starts it on the next boot?",
      "choices": [
        {
          "id": "both",
          "label": "systemctl enable --now nginx"
        },
        {
          "id": "enable",
          "label": "systemctl enable nginx"
        },
        {
          "id": "start",
          "label": "systemctl start nginx"
        },
        {
          "id": "reload",
          "label": "systemctl reload nginx"
        }
      ],
      "correctId": "both",
      "explanation": "enable --now enables the boot start and starts the service. enable alone leaves it stopped. start alone leaves it disabled, so a reboot will not bring it back."
    },
    {
      "id": "read-status",
      "type": "visual",
      "prompt": "After a reboot, will systemd start this nginx unit?",
      "output": {
        "caption": "systemctl status nginx",
        "lines": [
          "● nginx.service - A high performance web server and a reverse proxy server",
          "     Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; preset: enabled)",
          "     Active: active (running) since Thu 2026-11-20 09:01:12 UTC; 14min ago",
          "   Main PID: 912 (nginx)"
        ]
      },
      "choices": [
        {
          "id": "yes",
          "label": "Yes. The unit is enabled"
        },
        {
          "id": "active",
          "label": "No. Active only describes this boot, and enabled is unrelated"
        },
        {
          "id": "pid",
          "label": "No. A Main PID means it will not start again"
        },
        {
          "id": "reload",
          "label": "Only if someone runs reload after the reboot"
        }
      ],
      "correctId": "yes",
      "explanation": "enabled in the Loaded line is the boot setting, so systemd will start nginx on the next boot. Active: active (running) only says it is running now. Those are separate facts, and this unit has both."
    },
    {
      "id": "restart-nginx",
      "type": "terminal",
      "prompt": "Restart the nginx service now. Use systemctl. nginx and nginx.service are both fine. Do not enable, disable, reload, or stop it.",
      "scenario": "alex@web-1:~",
      "accepted": [
        "systemctl restart nginx",
        "systemctl restart nginx.service"
      ],
      "explanation": "systemctl restart nginx stops the service and starts it again. nginx.service is the same unit. reload would keep the process and only reread the configuration, which is not a restart."
    }
  ],
};

const checkDiskAndMemoryUsage: Skill = {
  id: `${LINUX}/beginner/check-disk-and-memory-usage`,
  slug: "check-disk-and-memory-usage",
  pathway: LINUX,
  level: "beginner",
  domain: "performance",
  title: "Check Disk and Memory Usage",
  description: "See which filesystem is full and what is using memory.",
  minutes: 6,
  placeholder: false,
  teaching: [
    {
      "type": "paragraph",
      "text": "df and du answer different questions. df reports a mounted filesystem: its size, how much is used, and how much is still available. du reports one directory tree. free reports memory. A big number in the wrong column sends you to the wrong fix."
    },
    {
      "type": "list",
      "items": [
        "df -h prints every normal filesystem in human units. --human-readable is the same option. -H uses powers of 1000 and is not the same",
        "du -sh /var/log prints one total for that directory. du -h -d 1 /var prints each immediate child. --max-depth=1 is the long form of -d",
        "sort -h sorts those human sizes, so du -h -d 1 /var | sort -h puts the largest directories last",
        "free -h: free is unused RAM. available is the estimate of memory new programs can have without swapping, including cache the kernel can drop",
        "A file deleted with rm still occupies space in df until every process that has it open closes it. du will not see that file anymore"
      ]
    },
    {
      "type": "heading",
      "text": "Commands you will use"
    },
    {
      "type": "code",
      "label": "Filesystem, directory, then memory",
      "code": "df -h\ndu -sh /var/log\ndu -h -d 1 /var | sort -h\nfree -h"
    },
    {
      "type": "code",
      "label": "Example",
      "code": "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda2        40G   28G   10G  74% /\n/dev/sdb1       100G   92G  2.8G  97% /var\ntmpfs           1.9G  1.2M  1.9G   1% /run"
    },
    {
      "type": "heading",
      "text": "Common mistake"
    },
    {
      "type": "paragraph",
      "text": "A small free column in free -h does not mean the machine is out of memory. The kernel uses spare RAM as cache and can give it back. Read available. In the example below, free is 200Mi and available is still 2.1Gi."
    },
    {
      "type": "code",
      "label": "Example",
      "code": "               total        used        free      shared  buff/cache   available\nMem:           3.8Gi       1.4Gi       200Mi        48Mi       2.2Gi       2.1Gi\nSwap:          2.0Gi          0B       2.0Gi"
    }
  ],
  questions: [
    {
      "id": "directory-size",
      "type": "multiple-choice",
      "prompt": "/var is a separate filesystem and you want the size of the /var/log directory itself. Which command answers that?",
      "choices": [
        {
          "id": "du",
          "label": "du -sh /var/log"
        },
        {
          "id": "df",
          "label": "df -h /var/log"
        },
        {
          "id": "free",
          "label": "free -h"
        },
        {
          "id": "pwd",
          "label": "pwd"
        }
      ],
      "correctId": "du",
      "explanation": "du -sh adds up the directory tree. df -h /var/log shows the whole /var filesystem, including everything else on that disk, not the log directory alone."
    },
    {
      "id": "deleted-open",
      "type": "multiple-choice",
      "prompt": "You deleted a 20G log, du -sh /var dropped, and df -h still shows /var almost full. What is the usual cause?",
      "choices": [
        {
          "id": "open",
          "label": "A process still has the deleted file open"
        },
        {
          "id": "swapped",
          "label": "df counts directories and du counts filesystems, so this is the normal way they read"
        },
        {
          "id": "cache",
          "label": "The space moved into the free column of free -h"
        },
        {
          "id": "tmp",
          "label": "rm moved the file to /tmp"
        }
      ],
      "correctId": "open",
      "explanation": "df counts blocks still held open by a process. du only sees names in the directory, so the deleted file disappears from du and remains in df until the process exits or closes it. df is the filesystem tool, not the directory tool."
    },
    {
      "id": "full-mount",
      "type": "visual",
      "prompt": "Which filesystem is nearly full?",
      "output": {
        "caption": "df -h",
        "lines": [
          "Filesystem      Size  Used Avail Use% Mounted on",
          "/dev/sda2        40G   28G   10G  74% /",
          "/dev/sdb1       100G   92G  2.8G  97% /var",
          "tmpfs           1.9G  1.2M  1.9G   1% /run"
        ]
      },
      "choices": [
        {
          "id": "var",
          "label": "/var, at 97% with 2.8G available"
        },
        {
          "id": "root",
          "label": "/, because 28G used is a large number"
        },
        {
          "id": "run",
          "label": "/run, because tmpfs is always the first place to clean"
        },
        {
          "id": "none",
          "label": "None. Available space is the Size column"
        }
      ],
      "correctId": "var",
      "explanation": "/var is 97% full and has 2.8G left. The root filesystem is 74% full with 10G free, so the bigger used number is not the filesystem about to fill up. Size is the capacity, not the free space."
    },
    {
      "id": "available-memory",
      "type": "visual",
      "prompt": "About how much RAM can new programs use before the system needs to swap?",
      "output": {
        "caption": "free -h",
        "lines": [
          "               total        used        free      shared  buff/cache   available",
          "Mem:           3.8Gi       1.4Gi       200Mi        48Mi       2.2Gi       2.1Gi",
          "Swap:          2.0Gi          0B       2.0Gi"
        ]
      },
      "choices": [
        {
          "id": "available",
          "label": "2.1Gi, the available column"
        },
        {
          "id": "free",
          "label": "200Mi, the free column"
        },
        {
          "id": "total",
          "label": "3.8Gi, the total column"
        },
        {
          "id": "swap",
          "label": "2.0Gi of swap, because RAM is full"
        }
      ],
      "correctId": "available",
      "explanation": "available estimates memory that can be given to new programs without swapping, including cache the kernel can drop. free is only unused RAM, so 200Mi makes the machine look tighter than it is. Swap is unused here."
    },
    {
      "id": "show-filesystems",
      "type": "terminal",
      "prompt": "Show every normal mounted filesystem with human-readable sizes based on 1024. Do not limit the output to one path, and do not use the 1000-based -H form.",
      "scenario": "alex@web-1:~",
      "accepted": [
        "df -h",
        "df --human-readable"
      ],
      "explanation": "df -h is the human-readable filesystem summary. du -sh reports one directory, not the mounted filesystems. df -H uses powers of 1000, so the numbers are not the -h numbers."
    }
  ],
};

const manageUsersAndGroups: Skill = {
  id: `${LINUX}/beginner/manage-users-and-groups`,
  slug: "manage-users-and-groups",
  pathway: LINUX,
  level: "beginner",
  domain: "users-permissions",
  title: "Manage Users and Groups",
  description: "Add a user and place that user in a group.",
  minutes: 8,
  placeholder: false,
  teaching: [
    {
      "type": "paragraph",
      "text": "An account has a uid, a primary group, a home directory, a login shell, and a list of supplementary groups. useradd is the low-level command on Ubuntu and on RHEL. On Debian and Ubuntu, adduser is the interactive wrapper: it prompts for a password and GECOS details and then calls useradd. RHEL does not ship that adduser. Use useradd there."
    },
    {
      "type": "list",
      "items": [
        "useradd -m -s /bin/bash jamie creates jamie, a home at /home/jamie, and a bash login shell. -m is --create-home. -s is --shell. Ubuntu and current RHEL set CREATE_HOME yes, so useradd may create a home even without -m. Pass -m anyway so the home does not depend on that default",
        "The new account has no password until passwd jamie. Until then the password is locked",
        "usermod -aG sudo jamie appends sudo to the supplementary groups. -a means append. -G without -a replaces the supplementary list",
        "id jamie prints the uid, primary gid, and groups. groups jamie prints the group names",
        "userdel jamie removes the account and leaves /home/jamie. userdel -r jamie also removes the home directory and mail spool",
        "/etc/passwd stores the account. The second field is x, and the password hash is in /etc/shadow. /etc/group stores group names, gids, and supplementary members"
      ]
    },
    {
      "type": "heading",
      "text": "Commands you will use"
    },
    {
      "type": "code",
      "label": "Add, password, group, check, remove",
      "code": "sudo useradd -m -s /bin/bash jamie\nsudo adduser jamie\nsudo passwd jamie\nsudo usermod -aG sudo jamie\nid jamie\ngroups jamie\nsudo userdel -r jamie"
    },
    {
      "type": "code",
      "label": "Example",
      "code": "uid=1001(jamie) gid=1001(jamie) groups=1001(jamie),27(sudo)\njamie:x:1001:1001:Jamie:/home/jamie:/bin/bash"
    },
    {
      "type": "heading",
      "text": "Common mistake"
    },
    {
      "type": "paragraph",
      "text": "usermod -G sudo jamie looks almost right and is the destructive version. Without -a, -G sets the supplementary groups to only sudo and removes every other supplementary group the account had. The command that adds a group is usermod -aG sudo jamie."
    }
  ],
  questions: [
    {
      "id": "create-user",
      "type": "multiple-choice",
      "prompt": "What does useradd -m -s /bin/bash jamie do?",
      "choices": [
        {
          "id": "useradd",
          "label": "Creates jamie, with home /home/jamie and shell /bin/bash. It does not set a password"
        },
        {
          "id": "password",
          "label": "Creates jamie and sets the password to bash"
        },
        {
          "id": "passwd",
          "label": "Only changes the password of an existing user jamie"
        },
        {
          "id": "group",
          "label": "Adds the existing user jamie to the sudo group"
        }
      ],
      "correctId": "useradd",
      "explanation": "-m creates the home directory and -s /bin/bash sets the login shell. The word bash is the shell path, not a password. passwd jamie is the separate command that sets a password, and usermod -aG sudo jamie only changes groups."
    },
    {
      "id": "append-group",
      "type": "multiple-choice",
      "prompt": "jamie already has staff as a supplementary group. You need to add sudo without removing staff. Which command?",
      "choices": [
        {
          "id": "append",
          "label": "usermod -aG sudo jamie"
        },
        {
          "id": "replace",
          "label": "usermod -G sudo jamie"
        },
        {
          "id": "passwd",
          "label": "passwd sudo jamie"
        },
        {
          "id": "useradd",
          "label": "useradd -aG sudo jamie"
        }
      ],
      "correctId": "append",
      "explanation": "-aG appends sudo to the supplementary groups. -G without -a replaces that list with only sudo, so staff is removed. useradd creates an account and is the wrong command here."
    },
    {
      "id": "password-field",
      "type": "multiple-choice",
      "prompt": "jamie's /etc/passwd line contains jamie:x:1001:1001:Jamie:/home/jamie:/bin/bash. What is the x?",
      "choices": [
        {
          "id": "shadow",
          "label": "A placeholder. The password hash is in /etc/shadow"
        },
        {
          "id": "password",
          "label": "The password. jamie signs in by typing x"
        },
        {
          "id": "shell",
          "label": "The login shell"
        },
        {
          "id": "home",
          "label": "The home directory"
        }
      ],
      "correctId": "shadow",
      "explanation": "x means the hash is stored in /etc/shadow, not in the passwd file. The login shell is the last field, /bin/bash, and the home directory is /home/jamie."
    },
    {
      "id": "read-id",
      "type": "visual",
      "prompt": "Which supplementary group does jamie belong to, besides the primary group?",
      "output": {
        "caption": "id jamie",
        "lines": [
          "uid=1001(jamie) gid=1001(jamie) groups=1001(jamie),27(sudo)"
        ]
      },
      "choices": [
        {
          "id": "sudo",
          "label": "sudo"
        },
        {
          "id": "primary",
          "label": "jamie, because it appears in the groups list"
        },
        {
          "id": "uid",
          "label": "1001, the uid, is the supplementary group"
        },
        {
          "id": "none",
          "label": "None. id only prints the primary group"
        }
      ],
      "correctId": "sudo",
      "explanation": "gid=1001(jamie) is the primary group. The groups list repeats that primary group and then adds 27(sudo). sudo is the supplementary group. The uid is the user id, not a group membership."
    },
    {
      "id": "add-jamie",
      "type": "terminal",
      "prompt": "Create the user jamie with a home directory and /bin/bash as the login shell. Use useradd, not adduser, and include -m or --create-home explicitly. Short or long options are fine, in either order. Do not set a password in this command.",
      "scenario": "alex@web-1:~",
      "accepted": [
        "useradd -ms /bin/bash jamie",
        "useradd -m -s /bin/bash jamie",
        "useradd -s /bin/bash -m jamie",
        "useradd -m -s/bin/bash jamie",
        "useradd -s/bin/bash -m jamie",
        "useradd -m --shell /bin/bash jamie",
        "useradd --shell /bin/bash -m jamie",
        "useradd -m --shell=/bin/bash jamie",
        "useradd --shell=/bin/bash -m jamie",
        "useradd --create-home -s /bin/bash jamie",
        "useradd -s /bin/bash --create-home jamie",
        "useradd --create-home -s/bin/bash jamie",
        "useradd -s/bin/bash --create-home jamie",
        "useradd --create-home --shell /bin/bash jamie",
        "useradd --shell /bin/bash --create-home jamie",
        "useradd --create-home --shell=/bin/bash jamie",
        "useradd --shell=/bin/bash --create-home jamie"
      ],
      "explanation": "useradd -m -s /bin/bash jamie creates the account, the home directory, and the shell. Without -m the home directory is not created. adduser would prompt, and passwd is a second step."
    }
  ],
};

const understandLinuxNetworkingCommands: Skill = {
  id: `${LINUX}/beginner/understand-linux-networking-commands`,
  slug: "understand-linux-networking-commands",
  pathway: LINUX,
  level: "beginner",
  domain: "networking",
  title: "Understand Linux Networking Commands",
  description: "Check an address, a route, and an open connection.",
  minutes: 7,
  placeholder: false,
  teaching: [
    {
      "type": "paragraph",
      "text": "Start with the address, then the route, then who is listening. ifconfig and netstat are the old net-tools commands. Current Ubuntu does not install them by default. Use ip and ss."
    },
    {
      "type": "list",
      "items": [
        "ip a, ip addr, and ip address show the addresses on each interface. ip route shows the routing table. The default via line is the gateway",
        "ping -c 4 192.168.1.1 sends four probes and stops. Without -c, ping runs until you press Ctrl-C",
        "ss -tulpn: -t TCP, -u UDP, -l listening sockets, -p the process, -n numeric ports and addresses",
        "A LISTEN row is a service waiting for connections. An ESTAB row is a connection that already exists",
        "curl -I https://example.com prints response headers and does not save the body. curl -i prints headers and the body",
        "dig example.com and nslookup example.com ask DNS. /etc/resolv.conf lists the DNS servers. On Ubuntu it often contains 127.0.0.53, the local systemd-resolved stub, not the upstream resolver"
      ]
    },
    {
      "type": "heading",
      "text": "Commands you will use"
    },
    {
      "type": "code",
      "label": "Address, route, listener, name",
      "code": "ip a\nip route\nping -c 4 192.168.1.1\nss -tulpn\ncurl -I https://example.com\ndig example.com\nnslookup example.com"
    },
    {
      "type": "code",
      "label": "Example",
      "code": "2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000\n    inet 192.168.1.40/24 brd 192.168.1.255 scope global eth0\ndefault via 192.168.1.1 dev eth0 proto dhcp src 192.168.1.40 metric 100"
    },
    {
      "type": "heading",
      "text": "Common mistake"
    },
    {
      "type": "paragraph",
      "text": "An ESTAB row in ss is not a second service. It is one existing connection, often your own SSH session. The listeners are the LISTEN rows. The other trap is ping 192.168.1.1 with no -c: on Linux it does not stop after a few replies."
    }
  ],
  questions: [
    {
      "id": "current-address",
      "type": "multiple-choice",
      "prompt": "On a current Ubuntu server, which installed command shows interface addresses?",
      "choices": [
        {
          "id": "ip",
          "label": "ip a"
        },
        {
          "id": "ifconfig",
          "label": "ifconfig"
        },
        {
          "id": "netstat",
          "label": "netstat -i"
        },
        {
          "id": "dig",
          "label": "dig"
        }
      ],
      "correctId": "ip",
      "explanation": "ip a is the current command and is installed with iproute2. ifconfig and netstat come from the legacy net-tools package, which is not installed by default. dig asks DNS and does not list local interface addresses."
    },
    {
      "id": "headers-only",
      "type": "multiple-choice",
      "prompt": "You want only the HTTP response headers from https://example.com. Which command?",
      "choices": [
        {
          "id": "head",
          "label": "curl -I https://example.com"
        },
        {
          "id": "include",
          "label": "curl -i https://example.com"
        },
        {
          "id": "body",
          "label": "curl https://example.com"
        },
        {
          "id": "ping",
          "label": "ping -c 4 https://example.com"
        }
      ],
      "correctId": "head",
      "explanation": "curl -I sends a HEAD request and prints the headers. curl -i prints the headers and then the body. ping does not speak HTTP."
    },
    {
      "id": "resolv",
      "type": "multiple-choice",
      "prompt": "Which file lists the DNS servers this host should query?",
      "choices": [
        {
          "id": "resolv",
          "label": "/etc/resolv.conf"
        },
        {
          "id": "hosts",
          "label": "/etc/hosts"
        },
        {
          "id": "passwd",
          "label": "/etc/passwd"
        },
        {
          "id": "group",
          "label": "/etc/group"
        }
      ],
      "correctId": "resolv",
      "explanation": "/etc/resolv.conf lists nameserver addresses. /etc/hosts is a static list of names for this machine, not the list of DNS servers. On Ubuntu the nameserver in resolv.conf is often 127.0.0.53."
    },
    {
      "id": "listen-port",
      "type": "visual",
      "prompt": "Which port is nginx listening on?",
      "output": {
        "caption": "ss -tulpn",
        "lines": [
          "Netid State  Recv-Q Send-Q Local Address:Port Peer Address:PortProcess",
          "tcp   LISTEN 0      128        0.0.0.0:22        0.0.0.0:*    users:((\"sshd\",pid=744,fd=3))",
          "tcp   LISTEN 0      511        0.0.0.0:80        0.0.0.0:*    users:((\"nginx\",pid=912,fd=6))",
          "tcp   ESTAB  0      0      192.168.1.40:22    192.168.1.50:51322 users:((\"sshd\",pid=2104,fd=4))"
        ]
      },
      "choices": [
        {
          "id": "http",
          "label": "80, the LISTEN row for nginx"
        },
        {
          "id": "ssh",
          "label": "22, because it appears twice"
        },
        {
          "id": "client",
          "label": "51322, the port on the ESTAB row"
        },
        {
          "id": "pid",
          "label": "912, the nginx pid"
        }
      ],
      "correctId": "http",
      "explanation": "The nginx LISTEN row is bound to port 80. Port 22 is sshd. 51322 is the remote end of an established SSH connection, not a listening nginx port. 912 is the pid."
    },
    {
      "id": "show-addresses",
      "type": "terminal",
      "prompt": "Show the addresses configured on the interfaces. Use ip. The address object may be written as a, addr, or address. The show subcommand may be omitted, written as show, or abbreviated as s. Do not limit the output to one interface or one address family.",
      "scenario": "alex@web-1:~",
      "accepted": [
        "ip a",
        "ip addr",
        "ip address",
        "ip a show",
        "ip addr show",
        "ip address show",
        "ip a s",
        "ip addr s",
        "ip address s"
      ],
      "explanation": "ip a lists addresses on every interface. ifconfig is the legacy command and is often not installed. ip -4 a would hide IPv6, which this task did not ask for."
    }
  ],
};
const whatIsLinuxAndTheShell: Skill = {
  id: `${LINUX}/beginner/what-is-linux-and-the-shell`,
  slug: "what-is-linux-and-the-shell",
  pathway: LINUX,
  level: "beginner",
  domain: "fundamentals",
  title: "What Linux and the Shell Are",
  description: "Tell the kernel, the shell, and the prompt apart.",
  minutes: 5,
  placeholder: false,
  teaching: [
    {
      type: "paragraph",
      text: "Linux is the kernel: the program that manages the CPU, memory, disks, and processes. Ubuntu is a distribution. It packages that kernel with a shell, tools, and an installer. Debian, Fedora, and RHEL are other distributions. They share the kernel and differ in packages and defaults.",
    },
    {
      type: "list",
      items: [
        "The terminal is the window that shows text. The shell is the program behind it that reads each line and runs it. On Ubuntu the default shell is bash",
        "A prompt looks like user@host:path$ . alex@web-1:~$ means user alex, host web-1, and ~ for alex's home. The $ means a normal user",
        "A prompt that ends in # is a root shell. The # is not a comment and it does not mean the current directory is /root",
        "A command line is a command, then options, then arguments. In ls -l /etc, ls is the command, -l is an option, and /etc is the argument",
        "man ls opens the manual page. Press q to leave it. ls --help prints a short usage summary and returns you to the prompt",
      ],
    },
    {
      type: "heading",
      text: "Commands you will use",
    },
    {
      type: "code",
      label: "Read the manual, then a short summary",
      code: "man ls\nls --help",
    },
    {
      type: "code",
      label: "Example",
      code: "alex@web-1:~$ man ls\nalex@web-1:~$ ls --help\nUsage: ls [OPTION]... [FILE]...",
    },
    {
      type: "heading",
      text: "Common mistake",
    },
    {
      type: "paragraph",
      text: "Typing ls with no path is not an error, and it is not a search of the whole disk. The shell runs ls, and ls uses the current directory when you give it no argument. man ls explains that. The prompt's path, not the command name, tells you where you are.",
    },
  ],
  questions: [
    {
      id: "kernel-or-distro",
      type: "multiple-choice",
      prompt: "Which statement matches Ubuntu and Linux?",
      choices: [
        { id: "distro", label: "Linux is the kernel. Ubuntu is a distribution that includes it" },
        { id: "kernel", label: "Ubuntu is the kernel. Linux is a distribution" },
        { id: "same", label: "Ubuntu and Linux are two names for the same program" },
        { id: "shell", label: "Linux is the shell. Ubuntu is the terminal window" },
      ],
      correctId: "distro",
      explanation:
        "Linux names the kernel. Ubuntu is a distribution: that kernel plus the userspace and the package set. Calling Ubuntu the kernel swaps the two.",
    },
    {
      id: "shell-reads",
      type: "multiple-choice",
      prompt: "You type a line and press Enter. Which program reads that line and runs the command?",
      choices: [
        { id: "shell", label: "The shell" },
        { id: "terminal", label: "The terminal window" },
        { id: "kernel", label: "The kernel, with no shell involved" },
        { id: "man", label: "man" },
      ],
      correctId: "shell",
      explanation:
        "The shell, bash on Ubuntu, reads the line, finds the program, and starts it. The terminal only displays text and sends keystrokes to the shell. man is a manual reader, not the program that runs every command.",
    },
    {
      id: "argument",
      type: "multiple-choice",
      prompt: "In the command ls -l /etc, which word is the argument?",
      choices: [
        { id: "path", label: "/etc" },
        { id: "option", label: "-l" },
        { id: "command", label: "ls" },
        { id: "prompt", label: "The $ at the end of the prompt" },
      ],
      correctId: "path",
      explanation:
        "/etc is the argument: the file or directory the command acts on. -l is an option that changes how ls prints. ls is the command. The $ is part of the prompt, not part of the command.",
    },
    {
      id: "root-prompt",
      type: "visual",
      prompt: "Which statement matches this prompt?",
      output: {
        caption: "The prompt on web-1",
        lines: ["root@web-1:/var/log#"],
      },
      choices: [
        { id: "root-var", label: "User root, current directory /var/log, root shell" },
        { id: "root-home", label: "User root, current directory /root" },
        { id: "alex", label: "User alex, current directory /var/log" },
        { id: "failed", label: "The # means the previous command failed" },
      ],
      correctId: "root-var",
      explanation:
        "The prompt is user@host:path, then #. The user is root, the path is /var/log, and # marks a root shell. # does not mean the directory is /root, and it is not an exit status.",
    },
    {
      id: "open-man",
      type: "terminal",
      prompt:
        "Open the manual page for ls. Use man. man ls, man with section 1, and man ls.1 are fine. -- before the page name is fine. Do not add other options and do not quote ls.",
      scenario: "alex@web-1:~",
      accepted: ["man ls", "man 1 ls", "man ls.1", "man -- ls", "man 1 -- ls"],
      explanation:
        "man ls opens the ls manual. man 1 ls and man ls.1 ask for section 1, which is the user command. ls --help only prints a short summary, and it is a different command.",
    },
  ],
};

const redirectOutputAndErrors: Skill = {
  id: `${LINUX}/intermediate/redirect-output-and-errors`,
  slug: "redirect-output-and-errors",
  pathway: LINUX,
  level: "beginner",
  domain: "fundamentals",
  title: "Redirect Output and Errors",
  description: "Send command output and errors to a file or another command.",
  minutes: 8,
  placeholder: false,
  teaching: [
    {
      type: "paragraph",
      text: "A command has two output streams. Standard output is the normal result. Standard error is the failure text. A pipe or a redirection decides where each stream goes. The shell sets that up before the command runs.",
    },
    {
      type: "list",
      items: [
        "| sends standard output of the left command into the standard input of the right command. sort names.txt | uniq is one pipeline",
        "> file replaces the file with standard output. >> file adds to the end. Both leave standard error on the terminal",
        "2> file sends standard error to that file and leaves standard output alone. > file 2>&1 sends both to the file. The 2>&1 has to come after > file",
        "&> file is bash for both streams. Ubuntu's interactive shell is bash. A script that starts with #!/bin/sh is dash, which does not accept &>",
        "> /dev/null discards standard output. > /dev/null 2>&1 discards both. 2> /dev/null discards only the error",
        "wc -l counts lines. sort orders lines. uniq removes adjacent duplicates, so sort has to come before uniq",
      ],
    },
    {
      type: "heading",
      text: "Commands you will use",
    },
    {
      type: "code",
      label: "Pipe, then redirect one stream",
      code: "sort /home/alex/names.txt | uniq\nsort /home/alex/names.txt | uniq | wc -l\nls /home/alex > /home/alex/list.txt\nls /no/such 2> /home/alex/err.txt",
    },
    {
      type: "code",
      label: "Example",
      code: "alex@web-1:~$ sort names.txt | uniq\napp-01\nweb-1\nalex@web-1:~$ sort names.txt | uniq | wc -l\n2",
    },
    {
      type: "heading",
      text: "Common mistake",
    },
    {
      type: "paragraph",
      text: "sort names.txt > names.txt empties the file. The shell truncates the destination before sort reads it, so sort reads an empty file and writes that back. Write to a new file, then replace the original with mv if you meant to rewrite it.",
    },
  ],
  questions: [
    {
      id: "append-or-replace",
      type: "multiple-choice",
      prompt: "counts.txt already has lines in it. Which operator adds new standard output at the end and keeps those lines?",
      choices: [
        { id: "append", label: ">>" },
        { id: "replace", label: ">" },
        { id: "stderr", label: "2>" },
        { id: "pipe", label: "|" },
      ],
      correctId: "append",
      explanation:
        ">> appends standard output. > replaces the whole file, which deletes the lines already there. 2> redirects errors, and | connects two commands instead of writing a file.",
    },
    {
      id: "truncate-first",
      type: "multiple-choice",
      prompt: "You run sort /home/alex/names.txt > /home/alex/names.txt. What is in names.txt when the command finishes?",
      choices: [
        { id: "empty", label: "Nothing. The file was emptied before sort read it" },
        { id: "sorted", label: "The same names, sorted" },
        { id: "original", label: "The original unsorted names" },
        { id: "errors", label: "The error message from sort" },
      ],
      correctId: "empty",
      explanation:
        "The shell opens the destination and truncates it before sort starts, so sort reads an empty file and writes nothing back. It does not read the original lines and then sort them into the same file.",
    },
    {
      id: "stderr-only",
      type: "multiple-choice",
      prompt: "What does ls /no/such 2> /home/alex/err.txt send to err.txt?",
      choices: [
        { id: "errors", label: "Standard error only" },
        { id: "both", label: "Standard output and standard error" },
        { id: "output", label: "Standard output only" },
        { id: "nothing", label: "Nothing. 2> discards the stream" },
      ],
      correctId: "errors",
      explanation:
        "2> redirects file descriptor 2, which is standard error. Standard output is unchanged. Sending both streams to the file takes > /home/alex/err.txt 2>&1 or, in bash, &> /home/alex/err.txt.",
    },
    {
      id: "split-streams",
      type: "visual",
      prompt: "Where did the error message go?",
      output: {
        caption: "A listing of a missing path and a real directory",
        lines: [
          "alex@web-1:~$ ls /no/such /home/alex > /home/alex/list.txt",
          "ls: cannot access '/no/such': No such file or directory",
          "alex@web-1:~$ cat /home/alex/list.txt",
          "backup.sh",
          "projects",
        ],
      },
      choices: [
        { id: "terminal", label: "It stayed on the terminal. The file received the names" },
        { id: "file", label: "It was written into list.txt with the names" },
        { id: "discarded", label: "It was discarded, and list.txt has only the names" },
        { id: "appended", label: "It was appended after projects in list.txt" },
      ],
      correctId: "terminal",
      explanation:
        "> redirects standard output, so the names are in list.txt. The missing-path message is standard error, and this command did not redirect it, so it stayed on the terminal. It is not a line in the file.",
    },
    {
      id: "unique-names",
      type: "terminal",
      prompt:
        "You are in /home/alex. names.txt has one hostname per line, with duplicates. Replace /home/alex/unique.txt with those names sorted and with duplicates removed. Use the absolute paths /home/alex/names.txt and /home/alex/unique.txt only. Do not quote them. Pipe sort to uniq with no options, or use sort -u or sort --unique. Redirect standard output with >. Do not append, do not redirect standard error, and do not add other options.",
      scenario: "alex@web-1:~",
      accepted: [
        "sort /home/alex/names.txt | uniq > /home/alex/unique.txt",
        "sort /home/alex/names.txt | uniq> /home/alex/unique.txt",
        "sort /home/alex/names.txt | uniq >/home/alex/unique.txt",
        "sort /home/alex/names.txt | uniq>/home/alex/unique.txt",
        "sort /home/alex/names.txt|uniq > /home/alex/unique.txt",
        "sort /home/alex/names.txt|uniq> /home/alex/unique.txt",
        "sort /home/alex/names.txt|uniq >/home/alex/unique.txt",
        "sort /home/alex/names.txt|uniq>/home/alex/unique.txt",
        "sort /home/alex/names.txt |uniq > /home/alex/unique.txt",
        "sort /home/alex/names.txt |uniq> /home/alex/unique.txt",
        "sort /home/alex/names.txt |uniq >/home/alex/unique.txt",
        "sort /home/alex/names.txt |uniq>/home/alex/unique.txt",
        "sort /home/alex/names.txt| uniq > /home/alex/unique.txt",
        "sort /home/alex/names.txt| uniq> /home/alex/unique.txt",
        "sort /home/alex/names.txt| uniq >/home/alex/unique.txt",
        "sort /home/alex/names.txt| uniq>/home/alex/unique.txt",
        "sort -u /home/alex/names.txt > /home/alex/unique.txt",
        "sort -u /home/alex/names.txt> /home/alex/unique.txt",
        "sort -u /home/alex/names.txt >/home/alex/unique.txt",
        "sort -u /home/alex/names.txt>/home/alex/unique.txt",
        "sort /home/alex/names.txt -u > /home/alex/unique.txt",
        "sort /home/alex/names.txt -u> /home/alex/unique.txt",
        "sort /home/alex/names.txt -u >/home/alex/unique.txt",
        "sort /home/alex/names.txt -u>/home/alex/unique.txt",
        "sort --unique /home/alex/names.txt > /home/alex/unique.txt",
        "sort --unique /home/alex/names.txt> /home/alex/unique.txt",
        "sort --unique /home/alex/names.txt >/home/alex/unique.txt",
        "sort --unique /home/alex/names.txt>/home/alex/unique.txt",
        "sort /home/alex/names.txt --unique > /home/alex/unique.txt",
        "sort /home/alex/names.txt --unique> /home/alex/unique.txt",
        "sort /home/alex/names.txt --unique >/home/alex/unique.txt",
        "sort /home/alex/names.txt --unique>/home/alex/unique.txt",
      ],
      explanation:
        "sort | uniq and sort -u both write the sorted unique lines. uniq only removes duplicates that are already next to each other, so sorting has to happen first. > replaces unique.txt. >> would keep the old lines, and writing back into names.txt would empty it.",
    },
  ],
};

const editAFileInTheShell: Skill = {
  id: `${LINUX}/intermediate/edit-a-file-in-the-shell`,
  slug: "edit-a-file-in-the-shell",
  pathway: LINUX,
  level: "beginner",
  domain: "fundamentals",
  title: "Edit a File in the Shell",
  description: "Open a file, change one line, and save it.",
  minutes: 8,
  placeholder: false,
  teaching: [
    {
      type: "paragraph",
      text: "nano and vim edit a file in the terminal. Copy the file first. If the edit goes wrong, the copy is the previous contents. cat prints a short file so you can check the line. less is the better reader when the file is longer than the screen. Press q to leave less.",
    },
    {
      type: "list",
      items: [
        "cp /home/alex/hosts.txt /home/alex/hosts.txt.bak copies the file. The original stays in place",
        "nano /home/alex/hosts.txt opens it. Type the change. Ctrl+O writes it. Confirm the name, then Ctrl+X leaves",
        "Ctrl+X in nano exits. If the buffer changed and you have not written it, nano asks whether to save. Ctrl+X is not itself the save key",
        "In vim, Esc returns to normal mode. :w writes. :q leaves when nothing unsaved remains. :wq writes and leaves. :q! leaves and discards unsaved changes",
        "cat /home/alex/hosts.txt prints the saved file. What you saw in the editor is not on disk until you write it",
      ],
    },
    {
      type: "heading",
      text: "Commands you will use",
    },
    {
      type: "code",
      label: "Copy, edit, then read it back",
      code: "cp /home/alex/hosts.txt /home/alex/hosts.txt.bak\nnano /home/alex/hosts.txt\ncat /home/alex/hosts.txt",
    },
    {
      type: "code",
      label: "Example",
      code: "alex@web-1:~$ cp hosts.txt hosts.txt.bak\nalex@web-1:~$ cat hosts.txt\nweb-1\napp-01",
    },
    {
      type: "heading",
      text: "Common mistake",
    },
    {
      type: "paragraph",
      text: "mv hosts.txt hosts.txt.bak is not a backup you can edit from. mv renames the file, so hosts.txt is gone and nano hosts.txt starts an empty file. cp leaves both names.",
    },
  ],
  questions: [
    {
      id: "nano-save",
      type: "multiple-choice",
      prompt: "hosts.txt is open in nano and you have typed a new line. Which key writes that buffer to disk?",
      choices: [
        { id: "write", label: "Ctrl+O" },
        { id: "exit", label: "Ctrl+X" },
        { id: "cut", label: "Ctrl+K" },
        { id: "cancel", label: "Ctrl+C" },
      ],
      correctId: "write",
      explanation:
        "Ctrl+O is Write Out. That stores the buffer. Ctrl+X exits, and nano only asks about saving if the buffer still has unsaved changes. Ctrl+K cuts a line. Ctrl+C cancels the current prompt.",
    },
    {
      id: "vim-discard",
      type: "multiple-choice",
      prompt: "A file is open in vim and the buffer has changes you do not want to keep. How do you leave?",
      choices: [
        { id: "discard", label: "Esc, then :q!" },
        { id: "save", label: "Esc, then :wq" },
        { id: "nano", label: "Ctrl+O" },
        { id: "plain-quit", label: "Esc, then :q" },
      ],
      correctId: "discard",
      explanation:
        ":q! quits and discards the unsaved buffer. :wq writes those changes and then quits, which keeps the edit you wanted to drop. :q refuses to quit while the buffer is changed. Ctrl+O is a nano key.",
    },
    {
      id: "backup-copy",
      type: "multiple-choice",
      prompt: "You want hosts.txt to stay in place and hosts.txt.bak to hold the same bytes before you edit. Which command does that?",
      choices: [
        { id: "copy", label: "cp hosts.txt hosts.txt.bak" },
        { id: "move", label: "mv hosts.txt hosts.txt.bak" },
        { id: "empty", label: "touch hosts.txt.bak" },
        { id: "remove", label: "rm hosts.txt.bak" },
      ],
      correctId: "copy",
      explanation:
        "cp copies the bytes and leaves hosts.txt where it is. mv renames it, so the original name is gone. touch creates an empty hosts.txt.bak and does not copy the contents. rm deletes a file.",
    },
    {
      id: "read-env",
      type: "visual",
      prompt: "What value is saved for NODE_ENV?",
      output: {
        caption: "cat /home/alex/app.env",
        lines: ["PORT=8080", "NODE_ENV=production"],
      },
      choices: [
        { id: "production", label: "production" },
        { id: "port", label: "8080" },
        { id: "development", label: "development" },
        { id: "empty", label: "The file has no NODE_ENV line" },
      ],
      correctId: "production",
      explanation:
        "The saved line is NODE_ENV=production. 8080 belongs to PORT. cat shows the file on disk, not an unsaved editor buffer.",
    },
    {
      id: "make-backup",
      type: "terminal",
      prompt:
        "You are in /home/alex. Copy hosts.txt to hosts.txt.bak in the same directory. Use cp with no options. hosts.txt, ./hosts.txt, or /home/alex/hosts.txt is fine, and the same three forms are fine for hosts.txt.bak. Do not quote the paths.",
      scenario: "alex@web-1:~",
      accepted: [
        "cp hosts.txt hosts.txt.bak",
        "cp hosts.txt ./hosts.txt.bak",
        "cp hosts.txt /home/alex/hosts.txt.bak",
        "cp ./hosts.txt hosts.txt.bak",
        "cp ./hosts.txt ./hosts.txt.bak",
        "cp ./hosts.txt /home/alex/hosts.txt.bak",
        "cp /home/alex/hosts.txt hosts.txt.bak",
        "cp /home/alex/hosts.txt ./hosts.txt.bak",
        "cp /home/alex/hosts.txt /home/alex/hosts.txt.bak",
      ],
      explanation:
        "cp copies hosts.txt to hosts.txt.bak and leaves the original name in place. mv hosts.txt hosts.txt.bak would remove the name you still need to edit.",
    },
  ],
};

const writeASimpleShellScript: Skill = {
  id: `${LINUX}/advanced/write-a-simple-shell-script`,
  slug: "write-a-simple-shell-script",
  pathway: LINUX,
  level: "beginner",
  domain: "scripting",
  title: "Write a Simple Shell Script",
  description: "Put a few commands in a file and run that file.",
  minutes: 10,
  placeholder: false,
  teaching: [
    {
      type: "paragraph",
      text: "A shell script is a text file of commands. The first line is the shebang. It tells the kernel which program should read the file. #!/bin/bash selects bash. #!/usr/bin/env bash asks env to find bash, which is useful when bash is not in /bin. The shebang has to be line 1.",
    },
    {
      type: "list",
      items: [
        "chmod u+x /home/alex/bin/check.sh adds execute for the owner and does not change read or write",
        "./check.sh runs the file in this directory. check.sh with no slash searches PATH and does not look in the current directory",
        "name=web-1 sets a variable. echo \"$name\" prints the value. The quotes keep an empty or spaced value as one word",
        "host=$(hostname) stores the command's standard output in host. Backticks, host=`hostname`, are the older form of the same substitution",
        "if [ \"$host\" = web-1 ]; then echo on web-1; fi runs the echo only when the test is true. [ is a command, so the spaces around [ and before ] are required",
        "$? is the exit status of the previous command. 0 means success. Any other number means failure. 127 means the command was not found",
      ],
    },
    {
      type: "heading",
      text: "Commands you will use",
    },
    {
      type: "code",
      label: "check.sh",
      code: "#!/bin/bash\nhost=$(hostname)\nif [ \"$host\" = web-1 ]; then\n  echo \"on web-1\"\nfi",
    },
    {
      type: "code",
      label: "Make it executable, run it, then read the status",
      code: "chmod u+x /home/alex/bin/check.sh\n./check.sh\necho $?",
    },
    {
      type: "code",
      label: "Example",
      code: "alex@web-1:~/bin$ ./check.sh\non web-1\nalex@web-1:~/bin$ echo $?\n0",
    },
    {
      type: "heading",
      text: "Common mistake",
    },
    {
      type: "paragraph",
      text: "[ \"$host\"=web-1 ] fails because the shell passes [ one argument, the glued string, and [ expects = as its own argument. Put spaces around [ and around =. The other frequent miss is running check.sh without ./ and then reading $? as 127.",
    },
  ],
  questions: [
    {
      id: "shebang-line",
      type: "multiple-choice",
      prompt: "Which line has to be the first line of a script that should run under bash?",
      choices: [
        { id: "first", label: "#!/bin/bash" },
        { id: "second", label: "A blank line, then #!/bin/bash" },
        { id: "echo", label: "echo hello" },
        { id: "chmod", label: "chmod u+x check.sh" },
      ],
      correctId: "first",
      explanation:
        "The kernel reads the shebang only when #! is the first two bytes of the file. A blank line or an echo before it means those bytes are not a shebang, so the kernel does not use that line to pick bash. chmod is a command you run on the file, not a line inside it.",
    },
    {
      id: "run-here",
      type: "multiple-choice",
      prompt: "check.sh is in the current directory and is executable. Which command runs that file without searching PATH?",
      choices: [
        { id: "dot-slash", label: "./check.sh" },
        { id: "bare", label: "check.sh" },
        { id: "echo", label: "echo check.sh" },
        { id: "man", label: "man check.sh" },
      ],
      correctId: "dot-slash",
      explanation:
        "./check.sh tells the shell to run the file in this directory. check.sh has no slash, so the shell searches PATH and does not look in the current directory. echo prints the name. man looks for a manual page.",
    },
    {
      id: "status-zero",
      type: "multiple-choice",
      prompt: "A command finishes, and echo $? prints 0. What does that 0 mean?",
      choices: [
        { id: "ok", label: "The command succeeded" },
        { id: "fail", label: "The command failed" },
        { id: "lines", label: "The command printed zero lines" },
        { id: "missing", label: "The command was not found" },
      ],
      correctId: "ok",
      explanation:
        "0 is the success status. A failure is a non-zero status. A missing command is 127, not 0. $? is not a count of output lines.",
    },
    {
      id: "status-two",
      type: "visual",
      prompt: "Did ls succeed?",
      output: {
        caption: "ls /no/such; echo $?",
        lines: ["ls: cannot access '/no/such': No such file or directory", "2"],
      },
      choices: [
        { id: "no", label: "No. The status is 2" },
        { id: "printed", label: "Yes. It printed a message" },
        { id: "two-ok", label: "Yes. 2 means success" },
        { id: "zero", label: "Yes. A blank status means success" },
      ],
      correctId: "no",
      explanation:
        "The 2 is $?, and only 0 means success. The message is standard error from the failed ls, not proof that it succeeded. A blank line is not the status.",
    },
    {
      id: "owner-execute",
      type: "terminal",
      prompt:
        "You are in /home/alex/bin. Add execute permission for the owner of backup.sh and do not change any other permission. Use chmod u+x. backup.sh, ./backup.sh, or /home/alex/bin/backup.sh is fine. -- before the path is fine. Do not use a numeric mode, +x, or a+x, and do not add other options.",
      scenario: "alex@web-1:~/bin",
      accepted: [
        "chmod u+x backup.sh",
        "chmod u+x ./backup.sh",
        "chmod u+x /home/alex/bin/backup.sh",
        "chmod u+x -- backup.sh",
        "chmod u+x -- ./backup.sh",
        "chmod u+x -- /home/alex/bin/backup.sh",
      ],
      explanation:
        "u+x adds execute for the owner only. chmod +x and chmod a+x also add execute for the group and for everyone else. A numeric mode such as 755 would rewrite the other bits instead of adding one.",
    },
  ],
};

const installAndRemovePackages: Skill = {
  id: `${LINUX}/beginner/install-and-remove-packages`,
  slug: "install-and-remove-packages",
  pathway: LINUX,
  level: "beginner",
  domain: "packages",
  title: "Install and Remove Packages",
  description: "Install a package and remove one on Ubuntu.",
  minutes: 6,
  placeholder: false,
  teaching: [
    {
      type: "paragraph",
      text: "Ubuntu and Debian install software with apt. The package index on disk is a list of what the repositories currently offer. Installing or removing a package writes into root-owned directories such as /var/lib/dpkg and /usr, so a normal user runs apt through sudo. On RHEL and Fedora the matching tool is dnf. There, dnf update is an alias of dnf upgrade. apt update and apt upgrade are not aliases.",
    },
    {
      type: "list",
      items: [
        "sudo apt update downloads the package index. It does not install or upgrade packages. The RHEL counterpart is sudo dnf makecache",
        "sudo apt upgrade installs newer versions of packages that are already installed. It does not remove packages to do that. On RHEL, sudo dnf upgrade does this job",
        "sudo apt install nginx installs nginx and the packages it depends on. sudo dnf install nginx is the RHEL command",
        "sudo apt remove nginx removes the package and leaves its configuration files. sudo apt purge nginx removes the package and those configuration files. sudo dnf remove nginx is the RHEL removal",
        "apt search nginx searches names and descriptions. apt show nginx prints the record for one package. On RHEL those are dnf search nginx and dnf info nginx",
        "dpkg -l lists packages known to dpkg. ii means installed. rc means removed, with configuration files still present. RHEL lists installed packages with rpm -qa",
        "sudo apt autoremove removes packages that were installed automatically as dependencies and are no longer needed. sudo dnf autoremove is the RHEL command",
      ],
    },
    {
      type: "heading",
      text: "Commands you will use",
    },
    {
      type: "code",
      label: "Refresh the index, install, then check",
      code: "sudo apt update\nsudo apt install nginx\ndpkg -l nginx\nsudo apt purge nginx",
    },
    {
      type: "code",
      label: "Example",
      code: "alex@web-1:~$ dpkg -l nginx apache2\nii  nginx    1.24.0-2ubuntu7.5 amd64 small, powerful, scalable web/proxy server\nrc  apache2  2.4.58-1ubuntu8.8 amd64 Apache HTTP Server",
    },
    {
      type: "heading",
      text: "Common mistake",
    },
    {
      type: "paragraph",
      text: "apt update feels like it should upgrade the system, because the word says update. It only refreshes the index. The installed packages stay on the old versions until apt upgrade. Running apt install without sudo fails when the user cannot open the dpkg lock.",
    },
  ],
  questions: [
    {
      id: "update-index",
      type: "multiple-choice",
      prompt: "What does sudo apt update change?",
      choices: [
        { id: "index", label: "The local package index" },
        { id: "upgrade", label: "Every installed package, to the newest version" },
        { id: "one", label: "One package named on the command line" },
        { id: "unused", label: "Packages that are no longer needed" },
      ],
      correctId: "index",
      explanation:
        "apt update downloads the repository indexes so later commands see current versions. It does not upgrade installed packages. That is apt upgrade. Removing unused dependencies is apt autoremove.",
    },
    {
      id: "purge-config",
      type: "multiple-choice",
      prompt: "You want nginx removed, including the configuration files it left under /etc. Which command does that?",
      choices: [
        { id: "purge", label: "sudo apt purge nginx" },
        { id: "remove", label: "sudo apt remove nginx" },
        { id: "auto", label: "sudo apt autoremove nginx" },
        { id: "update", label: "sudo apt update nginx" },
      ],
      correctId: "purge",
      explanation:
        "apt purge removes the package and its configuration files. apt remove removes the package and leaves those configuration files, which is why dpkg -l can still show rc afterward. apt update does not take a package to remove.",
    },
    {
      id: "why-sudo",
      type: "multiple-choice",
      prompt: "apt install nginx fails for user alex with a permission error on the dpkg lock. Why?",
      choices: [
        { id: "root-dirs", label: "Installing writes to directories owned by root" },
        { id: "no-sudo", label: "apt install is documented to work for any user, with no extra privileges" },
        { id: "missing", label: "nginx is not a package name apt accepts" },
        { id: "spelling", label: "The command had to be apt upgrade nginx" },
      ],
      correctId: "root-dirs",
      explanation:
        "The package database and the installed files are owned by root, so alex cannot open the lock or write those paths. sudo runs apt as root. The failure is not a misspelled package name, and apt upgrade would upgrade installed packages rather than fix the permission.",
    },
    {
      id: "which-installed",
      type: "visual",
      prompt: "Which package is installed?",
      output: {
        caption: "dpkg -l nginx apache2",
        lines: [
          "ii  nginx    1.24.0-2ubuntu7.5 amd64 small, powerful, scalable web/proxy server",
          "rc  apache2  2.4.58-1ubuntu8.8 amd64 Apache HTTP Server",
        ],
      },
      choices: [
        { id: "nginx", label: "nginx" },
        { id: "apache", label: "apache2" },
        { id: "both", label: "Both nginx and apache2" },
        { id: "neither", label: "Neither. Both rows are only available in the repository" },
      ],
      correctId: "nginx",
      explanation:
        "ii means the package is installed. rc means it was removed and its configuration files are still on disk, so apache2 is not installed. A row in this listing is not the same thing as a package that is currently installed.",
    },
    {
      id: "install-nginx",
      type: "terminal",
      prompt:
        "Install the package named nginx and no other package. Use apt install. -y, --yes, and --assume-yes are fine, before or after install, or after the package name. -- before nginx is fine when it does not turn a later -y into a package name. Do not use apt-get or dnf. Do not run update or upgrade. Do not name another package. sudo is optional.",
      scenario: "alex@web-1:~",
      accepted: [
        "apt install nginx",
        "apt install -- nginx",
        "apt -y install nginx",
        "apt --yes install nginx",
        "apt --assume-yes install nginx",
        "apt -y install -- nginx",
        "apt --yes install -- nginx",
        "apt --assume-yes install -- nginx",
        "apt install -y nginx",
        "apt install --yes nginx",
        "apt install --assume-yes nginx",
        "apt install -y -- nginx",
        "apt install --yes -- nginx",
        "apt install --assume-yes -- nginx",
        "apt install nginx -y",
        "apt install nginx --yes",
        "apt install nginx --assume-yes",
      ],
      explanation:
        "apt install nginx installs that one package. apt update would only refresh the index, and apt upgrade would upgrade what is already installed. -y answers the confirmation. sudo is accepted in front of any of these because the checker allows one leading sudo.",
    },
  ],
};

const beginnerSkills: Skill[] = [
  whatIsLinuxAndTheShell,
  navigateTheLinuxFilesystem,
  readFilePermissions,
  changePermissionsWithChmod,
  manageFileOwnership,
  createAndDeleteFiles,
  findFilesAndDirectories,
  readAndSearchLogFiles,
  manageLinuxProcesses,
  startStopAndRestartServices,
  checkDiskAndMemoryUsage,
  manageUsersAndGroups,
  installAndRemovePackages,
  understandLinuxNetworkingCommands,
  redirectOutputAndErrors,
  editAFileInTheShell,
  writeASimpleShellScript,
];

const intermediateSkills: Skill[] = [
  preview(
    `${LINUX}/advanced/configure-ssh-key-login`,
    LINUX,
    "intermediate",
    "security-hardening",
    "configure-ssh-key-login",
    "Configure SSH Key Login",
    "Create a key pair and use it to sign in.",
    10,
  ),
  preview(
    `${LINUX}/advanced/read-a-systemd-unit`,
    LINUX,
    "intermediate",
    "processes-services",
    "read-a-systemd-unit",
    "Read a systemd Unit",
    "Find what a service runs and when it starts.",
    9,
  ),
  preview(
    `${LINUX}/advanced/inspect-listening-ports`,
    LINUX,
    "intermediate",
    "networking",
    "inspect-listening-ports",
    "Find What Is Listening and Why It Is Unreachable",
    "Tell whether a service is listening, and whether anything is blocking access to it.",
    8,
  ),
];

const advancedSkills: Skill[] = [];

function levelsFor(skills: { beginner: Skill[]; intermediate: Skill[]; advanced: Skill[] }): PathwayLevel[] {
  return [
    {
      id: "beginner",
      title: "Beginner",
      description: "Entry-level technician.",
      skills: skills.beginner,
    },
    {
      id: "intermediate",
      title: "Intermediate",
      description: "Junior Linux administrator.",
      skills: skills.intermediate,
    },
    {
      id: "advanced",
      title: "Advanced",
      description: "Experienced administrator or systems engineer.",
      skills: skills.advanced,
    },
    {
      id: "expert",
      title: "Expert",
      description: "Senior engineer or architect.",
      skills: [],
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
  return value === "beginner" || value === "intermediate" || value === "advanced" || value === "expert";
}

export function skillsByDomain(skills: readonly Skill[]): { id: DomainId; name: string; skills: Skill[] }[] {
  return DOMAINS.flatMap((domain) => {
    const matching = skills.filter((skill) => skill.domain === domain.id);
    return matching.length === 0 ? [] : [{ id: domain.id, name: domain.name, skills: matching }];
  });
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
    pathway.levels
      .filter((level) => level.id !== "expert")
      .map((level) => ({ pathway: pathway.slug, level: level.id })),
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
