/**
 * Converts JSON into TOON-like (Token-Oriented Object Notation) format.
 *
 * Goal:
 * - Remove repeated keys
 * - Represent arrays as table-like structure
 * - Reduce token usage for LLMs
 *
 * @param data - Input JSON
 * @param indent - Internal indentation level
 * @returns Token-efficient string format
 *
 * Example:
 * Input:
 * {
 *   users: [{ id: 1, name: "Ali" }]
 * }
 *
 * Output:
 * users[1]{id,name}:
 * 1,Ali
 */
export function toTOON(data: any, indent = 0): string {
  const space = "  ".repeat(indent);

  // Handle arrays
  if (Array.isArray(data)) {
    if (data.length === 0) return "[]";

    // Extract schema from object rows
    if (data.every(isPlainObject)) {
      const keys = Array.from(
        new Set(data.flatMap((item) => Object.keys(item)))
      );

      let result = `${space}[${data.length}]{${keys.join(",")}}:\n`;

      for (const item of data) {
        result +=
          space +
          "  " +
          keys.map((k) => formatValue(item[k])).join(",") +
          "\n";
      }

      return result;
    }

    // Primitive array
    return `${space}[${data.length}]: ${data.join(",")}`;
  }

  // Handle objects
  if (typeof data === "object" && data !== null) {
    let result = "";

    for (const key in data) {
      const value = data[key];

      if (typeof value === "object" && value !== null) {
        result += `${space}${key}:\n${toTOON(value, indent + 1)}\n`;
      } else {
        const formatted = formatValue(value);
        result += formatted
          ? `${space}${key}: ${formatted}\n`
          : `${space}${key}:\n`;
      }
    }

    return result.trim();
  }

  return formatValue(data);
}

/**
 * Formats values for TOON output.
 */
function formatValue(val: any): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  return String(val);
}

function isPlainObject(value: any): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
