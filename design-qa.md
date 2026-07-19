# Homepage design QA — Model atlas

**Source visual truth:** locally generated candidate image from the design exploration (selected direction 2, Model atlas).

**Implementation:** `http://127.0.0.1:4267/`, captured in the Codex in-app browser after the homepage implementation.

**State and coverage:** Default desktop hero and 390 × 844 mobile hero, plus the desktop capacity scenario and the new desktop system-fit and AI-workflow sections. Primary navigation and both hero CTAs are present. Browser console: no errors. Mobile horizontal overflow: false. The scenario was changed to 10 people × 4 hours × €100; the live result updated to €192,000.

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

## Systems and AI-workflow extension

- **Full-view comparison evidence:** focused in-app browser captures at `http://127.0.0.1:4267/#fit` and `http://127.0.0.1:4267/#ai-workflow` retain the homepage's warm-paper, editorial-heading, ruled-grid visual language.
- **Focused region comparison evidence:** the four system cards and four AI steps were checked at desktop size. Their labelled number, headline, supporting copy, link destinations, borders, and final governance note are readable; browser console contained no errors.
- **Findings:** no actionable P0, P1, or P2 findings. The system-fit block states a supporting role rather than replacement claims. The AI block makes the human approval boundary explicit and does not suggest autonomous changes.

## Comparison history

1. Initial implementation exceeded the project's heading-size guardrail at desktop and mobile. The hero scale was reduced while preserving the selected composition.
2. Post-fix: `npm run test:render` passed; in-app browser checks confirmed no console errors and no mobile horizontal overflow.
3. Headline and capacity-scenario refinement: browser review confirmed the new hero hierarchy and an interactive €192,000 result for the altered inputs; no console errors. The render smoke check now asserts that the calculator controls and currency result exist.
4. Systems and AI-workflow extension: the system cards and AI steps were added to the existing atlas layout. Browser review confirmed four readable system cards and four readable workflow steps; render smoke now asserts both structures. No visual fixes were required after the first review.

## Follow-up polish

- Consider a future editorial illustration variation for campaign-specific pages; the homepage atlas asset is intentionally neutral and reusable.

final result: passed
