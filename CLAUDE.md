# Snacko’Clock: project handoff

Updated 25 October 2026. Describes the current code, not promises. Read README.md and DESIGN_BRIEF.md too.

## Goal
A premium, unique site for a Kharadi, Pune café that is relaunching bigger, with a **Veg / Non-Veg split** as its main idea, a Pune/Maharashtra identity (Marathi lettering, Paithani borders, Shaniwar Wada gate, pheta, ink stamps) and the clock as the brand's signature motion. Palette: ink black, snack yellow, warm paper, one maroon heritage accent; green and red only as veg / non-veg marks. Do not drift back to coral/lilac/sage or a "sans. *italic.*" headline formula.

## Page flow
Hero (live analogue clock, headline follows the visitor's hour: Chai / Chaat / Snack / Maggi / Craving o’clock) → Veg / Non-Veg fork → menu (side switch flips paper/ink theme) → Maharashtra chapter → the mood (stall photos, Puneri paati) → new-home teaser → Instagram → current location → footer. Mobile has a fixed Menu / Order bar.

## Facts and boundaries
- Current location: Fountain Road, near Ganga Platino, EON Free Zone, Kharadi, Pune 411014. Phone +91 84828 39332.
- The café is moving. **No new address, opening date, opening hours, seating, separate-kitchen or hygiene claim has been confirmed. Do not invent them.** Ordering is an external link to https://thesnackoclock.inmyarea.in/ (no checkout in this site).
- Veg menu: 71 entries from that online menu (checked 25 Oct 2026; see MENU_SOURCE.md). **Non-veg menu: 33 dishes with prices proposed by Claude, not owner-confirmed** (NONVEG_MENU_DRAFT.md). Egg is labelled non-veg.
- Maharashtra regional dishes are cultural inspiration, not the menu; the page says so.
- Food photos: veg category photos are catalogue images from the ordering menu; chicken tikka, misal pav and vada pav are illustrative CC BY-SA 4.0 Wikimedia Commons photos with credits in the footer. Replace with the owner's real photography when available. The logo mark in the header is a drawn clock; the real sign logo (`assets/original-sign-logo.png`) is only the favicon. A clean transparent original logo is still wanted.
- Shivaji Maharaj's image is deliberately not used.
- Marathi copy was written by Claude and has not had a native-speaker read.

## Workflow
`menu-data.json` → `npm run build` → `dist/index.html` (menu and Maharashtra sections regenerate) → `npm test`. Tests check dish/price parity, link targets, unique ids, facts, credits, the no-JS visibility of animated art, and the hour-to-headline mapping. They do not measure animation timing, contrast, performance or real-device behaviour.

## Deployment
GitHub has no automatic deploy. The live site was published through Sites (`.openai/hosting.json`, static dir `dist`); pushing does not update it. Do not claim a custom domain or deploy until it is done and verified. Never put tokens or credentials in the repo.

## Not done
Real-phone testing, Safari/Firefox checks, accessibility audit (contrast, keyboard order), Core Web Vitals (grain overlay, blur and large SVG shadows may be heavy on old phones), owner photography and logo, non-veg price confirmation, native Marathi proofread, the circular clock-hand section wipe from DESIGN_BRIEF.md, menu hover photos for non-veg, analytics, a deploy pipeline.

## Next priorities
1. Owner confirms non-veg dishes/prices and supplies real photos and the original logo.
2. Test on real phones; trim effects if slow.
3. Reveal the new location and update the teaser, visit section, schema and Instagram links together.
4. Choose a host and custom domain, then add CI deploy.
