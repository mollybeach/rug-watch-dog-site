/**
 * @title RNA-Seq Data
 * @fileoverview RNA-seq data for CsA and VOC treatments
 * @path /app/data/rna_seq_data.ts
 */

export type GeneData = {
  geneName: string;
  logFC: number;
  pValue: number;
  fdr: number;
  significant: boolean;
};

export type RNASeqData = {
  CsA: GeneData[];
  VOC: GeneData[];
};

// DEG Diagram Mock Data
export const rnaSeqData: RNASeqData = {
  CsA: [
    // Significant DEGs from CsA vs Control comparison (Cell Cycle pathway)
    { geneName: "CDC20", logFC: 2.3, pValue: 2.788e-17, fdr: 2.5e-16, significant: true },
    { geneName: "CCNB1", logFC: 2.0, pValue: 3.5e-16, fdr: 3.2e-15, significant: true },
    { geneName: "HSPA5", logFC: 2.1, pValue: 1e-16, fdr: 1e-15, significant: true },
    { geneName: "DDIT3", logFC: 1.8, pValue: 2e-15, fdr: 1.8e-14, significant: true },
    { geneName: "ATF4", logFC: -1.9, pValue: 3e-14, fdr: 2.7e-13, significant: true },
    { geneName: "XBP1", logFC: 1.7, pValue: 5e-13, fdr: 4.5e-12, significant: true },
    { geneName: "CALR", logFC: 1.5, pValue: 1e-12, fdr: 9e-12, significant: true },
    // Non-significant genes
    { geneName: "GENE1", logFC: 0.2, pValue: 0.3, fdr: 0.35, significant: false },
    { geneName: "GENE2", logFC: -0.3, pValue: 0.4, fdr: 0.45, significant: false },
    // Add more CsA DEGs here...
  ],
  VOC: [
    // Significant DEGs from VOC vs Control comparison (Protein Processing in ER)
    { geneName: "HSP90B1", logFC: 1.9, pValue: 2.604e-16, fdr: 2.4e-15, significant: true },
    { geneName: "HSPA5", logFC: 1.7, pValue: 3.2e-15, fdr: 2.9e-14, significant: true },
    { geneName: "CANX", logFC: 1.6, pValue: 4.1e-14, fdr: 3.7e-13, significant: true },
    { geneName: "PDIA3", logFC: 1.5, pValue: 5.5e-13, fdr: 5e-12, significant: true },
    { geneName: "BiP", logFC: 2.1, pValue: 1.002e-6, fdr: 9.1e-6, significant: true },
    { geneName: "PERK", logFC: 1.8, pValue: 2.099e-6, fdr: 1.9e-5, significant: true },
    // Non-significant genes
    { geneName: "GENE3", logFC: 0.1, pValue: 0.6, fdr: 0.65, significant: false },
    { geneName: "GENE4", logFC: -0.2, pValue: 0.5, fdr: 0.55, significant: false },
    // Add more VOC DEGs here...
  ]
}; 