import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-lg py-16">
      <p className="font-mono text-[11px] tracking-[0.16em] text-cyan-text uppercase">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        That page is not part of the training preview.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex text-sm font-medium text-cyan-text outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
