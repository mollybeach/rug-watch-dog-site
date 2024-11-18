import { NextResponse } from 'next/server';
import { rnaSeqData } from '@/app/data/rna_seq_data';

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
