import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Navigation from "@/components/ui/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tagalog Study App - Learn Particles, Verbs & Vocabulary",
  description: "A structured, self-paced Tagalog learning app focusing on particles, verb conjugations, and essential vocabulary for quick communication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
      >
        <div className="min-h-screen bg-gray-900">
          <Header />
          <div className="flex">
            <aside className="hidden md:block w-64 h-screen sticky top-16">
              <Navigation />
            </aside>
            <main className="flex-1 p-6 bg-gray-900">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
