# Build, Buy, or Extend: Choosing a Model-Governance Approach

<!-- **Reviewed: 18 July 2026** -->

The wrong model-governance decision usually begins with a false choice: buy a big platform or keep using spreadsheets. There is a third path—extend a controlled, source-based model layer around the tools already in place.

The right choice depends on the decision that keeps failing in delivery.

## First identify the missing capability

If business users cannot create, deduplicate, approve, and distribute master records, the missing capability is operational MDM. Buy or implement an MDM platform.

If users cannot discover trusted data across a large estate, connect lineage to dashboards, apply policies, and find owners, the missing capability is catalogue and enterprise metadata management. Evaluate a catalogue or metadata platform.

If enterprise architects cannot maintain application portfolios, roadmaps, and transformation dependencies, the missing capability is enterprise architecture management. Evaluate an architecture-management product.

If a migration team cannot explain what a mapping means, trace its evidence, validate its references, locate a dataset gap, or control a proposed change, the missing capability may be a model registry and delivery evidence layer.

Buying the wrong category creates more integration work, not less.

## When to buy

Buy when the requirement is standard, broad, and operationally demanding. Managed hosting, steward workflows, identity integration, connector coverage, security administration, support, and user adoption can outweigh the benefits of customisation. The product must still fit the actual scope, but buying is often sensible for operational mastering, enterprise cataloguing, data access governance, or architecture portfolio management.

Ask vendors to demonstrate the delivery scenario, not just generic features. For a SAP programme, include a country-specific mapping exception, a missing source column, an approval decision, and the handover question. Establish which evidence stays visible after the programme team changes.

## When to build

Build a bespoke repository only when the model is genuinely unique and the team can afford its ongoing ownership. A custom build requires more than schemas and a web screen: validation, migration paths, contributor guidance, audit boundaries, tests, security controls, release discipline, and integration maintenance.

Many internal scripts begin as helpful extracts and gradually become an undocumented product. If building, make the authoritative file format, validation rules, and change process explicit from the start.

## When to extend Martenweave

Extend Martenweave when the project needs a controlled model layer but does not need to reinvent the base mechanics. The Core already supplies canonical model files, Pydantic validation, reference checks, SAP-context rules, generated indexes, gap and lineage services, impact analysis, export workflows, and a proposal-to-approval lifecycle.

Extensions can be deliberately bounded: a domain pack with new validation rules, an example model for a reusable delivery scenario, an export adapter, a report, or an integration that consumes approved outputs. The extension should preserve two guardrails: generated artifacts remain derived, and external or AI-assisted input does not silently change canonical truth.

## A decision checklist

Before selecting a path, answer these questions:

- Is the desired output a live golden record, a discovered data asset, an architecture roadmap, or a controlled model decision?
- Which team can own configuration, code, governance rules, and support after go-live?
- What must be independently reviewable: records, assets, mappings, exceptions, or approvals?
- Which integrations are required now, and which are merely attractive future ideas?
- Can a small representative model slice prove the choice before the programme commits to a large rollout?

## Sources and notes

- [Martenweave capabilities](/docs/capabilities.html) lists implemented Core functions.
- [Martenweave examples](/docs/examples.html) shows the bundled model slices.
- [Pilot projects](/docs/pilot-projects.html) describes a bounded evaluation path.
- [Consulting](/docs/consulting.html) and [partnerships](/docs/partnerships.html) describe optional implementation, extension, and integration support.

Martenweave does not claim that extending Core is lower-risk or lower-cost than buying a platform. Evaluate the operating burden against the delivery problem.
