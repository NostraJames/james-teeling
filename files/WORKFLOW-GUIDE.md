# PO Copilot — Team Workflow Guide

*Share this doc with anyone on the team who wants to use PO Copilot. If you haven't set
up your access yet, start with `ONBOARDING.md` first — this guide assumes setup is
already done.*

## What is this?

PO Copilot is an AI assistant (running in GitHub Copilot CLI) that helps you turn a
rough idea into a polished, well-structured **Feature** or **User Story**, checks it
against your team's standards, and can post it straight to Azure DevOps (ADO) when
you're ready — all from a normal conversation, no blank forms required.

You don't need to know Markdown, HTML, or ADO's field names. You just talk to it like
you would a teammate.

## The Four Flows

```
                        ┌───────────────────────────┐
                        │   You: "I have an idea..." │
                        └────────────┬────────────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    ▼                                  ▼
              FEATURE FLOW                       USER STORY FLOW
        (big idea / initiative)             (specific, scoped piece of work)
                    │                                  │
                    ▼                                  ▼
       ┌─────────────────────────┐        ┌─────────────────────────────┐
       │ 1. Brain dump the idea  │        │ 1. Brain dump the story      │
       │ 2. Answer a few         │        │ 2. Answer DoR questions      │
       │    clarifying questions │        │    (one at a time)           │
       │ 3. First draft written  │        │ 3. First draft written       │
       │ 4. AI plays "sounding   │        │ 4. Analytics check           │
       │    board" — asks about  │        │ 5. Parent Feature link       │
       │    edge cases you may   │        │    (asks for ADO ID if any)  │
       │    have missed          │        │ 6. Definition of Ready (DoR) │
       │ 5. BUSINESS RULE CHECK  │        │    grading — must pass       │
       │ 6. Analytics check      │        │    before it's "ready"       │
       │ 7. Parent Epic link     │        │ 7. Final review with you     │
       │    (asks for ADO ID if  │        │ 8. You say "post it"         │
       │    any)                │        │    → goes to ADO             │
       │ 8. Final review with you│        └─────────────────────────────┘
       │ 9. Optional: break into │
       │    User Stories         │
       │10. You say "post it"    │
       │    → goes to ADO        │
       └─────────────────────────┘
```

### 1. Feature Flow — for big ideas / initiatives

**When to use:** you have a broad idea, problem, or initiative that will likely become
several pieces of work.

**How to start:** just say something like:

> "I have an idea for a feature. Here's my brain dump: [describe the problem, who it
> affects, any ideas you already have]"

**What happens:**
1. You brain dump freely — don't worry about structure, just talk.
2. The AI asks a few clarifying questions (one at a time) to fill gaps — e.g. who's
   affected, what success looks like, what's out of scope.
3. It writes a first draft (Problem Statement, Proposed Solution, Expected Results,
   etc.) and saves it locally.
4. **Sounding board pass:** it re-reads the draft back to you and asks "did you think
   about X? What about Y?" — this is where it catches use cases and edge cases you
   might not have thought of.
5. **Business Rule check** *(if your squad uses BookStack)*: it checks whether any
   known company/squad business rules apply to this feature. If one conflicts with what
   you're proposing, it'll ask you: does the rule need updating, or does the feature
   need to change? Your answer gets written into the draft.
6. **Analytics check:** it asks if this feature needs analytics tracking — see the
   Analytics Flow below.
7. **Parent Epic:** if this feature rolls up to a bigger Epic in ADO, it'll ask for the
   Epic's ID and double-checks it's valid before linking.
8. You review the draft and make any changes you want.
9. Optionally, break the feature into individual User Stories right there (hands off to
   the User Story flow below, one story at a time).
10. When you're happy, just say **"post it"** and it creates the Feature in ADO and
    gives you the link.

**Nothing here is a strict checklist** — Features are about writing a good, clear
document, not passing a gate.

### 2. User Story Flow — for a specific, scoped piece of work

**When to use:** you know exactly what needs to be built — a specific screen, flow, or
capability — and it's small enough to be one team's sprint-sized work.

**How to start:**

> "I want to write a user story. Here's my brain dump: [describe what you want built]"

**What happens:**
1. You brain dump the idea (can stand alone, or come from breaking down a Feature).
2. The AI asks Definition of Ready (DoR) questions one at a time — starting with the
   must-haves: who's the specific user, what's the flow, what are the acceptance
   criteria (in Given/When/Then format), what's out of scope. These **cannot** be
   skipped — they're required before a story is "ready."
   - If it's a mobile app story, it also runs through a Mobile Completeness check
     (platforms, dark mode, accessibility, error handling, etc.).
   - Everything else (story points, priority, dependencies, etc.) is asked too, but can
     be marked "to be decided" if you don't know yet.
3. It writes the first draft.
4. **Analytics check:** same as above — asks if this story needs analytics tracking.
5. **Parent Feature:** if this story belongs to a Feature in ADO, it'll ask for the
   Feature's ID and double-checks it's valid before linking.
6. **DoR Grading:** it shows you a pass/fail table against your team's Definition of
   Ready. Anything critical that's missing gets asked about until it's resolved —
   nothing critical can be skipped.
7. You do a final review together.
8. Say **"post it"** and it creates the User Story in ADO, linked to its parent Feature
   if applicable, and gives you the link.

### 3. Business Rule Validation — built into both flows above

You don't run this separately — it happens automatically as part of Feature step 5 (and
during User Story clarifying questions) **only if your squad has BookStack configured**.
The AI searches your company's Business Rules documentation for anything relevant to
what you're building — using both an exact keyword search *and* a local "smart search"
pass that catches rules described in different words than your brain dump used — asks
if it applies, and if there's a conflict between the rule and what you're proposing,
asks you to decide which one should change. This is a safety net to catch cases where a
new idea accidentally contradicts an existing company policy. The smart-search step
keeps a small local cache of your squad's Business Rules content on your machine only
(never shared or committed) so repeat lookups are fast.

The smart-search pass is optional and needs a one-time setup — ask your AI to walk you
through `ONBOARDING.md` Part 2.5 to turn it on. Skipping it is fine; keyword search
alone keeps working without it.

### 4. Analytics Form Automation — built into both flows above

After a Feature or Story draft is solid, the AI asks: **"Does this need analytics
tracking?"** If you say yes, it walks you through a short set of questions (what's being
tracked, which platforms, the step-by-step user flow, who the stakeholders are and what
questions/decisions the data should answer) and then automatically generates two ready-
to-share files for you:
- An **Analytics Flow Document** (`.docx`)
- An **Analytics Stakeholder Questions sheet** (`.xlsx`)

Both land in the `drafts/` folder. The only manual step left is attaching
screenshots/mockups (it can't generate those itself) — everything else is filled in for
you. Nothing is submitted anywhere automatically; you share these files with your
analytics team however your process normally works.

## Good Things to Know

- **Nothing goes to ADO until you say so.** Every draft is saved locally to `drafts/`
  first. Say "post it," "create it in ADO," or similar when you're ready — not before.
- **The AI never makes things up.** If it doesn't know something (story points,
  acceptance criteria, an Epic ID), it asks you. Unknowns get marked `{TBD: ...}` rather
  than guessed.
- **You can edit anything.** Drafts are just files — ask the AI to change anything, any
  time, before you post.
- **Your credentials stay yours.** Your ADO token and (if used) BookStack token live
  only on your own machine as environment variables — never in this shared repo, never
  visible to teammates, never printed in the chat.
- **First time?** If you haven't set up your access yet, see `ONBOARDING.md` — it walks
  you through everything step by step.

## Quick Reference — What to Say

| You want to...                          | Say something like...                                   |
|------------------------------------------|----------------------------------------------------------|
| Start a new Feature                       | "I have a feature idea, here's my brain dump: ..."       |
| Start a new User Story                    | "I want to write a user story about ..."                 |
| Break a Feature into stories              | "Let's break this feature into stories"                  |
| Skip a non-critical DoR question          | "Just proceed" / "skip that for now"                     |
| Add analytics tracking                    | (the AI will ask — just answer "yes")                    |
| Link to a parent Feature/Epic             | (the AI will ask — have the ADO ID ready if you know it) |
| Post the draft to ADO                     | "Post it" / "Create it in ADO"                            |
| Review/change a draft                     | "Can we change the acceptance criteria to..."             |

Questions or issues? Reach out to whoever set up PO Copilot for your team, or check
`README.md` / `AGENTS.md` in this repo for the full technical detail.
