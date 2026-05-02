import { describe, it, expect } from 'vitest'
import { toNatural } from '../core/natural'

describe('toNatural', () => {
  it('should convert an array of user objects into numbered natural pointers', () => {
    const input = [
      {
        user: {
          name: "Alice Johnson",
          email: "alice@example.com",
          skills: ["Python", "JavaScript"]
        }
      },
      {
        user: {
          name: "Bob Smith",
          email: "bob@example.com",
          skills: ["TypeScript", "React"]
        }
      }
    ]

    const output = toNatural(input)

    expect(output).toBe(
      "1. User Alice Johnson (email: alice@example.com, Having Python and JavaScript). 2. User Bob Smith (email: bob@example.com, Having TypeScript and React)."
    )
  })

  it('should describe a meaningful medical patient object', () => {
    const input = {
      patient: {
        name: "Maya Patel",
        age: 42,
        email: "maya.patel@example.com",
        conditions: ["diabetes", "hypertension"],
        medications: ["metformin", "amlodipine"],
        primaryDoctor: "Dr. Rao",
        active: true
      }
    }

    const output = toNatural(input)

    expect(output).toBe(
      "patient: name Maya Patel, age 42, email maya.patel@example.com, conditions: diabetes and hypertension, medications: metformin and amlodipine, primary doctor Dr. Rao, active enabled."
    )
  })

  it('should describe an insurance policy object with nested claim details', () => {
    const input = {
      policy: {
        holderName: "Carlos Rivera",
        policyNumber: "HLT-2048",
        planType: "family health",
        premiumAmount: 2850,
        claim: {
          claimNumber: "CLM-7781",
          status: "under review",
          requestedAmount: 64000
        },
        dependents: ["Ana Rivera", "Luis Rivera"]
      }
    }

    const output = toNatural(input)

    expect(output).toBe(
      "policy: holder name Carlos Rivera, policy number HLT-2048, plan type family health, premium amount 2850, claim: claim number CLM-7781, status under review, requested amount 64000, dependents: Ana Rivera and Luis Rivera."
    )
  })

  it('should convert multiple medical appointment records into numbered pointers', () => {
    const input = [
      {
        appointment: {
          patientName: "Nina Shah",
          department: "cardiology",
          date: "2026-05-10",
          symptoms: ["chest pain", "shortness of breath"]
        }
      },
      {
        appointment: {
          patientName: "Omar Khan",
          department: "orthopedics",
          date: "2026-05-12",
          symptoms: ["knee swelling", "limited mobility"]
        }
      }
    ]

    const output = toNatural(input)

    expect(output).toBe(
      "1. appointment: patient name Nina Shah, department cardiology, date 2026-05-10, symptoms: chest pain and shortness of breath. 2. appointment: patient name Omar Khan, department orthopedics, date 2026-05-12, symptoms: knee swelling and limited mobility."
    )
  })
})
