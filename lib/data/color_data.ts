/**
 * @title Color Data
 * @fileoverview Color data for the app
 * @path /lib/data/color_data.ts
 */

import { ColorType } from "@/types/types";

export const colorData : ColorType = {
    // Chord Plot Colors
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
    // Volcano Plot Colors
    "significant": "#ff1493", // Deep Pink
    "non-significant": "#808080", // Gray
    "default": "#9333ea", // Default to purple if group not found
    // Pathway Colors
    "cyclin": "#F56565", // Red
    "kinase": "#4299E1", // Blue
    "inhibitor": "#48BB78", // Green
    "checkpoint": "#ED8936", // Orange
    "transcription": "#9F7AEA", // Purple
    "signaling": "#F6E05E", // Yellow
    "pump": "#F56565", // Red
    "channel": "#4299E1", // Blue
    "transporter": "#48BB78", // Green
    "cotransporter": "#ED8936", // Orange
    "exchanger": "#9F7AEA", // Purple
    "CsA": "#ffa343", // Neon Carrot,
    "VOC": "#ff7f50", // Coral,
    "DMSO": "#808080", // Gray,
    "gtpase": "#DD6B20", // Orange,
    "compartment": "#38A169", // Green,
    "coat": "#E53E3E", // Red,
    "adaptor": "#D69E2E", // Yellow,
    "vesicle": "#F6E05E", // Yellow,
    "chaperone": "#4299E1", // Blue,
    "sensor": "#F6AD55", // Yellow,
    "translation": "#FC8181", // Red,
    "cochaperone": "#63B3ED", // Blue,
    "ERAD": "#B794F4", // Purple,
    "translocon": "#F687B3", // Pink,
    "receptor": "#ED64A6", // Pink,
    "complex": "#805AD5", // Purple,
    "transport": "#3182CE", // Blue,
};
