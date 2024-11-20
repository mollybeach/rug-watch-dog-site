/**
 * @title Pathway Data API
 * @fileoverview Pathway data API
 * @path /pathway/route.ts
 */

import { NextResponse } from 'next/server';
import { 
  proteinProcessingPathwayData, 
  cellCyclePathwayData, 
  dnaReplicationPathwayData, 
  progesteroneMediatedOocyteMaturationPathwayData, 
  baseExcisionRepairPathwayData, 
  thyroidHormoneSynthesisPathwayData, 
  antigenProcessingAndPresentationPathwayData, 
  atpDependentChromatinRemodelingPathwayData, 
  proteinExportPathwayData, 
  oocyteMeiosisPathwayData, 
  nucleocytoplasmicTransportPathwayData, 
  ferroptosisPathwayData, 
  mismatchRepairPathwayData, 
  gapJunctionPathwayData, 
  smallCellLungCancerPathwayData 
} from '@/lib/data/pathway_data';

export const runtime = 'edge';
export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every 60 seconds

// Pathway data API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pathway = searchParams.get('pathway');

  let data;
  switch (pathway) {
    case 'protein-processing':
      data = proteinProcessingPathwayData;
      break;
    case 'Cell cycle':
      data = cellCyclePathwayData;
      break;
    case 'DNA replication':
      data = dnaReplicationPathwayData;
      break;
    case 'progesterone-mediated-oocyte-maturation':
      data = progesteroneMediatedOocyteMaturationPathwayData;
      break;
    case 'base-excision-repair':
      data = baseExcisionRepairPathwayData;
      break;
    case 'thyroid-hormone-synthesis':
      data = thyroidHormoneSynthesisPathwayData;
      break;
    case 'Antigen processing and presentation':
      data = antigenProcessingAndPresentationPathwayData;
      break;
    case 'atp-dependent-chromatin-remodeling':
      data = atpDependentChromatinRemodelingPathwayData;
      break;
    case 'protein-export':
      data = proteinExportPathwayData;
      break;
    case 'oocyte-meiosis':
      data = oocyteMeiosisPathwayData;
      break;
    case 'nucleocytoplasmic-transport':
      data = nucleocytoplasmicTransportPathwayData;
      break;
    case 'ferroptosis':
      data = ferroptosisPathwayData;
      break;
    case 'mismatch-repair':
      data = mismatchRepairPathwayData;
      break;
    case 'gap-junction':
      data = gapJunctionPathwayData;
      break;
    case 'Small cell lung cancer':
      data = smallCellLungCancerPathwayData;
      break;
    default:
      return NextResponse.json({ error: 'Invalid pathway' }, { status: 400 });
  }

  return NextResponse.json(data);
}