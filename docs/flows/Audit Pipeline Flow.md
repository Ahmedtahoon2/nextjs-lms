# Audit Pipeline Flow

Workflow for running quality audits on the project.

---

# Pipeline Steps

## 1. TypeScript Check

```bash
pnpm run typecheck
```

Verify: no errors, no warnings.

## 2. ESLint Check

```bash
pnpm run lint
```

Verify: no errors, no warnings.

## 3. Build Check

```bash
pnpm run build
```

Verify: successful production build.

## 4. Test Check

```bash
pnpm run test
```

Verify: all tests pass.

## 5. Dead Code Check

```bash
pnpm run knip
```

Verify: no unused files, exports, or dependencies.

## 6. Design Audit

- Run Section 14 pre-flight.
- Check against anti-slop patterns.
- Verify typography rules.
- Verify color rules.

## 7. Accessibility Audit

- Check focus management.
- Check ARIA attributes.
- Check color contrast.
- Check keyboard navigation.

## 8. Performance Audit

- Check bundle size.
- Check Server Component usage.
- Check lazy loading.
- Check image optimization.

---

# Audit Results

Document findings in the relevant documentation:

- Architecture issues: `docs/rules/Architecture and Stack.md`.
- Design issues: `docs/rules/AI Tells (Forbidden Patterns).md`.
- Accessibility issues: `docs/rules/Vercel Interface Rule Categories.md`.

---

# Documentation Rules

Every significant change should update the relevant documentation.

Architecture decisions should be documented before implementation whenever possible.

Documentation should always reflect the current state of the project.
