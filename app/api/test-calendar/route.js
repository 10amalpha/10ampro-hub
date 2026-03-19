import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.FMP_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'No FMP_API_KEY' });

  const today = new Date();
  const from = today.toISOString().split('T')[0];
  const toDate = new Date(today.getTime() + 3 * 86400000);
  const to = toDate.toISOString().split('T')[0];

  const url = `https://financialmodelingprep.com/stable/economic-calendar?from=${from}&to=${to}&apikey=${apiKey}`;

  try {
    const res = await fetch(url);
    const status = res.status;
    const text = await res.text();
    return NextResponse.json({
      url: url.replace(apiKey, '***'),
      status,
      bodyLength: text.length,
      bodyPreview: text.substring(0, 500),
    });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}
