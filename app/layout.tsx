/**
 * @title Layout
 * @fileoverview Layout component
 * @path /app/layout.tsx
 */

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "RugWatchDog",
  description: "AI-driven platform for analyzing cryptocurrency tokens and detecting potential rug pulls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body 
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          bg-background 
          text-foreground 
          dark:bg-background 
          dark:text-foreground
          min-h-screen
        `}
      >
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
          <Header />
          <main className="p-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
