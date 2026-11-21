import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Explore Jobs" },
  { href: "/assessment", label: "Skill Assessment" },
  { href: "/training", label: "Training" },
  { href: "/demonstrate", label: "Demonstrate Skills" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-foreground">CyberDrill</p>
          <p className="mt-1 max-w-xl text-sm leading-6 text-muted">
            A job-focused place to practice the work a cybersecurity role asks you to do.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-muted">© CyberDrill</p>
      </div>
    </footer>
  );
}
