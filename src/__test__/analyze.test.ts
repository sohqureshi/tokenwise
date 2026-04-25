import { describe, it, expect } from 'vitest'
import { analyze } from '../core/analyze'

describe('analyze', () => {
  it('should return token stats', () => {
    const input = {
      a: "hello",
      b: "world"
    }

    const result = analyze(input)

    expect(result).toHaveProperty('originalTokens')
    expect(result).toHaveProperty('optimizedTokens')
    expect(result).toHaveProperty('savings')
  })

  it('should calculate savings correctly', () => {
    const input = {
      a: "test"
    }

    const result = analyze(input)

    expect(result.savings).toBeGreaterThanOrEqual(0)
  })
})