# Product

## Register

product

## Platform

web

## Users

Two audiences, treated as equally primary.

**Students** arrive from search or a shared link, browse a catalog they cannot yet evaluate, enroll, and then spend most of their time inside the learning player. Their context is a long session: one course, one lesson at a time, often on a laptop with the video as the point of focus. The job is to resume exactly where they left off, understand what is next, and finish. Anything in that player that competes with the lesson is a cost paid per lesson, every time.

**Instructors** arrive with real material and a deadline. They build a course as a hierarchy of modules and lessons, write lesson content in markdown with a live preview, watch enrollment numbers, and publish when it is ready. Their context is an editing session that gets interrupted. The job is to make structural change — reorder, split, rename, insert — feel safe and fast, so that an interrupted instructor is willing to come back and finish.

## Product Purpose

A learning platform where expert instructors publish structured courses and students work through them, tracking progress lesson by lesson.

It exists because unstructured video libraries fail learners. The value is not the video; it is the ordered curriculum around it, the sense of where you are, and the evidence of what you have finished. Success is measured in the learn loop: a student opens a course, resumes at the right lesson, completes it, and comes back tomorrow. Authoring throughput is the second half of that loop — a platform that cannot be taught into is empty.

## Positioning

A course is a structure, not a playlist. Every screen reinforces that the curriculum is the product: ordered, resumable, and finished when the last lesson is finished.

## Brand Personality

Encouraging, generous, human.

Warmth without condescension. Progress is acknowledged, not celebrated with confetti. The interface is generous with space, with reading measure, and with not making the learner feel behind. Underneath that, the craft is restrained — the Linear reference is for the _surface quality_: tight neutral ramps, precise type, motion reserved for feedback and state change rather than decoration. Encouraging is carried by the surrounding chrome; the content itself stays quiet.

## Anti-references

- **Generic SaaS template.** Six identical feature cards in a 3x2 grid, gradient-filled buttons, 24px+ radii on every surface, a hero made of a blurred blob. Not this.
- **Gamified consumer app.** Purple-to-blue gradients, confetti on completion, streak counters, trophy badges, emoji as iconography. Progress is communicated with state and language, not rewards.
- **Dark-mode hacker aesthetic.** Dark-by-default tooling, neon accents, glassmorphic floating panels. Density and calm over atmosphere.

## Design Principles

1. **The lesson is the loudest thing.** In the player, the lesson content owns the visual weight; navigation, progress, and account chrome recede. One primary task per screen.
2. **Show progress, never sell it.** Completion state is honest and legible — a lesson is done or it is not. No badges, streaks, or celebratory motion standing in for actual progress.
3. **Make structural change safe.** Reordering and editing curriculum is destructive-adjacent. Every mutation is either reversible or confirmed before it lands.
4. **Resume is a first-class flow.** Opening a course should land on the exact lesson to continue, not on a page that asks the learner to decide where to continue.
5. **Restraint is the through-line.** Precise type, one accent, motion only where state changed. Warmth comes from copy and space, not decoration.

## Accessibility & Inclusion

WCAG 2.2 AA as the baseline, plus two explicit commitments.

Every animation has a `prefers-reduced-motion` path that crossfades or resolves instantly; nothing conveys meaning through movement. And no status is communicated by color alone — published, enrolled, complete, and error states each carry an icon or text so they survive color blindness and monochrome contexts.
