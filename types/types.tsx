/*
 * @title Types
 * @path /types/types.tsx
 * @description Type definitions for the application.
 */

import { LucideIcon } from "lucide-react";

export type Node = {
    id: string;                // Unique identifier for the node
    group: string;             // Group/category of the node
    // Add any additional properties relevant to your nodes
};

export type Link = {
    source: string;           // ID of the source node
    target: string;           // ID of the target node
    // Add any additional properties relevant to your links
};

export type PathwayData = {
    nodes: Node[];            // Array of nodes in the pathway
    links: Link[];            // Array of links connecting the nodes
    metadata: {
        groups: { [key: string]: { color: string } }; // Metadata for node groups
    };
};

export type VisualizationType = {
    id: string;
    label: string;
    icon: LucideIcon;
    path: string;
    description: string;
    isActive?: boolean;
  };
  

export type HeaderNavItemsType = {
    value: string;
    icon: LucideIcon;
    label: string;
};