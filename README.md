# TokenWise

TokenWise is a lightweight utility for preparing JSON before sending it to AI models. It helps reduce payload noise, shrink token usage, and turn structured data into formats that are easier for LLMs to consume.

---

## 🧠 What is tokenwise?

**tokenwise** is a lightweight utility that optimizes your data before sending it to AI models.

Raw JSON is:

* ❌ verbose
* ❌ token-heavy
* ❌ expensive for LLMs

**tokenwise** helps you:

* 📉 reduce token usage
* ⚡ improve response speed
* 💰 lower API costs

---

## Installation

```bash
npm install tokenwise
```

## Quick Usage

```js
import ai, { compact, flatten, toNatural, toTOON } from "tokenwise";

const product = {
  product: {
    name: "Wireless Headphones",
    price: 79.99
  }
};

console.log(compact(product));
// {"product":{"name":"Wireless Headphones","price":79.99}}

console.log(flatten(product));
// {
//   "product.name": "Wireless Headphones",
//   "product.price": 79.99
// }

console.log(ai(product).compact().value());
// {"product":{"name":"Wireless Headphones","price":79.99}}
```

## Core Functions

### `prune()`

Removes fields you do not want to send to the model. By default it also removes `null`, `undefined`, and empty objects.

```js
import { prune } from "tokenwise";

const input = {
  user: { name: "John", age: 28 },
  debug: true,
  internal: { apiKey: "secret" }
};

console.log(prune(input, ["debug", "internal"]));
// { user: { name: "John", age: 28 } }
```

### `compact()`

Prunes empty/noisy values, then returns minified JSON.

```js
compact({
  product: {
    name: "Wireless Headphones",
    price: 79.99
  }
});
// {"product":{"name":"Wireless Headphones","price":79.99}}
```

### `flatten()`

Converts nested objects and arrays into one object with dot-notation keys.

```js
flatten({
  policy: {
    claims: [
      { status: "approved", amount: 1200 },
      { status: "pending", amount: 500 }
    ]
  }
});
// {
//   "policy.claims.0.status": "approved",
//   "policy.claims.0.amount": 1200,
//   "policy.claims.1.status": "pending",
//   "policy.claims.1.amount": 500
// }
```

### `toNatural()`

Converts JSON into readable sentences or numbered pointers.

```js
toNatural([
  {
    user: {
      name: "Alice Johnson",
      email: "alice@example.com",
      skills: ["Python", "JavaScript"]
    }
  }
]);
// 1. User Alice Johnson (email: alice@example.com, Having Python and JavaScript).
```

Medical and insurance-style data also becomes readable:

```js
toNatural({
  policy: {
    holderName: "Carlos Rivera",
    policyNumber: "HLT-2048",
    claim: {
      status: "under review",
      requestedAmount: 64000
    }
  }
});
// policy: holder name Carlos Rivera, policy number HLT-2048, claim: status under review, requested amount 64000.
```

### `toTOON()`

Converts JSON into a compact TOON-like text format. Arrays of objects become table-style rows.

```js
toTOON({
  users: [
    { id: 1, name: "Ali" },
    { id: 2, name: "John" }
  ]
});
// users:
//   [2]{id,name}:
//     1,Ali
//     2,John
```

If later rows contain extra keys, the schema includes them:

```js
toTOON({
  claims: [
    { id: "C-1", status: "approved" },
    { id: "C-2", amount: 500 }
  ]
});
// claims:
//   [2]{id,status,amount}:
//     C-1,approved,
//     C-2,,500
```

## Tested Use Cases

TokenWise currently has coverage for:

- Product JSON minification
- Dot-notation flattening
- Arrays and arrays of objects
- Medical patient and appointment data
- Insurance policy and claim data
- Natural-language user pointers
- TOON table formatting
- Null, undefined, and empty values

## Why It Helps

LLMs charge and reason over tokens. Sending raw JSON often includes repeated keys, unnecessary metadata, and formatting whitespace. TokenWise gives you multiple ways to reshape the same data depending on your prompt:

- Use `compact()` when you need valid JSON with minimal whitespace.
- Use `flatten()` when retrieval, search, or simple key-value context is better.
- Use `toNatural()` when the model should read the data like human-friendly notes.
- Use `toTOON()` when arrays of objects should be shorter than repeated JSON.

## CLI

```bash
node demo.js
```

You can visualize token optimization results using planned CLI/Web visual tools.

---

## 🚀 Roadmap

* [x] CLI support *(Coming Soon)*
* [ ] NPM Support
* [ ] Streaming support (GB+ data)
* [ ] Schema-aware optimization
* [ ] SaaS API

---

## 🛠 Comparison to Existing Tools *(Future Section)*

Highlight where **tokenwise** stands out, offering better compacting and token estimation features compared to other libraries.

---

## 🤝 Contributing

PRs are welcome,Feel free to open issues or submit PRs, Ideas are welcome for:

- Better token compression strategies  
- Multi-model optimization  
- Streaming CLI support  

note: Explore the `CONTRIBUTING.md` for more details for the contributons.

---

## 📄 License

MIT License

---

## ❤️ Support This Project

TokenWise is built to help developers reduce LLM cost and improve efficiency.

If it helps you, consider supporting its development:

[![Support](https://img.shields.io/badge/❤️%20Support%20TokenWise-View-black?style=for-the-badge)](https://github.com/sponsors/sohqureshi)


![npm version](https://img.shields.io/npm/v/tokenwise)
![downloads](https://img.shields.io/npm/dw/tokenwise)
![license](https://img.shields.io/github/license/sohqureshi/tokenwise)
![stars](https://img.shields.io/github/stars/sohqureshi/tokenwise?style=social)
[![Demo](https://img.shields.io/badge/Live%20Demo-Visit-brightgreen)](https://sohqureshi.github.io/tokenwise/)
[![Support](https://img.shields.io/badge/❤️%20Support%20Tokenwise-View-black?style=for-the-badge)](https://github.com/sponsors/sohqureshi)
---

## 💡 Vision

Make AI cheaper and faster by optimizing data before it reaches the model.