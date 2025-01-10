/*
 * @title Types
 * @path /types/types.tsx
 * @description Type definitions for the application.
 */

import { LucideIcon } from "lucide-react";

// Navigation and Layout Types
export type VisualizationType = {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  description: string;
};

export type HeaderNavItemsType = {
  value: string;
  icon: LucideIcon;
  label: string;
};

// NFT Market Data Types
export type NFTCollectionType = {
  id: string;
  name: string;
  floorPrice: number;
  volume24h: number;
  holders: number;
  riskScore: number;
};

export type NetworkNodeType = {
  id: string;
  group: 'collection' | 'whale' | 'trader';
  size: number;
};

export type NetworkLinkType = {
  source: string;
  target: string;
  value: number;
};

export type NetworkDataType = {
  nodes: NetworkNodeType[];
  links: NetworkLinkType[];
  metadata: {
    title: string;
    description: string;
    groups: {
      [key: string]: { color: string };
    };
  };
};

export type PriceHistoryType = {
  collection: string;
  timestamps: string[];
  prices: number[];
  volumes: number[];
};

export type MarketMetricsType = {
  name: string;
  value: string | number;
  change24h: number;
  type: 'price' | 'volume' | 'holders' | 'risk';
};

export type ColorSchemeType = {
  collection: string;
  whale: string;
  trader: string;
  positive: string;
  negative: string;
  neutral: string;
  'non-significant': string;
  highRisk: string;
  mediumRisk: string;
  lowRisk: string;
};