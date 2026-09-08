# Bruno Salgado | Personal Portfolio

A content-driven portfolio for backend engineering and technical leadership. Built with Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion and Lucide. The three engineering studies include architecture proposals, scoped API contracts and executable models. They are not employer systems or production backends.

## Local development

Use Node.js 24 and npm. Dependencies are locked in `package-lock.json`.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. For a production-mode check:

```sh
npm run build
npm run start
```

## Quality checks

```sh
npm test
npm run lint
npm run typecheck
npm run format:check
npm run build
npm audit
```

With a production server running, use `npm run verify:http` for route, metadata, security-header and contract checks. Set `PORTFOLIO_BASE_URL` to test a different local port. Browser verification should also cover desktop and narrow mobile widths, keyboard navigation, light/dark mode, the contact draft, project models and reduced motion.

## Structure

```text
app/                       Routes, metadata, global styles and error boundaries
src/components/layout/     Navigation, theme, analytics and optional easter eggs
src/components/sections/   Reusable content surfaces and interactive models
src/content/               Editable JSON content
src/lib/                   Typed content and metadata helpers
src/types/                 Content contracts
projects/                  Independent, framework-free study models
public/designs/            Downloadable OpenAPI sketches
tests/                     Model invariants and content consistency checks
scripts/                   Production HTTP smoke checks
```

Most pages are Server Components. Only interactive controls use client state. The lightweight profile module does not import the study collection. Fonts are bundled locally; rendering does not require Google Fonts or a CMS. Page content remains visible if JavaScript is delayed.

## Editing content

- `src/content/site.json`: professional profile, canonical URL, social links, career dates, skills and reusable copy. Update `updatedAt` when published content changes.
- `src/content/projects.json`: study narrative, proposed boundaries, decisions, limitations and references.
- `src/content/articles.json`: the easter-egg guide.
- `src/content/social-posts.json`: manually selected, real LinkedIn embed URLs. Do not invent fallback post text.
- `src/lib/seo.ts`: consistent canonical, title, Open Graph and Twitter metadata.
- `app/opengraph-image.tsx`: the 1200 x 630 sharing image.

To feature another post, use LinkedIn's **Embed this post > Embed full post** option. Copy the exact embed URL and height into `social-posts.json`, along with a unique slug, descriptive title and the direct post link. The embed ID can differ from the activity ID in the direct link; do not substitute one for the other. Posts display in file order, newest selections first. Off-screen frames load lazily, and every post retains its direct LinkedIn link.

Use the same verified dates and job titles as the resume and LinkedIn. Do not add unverified performance metrics or describe a proposed service as implemented. Proposed backend stacks and the actual TypeScript models are deliberately labelled separately.

The resume page uses the same career data and supports Print / Save PDF. It is a portfolio career summary, not a replacement for an independently maintained application resume.

## Engineering studies

Each folder under `projects/` contains a pure TypeScript model and an extraction guide. The UI uses those exact transitions. Node's built-in test runner verifies model invariants without a database or external service.

- Payment orchestration: ambiguous outcomes, request identity and webhook deduplication.
- Money movement: integer minor units, balanced postings, hold/settle/release/reverse.
- Architecture decisions: revision checks, role boundaries and retained history.

The JSON API sketches specify the command shown in each study, not a complete service API. Storage, concurrency, actual authentication and provider integrations remain future work, explained on the study pages.

## Contact and privacy

The contact form creates a `mailto:` draft. It does not send messages or store contact fields. The email and LinkedIn links remain usable independently of the form. No API keys are needed.

Vercel Web Analytics runs only in Vercel's production environment. Its wrapper strips URL queries/fragments and honours browser Do Not Track. Enable Web Analytics in the Vercel project dashboard if not already enabled. The privacy page explains analytics, local theme storage and LinkedIn's third-party embeds. Embedded content may be blocked by the visitor's browser; the direct post link stays available.

## Deployment and branches

The repository root is the Next.js application. Import the repository in Vercel with the Next.js preset and Node.js 24. Use `npm ci` for installation and `npm run build` for the build.

Keep `NEXT_PUBLIC_SITE_URL=https://brunosalgado.dev` for the canonical production domain, or leave it unset to use the content configuration. Vercel preview builds are marked noindex and keep canonical URLs pointing to production.

Use the existing Git branch promotion workflow. Work on `dev`, review changes before promotion, and let Vercel's Git integration deploy the configured branches. No manual Vercel deployment is required. Roll back by reverting the relevant Git commit or using the approved deployment rollback process.

## Design and accessibility

The visual system uses Manrope, Fraunces, warm neutrals and a restrained green accent, with a separate dark palette. Shared spacing, buttons and section styles live in `app/globals.css` and the UI primitives.

Navigation has a keyboard-accessible mobile disclosure and skip link. Forms use native validation and labelled controls. Model results use live regions. Decorative effects respect reduced motion, ignore typing and key repeat, and can be dismissed with Escape.

LinkedIn frames are third-party surfaces; the site's CSS and accessibility controls cannot modify their contents.
