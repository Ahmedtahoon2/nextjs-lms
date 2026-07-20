# Technology Stack

This document explains the technologies used in the project and why they were selected.

---

# Framework

## Next.js 16

Purpose

- React Framework
- Server Components
- App Router
- Route Handlers
- Metadata API

Why

- Excellent performance
- Modern React features
- Built-in optimizations
- Strong ecosystem

---

# Language

## TypeScript

Purpose

Type safety.

Why

- Better maintainability
- Better refactoring
- Better developer experience
- Fewer runtime errors

---

# UI

## React 19

Purpose

Build user interfaces.

Why

- Server Components
- Concurrent rendering
- Mature ecosystem

---

# Styling

## Tailwind CSS v4

Purpose

Application styling.

Why

- Utility-first
- Small bundle
- Fast development
- Excellent maintainability

---

# Components

## shadcn/ui

Purpose

Reusable UI components.

Why

- Accessible
- Fully customizable
- No vendor lock-in

---

# Database

## PostgreSQL

Purpose

Primary relational database.

Why

- Reliability
- Scalability
- Mature ecosystem

---

# ORM

## Prisma

Purpose

Database access.

Why

- Excellent TypeScript support
- Migrations
- Type-safe queries

---

# Database Provider

## Neon

Purpose

Serverless PostgreSQL.

Why

- Fast provisioning
- Scalable
- Native Prisma support

---

# Validation

## Zod

Purpose

Runtime validation.

Why

- Type inference
- Reliable validation
- Excellent TypeScript integration

---

# Forms

## React Hook Form

Purpose

Form management.

Why

- Excellent performance
- Minimal re-renders
- Strong TypeScript support

---

# Testing

## Jest

Purpose

Unit testing.

---

# Linting

## ESLint

Purpose

Static analysis.

---

# Formatting

## Prettier

Purpose

Code formatting.

---

# Git Hooks

## Husky

Purpose

Automated Git hooks.

---

# Code Quality

## lint-staged

Purpose

Run checks only on staged files.

---

# Guiding Principles

Every dependency must satisfy at least one of the following:

- Improves maintainability
- Improves developer experience
- Improves performance
- Solves a real problem

No dependency should be added without a clear justification.

---

## Testing Rules

- Tests must cover critical business logic and edge cases
- Unit tests for pure functions and utilities
- Integration tests for API endpoints and database interactions
- Test coverage should be monitored but not enforced at the cost of maintainability

---
