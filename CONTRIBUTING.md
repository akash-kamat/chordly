# Contributing to Chordly

First off, thank you for considering contributing to Chordly! 🎸

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior.

**Be respectful, inclusive, and constructive.**

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs what actually happened
- **Screenshots** if applicable
- **Browser/OS** information

### 💡 Suggesting Features

Feature suggestions are welcome! Please:

- **Check existing issues** to avoid duplicates
- **Describe the problem** you're trying to solve
- **Explain your proposed solution**
- **Consider alternatives** you've thought about

### 🎵 Adding Content

We especially welcome:
- **New chord definitions** in `data/chords.ts`
- **New songs** in `data/songs.ts` (chord progressions only, no copyrighted lyrics)
- **New lessons** in `data/lessons.ts`
- **Theory modules** in `data/theory.ts`

### 🌍 Translations

Help make Guitar Workshop accessible worldwide by translating the UI into your language.

## Development Setup

```bash
# Fork and clone the repo
git clone https://github.com/YOUR-USERNAME/the-guitar-workshop.git
cd the-guitar-workshop

# Install dependencies
pnpm install

# Start dev server
pnpm run dev

# Run linting
pnpm run lint

# Run type checking
pnpm run typecheck
```

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure linting passes: `pnpm run lint`
4. Update documentation if needed
5. Submit PR with clear description

### PR Title Convention

- `feat: Add new feature`
- `fix: Fix bug description`
- `docs: Update documentation`
- `style: Code formatting`
- `refactor: Code restructuring`
- `test: Add tests`
- `chore: Maintenance tasks`

## Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define interfaces/types in `types/index.ts`
- Avoid `any` - use proper types

### React Components
- Use functional components with hooks
- Keep components focused (single responsibility)
- Use `'use client'` directive for client components
- Extract reusable logic into custom hooks

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow the existing color theme (THEME object)
- Use CSS custom properties for theming

### File Naming
- Components: `PascalCase.tsx` (e.g., `ChordLibrary.tsx`)
- Hooks: `use-kebab-case.ts` (e.g., `use-audio.ts`)
- Data files: `kebab-case.ts` (e.g., `chords.ts`)

## Questions?

Feel free to open an issue for any questions!

---

Thank you for making Chordly better! 🎸
