# Tokenwise

![npm version](https://img.shields.io/npm/v/tokenwise)
![downloads](https://img.shields.io/npm/dw/tokenwise)
![license](https://img.shields.io/github/license/sohqureshi/tokenwise)
![stars](https://img.shields.io/github/stars/sohqureshi/tokenwise?style=social)
[![Support](https://img.shields.io/badge/❤️%20Support%20Tokenwise-View-black?style=for-the-badge)](https://github.com/sponsors/sohqureshi)

> Stop sending raw JSON to LLMs. Optimize first. Save tokens. Save money.

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

## 🔥 Example

### Input (Raw JSON)

```json
{
  "user": {
    "id": "123",
    "name": "Ali",
    "createdAt": "2024-01-01"
  }
}
```

### Output (Optimized)

```
Ali
```

👉 Reduced unnecessary data → fewer tokens → lower cost

---

## 📦 Installation

```bash
npm install tokenwise
```

---

## ⚡ Usage

```js
import ai from "tokenwise";

const data = {
  Person: [
    { Name: "Ali", Age: 11 },
    { Name: "John", Age: 12 }
  ]
};

const result = ai(data)
  .prune(["id", "createdAt"])
  .compact()
  .value();

console.log(result);
// Output: [Ali,11];[John,12]
```

---

## ✨ Features

* 🔹 **prune()** → Remove unnecessary fields
* 🔹 **compact()** → Compress structure
* 🔹 **flatten()** → Flatten nested objects
* 🔹 **toNatural()** → Convert to AI-friendly text
* 🔹 **tokenEstimate()** → Estimate token usage
* 🔹 **visualizeTokens()** → Interactive token usage visualization (CLI/Web support planned).

---

## 📊 Why it matters

LLMs charge per token.

More tokens = more cost 💸

**tokenwise** helps reduce token usage by **30–60%** by:

* removing redundant data
* simplifying structure
* improving input clarity

---

## 🧩 Use Cases

* AI chatbots
* Prompt optimization
* API cost reduction
* Data preprocessing for LLMs
* LLM pipelines and workflows
* Bulk LLM token estimation

---

## ⚡ Token Savings

- **JSON Tokens:** 169  
- **TOON Tokens:** 86  

👉 **Saved:** 49%

---

## 🖥️ Focus on *CLI Value*

Run TokenWise locally

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

---

## 💡 Vision

Make AI cheaper and faster by optimizing data before it reaches the model.