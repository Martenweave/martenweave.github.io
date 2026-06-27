import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const docsDir = join(root, "docs");
const checkOnly = process.argv.includes("--check");
const productionOrigin = "https://martenweave.github.io";
const authorName = "Dzmitryi Kharlanau";
const socialDescription =
  "Open-source model truth for SAP migration, MDM, governance, and AI-assisted data work.";

const docRoutes = [
  {
    source: "README.md",
    output: "index.html",
    label: "Docs home",
    canonical: "/docs.html",
    indexable: false,
    seoTitle: "Martenweave Documentation",
    description:
      "Browse Martenweave documentation for the open-source model registry, including validation, dataset gaps, lineage, impact analysis, and AI governance.",
  },
  {
    source: "product.md",
    output: "product.html",
    label: "Product",
    seoTitle: "Martenweave Product | Open-Source Model Registry",
    description:
      "Learn how Martenweave creates canonical, validated model truth for SAP migration, MDM, data governance, data quality, and AMS teams.",
  },
  {
    source: "how-it-works.md",
    output: "how-it-works.html",
    label: "How it works",
    seoTitle: "How Martenweave Works | Validation, Gaps, Lineage, Impact",
    description:
      "Follow Martenweave from Excel, datasets, tickets, and SAP context to canonical model files, validation, indexes, gap detection, lineage, and impact analysis.",
  },
  {
    source: "import-export.md",
    output: "import-export.html",
    label: "Import/export",
    seoTitle: "Import and Export | Martenweave Model Review Workflows",
    description:
      "Review Martenweave import and export boundaries for dataset profiling, CSV and XLSX review, PatchProposals, schemas, and generated model artifacts.",
  },
  {
    source: "governance.md",
    output: "governance.html",
    label: "Governance",
    seoTitle: "Data Governance and Model Control | Martenweave",
    description:
      "See how Martenweave supports definitions, ownership, metadata, lineage, data quality, stewardship, change control, and evidence-based model decisions.",
  },
  {
    source: "quickstart.md",
    output: "quickstart.html",
    label: "Quickstart",
    seoTitle: "Martenweave Quickstart | Validate and Index a Model",
    description:
      "Install martenweave-core and run deterministic validation, generated indexing, search, trace, impact analysis, dataset gap checks, and a proposal dry run.",
  },
  {
    source: "examples.md",
    output: "examples.html",
    label: "Examples",
    seoTitle: "SAP and Product Model Examples | Martenweave",
    description:
      "Explore Martenweave example registries for SAP Business Partner and Customer, Supplier and Vendor, and generic product data models.",
  },
  {
    source: "use-cases.md",
    output: "use-cases.html",
    label: "Use cases",
    seoTitle: "SAP Migration and MDM Use Cases | Martenweave",
    description:
      "Explore Martenweave use cases for SAP migration, Business Partner governance, field mapping validation, dataset gaps, AMS knowledge reuse, lineage, and impact.",
  },
  {
    source: "architecture.md",
    output: "architecture.html",
    label: "Architecture",
    seoTitle: "Martenweave Architecture | Canonical Files and Indexes",
    description:
      "Understand Martenweave architecture: canonical model files, deterministic validation, disposable SQLite and JSONL indexes, lineage, impact, and approved changes.",
  },
  {
    source: "ai-governance.md",
    output: "ai-governance.html",
    label: "AI governance",
    seoTitle: "Human-Approved AI Patch Proposals | Martenweave",
    description:
      "Learn the Martenweave AI governance model: AI drafts PatchProposals, deterministic validators verify them, and humans approve canonical model changes.",
  },
  {
    source: "faq.md",
    output: "faq.html",
    label: "FAQ",
    seoTitle: "Martenweave FAQ | Model Registry, SAP, MDM, and AI",
    description:
      "Answers about Martenweave, its open-source model registry, SAP and MDM scope, import and export workflows, human-approved AI changes, and current maturity.",
    schemaType: "FAQPage",
  },
  {
    source: "release-proof.md",
    output: "release-proof.html",
    label: "Release proof",
    seoTitle: "Martenweave Core 0.4.1 Release Proof",
    description:
      "Review the public release evidence for martenweave-core 0.4.1, including package links, backend-first boundaries, local validation, and rendered site checks.",
  },
  {
    source: "roadmap.md",
    output: "roadmap.html",
    label: "Roadmap",
    seoTitle: "Martenweave Roadmap | Registry, Intelligence, and AI",
    description:
      "Review current Martenweave capabilities and plans for model intelligence, proposal-first AI, domain packs, bounded integrations, and an optional workbench.",
  },
  {
    source: "contributing-scenarios.md",
    output: "contributing-scenarios.html",
    label: "Contributing scenarios",
    seoTitle: "Contribute Migration and Governance Scenarios | Martenweave",
    description:
      "Contribute reproducible migration, MDM, validation, data quality, governance, and AMS scenarios to improve the Martenweave open-source model registry.",
  },
  {
    source: "open-source.md",
    output: "open-source.html",
    label: "Open source",
    seoTitle: "Martenweave Open Source and Contribution Guide",
    description:
      "Understand the MIT-licensed Martenweave core, contribution paths, development checks, safe public examples, and boundaries for commercial extensions.",
  },
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
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, src) => {
      return `<img src="${escapeAttribute(normalizeHref(src))}" alt="${alt}" />`;
    })
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

function textFromMarkdown(value) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_>#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFaqEntities(markdown) {
  const sections = markdown.split(/^##\s+/m).slice(1);
  return sections
    .map((section) => {
      const [questionLine, ...answerLines] = section.split("\n");
      const question = textFromMarkdown(questionLine);
      const answer = textFromMarkdown(answerLines.join("\n"));
      if (!question || !answer) {
        return null;
      }
      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      };
    })
    .filter(Boolean);
}

function renderJsonLd(route, markdown, title, canonicalUrl) {
  if (route.indexable === false) {
    return "";
  }

  const pageId = `${canonicalUrl}#webpage`;
  const articleType = route.schemaType ?? "TechArticle";
  const contentEntity = {
    "@type": articleType,
    "@id": `${canonicalUrl}#content`,
    headline: title,
    name: title,
    description: route.description,
    url: canonicalUrl,
    mainEntityOfPage: { "@id": pageId },
    author: { "@id": `${productionOrigin}/#person` },
    creator: { "@id": `${productionOrigin}/#person` },
    publisher: { "@id": `${productionOrigin}/#organization` },
    isAccessibleForFree: true,
    inLanguage: "en",
  };

  if (articleType === "FAQPage") {
    contentEntity.mainEntity = extractFaqEntities(markdown);
  }

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageId,
        url: canonicalUrl,
        name: route.seoTitle,
        description: route.description,
        isPartOf: { "@id": `${productionOrigin}/#website` },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
        primaryImageOfPage: { "@id": `${productionOrigin}/assets/og-image.png` },
        author: { "@id": `${productionOrigin}/#person` },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${productionOrigin}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Docs",
            item: `${productionOrigin}/docs.html`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: canonicalUrl,
          },
        ],
      },
      contentEntity,
      {
        "@type": "Organization",
        "@id": `${productionOrigin}/#organization`,
        name: "Martenweave",
        url: `${productionOrigin}/`,
        logo: {
          "@type": "ImageObject",
          url: `${productionOrigin}/assets/logo.png`,
        },
        sameAs: ["https://github.com/Martenweave"],
      },
      {
        "@type": "Person",
        "@id": `${productionOrigin}/#person`,
        name: authorName,
        url: "https://www.linkedin.com/in/dkharlanau/",
        sameAs: ["https://www.linkedin.com/in/dkharlanau/"],
      },
      {
        "@type": "WebSite",
        "@id": `${productionOrigin}/#website`,
        name: "Martenweave",
        url: `${productionOrigin}/`,
        publisher: { "@id": `${productionOrigin}/#organization` },
        inLanguage: "en",
      },
    ],
  };

  return `    <script type="application/ld+json">
${JSON.stringify(data, null, 6)
  .replace(/</g, "\\u003c")
  .split("\n")
  .map((line) => `      ${line}`)
  .join("\n")}
    </script>
`;
}

function renderNav(currentOutput) {
  return docRoutes
    .map((route) => {
      const active = route.output === currentOutput ? ' aria-current="page"' : "";
      const href = route.output === "index.html" ? "/docs.html" : `/docs/${route.output}`;
      return `<a href="${href}"${active}>${route.label}</a>`;
    })
    .join("\n");
}

function renderPage(route) {
  const sourcePath = join(docsDir, route.source);
  const markdown = readFileSync(sourcePath, "utf8");
  const title = extractTitle(markdown);
  const body = markdownToHtml(markdown);
  const canonicalPath = route.canonical ?? `/docs/${route.output}`;
  const canonicalUrl = `${productionOrigin}${canonicalPath}`;
  const robots = route.indexable === false ? "noindex, follow" : "index, follow, max-image-preview:large";
  const jsonLd = renderJsonLd(route, markdown, title, canonicalUrl);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(route.seoTitle)}</title>
    <meta
      name="description"
      content="${escapeAttribute(route.description)}"
    />
    <meta name="robots" content="${robots}" />
    <meta name="author" content="${authorName}" />
    <meta name="application-name" content="Martenweave" />
    <meta name="theme-color" content="#321136" />
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Martenweave" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${escapeAttribute(route.seoTitle)}" />
    <meta property="og:description" content="${escapeAttribute(route.description)}" />
    <meta property="og:image" content="${productionOrigin}/assets/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Martenweave open-source model registry" />
    <meta property="article:author" content="https://www.linkedin.com/in/dkharlanau/" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttribute(route.seoTitle)}" />
    <meta name="twitter:description" content="${escapeAttribute(socialDescription)}" />
    <meta name="twitter:image" content="${productionOrigin}/assets/twitter-card.png" />
    <meta name="twitter:image:alt" content="Martenweave open-source model registry" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
    <link rel="icon" sizes="16x16" href="/assets/favicon-16.png" type="image/png" />
    <link rel="icon" sizes="32x32" href="/assets/favicon-32.png" type="image/png" />
    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="alternate" type="text/plain" href="/llms.txt" title="Martenweave AI summary" />
    <link
      rel="alternate"
      type="text/plain"
      href="/llms-full.txt"
      title="Martenweave full AI context"
    />
    <link rel="alternate" type="application/json" href="/ai.json" title="Martenweave metadata" />
    <link rel="stylesheet" href="/styles.css" />
    <script src="/script.js" defer></script>
${jsonLd}  </head>
  <body class="docs-page">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" data-header>
      <nav class="nav" aria-label="Primary navigation">
        <a class="brand" href="/" aria-label="Martenweave home">
          <img src="/assets/logo.png" alt="" width="34" height="34" />
          <span>Martenweave</span>
        </a>
        <div class="nav-links">
          <a href="/docs.html">Docs</a>
          <a href="https://github.com/metalhatscats/martenweave-core">GitHub</a>
          <a href="https://pypi.org/project/martenweave-core/">PyPI</a>
        </div>
      </nav>
    </header>

    <main id="main" class="doc-shell">
      <aside class="doc-sidebar" aria-label="Documentation navigation">
${renderNav(route.output)}
      </aside>
      <article class="doc-content">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          <a href="/docs.html">Docs</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${escapeHtml(title)}</span>
        </nav>
        <p class="section-kicker">Public docs</p>
${body}
      </article>
    </main>

    <footer class="footer">
      <a class="brand footer-brand" href="/" aria-label="Martenweave home">
        <img src="/assets/logo.png" alt="" width="30" height="30" />
        <span>Martenweave</span>
      </a>
      <nav class="footer-links" aria-label="Footer navigation">
        <a href="https://github.com/metalhatscats/martenweave-core">GitHub</a>
        <a href="https://pypi.org/project/martenweave-core/">PyPI</a>
        <a href="/docs.html">Docs</a>
        <a href="/ai.txt">AI disclosure</a>
        <a href="https://github.com/metalhatscats/martenweave-core/blob/main/LICENSE">License</a>
        <a href="/llms.txt">llms.txt</a>
        <a href="/humans.txt">humans.txt</a>
        <a class="website-source" href="https://github.com/Martenweave/martenweave.github.io">
          Website source
        </a>
      </nav>
      <p class="footer-line">AI proposes. Validators verify. Humans approve.</p>
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
