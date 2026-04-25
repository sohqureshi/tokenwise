# 🤝 Contributing to Tokenwise

Thank you for your interest in contributing to Tokenwise 🚀  
We welcome contributions that improve performance, usability, and AI data processing capabilities.

---

# 🧠 What is Tokenwise?

Tokenwise is an AI data optimization library that helps:

- Reduce token usage for LLMs  
- Transform JSON into efficient formats (TOON, compact)  
- Improve AI processing efficiency  

---

# 🚀 Ways to Contribute

You can contribute in multiple ways:

### 💡 Feature Improvements
- Add new transformation methods (e.g., normalize, dedupe)
- Improve TOON format efficiency
- Enhance CLI capabilities

### 🐛 Bug Fixes
- Fix incorrect transformations
- Handle edge cases (deep nesting, null values, etc.)

### 📚 Documentation
- Improve README
- Add examples or tutorials
- Improve code comments

### ⚡ Performance
- Optimize transformation logic
- Improve memory efficiency

---

# 🛠️ Getting Started

## 1. Fork the repository

bash git clone https://github.com/sohqureshi/tokenwise.git cd tokenwise 

---

## 2. Install dependencies

bash npm install 

---

## 3. Build the project

bash npm run build 

---

## 4. Run tests

bash npm run test 

---

# 🧩 Project Structure

src/
│── core/                # Core transformations
│   ├── prune.ts         # Remove unwanted keys
│   ├── compact.ts       # Compact JSON structure
│   ├── flatten.ts       # Flatten nested objects
│   ├── toon.ts          # TOON format conversion
│   ├── analyze.ts       # Token/size analysis
│   ├── token.ts         # Token estimation logic
│
│── chain.ts             # Fluent API (method chaining)
│── index.ts             # Entry point (public API)
│── cli.ts               # CLI tool

> Note: The structure may evolve as new features are added.

---

# 🧪 Running Tests

We use Vitest for testing.

bash npm run test 

### ✅ Guidelines

- Ensure all tests pass  
- Add tests for new features  
- Cover edge cases  

---

# 🧑‍💻 Coding Guidelines

### ✅ General Rules

- Use TypeScript
- Keep functions pure and reusable
- Avoid unnecessary dependencies
- Write clean, readable code

---

### 🧠 Naming Conventions

- Use meaningful names  
- Prefer clarity over short names  

ts // ✅ Good estimateTokens()  // ❌ Avoid estTok() 

---

### ⚡ Performance First

Tokenwise is performance-focused:

- Avoid unnecessary object copies  
- Optimize transformations  
- Keep logic lightweight  

---

# 🔄 Contribution Workflow

1. Fork the repo  
2. Create a new branch  

bash git checkout -b feature/your-feature-name 

3. Make your changes  
4. Add tests (if applicable)  
5. Commit changes  

bash git commit -m "feat: add new optimization method" 

6. Push to your fork  

bash git push origin feature/your-feature-name 

7. Create a Pull Request  

---

# 📌 Pull Request Guidelines

Please ensure:

- ✅ Clear description of changes  
- ✅ Small and focused PR  
- ✅ Related issue (if applicable)  
- ✅ Tests added/updated  
- ✅ No breaking changes (or clearly mentioned)  

---

# 🐛 Reporting Issues

Before creating an issue:

- Search existing issues  
- Provide clear reproduction steps  
- Include sample input/output  

---

# 🔥 Development Priorities

We especially welcome contributions in:

- Token optimization improvements  
- CLI enhancements  
- Transformation accuracy  
- Performance optimizations  

---

# ⚠️ Things to Avoid

- Large, unrelated PRs  
- Breaking existing APIs without discussion  
- Adding heavy dependencies  

---

# 🧠 Philosophy

Tokenwise aims to be:

> ⚡ Fast  
> 🧠 AI-friendly  
> 📦 Lightweight  
> 🔧 Developer-first  

---

# 🙌 Final Note

Even small contributions matter.  
If you’re unsure, open an issue first—we’ll guide you 👍

---

Happy coding 🚀  
**– Mohammad Sohai