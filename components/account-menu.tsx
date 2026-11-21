import Link from "next/link";
import { connection } from "next/server";
import { signOut } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

const quietLink =
  "inline-flex h-9 items-center rounded-lg px-3 text-sm text-foreground outline-none hover:bg-raised focus-visible:ring-2 focus-visible:ring-accent/40";

const signUpLink =
  "inline-flex h-9 items-center justify-center rounded-lg bg-accent px-3 text-sm font-semibold text-on-accent shadow-sm outline-none hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40";

export function AccountMenuFallback({ placement = "bar" }: { placement?: "bar" | "menu" }) {
  return <p className={placement === "menu" ? "px-3 text-sm text-muted" : "text-sm text-muted"}>Account</p>;
}

export async function AccountMenu({ placement = "bar" }: { placement?: "bar" | "menu" }) {
  await connection();

  let email: string | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    email = data?.claims.email ?? null;
  } catch {
    email = null;
  }

  const stacked = placement === "menu";

  if (email) {
    return (
      <div className={stacked ? "flex flex-col gap-1" : "flex items-center gap-2"}>
        <p className={`truncate text-sm text-muted ${stacked ? "px-3" : "max-w-44"}`} title={email}>
          {email}
        </p>
        <form action={signOut}>
          <button type="submit" className={`${quietLink} ${stacked ? "w-full justify-start" : ""}`}>
            Sign out
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={stacked ? "flex flex-col gap-2" : "flex items-center gap-2"}>
      <Link href="/login" className={`${quietLink} ${stacked ? "justify-start" : ""}`}>
        Log in
      </Link>
      <Link href="/signup" className={`${signUpLink} ${stacked ? "w-full" : ""}`}>
        Sign up
      </Link>
    </div>
  );
}
