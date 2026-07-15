import { existsSync, readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const productionOrigin = "https://martenweave.github.io";
const errors = [];

const docRoutes = [
  { source: "README.md", output: "index.html" },
  { source: "product.md", output: "product.html" },
  { source: "how-it-works.md", output: "how-it-works.html" },
  { source: "import-export.md", output: "import-export.html" },
  { source: "governance.md", output: "governance.html" },
  { source: "quickstart.md", output: "quickstart.html" },
  { source: "local-viewer.md", output: "local-viewer.html" },
  { source: "examples.md", output: "examples.html" },
  { source: "use-cases.md", output: "use-cases.html" },
  { source: "use-cases/sap-migration.md", output: "use-cases/sap-migration.html" },
  { source: "architecture.md", output: "architecture.html" },
  { source: "ai-governance.md", output: "ai-governance.html" },
  { source: "faq.md", output: "faq.html" },
  { source: "release-proof.md", output: "release-proof.html" },
  { source: "roadmap.md", output: "roadmap.html" },
  { source: "contributing-scenarios.md", output: "contributing-scenarios.html" },
  { source: "open-source.md", output: "open-source.html" },
  { source: "capabilities.md", output: "capabilities.html" },
  { source: "pilot-projects.md", output: "pilot-projects.html" },
  { source: "consulting.md", output: "consulting.html" },
  { source: "engagement.md", output: "engagement.html" },
  { source: "contact.md", output: "contact.html" },
];

const markdownDocs = docRoutes.map((route) => `docs/${route.source}`);
const generatedDocs = docRoutes.map((route) => `docs/${route.output}`);
const generatedDocRoutes = generatedDocs.map((file) => `/${file}`);
const publicDocRoutes = generatedDocRoutes.filter((route) => route !== "/docs/index.html");
const publicBlogRoutes = [
  "/blog/",
  "/blog/sap-mdg-implementation-knowledge.html",
  "/blog/sap-migration-mapping-spreadsheets.html",
  "/blog/detect-dataset-gaps-before-sap-migration-testing.html",
  "/blog/impact-analysis-sap-field-change.html",
  "/blog/trace-legacy-field-to-sap-target.html",
  "/blog/deterministic-validation-migration-risk.html",
  "/blog/evidence-based-migration-readiness-report.html",
  "/blog/how-deterministic-model-validation-works.html",
];
const publicContentRoutes = [...publicDocRoutes, "/blog/"];
const publicHtmlFiles = [
  "index.html",
  "docs.html",
  ...generatedDocs.filter((file) => file !== "docs/index.html"),
  ...publicBlogRoutes.map((route) => (route === "/blog/" ? "blog/index.html" : route.slice(1))),
];

const requiredFiles = [
  "index.html",
  "docs.html",
  "styles.css",
  "home.css",
  "home.js",
  "script.js",
  "scripts/build-docs.mjs",
  "assets/README.md",
  "assets/logo.svg",
  "assets/logo.png",
  "assets/favicon.svg",
  "assets/favicon-16.png",
  "assets/favicon-32.png",
  "assets/apple-touch-icon.png",
  "assets/android-chrome-192.png",
  "assets/android-chrome-512.png",
  "assets/martenweave-mark.svg",
  "assets/og-image.png",
  "assets/twitter-card.png",
  "assets/github-social-preview.png",
  "assets/architecture-loop.svg",
  "assets/screenshots/homepage-desktop.png",
  "assets/screenshots/homepage-mobile.png",
  "assets/screenshots/docs-index-desktop.png",
  "assets/screenshots/docs-quickstart-desktop.png",
  "llms.txt",
  "llms-full.txt",
  "ai.txt",
  "ai.json",
  "humans.txt",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  ".nojekyll",
  "docs/search-index.json",
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

function pngDimensions(file) {
  const bytes = readFileSync(join(root, file));
  if (
    bytes.length < 24 ||
    bytes[0] !== 0x89 ||
    bytes[1] !== 0x50 ||
    bytes[2] !== 0x4e ||
    bytes[3] !== 0x47
  ) {
    errors.push(`${file} is not a PNG file.`);
    return null;
  }
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  };
}

function expectPngDimensions(file, width, height) {
  if (!existsSync(join(root, file))) {
    return;
  }
  const dimensions = pngDimensions(file);
  if (!dimensions) {
    return;
  }
  if (dimensions.width !== width || dimensions.height !== height) {
    errors.push(`${file} must be ${width}x${height}, got ${dimensions.width}x${dimensions.height}.`);
  }
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

const htmlFiles = ["index.html", "docs.html", ...generatedDocs, ...publicHtmlFiles.filter((file) => file.startsWith("blog/"))];
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

function htmlAttributeContent(html, pattern) {
  return html.match(pattern)?.[1] ?? null;
}

const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();

for (const file of publicHtmlFiles) {
  const html = htmlByFile.get(file) ?? "";
  const title = htmlAttributeContent(html, /<title>([\s\S]*?)<\/title>/);
  const description = htmlAttributeContent(
    html,
    /<meta\s+name="description"\s+content="([^"]+)"/,
  );
  const canonical = htmlAttributeContent(html, /<link rel="canonical" href="([^"]+)"/);

  for (const [label, value, collection] of [
    ["title", title, titles],
    ["description", description, descriptions],
    ["canonical", canonical, canonicals],
  ]) {
    if (!value) {
      errors.push(`${file} is missing a ${label}.`);
      continue;
    }
    if (collection.has(value)) {
      errors.push(`${file} duplicates ${label} from ${collection.get(value)}: ${value}`);
    } else {
      collection.set(value, file);
    }
  }

  const requiredMetadata = [
    'name="robots" content="index, follow, max-image-preview:large"',
    'name="author" content="Dzmitryi Kharlanau"',
    'name="application-name" content="Martenweave"',
    'name="theme-color" content="#321136"',
    'property="og:locale" content="en_US"',
    'property="og:site_name" content="Martenweave"',
    'property="og:image:alt" content="Martenweave open-source data model registry"',
    'name="twitter:card" content="summary_large_image"',
    'name="twitter:image:alt" content="Martenweave open-source data model registry"',
    'rel="alternate" type="text/plain" href="/llms.txt"',
    'rel="alternate" type="text/plain"',
    'href="/llms-full.txt"',
    'rel="alternate" type="application/json" href="/ai.json"',
  ];

  for (const metadata of requiredMetadata) {
    if (!html.includes(metadata)) {
      errors.push(`${file} is missing required metadata: ${metadata}`);
    }
  }

  for (const property of [
    "og:url",
    "og:title",
    "og:description",
    "og:image",
    "og:image:width",
    "og:image:height",
  ]) {
    if (!html.includes(`property="${property}"`)) {
      errors.push(`${file} is missing Open Graph property: ${property}`);
    }
  }

  for (const name of ["twitter:title", "twitter:description", "twitter:image"]) {
    if (!html.includes(`name="${name}"`)) {
      errors.push(`${file} is missing Twitter metadata: ${name}`);
    }
  }
}

const duplicateDocsIndex = htmlByFile.get("docs/index.html") ?? "";
if (
  !duplicateDocsIndex.includes('name="robots" content="noindex, follow"') ||
  !duplicateDocsIndex.includes(
    '<link rel="canonical" href="https://martenweave.github.io/docs.html"',
  )
) {
  errors.push("docs/index.html must be noindex and canonicalize to /docs.html.");
}

const referencedAssetMatches = [
  ...allHtml.matchAll(/\s(?:href|src)="(\/assets\/[^"]+)"/g),
  ...allHtml.matchAll(/\scontent="https:\/\/martenweave\.github\.io(\/assets\/[^"]+)"/g),
  ...readSiteFile("site.webmanifest").matchAll(/"(\/assets\/[^"]+)"/g),
  ...readSiteFile("ai.json").matchAll(/"https:\/\/martenweave\.github\.io(\/assets\/[^"]+)"/g),
];

for (const match of referencedAssetMatches) {
  const assetPath = routeToLocalPath(match[1]);
  if (!existsSync(join(root, assetPath))) {
    errors.push(`Referenced asset is missing: ${match[1]} -> ${assetPath}`);
  }
}

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
  "Open-source model governance and evidence for SAP migration and MDM.",
  "Model governance pipeline",
  "Apache 2.0 open source",
  "Canonical files",
  "Deterministic validation",
  "Human-approved AI",
  "Agents propose.",
  "Validators verify.",
  "Humans approve.",
  "Git records.",
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
  'href="/docs/how-it-works.html"',
  'href="/docs/import-export.html"',
  'href="/docs/governance.html"',
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
const aiText = readSiteFile("ai.txt");
const aiJson = JSON.parse(readSiteFile("ai.json"));
const humans = readSiteFile("humans.txt");
const sitemap = readSiteFile("sitemap.xml");
const robots = readSiteFile("robots.txt");
const manifest = JSON.parse(readSiteFile("site.webmanifest"));
const staleVersion = ["0", "4", "0"].join(".");

for (const [file, text] of [
  ["llms.txt", aiContext],
  ["llms-full.txt", aiFullContext],
  ["ai.txt", aiText],
]) {
  if (!text.includes("0.5.0")) {
    errors.push(`${file} must include version 0.5.0.`);
  }
  if (text.includes(staleVersion)) {
    errors.push(`${file} must not include stale version ${staleVersion}.`);
  }
}

if (!aiContext.includes("Agents propose. Validators verify. Humans approve. Git records.")) {
  errors.push("llms.txt is missing the AI governance principle.");
}

for (const [file, text] of [
  ["llms.txt", aiContext],
  ["llms-full.txt", aiFullContext],
  ["ai.txt", aiText],
  ["ai.json", JSON.stringify(aiJson)],
]) {
  for (const requiredPhrase of [
    "canonical",
    "generated",
    "Agents propose",
    "direct SAP write-back",
    "chatbot",
  ]) {
    if (!text.includes(requiredPhrase)) {
      errors.push(`${file} is missing required identity language: ${requiredPhrase}`);
    }
  }
}

if (!humans.includes("Dzmitryi Kharlanau") || !humans.includes("https://github.com/Martenweave")) {
  errors.push("humans.txt must identify the maintainer and Martenweave organization.");
}

const requiredHomepageHead = [
  '<link rel="canonical" href="https://martenweave.github.io/"',
  '<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"',
  '<link rel="icon" sizes="16x16" href="/assets/favicon-16.png" type="image/png"',
  '<link rel="icon" sizes="32x32" href="/assets/favicon-32.png" type="image/png"',
  '<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"',
  '<link rel="manifest" href="/site.webmanifest"',
  '<meta property="og:image" content="https://martenweave.github.io/assets/og-image.png"',
  '<meta name="twitter:image" content="https://martenweave.github.io/assets/twitter-card.png"',
];

const homepageHtml = htmlByFile.get("index.html") ?? "";
for (const snippet of requiredHomepageHead) {
  if (!homepageHtml.includes(snippet)) {
    errors.push(`Homepage head missing required metadata: ${snippet}`);
  }
}

if (manifest.name !== "Martenweave" || manifest.short_name !== "Martenweave") {
  errors.push("site.webmanifest must use Martenweave name fields.");
}

if (manifest.start_url !== "/" || manifest.display !== "minimal-ui") {
  errors.push("site.webmanifest must use start_url / and display minimal-ui.");
}

if (
  manifest.description !==
  "Model truth for migration, MDM, and governance teams."
) {
  errors.push("site.webmanifest must use the approved short product description.");
}

const manifestIconSources = new Set((manifest.icons ?? []).map((icon) => icon.src));
for (const icon of ["/assets/android-chrome-192.png", "/assets/android-chrome-512.png"]) {
  if (!manifestIconSources.has(icon)) {
    errors.push(`site.webmanifest missing icon: ${icon}`);
  }
}

expectPngDimensions("assets/favicon-16.png", 16, 16);
expectPngDimensions("assets/favicon-32.png", 32, 32);
expectPngDimensions("assets/apple-touch-icon.png", 180, 180);
expectPngDimensions("assets/android-chrome-192.png", 192, 192);
expectPngDimensions("assets/android-chrome-512.png", 512, 512);
expectPngDimensions("assets/og-image.png", 1200, 630);
expectPngDimensions("assets/twitter-card.png", 1200, 630);
expectPngDimensions("assets/github-social-preview.png", 1280, 640);

for (const file of [
  "assets/og-image.png",
  "assets/twitter-card.png",
  "assets/github-social-preview.png",
]) {
  if (existsSync(join(root, file)) && readFileSync(join(root, file)).length > 500_000) {
    errors.push(`${file} must remain below 500 KB.`);
  }
}

for (const contextFile of [
  ["llms.txt", aiContext],
  ["llms-full.txt", aiFullContext],
]) {
  const [file, text] = contextFile;
  if (/https:\/\/martenweave\.github\.io\/docs\/[^)\s]+\.md/.test(text)) {
    errors.push(`${file} still points a public doc route at Markdown.`);
  }
  for (const route of publicContentRoutes) {
    if (!text.includes(`${productionOrigin}${route}`)) {
      errors.push(`${file} missing public doc route: ${route}`);
    }
  }
}

if (aiJson.url !== `${productionOrigin}/`) {
  errors.push("ai.json must identify the production root URL.");
}

if (aiJson.packageVersion !== "0.5.0" || aiJson.corePackage?.version !== "0.5.0") {
  errors.push("ai.json package version fields must be 0.5.0.");
}

if (!Array.isArray(aiJson.capabilities) || aiJson.capabilities.length < 6) {
  errors.push("ai.json must include capabilities.");
}

if (!Array.isArray(aiJson.publicDocs)) {
  errors.push("ai.json must include publicDocs.");
} else {
  for (const route of publicContentRoutes) {
    if (!aiJson.publicDocs.includes(`${productionOrigin}${route}`)) {
      errors.push(`ai.json missing public doc route: ${route}`);
    }
  }
}

for (const crawler of ["OAI-SearchBot", "GPTBot", "ChatGPT-User"]) {
  if (!robots.includes(`User-agent: ${crawler}`) || !robots.includes("Allow: /")) {
    errors.push(`robots.txt must explicitly allow ${crawler}.`);
  }
}

for (const file of publicHtmlFiles) {
  const blocks = [
    ...(htmlByFile.get(file) ?? "").matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ];
  if (blocks.length === 0) {
    errors.push(`${file} must include JSON-LD structured data.`);
    continue;
  }
  for (const block of blocks) {
    const data = JSON.parse(block[1]);
    const graph = data["@graph"] ?? [data];
    if (!graph.some((entity) => ["WebPage", "CollectionPage"].includes(entity["@type"]))) {
      errors.push(`${file} JSON-LD must identify its page type.`);
    }
  }
}

const homepageJsonLd = JSON.parse(
  [...(htmlByFile.get("index.html") ?? "").matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )][0]?.[1] ?? "{}",
);
const homepageGraph = homepageJsonLd["@graph"] ?? [];
for (const type of [
  "WebSite",
  "Organization",
  "Person",
  "WebPage",
  "SoftwareSourceCode",
  "SoftwareApplication",
]) {
  if (!homepageGraph.some((entity) => entity["@type"] === type)) {
    errors.push(`Homepage JSON-LD graph is missing ${type}.`);
  }
}

const sourceCode = homepageGraph.find((entity) => entity["@type"] === "SoftwareSourceCode");
if (
  sourceCode?.name !== "Martenweave Core" ||
  sourceCode?.alternateName !== "martenweave-core" ||
  sourceCode?.softwareVersion !== "0.5.0" ||
  sourceCode?.version !== "0.5.0" ||
  sourceCode?.programmingLanguage !== "Python" ||
  sourceCode?.runtimePlatform !== "Python 3.11+" ||
  sourceCode?.codeRepository !== "https://github.com/metalhatscats/martenweave-core"
) {
  errors.push("Homepage SoftwareSourceCode JSON-LD is incomplete.");
}

const faqHtml = htmlByFile.get("docs/faq.html") ?? "";
const faqData = JSON.parse(
  [...faqHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)][0]?.[1] ??
    "{}",
);
const faqEntity = (faqData["@graph"] ?? []).find((entity) => entity["@type"] === "FAQPage");
if (!Array.isArray(faqEntity?.mainEntity) || faqEntity.mainEntity.length < 5) {
  errors.push("FAQ JSON-LD must contain the real FAQ questions and answers.");
}

const sitemapLocs = [...sitemap.matchAll(/<loc>https:\/\/martenweave\.github\.io(\/[^<]*)<\/loc>/g)];

for (const match of sitemapLocs) {
  const route = match[1];
  const localPath = routeToLocalPath(route);
  if (!existsSync(join(root, localPath))) {
    errors.push(`Sitemap route does not map to a local file: ${route}`);
  }
}

const requiredSitemapRoutes = [
  "/",
  "/docs.html",
  "/llms.txt",
  "/llms-full.txt",
  "/ai.txt",
  "/ai.json",
  "/humans.txt",
  ...publicContentRoutes,
];

for (const route of requiredSitemapRoutes) {
  if (!sitemap.includes(`${productionOrigin}${route}`)) {
    errors.push(`Sitemap missing route: ${route}`);
  }
}

if (
  sitemap.includes(`${productionOrigin}/docs/index.html`) ||
  sitemap.includes("<priority>") ||
  sitemap.includes("<changefreq>")
) {
  errors.push("Sitemap must omit the duplicate docs index and artificial priority/changefreq.");
}

const sitemapRoutes = sitemapLocs.map((match) => match[1]);
if (new Set(sitemapRoutes).size !== sitemapRoutes.length) {
  errors.push("Sitemap contains duplicate URLs.");
}

if (!robots.includes(`Sitemap: ${productionOrigin}/sitemap.xml`) || /Disallow:\s*\//.test(robots)) {
  errors.push("robots.txt must allow public crawling and reference the production sitemap.");
}

const publicText = [
  ...htmlByFile.values(),
  aiContext,
  aiFullContext,
  aiText,
  JSON.stringify(aiJson),
  sitemap,
  robots,
  humans,
].join("\n");
for (const privatePath of ["/Users/", "/home/", "C:\\Users\\", "file://"]) {
  if (publicText.includes(privatePath)) {
    errors.push(`Public files contain a private or local path: ${privatePath}`);
  }
}

const allPublicMetadata = `${aiContext}\n${aiFullContext}\n${aiText}\n${JSON.stringify(aiJson)}\n${allHtml}`;
const sap = "SAP";
const customerLogo = ["customer", "logo"].join(" ");
const endorsementTerm = ["test", "imonial"].join("");
const riskyClaimPatterns = [
  new RegExp(`${sap}-certified`, "i"),
  new RegExp(`\\b${sap} partner\\b`, "i"),
  new RegExp(`official ${sap} partner`, "i"),
  new RegExp(`\\b${customerLogo}\\b`, "i"),
  new RegExp(`\\b${endorsementTerm}\\b`, "i"),
  /Martenweave is a formal partner of SAP/i,
  /Martenweave is certified by SAP/i,
  /customer proof assets? from/i,
  /customer endorsements? from/i,
  /paid plans? start/i,
  /priced at/i,
];

for (const pattern of riskyClaimPatterns) {
  if (pattern.test(allPublicMetadata)) {
    errors.push(`Forbidden or over-specific claim pattern found: ${pattern}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Site validation passed: ${htmlFiles.length} HTML files, generated doc routes, links, sitemap, and AI discovery files are valid.`,
);
