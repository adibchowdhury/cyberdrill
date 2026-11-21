"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = {
  error: string | null;
  message: string | null;
};

function credentials(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  };
}

export async function login(_state: AuthState, formData: FormData): Promise<AuthState> {
  const { email, password } = credentials(formData);
  if (!email || !password) {
    return { error: "Enter your email and password.", message: null };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message, message: null };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(_state: AuthState, formData: FormData): Promise<AuthState> {
  const { email, password } = credentials(formData);
  if (!email || !password) {
    return { error: "Enter your email and password.", message: null };
  }

  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "http";
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: host ? { emailRedirectTo: `${proto}://${host}/auth/confirm` } : undefined,
  });

  if (error) {
    return { error: error.message, message: null };
  }

  return { error: null, message: "Check your email to confirm your account" };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
