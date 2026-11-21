import type { ReactNode } from "react";

export type PathwayIconName =
  | "networking"
  | "linux"
  | "windows"
  | "directory"
  | "engineering"
  | "vulnerability"
  | "cloud"
  | "pentest"
  | "soc";

type IconProps = {
  className?: string;
};

function IconBase({
  className,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </IconBase>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </IconBase>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="11" cy="11" r="6.25" />
      <path d="M16 16l4 4" />
    </IconBase>
  );
}

const pathwayGlyphs: Record<PathwayIconName, ReactNode> = {
  networking: (
    <>
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="18" cy="17" r="2" />
      <path d="M8 12h6" />
      <path d="M14 12l4-5" />
      <path d="M14 12l4 5" />
    </>
  ),
  linux: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 10l2 2-2 2" />
      <path d="M12 14h4" />
    </>
  ),
  windows: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </>
  ),
  directory: (
    <>
      <circle cx="9" cy="9" r="2.25" />
      <circle cx="16" cy="10" r="1.75" />
      <path d="M5.5 17.5c.6-2 2.2-3 3.5-3s2.9 1 3.5 3" />
      <path d="M14 14.5c.8-.6 1.7-.9 2.6-.8 1.2.1 2.1.8 2.6 2" />
    </>
  ),
  engineering: (
    <>
      <path d="M12 3.5l7 3v5.2c0 3.6-2.7 6.4-7 7.8-4.3-1.4-7-4.2-7-7.8V6.5l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  vulnerability: (
    <>
      <path d="M12 4.5l7.5 13h-15L12 4.5z" />
      <path d="M12 10v3.5" />
      <path d="M12 16.2h.01" />
    </>
  ),
  cloud: (
    <>
      <path d="M7.5 17.5h9.2a3.3 3.3 0 0 0 .4-6.6 4.6 4.6 0 0 0-8.8-1.2A3.2 3.2 0 0 0 7.5 17.5z" />
    </>
  ),
  pentest: (
    <>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.2" />
      <path d="M12 18.3v2.2" />
      <path d="M3.5 12h2.2" />
      <path d="M18.3 12h2.2" />
    </>
  ),
  soc: (
    <>
      <path d="M4 16.5a8 8 0 0 1 16 0" />
      <path d="M8 16.5a4 4 0 0 1 8 0" />
      <path d="M12 16.5v-4" />
      <circle cx="12" cy="16.5" r="1" />
    </>
  ),
};

export function PathwayGlyph({ name, className }: { name: PathwayIconName; className?: string }) {
  return <IconBase className={className}>{pathwayGlyphs[name]}</IconBase>;
}
