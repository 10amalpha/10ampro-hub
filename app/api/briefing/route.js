// /api/briefing — External access to briefing data
// Reuses shared logic from lib/briefing.js
// page.jsx calls lib/briefing.js directly (not this route)

export const dynamic = 'force-dynamic';
export const revalidate = 300;

import { NextResponse } from 'next/server';
import { getBriefingData } from '../../lib/briefing';

export async function GET() {
  try {
    const data = await getBriefingData();
    return NextResponse.json({ ...data, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch briefing data' }, { status: 500 });
  }
}
