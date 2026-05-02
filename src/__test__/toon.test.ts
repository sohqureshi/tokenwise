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

  it('should output exact table format for array of objects', () => {
    const input = {
      users: [
        { id: 1, name: "Ali" },
        { id: 2, name: "John" }
      ]
    }

    expect(toTOON(input)).toBe(
      "users:\n  [2]{id,name}:\n    1,Ali\n    2,John"
    )
  })

  it('should include later object keys in array schema', () => {
    const input = {
      claims: [
        { id: "C-1", status: "approved" },
        { id: "C-2", amount: 500 }
      ]
    }

    expect(toTOON(input)).toBe(
      "claims:\n  [2]{id,status,amount}:\n    C-1,approved,\n    C-2,,500"
    )
  })

  it('should output exact primitive array format', () => {
    expect(toTOON({ items: ["apple", "banana", "orange"] })).toBe(
      "items:\n  [3]: apple,banana,orange"
    )
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
    expect(output).toBe("a:\nb:")
  })

  it('should handle empty arrays', () => {
    expect(toTOON({ items: [] })).toBe("items:\n[]")
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
