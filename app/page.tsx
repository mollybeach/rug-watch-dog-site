/**
 * @title Home Page
 * @fileoverview Home page component
 * @path /app/page.tsx
 */

import { MainContent } from "@/components/MainContent";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen p-6 space-y-8">
      <Hero />
      <MainContent />
    </div>
  );
}