# Vulnix

> An AI-powered CLI agent that scans npm projects for vulnerable dependencies and helps you fix them safely.

Vulnix is built to solve a simple but painful problem: **security tooling is noisy, unclear, and hard to act on**. Vulnix focuses on clarity, safety, and developer trust.

---

## ✨ What Vulnix Does (V1)

- 🔍 Scans npm projects for known vulnerable dependencies
- 📦 Supports both direct and transitive dependencies
- ⚠️ Uses real vulnerability data (`npm audit`)
- 🧠 Explains vulnerabilities in plain English _(AI-powered)_
- 🛠 Suggests safe upgrades or removals
- 🧪 Re-scans to verify fixes
- 🔐 Never modifies your project without confirmation

---

## 🚫 What Vulnix Does NOT Do (Yet)

- No CI/CD integration
- No GitHub PRs
- No yarn / pnpm support
- No zero-day detection
- No code-level vulnerability scanning
- No automatic fixes without approval

This is intentional. Vulnix V1 is scoped for **trust and correctness**.

---

## 📦 Installation

```bash
# coming soon
npm install -g vulnix
```

For now, run locally:

```bash
git clone https://github.com/yourname/vulnix
cd vulnix
npm install
```

---

## 🖥 Usage

Run Vulnix inside any npm project.

### Scan for vulnerabilities

```bash
vulnix scan
```

Output:

```
🔍 Scanning npm project...

Found 4 vulnerabilities:
- lodash@4.17.20 (HIGH)
- minimist@0.0.8 (CRITICAL)
```

---

### Explain vulnerabilities (AI)

```bash
vulnix explain
```

Example:

```
📦 lodash@4.17.20
Severity: HIGH
Risk: Prototype pollution
Impact: Can allow attackers to modify object behavior when processing user input.
```

---

### Plan fixes

```bash
vulnix plan
```

```text
✔ Upgrade lodash → 4.17.21
✖ Remove deprecated package: request
➜ Replace moment → date-fns
```

---

### Apply fixes (with confirmation)

```bash
vulnix apply
```

```
⚠️ This will modify package.json and install dependencies.
Proceed? (y/n)
```

---

## 🧠 How Vulnix Works

1. Reads `package.json` and lockfile
2. Fetches vulnerabilities using `npm audit`
3. Normalizes and scores risks
4. Uses AI to explain real-world impact
5. Suggests safe fixes
6. Applies changes only after confirmation
7. Re-scans to ensure issues are resolved

---

## 🎯 Project Goals

- Be **useful**, not noisy
- Prefer **safe automation** over blind fixes
- Explain security like a human would
- Stay transparent and predictable

---

## 🧭 Roadmap

### V1 (Current)

- [x] Dependency scanning
- [x] Vulnerability detection
- [ ] AI explanations
- [ ] Fix planning
- [ ] Safe apply + re-scan

### V2 - coming soon

<!-- - GitHub Action
- PR-based fixes
- pnpm / yarn support
- Monorepo support
- Configurable risk policies -->

---
