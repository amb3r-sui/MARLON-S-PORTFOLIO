# Read-only n8n workflow review

Review date: 30 July 2026

This inventory was prepared from the visible local n8n project and editor UI. The review was strictly read-only: no workflow was edited, activated, deactivated, executed, exported, deleted, or connected to the portfolio. No credentials, webhook URLs, execution payloads, customer records, internal workflow identifiers, or private project identifiers were copied into this repository.

## Selection summary

### Featured portfolio case studies

1. **RANA AI Receptionist and Booking System** — Seven related workflows presented as one end-to-end case study. This is the strongest example of protected AI intake, approved knowledge retrieval, deterministic booking, follow-up, escalation, and audit controls.
2. **Inventory Replenishment and Draft RFQ Automation** — Three related workflows presented as one operations case study. It demonstrates stock policy checks, duplicate prevention, time-bound human approval, draft-only purchasing, audit logging, and independent failure alerts.

### Supporting project

3. **B2B AI Lead Triage with Human Review** — A compact prototype using fictional sample data. It is useful as a supporting AI-assisted sales example because validation and human review remain explicit.

### Excluded from public case studies

Seven workflows whose names identify them as QA, verification, cleanup, mock lifecycle, or read-only test harnesses were excluded as standalone portfolio projects. They support testing claims but are not separate business systems:

- Rana QA — RAG retrieval
- Rana QA — reminder dispatch
- Rana QA — production lifecycle
- Rana QA — calendar cleanup
- Rana QA — calendar cleanup verification
- Rana QA — mock booking lifecycle
- Rana QA — Google Calendar read-only test

### Needs improvement before a production claim

- The B2B lead triage workflow is presented as a prototype, not as a deployed production system.
- The inventory suite is presented as a portfolio implementation. Its case study describes the visible approval boundary and draft-RFQ behavior without claiming that every supporting workflow is currently active.
- Provider-specific production configuration, monitoring thresholds, and user acceptance testing remain future work across the case studies.

## Reviewed workflow inventory

| Workflow | Visible purpose | Portfolio treatment |
| --- | --- | --- |
| Rana 00 — AI Gateway and Abuse Protection | Signed-request checks, payload validation, deduplication, rate and budget controls, abuse decisions, and cleanup | RANA subsystem |
| Rana 01 — Customer Inquiry Intake | Structured inquiry intake and normalization | RANA subsystem |
| Rana 02 — AI Receptionist Brain | Approved context, RAG tool use, structured Gemini decision, booking and escalation routing | RANA subsystem |
| Rana 03 — Appointment and Calendar Manager | Service rules, availability, conflict checks, confirmation-gated create, reschedule, and cancel | RANA subsystem |
| Rana 04 — CRM Reminders and Follow-Up | Reminder and follow-up handling | RANA subsystem |
| Rana 05 — Escalation Logging and Errors | Escalation and error handling | RANA subsystem |
| Rana 06 — RAG Knowledge Ingestion and Retrieval | Controlled retrieval plus approved document ingestion and version lifecycle | RANA subsystem |
| Seven Rana QA and verification workflows | Focused test and verification harnesses | Excluded as standalone projects |
| B2B AI Lead Triage — Human Review Demo | Fictional lead validation, structured Gemini triage, salesperson review, and notification | Supporting prototype |
| Manila Hardware — Inventory Replenishment Stock Check | Manual or weekday stock read, policy comparison, duplicate prevention, supplier resolution, and review notice | Inventory subsystem |
| Manila Hardware — Replenishment Approval and Draft RFQ | One-time approval validation, draft-only Odoo RFQ creation, audit, and outcome notification | Inventory subsystem |
| Manila Hardware — Workflow Error Handler | Normalized technical error log and independent alert path | Inventory subsystem |

## Safety and architecture observations

- The RANA gateway places authentication, validation, abuse controls, duplicate checks, and usage limits before an AI call.
- RANA separates structured AI recommendations from deterministic calendar and persistence actions.
- Official knowledge ingestion is separated from customer conversations; retrieval is limited to approved active content.
- Inventory purchasing keeps a clear human decision boundary and creates a draft RFQ rather than an approved purchase.
- The error-handler notification path is independent of successful technical-log persistence.
- Portfolio demos use local sample data and browser-only state. They do not call local n8n, external providers, webhooks, credentials, or customer systems.

## Evidence boundary

The portfolio does not claim verified revenue, time savings, conversion uplift, production uptime, or customer outcomes. Business-impact language is intentionally framed as design intent. Screenshots use sanitized placeholders when an approved public visual is unavailable.
