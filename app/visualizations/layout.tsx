/**
 * @title Visualizations Layout
 * @fileoverview Visualizations layout
 * @path /app/visualizations/layout.tsx
 */
"use client";

import { useState, useEffect } from "react";
import { visualizationMetadata } from "@/lib/data/metadata";
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