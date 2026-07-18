# Article Extraction Report — Martenweave

Date: 2026-07-15
Repository: `/Users/dzmitryikharlanau/Developments/martenweave.github.io`
Output directory: `inbox/articles/` (local only — excluded via `/inbox/` in `.gitignore`; not committed, not published)

## Source conversations

1. https://chatgpt.com/g/g-p-6a12b0f88c8481919416089723d6576b/c/6a564cc0-3698-83eb-ac72-a381f6cc0304 — «Продвижение проекта через статьи» (1,680 nodes, 1 branch point, both branches parsed)
2. https://chatgpt.com/g/g-p-6a12b0f88c8481919416089723d6576b/c/6a572bfb-4458-83ed-9837-dc3b3e3bde97 — «Детерминированная проверка миграции» (177 nodes, no branches)

### Export method (note)

The ChatGPT web UI in this browser session exposes **no per-conversation Download button** (checked: conversation options menu, full DOM scan for download/export controls, extension overlays and shadow roots — none present). The full conversation exports were therefore obtained through ChatGPT's internal conversation-export endpoint (`backend-api/conversation/<id>`) called from the owner's authenticated browser session via Kimi WebBridge, and downloaded as JSON files. This export contains the complete message tree including all branches, long assistant responses and writing blocks — equivalent to a full conversation export.

Raw exports kept locally at:

- `inbox/source/chatgpt-conversation-1-6a564cc0.json` (8.9 MB)
- `inbox/source/chatgpt-conversation-2-6a572bfb.json` (0.8 MB)

## Numbers

| Metric | Count |
|---|---|
| Conversations processed | 2 |
| Candidate long assistant messages reviewed | 148 |
| Standalone article candidates (writing blocks with `# ` title) | 135 |
| **Articles extracted** | **130** |
| Duplicates rejected | 5 |
| Incomplete drafts rejected | 1 |
| Non-article messages rejected (instructions, plans, ideas, status, service replies) | 12 |
| Total words across extracted articles | 605,905 |

## Rejected duplicates (kept most complete version)

| Rejected | Kept instead | Reason |
|---|---|---|
| Conv 1, node 831 — "How to Version a Data Model Without Turning It into Documentation Chaos" (38,793 chars) | Conv 1, node 823 (40,982 chars) → `072-...` | Regenerated version of the same article; earlier version is longer and equally polished |
| Conv 1, node 1110 — "How to Prioritize Migration Gaps by Business Risk Instead of Field Count" (35,066 chars) | Conv 1, node 1120 (40,332 chars) → `083-...` | Regenerated version of the same article; later version is more complete |
| Conv 2, node 13 — "How Deterministic Validation Reduces SAP Migration Risk" (15,309 chars) | Conv 1, node 301 (36,358 chars) → `027-...` | Earlier, shorter draft of the same article |
| Conv 2, node 84 — "Data Catalog vs Model Registry: What Managers Need to Know Before Buying Another Platform" (18,989 chars) | Conv 1, node 278 (32,554 chars) → `025-...` | Same comparison article; conversation 1 version is more complete and carries the reviewed stamp |
| Conv 2, node 94 — "MDM vs Model Registry: Managing Records or Managing Their Meaning?" (22,381 chars) | Conv 1, node 267 (35,105 chars) → `024-...` | Same comparison article; conversation 1 version is more complete and carries the reviewed stamp |

## Rejected incomplete drafts (1)

- Conv 2, node 120 — "How Martenweave closes the gap between schema and meaning" (6,546 chars): a replacement **section** (starts at `## `, no article title, no introduction/conclusion) written for another article, not a standalone piece.

## Rejected non-article messages (12)

Russian-language working discussion, planning and service messages, not articles:

- Conv 1, nodes 49, 62, 75, 95, 99 — positioning/strategy discussions
- Conv 1, node 66 — requested list of 12 priority articles (outline/ideas)
- Conv 1, node 103 — large article-idea list (pillar pages plan)
- Conv 1, node 106 — service acknowledgment ("remember this list")
- Conv 1, node 708 — progress/status summary ("what is already covered")
- Conv 1, node 1305 — navigation reply ("where are we in the list")
- Conv 1, node 1464 — logistics positioning brainstorm (discussion, no finished article)
- Conv 2, node 65 — series planning outline ("Series 1. Explaining the new class")

All user instructions, "continue"/"next" replies and short answers were excluded by the ≥2,000-character candidate filter and manual review.

## Files created (130)

- `001-sap-mdg-manages-master-data-who-manages-the-implementation-knowledge.md` — SAP MDG Manages Master Data. Who Manages the Implementation Knowledge? (3,063 words)
- `002-why-sap-migration-mapping-spreadsheets-break-down.md` — Why SAP Migration Mapping Spreadsheets Break Down (3,524 words)
- `003-what-to-prepare-before-starting-an-sap-mdg-implementation.md` — What to Prepare Before Starting an SAP MDG Implementation (4,599 words)
- `004-how-sap-data-migration-and-mdg-implementation-should-work-together.md` — How SAP Data Migration and MDG Implementation Should Work Together (3,804 words)
- `005-why-an-sap-mdg-implementation-needs-an-independent-model-specification.md` — Why an SAP MDG Implementation Needs an Independent Model Specification (4,294 words)
- `006-sap-data-migration-readiness-checklist.md` — SAP Data Migration Readiness Checklist (4,528 words)
- `007-why-mapping-completion-is-not-migration-readiness.md` — Why Mapping Completion Is Not Migration Readiness (3,943 words)
- `008-how-to-build-a-single-source-of-truth-for-sap-mappings.md` — How to Build a Single Source of Truth for SAP Mappings (4,240 words)
- `009-how-to-detect-dataset-gaps-before-sap-migration-testing.md` — How to Detect Dataset Gaps Before SAP Migration Testing (5,222 words)
- `010-how-to-perform-impact-analysis-for-an-sap-field-change.md` — How to Perform Impact Analysis for an SAP Field Change (4,472 words)
- `011-how-to-trace-a-legacy-field-to-an-sap-target-field.md` — How to Trace a Legacy Field to an SAP Target Field (4,261 words)
- `012-how-to-keep-sap-mdg-design-and-configuration-aligned.md` — How to Keep SAP MDG Design and Configuration Aligned (4,280 words)
- `013-how-to-reduce-rework-during-an-sap-mdg-implementation.md` — How to Reduce Rework During an SAP MDG Implementation (4,446 words)
- `014-what-an-sap-mdg-handover-package-should-contain.md` — What an SAP MDG Handover Package Should Contain (4,945 words)
- `015-why-project-knowledge-disappears-after-go-live.md` — Why Project Knowledge Disappears After Go-Live (4,728 words)
- `016-how-martenweave-complements-sap-mdg.md` — How Martenweave Complements SAP MDG (4,044 words)
- `017-martenweave-vs-excel-jira-and-confluence.md` — Martenweave vs Excel, Jira and Confluence (4,689 words)
- `018-data-model-registry-vs-mdm-platform.md` — Data Model Registry vs MDM Platform (5,101 words)
- `019-data-model-registry-vs-data-catalog.md` — Data Model Registry vs Data Catalog (4,774 words)
- `020-why-ai-should-propose-model-changes-but-never-apply-them-directly.md` — Why AI Should Propose Model Changes but Never Apply Them Directly (4,896 words)
- `021-how-deterministic-validation-reduces-migration-risk.md` — How Deterministic Validation Reduces Migration Risk (5,227 words)
- `022-how-to-manage-global-and-local-requirements-in-sap-mdg.md` — How to Manage Global and Local Requirements in SAP MDG (5,355 words)
- `023-how-to-track-sap-mdg-model-decisions.md` — How to Track SAP MDG Model Decisions (4,599 words)
- `024-how-to-validate-that-sap-mdg-configuration-matches-the-approved-model.md` — How to Validate That SAP MDG Configuration Matches the Approved Model (4,907 words)
- `025-how-to-build-an-evidence-based-migration-readiness-report.md` — How to Build an Evidence-Based Migration Readiness Report (5,297 words)
- `026-how-better-model-traceability-reduces-rework.md` — How Better Model Traceability Reduces Rework (4,605 words)
- `027-how-to-reduce-key-person-risk-in-sap-programmes.md` — How to Reduce Key-Person Risk in SAP Programmes (5,211 words)
- `028-how-much-of-an-mdg-programme-happens-outside-the-mdg-platform.md` — How Much of an MDG Programme Happens Outside the MDG Platform? (5,049 words)
- `029-how-a-small-martenweave-pilot-can-de-risk-a-large-mdg-investment.md` — How a Small Martenweave Pilot Can De-Risk a Large MDG Investment (4,752 words)
- `030-how-metalhatscats-helps-teams-establish-model-governance.md` — How Metalhatscats Helps Teams Establish Model Governance (4,626 words)
- `031-how-to-turn-model-governance-into-an-ams-capability-after-go-live.md` — How to Turn Model Governance into an AMS Capability After Go-Live (5,160 words)
- `032-how-to-use-github-as-a-change-control-layer-for-sap-data-models.md` — How to Use GitHub as a Change-Control Layer for SAP Data Models (4,951 words)
- `033-how-to-govern-spreadsheet-changes-without-forcing-business-users-into.md` — How to Govern Spreadsheet Changes Without Forcing Business Users into Git (5,154 words)
- `034-how-to-design-a-model-change-request-that-business-and-technical-teams.md` — How to Design a Model Change Request That Business and Technical Teams Can Review Together (5,601 words)
- `035-how-to-prioritise-model-changes-by-business-risk-instead-of-ticket.md` — How to Prioritise Model Changes by Business Risk Instead of Ticket Urgency (5,060 words)
- `036-how-to-build-a-model-risk-register-for-sap-migration-and-mdg.md` — How to Build a Model Risk Register for SAP Migration and MDG (5,700 words)
- `037-how-to-turn-model-risks-into-an-actionable-sap-migration-backlog.md` — How to Turn Model Risks into an Actionable SAP Migration Backlog (4,883 words)
- `038-how-to-define-exit-criteria-for-sap-migration-model-risks.md` — How to Define Exit Criteria for SAP Migration Model Risks (5,449 words)
- `039-how-to-prove-that-an-sap-migration-risk-is-really-closed.md` — How to Prove That an SAP Migration Risk Is Really Closed (5,113 words)
- `040-how-to-design-a-closure-evidence-workspace-for-sap-migration-and-mdg.md` — How to Design a Closure Evidence Workspace for SAP Migration and MDG (5,058 words)
- `041-how-to-connect-martenweaves-ui-to-live-model-dataset-and-proposal-data.md` — How to Connect Martenweave’s UI to Live Model, Dataset and Proposal Data (5,298 words)
- `042-how-to-investigate-an-sap-data-model-problem-before-changing-the-system.md` — How to Investigate an SAP Data Model Problem Before Changing the System (5,741 words)
- `043-how-to-structure-a-model-investigation-case-so-the-finding-can-be-reused.md` — How to Structure a Model Investigation Case So the Finding Can Be Reused (4,439 words)
- `044-how-to-build-a-reusable-decision-library-for-sap-migration-and-mdm.md` — How to Build a Reusable Decision Library for SAP Migration and MDM (4,893 words)
- `045-how-to-prevent-local-sap-decisions-from-fragmenting-the-global-data.md` — How to Prevent Local SAP Decisions from Fragmenting the Global Data Model (5,374 words)
- `046-how-to-decide-whether-a-local-sap-requirement-belongs-in-the-global.md` — How to Decide Whether a Local SAP Requirement Belongs in the Global Model (5,606 words)
- `047-how-to-design-global-and-local-model-inheritance-without-creating.md` — How to Design Global and Local Model Inheritance Without Creating Configuration Chaos (4,976 words)
- `048-how-to-resolve-conflicting-global-and-local-rules-before-they-reach-sap.md` — How to Resolve Conflicting Global and Local Rules Before They Reach SAP Configuration (4,927 words)
- `049-how-to-test-global-and-local-sap-rules-against-real-migration-data.md` — How to Test Global and Local SAP Rules Against Real Migration Data (5,306 words)
- `050-how-to-turn-migration-rule-test-results-into-model-decisions-instead-of.md` — How to Turn Migration Rule Test Results into Model Decisions Instead of Defect Noise (5,236 words)
- `051-how-to-build-a-migration-finding-taxonomy-that-business-data-and-sap.md` — How to Build a Migration Finding Taxonomy That Business, Data and SAP Teams Use Consistently (5,098 words)
- `052-how-to-route-migration-findings-to-the-right-owner-without-creating.md` — How to Route Migration Findings to the Right Owner Without Creating Another Governance Bureaucracy (4,838 words)
- `053-how-to-define-data-ownership-that-still-works-after-the-sap-programme.md` — How to Define Data Ownership That Still Works After the SAP Programme Ends (4,148 words)
- `054-how-to-build-an-ams-model-change-process-that-does-not-recreate-the-sap.md` — How to Build an AMS Model Change Process That Does Not Recreate the SAP Project (4,719 words)
- `055-how-to-separate-sap-ams-incidents-service-requests-and-model-changes.md` — How to Separate SAP AMS Incidents, Service Requests and Model Changes Without Losing Traceability (4,440 words)
- `056-how-to-detect-when-an-sap-ams-workaround-has-become-an-unapproved-data.md` — How to Detect When an SAP AMS Workaround Has Become an Unapproved Data Model (5,672 words)
- `057-how-to-retire-sap-ams-workarounds-without-breaking-the-business-process.md` — How to Retire SAP AMS Workarounds Without Breaking the Business Process (4,820 words)
- `058-how-to-use-ams-incident-patterns-to-improve-the-sap-data-model-instead.md` — How to Use AMS Incident Patterns to Improve the SAP Data Model Instead of Just Reducing Ticket Volume (5,620 words)
- `059-how-martenweave-represents-a-data-model-in-markdown-and-yaml.md` — How Martenweave Represents a Data Model in Markdown and YAML (4,716 words)
- `060-why-canonical-model-files-should-remain-the-source-of-truth.md` — Why Canonical Model Files Should Remain the Source of Truth (4,957 words)
- `061-how-martenweave-builds-a-searchable-sqlite-model-index.md` — How Martenweave Builds a Searchable SQLite Model Index (5,234 words)
- `062-how-deterministic-model-validation-works.md` — How Deterministic Model Validation Works (5,941 words)
- `063-how-martenweave-represents-entities-attributes-rules-and-relationships.md` — How Martenweave Represents Entities, Attributes, Rules and Relationships (5,213 words)
- `064-how-to-version-a-data-model-without-turning-it-into-documentation-chaos.md` — How to Version a Data Model Without Turning It into Documentation Chaos (5,768 words)
- `065-how-model-diffing-should-work-across-sap-releases.md` — How Model Diffing Should Work Across SAP Releases (5,390 words)
- `066-how-to-design-stable-ids-for-enterprise-data-model-objects.md` — How to Design Stable IDs for Enterprise Data Model Objects (5,814 words)
- `067-why-generated-indexes-should-be-disposable.md` — Why Generated Indexes Should Be Disposable (5,602 words)
- `068-how-to-package-and-transfer-a-martenweave-model-repository.md` — How to Package and Transfer a Martenweave Model Repository (5,164 words)
- `069-how-to-build-field-level-lineage-for-an-sap-migration.md` — How to Build Field-Level Lineage for an SAP Migration (5,502 words)
- `070-why-table-level-lineage-is-not-enough-for-master-data.md` — Why Table-Level Lineage Is Not Enough for Master Data (4,779 words)
- `071-how-to-trace-a-business-attribute-across-source-systems-mappings-and.md` — How to Trace a Business Attribute Across Source Systems, Mappings and SAP Fields (4,727 words)
- `072-how-to-calculate-downstream-impact-before-changing-an-sap-field.md` — How to Calculate Downstream Impact Before Changing an SAP Field (4,900 words)
- `073-how-impact-analysis-should-work-for-rules-mappings-and-value-lists.md` — How Impact Analysis Should Work for Rules, Mappings and Value Lists (5,224 words)
- `074-how-to-detect-orphaned-fields-rules-and-mappings.md` — How to Detect Orphaned Fields, Rules and Mappings (6,674 words)
- `075-how-to-detect-broken-lineage-after-a-source-or-target-system-change.md` — How to Detect Broken Lineage After a Source or Target System Change (5,407 words)
- `076-how-to-model-source-authority-and-fallback-paths-without-creating.md` — How to Model Source Authority and Fallback Paths Without Creating Ambiguous Lineage (6,385 words)
- `077-how-to-separate-design-time-lineage-from-runtime-evidence.md` — How to Separate Design-Time Lineage from Runtime Evidence (5,705 words)
- `078-how-to-use-lineage-evidence-during-mock-loads-cutover-and-hypercare.md` — How to Use Lineage Evidence During Mock Loads, Cutover and Hypercare (5,159 words)
- `079-how-to-build-a-lineage-based-migration-readiness-score-without-hiding.md` — How to Build a Lineage-Based Migration Readiness Score Without Hiding Risk (5,558 words)
- `080-how-to-explain-lineage-and-impact-to-business-owners-without-showing.md` — How to Explain Lineage and Impact to Business Owners Without Showing Them a Graph Database (5,818 words)
- `081-how-lineage-supports-ams-root-cause-analysis-after-go-live.md` — How Lineage Supports AMS Root-Cause Analysis After Go-Live (5,490 words)
- `082-how-to-connect-dataset-gaps-to-lineage-and-business-impact.md` — How to Connect Dataset Gaps to Lineage and Business Impact (5,512 words)
- `083-how-to-prioritize-migration-gaps-by-business-risk-instead-of-field-count.md` — How to Prioritize Migration Gaps by Business Risk Instead of Field Count (5,829 words)
- `084-how-to-turn-migration-gap-findings-into-reviewable-patch-proposals.md` — How to Turn Migration Gap Findings into Reviewable Patch Proposals (6,638 words)
- `085-why-ai-should-propose-model-changes-but-never-approve-them.md` — Why AI Should Propose Model Changes but Never Approve Them (4,348 words)
- `086-why-a-data-catalogue-is-not-enough-for-migration-model-governance.md` — Why a Data Catalogue Is Not Enough for Migration Model Governance (4,129 words)
- `087-why-sap-mdg-is-not-a-replacement-for-a-migration-model-registry.md` — Why SAP MDG Is Not a Replacement for a Migration Model Registry (4,446 words)
- `088-how-martenweave-should-work-alongside-sap-mdg-during-a-migration.md` — How Martenweave Should Work Alongside SAP MDG During a Migration (4,262 words)
- `089-why-migration-mapping-workbooks-become-technical-debt-and-what-should.md` — Why Migration Mapping Workbooks Become Technical Debt—and What Should Replace Them (4,129 words)
- `090-how-we-convert-a-mapping-workbook-into-a-canonical-model-without-losing.md` — How We Convert a Mapping Workbook into a Canonical Model Without Losing Business Context (4,338 words)
- `091-how-we-keep-business-decisions-traceable-after-the-mapping-workbook-is.md` — How We Keep Business Decisions Traceable After the Mapping Workbook Is Gone (3,595 words)
- `092-how-we-prevent-temporary-migration-exceptions-from-becoming-permanent.md` — How We Prevent Temporary Migration Exceptions from Becoming Permanent Rules (4,106 words)
- `093-how-we-model-data-quality-rules-without-mixing-business-policy-and.md` — How We Model Data Quality Rules Without Mixing Business Policy and Technical Validation (4,484 words)
- `094-how-we-turn-validation-failures-into-actionable-findings-instead-of.md` — How We Turn Validation Failures into Actionable Findings Instead of Another Error Report (4,866 words)
- `095-how-we-decide-whether-a-finding-requires-data-correction-a-mapping.md` — How We Decide Whether a Finding Requires Data Correction, a Mapping Change or a Model Change (5,033 words)
- `096-how-we-prioritize-findings-by-business-impact-instead-of-error-count.md` — How We Prioritize Findings by Business Impact Instead of Error Count (4,868 words)
- `097-how-we-prevent-duplicate-findings-across-mock-loads-and-migration-waves.md` — How We Prevent Duplicate Findings Across Mock Loads and Migration Waves (4,403 words)
- `098-how-we-connect-findings-to-owners-without-building-another-workflow.md` — How We Connect Findings to Owners Without Building Another Workflow Engine (4,915 words)
- `099-how-we-prove-that-a-finding-is-actually-resolved.md` — How We Prove That a Finding Is Actually Resolved (5,120 words)
- `100-how-we-detect-when-evidence-has-become-stale.md` — How We Detect When Evidence Has Become Stale (4,650 words)
- `101-how-we-build-a-migration-readiness-view-that-does-not-hide-exceptions.md` — How We Build a Migration Readiness View That Does Not Hide Exceptions (5,170 words)
- `102-how-we-separate-technical-completeness-from-business-readiness.md` — How We Separate Technical Completeness from Business Readiness (4,684 words)
- `103-how-we-use-model-evidence-during-cutover-approval.md` — How We Use Model Evidence During Cutover Approval (4,187 words)
- `104-why-a-successfully-loaded-material-may-still-be-unusable.md` — Why a Successfully Loaded Material May Still Be Unusable (4,024 words)
- `105-how-we-detect-missing-material-extensions-before-cutover.md` — How We Detect Missing Material Extensions Before Cutover (4,068 words)
- `106-why-units-of-measure-are-one-of-the-most-dangerous-logistics-migration.md` — Why Units of Measure Are One of the Most Dangerous Logistics Migration Objects (4,397 words)
- `107-how-we-model-packaging-hierarchies-without-losing-logistics-meaning.md` — How We Model Packaging Hierarchies Without Losing Logistics Meaning (4,372 words)
- `108-why-s4-material-readiness-does-not-prove-ewm-readiness.md` — Why S/4 Material Readiness Does Not Prove EWM Readiness (4,350 words)
- `109-how-we-create-a-canonical-location-model-across-erp-ewm-tm-and-external.md` — How We Create a Canonical Location Model Across ERP, EWM, TM and External Carriers (4,722 words)
- `110-how-we-govern-lead-times-across-procurement-production-warehouse-and.md` — How We Govern Lead Times Across Procurement, Production, Warehouse and Transportation (4,677 words)
- `111-why-sap-data-programmes-pay-consultants-to-rediscover-the-same-knowledge.md` — Why SAP Data Programmes Pay Consultants to Rediscover the Same Knowledge (4,222 words)
- `112-how-a-canonical-data-and-interface-registry-reduces-change-impact.md` — How a Canonical Data and Interface Registry Reduces Change-Impact Consulting Costs (4,082 words)
- `113-why-mapping-workbooks-become-a-recurring-consulting-cost.md` — Why Mapping Workbooks Become a Recurring Consulting Cost (4,543 words)
- `114-how-much-does-a-green-dashboard-cost-when-every-team-rebuilds-the.md` — How Much Does a Green Dashboard Cost When Every Team Rebuilds the Evidence Behind It? (4,758 words)
- `115-why-consultant-turnover-makes-sap-programmes-pay-twice-for-the-same.md` — Why Consultant Turnover Makes SAP Programmes Pay Twice for the Same Knowledge (4,418 words)
- `116-where-martenweave-fits-in-logistics-managing-the-data-behind-operations.md` — Where Martenweave Fits in Logistics: Managing the Data Behind Operations (1,975 words)
- `117-logistics-problems-rarely-start-in-logistics.md` — Logistics Problems Rarely Start in Logistics (2,104 words)
- `118-sap-logistics-data-migration-problems-usually-appear-too-late.md` — SAP Logistics Data Migration Problems Usually Appear Too Late (2,254 words)
- `119-what-is-a-data-model-registry-a-practical-guide-for-managers.md` — What Is a Data Model Registry? A Practical Guide for Managers (2,979 words)
- `120-why-data-migration-projects-need-a-model-registry.md` — Why Data Migration Projects Need a Model Registry (2,584 words)
- `121-from-mapping-spreadsheet-to-governed-data-model.md` — From Mapping Spreadsheet to Governed Data Model (2,682 words)
- `122-data-lineage-vs-impact-analysis-why-seeing-the-flow-is-not-enough.md` — Data Lineage vs Impact Analysis: Why Seeing the Flow Is Not Enough (3,408 words)
- `123-data-quality-tools-vs-model-validation-clean-data-can-still-follow-the.md` — Data Quality Tools vs Model Validation: Clean Data Can Still Follow the Wrong Rules (3,501 words)
- `124-schema-registry-vs-model-registry-technical-compatibility-is-not.md` — Schema Registry vs Model Registry: Technical Compatibility Is Not Business Meaning (3,250 words)
- `125-why-sap-migration-teams-still-lose-control-even-with-the-right-tools.md` — Why SAP Migration Teams Still Lose Control Even with the Right Tools (3,212 words)
- `126-mapping-version-drift-why-sap-migration-teams-keep-reopening-the-same.md` — Mapping Version Drift: Why SAP Migration Teams Keep Reopening the Same Decisions (2,453 words)
- `127-sap-migration-tco-how-model-governance-reduces-rework-and-project-cost.md` — SAP Migration TCO: How Model Governance Reduces Rework and Project Cost (3,121 words)
- `128-why-martenweave-creates-more-value-across-a-programme-than-in-a-single.md` — Why Martenweave Creates More Value Across a Programme Than in a Single Project (2,807 words)
- `129-why-data-governance-frameworks-stay-on-paper-during-sap-programmes.md` — Why Data Governance Frameworks Stay on Paper During SAP Programmes (3,677 words)
- `130-why-dama-based-data-governance-fails-to-reach-sap-migration-teams.md` — Why DAMA-Based Data Governance Fails to Reach SAP Migration Teams (3,665 words)

## Validation results

All checks executed programmatically against the files on disk and `manifest.json`:

| Check | Result |
|---|---|
| Numbering 001–130 has no gaps | PASS |
| Every file begins with `# ` (single H1 title) | PASS |
| Filenames unique | PASS |
| Titles unique | PASS |
| No `:::writing` / `:::` block markers in any file | PASS |
| No ChatGPT interface text (ChatGPT/OpenAI/Copy code/Regenerate/etc.) | PASS |
| No internal citation artifacts (1,513 `filecite`/`cite`/`turn…file/view/search/academia` tokens removed; zero private-use Unicode chars remain) | PASS |
| No truncation signs (every file ends with sentence-final punctuation or a closed code fence) | PASS |
| All files valid UTF-8 | PASS |
| `manifest.json` count matches files on disk | PASS |
| `manifest.json` filenames match files on disk | PASS |
| `manifest.json` numbers sequential | PASS |
| `manifest.json` word counts match files | PASS |
| `manifest.json` titles match file H1s | PASS |

Shortest article: 13,427 chars (`117-logistics-problems-rarely-start-in-logistics.md`). Longest: 46,183 chars (`074-how-to-detect-orphaned-fields-rules-and-mappings.md`).

## Cleaning applied

- Removed ChatGPT `:::writing{variant="document" id="…"}` wrappers and closing `:::` fences.
- Removed Russian conversational preambles and post-article commentary surrounding the writing blocks (not part of the articles).
- Removed 1,513 internal ChatGPT citation tokens from 127 articles — `␡filecite␡turnNfileM␡Lx-Ly␡` (uploaded-file references) and `␡cite␡turnNviewM…␡` (web-view/search/academia references), all delimited by private-use Unicode characters U+E200–U+E202. These are internal conversation artifacts; the readable sentences and source descriptions around them were preserved untouched.
- No article text was shortened, summarised, reordered or invented; headings, lists, tables, calculations, examples and source/disclaimer sections preserved as exported.

## Content that could not be extracted reliably

None. All 135 standalone article blocks were well-formed (single writing block per message, H1 title present, clean closing fence, `finished_successfully` message status). No article required manual repair.

## Locality / publication safety

- `inbox/` added to `.gitignore` (`/inbox/`); previously absent. Verified with `git check-ignore`.
- Nothing committed or pushed. No website pages, layouts, collections, navigation or build configuration touched.
