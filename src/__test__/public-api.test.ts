import { describe, it, expect } from 'vitest'
import ai, {
  AIChain,
  analyze,
  compact,
  estimateTokens,
  flatten,
  prune,
  toNatural,
  toTOON
} from '../index'

describe('public api', () => {
  it('should expose core functions as named exports', () => {
    expect(typeof AIChain).toBe('function')
    expect(typeof analyze).toBe('function')
    expect(typeof compact).toBe('function')
    expect(typeof estimateTokens).toBe('function')
    expect(typeof flatten).toBe('function')
    expect(typeof prune).toBe('function')
    expect(typeof toNatural).toBe('function')
    expect(typeof toTOON).toBe('function')
  })

  it('should attach core functions to the default ai export', () => {
    expect(typeof ai).toBe('function')
    expect(typeof ai.analyze).toBe('function')
    expect(typeof ai.compact).toBe('function')
    expect(typeof ai.estimateTokens).toBe('function')
    expect(typeof ai.flatten).toBe('function')
    expect(typeof ai.prune).toBe('function')
    expect(typeof ai.toNatural).toBe('function')
    expect(typeof ai.toTOON).toBe('function')
  })
})
