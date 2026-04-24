/**
 * Flattens nested JSON into key-value pairs using dot notation.
 *
 * Useful for:
 * - Search indexing
 * - AI prompt simplification
 *
 * @param obj - Input object
 * @param prefix - Used internally for recursion
 * @returns Array of flattened key=value strings
 *
 * Example:
 * flatten({ user: { name: "Ali" } })
 * → ["user.name=Ali"]
 */
export function flatten(obj: any, prefix = ""): string[] {
  let result: string[] = [];

  for (let key in obj) {
    const value = obj[key];

    // Create nested key path
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && value !== null) {
      // Recursively flatten nested objects
      result.push(...flatten(value, newKey));
    } else {
      result.push(`${newKey}=${value}`);
    }
  }

  return result;
}