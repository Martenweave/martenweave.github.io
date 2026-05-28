import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const indexPath = join(root, "index.html");
const html = readFileSync(indexPath, "utf8");
const docsHtml = readFileSync(join(root, "docs.html"), "utf8");
const errors = [];

const requiredFiles = [
  "index.html",
  "docs.html",
  "styles.css",
  "script.js",
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
  "docs/README.md",
  "docs/product.md",
  "docs/use-cases.md",
  "docs/architecture.md",
  "docs/ai-governance.md",
  "docs/roadmap.md",
  "docs/contributing-scenarios.md",
  ".nojekyll",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    errors.push(`Missing required file: ${file}`);
  }
}

const combinedHtml = `${html}\n${docsHtml}`;
const idMatches = [...combinedHtml.matchAll(/\sid="([^"]+)"/g)];
const ids = new Set(idMatches.map((match) => match[1]));
const anchorMatches = [...combinedHtml.matchAll(/\shref="#([^"]+)"/g)];

for (const match of anchorMatches) {
  const id = match[1];
  if (!ids.has(id)) {
    errors.push(`Broken internal anchor: #${id}`);
  }
}

const rootAssetMatches = [
  ...combinedHtml.matchAll(
    /\s(?:href|src|content)="(\/[^"#]+)"/g,
  ),
];

for (const match of rootAssetMatches) {
  const rootPath = match[1];
  if (rootPath === "/") {
    continue;
  }
  const localPath = rootPath.replace(/^\//, "");
  if (!existsSync(join(root, localPath))) {
    errors.push(`Broken root path: ${rootPath}`);
  }
}

const forbiddenSubpaths = ["/martenweave/", "/martenweave.github.io/", "/site/"];

for (const subpath of forbiddenSubpaths) {
  if (combinedHtml.includes(`href="${subpath}`) || combinedHtml.includes(`src="${subpath}`)) {
    errors.push(`Forbidden deployment subpath found: ${subpath}`);
  }
}

const requiredText = [
  "AI proposes.",
  "Validators verify.",
  "Humans approve.",
  "Traceability over folklore.",
  "Backend-first. Human-approved. Built for real data model work.",
];

for (const text of requiredText) {
  if (!html.includes(text)) {
    errors.push(`Missing required copy: ${text}`);
  }
}

if (!html.includes('href="https://github.com/metalhatscats/martenweave-core"')) {
  errors.push("Missing product/core GitHub link.");
}

if (!html.includes('href="https://github.com/Martenweave/martenweave.github.io"')) {
  errors.push("Missing website GitHub link.");
}

const requiredRootLinks = [
  'href="/docs.html"',
  'href="/docs/product.md"',
  'href="/docs/ai-governance.md"',
  'href="/llms.txt"',
  'href="/ai.txt"',
];

for (const link of requiredRootLinks) {
  if (!combinedHtml.includes(link)) {
    errors.push(`Missing required root link: ${link}`);
  }
}

const aiContext = readFileSync(join(root, "llms.txt"), "utf8");
const aiJson = JSON.parse(readFileSync(join(root, "ai.json"), "utf8"));
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");

if (!aiContext.includes("AI proposes. Validators verify. Humans approve.")) {
  errors.push("llms.txt is missing the AI governance principle.");
}

if (aiJson.url !== "https://martenweave.github.io/") {
  errors.push("ai.json must identify the production root URL.");
}

if (!Array.isArray(aiJson.currentCapabilities) || aiJson.currentCapabilities.length < 6) {
  errors.push("ai.json must include currentCapabilities.");
}

const sitemapLocs = [...sitemap.matchAll(/<loc>https:\/\/martenweave\.github\.io(\/[^<]*)<\/loc>/g)];

for (const match of sitemapLocs) {
  const route = match[1];
  const localPath = route === "/" ? "index.html" : route.replace(/^\//, "");
  if (!existsSync(join(root, localPath))) {
    errors.push(`Sitemap route does not map to a local file: ${route}`);
  }
}

for (const file of [
  "/docs.html",
  "/docs/product.md",
  "/docs/use-cases.md",
  "/docs/architecture.md",
  "/docs/ai-governance.md",
  "/docs/roadmap.md",
  "/docs/contributing-scenarios.md",
]) {
  if (!sitemap.includes(`https://martenweave.github.io${file}`)) {
    errors.push(`Sitemap missing route: ${file}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Site validation passed: root assets, anchors, required copy, and GitHub links are valid.");
