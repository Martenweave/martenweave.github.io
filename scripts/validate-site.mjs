import { existsSync, readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const productionOrigin = "https://martenweave.github.io";
const errors = [];

const docRoutes = [
  { source: "README.md", output: "index.html" },
  { source: "product.md", output: "product.html" },
  { source: "quickstart.md", output: "quickstart.html" },
  { source: "examples.md", output: "examples.html" },
  { source: "use-cases.md", output: "use-cases.html" },
  { source: "architecture.md", output: "architecture.html" },
  { source: "ai-governance.md", output: "ai-governance.html" },
  { source: "roadmap.md", output: "roadmap.html" },
  { source: "contributing-scenarios.md", output: "contributing-scenarios.html" },
  { source: "open-source.md", output: "open-source.html" },
];

const markdownDocs = docRoutes.map((route) => `docs/${route.source}`);
const generatedDocs = docRoutes.map((route) => `docs/${route.output}`);
const generatedDocRoutes = generatedDocs.map((file) => `/${file}`);
const publicDocRoutes = generatedDocRoutes.filter((route) => route !== "/docs/index.html");

const requiredFiles = [
  "index.html",
  "docs.html",
  "styles.css",
  "script.js",
  "scripts/build-docs.mjs",
  "assets/logo.png",
  "assets/favicon.svg",
  "assets/martenweave-mark.svg",
  "assets/og-image.svg",
  "llms.txt",
  "llms-full.txt",
  "ai.txt",
  "ai.json",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  ".nojekyll",
  ...markdownDocs,
  ...generatedDocs,
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    errors.push(`Missing required file: ${file}`);
  }
}

function readSiteFile(file) {
  return readFileSync(join(root, file), "utf8");
}

function routeToLocalPath(route) {
  if (route === "/" || route === "") {
    return "index.html";
  }
  const withoutSlash = route.replace(/^\//, "");
  return withoutSlash.endsWith("/") ? `${withoutSlash}index.html` : withoutSlash;
}

function splitHref(href) {
  const [withoutHash, hash = ""] = href.split("#");
  const [path] = withoutHash.split("?");
  return { path, hash };
}

function localTargetForHref(href, fromFile) {
  if (!href || href.startsWith("#")) {
    return null;
  }
  if (/^(mailto|tel):/i.test(href)) {
    return null;
  }
  if (/^https?:\/\//i.test(href)) {
    if (!href.startsWith(`${productionOrigin}/`) && href !== `${productionOrigin}/`) {
      return null;
    }
    const url = new URL(href);
    return routeToLocalPath(url.pathname);
  }

  const { path } = splitHref(href);
  if (path.startsWith("/")) {
    return routeToLocalPath(path);
  }

  return normalize(join(dirname(fromFile), path));
}

function idsForHtml(html) {
  return new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
}

const htmlFiles = ["index.html", "docs.html", ...generatedDocs];
const htmlByFile = new Map();
const idsByFile = new Map();

for (const file of htmlFiles) {
  if (!existsSync(join(root, file))) {
    continue;
  }
  const html = readSiteFile(file);
  htmlByFile.set(file, html);
  idsByFile.set(file, idsForHtml(html));
}

for (const [file, html] of htmlByFile.entries()) {
  const hrefMatches = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)];
  for (const match of hrefMatches) {
    const href = match[1];
    const { hash } = splitHref(href);

    if (href.startsWith("#")) {
      if (!idsByFile.get(file)?.has(hash)) {
        errors.push(`Broken internal anchor in ${file}: ${href}`);
      }
      continue;
    }

    const localPath = localTargetForHref(href, file);
    if (!localPath) {
      continue;
    }

    if (!existsSync(join(root, localPath))) {
      errors.push(`Broken local link in ${file}: ${href} -> ${localPath}`);
      continue;
    }

    if (hash && localPath.endsWith(".html")) {
      const targetHtml = htmlByFile.get(localPath) ?? readSiteFile(localPath);
      const targetIds = idsByFile.get(localPath) ?? idsForHtml(targetHtml);
      if (!targetIds.has(hash)) {
        errors.push(`Broken cross-page anchor in ${file}: ${href}`);
      }
    }
  }
}

const rootHtml = `${htmlByFile.get("index.html") ?? ""}\n${htmlByFile.get("docs.html") ?? ""}`;
const allHtml = [...htmlByFile.values()].join("\n");
const forbiddenSubpaths = ["/martenweave/", "/martenweave.github.io/", "/site/"];

for (const subpath of forbiddenSubpaths) {
  if (allHtml.includes(`href="${subpath}`) || allHtml.includes(`src="${subpath}`)) {
    errors.push(`Forbidden deployment subpath found: ${subpath}`);
  }
}

const staleRootMarkdownLinks = [...rootHtml.matchAll(/href="\/docs\/[^"]+\.md"/g)];
for (const match of staleRootMarkdownLinks) {
  errors.push(`Root page still links to Markdown doc route: ${match[0]}`);
}

const requiredText = [
  "AI proposes.",
  "Validators verify.",
  "Humans approve.",
  "Traceable model truth for governed data work.",
  "Backend-first. Human-approved. Built for real data model work.",
];

for (const text of requiredText) {
  if (!rootHtml.includes(text)) {
    errors.push(`Missing required copy: ${text}`);
  }
}

if (!rootHtml.includes('href="https://github.com/metalhatscats/martenweave-core"')) {
  errors.push("Missing product/core GitHub link.");
}

if (!rootHtml.includes('href="https://github.com/Martenweave/martenweave.github.io"')) {
  errors.push("Missing website GitHub link.");
}

const requiredRootLinks = [
  'href="/docs.html"',
  'href="/docs/quickstart.html"',
  'href="/docs/examples.html"',
  'href="/docs/product.html"',
  'href="/docs/open-source.html"',
  'href="/docs/ai-governance.html"',
  'href="/llms.txt"',
  'href="/ai.txt"',
];

for (const link of requiredRootLinks) {
  if (!rootHtml.includes(link)) {
    errors.push(`Missing required root link: ${link}`);
  }
}

const aiContext = readSiteFile("llms.txt");
const aiFullContext = readSiteFile("llms-full.txt");
const aiJson = JSON.parse(readSiteFile("ai.json"));
const sitemap = readSiteFile("sitemap.xml");

if (!aiContext.includes("AI proposes. Validators verify. Humans approve.")) {
  errors.push("llms.txt is missing the AI governance principle.");
}

for (const contextFile of [
  ["llms.txt", aiContext],
  ["llms-full.txt", aiFullContext],
]) {
  const [file, text] = contextFile;
  if (/https:\/\/martenweave\.github\.io\/docs\/[^)\s]+\.md/.test(text)) {
    errors.push(`${file} still points a public doc route at Markdown.`);
  }
  for (const route of publicDocRoutes) {
    if (!text.includes(`${productionOrigin}${route}`)) {
      errors.push(`${file} missing public doc route: ${route}`);
    }
  }
}

if (aiJson.url !== `${productionOrigin}/`) {
  errors.push("ai.json must identify the production root URL.");
}

if (!Array.isArray(aiJson.currentCapabilities) || aiJson.currentCapabilities.length < 6) {
  errors.push("ai.json must include currentCapabilities.");
}

if (!Array.isArray(aiJson.publicDocs)) {
  errors.push("ai.json must include publicDocs.");
} else {
  for (const route of publicDocRoutes) {
    if (!aiJson.publicDocs.includes(`${productionOrigin}${route}`)) {
      errors.push(`ai.json missing public doc route: ${route}`);
    }
  }
}

const sitemapLocs = [...sitemap.matchAll(/<loc>https:\/\/martenweave\.github\.io(\/[^<]*)<\/loc>/g)];

for (const match of sitemapLocs) {
  const route = match[1];
  const localPath = routeToLocalPath(route);
  if (!existsSync(join(root, localPath))) {
    errors.push(`Sitemap route does not map to a local file: ${route}`);
  }
}

for (const route of ["/docs.html", ...generatedDocRoutes]) {
  if (!sitemap.includes(`${productionOrigin}${route}`)) {
    errors.push(`Sitemap missing route: ${route}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Site validation passed: ${htmlFiles.length} HTML files, generated doc routes, links, sitemap, and AI discovery files are valid.`,
);
