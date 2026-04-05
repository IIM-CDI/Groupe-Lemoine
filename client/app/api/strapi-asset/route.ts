import { NextRequest, NextResponse } from 'next/server';

const strapiBase = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, '');

export async function GET(req: NextRequest) {
  try {
    const raw = req.nextUrl.searchParams.get('url');
    if (!raw || !strapiBase) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    let target: string;
    try {
      target = decodeURIComponent(raw);
    } catch {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    let allowedOrigin: string;
    let targetOrigin: string;
    try {
      allowedOrigin = new URL(strapiBase.endsWith('/') ? strapiBase : `${strapiBase}/`).origin;
      targetOrigin = new URL(target).origin;
    } catch {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    if (targetOrigin !== allowedOrigin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const res = await fetch(target, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream ${res.status}` },
        { status: res.status },
      );
    }

    const contentType = res.headers.get('content-type') ?? 'application/octet-stream';
    const buf = await res.arrayBuffer();
    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
