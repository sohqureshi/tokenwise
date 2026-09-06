import { describe, expect, it } from 'vitest'
import { encoding_for_model } from 'tiktoken'
import { estimateTokens, serializeForTokenEstimate } from '../core/token'

describe('token estimation', () => {
  it('serializes JSON values before estimating tokens', () => {
    const input = { product: 'headphones', price: 79.99 }
    const serialized = JSON.stringify(input)

    expect(serializeForTokenEstimate(input)).toBe(serialized)
    expect(estimateTokens(input)).toBe(Math.ceil(serialized.length / 4))
  })

  it('supports exact model-aware token estimation when available', () => {
    const input = 'The quick brown fox jumps over the lazy dog.'
    const expected = encoding_for_model('gpt-4o-mini').encode(input).length

    expect(estimateTokens(input, { exact: true, model: 'gpt-4o-mini' })).toBe(expected)
  })
})
