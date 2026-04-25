import { describe, it, expect } from 'vitest'
import { toTOON } from './src/core/toon' // ✅ FIXED PATH

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

    expect(output).toContain('context')
    expect(output).toContain('task,Test task')
    expect(output).toContain('items[3]')
  })

  it('should handle empty object', () => {
    const input = {}
    const output = toTOON(input)

    expect(output).toBe('')
  })

  it('should handle arrays correctly', () => {
    const input = {
      nums: [10, 20]
    }

    const output = toTOON(input)

    expect(output).toContain('nums[2]')
    expect(output).toContain('10')
    expect(output).toContain('20')
  })
})