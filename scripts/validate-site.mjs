import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const indexPath = join(root, "index.html");
const html = readFileSync(indexPath, "utf8");
const errors = [];

const requiredFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "assets/favicon.svg",
  "assets/martenweave-mark.svg",
  "assets/og-image.svg",
  ".nojekyll",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    errors.push(`Missing required file: ${file}`);
  }
}

const idMatches = [...html.matchAll(/\sid="([^"]+)"/g)];
const ids = new Set(idMatches.map((match) => match[1]));
const anchorMatches = [...html.matchAll(/\shref="#([^"]+)"/g)];

for (const match of anchorMatches) {
  const id = match[1];
  if (!ids.has(id)) {
    errors.push(`Broken internal anchor: #${id}`);
  }
}

const rootAssetMatches = [
  ...html.matchAll(/\s(?:href|src|content)="(\/assets\/[^"]+|\/styles\.css|\/script\.js)"/g),
];

for (const match of rootAssetMatches) {
  const assetPath = match[1].replace(/^\//, "");
  if (!existsSync(join(root, assetPath))) {
    errors.push(`Broken root asset path: ${match[1]}`);
  }
}

const forbiddenSubpaths = ["/martenweave/", "/martenweave.github.io/", "/docs/", "/site/"];

for (const subpath of forbiddenSubpaths) {
  if (html.includes(`href="${subpath}`) || html.includes(`src="${subpath}`)) {
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

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Site validation passed: root assets, anchors, required copy, and GitHub links are valid.");
