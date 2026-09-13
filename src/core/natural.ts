/**
 * Converts JSON into natural language story format.
 *
 * Goal:
 * - Transform structured data into human-readable narratives
 * - Identify subjects (names, users) and describe their properties
 * - Support arrays, nested objects, and primitive types
 * - Skip technical metadata fields for cleaner output
 *
 * @param data - Input JSON data
 * @returns Natural language story string
 *
 * Example:
 * Input:
 * {
 *   "user": {
 *     "name": "Alice Johnson",
 *     "email": "alice@example.com",
 *     "skills": ["Python", "JavaScript"]
 *   }
 * }
 *
 * Output:
 * "User Alice Johnson (email: alice@example.com, Having Python and JavaScript)."
 */

export function toNatural(data: any, depth: number = 0): string {
  if (data === null || data === undefined) return "nothing";
  if (typeof data === 'string') return data;
  if (typeof data === 'number') return String(data);
  if (typeof data === 'boolean') return data ? "yes" : "no";

  if (Array.isArray(data)) {
    if (data.length === 0) return "empty list";

    if (data.every(isPlainObject)) {
      return data
        .map((item, index) => `${index + 1}. ${stripTrailingPeriod(toNatural(item, depth + 1))}.`)
        .join(" ");
    }

    // Join array items with proper grammar
    const items = data.map((item) => toNatural(item, depth + 1));
    return joinNaturalList(items);
  }

  if (typeof data === 'object') {
    return buildContextualStory(data, depth);
  }

  return String(data);
}

/**
 * Builds a contextual story from an object
 */
function buildContextualStory(obj: any, depth: number = 0): string {
  const semanticStory = buildSemanticStory(obj);
  if (semanticStory) return semanticStory;

  const nestedEntity = Object.values(obj).find((value): value is Record<string, any> => {
    return isPlainObject(value) && buildSemanticStory(value) !== null;
  });
  if (nestedEntity) {
    const nestedStory = buildSemanticStory(nestedEntity);
    if (nestedStory) return nestedStory;
  }

  // Look for a name in nested objects first (like 'user' or 'profile')
  let name = obj.name || obj.userName || obj.user;

  // If name is an object, extract the name property from it
  if (typeof name === 'object' && name !== null && name.name) {
    name = name.name;
  }

  // Get all entries, including nested objects but not certain meta fields
  const entries = Object.entries(obj).filter(([key]) => {
    // Skip technical/meta fields at root level
    return !['id', 'timestamp', 'apiKey'].includes(key);
  });

  if (entries.length === 0) return "";

  // Start with subject if name exists
  let story = name && typeof name === 'string' ? `User ${name}` : "";

  // Build property clauses
  const clauses = entries
    .map(([key, value]) => {
      // If this is a 'user' object and we already used the name, extract its properties
      if (key === 'user' && name && typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const userProps = Object.entries(value as Record<string, any>)
          .filter(([k]) => !['id', 'name', 'timestamp', 'apiKey'].includes(k))
          .map(([k, v]) => formatPropertyClause(k, v, depth + 1))
          .filter((c) => c !== null && c !== "")
          .join(", ");
        return userProps ? `(${userProps})` : null;
      }
      return formatPropertyClause(key, value, depth);
    })
    .filter((c) => c !== null && c !== "");

  if (clauses.length === 0) return story;

  // Combine with proper punctuation
  if (story) {
    story += " " + clauses.join(", ");
  } else {
    story = clauses.join(", ");
  }

  return story + ".";
}

/**
 * Uses the relationships expressed by well-known fields to form concise
 * sentences. Unknown shapes continue through the generic key-value fallback.
 */
function buildSemanticStory(obj: Record<string, any>): string | null {
  if (typeof obj.holderName === "string" && typeof obj.policyNumber === "string") {
    const subject = `${obj.holderName} has policy ${obj.policyNumber}`;
    const details = [
      typeof obj.planType === "string" ? `a ${obj.planType} plan` : null,
      typeof obj.premiumAmount === "number" ? `with a premium of ${formatNumber(obj.premiumAmount)}` : null,
    ].filter((value): value is string => value !== null);
    const sentences = [`${subject}${details.length ? `, ${details.join(", ")}` : ""}.`];

    if (isPlainObject(obj.claim)) {
      const claim = describeClaim(obj.claim);
      if (claim) sentences.push(claim);
    }

    if (Array.isArray(obj.dependents) && obj.dependents.length > 0) {
      sentences.push(`${obj.holderName}'s dependents are ${joinNaturalList(obj.dependents.map(String))}.`);
    }

    return sentences.join(" ");
  }

  const subject = findSubject(obj);
  const stateEntry = findEntry(obj, [
    "status",
    "state",
    "condition",
    "stage",
    "role",
    "type",
    "category",
    "classification",
    "priority",
    "phase",
    "mode",
    "availability",
    "outcome",
    "result",
    "health",
    "progress",
    "visibility",
    "access",
    "membership",
    "sentiment",
    "severity",
  ]);
  if (subject && stateEntry && typeof stateEntry[1] === "string") {
    const details = Object.entries(obj)
      .filter(([key, value]) => key !== stateEntry[0] && key !== subject.key && shouldDescribeSemantically(key, value))
      .map(([key, value]) => `${camelToWords(key)} ${formatSemanticValue(value)}`);

    return `${subject.value} is ${stateEntry[1]}${details.length ? ` and has ${details.join(", ")}` : ""}.`;
  }

  return null;
}

function findSubject(obj: Record<string, any>): { key: string; value: string } | null {
  const subjectKeys = ["name", "title", "label", "ownerName", "customerName", "accountName"];
  for (const key of subjectKeys) {
    if (typeof obj[key] === "string" && obj[key].trim()) {
      return { key, value: obj[key].trim() };
    }
  }
  return null;
}

function findEntry(obj: Record<string, any>, keys: string[]): [string, any] | null {
  return Object.entries(obj).find(([key]) => keys.includes(key)) ?? null;
}

function shouldDescribeSemantically(key: string, value: unknown): boolean {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) && !["id", "timestamp", "createdAt", "updatedAt", "apiKey", "debug"].includes(key);
}

function formatSemanticValue(value: unknown): string {
  if (typeof value === "number") return formatNumber(value);
  if (typeof value === "boolean") return value ? "enabled" : "disabled";
  return String(value);
}

function describeClaim(claim: Record<string, any>): string | null {
  const parts: string[] = [];
  if (typeof claim.status === "string") parts.push(`The claim is ${claim.status}`);
  if (typeof claim.requestedAmount === "number") {
    parts.push(`for ${formatNumber(claim.requestedAmount)}`);
  }
  if (typeof claim.claimNumber === "string") {
    parts.push(`(reference ${claim.claimNumber})`);
  }
  return parts.length ? `${parts.join(" ")}.` : null;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/**
 * Formats a single property into a natural language clause
 */
function formatPropertyClause(key: string, value: any, depth: number): string | null {
  const naturalKey = camelToWords(key);

  // Handle nested objects
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    // Skip technical objects
    if (['internal', 'metadata', 'debug'].includes(key)) {
      return null;
    }

    const nested = Object.entries(value)
      .filter(([k]) => !['id', 'timestamp', 'apiKey', 'createdAt', 'updatedAt'].includes(k))
      .map(([k, v]) => {
        if (typeof v === 'object' && v !== null) {
          return formatPropertyClause(k, v, depth + 1);
        }

        const propValue = toNatural(v, depth + 1);
        if (propValue === "yes" || propValue === "no") {
          return `${camelToWords(k)} ${propValue === "yes" ? "enabled" : "disabled"}`;
        }
        return `${camelToWords(k)} ${propValue}`;
      })
      .filter((c) => c && c.trim())
      .join(", ");

    if (!nested) return null;
    // Don't wrap in extra parentheses - let the parent handle it
    return `${naturalKey}: ${nested}`;
  }

  // Handle arrays
  if (Array.isArray(value)) {
    if (value.length === 0) return null;

    // Special case: skills/hobbies/etc should use "Having"
    if (
      ['skills', 'hobbies', 'interests', 'tags', 'languages', 'items'].includes(key)
    ) {
      const items = value
        .map((item) => {
          const str = String(item);
          // Capitalize first letter
          return str.charAt(0).toUpperCase() + str.slice(1);
        });
      return `Having ${joinNaturalList(items)}`;
    }

    // For other arrays, just list the items
    const items = joinNaturalList(value.map((item) => toNatural(item, depth + 1)));
    return `${naturalKey}: ${items}`;
  }

  // Handle primitives with context
  const naturalValue = toNatural(value, depth + 1);

  if (naturalValue === "yes") return `${naturalKey} enabled`;
  if (naturalValue === "no") return `${naturalKey} disabled`;

  // Special patterns
  if (key === 'theme') return `prefers the ${naturalValue} ${key}`;
  if (key === 'age') return `age: ${naturalValue}`;
  if (key === 'email') return `email: ${naturalValue}`;
  if (key === 'city') return `address: ${naturalValue}`;
  if (key === 'debug' && naturalValue === "yes") return `debug enabled`;

  return `${naturalKey}: ${naturalValue}`;
}

/**
 * Converts camelCase to readable words
 */
function camelToWords(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .trim();
}

function isPlainObject(value: any): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function joinNaturalList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;

  const lastItem = items[items.length - 1];
  return `${items.slice(0, -1).join(", ")} and ${lastItem}`;
}

function stripTrailingPeriod(value: string): string {
  return value.replace(/\.+$/, "");
}
