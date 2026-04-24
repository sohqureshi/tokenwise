import { describe, it, expect } from "vitest";
import { toTOON } from "../src/core/toon";
import { analyze } from "../src/core/analyze";

describe("TOON format conversion", () => {
  it("should convert simple object to TOON format", () => {
    const input = {
      user: {
        name: "Ali",
        age: 11,
      },
    };

    const output = toTOON(input);

    expect(output).toContain("user:");
    expect(output).toContain("name: Ali");
    expect(output).toContain("age: 11");
  });

  it("should convert array of objects into tabular TOON format", () => {
    const input = {
      hikes: [
        { id: 1, name: "Blue Lake", distance: 7.5 },
        { id: 2, name: "Ridge", distance: 9.2 },
      ],
    };

    const output = toTOON(input);

    expect(output).toContain("hikes[2]{id,name,distance}:");
    expect(output).toContain("1,Blue Lake,7.5");
    expect(output).toContain("2,Ridge,9.2");
  });

  it("should handle empty array", () => {
    const input = {
      items: [],
    };

    const output = toTOON(input);

    expect(output).toContain("[]");
  });

  it("should handle primitive values", () => {
    const input = {
      name: "Ali",
      age: 11,
    };

    const output = toTOON(input);

    expect(output).toContain("name: Ali");
    expect(output).toContain("age: 11");
  });
});

describe("Analyze function", () => {
  it("should return token savings", () => {
    const input = {
      user: {
        id: "123",
        name: "Ali",
        createdAt: "2024-01-01",
      },
    };

    const result = analyze(input);

    expect(result).toHaveProperty("jsonSize");
    expect(result).toHaveProperty("toonSize");
    expect(result).toHaveProperty("savings");

    expect(typeof result.jsonSize).toBe("number");
    expect(typeof result.toonSize).toBe("number");
    expect(result.savings).toMatch(/%/);
  });

  it("should reduce size compared to JSON", () => {
    const input = {
      users: [
        { id: 1, name: "Ali", age: 11 },
        { id: 2, name: "John", age: 12 },
      ],
    };

    const result = analyze(input);

    expect(result.toonSize).toBeLessThan(result.jsonSize);
  });
});