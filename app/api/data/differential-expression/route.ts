/**
 * @title Differential Expression Data API
 * @fileoverview Differential expression data API
 * @path /app/api/data/differential-expression/route.ts
 */

import { NextResponse } from 'next/server';
import { differentialExpressionMockData } from '@/app/data/differential_expression_data';

export async function GET() {
  // Return the mock data for differential expression
  return NextResponse.json(differentialExpressionMockData);
}