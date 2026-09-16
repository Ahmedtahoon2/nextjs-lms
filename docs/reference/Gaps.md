# Project Gaps & Roadmap

Identified gaps and areas for future enhancement across the repository.

---

## 1. Resolved Areas

- [x] **Architecture Decisions:** Formalized in **[decisions/](../decisions/README.md)** (ADR-001 to ADR-003).
- [x] **Testing Strategy:** Complete testing architecture and layer patterns documented in **[.agents/skills/lms-testing](../../.agents/skills/lms-testing/SKILL.md)** and **[audits/quality-audit.md](../audits/quality-audit.md)**.
- [x] **Release & Git Workflow:** Trunk-based workflow, commit standards, and tag release processes documented in **[Development/Git.md](../Development/Git.md)**.
- [x] **Error Telemetry:** Sentry configuration for client, server, and edge documented in **[DEVELOPMENT.md](../DEVELOPMENT.md)**.

---

## 2. Active Toolchain & Quality Gaps

- **Automated Design & Accessibility Audits:** Integrate automated axe-core / Lighthouse checks into CI/CD.
- **Visual Regression Testing:** Configure Playwright or Chromatic for visual diff regression testing.
- **Performance Baseline:** Establish Core Web Vitals (LCP, FID/INP, CLS) and API latency baseline metrics under load.
- **Production Deployment Pipeline:** Document and configure the production release pipeline (e.g. Vercel deployment hooks and database migration deployment).
