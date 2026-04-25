import { describe, it, expect } from 'vitest'
import { flatten } from '../core/flatten'

describe('flatten', () => {
  it('should flatten nested object', () => {
    const input = {
      a: {
        b: {
          c: 1
        }
      }
    }

    const output = flatten(input)

    expect(output).toHaveProperty('a.b.c', 1)
  })

  it('should handle arrays', () => {
    const input = {
      arr: [10, 20]
    }

    const output = flatten(input)

    expect(output).toHaveProperty('arr.0', 10)
    expect(output).toHaveProperty('arr.1', 20)
  })
})