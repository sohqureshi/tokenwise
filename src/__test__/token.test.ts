import { describe, expect, it } from 'vitest'
import { estimateTokens, serializeForTokenEstimate } from '../core/token'

describe('token estimation', () => {
  it('serializes JSON values before estimating tokens', () => {
    const input = { product: 'headphones', price: 79.99 }
    const serialized = JSON.stringify(input)

    expect(serializeForTokenEstimate(input)).toBe(serialized)
    expect(estimateTokens(input)).toBe(Math.ceil(serialized.length / 4))
  })
})
