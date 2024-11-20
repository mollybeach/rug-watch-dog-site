/**
 * @title Pathway Data
 * @fileoverview Pathway data
 * @path /lib/data/pathway_data.ts
 */
// Pathway Diagram Mock Data

import { PathwayDataType, PathwayNodeType, PathwayLinkType } from "@/types/types";
import { colorData } from "./color_data";
import { geneData } from "./gene_data";

// Exporting an empty array for PathwayData
export const PathwayData: PathwayDataType[] = [];

// Function to create pathway data based on the pathway name
const createPathwayData = (pathwayName: string): PathwayDataType => {
  // Filter geneData for the specified pathway type
  const pathwayData = geneData.filter(cell => cell.pathway === pathwayName);
  
  // Create a set of unique nodes
  const uniqueNodes = [...new Set(pathwayData.map(cell => cell.id))];
  
  // Create the pathway data structure
  const nodes = uniqueNodes.map(node => {
    const cell = pathwayData.find(cell => cell.id === node);
    return {
      id: node,
      label: node,
      group: cell?.cellularProcess || "unknown" // Use the cellularProcess or default to "unknown"
    } as PathwayNodeType; // Ensure the type matches
  });

  // Create links ensuring that both source and target nodes exist
  const links = pathwayData.flatMap(cell => 
    cell.interactingGenes.map(interactingGene => ({
      source: interactingGene.id, // Use the interacting gene as the source
      target: cell.id,
      value: interactingGene.interactionValue || 0 // Use the interaction value from the interacting gene
    } as PathwayLinkType))
  ).filter(link => nodes.some(node => node.id === link.source) && nodes.some(node => node.id === link.target)); // Filter out links with missing nodes

  // Create a set of unique cellular processes
  const uniqueCellularProcesses = [...new Set(pathwayData.map(cell => cell.cellularProcess))];
  
  return {
    nodes,
    links,
    metadata: {
      title: pathwayName,
      description: `Key components and interactions in the ${pathwayName} pathway`,
      groups: uniqueCellularProcesses.reduce((acc, process) => {
        if (process !== null && colorData[process]) {
          acc[process] = { color: colorData[process] };
        }
        return acc;
      }, {} as Record<string, { color: string }>)
    }
  };
};

// Example usage for specific pathways
export const proteinProcessingPathwayData = createPathwayData("Protein processing in endoplasmic reticulum");
export const cellCyclePathwayData = createPathwayData("Cell cycle");
export const dnaReplicationPathwayData = createPathwayData("DNA replication");
export const progesteroneMediatedOocyteMaturationPathwayData = createPathwayData("Progesterone-mediated oocyte maturation");
export const baseExcisionRepairPathwayData = createPathwayData("Base excision repair");
export const thyroidHormoneSynthesisPathwayData = createPathwayData("Thyroid hormone synthesis");
export const antigenProcessingAndPresentationPathwayData = createPathwayData("Antigen processing and presentation");
export const atpDependentChromatinRemodelingPathwayData = createPathwayData("ATP-dependent chromatin remodeling");
export const proteinExportPathwayData = createPathwayData("Protein export");
export const oocyteMeiosisPathwayData = createPathwayData("Oocyte meiosis");
export const nucleocytoplasmicTransportPathwayData = createPathwayData("Nucleocytoplasmic transport");
export const ferroptosisPathwayData = createPathwayData("Ferroptosis");
export const mismatchRepairPathwayData = createPathwayData("Mismatch repair");
export const gapJunctionPathwayData = createPathwayData("gap-junction");
export const smallCellLungCancerPathwayData = createPathwayData("Small cell lung cancer");


