import { NextResponse } from 'next/server';
import { strapiServerHeaders } from '@/lib/strapiServerHeaders';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, '');

export async function GET() {
  try {
    if (!strapiUrl) throw new Error("STRAPI_URL not set");

    const res = await fetch(`${strapiUrl}/api/job-offers`, {
      headers: strapiServerHeaders(),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `Strapi error: ${res.status}`, details: text },
        { status: res.status }
      );
    }

    const json = await res.json();
    return NextResponse.json({ data: json.data });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    const isStrapiUnavailable =
      errorMessage.includes('ECONNREFUSED') ||
      errorMessage.includes('fetch failed') ||
      errorMessage.includes('connect');

    if (isStrapiUnavailable) {
      return NextResponse.json(
        { error: 'Strapi is not ready yet. Please retry in a few seconds.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}