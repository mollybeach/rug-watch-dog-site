import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data for testing
  const data = Array.from({ length: 100 }, (_, i) => ({
    gene: `Gene${i}`,
    logFC: (Math.random() - 0.5) * 5,  // Random values between -2.5 and 2.5
    pValue: Math.random() * 0.1        // Random values between 0 and 0.1
  }));

  return NextResponse.json(data);
}