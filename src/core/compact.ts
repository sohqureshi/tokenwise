export function compact(data: any): string {
  if (!data) return "";

  if (Array.isArray(data)) {
    return data.map(item => compact(item)).join(";");
  }

  if (typeof data === "object") {
    return Object.entries(data)
      .map(([k, v]) => `${k}:${compact(v)}`)
      .join(",");
  }

  return String(data);
}