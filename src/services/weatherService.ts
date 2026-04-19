export async function getAQIForecast(lat: number, lon: number) {
  const res = await fetch(
    `/api/open-meteo/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index`,
  );

  if (!res.ok) {
    throw new Error(`Open-Meteo request failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.hourly ?? null;
}
