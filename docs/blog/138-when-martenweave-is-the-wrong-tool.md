# When Martenweave Is the Wrong Tool

<!-- **Reviewed: 18 July 2026** -->

Good product evaluation includes an exit ramp. Martenweave is useful when a team needs a canonical, inspectable model and evidence layer around a bounded delivery problem. It is the wrong tool when that is not the problem.

## You need live master-data operations

Do not select Martenweave if the immediate need is to create, match, merge, steward, approve, and distribute production master records. Use SAP MDG or another MDM platform for operational mastering. Martenweave has no golden-record service, duplicate matching engine, master-data workflow UI, or direct production write-back.

## You need an enterprise data catalogue

Do not select Martenweave as a substitute for estate-wide metadata ingestion, enterprise asset search, access governance, privacy classification, data-product marketplace, or broad observability. Data catalogues and metadata platforms are better designed for those requirements. Martenweave can be a complementary repository for a specific project model, but it should not become a shadow catalogue.

## You need a hosted collaboration application now

Martenweave is local-first and backend-first. Its local API and Workbench surface are integration paths around Core, not a hosted SaaS tenant with enterprise identity, access management, or global collaboration workflows. If the project cannot own a local repository and its review process, a managed platform may be a better fit.

## You need AI to make autonomous changes

Martenweave is deliberately unsuitable for a workflow that expects an agent to modify canonical truth without review. AI creates PatchProposals; deterministic validation and human approval remain part of the change path. That can feel slower than an autonomous agent loop because the design prioritises inspectability and accountability.

## Your problem is too small or too temporary

A one-off extract with no recurring model decision may not justify a registry. If the work can be completed safely with a reviewed spreadsheet and a short handover, introducing a model repository creates overhead. Martenweave earns its place when the relationships, evidence, and changes need to survive multiple waves, teams, or future investigations.

## You cannot assign ownership

Canonical files do not solve an absent operating model. If nobody can define terms, approve exceptions, review changes, or own the post-project repository, the first action is to establish accountable roles and a minimal decision process. Deploying a tool before that work will merely make unowned content more structured.

## A better way to test fit

Choose one high-value question: a source-to-target gap, an SAP-context rule, a known mapping dispute, or a handover risk. Build the smallest model slice that can answer it. If validation, lineage, gap detection, impact analysis, and the proposal workflow do not improve that decision, stop. The evidence should justify expansion.

## Sources and notes

- [Product boundary](/docs/product.html) states what Martenweave is and is not.
- [Capabilities](/docs/capabilities.html) distinguishes implemented functionality from the wider platform categories it does not replace.
- [AI governance](/docs/ai-governance.html) documents the proposal-based change boundary.
- [Pilot projects](/docs/pilot-projects.html) describes a bounded evaluation approach.
