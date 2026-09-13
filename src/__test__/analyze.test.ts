import { describe, it, expect } from 'vitest';
import { encoding_for_model } from 'tiktoken';
import { analyze } from '../core/analyze';

describe('analyze()', () => {

  it('should calculate savings correctly for small input', () => {
    const input = { a: "test" };
    const result = analyze(input);

    expect(result.savings).toBeGreaterThanOrEqual(0);
    expect(result.originalTokens).toBe(
      encoding_for_model('gpt-4o-mini').encode(JSON.stringify(input)).length
    );
    expect(result.optimizedTokens).toBeGreaterThanOrEqual(0);
    expect(result.savingsPercent).toBeGreaterThanOrEqual(0);
  });

  it('should measure JSON objects instead of silently treating them as zero tokens', () => {
    const input = { user: { name: "Alice" } };
    const result = analyze(input);

    expect(result.originalTokens).toBeGreaterThan(0);
    expect(result.originalCharacters).toBe(JSON.stringify(input).length);
    expect(result.estimator).toContain('exact tokenizer');
  });

  it('should return 0 savings when no optimization is applied', () => {
    const input = { name: "Alice", age: 25 };
    const result = analyze(input);

    expect(result.savings).toBe(0);
    expect(result.savingsPercent).toBe(0);
  });

  it('should not return NaN even when toTOON is used', () => {
    const input = {
      users: [
        { id: 1, name: "Alice", debug: true },
        { id: 2, name: "Bob", debug: true }
      ]
    };

    const result = analyze(input, { toTOON: true });

    expect(result.savings).toBeGreaterThanOrEqual(0);
    expect(result.originalTokens).not.toBeNaN();
    expect(result.optimizedTokens).not.toBeNaN();
  });

  it('should pass prune keys to optimized data', () => {
    const input = {
      user: { name: "John", age: 28 },
      debug: true,
      internal: { apiKey: "secret" }
    };

    const result = analyze(input, { prune: ["debug", "internal"] });

    expect(result.optimizedData).toEqual({
      user: { name: "John", age: 28 }
    });
  });
 
// testing handle empty input-
  it('should handle empty input gracefully', () => {
    const result1 = analyze(null);
    const result2 = analyze({});

    expect(result1.savings).toBe(0);
    expect(result2.savings).toBe(0);
  });
});
