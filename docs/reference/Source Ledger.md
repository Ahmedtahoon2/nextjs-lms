# Source Ledger

Evidence-gated source tracking for design rules and claims.

---

# Schema

Every source entry includes:

- `id`: Unique identifier.
- `title`: Source title.
- `url`: Source URL.
- `source_type`: primary, official, supporting, market, practitioner.
- `retrieved`: Date retrieved.
- `refresh_due`: Date for refresh check.
- `confidence`: high, medium, low.
- `claims`: Array of verified claims.

---

# Source Types

- `official` - Vendor documentation, official sites.
- `primary` - Repository source, canonical skill files.
- `supporting` - Articles, reviews, blog posts.
- `market` - Market snapshots, comparison articles.
- `practitioner` - Independent practitioner work.

---

# Current Sources

## Taste Skill v2

- Source: Leonxlnx/taste-skill (MIT).
- URL: https://github.com/Leonxlnx/taste-skill.
- Claims: Three dials, Section 14, anti-slop rules, em-dash ban.
- Confidence: high.

## Impeccable

- Source: pbakaus/impeccable (Apache-2.0).
- URL: https://github.com/pbakaus/impeccable.
- Claims: 45-rule detector, 23 commands, named anti-slop tells.
- Confidence: high.

## Make Interfaces Feel Better

- Source: jakubkrehel/make-interfaces-feel-better.
- URL: https://github.com/jakubkrehel/make-interfaces-feel-better.
- Claims: 16 rule categories, concentric radius, press states, shadow layers.
- Confidence: high.

## Vercel Web Design Guidelines

- Source: vercel-labs/web-interface-guidelines (MIT).
- URL: https://github.com/vercel-labs/web-interface-guidelines.
- Claims: 90-110 rules across 16+ categories.
- Confidence: high.

## Anthropic Frontend Design

- Source: anthropics/skills (Apache-2.0).
- URL: https://github.com/anthropics/skills.
- Claims: Taste prompting, aesthetic direction, two-pass build-critique.
- Confidence: high.

## UI/UX Pro Max

- Source: nextlevelbuilder/ui-ux-pro-max-skill (MIT).
- URL: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.
- Claims: 67 styles, 161 palettes, 57 font pairs, 99 UX guidelines.
- Confidence: high.

---

# Refresh Cadence

- On-changelog for skill repos.
- Monthly for rule captures.
- Quarterly for ecosystem coverage.

---

# Sources

- Gogh source-ledger.json (brainstein/source-ledger@2).
