/**
 * @title Color Data
 * @fileoverview Color data for the app
 * @path /lib/data/color_data.ts
 */

import { ColorType } from "@/types/types";

export const colorData : ColorType = {
    "upregulated": "#e30b5d", // Raspberry
    "downregulated": "#6495ed", // Cornflower Blue
    "unchanged": "#778899", // Light Slate Gray
    "tumor suppressor": "#ff7f50", // Coral
    "oncogene": "#ffa343", // Neon Carrot
    "regulator": "#4682b4", // Steel Blue
    "signaling molecule": "#32cd32", // Lime Green
    "metabolic enzyme": "#ffd700", // Gold
    "transcription factor": "#9370db", // Medium Purple
    "cell cycle regulator": "#6a5acd", // Slate Blue
    "apoptosis regulator": "#ebb0d7", // Thristle
    "significant": "#ff1493", // Deep Pink
    "non-significant": "#808080", // Gray
    "default": "#9333ea" // Default to purple if group not found
    // Add more mappings as needed
};
