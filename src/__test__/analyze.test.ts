import { describe, it, expect } from 'vitest';
import { analyze } from './analyze';

describe('analyze()', () => {
  it('should calculate savings correctly for small input', () => {
    const input = {
      a: "test"
    };

    const result = analyze(input);

    expect(result.savings).toBeGreaterThanOrEqual(0);
    expect(result.originalTokens).toBeGreaterThan(0);
    expect(result.optimizedTokens).toBeGreaterThan(0);
    expect(result.savingsPercent).toBeGreaterThanOrEqual(0);
    expect(typeof result.reductionRatio).toBe('number');
  });

  it('should return 0 savings when no optimization is applied', () => {
    const input = { name: "Alice", age: 25 };

    const result = analyze(input);   // no options = minimal change

    expect(result.savings).toBe(0);
    expect(result.savingsPercent).toBe(0);
  });

  it('should show positive savings when toTOON is used', () => {
    const input = {
      users: [
        { id: 1, name: "Alice", debug: true, createdAt: "2025-04-01" },
        { id: 2, name: "Bob", debug: true, createdAt: "2025-04-01" }
      ],
      pagination: { page: 1, limit: 10 }
    };

    const result = analyze(input, { toTOON: true });

    expect(result.savings).toBeGreaterThan(0);           // toTOON should reduce tokens
    expect(result.savingsPercent).toBeGreaterThan(10);   // usually gives decent savings
    expect(result.optimizedData).toBeTypeOf('string');   // toTOON returns string
  });

  it('should handle empty or null input gracefully', () => {
    expect(analyze(null)).toEqual({
      originalTokens: 0,
      optimizedTokens: 0,
      savings: 0,
      savingsPercent: 0,
      optimizedData: null,
      reductionRatio: 1,
    });

    expect(analyze({})).toEqual({
      originalTokens: 0,
      optimizedTokens: 0,
      savings: 0,
      savingsPercent: 0,
      optimizedData: null,
      reductionRatio: 1,
    });
  });

  it('should work with prune + toTOON combination', () => {
    const input = {
      id: 123,
      name: "Sohail",
      email: "sohail@example.com",
      debug: true,
      temp: "remove me"
    };

    const result = analyze(input, {
      prune: true,     // if your prune supports boolean for default fields
      toTOON: true
    });

    expect(result.savings).toBeGreaterThanOrEqual(0);
  });
});