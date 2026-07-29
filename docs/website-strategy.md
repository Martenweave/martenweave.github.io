# Website strategy: a verified local first result

## Product category and one-sentence description

**Category:** local-first, AI-ready model and evidence workspace.

**Description:** Martenweave turns one local spreadsheet, dataset, interface contract, or model
repository into deterministic readiness findings, traceable evidence, readable reports, and
human-governed change proposals.

The public site must describe the local Core and local Workbench accurately. It must not imply a
hosted service, a cloud upload path, automatic model mutation, or a replacement for an enterprise
MDM platform.

## People, starting questions, and conversion path

| Visitor | Starting question | First useful proof | Next action |
| --- | --- | --- | --- |
| Transformation leader | “Where will migration or governance rework surface first?” | A local readiness finding and report from a representative extract | Review a short, scoped design-partner conversation |
| Migration or MDM lead | “Which fields, mappings, values, owners, or transformations are not ready?” | Deterministic gap evidence linked to the local model | Inspect the evidence and a proposed controlled resolution |
| Data architect or consultant | “Can we keep model knowledge reusable and reviewable?” | Canonical model, lineage/impact, and an approval-gated proposal | Install Core and run a reproducible local scenario |

The primary conversion is a **verified local first-value flow**, not a clone-first repository tour:

1. Install the open-source package locally.
2. Run `martenweave start ./customers.xlsx --no-open` on a CSV, XLSX, XML, or JSON input.
3. Inspect the locally generated readiness report and Workbench evidence.
4. Trace a finding through lineage or impact when appropriate.
5. Review an optional proposal; a human approval remains required before any canonical change.

The site may offer GitHub and documentation links as supporting evaluation paths. It should not
claim that every visitor can complete production onboarding in a browser or that a result proves
business readiness without review.

## Homepage message hierarchy

1. **Hero:** lead with the local-first, AI-ready model and evidence workspace category and the
   one-file-to-readiness outcome.
2. **Problem:** explain that mapping workbooks, extracts, tickets, and decisions drift apart;
   a green spreadsheet alone does not establish model readiness.
3. **How it works:** local input → deterministic profile and validation → gaps/evidence →
   readiness report → optional reviewable proposal.
4. **Proof:** show only reproducible, local proof: a representative input, finding, report,
   lineage/impact, and governed proposal. Label any synthetic example as synthetic.
5. **CTA:** “Try the local readiness flow” as the primary technical CTA; “Discuss a design
   partner pilot” as the evaluative CTA.

## Positioning boundaries

Martenweave should differentiate by explaining its own boundary, not by making unverified claims
about alternatives:

| Existing approach | Useful for | Martenweave contribution |
| --- | --- | --- |
| Spreadsheets and tickets | Collecting project inputs and discussion | Keeps model meaning, evidence, validation, and decisions traceable across those inputs |
| Generic AI tools | Drafting and summarising | Produces only reviewable proposals and never approves or silently applies canonical changes |
| Enterprise MDM and governance platforms | Operating mastered data and enterprise workflows | Provides a local, canonical model-and-evidence layer that can support migration, MDM, governance, and AMS work |

Avoid absolute superiority claims, competitor feature comparisons without a source, “single pane of
glass” language, certification claims, customer-result claims, and hosted-SaaS language.

## Proof and demo requirements

Every product claim about the first result should be supportable with a reproducible local proof:

- a local CSV, XLSX, XML, or JSON input;
- a deterministic readiness finding with its source/evidence reference;
- a lineage or impact view from canonical model relationships;
- a generated local report; and
- an optional PatchProposal with validation and human review boundaries visible.

The site should distinguish **available now**, **optional/configured**, and **planned**. AI is
optional: no-provider mode supports the local profiling, validation, readiness, and review flow.

## Calls to action and design-partner language

Primary CTA copy should be concrete and local:

> Install Core, assess one local file, and inspect the generated readiness evidence.

The design-partner CTA should invite a discovery conversation without claiming customers,
guaranteed outcomes, managed hosting, or a sales process:

> Exploring a migration, MDM, or AMS knowledge problem? Discuss a small, evidence-led design
> partner pilot using a representative local scenario.

## SEO content map and consolidation

| Cluster | Canonical page | Supporting pages | Consolidation rule |
| --- | --- | --- | --- |
| Local model and evidence workspace | Homepage and [Product](product.md) | [Architecture](architecture.md), [Capabilities](capabilities.md) | Keep the category and one-sentence description identical |
| Dataset readiness and migration gaps | [Quickstart](quickstart.md) | [How it works](how-it-works.md), [Import/export](import-export.md), SAP migration use case | Keep install and supported-format claims current with the packaged wheel |
| Model governance, lineage, and impact | [Governance](governance.md) | [Architecture](architecture.md), [Use cases](use-cases.md) | Do not duplicate generic governance definitions across blogs |
| Controlled AI proposals | [AI governance](ai-governance.md) | [FAQ](faq.md), AI provider documentation | Always state: AI proposes, validators verify, humans approve |
| Evaluation and design partners | [Pilot projects](pilot-projects.md) | [Support](support-martenweave.md), [Partnerships](partnerships.md) | Keep fictional/synthetic proof clearly labeled; no customer claims |

Before creating additional comparison or blog pages, link the prospective query to one canonical
page above. Merge or redirect pages that repeat the same intent without new, source-backed proof.

## Editorial claims checklist

Before publishing a homepage, document, or campaign change, verify:

- The claim is reproducible from the released local package or clearly marked planned.
- Local inputs are never described as uploaded to a Martenweave cloud service.
- AI language preserves the proposal/validator/human-approval boundary.
- Synthetic examples are explicitly called synthetic.
- External products are described only in neutral, supportable terms.
- The primary action points to the verified local first-value flow.
