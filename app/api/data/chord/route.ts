/**
 * @title Chord Diagram Data API
 * @fileoverview Chord diagram data API
 * @path /app/api/data/chord/route.ts
 */

import { NextResponse } from 'next/server';
import { geneExpressionChordData } from '@/app/data/chord_data';

// Chord diagram data API
export async function GET() {
  try {
    return NextResponse.json(geneExpressionChordData, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch chord data: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to fetch chord data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Here you could add logic to filter/transform the chord data based on body parameters
    const filteredData = body.filter ? geneExpressionChordData : geneExpressionChordData;
    
    return NextResponse.json(filteredData, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: `Failed to process chord data request: ${error}` },
      { status: 500 }
    );
  }
}
