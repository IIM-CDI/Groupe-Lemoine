import { NextResponse } from 'next/server';
import { strapiServerHeaders } from '@/lib/strapiServerHeaders';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, '');

export async function GET() {
  try {
    if (!strapiUrl) throw new Error('STRAPI_URL not set');

    const res = await fetch(`${strapiUrl}/api/contact-form`, {
      headers: strapiServerHeaders(),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `Strapi error: ${res.status}`, details: text },
        { status: res.status },
      );
    }

    const json = await res.json();
    return NextResponse.json(json);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
