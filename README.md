# Marlon Magno — AI Automation Specialist Portfolio

A polished, multi-page portfolio for presenting automation projects to recruiters, clients, agencies, and remote employers. The content is intentionally honest: starter case studies are labeled as portfolio projects, expected impact is separated from verified results, and optional links are hidden until configured.

## Features

- Responsive Home, Projects, Project Case Study, About, Services, and Contact pages
- Filterable project library powered by structured TypeScript data
- Reusable workflow diagrams, project cards, service cards, fallbacks, and calls to action
- Accessible mobile navigation, visible focus states, semantic structure, reduced-motion support, and labeled form validation
- Safe contact form placeholder with loading, success, error, and unconfigured states
- Graceful resume and project-image fallbacks
- SEO metadata, sitemap, robots rules, custom 404, loading, and error states
- Cloudflare Sites-compatible output and standard Next.js deployment support

## Technology stack

Next.js App Router, React, TypeScript (strict), Tailwind CSS, Lucide React, Motion, vinext, and Cloudflare Workers tooling.

## Important folders

```text
app/                         Pages, layouts, metadata, states, sitemap
src/components/              Reusable layout, project, contact, section, and UI components
src/data/                    Profile, project, service, navigation, social, and skill content
src/types/                   Shared TypeScript interfaces
public/images/projects/      Project screenshots
public/resume/               Public resume PDF
.openai/hosting.json         Sites deployment metadata
```

## Installation and local development

```bash
pnpm install
pnpm dev
```

Open the local URL printed by the development server (normally `http://localhost:3000`).

## Production build

```bash
pnpm build
```

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
6. Run lint and a production build.

### Add screenshots

Save optimized `.webp`, `.png`, or `.jpg` files in `public/images/projects/`, then reference them as `/images/projects/filename.webp`. Missing images render a labeled fallback instead of a broken-image icon.

### Add the resume

Place the real PDF at `public/resume/marlon-magno-resume.pdf`. The current download control checks that a PDF exists and shows “Resume coming soon” when it does not. Do not add invented education or employment details.

### Replace social links

Update `linkedIn`, `github`, and `email` once in `src/data/profile.ts`. The navigation, footer, contact page, and hero reuse those values.

## Contact form configuration

The MVP does not pretend to submit without a backend. Set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` to a Formspree, Web3Forms, custom route, or equivalent endpoint that accepts form POST requests. Copy `.env.example` to `.env.local` for local development.

Before production, validate requests on the server, sanitize stored or rendered content, add rate limiting and spam protection, restrict CORS where appropriate, and avoid logging message bodies or personal information.

## Environment variables

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=
```

Never place private API keys in variables prefixed with `NEXT_PUBLIC_`.

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Set the two public environment variables.
4. Use the framework defaults and deploy.

### Netlify

Connect the repository using Netlify’s current Next.js runtime, set the environment variables, and use the standard build command. Verify App Router support in the selected runtime version.

### Cloudflare Pages / Workers

This project includes vinext and the Sites Vite/Worker output. Build with the included script and deploy the generated worker-compatible `dist` artifact through the configured hosting workflow.

## Security checklist

- [ ] Replace placeholder contact and social values
- [ ] Review all environment variables and public files
- [ ] Confirm no secrets, tokens, private webhooks, or client data are committed
- [ ] Add rate limiting and server-side validation before enabling the contact endpoint
- [ ] Test the real contact provider from the production domain
- [ ] Confirm project screenshots contain no confidential information
- [ ] Review the public resume
- [ ] Run lint, TypeScript checking, tests, and a production build

## MVP limitations

There is no CMS, database, authentication, admin area, analytics, blog, real email backend, or verified client metrics. Those can be added later when there is a real operational need.
