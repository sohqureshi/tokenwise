import { describe, it, expect } from 'vitest'
import { compact } from '../core/compact'

describe('compact', () => {
  it('should minify a nested product object', () => {
    const input = {
      product: {
        name: "Wireless Headphones",
        price: 79.99
      }
    }

    expect(compact(input)).toBe('{"product":{"name":"Wireless Headphones","price":79.99}}')
  })

  it('should keep arrays and nested objects valid JSON', () => {
    const input = {
      order: {
        id: "ORD-1001",
        items: [
          { sku: "HD-1", quantity: 2 },
          { sku: "CHG-2", quantity: 1 }
        ],
        shipping: {
          city: "Mumbai",
          express: true
        }
      }
    }

    expect(compact(input)).toBe(
      '{"order":{"id":"ORD-1001","items":[{"sku":"HD-1","quantity":2},{"sku":"CHG-2","quantity":1}],"shipping":{"city":"Mumbai","express":true}}}'
    )
  })

  it('should remove null, undefined, and empty object values before minifying', () => {
    const input = {
      user: {
        name: "Alice",
        email: undefined,
        phone: null,
        preferences: {},
        tags: []
      }
    }

    expect(compact(input)).toBe('{"user":{"name":"Alice","tags":[]}}')
  })

  it('should compact insurance data without changing values', () => {
    const input = {
      policy: {
        holderName: "Carlos Rivera",
        policyNumber: "HLT-2048",
        premiumAmount: 2850,
        active: true,
        claim: {
          status: "under review",
          requestedAmount: 64000
        }
      }
    }

    expect(compact(input)).toBe(
      '{"policy":{"holderName":"Carlos Rivera","policyNumber":"HLT-2048","premiumAmount":2850,"active":true,"claim":{"status":"under review","requestedAmount":64000}}}'
    )
  })

  it('should return an empty string when the root value is removed by pruning', () => {
    expect(compact(null)).toBe("")
    expect(compact(undefined)).toBe("")
  })
})
