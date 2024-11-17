import React from "react";
import { MainContent } from "@/components/MainContent";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-6 gap-8">
      <Hero />
      <MainContent />
    </div>
  );
}
