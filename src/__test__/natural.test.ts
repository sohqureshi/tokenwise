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
      "Carlos Rivera has policy HLT-2048, a family health plan, with a premium of 2,850. The claim is under review for 64,000 (reference CLM-7781). Carlos Rivera's dependents are Ana Rivera and Luis Rivera."
    )
  })

  it('uses semantic sentences for policy data without inventing facts', () => {
    const output = toNatural({
      holderName: "Carlos Rivera",
      policyNumber: "HLT-2048",
      claim: { status: "approved", requestedAmount: 64000 }
    })

    expect(output).toBe(
      "Carlos Rivera has policy HLT-2048. The claim is approved for 64,000."
    )
  })

  it('uses safe semantic phrasing for an unrelated dynamic object', () => {
    const output = toNatural({
      name: "Order 1042",
      status: "shipped",
      total: 129.5,
      debug: true
    })

    expect(output).toBe("Order 1042 is shipped and has total 129.5.")
  })

  it('recognizes common state fields in dynamic entity data', () => {
    const output = toNatural({
      title: "Incident 42",
      severity: "high",
      priority: "urgent",
      owner: "Platform"
    })

    expect(output).toBe(
      "Incident 42 is high and has priority urgent, owner Platform."
    )
  })

  it.each([
    ['displayName', 'Checkout API'],
    ['entityName', 'Invoice 42'],
    ['fullName', 'Sam Rivera'],
    ['projectName', 'Apollo'],
    ['productName', 'Wireless keyboard'],
    ['serviceName', 'Payments'],
    ['deviceName', 'Gateway 3'],
    ['patientName', 'Maya Patel'],
    ['taskName', 'Deploy release']
  ])('recognizes %s as a dynamic subject field', (subjectKey, subjectValue) => {
    const output = toNatural({
      [subjectKey]: subjectValue,
      status: "active"
    })

    expect(output).toBe(`${subjectValue} is active.`)
  })

  it.each([
    ['patientName', 'Maya Patel'],
    ['billingContactName', 'Ravi Shah'],
    ['primaryOwnerName', 'Alex Morgan']
  ])('matches dynamic subject keys containing name: %s', (subjectKey, subjectValue) => {
    const output = toNatural({
      [subjectKey]: subjectValue,
      state: "active"
    })

    expect(output).toBe(`${subjectValue} is active.`)
  })

  it.each([
    ['orderStatus', 'shipped'],
    ['currentPhase', 'review'],
    ['customerRole', 'admin'],
    ['incidentSeverity', 'high']
  ])('matches dynamic state keys containing a semantic key: %s', (stateKey, stateValue) => {
    const output = toNatural({
      name: "Record 42",
      [stateKey]: stateValue
    })

    expect(output).toBe(`Record 42 is ${stateValue}.`)
  })

  it.each([
    ['state', 'active'],
    ['condition', 'healthy'],
    ['stage', 'review'],
    ['role', 'admin'],
    ['category', 'hardware'],
    ['availability', 'in stock'],
    ['progress', 'complete'],
    ['severity', 'critical']
  ])('uses %s as a dynamic entity state field', (stateKey, stateValue) => {
    const output = toNatural({
      name: "Service account",
      [stateKey]: stateValue
    })

    expect(output).toBe(`Service account is ${stateValue}.`)
  })

  it('describes dynamic scalar details while excluding technical metadata', () => {
    const output = toNatural({
      name: "Build 17",
      status: "failed",
      retryCount: 2,
      automated: false,
      id: "build-17",
      createdAt: "2026-09-13T10:00:00Z",
      debug: true
    })

    expect(output).toBe(
      "Build 17 is failed and has retry count 2, automated disabled."
    )
  })

  it('uses semantic phrasing for an entity nested inside a wrapper object', () => {
    const output = toNatural({
      result: {
        label: "Deployment",
        phase: "complete",
        region: "eu-west-1"
      },
      requestId: "req-42"
    })

    expect(output).toBe("Deployment is complete and has region eu-west-1.")
  })

  it('keeps policy sentences concise when optional details are missing', () => {
    const output = toNatural({
      holderName: "Jordan Lee",
      policyNumber: "POL-100"
    })

    expect(output).toBe("Jordan Lee has policy POL-100.")
  })

  it('handles primitive, empty, and mixed array inputs', () => {
    expect(toNatural(null)).toBe("nothing")
    expect(toNatural(true)).toBe("yes")
    expect(toNatural([])).toBe("empty list")
    expect(toNatural(["alpha", 2, false])).toBe("alpha, 2 and no")
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
