# Install and Load

How to install and load design skills in the project.

---

# Skill Installation

## Taste Skill

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

## Impeccable

```bash
npx impeccable install
```

Then in your AI coding tool:

```
/impeccable init
```

## Vercel Web Design Guidelines

```bash
npx skills add vercel-labs/agent-skills --skill web-design-guidelines
```

## UI/UX Pro Max

```bash
npm install -g ui-ux-pro-max-cli
uipro init --ai cursor
```

---

# Loading Skills

Skills are loaded in this order (tool-agnostic):

1. **Project-level instructions** — read `AGENTS.md` at the repository root.
   - If your tool does not auto-detect `AGENTS.md`, point it to the file explicitly or to a tool-specific mirror (e.g. `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`). These mirrors should be kept identical to `AGENTS.md`.
   - For MCP-based agents, use the filesystem MCP tool to read `AGENTS.md`.
2. `docs/rules/` (architecture and design rules).
3. `docs/skills/` (design skill references).
4. `docs/flows/` (workflows).
5. `docs/audits/` (quality checks).

---

# Skill Conflict Resolution

When skills conflict:

1. Project rules in `docs/rules/` take precedence.
2. Vercel guidelines for accessibility and performance.
3. Taste Skill for aesthetic direction.
4. Impeccable for anti-pattern detection.
5. MIFB for micro-interactions.

---

# Verification

After installing skills:

1. Run the audit pipeline.
2. Verify no new conflicts.
3. Update documentation if rules change.
