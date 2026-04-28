import { describe, it, expect } from 'vitest';
import { analyze } from '../core/analyze';   // ← Fixed import path

describe('analyze()', () => {
  
  it('should calculate savings correctly for small input', () => {
    const input = { a: "test" };

    const result = analyze(input);

    expect(result.savings).toBeGreaterThanOrEqual(0);
    expect(result.originalTokens).toBeGreaterThan(0);
    expect(result.optimizedTokens).toBeGreaterThan(0);
    expect(result.savingsPercent).toBeGreaterThanOrEqual(0);
  });

  it('should return 0 savings when no optimization options are passed', () => {
    const input = { name: "Alice", age: 25 };

    const result = analyze(input);

    expect(result.savings).toBe(0);
    expect(result.savingsPercent).toBe(0);
  });

  it('should show positive savings when toTOON is enabled', () => {
    const input = {
      users: [
        { id: 1, name: "Alice", debug: true, createdAt: "2025-04-01" },
        { id: 2, name: "Bob", debug: true, createdAt: "2025-04-01" }
      ],
      pagination: { page: 1, limit: 10 }
    };

    const result = analyze(input, { toTOON: true });

    expect(result.savings).toBeGreaterThan(0);
    expect(result.savingsPercent).toBeGreaterThan(5);
    expect(typeof result.optimizedData).toBe('string');
  });

  it('should handle empty or null input gracefully', () => {
    const nullResult = analyze(null);
    const emptyResult = analyze({});

    expect(nullResult.savings).toBe(0);
    expect(emptyResult.savings).toBe(0);
    expect(nullResult.originalTokens).toBe(0);
  });

  it('should work with prune + toTOON', () => {
    const input = {
      id: 123,
      name: "Sohail",
      email: "sohail@example.com",
      debug: true,
      tempField: "remove"
    };

    const result = analyze(input, { 
      prune: true, 
      toTOON: true 
    });

    expect(result.savings).toBeGreaterThanOrEqual(0);
  });
});