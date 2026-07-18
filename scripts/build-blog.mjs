import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const articlesDir = join(root, "inbox", "articles");
const blogDir = join(root, "blog");
const productionOrigin = "https://martenweave.github.io";
const authorName = "Dzmitryi Kharlanau";
const defaultDate = "2026-07-15";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

function extractTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Martenweave";
}

function extractReviewedDate(markdown) {
  const match = markdown.match(/\*\*Reviewed:\s*([^*]+)\*\*/);
  if (!match) return null;
  const parsed = new Date(match[1].trim());
  if (Number.isNaN(parsed.valueOf())) return null;
  return parsed.toISOString().split("T")[0];
}

function normalizeHref(href) {
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
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  const slugCounts = new Map();
  let paragraph = [];
  let listType = null;
  let codeFence = null;
  let codeLines = [];
  let blockquote = [];

  function uniqueSlug(text) {
    const base = slugify(text) || "section";
    const count = slugCounts.get(base) ?? 0;
    slugCounts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  }

  function flushParagraph() {
    if (paragraph.length === 0) return;
    html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function closeList() {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = null;
  }

  function openList(type) {
    if (listType === type) return;
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

  function flushBlockquote() {
    if (blockquote.length === 0) return;
    html.push(`<blockquote>${renderInline(blockquote.join(" "))}</blockquote>`);
    blockquote = [];
  }

  for (const line of lines) {
    const fenceMatch = line.match(/^```([a-zA-Z0-9_-]*)(?:\s+[^`]*)?\s*$/);
    if (fenceMatch) {
      if (codeFence !== null) {
        closeCodeFence();
      } else {
        flushParagraph();
        closeList();
        flushBlockquote();
        codeFence = fenceMatch[1] || "";
        codeLines = [];
      }
      continue;
    }

    if (codeFence !== null) {
      codeLines.push(line);
      continue;
    }

    const blockquoteMatch = line.match(/^>\s?(.*)$/);
    if (blockquoteMatch) {
      flushParagraph();
      closeList();
      blockquote.push(blockquoteMatch[1]);
      continue;
    }
    if (blockquote.length > 0) {
      flushBlockquote();
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

  if (codeFence !== null) closeCodeFence();
  flushParagraph();
  closeList();
  flushBlockquote();

  return html.join("\n");
}

function categorize(title, slug, text) {
  const haystack = `${title} ${slug} ${text.slice(0, 2000)}`.toLowerCase();
  const categories = [];
  if (haystack.includes("logistic")) categories.push("Logistics");
  if (haystack.includes("sap") && haystack.includes("migration")) categories.push("SAP migration");
  if (haystack.includes("mdg")) categories.push("SAP MDG");
  if (haystack.includes("mdm")) categories.push("MDM");
  if (haystack.includes("governance")) categories.push("Data governance");
  if (haystack.includes("ams") || haystack.includes("support ")) categories.push("AMS");
  if (haystack.includes("ai ") || haystack.includes("artificial intelligence")) {
    categories.push("AI & automation");
  }
  if (haystack.includes("validation")) categories.push("Validation");
  if (haystack.includes("lineage") || haystack.includes("impact") || haystack.includes("trace")) {
    categories.push("Lineage & impact");
  }
  if (haystack.includes("mapping") || haystack.includes("spreadsheet")) categories.push("Mappings");
  if (categories.length === 0) categories.push("Model governance");
  return categories;
}

function tagsFor(title, slug, text) {
  const haystack = `${title} ${slug} ${text.slice(0, 2000)}`.toLowerCase();
  const candidates = [
    "SAP",
    "S/4HANA",
    "MDG",
    "MDM",
    "data governance",
    "AMS",
    "validation",
    "lineage",
    "impact analysis",
    "dataset gaps",
    "mapping",
    "spreadsheet",
    "canonical model",
    "PatchProposal",
    "AI",
    "Business Partner",
    "Customer",
    "Vendor",
    "logistics",
  ];
  return candidates.filter((tag) => haystack.includes(tag.toLowerCase()));
}

function readingTimeMinutes(text) {
  const words = textFromMarkdown(text).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function extractDescription(markdown) {
  const body = markdown.replace(/^#\s+.+\n?/m, "").replace(/\*\*Reviewed:[^*]+\*\*\n?/, "");
  const paragraphs = body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("```"));
  if (paragraphs.length === 0) return "";
  const text = textFromMarkdown(paragraphs[0]);
  return text.length > 160 ? `${text.slice(0, 157).trim()}…` : text;
}

function cleanContent(markdown) {
  return markdown.replace(/Metalhatscats/g, "Martenweave");
}

function articleSlug(filename) {
  return filename.replace(/^\d+-/, "").replace(/\.md$/, "");
}

function loadArticles() {
  if (!existsSync(articlesDir)) return [];
  const files = readdirSync(articlesDir).filter((name) => name.endsWith(".md"));
  const articles = [];
  for (const filename of files) {
    const raw = readFileSync(join(articlesDir, filename), "utf8");
    const cleaned = cleanContent(raw);
    const title = extractTitle(cleaned);
    const slug = articleSlug(filename);
    const date = extractReviewedDate(cleaned) || defaultDate;
    const description = extractDescription(cleaned);
    const body = cleaned.replace(/^#\s+.+\n/m, "").replace(/\*\*Reviewed:[^*]+\*\*\n?/, "");
    const htmlBody = markdownToHtml(body);
    const categories = categorize(title, slug, cleaned);
    const tags = tagsFor(title, slug, cleaned);
    const minutes = readingTimeMinutes(cleaned);
    articles.push({
      filename,
      title,
      slug,
      date,
      description,
      body,
      htmlBody,
      categories,
      tags,
      minutes,
    });
  }
  return articles.sort((a, b) => a.slug.localeCompare(b.slug));
}

function articleSchema(article, canonicalUrl) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: article.title,
        description: article.description,
        isPartOf: { "@id": `${productionOrigin}/#website` },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
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
            name: "Blog",
            item: `${productionOrigin}/blog/index.html`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: article.title,
        name: article.title,
        description: article.description,
        url: canonicalUrl,
        author: { "@id": `${productionOrigin}/#person` },
        creator: { "@id": `${productionOrigin}/#person` },
        publisher: { "@id": `${productionOrigin}/#organization` },
        datePublished: article.date,
        dateModified: article.date,
        articleSection: article.categories[0],
        keywords: article.tags.join(", "),
        isAccessibleForFree: true,
        inLanguage: "en",
        mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` },
      },
      {
        "@type": "Organization",
        "@id": `${productionOrigin}/#organization`,
        name: "Martenweave",
        url: `${productionOrigin}/`,
        logo: { "@type": "ImageObject", url: `${productionOrigin}/assets/logo.png` },
        sameAs: ["https://github.com/Martenweave"],
      },
      {
        "@type": "Person",
        "@id": `${productionOrigin}/#person`,
        name: authorName,
        url: "https://www.linkedin.com/in/dkharlanau/",
        sameAs: ["https://www.linkedin.com/in/dkharlanau/"],
      },
    ],
  };
  return JSON.stringify(data, null, 6).replace(/</g, "\\u003c");
}

function renderArticlePage(article) {
  const canonicalPath = `/blog/${article.slug}.html`;
  const canonicalUrl = `${productionOrigin}${canonicalPath}`;
  const jsonLd = articleSchema(article, canonicalUrl);
  const categoryLinks = article.categories
    .map((c) => `<span class="article-category">${escapeHtml(c)}</span>`)
    .join("");
  const tagLinks = article.tags
    .map((t) => `<span class="article-tag">${escapeHtml(t)}</span>`)
    .join("");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(article.title)} | Martenweave Blog</title>
    <meta name="description" content="${escapeAttribute(article.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="author" content="${authorName}" />
    <meta name="application-name" content="Martenweave" />
    <meta name="theme-color" content="#321136" />
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Martenweave" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${escapeAttribute(article.title)}" />
    <meta property="og:description" content="${escapeAttribute(article.description)}" />
    <meta property="og:image" content="${productionOrigin}/assets/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Martenweave source-available model registry" />
    <meta property="article:author" content="https://www.linkedin.com/in/dkharlanau/" />
    <meta property="article:published_time" content="${article.date}" />
    <meta property="article:section" content="${escapeAttribute(article.categories[0])}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttribute(article.title)}" />
    <meta name="twitter:description" content="${escapeAttribute(article.description)}" />
    <meta name="twitter:image" content="${productionOrigin}/assets/twitter-card.png" />
    <meta name="twitter:image:alt" content="Martenweave source-available model registry" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
    <link rel="icon" sizes="16x16" href="/assets/favicon-16.png" type="image/png" />
    <link rel="icon" sizes="32x32" href="/assets/favicon-32.png" type="image/png" />
    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="stylesheet" href="/styles.css" />
    <script src="/script.js" defer></script>
    <script type="application/ld+json">
${jsonLd.split("\n").map((line) => `      ${line}`).join("\n")}
    </script>
  </head>
  <body class="docs-page blog-page">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" data-header>
      <nav class="nav" aria-label="Primary navigation">
        <a class="brand" href="/" aria-label="Martenweave home">
          <img src="/assets/logo.png" alt="" width="34" height="34" />
          <span>Martenweave</span>
        </a>
        <div class="nav-links">
          <a href="/docs.html">Docs</a>
          <a href="/blog/index.html">Blog</a>
          <a href="https://github.com/metalhatscats/martenweave-core">GitHub</a>
          <a href="https://pypi.org/project/martenweave-core/">PyPI</a>
        </div>
      </nav>
    </header>

    <main id="main" class="doc-shell blog-shell">
      <aside class="doc-sidebar blog-sidebar" aria-label="Blog navigation">
        <a href="/blog/index.html">← Blog index</a>
      </aside>
      <article class="doc-content blog-article">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          <a href="/blog/index.html">Blog</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${escapeHtml(article.title)}</span>
        </nav>
        <header class="article-header">
          <p class="section-kicker">Martenweave blog · ${categoryLinks}</p>
          <h1>${escapeHtml(article.title)}</h1>
          <p class="article-meta">
            <time datetime="${article.date}">${article.date}</time> · ${article.minutes} min read
            ${tagLinks ? ` · ${tagLinks}` : ""}
          </p>
        </header>
        <div class="article-body">
${article.htmlBody.split("\n").map((line) => `          ${line}`).join("\n")}
        </div>
        <aside class="article-cta surface">
          <h2>Keep model decisions traceable</h2>
          <p>
            Martenweave turns spreadsheets, datasets, and SAP context into canonical, validated model
            files. If this article matches a problem you are working on,
            <a href="/docs/pilot-projects.html">request a scoped pilot</a> or
            <a href="/docs/contact.html">get in touch</a>.
          </p>
        </aside>
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
        <a href="/blog/index.html">Blog</a>
        <a href="/ai.txt">AI disclosure</a>
        <a href="https://github.com/metalhatscats/martenweave-core/blob/main/LICENSE">License</a>
        <a href="/llms.txt">llms.txt</a>
        <a href="/humans.txt">humans.txt</a>
        <a class="website-source" href="https://github.com/Martenweave/martenweave.github.io">Website source</a>
      </nav>
      <p class="footer-line">AI proposes. Validators verify. Humans approve.</p>
    </footer>
  </body>
</html>
`;
}

function renderIndexPage(articles) {
  const canonicalUrl = `${productionOrigin}/blog/index.html`;
  const grouped = new Map();
  for (const article of articles) {
    for (const category of article.categories) {
      if (!grouped.has(category)) grouped.set(category, []);
      grouped.get(category).push(article);
    }
  }
  const categories = [...grouped.keys()].sort();
  const filterButtons = categories
    .map((c) => `<button class="filter-button" data-category="${escapeAttribute(slugify(c))}">${escapeHtml(c)}</button>`)
    .join("");
  const sections = categories
    .map((category) => {
      const items = grouped.get(category);
      const cards = items
        .map((article) => {
          const tagList = article.tags.map((t) => `<span class="article-tag">${escapeHtml(t)}</span>`).join("");
          return `<a class="blog-card" href="/blog/${article.slug}.html" data-category="${escapeAttribute(slugify(category))}">
            <span class="blog-card-meta"><time datetime="${article.date}">${article.date}</time> · ${article.minutes} min read</span>
            <strong>${escapeHtml(article.title)}</strong>
            <p>${escapeHtml(article.description)}</p>
            <span class="blog-card-tags">${tagList}</span>
          </a>`;
        })
        .join("\n");
      return `<section class="blog-group" data-category="${escapeAttribute(slugify(category))}">
        <h2 id="${slugify(category)}">${escapeHtml(category)}</h2>
        <div class="blog-grid">${cards}</div>
      </section>`;
    })
    .join("\n");

  const jsonLd = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: "Martenweave Blog",
          description:
            "Practical articles on SAP migration, MDM, MDG, data governance, AMS, deterministic validation, lineage, impact analysis, and human-approved AI model changes.",
          isPartOf: { "@id": `${productionOrigin}/#website` },
          breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
          author: { "@id": `${productionOrigin}/#person` },
          inLanguage: "en",
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonicalUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${productionOrigin}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: canonicalUrl },
          ],
        },
      ],
    },
    null,
    6,
  ).replace(/</g, "\\u003c");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Martenweave Blog | SAP Migration, MDM, and Data Governance</title>
    <meta name="description" content="Practical articles on SAP migration, MDM, MDG, data governance, AMS, deterministic validation, lineage, impact analysis, and human-approved AI model changes." />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="author" content="${authorName}" />
    <meta name="application-name" content="Martenweave" />
    <meta name="theme-color" content="#321136" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Martenweave" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="Martenweave Blog | SAP Migration, MDM, and Data Governance" />
    <meta property="og:description" content="Practical articles on SAP migration, MDM, MDG, data governance, AMS, deterministic validation, lineage, impact analysis, and human-approved AI model changes." />
    <meta property="og:image" content="${productionOrigin}/assets/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Martenweave Blog" />
    <meta name="twitter:description" content="Practical articles on SAP migration, MDM, and data governance." />
    <meta name="twitter:image" content="${productionOrigin}/assets/twitter-card.png" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
    <link rel="icon" sizes="16x16" href="/assets/favicon-16.png" type="image/png" />
    <link rel="icon" sizes="32x32" href="/assets/favicon-32.png" type="image/png" />
    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="stylesheet" href="/styles.css" />
    <script src="/script.js" defer></script>
    <script type="application/ld+json">
${jsonLd.split("\n").map((line) => `      ${line}`).join("\n")}
    </script>
  </head>
  <body class="docs-page blog-page">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" data-header>
      <nav class="nav" aria-label="Primary navigation">
        <a class="brand" href="/" aria-label="Martenweave home">
          <img src="/assets/logo.png" alt="" width="34" height="34" />
          <span>Martenweave</span>
        </a>
        <div class="nav-links">
          <a href="/docs.html">Docs</a>
          <a href="/blog/index.html" aria-current="page">Blog</a>
          <a href="https://github.com/metalhatscats/martenweave-core">GitHub</a>
          <a href="https://pypi.org/project/martenweave-core/">PyPI</a>
        </div>
      </nav>
    </header>

    <main id="main" class="doc-shell blog-shell">
      <aside class="doc-sidebar blog-sidebar" aria-label="Blog navigation">
        <a href="/docs.html">← Docs</a>
      </aside>
      <article class="doc-content">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Blog</span>
        </nav>
        <header class="article-header">
          <p class="section-kicker">Martenweave blog</p>
          <h1>Practical model governance writing</h1>
          <p class="hero-subhead">
            Articles on SAP migration, MDM, MDG, data governance, AMS, deterministic validation,
            lineage, impact analysis, and human-approved AI model changes.
          </p>
        </header>
        <div class="blog-filter" role="group" aria-label="Filter articles by topic">
          <button class="filter-button is-active" data-category="all">All topics</button>
          ${filterButtons}
        </div>
        ${sections}
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
        <a href="/blog/index.html">Blog</a>
        <a href="/ai.txt">AI disclosure</a>
        <a href="https://github.com/metalhatscats/martenweave-core/blob/main/LICENSE">License</a>
        <a href="/llms.txt">llms.txt</a>
        <a href="/humans.txt">humans.txt</a>
        <a class="website-source" href="https://github.com/Martenweave/martenweave.github.io">Website source</a>
      </nav>
      <p class="footer-line">AI proposes. Validators verify. Humans approve.</p>
    </footer>
    <script>
      document.querySelectorAll('.blog-filter .filter-button').forEach((button) => {
        button.addEventListener('click', () => {
          const category = button.dataset.category;
          document.querySelectorAll('.blog-filter .filter-button').forEach((b) => b.classList.remove('is-active'));
          button.classList.add('is-active');
          document.querySelectorAll('.blog-group').forEach((group) => {
            group.hidden = category !== 'all' && group.dataset.category !== category;
          });
        });
      });
    </script>
  </body>
</html>
`;
}

function updateSitemap(articles) {
  const sitemapPath = join(root, "sitemap.xml");
  let sitemap = readFileSync(sitemapPath, "utf8");
  const today = new Date().toISOString().split("T")[0];
  sitemap = sitemap.replace(/<url>\s*<loc>https:\/\/martenweave\.github\.io\/blog\/[^<]+<\/loc>[\s\S]*?<\/url>\s*/g, "");
  const blogEntries = articles
    .map((a) => `  <url>\n    <loc>${productionOrigin}/blog/${a.slug}.html</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join("\n");
  const indexEntry = `  <url>\n    <loc>${productionOrigin}/blog/index.html</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
  sitemap = sitemap.replace("</urlset>", `${indexEntry}\n${blogEntries}\n</urlset>`);
  writeFileSync(sitemapPath, sitemap, "utf8");
}

function main() {
  if (!existsSync(blogDir)) mkdirSync(blogDir, { recursive: true });
  const articles = loadArticles();
  for (const article of articles) {
    const page = renderArticlePage(article);
    writeFileSync(join(blogDir, `${article.slug}.html`), page, "utf8");
  }
  const indexPage = renderIndexPage(articles);
  writeFileSync(join(blogDir, "index.html"), indexPage, "utf8");
  updateSitemap(articles);
  console.log(`Generated ${articles.length} blog articles and blog/index.html.`);
}

main();
