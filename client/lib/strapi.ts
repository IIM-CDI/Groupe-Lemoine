
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
const strapiServerUrl = process.env.STRAPI_URL;

export async function fetchStrapi(path: string, options: RequestInit = {}) {
  const res = await fetch(`${strapiUrl}${path}`, {
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) throw new Error(`Strapi error: ${res.status}`);
  const json = await res.json();
  return json.data;
}



export async function fetchStrapiServer(path: string, options: RequestInit = {}) {
  const res = await fetch(`${strapiServerUrl}${path}`, {
    ...options,
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Strapi error: ${res.status}`);
  const json = await res.json();
  return json.data;
}