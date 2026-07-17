# Homepage design QA — Model atlas

**Source visual truth:** `/Users/dzmitryikharlanau/.codex/generated_images/019f6c04-ff0c-7640-9688-b0193a474a74/exec-beb44061-881c-4b4a-9c45-c38ddc4fe15e.png` (selected direction 2, Model atlas).

**Implementation:** `http://127.0.0.1:4267/`, captured in the Codex in-app browser after the homepage implementation.

**State and coverage:** Default desktop hero and 390 × 844 mobile hero. Primary navigation and both hero CTAs are present. Browser console: no errors. Mobile horizontal overflow: false.

## Findings

- No actionable P0, P1, or P2 findings.
- Intentional adaptation: the source mock uses a full-width atlas; the implementation uses a dedicated generated atlas asset with readable HTML copy and real navigation/CTAs. This preserves the source hierarchy while retaining accessibility and the existing product routes.

## Fidelity surfaces

- **Fonts and typography:** Large, tightly tracked editorial headline; monospaced provenance labels; mobile headline remains within the site's enforced readable scale.
- **Spacing and layout rhythm:** Asymmetric desktop hero with a generous evidence-map field; mobile resolves into a clear copy-first sequence.
- **Colors and visual tokens:** Warm paper, aubergine ink, soft lilac lines, and amber signals now form reusable site-wide tokens.
- **Image quality and asset fidelity:** The atlas is a generated raster asset, not CSS or inline-SVG artwork; it retains the selected map/lineage art direction.
- **Copy and content:** Existing factual product copy and links are preserved. No invented metrics, customers, or platform claims.

## Comparison history

1. Initial implementation exceeded the project's heading-size guardrail at desktop and mobile. The hero scale was reduced while preserving the selected composition.
2. Post-fix: `npm run test:render` passed; in-app browser checks confirmed no console errors and no mobile horizontal overflow.

## Follow-up polish

- Consider a future editorial illustration variation for campaign-specific pages; the homepage atlas asset is intentionally neutral and reusable.

final result: passed
