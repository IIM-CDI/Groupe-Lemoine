
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
const strapiServerUrl = process.env.STRAPI_URL;

export async function fetchStrapi(path: string, options: RequestInit = {}) {
  const res = await fetch(`${strapiUrl}${path}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) throw new Error(`Strapi error: ${res.status}`);

  return res.json();
}
