import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getUserWithRole } from '@/lib/supabase/getUserRole'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LocalVibeKe",
  description: "Discover local gems and hidden experiences across Kenya, matched to your mood.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { user, role, fullName } = await getUserWithRole()

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar isLoggedIn={!!user} role={role} fullName={fullName} />
        <div className="flex flex-col md:flex-row flex-1">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}