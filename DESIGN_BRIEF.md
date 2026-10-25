# Design brief: Snacko'Clock premium pass

From: UI/UX review, 25 October 2026. For: whoever builds the site next.
Status: the page works and is tidy, but it reads as a good template, not a premium, unique brand. Changing colours or fonts again will not fix that. The system underneath must change.

## What is going wrong (root causes, not symptoms)

1. **No typographic system.** Four unrelated families (Bricolage, DM Serif italic, DM Sans, Yatra One) with sizes picked per section. Every heading uses the same trick: bold sans, full stop, *italic serif word*. After three sections it is a formula, not a voice. Marathi is added as decoration in a different font and weight, so it never feels native.
2. **Flow is a stack of identical sections.** Eyebrow, big heading, content, repeat. Same density, same rhythm, no climax. The menu, the main reason people visit, is just another block.
3. **Animation is timid.** Tests forbid opacity and clip-path tweens, so motion is a ticker and light parallax. Nothing uses the brand's one real idea: the clock.
4. **Too many colours.** Black, yellow, cream, coral, lilac, sage, maroon, green, red. Coral, lilac and sage came from an earlier template and clash with the Paithani maroon.
5. **Two visual languages fight.** Hard offset shadows and sticker collage (street, loud) sit beside Paithani borders and heritage stamps (refined, warm). Premium needs one idea carried with restraint.
6. **Weak photography.** Stock and catalogue photos cap how premium the page can feel. No layout fixes that.

## Direction: "Puneri enamel signboard meets street counter"

Black ink, snack yellow, warm paper. Heritage in the details (Paithani maroon, Marathi lettering, stamps), never in the layout chrome.

### Typography
- One display voice with character. Suggested: **Fraunces** (soft, high contrast, food-friendly) at very large sizes with tight tracking, or a condensed grotesk if you want a street feel. Pick one and commit.
- Marathi display that matches it in weight and x-height (e.g. Tiro Devanagari Marathi for the serif route). Treat Marathi as a headline language, not a caption.
- Fluid type scale (ratio about 1.333), 3 sizes for display, 3 for text. Hero word 12–18vw. Small caps or tracked caps for labels. Tabular numbers for prices.
- Retire the "sans. *italic.*" headline formula. Vary: full serif, mixed script, one giant word, Marathi-first.

### Flow (story arc, not a list)
1. Hook: a full-bleed, near-black hero with the clock as the centrepiece and a time-aware headline.
2. Choose: Veg or Non-Veg as a big, tactile fork. This is the unique selling point, so give it a full screen.
3. Hero dishes: three full-bleed food moments, one per mood, with almost no text.
4. The menu: sticky category rail, large rows, hover photo preview, instant veg/non-veg switch.
5. Maharashtra and Pune: one calm, heritage-rich chapter with room to breathe.
6. Visit and new home: clear map, hours and one call to action.
- Alternate density: sparse, dense, sparse. Fewer elements per screen.

### Motion (signature: the clock)
- Clock hands that tick in the hero and sweep on scroll.
- Time-of-day mode: morning chai, 4 pm chaat, late-night maggi. Headline and featured dish change with the visitor's local time.
- A circular clip-path wipe between sections, like a clock hand sweeping.
- Veg/non-veg switch flips the whole theme (paper to ink) with a short transition.
- Menu rows: hover or tap shows a photo that follows the cursor. Magnetic buttons. Line-by-line text reveals.
- Always respect `prefers-reduced-motion`. Replace the "no opacity tweens" test with a test that content is visible after animations finish or when JS fails.

### Colour (roles, not decoration)
- Ink black about 60%, snack yellow about 25%, warm paper about 10%.
- One heritage accent: Paithani maroon, only for borders, stamps and Marathi moments.
- Green and red appear only as veg and non-veg marks.
- Delete coral, lilac and sage.

### Premium cues
- Whitespace and restraint beat more elements. Hairlines instead of heavy outlines. Soft, real shadows, not hard offset boxes.
- Consistent 8-pt spacing, 12-column grid, one corner radius.
- Real photography: brief a half-day shoot (top-down and 45-degree hero shots, steam, hands, the stall at night). Use the real logo.

## How to work (process feedback)
- Stop restyling the surface. First write design tokens (type scale, spacing, colour roles, radii, shadows) and a short component list, then build from them.
- Show a before/after for each issue above, with screenshots at desktop and 390 px wide.
- Prototype the hero and the veg/non-veg fork first and review them before building the rest.
- Consolidate the CSS into one tokenised file. No more override layers.
- Acceptance: each of the six problems above must visibly change. If a review round looks the same as the last one, the round failed.

## Facts to keep
Do not invent business facts: no hours, no new address, no opening date, no separate-kitchen claim. Non-veg dishes and prices are a draft until the owner confirms (see NONVEG_MENU_DRAFT.md). Keep photo credits for CC BY-SA images.
