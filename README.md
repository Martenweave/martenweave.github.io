# Martenweave Website

This repository contains the public GitHub Pages product website for Martenweave.

Production target:

https://martenweave.github.io

Repository:

https://github.com/Martenweave/martenweave.github.io

Product/core repository:

https://github.com/metalhatscats/martenweave-core

## Stack

The site is plain static HTML, CSS, SVG, and a small JavaScript file. There is no application
framework, no backend, and no build output directory. GitHub Pages serves the repository root.

## Local development

Install the empty npm project metadata and run validation:

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

## Build

There is no compilation step. The build command runs the static validation script:

```bash
npm run build
```

The validator checks:

- required files
- root-relative asset paths
- internal anchor links
- required positioning copy
- GitHub links
- absence of forbidden project-page subpaths

## Deployment

GitHub Pages is configured to serve from the `main` branch root (`/`). This is an organization
Pages repository, so the production URL is:

https://martenweave.github.io

Do not configure a custom domain. Do not move the site under `/docs`, `/site`, or any project-page
subpath.

## Updating content

Most content lives in `index.html`. Visual styling lives in `styles.css`. The brand mark, favicon,
and OpenGraph image are SVG files in `assets/`.

When changing content:

1. Edit `index.html`.
2. Keep internal links as root or hash links.
3. Keep assets root-relative, for example `/assets/favicon.svg`.
4. Run `npm run validate`.
5. Commit and push to `main`.
