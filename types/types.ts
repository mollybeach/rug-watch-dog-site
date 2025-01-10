import { LucideIcon } from "lucide-react";

// Navigation and Layout Types
export interface VisualizationType {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  path: string;
}

export interface HeaderNavItemsType {
  label: string;
  value: string;
  icon: LucideIcon;
  href?: string;
}

// Market Data Types
export type AssetCategory = 'blue_chip' | 'major_alt' | 'trending' | 'high_risk' | 'defi' | 'gaming';
export type AssetType = 'nft' | 'coin';

export interface MarketDataPoint {
  name: string;
  priceChange: number;
  volume: number;
  type: AssetType;
  category: AssetCategory;
}

// NFT Analytics Types
export interface NFTCollectionData {
  name: string;
  volume: number;
  floorPrice: number;
  holders: number;
}

// Network Analysis Types
export type NetworkGroupType = 'whale' | 'active_trader' | 'nft';

export interface NetworkNode {
  id: string;
  group: NetworkGroupType;
  value: number;
  holdings?: number;
  type?: string;
  x?: number;
  y?: number;
  color?: string;
  index?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface NetworkLink {
  source: string | NetworkNode;
  target: string | NetworkNode;
  value: number;
  index?: number;
}

export interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

// Price History Types
export interface PriceHistoryData {
  dates: string[];
  collections: {
    [key: string]: number[];
  };
}

// Color Types
export interface ColorData {
  // Market Categories
  blue_chip: string;
  major_alt: string;
  defi: string;
  gaming: string;
  high_risk: string;
  trending: string;
  
  // Asset Types
  nft: string;
  coin: string;
  
  // Network Groups
  whale: string;
  active_trader: string;
  institutional: string;
  
  // Price Changes
  price_up: string;
  price_down: string;
  neutral: string;
  
  // Volume Indicators
  high_volume: string;
  low_volume: string;
  
  // Risk Levels
  safe: string;
  moderate: string;
  risky: string;
} 