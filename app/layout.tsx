import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { AccountMenu, AccountMenuFallback } from "@/components/account-menu";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CyberDrill",
    template: "%s · CyberDrill",
  },
  description:
    "Learn practical IT and cybersecurity skills in minutes, then prove what you know.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scheme-light antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <AppShell
          account={
            <Suspense fallback={<AccountMenuFallback placement="bar" />}>
              <AccountMenu placement="bar" />
            </Suspense>
          }
          menuAccount={
            <Suspense fallback={<AccountMenuFallback placement="menu" />}>
              <AccountMenu placement="menu" />
            </Suspense>
          }
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
