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

  it('should remove configured keys with options object', () => {
    const input = {
      user: { name: 'John', age: 28 },
      debug: true,
      internal: { apiKey: 'secret' }
    }

    const output = prune(input, { removeKeys: ['debug', 'internal'] })

    expect(output).toEqual({
      user: { name: 'John', age: 28 }
    })
  })

  it('should remove configured keys with shorthand array', () => {
    const input = {
      user: { id: '123', name: 'John' },
      debug: true,
      internal: { apiKey: 'secret' }
    }

    const output = prune(input, ['id', 'debug', 'internal'])

    expect(output).toEqual({
      user: { name: 'John' }
    })
  })
})
