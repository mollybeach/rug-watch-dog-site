/**
 * @title Pathway Data API
 * @fileoverview Pathway data API
 * @path /app/api/routes/pathway/route.ts
 */

import { NextResponse } from 'next/server';
import { proteinProcessingData, cellCycleData, membraneTraffickingData } from '@/lib/data/pathway_data';

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