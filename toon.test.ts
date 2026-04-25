import { describe, it, expect } from 'vitest'
import { toTOON } from './src/core/toon'

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

    expect(output).toContain('nums:')
    expect(output).toContain('[2]: 10,20')
  })
})