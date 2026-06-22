import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const docsDir = join(root, "docs");
const checkOnly = process.argv.includes("--check");

const docRoutes = [
  { source: "README.md", output: "index.html", label: "Docs home" },
  { source: "product.md", output: "product.html", label: "Product" },
  { source: "quickstart.md", output: "quickstart.html", label: "Quickstart" },
  { source: "examples.md", output: "examples.html", label: "Examples" },
  { source: "use-cases.md", output: "use-cases.html", label: "Use cases" },
  { source: "architecture.md", output: "architecture.html", label: "Architecture" },
  { source: "ai-governance.md", output: "ai-governance.html", label: "AI governance" },
  { source: "roadmap.md", output: "roadmap.html", label: "Roadmap" },
  {
    source: "contributing-scenarios.md",
    output: "contributing-scenarios.html",
    label: "Contributing scenarios",
  },
  { source: "open-source.md", output: "open-source.html", label: "Open source" },
];

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function normalizeHref(href) {
  if (href.startsWith("https://martenweave.github.io/docs/")) {
    return href.replace(/\.md(?=$|#|\?)/, ".html");
  }

  if (href.startsWith("/docs/")) {
    return href.replace(/\.md(?=$|#|\?)/, ".html");
  }

  if (href.startsWith("#") || href.startsWith("/") || /^[a-z][a-z0-9+.-]*:/i.test(href)) {
    return href;
  }

  return href.replace(/\.md(?=$|#|\?)/, ".html");
}

function renderInline(value) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, href) => {
      return `<a href="${escapeAttribute(normalizeHref(href))}">${text}</a>`;
    })
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  const slugCounts = new Map();
  let paragraph = [];
  let listType = null;
  let codeFence = null;
  let codeLines = [];

  function uniqueSlug(text) {
    const base = slugify(text) || "section";
    const count = slugCounts.get(base) ?? 0;
    slugCounts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  }

  function flushParagraph() {
    if (paragraph.length === 0) {
      return;
    }
    const text = paragraph.join(" ");
    html.push(`<p>${renderInline(text)}</p>`);
    paragraph = [];
  }

  function closeList() {
    if (!listType) {
      return;
    }
    html.push(`</${listType}>`);
    listType = null;
  }

  function openList(type) {
    if (listType === type) {
      return;
    }
    closeList();
    html.push(`<${type}>`);
    listType = type;
  }

  function closeCodeFence() {
    const languageClass = codeFence ? ` class="language-${escapeAttribute(codeFence)}"` : "";
    html.push(`<pre><code${languageClass}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
    codeFence = null;
    codeLines = [];
  }

  for (const line of lines) {
    const fenceMatch = line.match(/^```([a-zA-Z0-9_-]*)\s*$/);
    if (fenceMatch) {
      if (codeFence !== null) {
        closeCodeFence();
      } else {
        flushParagraph();
        closeList();
        codeFence = fenceMatch[1] || "";
        codeLines = [];
      }
      continue;
    }

    if (codeFence !== null) {
      codeLines.push(line);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      closeList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      closeList();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      html.push(`<h${level} id="${uniqueSlug(text)}">${renderInline(text)}</h${level}>`);
      continue;
    }

    const unorderedMatch = line.match(/^\s*-\s+(.+)$/);
    if (unorderedMatch) {
      flushParagraph();
      openList("ul");
      html.push(`<li>${renderInline(unorderedMatch[1])}</li>`);
      continue;
    }

    const orderedMatch = line.match(/^\s*\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      openList("ol");
      html.push(`<li>${renderInline(orderedMatch[1])}</li>`);
      continue;
    }

    paragraph.push(line.trim());
  }

  if (codeFence !== null) {
    closeCodeFence();
  }
  flushParagraph();
  closeList();

  return html.join("\n");
}

function extractTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Martenweave Docs";
}

function renderNav(currentOutput) {
  return docRoutes
    .map((route) => {
      const active = route.output === currentOutput ? ' aria-current="page"' : "";
      return `<a href="/docs/${route.output}"${active}>${route.label}</a>`;
    })
    .join("\n");
}

function renderPage(route) {
  const sourcePath = join(docsDir, route.source);
  const markdown = readFileSync(sourcePath, "utf8");
  const title = extractTitle(markdown);
  const body = markdownToHtml(markdown);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)} - Martenweave Docs</title>
    <meta
      name="description"
      content="Public Martenweave documentation for ${escapeAttribute(title)}."
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://martenweave.github.io/docs/${route.output}" />
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/styles.css" />
    <script src="/script.js" defer></script>
  </head>
  <body class="docs-page">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" data-header>
      <nav class="nav" aria-label="Primary navigation">
        <a class="brand" href="/" aria-label="Martenweave home">
          <img src="/assets/logo.png" alt="" width="42" height="42" />
          <span>Martenweave</span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links">
          <span class="sr-only">Toggle navigation</span>
          <span aria-hidden="true"></span>
        </button>
        <div class="nav-links" id="nav-links">
          <a href="/">Product</a>
          <a href="/#registry">Registry</a>
          <a href="/docs.html">Docs</a>
          <a href="/#use-cases">Use cases</a>
          <a class="nav-github" href="https://github.com/metalhatscats/martenweave-core">
            GitHub
          </a>
        </div>
      </nav>
    </header>

    <main id="main" class="doc-shell">
      <aside class="doc-sidebar" aria-label="Documentation navigation">
${renderNav(route.output)}
      </aside>
      <article class="doc-content">
        <p class="section-kicker">Public docs</p>
${body}
      </article>
    </main>

    <footer class="footer">
      <div>
        <a class="brand footer-brand" href="/" aria-label="Martenweave home">
          <img src="/assets/logo.png" alt="" width="34" height="34" />
          <span>Martenweave</span>
        </a>
        <p>Backend-first data model registry.</p>
      </div>
      <div class="footer-links" aria-label="Footer links">
        <a href="/docs/quickstart.html">Quickstart</a>
        <a href="/docs/product.html">Product docs</a>
        <a href="/docs/examples.html">Examples</a>
        <a href="/docs/ai-governance.html">AI governance</a>
        <a href="/docs/open-source.html">Open source</a>
        <a href="/llms.txt">llms.txt</a>
        <a href="https://github.com/metalhatscats/martenweave-core">Core GitHub</a>
      </div>
      <p class="footer-line">Traceable model truth for governed data work.</p>
    </footer>
  </body>
</html>
`;
}

mkdirSync(docsDir, { recursive: true });

const staleFiles = [];

for (const route of docRoutes) {
  const outputPath = join(docsDir, route.output);
  const rendered = renderPage(route);

  if (checkOnly) {
    if (!existsSync(outputPath)) {
      staleFiles.push(`Missing generated doc: docs/${route.output}`);
      continue;
    }
    const existing = readFileSync(outputPath, "utf8");
    if (existing !== rendered) {
      staleFiles.push(`Stale generated doc: docs/${route.output}`);
    }
    continue;
  }

  writeFileSync(outputPath, rendered, "utf8");
}

if (staleFiles.length > 0) {
  console.error(staleFiles.join("\n"));
  console.error("Run: npm run build:docs");
  process.exit(1);
}

console.log(
  checkOnly
    ? `Generated docs are current: ${docRoutes.length} routes checked.`
    : `Generated docs: ${docRoutes.length} static HTML routes.`,
);
