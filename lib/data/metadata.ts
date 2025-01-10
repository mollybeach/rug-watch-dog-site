/**
 * @title Visualization Metadata
 * @fileoverview Visualization metadata
 * @path /lib/data/metadata.ts
 */

import { VisualizationType, HeaderNavItemsType } from "@/types/types";
import { LineChart, BarChart2, NetworkIcon, TrendingUp, Home, FileText, BookOpen } from "lucide-react";

export const visualizations: VisualizationType[] = [
    {
      id: "market-risk-radar",
      label: "Market Risk Radar",
      icon: TrendingUp,
      description: "Real-time analysis of market risks",
      path: "market-risk-radar",
    },
    {
      id: "nft-analytics",
      label: "NFT Analytics",
      icon: BarChart2,
      description: "Track and analyze NFT market trends",
      path: "nft-analytics",
    },
    {
      id: "network-analysis",
      label: "Network Analysis",
      icon: NetworkIcon,
      description: "Explore token ownership networks",
      path: "network-analysis",
    },
    {
      id: "price-history",
      label: "Price History",
      icon: LineChart,
      description: "View historical price data",
      path: "price-history",
    }
];

export const HeaderNavItems: HeaderNavItemsType[] = [
    { value: "analysis", icon: TrendingUp, label: "Analysis" },
    { value: "visualizations/market-risk-radar", icon: Home, label: "Visualizations" },
    { value: "data", icon: FileText, label: "Data" },
    { value: "documentation", icon: BookOpen, label: "Documentation" },
];