# Marlon Magno Portfolio

A polished, multi-page portfolio grounded in Marlon Magno's current CV. It presents automation projects to recruiters, clients, agencies, and remote employers without inventing client metrics, credentials, or production outcomes.

## Features

- Responsive Home, Projects, Project Case Study, About, Services, and Contact pages
- Filterable project library powered by structured TypeScript data
- Four CV-backed project families, including three interactive n8n case studies selected from a read-only workflow review
- A downloadable source CV plus structured career and education data
- Three original editorial images generated for the portfolio and stored locally as compressed WebP assets
- Eleven detailed, n8n-inspired workflow canvases, including the complete seven-workflow, 125-node RANA set, with audited node placement, colored section notes, branch routing, disabled-node states, recognizable node types, zoom controls, and node inspection
- Safe, browser-only workflow simulations with a visitor guide, editable mock payloads, an n8n-style execution toolbar, animated paths, and success, validation, duplicate, provider-failure, rate-limit, and reset states
- Light and dark themes with saved preference, system preference, and pre-render initialization
- Monochrome Simple Icons brand marks plus Phosphor concept icons for non-brand technologies
- Reusable workflow diagrams, project cards, service accordions, fallbacks, and calls to action
- Accessible mobile navigation, visible focus states, semantic structure, reduced-motion support, and labeled form validation
- Safe contact form placeholder with loading, success, error, and unconfigured states
- Graceful resume and project-image fallbacks
- Page-specific canonical URLs, Open Graph and Twitter metadata, JSON-LD, sitemap, robots rules, custom 404, loading, and error states
- Static export for Vercel plus Cloudflare Sites-compatible worker output
- Automated visual-contract checks that reject gradients, Lucide regressions, and em/en dashes in product UI source

## Technology stack

Next.js App Router, React, strict TypeScript, native CSS tokens through Tailwind CSS, Phosphor Icons, Simple Icons, Motion, vinext, and Cloudflare Workers tooling.

## Important folders

```text
app/                         Pages, layouts, metadata, and route states
scripts/                     Static-export SEO generation
src/components/              Reusable layout, project, contact, section, and UI components
src/data/                    Profile, project, service, navigation, social, and skill content
src/types/                   Shared TypeScript interfaces
public/images/editorial/     Original generated portfolio imagery
public/resume/               Public resume PDF
.openai/hosting.json         Sites deployment metadata
docs/workflow-review.md      Sanitized workflow inventory and selection rationale
```

## Installation and local development

```bash
pnpm install
pnpm dev
```

Open the local URL printed by the development server (normally `http://localhost:3000`).

## Production build

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm check
```

`pnpm check` runs strict type checking, lint, a static production build, and the complete test suite. Tests verify page rendering, project routes, canonical metadata, structured data, theme initialization, safe demo language, profile links, not-found behavior, all eleven workflow graphs, edge integrity, execution-path integrity, the public resume, local imagery, the package manifest, and absence of private n8n or secret material.

## Design system

The interface uses one warm monochrome surface system across light and dark themes, 1px borders, restrained 6-12px radii, a single muted blue accent, fast system-native typography, and small purposeful transitions. There are no gradients, neon effects, glass cards, oversized pills, or decorative dashboards. Motion is limited to hierarchy and feedback and is disabled when the visitor prefers reduced motion.

## Workflow case studies and demos

- **RANA AI Receptionist and Booking System:** protected gateway, structured intake, approved RAG, controlled AI decision, deterministic booking, reminders, escalation, and audit paths.
- **Inventory Replenishment and Draft RFQ Automation:** Odoo stock checks, PostgreSQL policies, duplicate controls, human approval, draft-only RFQ creation, and independent alerts.
- **B2B AI Lead Triage with Human Review:** a fictional-data prototype for structured Gemini triage and salesperson review.

The workflow explorers recreate the visible business architecture as sanitized portfolio diagrams: all seven RANA workflows and their 125 visible nodes, three inventory workflows, and one seven-node B2B lead-triage workflow. Every canvas preserves its audited n8n node names, arrangement, colored explanation regions, and connection branches; RANA also preserves AI sub-node relationships and disabled legacy nodes. A three-step visitor guide, editable fictional payload, and n8n-style execution toolbar let visitors switch workflows, inspect nodes, zoom the canvas, and animate success or failure paths.

These explorers are original UI simulations, not imported n8n JSON and not a copy of the private n8n editor. They use predefined sample records and local React state; they never call n8n, Odoo, Gemini, Google services, a CRM, a webhook, or a database. No credential metadata, authentication token, real endpoint, execution payload, workflow identifier, or customer record is included. Success and failure results are illustrative rather than production evidence. See [the sanitized review](docs/workflow-review.md) for selection and exclusion decisions.

## Theme system

The root layout reads `portfolio-theme` from `localStorage` before the page paints. If no saved value exists, it follows `prefers-color-scheme`; dark is the safe fallback. The navigation toggle updates the document theme and persists the choice. CSS custom properties drive both palettes, and reduced-motion preferences remain respected.

## Tool logos

Brand logos come from the locally installed `simple-icons` package and inherit the portfolio foreground color. Webhooks, REST APIs, AI models, and RAG systems are concepts rather than single vendor brands, so they use labeled Phosphor icons. No logo is fetched from a third-party CDN at runtime.

## Portfolio customization

Start with:

- `src/data/profile.ts`: name, title, bio, email, location, availability, social URLs, resume path, website URL
- `src/data/projects.ts`: case studies, workflow steps, tools, screenshots, and optional repository/demo URLs
- `src/data/services.ts`: service positioning and deliverables
- `src/data/skills.ts`: technologies and skill groups
- `src/data/navigation.ts`: global navigation

### Add a project

1. Add a new object to the `projects` array in `src/data/projects.ts`.
2. Use a unique numeric `id` and URL-safe `slug`.
3. Complete every required field defined by the `Project` interface in `src/types/index.ts`.
4. Add screenshot paths under the project’s `screenshots` array.
5. Leave `githubUrl` and `demoUrl` undefined until real public URLs exist.
6. Run `pnpm check`.

### Add screenshots

Save optimized `.webp`, `.png`, or `.jpg` files in `public/images/editorial/`, then reference them as `/images/editorial/filename.webp`. Missing images render a labeled fallback instead of a broken-image icon. See [the image-generation record](docs/image-generation.md) for the current assets and prompts.

### Add the resume

Place the real PDF at `public/resume/marlon-magno-resume.pdf`. The current download control checks that a PDF exists and shows “Resume coming soon” when it does not. Do not add invented education or employment details.

### Social links

Update `linkedIn`, `github`, and `email` once in `src/data/profile.ts`. The footer, contact page, and hero reuse those values. External profiles open in a new tab with `noopener noreferrer`; email uses a `mailto:` link.

## Contact form configuration

The MVP does not pretend to submit without a backend. Set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` to a Formspree, Web3Forms, custom route, or equivalent endpoint that accepts form POST requests. Copy `.env.example` to `.env.local` for local development.

Before production, validate requests on the server, sanitize stored or rendered content, add rate limiting and spam protection, restrict CORS where appropriate, and avoid logging message bodies or personal information.

## Environment variables

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=
```

Never place private API keys in variables prefixed with `NEXT_PUBLIC_`.

No n8n credential or local n8n URL is required by the portfolio demos. If a future server-side demo is approved, use private server-only variables such as:

```env
N8N_BASE_URL=
N8N_DEMO_WEBHOOK_SECRET=
```

Do not prefix secrets with `NEXT_PUBLIC_`, commit them, display them in client-rendered code, or expose a local/private n8n instance directly to website visitors.

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import it into Vercel. The repository exports static output through `next.config.ts`.
3. Set the two public environment variables.
4. Use the framework defaults and deploy.

### Netlify

Connect the repository, set the environment variables, run `pnpm build`, and publish `dist/client`.

### Cloudflare Pages / Workers

This project includes vinext and the Sites Vite/Worker output. Build with the included script and deploy the generated worker-compatible `dist` artifact through the configured hosting workflow.

The connected Sites deployment is intentionally private. Do not change it to public access without Marlon's explicit approval.

## Security checklist

- [x] Replace placeholder contact and social values
- [x] Keep portfolio demos disconnected from n8n and external providers
- [x] Exclude local n8n URLs, private workflow IDs, credential values, and customer data
- [x] Verify the public resume and generated imagery in automated tests
- [x] Confirm no secret patterns, private webhooks, or client data exist in the workflow models
- [ ] Review all environment variables and public files before each release
- [ ] Add rate limiting and server-side validation before enabling the contact endpoint
- [ ] Test the real contact provider from the production domain
- [x] Confirm project imagery contains no confidential information
- [x] Review the public resume
- [x] Run lint, TypeScript checking, tests, and a production build

## MVP limitations

There is no CMS, database, authentication, admin area, analytics, blog, real email backend, live workflow connection, or verified client metric. Provider actions and notifications in the demos are simulated. Production claims require provider sandbox testing, monitoring, user acceptance testing, and permission to publish supporting evidence.
