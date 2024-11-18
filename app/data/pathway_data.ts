export interface PathwayNode {
  id: string;
  label: string;
  group: string;
}

export interface PathwayLink {
  source: string;
  target: string;
  value: number;
}

export interface PathwayData {
  nodes: PathwayNode[];
  links: PathwayLink[];
  metadata: {
    title: string;
    description: string;
    groups: {
      [key: string]: { color: string };
    };
  };
}

export const proteinProcessingData: PathwayData = {
  nodes: [
    { id: "HSPA5", label: "BiP/GRP78", group: "chaperone" },
    { id: "PERK", label: "EIF2AK3", group: "sensor" },
    { id: "IRE1a", label: "ERN1", group: "sensor" },
    { id: "ATF6", label: "ATF6", group: "transcription" },
    { id: "CALR", label: "Calreticulin", group: "chaperone" },
    { id: "CANX", label: "Calnexin", group: "chaperone" },
    { id: "DNAJB11", label: "ERDJ3", group: "cochaperone" },
    { id: "XBP1", label: "XBP1", group: "transcription" },
    { id: "DDIT3", label: "CHOP", group: "transcription" },
    { id: "EIF2S1", label: "eIF2α", group: "translation" },
    { id: "ATF4", label: "ATF4", group: "transcription" },
    { id: "EDEM1", label: "EDEM1", group: "ERAD" },
    { id: "SEC61", label: "SEC61", group: "translocon" },
    { id: "HERPUD1", label: "HERP", group: "ERAD" },
    { id: "DERL1", label: "Derlin-1", group: "ERAD" }
  ],
  links: [
    { source: "HSPA5", target: "PERK", value: 1 },
    { source: "HSPA5", target: "IRE1a", value: 1 },
    { source: "HSPA5", target: "ATF6", value: 1 },
    { source: "PERK", target: "EIF2S1", value: 2 },
    { source: "EIF2S1", target: "ATF4", value: 2 },
    { source: "ATF4", target: "DDIT3", value: 2 },
    { source: "IRE1a", target: "XBP1", value: 2 },
    { source: "XBP1", target: "EDEM1", value: 1 },
    { source: "XBP1", target: "HERPUD1", value: 1 },
    { source: "CALR", target: "CANX", value: 1 },
    { source: "HSPA5", target: "DNAJB11", value: 1 },
    { source: "CANX", target: "SEC61", value: 1 },
    { source: "EDEM1", target: "DERL1", value: 1 },
    { source: "HERPUD1", target: "DERL1", value: 1 },
    { source: "DERL1", target: "SEC61", value: 1 }
  ],
  metadata: {
    title: "Protein Processing in ER",
    description: "Key components and interactions in the protein processing and unfolded protein response pathway",
    groups: {
      chaperone: { color: "#4299E1" },
      sensor: { color: "#F6AD55" },
      transcription: { color: "#68D391" },
      translation: { color: "#FC8181" },
      cochaperone: { color: "#63B3ED" },
      ERAD: { color: "#B794F4" },
      translocon: { color: "#F687B3" }
    }
  }
};

export const membraneTransportData: PathwayData = {
  nodes: [
    { id: "ATP1A1", label: "Na+/K+-ATPase", group: "pump" },
    { id: "SLC12A2", label: "NKCC1", group: "cotransporter" },
    { id: "CFTR", label: "CFTR", group: "channel" },
    { id: "ABCC1", label: "MRP1", group: "transporter" },
    { id: "SLC9A1", label: "NHE1", group: "exchanger" },
    { id: "CACNA1C", label: "Cav1.2", group: "channel" },
    { id: "KCNQ1", label: "Kv7.1", group: "channel" },
    { id: "SLC4A4", label: "NBCe1", group: "cotransporter" },
    { id: "ATP2B1", label: "PMCA1", group: "pump" },
    { id: "SLC26A9", label: "SLC26A9", group: "transporter" }
  ],
  links: [
    { source: "ATP1A1", target: "SLC12A2", value: 1 },
    { source: "CFTR", target: "SLC26A9", value: 2 },
    { source: "SLC9A1", target: "SLC4A4", value: 1 },
    { source: "CACNA1C", target: "ATP2B1", value: 1 },
    { source: "CFTR", target: "ABCC1", value: 1 },
    { source: "ATP1A1", target: "SLC9A1", value: 2 },
    { source: "KCNQ1", target: "CFTR", value: 1 },
    { source: "SLC12A2", target: "SLC4A4", value: 1 },
    { source: "ATP2B1", target: "ATP1A1", value: 1 }
  ],
  metadata: {
    title: "Membrane Transport",
    description: "Key membrane transport proteins and their interactions",
    groups: {
      pump: { color: "#F56565" },
      channel: { color: "#4299E1" },
      transporter: { color: "#48BB78" },
      cotransporter: { color: "#ED8936" },
      exchanger: { color: "#9F7AEA" }
    }
  }
};

export const cellCycleData: PathwayData = {
  nodes: [
    { id: "CCND1", label: "Cyclin D1", group: "cyclin" },
    { id: "CDK4", label: "CDK4", group: "kinase" },
    { id: "CDKN1A", label: "p21", group: "inhibitor" },
    { id: "CDKN1B", label: "p27", group: "inhibitor" },
    { id: "RB1", label: "Rb", group: "checkpoint" },
    { id: "E2F1", label: "E2F1", group: "transcription" },
    { id: "CCNE1", label: "Cyclin E1", group: "cyclin" },
    { id: "CDK2", label: "CDK2", group: "kinase" }
  ],
  links: [
    { source: "CCND1", target: "CDK4", value: 2 },
    { source: "CDK4", target: "RB1", value: 2 },
    { source: "RB1", target: "E2F1", value: 1 },
    { source: "E2F1", target: "CCNE1", value: 1 },
    { source: "CCNE1", target: "CDK2", value: 2 },
    { source: "CDKN1A", target: "CDK2", value: 1 },
    { source: "CDKN1B", target: "CDK4", value: 1 }
  ],
  metadata: {
    title: "Cell Cycle Control",
    description: "Key regulators in the G1/S transition of the cell cycle",
    groups: {
      cyclin: { color: "#F56565" },
      kinase: { color: "#4299E1" },
      inhibitor: { color: "#48BB78" },
      checkpoint: { color: "#ED8936" },
      transcription: { color: "#9F7AEA" }
    }
  }
};

export const membraneTraffickingData: PathwayData = {
  nodes: [
    { id: "COPII", label: "COPII Complex", group: "complex" },
    { id: "COPI", label: "COPI Complex", group: "complex" },
    { id: "SEC23", label: "SEC23", group: "transport" },
    { id: "SEC24", label: "SEC24", group: "transport" },
    { id: "RAB1", label: "RAB1", group: "gtpase" },
    { id: "ARF1", label: "ARF1", group: "gtpase" },
    { id: "ERGIC", label: "ERGIC", group: "compartment" },
    { id: "GOLGI", label: "Golgi", group: "compartment" },
    { id: "ER", label: "ER", group: "compartment" },
    { id: "CLATHRIN", label: "Clathrin", group: "coat" },
    { id: "AP2", label: "AP-2", group: "adaptor" },
    { id: "DNM2", label: "Dynamin-2", group: "gtpase" }
  ],
  links: [
    { source: "ER", target: "COPII", value: 1 },
    { source: "COPII", target: "SEC23", value: 2 },
    { source: "COPII", target: "SEC24", value: 2 },
    { source: "SEC23", target: "RAB1", value: 1 },
    { source: "RAB1", target: "ERGIC", value: 1 },
    { source: "ERGIC", target: "COPI", value: 1 },
    { source: "COPI", target: "ARF1", value: 2 },
    { source: "ARF1", target: "GOLGI", value: 1 },
    { source: "GOLGI", target: "CLATHRIN", value: 1 },
    { source: "CLATHRIN", target: "AP2", value: 2 },
    { source: "AP2", target: "DNM2", value: 1 }
  ],
  metadata: {
    title: "Membrane Trafficking",
    description: "Vesicular transport between cellular compartments",
    groups: {
      complex: { color: "#805AD5" },      // Purple
      transport: { color: "#3182CE" },    // Blue
      gtpase: { color: "#DD6B20" },       // Orange
      compartment: { color: "#38A169" },  // Green
      coat: { color: "#E53E3E" },         // Red
      adaptor: { color: "#D69E2E" }       // Yellow
    }
  }
}; 