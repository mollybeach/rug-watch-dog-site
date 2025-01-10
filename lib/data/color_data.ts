/**
 * @title Color Data
 * @fileoverview Color schemes for market visualizations
 */

import { ColorData } from "@/types/types";

export const colorData: ColorData = {
    // Market Categories
    blue_chip: "#4299E1",    // Blue
    major_alt: "#48BB78",    // Green
    defi: "#9F7AEA",        // Purple
    gaming: "#F6AD55",      // Orange
    high_risk: "#F56565",   // Red
    trending: "#ED64A6",    // Pink
    
    // Asset Types
    nft: "#667EEA",         // Indigo
    coin: "#38B2AC",        // Teal
    
    // Network Groups
    whale: "#2B6CB0",       // Dark Blue
    active_trader: "#48BB78", // Green
    institutional: "#9F7AEA", // Purple
    
    // Price Changes
    price_up: "#48BB78",    // Green
    price_down: "#F56565",  // Red
    neutral: "#A0AEC0",     // Gray
    
    // Volume Indicators
    high_volume: "#4299E1", // Blue
    low_volume: "#CBD5E0",  // Light Gray
    
    // Risk Levels
    safe: "#48BB78",        // Green
    moderate: "#F6AD55",    // Orange
    risky: "#F56565"        // Red
};
