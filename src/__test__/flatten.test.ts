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

  it('should flatten mixed nested primitives', () => {
    const input = {
      product: {
        name: "Wireless Headphones",
        price: 79.99,
        available: true
      }
    }

    expect(flatten(input)).toEqual({
      "product.name": "Wireless Headphones",
      "product.price": 79.99,
      "product.available": true
    })
  })

  it('should flatten arrays of objects using numeric indexes', () => {
    const input = {
      policy: {
        claims: [
          { status: "approved", amount: 1200 },
          { status: "pending", amount: 500 }
        ]
      }
    }

    expect(flatten(input)).toEqual({
      "policy.claims.0.status": "approved",
      "policy.claims.0.amount": 1200,
      "policy.claims.1.status": "pending",
      "policy.claims.1.amount": 500
    })
  })

  it('should keep null values on object properties', () => {
    const input = {
      patient: {
        name: "Maya Patel",
        dischargeDate: null
      }
    }

    expect(flatten(input)).toEqual({
      "patient.name": "Maya Patel",
      "patient.dischargeDate": null
    })
  })

  it('should return an empty object for null or undefined root values', () => {
    expect(flatten(null)).toEqual({})
    expect(flatten(undefined)).toEqual({})
  })

  it('should support primitive root values when a prefix is provided', () => {
    expect(flatten("active", "status")).toEqual({
      status: "active"
    })
  })
})
