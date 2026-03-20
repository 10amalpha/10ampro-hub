// /api/insights — external access to AI-generated insights
// Reuses shared logic from lib/insights.js

export const dynamic = 'force-dynamic';
export const revalidate = 28800;

import { NextResponse } from 'next/server';
import { getInsights } from '../../lib/insights';

export async function GET() {
  const insights = await getInsights();
  return NextResponse.json({
    insights,
    generated: insights.length > 1,
    fetchedAt: new Date().toISOString(),
  });
}
