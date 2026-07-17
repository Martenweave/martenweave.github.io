import { existsSync, readdirSync, readFileSync } from "node:fs";
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
  { source: "author.md", output: "author.html" },
  { source: "contact.md", output: "contact.html" },
];

const markdownDocs = docRoutes.map((route) => `docs/${route.source}`);
const generatedDocs = docRoutes.map((route) => `docs/${route.output}`);
const generatedDocRoutes = generatedDocs.map((file) => `/${file}`);
const publicDocRoutes = generatedDocRoutes.filter((route) => route !== "/docs/index.html");
const blogSourceFiles = readdirSync(join(root, "docs", "blog")).filter((file) => /^\d+-.*\.md$/.test(file));
const publicBlogRoutes = [
  "/blog/",
  ...readdirSync(join(root, "blog"))
    .filter((file) => file.endsWith(".html") && file !== "index.html")
    .map((file) => `/blog/${file}`)
    .sort(),
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
  "assets/model-atlas-hero.png",
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
  "feed.xml",
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
    'name="martenweave-deployment-ref" content="main"',
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
    'rel="alternate" type="application/rss+xml" href="/feed.xml"',
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
  "Make every model decision explainable before it becomes expensive.",
  "Apache 2.0 open source",
  "Canonical files",
  "Derived indexes",
  "A visible path from signal to approval.",
  "Agents propose.",
  "Validators verify.",
  "Humans approve.",
  "Git records.",
  "A synthetic model can expose a specific next review.",
  "ATTR-BP-CENTRAL-FOUNDATION-DATE",
  "Run the example",
];

for (const text of requiredText) {
  if (!rootHtml.includes(text)) {
    errors.push(`Missing required copy: ${text}`);
  }
}

const representativeArticle = htmlByFile.get("blog/sap-mdg-implementation-knowledge.html") ?? "";
if (representativeArticle.includes('class="doc-sidebar"')) {
  errors.push("Blog articles must not render the documentation sidebar.");
}
for (const snippet of [
  '<article class="doc-content blog-article">',
  '<header class="blog-header">',
  '<details class="article-contents">',
  '<nav aria-label="Article contents">',
  '<nav class="article-neighbors" aria-label="More articles">',
  '<section class="article-sources" aria-label="Primary sources">',
  '<aside class="author-card" aria-labelledby="author-card-title">',
  'href="/docs/author.html"',
  '<aside class="topic-guide">',
]) {
  if (!representativeArticle.includes(snippet)) {
    errors.push(`Blog article template is missing: ${snippet}`);
  }
}

const blogIndex = htmlByFile.get("blog/index.html") ?? "";
if (
  !blogIndex.includes('class="blog-grid"') ||
  !blogIndex.includes("min read") ||
  !blogIndex.includes("data-blog-search") ||
  !blogIndex.includes("data-blog-pagination")
) {
  errors.push("Blog index must render searchable, paginated editorial cards with reading time.");
}
if (publicBlogRoutes.length - 1 !== blogSourceFiles.length || blogSourceFiles.length !== 130) {
  errors.push("Every one of the 130 canonical blog sources must render to one public article route.");
}

const shareableFiles = [...generatedDocs, ...publicBlogRoutes.filter((route) => route !== "/blog/").map((route) => route.slice(1))];
for (const file of shareableFiles) {
  const html = htmlByFile.get(file) ?? "";
  for (const snippet of [
    'class="share-controls"',
    'data-copy-link',
    'linkedin.com/sharing/share-offsite/',
    'twitter.com/intent/tweet',
    'href="mailto:',
  ]) {
    if (!html.includes(snippet)) {
      errors.push(`${file} must include accessible social sharing controls: ${snippet}`);
    }
  }
}

const authorProfile = htmlByFile.get("docs/author.html") ?? "";
for (const snippet of [
  "Dzmitryi Kharlanau",
  "Senior SAP Consultant",
  "EPAM Systems",
  "Hashnode",
  "Hugging Face",
  'href="https://www.linkedin.com/in/dkharlanau/"',
]) {
  if (!authorProfile.includes(snippet)) {
    errors.push(`Author profile is missing: ${snippet}`);
  }
}

for (const route of publicBlogRoutes.filter((route) => route !== "/blog/")) {
  const file = route.slice(1);
  const html = htmlByFile.get(file) ?? "";
  if (!html.includes('class="author-card"') || !html.includes('class="related-articles"')) {
    errors.push(`${file} must include author identity and related-article links.`);
  }
  const relatedLinks = new Set(
    [...html.matchAll(/<section class="related-articles">[\s\S]*?<\/section>/g)]
      .flatMap((match) => [...match[0].matchAll(/href="(\/blog\/[^\"]+\.html)"/g)].map((link) => link[1])),
  );
  if (relatedLinks.size < 3 || relatedLinks.has(route)) {
    errors.push(`${file} must link to three distinct related blog articles.`);
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
const rssFeed = readSiteFile("feed.xml");
const robots = readSiteFile("robots.txt");
const manifest = JSON.parse(readSiteFile("site.webmanifest"));
const staleVersion = ["0", "4", "0"].join(".");

for (const [file, text] of [
  ["llms.txt", aiContext],
  ["llms-full.txt", aiFullContext],
  ["ai.txt", aiText],
]) {
  if (!text.includes("0.6.0")) {
    errors.push(`${file} must include version 0.6.0.`);
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

const homepageData = JSON.parse(
  [...homepageHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)][0]?.[1] ?? "{}",
);
const homepageFaq = (homepageData["@graph"] ?? []).find((entity) => entity["@type"] === "FAQPage");
if (!Array.isArray(homepageFaq?.mainEntity) || homepageFaq.mainEntity.length !== 6) {
  errors.push("Homepage FAQ JSON-LD must contain the six visible product questions and answers.");
}
if ((homepageHtml.match(/<section id="faq"/g) ?? []).length !== 1) {
  errors.push("Homepage must contain one visible product FAQ section.");
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

if (aiJson.discovery?.rss !== `${productionOrigin}/feed.xml`) {
  errors.push("ai.json must identify the production RSS feed.");
}

for (const [file, text] of [
  ["llms.txt", aiContext],
  ["llms-full.txt", aiFullContext],
  ["ai.txt", aiText],
]) {
  if (!text.includes(`${productionOrigin}/feed.xml`)) {
    errors.push(`${file} must identify the production RSS feed.`);
  }
}

if (aiJson.packageVersion !== "0.6.0" || aiJson.corePackage?.version !== "0.6.0") {
  errors.push("ai.json package version fields must be 0.6.0.");
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
    const person = graph.find((entity) => entity["@type"] === "Person");
    if (
      !person ||
      person.name !== "Dzmitryi Kharlanau" ||
      person.url !== `${productionOrigin}/docs/author.html` ||
      !person.description ||
      !Array.isArray(person.knowsAbout)
    ) {
      errors.push(`${file} JSON-LD must include a complete first-party author profile.`);
    }
    if (file.startsWith("blog/") && file !== "blog/index.html") {
      const article = graph.find((entity) => entity["@type"] === "Article");
      if (!article || article.author?.["@id"] !== `${productionOrigin}/#person`) {
        errors.push(`${file} JSON-LD must connect its Article to the author profile.`);
      }
    }
  }
}

const authorProfileJsonLd = JSON.parse(
  [...authorProfile.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)][0]?.[1] ?? "{}",
);
const authorProfileGraph = authorProfileJsonLd["@graph"] ?? [];
if (
  !authorProfileGraph.some((entity) => entity["@type"] === "ProfilePage") ||
  authorProfileGraph.find((entity) => entity["@type"] === "ProfilePage")?.mainEntity?.["@id"] !==
    `${productionOrigin}/#person`
) {
  errors.push("Author page must expose ProfilePage structured data connected to the Person entity.");
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
  sourceCode?.softwareVersion !== "0.6.0" ||
  sourceCode?.version !== "0.6.0" ||
  sourceCode?.programmingLanguage !== "Python" ||
  sourceCode?.runtimePlatform !== "Python 3.11+" ||
  sourceCode?.codeRepository !== "https://github.com/metalhatscats/martenweave-core"
) {
  errors.push("Homepage SoftwareSourceCode JSON-LD is incomplete.");
}

const software = homepageGraph.find((entity) => entity["@type"] === "SoftwareApplication");
if (
  software?.softwareVersion !== "0.6.0" ||
  software?.downloadUrl !== "https://github.com/metalhatscats/martenweave-core/archive/refs/heads/main.zip" ||
  software?.installUrl !== "https://martenweave.github.io/docs/quickstart.html"
) {
  errors.push("Homepage SoftwareApplication JSON-LD must describe the current source release, not PyPI.");
}

for (const route of publicBlogRoutes.filter((route) => route !== "/blog/")) {
  const html = htmlByFile.get(route.slice(1));
  if (!html?.includes('<body class="blog-page">') || html.includes("Public docs")) {
    errors.push(`${route} must use editorial, not docs-page, semantics.`);
  }
  const published = html?.match(/<time datetime="(\d{4}-\d{2}-\d{2})">/);
  if (!published) {
    errors.push(`${route} must expose a timezone-safe publication date.`);
  }
  if (!html?.includes('class="article-sources"') || !html.includes("https://www.sap.com/products/")) {
    errors.push(`${route} must include primary source links.`);
  }
  const sitemapEntry = sitemap.match(
    new RegExp(`<loc>${productionOrigin}${route}</loc>\\s*<lastmod>([^<]+)</lastmod>`),
  );
  if (sitemapEntry?.[1] !== published?.[1]) {
    errors.push(`${route} must use its publication date in sitemap.xml.`);
  }
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

const pilotHtml = htmlByFile.get("docs/pilot-projects.html") ?? "";
if (
  !pilotHtml.includes("Order a pilot on LinkedIn") ||
  !pilotHtml.includes('href="https://www.linkedin.com/in/metalhatcats/"')
) {
  errors.push("Pilot Projects must include a direct Metalhatcats LinkedIn order CTA.");
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

if (!rssFeed.includes("<rss version=\"2.0\">") || !rssFeed.includes("<channel>")) {
  errors.push("feed.xml must be a valid RSS channel.");
}
for (const route of publicBlogRoutes.filter((route) => route !== "/blog/")) {
  if (!rssFeed.includes(`${productionOrigin}${route}`)) {
    errors.push(`feed.xml is missing blog route: ${route}`);
  }
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
  new RegExp(`Martenweave (?:is|as) (?:an? )?${sap}-certified`, "i"),
  new RegExp(`Martenweave (?:is|as) (?:an? )?${sap} partner`, "i"),
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
