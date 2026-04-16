export function prune(obj: any, keys: string[]): any {
  if (Array.isArray(obj)) return obj.map(i => prune(i, keys));

  if (obj && typeof obj === "object") {
    const res: any = {};
    for (const k in obj) {
      if (!keys.includes(k)) res[k] = prune(obj[k], keys);
    }
    return res;
  }

  return obj;
}
