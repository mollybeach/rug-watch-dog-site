/**
 * @title Differential Expression Data API
 * @fileoverview Differential expression data API
 * @path /differential-expression/route.ts
 */
export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { differentialExpressionMockData } from '@/lib/data/differential_expression_data';

export async function GET() {
  // Return the mock data for differential expression
  return NextResponse.json(differentialExpressionMockData);
}