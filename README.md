# Bruno Salgado Portfolio

A premium personal portfolio for a senior backend engineer / tech lead, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. The site is positioned for the Canadian market, especially fintech, SaaS, backend platform, and distributed systems roles.

## Stack

- Next.js 16.2 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons

## Features

- Premium homepage with recruiter-friendly positioning and strong personal-brand framing
- Dedicated pages for About, Experience, Skills, Writing, Contact, and Resume
- Projects hub plus 3 deep case-study pages
- Content-driven architecture with editable JSON sources
- Dark mode with persisted preference
- Responsive layout optimized for desktop and mobile
- SEO metadata, Open Graph image, sitemap, robots, and manifest
- Accessible navigation, focus states, and semantic structure
- Contact form that opens a pre-filled email draft immediately without requiring a third-party form service

## Project Structure

```text
app/
  about/
  contact/
  experience/
  projects/
    [slug]/
  resume/
  skills/
  writing/
    [slug]/
  globals.css
  layout.tsx
  manifest.ts
  opengraph-image.tsx
  robots.ts
  sitemap.ts
src/
  components/
    layout/
    motion/
    sections/
    ui/
  content/
    articles.json
    projects.json
    site.json
  lib/
  types/
```

## Getting Started

### Prerequisites

- Node.js 22 or newer
- npm 10 or newer

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Production build

```bash
npm run build
npm run start
```

### Type checking and linting

```bash
npm run typecheck
npm run lint
```

## Editing Content

Most copy and structured data lives in the JSON files below:

- `src/content/site.json`: profile, navigation, hero, about, experience, skills, and contact content
- `src/content/projects.json`: all 3 project summaries and case-study content
- `src/content/articles.json`: article previews and article page content

This keeps the marketing copy, case studies, and personal details easy to update later without rewriting page components.

## Design Notes

- Fonts use `Manrope` for the primary UI voice and `Fraunces` for serif-driven emphasis.
- The visual system aims for premium, technically mature restraint rather than a generic developer template.
- Color is intentionally subdued with warm neutrals, deep slate dark mode, and teal accents.
- Motion is limited to subtle reveal and navigation transitions.

## Contact Form Behavior

The contact form is intentionally simple and dependable. Submitting it opens a pre-filled email draft to Bruno's configured email address. This avoids reliance on third-party form services while remaining production-deployable.

If you later want server-side email delivery, the form component can be swapped for an API route or provider like Resend without restructuring the rest of the page.

## Deployment

### Recommended path: Vercel

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Set the production domain.
4. Add `NEXT_PUBLIC_SITE_URL` to match the live canonical URL.
5. Redeploy so metadata, sitemap, and Open Graph links point to the final domain.

The site is fully static/content-driven apart from the small client-side interactions, so it is a good fit for Vercel hosting.

## Customization Checklist

Before deploying publicly, update these values in `src/content/site.json`:

- LinkedIn URL
- GitHub URL
- email address
- canonical site URL
- location / market phrasing, if needed

If you want to attach a PDF resume, add the asset to `public/` and wire a download action from the Resume page.

## Future Improvements

- Add a CMS integration if Bruno wants article publishing without touching the repo
- Replace placeholder social links with final public handles
- Add project screenshots if standalone repositories and live demos are created later
- Introduce analytics and privacy-friendly event tracking
