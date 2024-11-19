/**
 * @title Visualizations Layout
 * @fileoverview Visualizations layout
 * @path /app/visualizations/layout.tsx
 */
"use client";

import SideBar from "@/components/SideBar";
import "../../app/globals.css";
import { usePathname } from "next/navigation";
import { visualizations } from "@/lib/data/metadata";

export default function VisualizationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const getCurrentViz = () => {
    const activePath = usePathname();
    const activeId = activePath.split("/").pop();
    return visualizations.find((viz) => viz.id === activeId);
  }
  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[80vh]">
      <SideBar visualizations={visualizations} currentViz={getCurrentViz()?.id || ''} />
      <main className="flex-1 rounded-xl bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 p-6 border-t-4 border-t-purple-500">
        <div className="mb-6"> 
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-2">
            {getCurrentViz()?.label || "Visualization"}
          </h1>
          <p className="text-muted-foreground">
            {getCurrentViz()?.description || "Description"}
          </p>
        </div>
        <div className="aspect-[4/3] w-full bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 p-6 border-t-4 border-grey-0">
        {children}
        </div>
      </main>
    </div>
  );
} 