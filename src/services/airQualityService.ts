export async function getCityAQI(city: string) {
  const apiKey = import.meta.env.VITE_OPENAQ_API_KEY;

  if (!apiKey) {
    return [];
  }

  // OpenAQ v2 was retired in January 2025. This service is kept as an
  // optional enrichment path when a v3-compatible integration is configured.
  const res = await fetch(`/api/openaq/v3/locations?limit=1&name=${encodeURIComponent(city)}`, {
    headers: {
      "X-API-Key": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error(`OpenAQ request failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.results ?? [];
}
