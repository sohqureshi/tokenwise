export function compact(data: any): string {
  if (Array.isArray(data)) {
    return data.map(d => Object.values(d).join(",")).join(";");
  }

  if (data && typeof data === "object") {
    return Object.values(data).join(",");
  }

  return String(data);
}
