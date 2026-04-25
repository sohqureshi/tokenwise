# 🤝 Contributing to Tokenwise

Thank you for your interest in contributing to Tokenwise 🚀  
We welcome contributions that improve performance, usability, and AI data processing capabilities.

---

# 🧠 What is Tokenwise?

Tokenwise is an AI data optimization library that helps:

- Reduce token usage for LLMs  
- Transform JSON into efficient formats (TOON, compact)  
- Process large datasets (streaming support)

---

# 🚀 Ways to Contribute

You can contribute in multiple ways:

### 💡 Feature Improvements
- Add new transformation methods (e.g., normalize, dedupe)
- Improve TOON format efficiency
- Enhance streaming performance

### 🐛 Bug Fixes
- Fix incorrect transformations
- Handle edge cases (deep nesting, null values, etc.)

### 📚 Documentation
- Improve README
- Add examples or tutorials
- Improve code comments

### ⚡ Performance
- Optimize for large datasets (GB/TB scale)
- Improve memory efficiency
- Add streaming enhancements

---

# 🛠️ Getting Started

## 1. Fork the repository

bash git clone https://github.com/sohqureshi/tokenwise.git cd tokenwise 

---

## 2. Install dependencies

bash npm install 

---

## 3. Run the project

bash npm run build npm run test 

---

# 🧩 Project Structure

bash src/ │── core/        # Core transformations (prune, compact, toon, etc.) │── stream/      # Streaming support (large data processing) │── chain.ts     # Fluent API │── index.ts     # Entry point │── cli.ts       # CLI tool 

---

# 🧪 Running Tests

We use Vitest for testing.

bash npm run test 

👉 Please ensure:
- All tests pass  
- New features include tests  

---

# 🧑‍💻 Coding Guidelines

### ✅ General Rules

- Use TypeScript
- Keep functions pure and reusable
- Avoid unnecessary dependencies
- Write clean, readable code

---

### 🧠 Naming

- Use meaningful names  
- Prefer clarity over short names  

Example:

ts // ✅ Good estimateTokens()  // ❌ Avoid estTok() 

---

### ⚡ Performance First

Tokenwise is performance-focused:

- Avoid loading full datasets in memory  
- Prefer streaming where possible  
- Optimize for large-scale data  

---

# 🔄 Contribution Workflow

1. Fork the repo  
2. Create a new branch  

bash git checkout -b feature/your-feature-name 

3. Make your changes  
4. Add tests (if applicable)  
5. Commit changes  

bash git commit -m "feat: add streaming optimization" 

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

- Streaming pipeline improvements  
- Token optimization algorithms  
- CLI enhancements  
- Large dataset handling  

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
**– Mohammad Sohai Qureshi