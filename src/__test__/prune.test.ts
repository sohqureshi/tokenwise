import { describe, it, expect } from 'vitest'
import { prune } from '../core/prune'

describe('prune', () => {
  it('should remove null and undefined', () => {
    const input = {
      a: 1,
      b: null,
      c: undefined
    }

    const output = prune(input)

    expect(output).toEqual({ a: 1 })
  })

  it('should remove empty objects', () => {
    const input = {
      a: {},
      b: 2
    }

    const output = prune(input)

    expect(output).toEqual({ b: 2 })
  })
})