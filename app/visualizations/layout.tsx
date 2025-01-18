/**
 * @title Visualizations Layout
 * @fileoverview Visualizations layout
 * @path /app/visualizations/layout.tsx
 */
"use client";

import React, { useState, useEffect } from "react";
import { visualizations } from "@/lib/data/metadata";
import SideBar from "@/components/SideBar";;
import { VisualizationType } from "@/types/types";

interface LayoutProps {
  children: React.ReactNode;
}

export default function VisualizationsLayout({ children }: LayoutProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentViz, setCurrentViz] = useState("market-risk-radar");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-6">
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