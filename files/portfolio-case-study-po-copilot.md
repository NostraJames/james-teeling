# Portfolio Case Study: PO Copilot — AI-Assisted Product Owner Workflow System

**Author:** [Your Name], Product Owner · American Airlines Digital  
**Role:** Product Owner & System Architect  
**Timeline:** July 2026  
**Repository:** AAInternal/po_copilot (GitHub Enterprise)

---

## Executive Summary

I designed and built **PO Copilot** — a custom AI-powered workflow system that transforms how Product Owners at American Airlines create Features and User Stories for Azure DevOps. What used to be hours of staring at blank ADO forms, hunting down Business Rules in BookStack, re-typing the same contacts into analytics forms, and trying to remember every Definition of Ready criterion is now a structured, AI-guided conversation that takes minutes instead of hours.

The system is live, shared across the team via a private GitHub repo, and requires zero technical setup beyond a one-command bootstrap. This case study documents what I built, why I built it, and what tools I used to make it happen.

---

## The Problem

Product Owners at American Airlines face a consistent friction pattern every time they go from an idea to a properly formatted, ADO-ready work item:

| Pain Point | Impact |
|---|---|
| Blank ADO forms with no guidance | Stories get posted with missing acceptance criteria, no persona, or undefined scope |
| Definition of Ready lives in a doc nobody reads | Stories enter sprint review not ready, causing planning delays |
| Business Rules buried in BookStack across 10+ books | POs miss rule conflicts until QA or launch |
| Analytics intake forms filled out manually, from scratch, every time | ~30–45 minutes per item, error-prone, inconsistent |
| No institutional memory between sessions | The same clarifying questions get asked (and missed) over and over |
| Technical setup barriers | POs can't adopt productivity tools if setup requires a developer |

The result: **slow, inconsistent, high-rework work item creation** — and POs spending cognitive energy on format and process instead of product thinking.

---

## The Solution: PO Copilot

PO Copilot is a shareable AI assistant system built around a plain-English conversation flow. A PO opens their terminal, brain-dumps a rough idea, and gets back a polished, DoR-checked Feature or User Story draft — with Business Rule cross-checks, analytics forms auto-generated, and ADO posting handled by the AI on command.

The system runs in GitHub Copilot CLI, which is the AA-approved AI tool. No new software, no new subscriptions.

---

## What I Built — Feature by Feature

### 1. Core Scaffold: Templates, DoR Enforcement, and Conversational Flows

**What it does:** The foundation of the system — structured templates, a Definition of Ready checklist encoded as machine-readable criteria (Critical vs. Non-critical), and step-by-step conversational workflows the AI follows.

**Key files:**
- `templates/feature-template.md` — PRD-style Feature shape (Problem Statement, Proposed Solution, Expected Results)
- `templates/user-story-template.md` — Connextra format (AS A / I WANT / SO THAT) + Acceptance Criteria always in Given/When/Then HTML
- `definition-of-ready/dor-checklist.md` — every DoR criterion tagged Critical/Non-critical, covering Product/Business Readiness, Design, Technical, Requirements, and Team tiers
- `definition-of-ready/mobile-completeness-audit.md` — conditional tier for mobile-app-facing stories (Platforms, UI/UX, Dark Mode, Accessibility, Error Handling, Test Plan)
- `workflows/brain-dump-to-feature.md` and `brain-dump-to-story.md` — step-by-step conversational flows
- `workflows/question-bank.md` — one-question-at-a-time phrasing with Edge Case taxonomy and acknowledgement patterns
- `AGENTS.md` — AI operating rules (the system prompt equivalent), with Golden Rules enforcing: no fabrication, DoR gating on stories, HTML formatting for ADO fields, draft-first then post-on-command

**Why it matters:** Before this, the DoR was a document that got glanced at. Now it's enforced — Critical items (persona, acceptance criteria, scope, user outcome) *cannot* be skipped or left blank. The AI asks one clarifying question at a time so POs don't get overwhelmed.

---

### 2. BookStack Integration — Squad DoR & Business Rules Lookup

**What it does:** Connects the AI to BookStack (the company's internal wiki) via its REST API, so when a PO is drafting a Feature or Story, the AI searches the company's Business Rules shelf for anything relevant to what's being built — and surfaces conflicts before they reach development.

**Key files:**
- `workflows/bookstack-reference.md` — API call patterns, credential handling, how findings feed into drafts
- `config/team-config.json` (gitignored per PO) — base URL, shelf URLs, env var names for credentials

**Technical approach:** BookStack's `/api/search` endpoint does keyword matching. Credentials stored as environment variables, never in the repo. The AI also checks the squad's own Definition of Ready page in BookStack as an additional validation tier on top of the encoded checklist.

**Why it matters:** Business Rules conflicts historically got caught in QA or post-launch. Now the AI flags them during drafting, asks the PO to resolve the contradiction, and documents the outcome in the draft's Business Rules Alignment section. Shift-left for compliance.

---

### 3. Business Rules Authoring Guide Link (PR #2)

**What it does:** When a Business Rule needs to be *created or updated* as part of a Feature/Story review, subagents now automatically consult the company's [Business Rules authoring guide](https://cdn.stage.flyaa.aa.com/docs/books/business-rules-guide-7cs/page/bookstack-business-rules-guide) before drafting any new rule content — ensuring format and structure match AA standards.

**Why it matters:** Before this, the AI might draft a rule in any arbitrary format. Now it follows the company's own 7Cs framework, and rule drafts go through the PO for review before reaching a rule owner.

---

### 4. Analytics Intake Automation (PR #1)

**What it does:** After any Feature or User Story draft is finalized, the AI asks whether it needs analytics tracking. If yes, it walks through a structured intake (summary, scope, timeline, flow steps, stakeholder questions/decisions/KPIs) and **auto-generates two real files**:
- `drafts/<slug>-analytics-flow-document.docx`
- `drafts/<slug>-analytics-stakeholder.xlsx`

These match the exact format used by the AA analytics team.

**Script:** `scripts/generate_analytics_docs.py` — generates `.docx` and `.xlsx` from structured JSON data using `python-docx` and `openpyxl`

**Key contacts** (Product Owner, Product Analyst, Program Manager, Lead/Back Developer) are asked once and saved to `config/team-config.json` so they auto-fill on future forms.

**Why it matters:** Analytics intake used to be ~30–45 minutes of manual form-filling, often done inconsistently. Now it's part of the drafting flow and takes 5 minutes. Forms are ready to share immediately.

---

### 5. Business Rules Semantic (RAG) Search — Two-Pass Retrieval (PR #3)

**What it does:** Adds a second, smarter Business Rules lookup pass alongside the existing BookStack keyword search. Rather than only matching exact terminology, the AI can now find relevant rules even when the PO's language doesn't literally match the BookStack page titles.

**Example:** Searching "letting someone move seats after boarding" correctly returns pages about Seat Change Requests — even though none of those words appear in the page title.

**Technical architecture:**
- `scripts/business_rules_rag.py` (~460 lines) — full RAG module + CLI
  - **Fetch**: pulls all pages from the Business Rules BookStack shelf via API
  - **Parse**: HTML → plain text with a custom parser
  - **Chunk**: ~800-char chunks with 150-char overlap, paragraph-boundary aware
  - **Embed**: calls GitHub Models embeddings API (`openai/text-embedding-3-small`) via `gh auth token` — the AA-approved GitHub Copilot trust boundary, no new credentials
  - **Index**: stores chunks + embeddings as binary blobs in a local SQLite file (`.cache/business_rules_index.sqlite3`) — gitignored, never committed, internal AA content handled safely
  - **Search**: cosine similarity via numpy, returns top-K pages ranked by best-matching chunk
  - **Incremental refresh**: compares `updated_at` timestamps, only re-embeds changed pages
- Rate limiting handled with retry/backoff honoring `retry-after` headers

**Tools used:**
| Tool | Why |
|---|---|
| GitHub Models API (embeddings) | AA-approved, no new auth required — reuses `gh` token already needed for Copilot CLI |
| SQLite | Zero-dependency local storage, fast brute-force cosine search at ~200-page corpus size |
| numpy | Efficient vector math for cosine similarity |
| Python stdlib only for HTTP | No extra dependencies for API calls |

**Design decision:** Additive/augmentative — keyword search always runs first (fast, zero-cost), semantic search is a second pass merged and de-duped by page URL. This was a deliberate choice over "fully replace" to preserve speed for exact-match queries.

**Why it matters:** A PO using their own words to describe a feature will now surface relevant Business Rules even when they don't know the "official" BookStack terminology. Better coverage = fewer missed conflicts.

---

### 6. PO Business Rules Feature Audit Spreadsheet (local tool)

**What it does:** A custom Python/openpyxl script enriched an existing 292-row Excel audit (`PO_Business_Rules_Feature_Audit.xlsx`) by adding a "Business Rule Link" column — real, clickable BookStack hyperlinks for every matched Business Rule row.

**Approach:**
- Fetched the full Business Rules shelf structure via BookStack API (10 books, ~290 pages)
- Built a page-name → URL lookup with per-book matching first, then global fallback for cross-book ambiguity
- Used openpyxl to write real Excel hyperlinks (not just text URLs) — resolved 117/292 rows with live links

**Why it matters:** Auditors and reviewers can now click directly from the audit spreadsheet to the authoritative rule in BookStack — no more copy-paste searching.

---

### 7. Non-Technical Onboarding System (PRs #4 & #5)

**What it does:** A complete onboarding system ensuring any PO on the team can go from zero to fully set up without needing developer help.

**`ONBOARDING.md`** covers three parts:
- Part 1: ADO Personal Access Token (step-by-step, Mac + Windows, never prints token)
- Part 2: BookStack API credentials (same safe-credential pattern)
- Part 3: Team config conversation with the AI

**Part 2.5 (optional):** Smart Business Rules search setup — reduced from a 7-step manual process to a **single bootstrap command**:

```bash
# Mac
python3 scripts/bootstrap_business_rules_rag.py

# Windows
python scripts/bootstrap_business_rules_rag.py
```

**`scripts/bootstrap_business_rules_rag.py`** automates:
1. Python package installation (`pip install -r requirements.txt`)
2. GitHub CLI installation — tries **winget → Chocolatey → Scoop** on Windows, Homebrew on Mac
3. `gh auth login` if not signed in
4. GitHub Models access test (graceful exit if unavailable — keyword search still works)
5. First semantic index build

**Security principle throughout:** secrets are never printed, never logged, never committed. All tokens live as shell environment variables. Verification is always length-only (`wc -c`), never value display.

---

## Tools & Technologies Used

| Tool | Purpose | Why I Chose It |
|---|---|---|
| **GitHub Copilot CLI** | Primary AI assistant runtime | AA-approved, AGENTS.md-aware, runs in terminal |
| **GitHub Models API** | Embeddings for semantic search | Same auth as Copilot CLI (`gh auth token`), no new credentials, no new vendor approval |
| **Azure DevOps REST API** | Create/read/update work items | Required for ADO integration; used PATCH with HTML rich-text fields |
| **BookStack REST API** | Business Rules & DoR lookup | Company's authoritative source for rules; API-accessible with token auth |
| **Python** | All scripts | Cross-platform (Mac + Windows), minimal dependencies, POs already have it |
| **SQLite** | Local semantic search index | Zero setup, zero service, fast enough for ~200-page corpus, gitignore-safe |
| **numpy** | Cosine similarity search | One small dependency for efficient vector math |
| **openpyxl** | Excel automation | Read/write `.xlsx` with real hyperlinks, not just text |
| **python-docx** | Word document generation | Auto-generate analytics `.docx` files matching team format |
| **GitHub Actions / gh CLI** | Version control + PR workflow | All changes shipped via PRs with review before merging |
| **AGENTS.md pattern** | AI system prompt as a committed file | Reproducible, version-controlled AI behavior — any PO pulling the repo gets the same AI |

---

## Impact & Outcomes

| Before PO Copilot | After PO Copilot |
|---|---|
| Blank ADO forms, inconsistent quality | Structured, DoR-gated drafts every time |
| DoR missed or skimmed | Critical items enforced; can't post until persona, AC, and scope are defined |
| Business Rule conflicts found in QA | Surfaced during drafting with source citations |
| Analytics forms: ~30–45 min manual | Auto-generated in ~5 min as part of the drafting flow |
| Keyword-only Business Rules search | Two-pass: exact keyword + semantic similarity |
| Setup required developer help | One bootstrap command, non-technical onboarding guide |
| Siloed to one PO's machine | Shared via GitHub repo — any PO can clone and be set up in ~20 minutes |
| Business Rule creation unguided | Subagents consult AA's official 7Cs authoring guide before drafting |

---

## Engineering Decisions Worth Highlighting

**1. AGENTS.md as a version-controlled system prompt**  
Instead of configuring AI behavior through a vendor portal, I encoded all operating rules in a plain markdown file committed to the repo. Any PO pulling the repo gets identical AI behavior. Rules are auditable, diffable, and PR-reviewed like any other code.

**2. Draft-first, post-on-command**  
The AI never posts to ADO unless the PO explicitly says "post it." All drafts land in `drafts/` (gitignored) first. This removes the anxiety of AI-generated content going somewhere unintended.

**3. One-question-at-a-time UX**  
`workflows/question-bank.md` enforces a conversational flow where the AI asks exactly one clarifying question at a time, with predefined phrasing and ordering. This is the difference between "here's a 20-question form" and "let's talk it through."

**4. Additive-only semantic search**  
Keyword search stays as the first pass (fast, exact, zero-cost). Semantic RAG is a second pass merged by page URL. POs who don't set up the RAG index lose no functionality — they just don't get the paraphrase-matching upgrade.

**5. Secret hygiene by design**  
Every credential is an environment variable. The system verifies setup via length-only checks. The onboarding guide explicitly instructs POs to type tokens into their terminal, not into chat. The AI is instructed never to echo token values. All sensitive derived content (the RAG index) is gitignored.

---

## What This Demonstrates

This project demonstrates a complete product-to-implementation cycle — not just identifying a problem, but designing and shipping a production-ready solution:

- **Product thinking**: mapped real PO pain points to specific, testable solutions
- **Systems design**: designed a multi-layer AI system with clear separation of concerns (templates, workflows, definitions, scripts, config)
- **AI engineering**: built semantic search, prompt engineering (AGENTS.md), tool orchestration, and graceful degradation patterns
- **Developer experience**: wrote non-technical onboarding with a one-command bootstrap that handles Windows, Mac, and corporate IT constraints
- **Security awareness**: designed credential handling from the ground up with the principle of least privilege and zero-secret-in-repo
- **Iterative shipping**: 5 PRs, each self-contained and incrementally adding value, with clean git history

---

*This case study was written based on actual shipped work in the `AAInternal/po_copilot` private repository. All tools used are within American Airlines' approved technology stack.*
