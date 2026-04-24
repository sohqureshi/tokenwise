export function toTOON(data: any, indent = 0): string {
  const space = "  ".repeat(indent);

  if (Array.isArray(data)) {
    if (data.length === 0) return "[]";

    // Check if uniform objects
    if (typeof data[0] === "object") {
      const keys = Object.keys(data[0]);

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

    return `${space}[${data.length}]: ${data.join(",")}`;
  }

  if (typeof data === "object" && data !== null) {
    let result = "";

    for (const key in data) {
      const value = data[key];

      if (typeof value === "object") {
        result += `${space}${key}:\n${toTOON(value, indent + 1)}\n`;
      } else {
        result += `${space}${key}: ${formatValue(value)}\n`;
      }
    }

    return result.trim();
  }

  return formatValue(data);
}

function formatValue(val: any): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  return String(val);
}