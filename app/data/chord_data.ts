export interface ChordNode {
    id: string;
    group: string;
    color: string;
  }
  
  export interface ChordLink {
    source: string;
    target: string;
    value: number;
  }
  
  export interface ChordData {
    nodes: ChordNode[];
    links: ChordLink[];
  }
  
  export const geneExpressionChordData: ChordData = {
    nodes: [
      { id: "TP53", group: "upregulated", color: "#ff4444" },
      { id: "BRCA1", group: "downregulated", color: "#4444ff" },
      { id: "EGFR", group: "upregulated", color: "#ff4444" },
      { id: "KRAS", group: "upregulated", color: "#ff4444" },
      { id: "AKT1", group: "unchanged", color: "#888888" },
      { id: "PTEN", group: "downregulated", color: "#4444ff" },
      { id: "MYC", group: "upregulated", color: "#ff4444" },
      { id: "VEGFA", group: "upregulated", color: "#ff4444" }
    ],
    links: [
      { source: "TP53", target: "BRCA1", value: 0.85 },
      { source: "BRCA1", target: "EGFR", value: 0.65 },
      { source: "EGFR", target: "KRAS", value: 0.90 },
      { source: "KRAS", target: "AKT1", value: 0.75 },
      { source: "AKT1", target: "PTEN", value: 0.80 },
      { source: "PTEN", target: "MYC", value: 0.70 },
      { source: "MYC", target: "VEGFA", value: 0.85 },
      { source: "VEGFA", target: "TP53", value: 0.60 }
    ]
  };