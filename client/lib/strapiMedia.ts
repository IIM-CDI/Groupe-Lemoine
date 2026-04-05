const strapiBase = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, '') ?? '';

function resolveAbsoluteMediaUrl(pathOrUrl: string | null | undefined): string | null {
  if (!pathOrUrl) return null;
  const s = pathOrUrl.trim();
  if (!s) return null;
  if (/^https?:\/\//i.test(s)) return s;
  if (!strapiBase) return s.startsWith('/') ? s : `/${s}`;
  return `${strapiBase}${s.startsWith('/') ? s : `/${s}`}`;
}

export function strapiMediaSrc(pathOrUrl: string | null | undefined): string {
  const absolute = resolveAbsoluteMediaUrl(pathOrUrl);
  if (!absolute) return '';

  if (!strapiBase) {
    return absolute;
  }

  let allowedOrigin: string;
  let assetOrigin: string;
  try {
    allowedOrigin = new URL(strapiBase.endsWith('/') ? strapiBase : `${strapiBase}/`).origin;
    assetOrigin = new URL(absolute).origin;
  } catch {
    return absolute;
  }

  if (assetOrigin === allowedOrigin) {
    return `/api/strapi-asset?url=${encodeURIComponent(absolute)}`;
  }

  return absolute;
}
