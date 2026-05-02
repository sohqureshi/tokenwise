type PruneOptions = {
  removeKeys?: string[];
  removeNull?: boolean;
  removeUndefined?: boolean;
  removeEmptyObjects?: boolean;
  removeEmptyArrays?: boolean;
};

type PruneInput = PruneOptions | string[];

export function prune(
  obj: any,
  options: PruneInput = {}
): any {
  const normalizedOptions: PruneOptions = Array.isArray(options)
    ? { removeKeys: options }
    : options;

  const {
    removeKeys = [],
    removeNull = true,
    removeUndefined = true,
    removeEmptyObjects = true,
    removeEmptyArrays = false,
  } = normalizedOptions;

  // Primitive values → return as is
  if (obj === null) return removeNull ? undefined : obj;
  if (obj === undefined) return removeUndefined ? undefined : obj;
  if (typeof obj !== "object") return obj;

  // Array handling
  if (Array.isArray(obj)) {
    const arr = obj
      .map((item) => prune(item, normalizedOptions))
      .filter((item) => item !== undefined);

    if (removeEmptyArrays && arr.length === 0) {
      return undefined;
    }

    return arr;
  }

  // Object handling
  const result: any = {};

  for (const key in obj) {
    if (removeKeys.includes(key)) continue;

    const value = prune(obj[key], normalizedOptions);

    if (value === undefined) continue;

    if (
      removeEmptyObjects &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0
    ) {
      continue;
    }

    result[key] = value;
  }

  return result;
}
