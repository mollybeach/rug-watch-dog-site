/**
 * @title Visualization Metadata
 * @fileoverview Visualization metadata
 * @path /lib/data/metadata.ts
 */

import { VisualizationType, HeaderNavItemsType } from "@/types/types";
import { LineChart, PieChart, Network, BarChart, Home, FileText, BookOpen } from "lucide-react";

export const visualizations: VisualizationType[] = [
    {
      id: "volcano-plot",
      label: "Volcano Plot",
      icon: LineChart,
      description: "Interactive volcano plots showing differential expression",
      path: "volcano-plot",
      isActive: false,
    },
    {
      id: "chord-diagram", 
      label: "Chord Diagram", 
      icon: PieChart,
      description: "Chord diagrams showing gene-gene interactions",
      path: "chord-diagram",
      isActive: false
    },
    {
      id: "deg-rankings",
      label: "DEG Rankings",
      icon: LineChart,
      description: "Interactive volcano plots showing differential expression",
      path: "deg-rankings",
      isActive: false
    },
    {
      id: "pathway-diagram",
      label: "Pathway Diagram",
      icon: Network,
      description: "Pathway diagrams showing gene-gene interactions",
      path: "pathway-diagram",
      isActive: false
    },
    
  ]

export const HeaderNavItems: HeaderNavItemsType[] = [
    { value: "analysis", icon: BarChart, label: "Analysis" },
    { value: "visualizations/volcano-plot", icon: Home, label: "Visualizations" },
    { value: "data", icon: FileText, label: "Data" },
    { value: "documentation", icon: BookOpen, label: "Documentation" },
];