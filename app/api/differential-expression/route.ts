/**
 * @title Differential Expression Data API
 * @fileoverview Differential expression data API
 * @path /differential-expression/route.ts
 */

import { NextResponse } from 'next/server';
import { differentialExpressionMockData } from '@/lib/data/differential_expression_data';
export const runtime = 'edge';
export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every 60 seconds
export async function GET() {
  // Return the mock data for differential expression
  return NextResponse.json(differentialExpressionMockData);
}