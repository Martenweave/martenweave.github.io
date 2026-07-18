# Martenweave vs Microsoft Purview: Enterprise Governance Context and Delivery Model Control

<!-- **Reviewed: 18 July 2026** -->

Microsoft-centric organisations often ask whether a separate model registry is necessary once Microsoft Purview is in place. The honest answer is sometimes no.

Purview’s Unified Catalog and Data Map are designed to establish enterprise governance context: data assets, lineage, governance domains, data products, glossary terms, critical data elements, quality signals, and roles. If the problem is better discovery and governed use of a broad Microsoft or hybrid data estate, Purview is a much more natural answer than Martenweave.

The remaining question is whether a delivery programme needs a more specific, source-controlled model-evidence layer.

## Purview’s strength is the data estate

Microsoft documents governance domains as boundaries for common ownership, discovery, data products, business concepts, and policies. Its Unified Catalog connects business-facing governance concepts to the asset inventory in Data Map. Its lineage documentation describes using metadata to trace data through raw, transformed, and reporting stages for troubleshooting, quality, compliance, and impact scenarios.

That breadth matters. Purview can be the appropriate governance home for data products, enterprise roles, access-aware discovery, catalogue curation, and a Microsoft-oriented governance operating model. Martenweave has no tenant-wide catalogue, access policy system, managed cloud service, or equivalent estate mapping.

## Where the model registry fits

An SAP migration needs to make smaller, more precise commitments than “Customer ID is a critical data element.” It needs to establish which legacy columns feed a target attribute, which SAP context applies, what the transformation means, whether expected data exists in a dataset, what value rule is approved, and whether a proposed change has been reviewed.

Martenweave represents these as canonical objects and relationships rather than as a general catalogue record. Its deterministic validators can reject broken references or unsupported SAP field contexts before rebuildable indexes and reports are generated. Its proposal workflow keeps AI-assisted or note-driven changes as PatchProposals until human approval.

This does not make Martenweave more “governed” than Purview. It makes it more focused on the delivery evidence of a bounded model slice.

## A realistic integration posture

The safest relationship is complementary and intentionally loose:

- Purview retains the enterprise inventory, governance domains, data products, broader lineage, and relevant governance roles.
- Martenweave retains canonical migration or MDM model files, validation findings, mapping relationships, and controlled proposal history.
- Teams link records through stable identifiers or approved exports where needed, instead of silently synchronizing model truth in both directions.

That avoids two systems claiming to be the authoritative source for the same semantic decision. It also lets a project use the organisation’s existing governance investment without forcing Purview to become a project change-control repository.

## Decision framework

Choose Purview alone when cataloguing, governance-domain design, quality visibility, lineage across the estate, and Microsoft-platform governance are enough for the delivery problem.

Use Martenweave alongside Purview when a project must preserve the mapping and decision evidence that connects source data, SAP or target endpoints, validations, gaps, and approvals. The case is strongest where delivery continues across several waves or must transfer to AMS without asking a new team to reconstruct the model from projects artefacts.

## Sources and notes

- [Microsoft Purview Unified Catalog overview](https://learn.microsoft.com/en-us/purview/data-governance) describes Unified Catalog, Data Map, governance domains, data products, quality, and lineage.
- [Governance domains in Unified Catalog](https://learn.microsoft.com/en-us/purview/unified-catalog-governance-domains) describes ownership, business concepts, policies, and critical data elements.
- [Microsoft Purview lineage](https://learn.microsoft.com/en-us/purview/data-gov-classic-lineage) describes metadata lineage and impact-analysis use cases.
- [Martenweave governance](/docs/governance.html) and [import/export boundaries](/docs/import-export.html) describe the current scope.

Martenweave is independent and is not affiliated with, endorsed by, or a replacement for Microsoft or Microsoft Purview. Product names are trademarks of their respective owners.
