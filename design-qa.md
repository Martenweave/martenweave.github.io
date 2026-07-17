# Homepage design QA — Model atlas

**Source visual truth:** `/Users/dzmitryikharlanau/.codex/generated_images/019f6c04-ff0c-7640-9688-b0193a474a74/exec-beb44061-881c-4b4a-9c45-c38ddc4fe15e.png` (selected direction 2, Model atlas).

**Implementation:** `http://127.0.0.1:4267/`, captured in the Codex in-app browser after the homepage implementation.

**State and coverage:** Default desktop hero and 390 × 844 mobile hero, plus the desktop capacity scenario. Primary navigation and both hero CTAs are present. Browser console: no errors. Mobile horizontal overflow: false. The scenario was changed to 10 people × 4 hours × €100; the live result updated to €192,000.

## Findings

- No actionable P0, P1, or P2 findings.
- The hero headline had become visually dominant in the first implementation. Its desktop size was reduced from 4.25rem to 3.85rem and its measure widened from 10.5ch to 14ch; the rendered result is a calmer four-line statement that leaves the atlas as an equal visual partner.
- Intentional adaptation: the source mock uses a full-width atlas; the implementation uses a dedicated generated atlas asset with readable HTML copy and real navigation/CTAs. This preserves the source hierarchy while retaining accessibility and the existing product routes.

## Fidelity surfaces

- **Fonts and typography:** Large, tightly tracked editorial headline with a calmer four-line desktop measure; monospaced provenance labels; mobile headline remains within the site's enforced readable scale.
- **Spacing and layout rhythm:** Asymmetric desktop hero with a generous evidence-map field; mobile resolves into a clear copy-first sequence.
- **Colors and visual tokens:** Warm paper, aubergine ink, soft lilac lines, and amber signals now form reusable site-wide tokens.
- **Image quality and asset fidelity:** The atlas is a generated raster asset, not CSS or inline-SVG artwork; it retains the selected map/lineage art direction.
- **Copy and content:** Existing factual product copy and links are preserved. The capacity calculator is explicitly an editable planning scenario, not a claimed or guaranteed saving.

## Comparison history

1. Initial implementation exceeded the project's heading-size guardrail at desktop and mobile. The hero scale was reduced while preserving the selected composition.
2. Post-fix: `npm run test:render` passed; in-app browser checks confirmed no console errors and no mobile horizontal overflow.
3. Headline and capacity-scenario refinement: browser review confirmed the new hero hierarchy and an interactive €192,000 result for the altered inputs; no console errors. The render smoke check now asserts that the calculator controls and currency result exist.

## Follow-up polish

- Consider a future editorial illustration variation for campaign-specific pages; the homepage atlas asset is intentionally neutral and reusable.

final result: passed
