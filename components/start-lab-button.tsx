import Link from "next/link";

export function StartLabButton({ slug }: { slug: string }) {
  return (
    <Link
      href={`/labs/${slug}/workspace`}
      className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      Start Lab
    </Link>
  );
}
