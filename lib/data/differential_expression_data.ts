/**
 * @title Differential Expression Data
 * @fileoverview Differential expression data
 * @path /lib/data/differential_expression_data.ts
 */
import { VolcanoDataPointType} from "@/types/types";
import { geneData } from "./gene_data";

  const formattedData = geneData.map((gene) => ({
    gene: gene.gene,
    logFC: parseFloat(gene.logfc.toFixed(3)),
    pValue: parseFloat(gene.adjpv.toFixed(3))
  }));




export const differentialExpressionData: VolcanoDataPointType[] = formattedData;
 