# Em-Dash Ban

The em-dash (U+2014) and en-dash (U+2013) are banned anywhere in visible text.

---

# Rules

- Never use em-dash (U+2014) in visible text.
- Never use en-dash (U+2013) in visible text.
- Use the hyphen (-) for all dash-like purposes.
- Use the math minus sign only in mathematical expressions.

---

# Why

This rule comes from the Taste Skill framework (Leon Lin).

LLMs default to em-dashes and en-dashes because they appear frequently in training data. Banning them forces more deliberate punctuation and breaks the generic AI writing pattern.

---

# Examples

Incorrect:

```
The feature supports authentication - including OAuth and magic links.
```

Correct:

```
The feature supports authentication - including OAuth and magic links.
```

Incorrect:

```
Our platform offers three tiers - Basic, Pro, and Enterprise.
```

Correct:

```
Our platform offers three tiers - Basic, Pro, and Enterprise.
```

---

# Enforcement

- Check all visible text in components.
- Check markdown documentation (internal only).
- Do not check code comments or string literals that are not rendered.

---

# Sources

- Taste Skill v2 (Leon Lin) - Em-dash and en-dash ban.
