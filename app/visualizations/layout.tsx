/**
 * @title Visualizations Layout
 * @fileoverview Visualizations layout
 * @path /app/visualizations/layout.tsx
 */
"use client";

import SideBar from "@/components/SideBar";

export default function VisualizationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
} 