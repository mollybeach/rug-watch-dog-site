/*
 * @title Types
 * @path /types/types.tsx
 * @description Type definitions for the application.
 */

import { LucideIcon } from "lucide-react";

export type ChordNodeType = {
    id: string;                // Unique identifier for the node
    group: string;             // Group/category of the node
    color: string;             // Color associated with the node (optional)
    // Add any additional properties relevant to your nodes
};

export type ChordLinkType = {
    source: string;           // ID of the source node
    target: string;           // ID of the target node
    value: number;            // Value associated with the link (optional)
    // Add any additional properties relevant to your links
};

export type ChordDataType = {
    nodes: ChordNodeType[];            // Array of nodes in the pathway
    links: ChordLinkType[];            // Array of links connecting the nodes
    metadata: {
        description: string;
    };
};

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

export type RankingDataType = {
    id: string;
    geneName: string;
    logFC: number;
    pValue: number;
    fdr: number;
    significant: boolean;
    treatment: 'CsA' | 'VOC';
    rank: number;
};

export type VolcanoDataPointType = {
    gene: string;    // Name of the gene
    logFC: number;   // Log2 Fold Change
    pValue: number;  // P-value
};

export type ColorType = {
    [key: string]: string; // Maps gene types to their corresponding colors
};

export type PathwayNodeType = {
    id: string;
    label: string;
    group: string;
  }
  export type PathwayLinkType = {
    source: string;
    target: string;
    value: number;
  }
  export type PathwayDataType  = {
    nodes: PathwayNodeType[];
    links: PathwayLinkType[];
    metadata: {
      title: string;
      description: string;
      groups: {
        [key: string]: { color: string };
      };
    };
  }

export type GeneType = {
    group: string;
    pathway: string;
    gene: string;
    logfc: number;
    adjpv: number;
}
