import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const fredKey = process.env.FRED_API_KEY;
  const finnhubKey = process.env.FINNHUB_API_KEY;
  
  // Don't expose full keys — just show if they exist and first 4 chars
  return NextResponse.json({
    FRED_API_KEY: fredKey ? `set (${fredKey.substring(0, 4)}...)` : 'NOT SET',
    FINNHUB_API_KEY: finnhubKey ? `set (${finnhubKey.substring(0, 4)}...)` : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
  });
}
