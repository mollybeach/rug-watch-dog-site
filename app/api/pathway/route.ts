/**
 * @title Pathway Data API
 * @fileoverview Pathway data API
 * @path /pathway/route.ts
 */

import { NextResponse } from 'next/server';
import { proteinProcessingData, cellCycleData, membraneTraffickingData } from '@/lib/data/pathway_data';
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
      data = proteinProcessingData;
      break;
    case 'cell-cycle':
      data = cellCycleData;
      break;
    case 'membrane-trafficking':
      data = membraneTraffickingData;
      break;
    default:
      return NextResponse.json({ error: 'Invalid pathway' }, { status: 400 });
  }

  return NextResponse.json(data);
}