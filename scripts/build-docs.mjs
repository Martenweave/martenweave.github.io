// SPDX-License-Identifier: Apache-2.0

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const docsDir = join(root, "docs");
const checkOnly = process.argv.includes("--check");
const productionOrigin = "https://martenweave.github.io";
const contactUrl = "https://www.linkedin.com/in/metalhatcats/";
const authorName = "Dzmitryi Kharlanau";
const authorProfilePath = "/docs/author.html";
const authorBio =
  "Dzmitryi Kharlanau is a Senior SAP Consultant at EPAM Systems with more than 12 years of experience across SAP SD, logistics, integration, MDG-related work, and AMS-heavy delivery.";
const authorTopics = [
  "SAP SD",
  "SAP logistics",
  "SAP integration",
  "SAP Master Data Governance",
  "application management services",
  "data migration",
  "data governance",
  "ABAP",
  "data lineage",
  "impact analysis",
];
const authorSocialProfiles = [
  "https://www.linkedin.com/in/dkharlanau/",
  "https://x.com/dkharlanau",
  "https://hashnode.com/@dkharlanau",
  "https://medium.com/@dkharlanau",
  "https://huggingface.co/dkharlanau",
  "https://dev.to/dkharlanau",
  "https://substack.com/@dkharlanau",
  "https://www.reddit.com/user/dkharlanau",
];
const siteLastModified = "2026-07-16";
const deploymentRevision = "main";

const docRoutes = [
  {
    source: "README.md",
    output: "index.html",
    label: "Docs home",
    canonical: "/docs.html",
    indexable: false,
    seoTitle: "Martenweave Documentation",
    description:
      "Browse Martenweave documentation for the open-source data model registry, including validation, dataset gaps, lineage, impact analysis, and AI governance.",
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
    source: "local-viewer.md",
    output: "local-viewer.html",
    label: "Local viewer",
    seoTitle: "Local Static Viewer | Martenweave",
    description:
      "Generate a local static read-only Martenweave viewer from the SQLite index, with searchable objects, gaps, decisions, owners, and manifest metadata.",
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
    source: "use-cases/sap-migration.md",
    output: "use-cases/sap-migration.html",
    label: "SAP migration",
    seoTitle: "SAP Migration Use Case | Martenweave Data Model Registry",
    description:
      "Use Martenweave as an open-source data model registry for SAP migration: canonical mappings, validation, dataset gap detection, lineage, impact analysis, and approved AI proposals.",
  },
  {
    source: "use-cases/mdm.md",
    output: "use-cases/mdm.html",
    label: "MDM",
    seoTitle: "MDM Use Case | Martenweave Data Model Registry",
    description:
      "Use Martenweave to govern master data definitions, ownership, global/local rules, value lists, lineage, and impact across MDM programs.",
  },
  {
    source: "use-cases/mdg.md",
    output: "use-cases/mdg.html",
    label: "SAP MDG",
    seoTitle: "SAP MDG Use Case | Martenweave Data Model Registry",
    description:
      "Use Martenweave to keep SAP MDG implementation knowledge traceable, validated, and aligned with an independent canonical model specification.",
  },
  {
    source: "use-cases/data-governance.md",
    output: "use-cases/data-governance.html",
    label: "Data governance",
    seoTitle: "Data Governance Use Case | Martenweave Data Model Registry",
    description:
      "Use Martenweave to make data governance policies, ownership, exceptions, lineage, and decisions operational and auditable.",
  },
  {
    source: "use-cases/ams.md",
    output: "use-cases/ams.html",
    label: "AMS",
    seoTitle: "AMS Use Case | Martenweave Data Model Registry",
    description:
      "Use Martenweave to preserve SAP migration and MDM knowledge for AMS teams and trace incidents to canonical model objects.",
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
      "Answers about Martenweave, its open-source data model registry, SAP and MDM scope, import and export workflows, human-approved AI changes, and current maturity.",
    schemaType: "FAQPage",
  },
  {
    source: "release-proof.md",
    output: "release-proof.html",
    label: "Release proof",
    seoTitle: "Martenweave Core 0.6.0 Release Proof",
    description:
      "Review the Apache-licensed martenweave-core 0.6.0 release, including package links, backend-first boundaries, validation, and rendered site checks.",
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
      "Contribute reproducible migration, MDM, validation, data quality, governance, and AMS scenarios to improve the Martenweave open-source data model registry.",
  },
  {
    source: "open-source.md",
    output: "open-source.html",
    label: "Open source",
    seoTitle: "Martenweave Open Source and Contribution Guide",
    description:
      "Understand Martenweave Core under Apache License 2.0, contribution terms, permitted use, and optional commercial services.",
  },
  {
    source: "support-martenweave.md",
    output: "support-martenweave.html",
    label: "Support",
    seoTitle: "Support Martenweave | Sponsorship, Design Partners, and Contributions",
    description:
      "Support the open-source Martenweave model-governance project through sponsorship conversations, design partnerships, pilots, and practical contributions.",
  },
  {
    source: "capabilities.md",
    output: "capabilities.html",
    label: "Capabilities",
    seoTitle: "Martenweave Capabilities | Model Governance for SAP Data Work",
    description:
      "Explore verified Martenweave Core capabilities for canonical models, validation, gaps, lineage, impact, review, and controlled changes.",
  },
  {
    source: "pilot-projects.md",
    output: "pilot-projects.html",
    label: "Pilot projects",
    seoTitle: "Martenweave Pilot Projects | Evidence-Based SAP Migration Readiness",
    description:
      "Plan a focused Martenweave pilot for SAP migration, MDM, governance, or AMS model evidence without changing production systems.",
  },
  {
    source: "consulting.md",
    output: "consulting.html",
    label: "Consulting",
    seoTitle: "Martenweave Consulting | SAP Migration and Model Governance",
    description:
      "Practical consulting for SAP migration, MDM, data governance, and AMS teams that need an accountable model and evidence workflow.",
  },
  {
    source: "engagement.md",
    output: "engagement.html",
    label: "Engagement",
    seoTitle: "Martenweave Engagement Process | From Scope to Reviewable Evidence",
    description:
      "See the practical Martenweave engagement process: scope a model slice, establish evidence, validate, review, and hand over controlled outputs.",
  },
  {
    source: "author.md",
    output: "author.html",
    label: "Author",
    seoTitle: "Dzmitryi Kharlanau | Martenweave Maintainer",
    description: authorBio,
    schemaType: "ProfilePage",
  },
  {
    source: "contact.md",
    output: "contact.html",
    label: "Contact",
    seoTitle: "Contact Martenweave | Discuss a Model Governance Pilot",
    description:
      "Contact Martenweave to discuss a focused SAP migration, MDM, data-governance, or AMS model-governance pilot.",
  },
];

const legacyBlogSlugs = {
  "001-sap-mdg-manages-master-data-who-manages-the-implementation-knowledge.md": "sap-mdg-implementation-knowledge",
  "002-why-sap-migration-mapping-spreadsheets-break-down.md": "sap-migration-mapping-spreadsheets",
  "009-how-to-detect-dataset-gaps-before-sap-migration-testing.md": "detect-dataset-gaps-before-sap-migration-testing",
  "010-how-to-perform-impact-analysis-for-an-sap-field-change.md": "impact-analysis-sap-field-change",
  "011-how-to-trace-a-legacy-field-to-an-sap-target-field.md": "trace-legacy-field-to-sap-target",
  "021-how-deterministic-validation-reduces-migration-risk.md": "deterministic-validation-migration-risk",
  "025-how-to-build-an-evidence-based-migration-readiness-report.md": "evidence-based-migration-readiness-report",
  "062-how-deterministic-model-validation-works.md": "how-deterministic-model-validation-works",
};

function articleSlug(filename) {
  return legacyBlogSlugs[filename] ?? filename.replace(/^\d+-/, "").replace(/\.md$/, "");
}

function articleTopic(markdown) {
  const value = extractTitle(markdown).toLowerCase();
  if (/logistics|warehouse|ewm|material|transport/.test(value)) return "Logistics data";
  if (/lineage|impact|trace|dependency/.test(value)) return "Lineage and impact";
  if (/validation|dataset gap|data quality|finding/.test(value)) return "Validation and readiness";
  if (/mdg|master data governance/.test(value)) return "SAP MDG and MDM";
  if (/ams|support|handover/.test(value)) return "AMS and continuity";
  if (/mapping|migration|cutover/.test(value)) return "Migration readiness";
  if (/ai|patchproposal/.test(value)) return "AI governance";
  return "Model governance";
}

function articleDescription(markdown) {
  const body = markdown.replace(/^#\s+.+\n?/m, "").replace(/\*\*Reviewed:[^*]+\*\*\n?/, "");
  const paragraph = body.split(/\n\s*\n/).map(textFromMarkdown).find(Boolean) ?? "";
  return paragraph.length > 170 ? `${paragraph.slice(0, 167).trim()}…` : paragraph;
}

const blogArticles = readdirSync(join(docsDir, "blog"))
  .filter((filename) => /^\d+-.*\.md$/.test(filename))
  .sort((left, right) => Number(left.match(/^\d+/)[0]) - Number(right.match(/^\d+/)[0]))
  .map((filename) => {
    const markdown = readFileSync(join(docsDir, "blog", filename), "utf8");
    return {
      source: `blog/${filename}`,
      slug: articleSlug(filename),
      title: extractTitle(markdown),
      topic: articleTopic(markdown),
      description: articleDescription(markdown),
      tokens: new Set(textFromMarkdown(markdown).toLowerCase().match(/[a-z]{4,}/g) ?? []),
    };
  });

const blogRoutes = [
  {
    source: "blog/index.md",
    output: "blog/index.html",
    rootOutput: true,
    label: "Blog",
    canonical: "/blog/",
    seoTitle: "Martenweave Blog | SAP Migration, MDM, and Model Governance",
    description: "Practical articles on SAP migration readiness, MDM and MDG delivery, data governance, lineage, impact, and deterministic validation.",
    schemaType: "CollectionPage",
  },
  ...blogArticles.map((article) => ({
    ...article,
    output: `blog/${article.slug}.html`,
    rootOutput: true,
    label: article.topic,
    canonical: `/blog/${article.slug}.html`,
    seoTitle: `${article.slug.replaceAll("-", " ")} | Martenweave`,
    schemaType: "Article",
    blog: true,
  })),
];

const allRoutes = [...docRoutes, ...blogRoutes];

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

  function tableCells(line) {
    return line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());
  }

  function isTableDivider(line) {
    return /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
  }

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
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

    if (line.includes("|") && isTableDivider(lines[lineIndex + 1] ?? "")) {
      flushParagraph();
      closeList();
      const headings = tableCells(line);
      const rows = [];
      lineIndex += 2;
      while (lineIndex < lines.length && lines[lineIndex].includes("|")) {
        rows.push(tableCells(lines[lineIndex]));
        lineIndex += 1;
      }
      lineIndex -= 1;
      html.push(`<div class="table-wrap"><table><thead><tr>${headings
        .map((cell) => `<th scope="col">${renderInline(cell)}</th>`)
        .join("")}</tr></thead><tbody>${rows
        .map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table></div>`);
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

    const quoteMatch = line.match(/^>\s+(.+)$/);
    if (quoteMatch) {
      flushParagraph();
      closeList();
      html.push(`<blockquote>${renderInline(quoteMatch[1])}</blockquote>`);
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

function reviewedDate(markdown) {
  return markdown.match(/\*\*Reviewed:\s*([^*]+)\*\*/)?.[1]?.trim() ?? null;
}

function publicationDate(markdown) {
  const reviewed = reviewedDate(markdown);
  if (!reviewed) return "2026-07-15";
  const match = reviewed.match(/^(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})$/);
  if (!match) return "2026-07-15";
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const day = Number(match[1]);
  const month = months.indexOf(match[2]);
  const year = Number(match[3]);
  if (month < 0 || day < 1 || day > 31) return "2026-07-15";
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function readingTime(markdown) {
  return Math.max(1, Math.ceil(textFromMarkdown(markdown).split(/\s+/).length / 220));
}

function contentsNavigation(body) {
  const items = [...body.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)]
    .map((match) => ({ id: match[1], text: textFromMarkdown(match[2]) }))
    .slice(0, 15);
  if (items.length < 2) return "";
  return `<details class="article-contents"><summary>Contents</summary><nav aria-label="Article contents"><ol>${items
    .map((item) => `<li><a href="#${item.id}">${escapeHtml(item.text)}</a></li>`)
    .join("")}</ol></nav></details>`;
}

function primarySources() {
  return `<section class="article-sources" aria-label="Primary sources"><h2>Primary sources</h2><ul><li><a href="https://www.sap.com/products/technology-platform/master-data-governance.html">SAP Master Data Governance</a></li><li><a href="https://help.sap.com/">SAP Help Portal</a></li><li><a href="https://github.com/metalhatscats/martenweave-core">Martenweave Core source repository</a></li></ul></section>`;
}

const topicDestinations = {
  "Migration readiness": { href: "/docs/use-cases/sap-migration.html", label: "SAP migration workflow" },
  "SAP MDG and MDM": { href: "/docs/use-cases/mdg.html", label: "SAP MDG use case" },
  "Lineage and impact": { href: "/docs/how-it-works.html", label: "lineage and impact workflow" },
  "Validation and readiness": { href: "/docs/capabilities.html", label: "validation capabilities" },
  "AI governance": { href: "/docs/ai-governance.html", label: "AI governance model" },
  "AMS and continuity": { href: "/docs/use-cases/ams.html", label: "AMS use case" },
  "Logistics data": { href: "/docs/use-cases/sap-migration.html", label: "SAP migration workflow" },
  "Model governance": { href: "/docs/product.html", label: "Martenweave product guide" },
};

function relatedArticles(current, limit = 3) {
  return blogArticles
    .filter((article) => article.slug !== current.slug)
    .map((article) => {
      const sharedTerms = [...current.tokens].filter((term) => article.tokens.has(term)).length;
      const sameTopic = article.topic === current.topic ? 12 : 0;
      return { article, score: sameTopic + sharedTerms };
    })
    .sort((left, right) => right.score - left.score || left.article.slug.localeCompare(right.article.slug))
    .slice(0, limit)
    .map(({ article }) => article);
}

function authorCard() {
  return `<aside class="author-card" aria-labelledby="author-card-title"><p class="section-kicker">About the author</p><h2 id="author-card-title">${authorName}</h2><p>${escapeHtml(authorBio)}</p><p><a href="${authorProfilePath}">Read author profile</a> <span aria-hidden="true">·</span> <a href="https://www.linkedin.com/in/dkharlanau/">LinkedIn</a> <span aria-hidden="true">·</span> <a href="https://dkharlanau.github.io/">Personal site</a></p></aside>`;
}

function shareControls(canonicalUrl, title) {
  const encodedUrl = encodeURIComponent(canonicalUrl);
  const encodedTitle = encodeURIComponent(title);
  return `<section class="share-controls" aria-label="Share this page" data-share-controls><p class="section-kicker">Share this page</p><div class="share-actions"><a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}" target="_blank" rel="noopener noreferrer">X</a><a href="mailto:?subject=${encodedTitle}&body=${encodedUrl}">Email</a><button type="button" data-copy-link data-share-url="${escapeAttribute(canonicalUrl)}">Copy link</button></div><p class="share-status" data-share-status aria-live="polite"></p></section>`;
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

  if (route.blog) {
    const date = publicationDate(markdown);
    if (date) {
      contentEntity.datePublished = date;
      contentEntity.dateModified = date;
    }
    contentEntity.articleSection = route.topic;
    contentEntity.keywords = route.topic;
    contentEntity.timeRequired = `PT${readingTime(markdown)}M`;
  }

  if (articleType === "FAQPage") {
    contentEntity.mainEntity = extractFaqEntities(markdown);
  }

  if (articleType === "ProfilePage") {
    contentEntity.mainEntity = { "@id": `${productionOrigin}/#person` };
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
            name: route.blog ? "Blog" : "Docs",
            item: route.blog ? `${productionOrigin}/blog/` : `${productionOrigin}/docs.html`,
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
        url: `${productionOrigin}${authorProfilePath}`,
        sameAs: authorSocialProfiles,
        description: authorBio,
        jobTitle: "Senior SAP Consultant",
        worksFor: { "@type": "Organization", name: "EPAM Systems", url: "https://www.epam.com" },
        knowsAbout: authorTopics,
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
      const isContact = route.output === "contact.html";
      const active = !isContact && route.output === currentOutput ? ' aria-current="page"' : "";
      const href = isContact ? contactUrl : route.output === "index.html" ? "/docs.html" : `/docs/${route.output}`;
      const external = isContact ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${href}"${external}${active}>${route.label}</a>`;
    })
    .join("\n");
}

function blogNeighbors(slug) {
  const index = blogArticles.findIndex((article) => article.slug === slug);
  if (index < 0) return "";
  const previous = blogArticles[index - 1];
  const next = blogArticles[index + 1];
  if (!previous && !next) return "";
  return `<nav class="article-neighbors" aria-label="More articles">${previous ? `<a href="/blog/${previous.slug}.html"><span>Previous</span>${escapeHtml(previous.title)}</a>` : ""}${next ? `<a href="/blog/${next.slug}.html"><span>Next</span>${escapeHtml(next.title)}</a>` : ""}</nav>`;
}

function renderBlogCollection() {
  const topics = [...new Set(blogArticles.map((article) => article.topic))].sort();
  const cards = blogArticles
    .map((article, index) => {
      const markdown = readFileSync(join(docsDir, article.source), "utf8");
      const title = article.title;
      const published = publicationDate(markdown);
      const dateLabel = published ? escapeHtml(reviewedDate(markdown) ?? "15 July 2026") : "15 July 2026";
      const search = `${title} ${article.description} ${article.topic}`.toLowerCase();
      return `<a class="blog-card${index === 0 ? " is-featured" : ""}" href="/blog/${article.slug}.html" data-blog-card data-topic="${escapeAttribute(article.topic)}" data-search="${escapeAttribute(search)}"><span class="section-kicker">${escapeHtml(article.topic)}</span><strong>${escapeHtml(title)}</strong><p>${escapeHtml(article.description)}</p><small>${dateLabel} · ${readingTime(markdown)} min read</small></a>`;
    })
    .join("");
  const filters = topics
    .map((topic) => `<button type="button" class="blog-filter" data-topic-filter="${escapeAttribute(topic)}">${escapeHtml(topic)}</button>`)
    .join("");
  const behaviour = `<script>(() => {
    const cards = [...document.querySelectorAll('[data-blog-card]')];
    const search = document.querySelector('[data-blog-search]');
    const filters = [...document.querySelectorAll('[data-topic-filter]')];
    const count = document.querySelector('[data-blog-count]');
    const pagination = document.querySelector('[data-blog-pagination]');
    const pageSize = 12; let topic = ''; let page = 1;
    const render = () => {
      const query = search.value.trim().toLowerCase();
      const matches = cards.filter((card) => (!topic || card.dataset.topic === topic) && (!query || card.dataset.search.includes(query)));
      const pages = Math.max(1, Math.ceil(matches.length / pageSize)); page = Math.min(page, pages);
      cards.forEach((card) => { card.hidden = !matches.slice((page - 1) * pageSize, page * pageSize).includes(card); });
      count.textContent = matches.length + ' article' + (matches.length === 1 ? '' : 's') + (topic ? ' in ' + topic : '');
      pagination.innerHTML = pages > 1 ? Array.from({length: pages}, (_, index) => '<button type="button" class="' + (index + 1 === page ? 'is-current' : '') + '" aria-label="Page ' + (index + 1) + '" aria-current="' + (index + 1 === page ? 'page' : 'false') + '">' + (index + 1) + '</button>').join('') : '';
      [...pagination.querySelectorAll('button')].forEach((button, index) => button.addEventListener('click', () => { page = index + 1; render(); pagination.focus(); }));
    };
    filters.forEach((button) => button.addEventListener('click', () => { topic = button.dataset.topicFilter; page = 1; filters.forEach((item) => item.classList.toggle('is-active', item === button)); render(); }));
    search.addEventListener('input', () => { page = 1; render(); }); render();
  })();</script>`;
  return `<header class="blog-index-header"><p class="section-kicker">Martenweave journal</p><h1>Practical notes for model work that has to survive delivery.</h1><p>${blogArticles.length} articles on SAP migration, MDM and MDG delivery, data governance, logistics, lineage, impact, and deterministic validation.</p></header><section class="blog-controls" aria-label="Find an article"><label class="blog-search"><span>Search the journal</span><input type="search" placeholder="Try migration, lineage, warehouse…" data-blog-search /></label><div class="blog-filters" aria-label="Filter by topic"><button type="button" class="blog-filter is-active" data-topic-filter="">All topics</button>${filters}</div><p class="blog-result-count" data-blog-count aria-live="polite"></p></section><section class="blog-grid" aria-label="Articles" data-blog-grid>${cards}</section><nav class="blog-pagination" aria-label="Article pages" data-blog-pagination></nav>${behaviour}`;
}

function buildRssFeed() {
  const entries = blogArticles.map((article) => {
    const markdown = readFileSync(join(docsDir, article.source), "utf8");
    const title = extractTitle(markdown);
    const date = publicationDate(markdown) ?? "1970-01-01";
    const url = `${productionOrigin}/blog/${article.slug}.html`;
    return {
      title,
      date,
      url,
      description: article.description,
      topic: article.topic,
    };
  });
  const updated = entries.map((entry) => entry.date).sort().at(-1) ?? "1970-01-01";
  const pubDate = new Date(`${updated}T00:00:00Z`).toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Martenweave Blog</title>
    <link>${productionOrigin}/blog/</link>
    <description>Practical notes on SAP migration, MDM, data governance, lineage, impact, and deterministic validation.</description>
    <language>en</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
${entries
  .map(
    (entry) => `    <item>
      <title>${escapeHtml(entry.title)}</title>
      <link>${entry.url}</link>
      <guid isPermaLink="true">${entry.url}</guid>
      <pubDate>${new Date(`${entry.date}T00:00:00Z`).toUTCString()}</pubDate>
      <category>${escapeHtml(entry.topic)}</category>
      <description>${escapeHtml(entry.description)}</description>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`;
}

function buildSitemap() {
  const blogLastModified = new Map(
    blogArticles.map((article) => [
      `/blog/${article.slug}.html`,
      publicationDate(readFileSync(join(docsDir, article.source), "utf8")) ?? siteLastModified,
    ]),
  );
  const routes = [
    "/",
    "/docs.html",
    ...allRoutes
      .filter((route) => route.indexable !== false)
      .map((route) => route.canonical ?? `/docs/${route.output}`),
    "/llms.txt",
    "/llms-full.txt",
    "/ai.txt",
    "/ai.json",
    "/humans.txt",
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Set(routes)]
  .map(
    (route) => `  <url>
    <loc>${productionOrigin}${route}</loc>
    <lastmod>${blogLastModified.get(route) ?? siteLastModified}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
}

function renderPage(route) {
  const sourcePath = join(docsDir, route.source);
  const markdown = readFileSync(sourcePath, "utf8").replaceAll(
    "We are Metalhatscats, the team behind Martenweave.",
    "Martenweave is maintained by Dzmitryi Kharlanau.",
  );
  const title = extractTitle(markdown);
  const pageRoute = route.blog ? { ...route, seoTitle: `${title} | Martenweave` } : route;
  const isBlogSurface = pageRoute.blog || pageRoute.canonical === "/blog/";
  const renderedBody = pageRoute.canonical === "/blog/" ? renderBlogCollection() : markdownToHtml(markdown);
  const body = pageRoute.blog
    ? renderedBody.replace(/^<h1 id="[^"]+">[\s\S]*?<\/h1>\n?/, "")
    : renderedBody;
  const canonicalPath = pageRoute.canonical ?? `/docs/${pageRoute.output}`;
  const canonicalUrl = `${productionOrigin}${canonicalPath}`;
  const robots = pageRoute.indexable === false ? "noindex, follow" : "index, follow, max-image-preview:large";
  const jsonLd = renderJsonLd(pageRoute, markdown, title, canonicalUrl);
  const published = publicationDate(markdown);
  const blogIntro = pageRoute.blog
    ? `<header class="blog-header"><p class="section-kicker">${escapeHtml(pageRoute.topic)}</p><h1>${escapeHtml(title)}</h1><p class="blog-meta">By ${authorName}${published ? ` · Published <time datetime="${published}">${escapeHtml(reviewedDate(markdown) ?? "15 July 2026")}</time>` : ""} · ${readingTime(markdown)} min read</p><p class="blog-summary">${escapeHtml(pageRoute.description)}</p>${contentsNavigation(body)}</header>`
    : "";
  const related = pageRoute.blog
    ? relatedArticles(pageRoute)
        .map((article) => `<li><a href="/blog/${article.slug}.html">${escapeHtml(article.title)}</a></li>`)
        .join("")
    : "";
  const topicDestination = pageRoute.blog ? topicDestinations[pageRoute.topic] : null;
  const blogFooter = pageRoute.blog
    ? `${authorCard()}<aside class="blog-cta"><strong>Put the evidence in one controlled model.</strong><p>Explore the local-first workflow, then scope a representative pilot slice.</p><a href="/docs/pilot-projects.html">Explore pilot projects</a></aside>${topicDestination ? `<aside class="topic-guide"><span class="section-kicker">Go deeper</span><p>Explore the <a href="${topicDestination.href}">${topicDestination.label}</a>.</p></aside>` : ""}${primarySources()}${related ? `<section class="related-articles"><h2>Related articles</h2><ul>${related}</ul></section>` : ""}${blogNeighbors(pageRoute.slug)}`
    : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(pageRoute.seoTitle)}</title>
    <meta
      name="description"
      content="${escapeAttribute(pageRoute.description)}"
    />
    <meta name="robots" content="${robots}" />
    <meta name="author" content="${authorName}" />
    <meta name="application-name" content="Martenweave" />
    <meta name="martenweave-deployment-ref" content="${deploymentRevision}" />
    <meta name="theme-color" content="#321136" />
    <meta property="og:type" content="${pageRoute.blog ? "article" : "website"}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Martenweave" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${escapeAttribute(pageRoute.seoTitle)}" />
    <meta property="og:description" content="${escapeAttribute(pageRoute.description)}" />
    <meta property="og:image" content="${productionOrigin}/assets/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Martenweave open-source data model registry" />
${pageRoute.blog ? `    <meta property="article:author" content="${productionOrigin}${authorProfilePath}" />` : ""}
${pageRoute.blog && published ? `    <meta property="article:published_time" content="${published}" />\n    <meta property="article:modified_time" content="${published}" />` : ""}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttribute(pageRoute.seoTitle)}" />
    <meta name="twitter:description" content="${escapeAttribute(pageRoute.description)}" />
    <meta name="twitter:image" content="${productionOrigin}/assets/twitter-card.png" />
    <meta name="twitter:image:alt" content="Martenweave open-source data model registry" />
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
    <link rel="alternate" type="application/rss+xml" href="/feed.xml" title="Martenweave Blog" />
    <link rel="stylesheet" href="/styles.css" />
    <script src="/script.js" defer></script>
${jsonLd}  </head>
  <body class="${isBlogSurface ? "blog-page" : "docs-page"}">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" data-header>
      <nav class="nav" aria-label="Primary navigation">
        <a class="brand" href="/" aria-label="Martenweave home">
          <img src="/assets/logo.png" alt="" width="34" height="34" />
          <span>Martenweave</span>
        </a>
        <div class="nav-links">
          <a href="/docs.html">Docs</a>
          <a href="/blog/">Blog</a>
          <a href="https://github.com/metalhatscats/martenweave-core">GitHub</a>
          <a href="https://pypi.org/project/martenweave-core/">PyPI</a>
        </div>
      </nav>
    </header>

    <main id="main" class="${isBlogSurface ? "article-shell" : "doc-shell"}">
${isBlogSurface ? "" : `      <aside class="doc-sidebar" aria-label="Documentation navigation">
${renderNav(route.output)}
      </aside>`}
      <article class="doc-content${isBlogSurface ? " blog-article" : ""}">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          <a href="${isBlogSurface ? "/blog/" : "/docs.html"}">${isBlogSurface ? "Blog" : "Docs"}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${escapeHtml(title)}</span>
        </nav>
${blogIntro}
${body}
${blogFooter}
${pageRoute.canonical !== "/blog/" ? shareControls(canonicalUrl, title) : ""}
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
        <a href="/docs/support-martenweave.html">Support</a>
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

for (const route of allRoutes) {
  const outputPath = route.rootOutput ? join(root, route.output) : join(docsDir, route.output);
  mkdirSync(dirname(outputPath), { recursive: true });
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

function buildSearchIndex() {
  const index = [
    {
      url: "/",
      title: "Martenweave",
      category: "Home",
      excerpt:
        "Open-source data model registry for SAP migration, MDM, and data governance. Canonical files, validation, gap detection, lineage, impact, and human-approved AI proposals.",
    },
    ...allRoutes
      .filter((route) => route.indexable !== false)
      .map((route) => {
        const canonicalPath = route.canonical ?? `/docs/${route.output}`;
        return {
          url: canonicalPath,
          title: route.seoTitle,
          category: route.label,
          excerpt: route.description,
        };
      }),
  ];

  return JSON.stringify(index, null, 2);
}

const searchIndexPath = join(docsDir, "search-index.json");
const searchIndex = buildSearchIndex();
const rssFeedPath = join(root, "feed.xml");
const rssFeed = buildRssFeed();
const sitemapPath = join(root, "sitemap.xml");
const sitemap = buildSitemap();

if (checkOnly) {
  if (!existsSync(searchIndexPath)) {
    staleFiles.push("Missing generated file: docs/search-index.json");
  } else {
    const existing = readFileSync(searchIndexPath, "utf8");
    if (existing !== searchIndex) {
      staleFiles.push("Stale generated file: docs/search-index.json");
    }
  }
  if (!existsSync(rssFeedPath)) {
    staleFiles.push("Missing generated file: feed.xml");
  } else if (readFileSync(rssFeedPath, "utf8") !== rssFeed) {
    staleFiles.push("Stale generated file: feed.xml");
  }
  if (!existsSync(sitemapPath)) {
    staleFiles.push("Missing generated file: sitemap.xml");
  } else if (readFileSync(sitemapPath, "utf8") !== sitemap) {
    staleFiles.push("Stale generated file: sitemap.xml");
  }
} else {
  writeFileSync(searchIndexPath, searchIndex, "utf8");
  writeFileSync(rssFeedPath, rssFeed, "utf8");
  writeFileSync(sitemapPath, sitemap, "utf8");
}

if (staleFiles.length > 0) {
  console.error(staleFiles.join("\n"));
  console.error("Run: npm run build:docs");
  process.exit(1);
}

console.log(
  checkOnly
    ? `Generated docs are current: ${allRoutes.length} routes checked.`
    : `Generated docs: ${allRoutes.length} static HTML routes. Search index: docs/search-index.json.`,
);
