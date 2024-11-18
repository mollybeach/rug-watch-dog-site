/**
 * @title Differential Expression Data API
 * @fileoverview Differential expression data API
 * @path /app/api/routes/differential-expression/route.ts
 */

import { NextResponse } from 'next/server';
import { differentialExpressionMockData } from '@/lib/data/differential_expression_data';

export async function GET() {
  // Return the mock data for differential expression
  return NextResponse.json(differentialExpressionMockData);
}