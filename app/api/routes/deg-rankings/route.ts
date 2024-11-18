/**
 * @title DEG Rankings Data API
 * @fileoverview DEG rankings data API
 * @path /app/api/routes/deg-rankings/route.ts
 */

import { NextResponse } from 'next/server';
import { rnaSeqData } from '@/lib/data/rna_seq_data';

export const runtime = 'edge';

export async function GET() {
  // Combine CsA and VOC data and add treatment info and unique ID
  const allGenes = [
    ...rnaSeqData.CsA.map(gene => ({ 
      ...gene, 
      treatment: 'CsA',
      id: `${gene.geneName}_CsA` // Add unique ID
    })),
    ...rnaSeqData.VOC.map(gene => ({ 
      ...gene, 
      treatment: 'VOC',
      id: `${gene.geneName}_VOC` // Add unique ID
    }))
  ];

  // Sort by absolute logFC value
  allGenes.sort((a, b) => Math.abs(b.logFC) - Math.abs(a.logFC));

  // Add rank property
  const rankedGenes = allGenes.map((gene, index) => ({
    ...gene,
    rank: index + 1
  }));

  return NextResponse.json(rankedGenes);
}
