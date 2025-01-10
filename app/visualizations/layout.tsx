/**
 * @title Visualizations Layout
 * @fileoverview Visualizations layout
 * @path /app/visualizations/layout.tsx
 */
"use client";

import { visualizations } from "@/lib/data/metadata";
import SideBar from "@/components/SideBar";

export default function VisualizationsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  // Extract the current visualization from the URL
  const currentViz = window.location.pathname.split('/').pop() || 'market-risk-radar';

  return (
    <div className="container py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <SideBar 
          visualizations={visualizations} 
          currentViz={currentViz}
        />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
} 