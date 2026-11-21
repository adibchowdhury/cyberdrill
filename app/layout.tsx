import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { AccountMenu, AccountMenuFallback } from "@/components/account-menu";
import { JourneyProvider } from "@/components/journey/journey-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
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
    "Identify skill gaps, practice the work of a cybersecurity role, and demonstrate those abilities.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scheme-light antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <JourneyProvider>
          <SiteHeader
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
          />
          <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <SiteFooter />
        </JourneyProvider>
      </body>
    </html>
  );
}
