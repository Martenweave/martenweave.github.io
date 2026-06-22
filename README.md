# Martenweave Website

This repository contains the public GitHub Pages website for Martenweave.

Production URL:

https://martenweave.github.io

Repository:

https://github.com/Martenweave/martenweave.github.io

Product/core repository:

https://github.com/metalhatscats/martenweave-core

## What This Site Is

This is the public product entry point for Martenweave: a backend-first, AI-assisted MDM model registry for SAP migration, MDM, data governance, data quality, and AMS/support teams.

The site explains:

- what Martenweave is
- what pain it solves
- what exists in the core package today
- why it is not a chatbot
- how AI is controlled
- where to read docs
- how to contribute scenarios

## Stack

The site is plain static HTML, CSS, SVG/PNG assets, Markdown docs, and a small JavaScript file.

There is no application framework, no backend, no login/auth, and no build output directory. GitHub Pages serves the repository root.

## Local Development

Install npm metadata and run validation:

```bash
npm install
npm run validate
```

Preview locally:

```bash
npm run preview
```

Then open:

http://localhost:4173

## Build And Validation

There is no compilation step. The build command runs the static validator:

```bash
npm run build
```

The validator checks:

- required files
- root-relative paths
- internal anchors
- docs files
- sitemap entries
- required product positioning
- required GitHub links
- required AI/search files
- absence of forbidden project-page subpaths

## Deployment

This is an organization GitHub Pages repository. GitHub Pages must serve from:

- branch: `main`
- path: `/`
- URL: `https://martenweave.github.io`

Rules:

- Do not configure a custom domain.
- Do not deploy under `/martenweave`, `/martenweave.github.io`, `/site`, or another project-page subpath.
- Keep internal assets root-relative, for example `/assets/logo.png`.
- Keep `.nojekyll` so GitHub Pages serves static files directly.

## Documentation Structure

Public docs live in:

- `docs.html` — visual docs index
- `docs/*.md` — editable documentation source
- `docs/*.html` — generated browser-readable documentation pages
- `scripts/build-docs.mjs` — lightweight static docs generator with no frontend framework

Deep implementation documentation lives in the core repository:

https://github.com/metalhatscats/martenweave-core/tree/main/docs

## AI/Search Discovery Files

These files help AI systems and search crawlers understand Martenweave accurately:

- `llms.txt` — short authoritative summary
- `llms-full.txt` — fuller AI-readable product context
- `ai.txt` — concise identity and “do not misdescribe” rules
- `ai.json` — machine-readable product identity
- `robots.txt` — crawler policy
- `sitemap.xml` — public routes and discovery files
- `site.webmanifest` — app/site metadata

When positioning changes, update the homepage, docs, `llms-full.txt`, and `ai.json` together.

## Safe Content Rules

Do not add:

- fake customers
- fake testimonials
- fake pricing
- SAP certification claims
- SAP partnership claims
- login/auth flows
- backend logic
- claims that AI silently mutates model truth

SAP may be mentioned as a migration scenario and domain-pack context, not as official affiliation.

## Updating Content

1. Edit `index.html` for homepage changes.
2. Edit `styles.css` for visual changes.
3. Edit Markdown files in `docs/` for public docs.
4. Run `npm run build:docs` to regenerate browser-readable docs pages.
5. Update `llms.txt`, `llms-full.txt`, `ai.txt`, and `ai.json` when the product story changes.
6. Keep all root deployment links and assets root-relative.
7. Run `npm run validate`.
8. Commit and push to `main`.
