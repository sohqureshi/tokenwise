import { describe, it, expect } from 'vitest'
import { toTOON } from '../core/toon'

describe('toTOON', () => {

  it('should convert simple JSON to TOON format', () => {
    const input = {
      context: {
        task: "Test task",
        location: "Test location"
      },
      items: [1, 2, 3]
    }

    const output = toTOON(input)

    expect(output).toContain('context:')
    expect(output).toContain('task: Test task')
    expect(output).toContain('location: Test location')
    expect(output).toContain('[3]: 1,2,3')
  })

  it('should handle nested objects', () => {
    const input = {
      user: {
        profile: {
          name: "Sohail",
          age: 25
        }
      }
    }

    const output = toTOON(input)

    expect(output).toContain('user:')
    expect(output).toContain('profile:')
    expect(output).toContain('name: Sohail')
    expect(output).toContain('age: 25')
  })

  it('should handle arrays correctly', () => {
    const input = {
      nums: [10, 20]
    }

    const output = toTOON(input)

    expect(output).toContain('nums:')
    expect(output).toContain('[2]: 10,20')
  })

  it('should handle array of objects', () => {
    const input = {
      users: [
        { id: 1, name: "A" },
        { id: 2, name: "B" }
      ]
    }

    const output = toTOON(input)

    expect(output).toContain('users:')
    expect(output).toContain('[2]')
    expect(output).toContain('id')
    expect(output).toContain('name')
  })

  it('should handle mixed data types', () => {
    const input = {
      str: "hello",
      num: 123,
      bool: true
    }

    const output = toTOON(input)

    expect(output).toContain('str: hello')
    expect(output).toContain('num: 123')
    expect(output).toContain('bool: true')
  })

  it('should handle null and undefined safely', () => {
    const input = {
      a: null,
      b: undefined
    }

    const output = toTOON(input)

    // adjust based on your prune/handling logic
    expect(output).not.toContain('undefined')
  })

  it('should handle empty object', () => {
    const input = {}
    const output = toTOON(input)

    expect(output).toBe('')
  })

  it('should not crash on deeply nested structure', () => {
    const input = {
      a: {
        b: {
          c: {
            d: {
              e: "deep"
            }
          }
        }
      }
    }

    const output = toTOON(input)

    expect(output).toContain('deep')
  })

})