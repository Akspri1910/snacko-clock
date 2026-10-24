# Snacko’Clock — project handoff and future scope

Updated: 24 October 2026, India time. This file is a handoff for continuing the work with Claude or another developer. It records the current implementation rather than promising unbuilt features.

## 1. Owner’s objective

Build an attractive, premium food-brand website for The Snacko’Clock in Kharadi, Pune. The owner wants strong food presentation, visible but tasteful animation, a coherent colour flow, and Instagram content on the page. The café will move to a new location, with details to be revealed later.

The owner reviewed several iterations. The latest direction restores **black and yellow as the dominant brand colours**. An earlier green/gold treatment was rejected as drifting from the identity. Avoid reverting to that palette or treating premium as simply adding gold gradients.

## 2. Current website and access

- Live: https://snacko-clock-pune.berryisle32.chatgpt.site/
- Existing Sites project ID: `appgprj_6adbabf3e8188191b13554c2f82c885e`.
- The existing website was made public so the owner can share it with friends for feedback.
- This is a static site hosted through Sites, not a Next.js application or WordPress installation.
- This GitHub repository is for source sharing and continued development. It has no automatic deployment pipeline to the existing live site.

## 3. What has been completed

### Page and interactions

- Announcement strip linking to the next-location teaser.
- Sticky black navigation with logo and external ordering CTA.
- Food-led hero with oversized display typography, AI pani puri and sandwich imagery, and a clock-ring brand motif.
- Moving snack strip with a pause/play motion control.
- New-location section: “Same cravings. A new address.” and “Location under wraps”.
- Scroll-driven sandwich spotlight.
- Filterable menu: all cravings, chaat, cheesy bites, and sweet/cool items.
- Six illustrated menu items: pani puri, Bombay sandwich, veg cheese Maggi, peri peri cheese fries, chocolate waffle, and Blue Lagoon mojito.
- Current-location story with actual supplied café imagery.
- Native Instagram profile wall and two embedded reels, with direct-link fallbacks.
- Current-location directions, phone link, relocation reminder, and footer.

### Visual system

Current colour tokens and responsive layouts are in root `styles.css`:

| Role | Colour |
| --- | --- |
| Primary black | `#101010` |
| Charcoal shade | `#1c1c1a` |
| Primary yellow | `#ffd21c` |
| Butter-yellow tint | `#fff0ac` |
| Ivory | `#faf8ef` |
| Small coral accent | `#ef775d` |
| Small lilac accent | `#d1bff0` |
| Small sage accent | `#cdd9be` |

Section progression: black hero → yellow snack strip → butter-yellow relocation section → black food spotlight → ivory menu → lilac story → ivory Instagram section → yellow location CTA → black footer.

Anton is the current uppercase display typeface. DM Sans is used for body/UI text. Small handwritten accents remain. Fonts load once in the HTML. Root `styles.css` is imported by `tailwind.css` and compiled into the single local stylesheet `dist/styles.css`.

### Motion and accessibility

- GSAP and ScrollTrigger are installed through npm and copied into `dist/vendor/` at build time.
- Hero text/food entrance, slow clock-ring movement, food spotlight parallax, and small menu translations. No entrance or scroll tween sets opacity to zero or clips content away. Scroll tweens use immediateRender:false, so missed triggers leave visible content.
- The latest pass removed the more playful bounce and perpetual floating-food treatment.
- GSAP is gated by `prefers-reduced-motion: no-preference`.
- The pause control reverts GSAP animations and pauses the CSS snack strip; re-enabling starts them again.
- Visible focus styling, a skip link, image alt text, labelled iframes, and live menu-filter status are included.
- Essential content remains in the HTML if JavaScript fails.

## 4. Business facts and content boundaries

Current location:

> Fountain Road, near Ganga Platino, EON Free Zone, Kharadi, Pune, Maharashtra 411014.

Phone: `+91 84828 39332`.

The owner confirmed relocation is planned. **Do not publish a guessed new address, entrance pin, last-service date, opening date, countdown, seating capacity, sports partnership, or other unconfirmed details.** The site currently asks visitors to call before travelling and follow Instagram for the reveal.

No current hours or fixed food prices are advertised. The reviewer referenced photos/menu and photos/logo, but those folders were absent from both the local project and GitHub when checked. The owner was asked for their location and confirmed hours. Do not transcribe or invent menu prices until the actual board is available. Swiggy is used for current ordering prices/availability. The menu shown is a curated selection, not a verified complete current catalogue.

No fabricated ratings, customer counts, testimonials, awards, or health/quality claims were added.

## 5. Food assets and logo

The six current AI photographs are:

- `dist/assets/ai-puri.webp`
- `dist/assets/ai-sandwich.webp`
- `dist/assets/ai-maggi.webp`
- `dist/assets/ai-fries.webp`
- `dist/assets/ai-waffle.webp`
- `dist/assets/ai-drink.webp`

They were created with built-in ImageGen in a consistent warm editorial food-photography style. WebP copies total about 1.8 MB. The website explicitly calls them AI-generated previews. The owner plans to provide real photographs later. See `AI_FOOD_ASSETS.md` for the final prompt template and dish-specific prompts.

The logo at `dist/assets/brand-logo.png` was cleaned from the owner’s supplied opening poster using ImageGen. It is transparent, but some illustration details changed; it is **not pixel-identical** to the original brand artwork. Replace it with an owner-supplied original transparent PNG or SVG when available. Do not redesign the logo without being asked.

The real current-café photographs include `night.webp` and `shop.webp`. Several earlier unused image assets remain in the repository. `prepare_assets.py` is a historical local helper that expects files on the original Windows computer; it is not part of the build and is not needed to run the site.

## 6. Instagram integration

Profile: https://www.instagram.com/the_snacko_clock/

Native profile embed:

```text
https://www.instagram.com/the_snacko_clock/embed/
```

Selected reel embeds:

```text
https://www.instagram.com/reel/DWdOpyURX6C/embed/
https://www.instagram.com/reel/Dd3vucxo1l-/embed/
```

The second reel is a collaboration with `theframeoo` that was visible on Snacko’Clock’s profile. All three embeds were verified rendering in the local browser preview. The profile wall is requested directly from Instagram rather than being a copied local grid. Instagram controls which posts appear, caching/refresh timing, playback, sign-in prompts, and embed availability.

There are no stored Instagram tokens, no OAuth application, no scraping job, no feed-service subscription, and no scheduled sync. The native profile wall can reflect the profile’s current content without editing our HTML, but we do not control or guarantee refresh timing. Direct links remain visible if embeds are blocked. Do not call this an authenticated API feed.

## 7. Technical map and local workflow

Run:

```sh
npm ci
npm run build
npm test
python -m http.server 8765 --directory dist
```

Use `python3` instead of `python` where appropriate. Open http://localhost:8765. Any static HTTP server can replace the Python command.

- `build.cjs` runs the installed Tailwind CLI and copies GSAP distributions.
- `tailwind.css` declares theme tokens and scans `dist/index.html`.
- `dist/styles.css` is generated; edit the Tailwind source or markup and rebuild instead of hand-editing it.
- `dist/index.html` is the canonical page content. There is no separate HTML template generator.
- `dist/app.js` handles category filters and the year.
- `dist/motion.js` owns animation setup, motion preference handling, and pause/play.
- Stylesheet order is `tailwind.css` → `style.css` → `redesign.css` → `premium.css`.
- The latest black/yellow rules are near the end of `premium.css`. Older rules remain above them. Avoid adding another stylesheet just to override these again; consolidate carefully when changing the visual system.
- `dist/modern.css` is a leftover file and is not loaded by the current HTML.
- No application backend, database, custom checkout, form endpoint, analytics tracker, or feedback store exists.

The original workspace had a broken npm launcher in its PATH; invoking the installed npm CLI directly worked. This was a machine-specific issue, not a required project setup step. Standard `npm ci` is the intended portable workflow.

## 8. Validation already performed

- Tailwind build and JavaScript syntax checks.
- Assert-based tests for all four filters, local asset references, animation fallback, reduced-motion gating, pause/resume, three labelled lazy Instagram embeds, current-location labels, and AI image disclosure.
- Browser review at desktop 1280×900 and mobile 390×844 in the original workspace.
- Mobile horizontal-overflow checks and manual menu-filter checks.
- Native Instagram profile grid and both reels rendered in the browser.
- Successful Sites deployment of the final black/yellow revision.

`npm test` uses small mocks, not a real browser. It does not establish animation timing, contrast compliance, cross-browser compatibility, or end-to-end checkout functionality.

Not completed: comprehensive Safari/Firefox/older-browser tests, formal accessibility audit, measured Core Web Vitals, logged-out testing across multiple devices, SEO/search-index verification, and load testing. There is no custom checkout to load-test yet.

## 9. Deployment notes

The live Sites manifest is `.openai/hosting.json`; its static directory is `dist`. Preserve the existing project identity if continuing to publish to this same Site. A project ID is an identifier, not a credential.

Pushing to GitHub alone will not deploy the existing Site. Publishing through Sites requires its supported repository/source workflow and the caller’s authorized access. The website is now public, so a future publisher must inspect current access and use the appropriate public-site deployment flow rather than the earlier owner-private operation.

For another hosting provider, deploy the generated `dist/` directory after `npm run build`. No such migration or GitHub Pages setup has been done. Do not replace the current live URL or announce a custom domain as connected until it has actually been configured and verified.

Never put tokens, passwords, private access links, or account credentials into this repository, client-side JavaScript, or handoff documents.

## 10. Future scope, in priority order

### A. Finish real brand and business content

1. Replace the cleaned logo with the original brand PNG/SVG.
2. Replace AI photos with the owner’s actual food photography; retain filenames or update every reference, then remove AI labels only once all relevant images are real.
3. Confirm menu items, portion presentation, descriptions, prices, allergen information and operating hours before publishing them.
4. When authorized, reveal the new location, verified entrance/map pin, opening date, directions and any closure/transition details. Update the announcement, teaser, story, contact area and Instagram links consistently.
5. Continue visual polish based on actual friend/customer feedback, preserving black/yellow dominance and the current brand direction.

### B. Improve maintainability and verified quality

1. CSS consolidation is complete. Keep future changes in root styles.css and rebuild; assess unused image assets separately.
2. Add meaningful browser checks for menu filters, motion pause/reduced-motion behavior, anchor navigation and responsive layouts.
3. Measure mobile performance; tune image dimensions, font loading, animation costs and third-party embed loading based on evidence.
4. Test accessibility: keyboard order, focus visibility, contrast, small UI text, motion preferences and iframe behavior. Add automated checks only where they provide real coverage.
5. Test current Safari, Firefox and Chrome on physical mobile devices.

### C. Launch and discoverability

1. Choose and connect an owner-approved custom domain.
2. Canonical, robots.txt, sitemap.xml, Restaurant JSON-LD and social metadata are now included. The share image uses the real daylight stall photo; favicon uses the existing temporary logo pending the original. Verify social rendering and search indexing after launch.
3. Decide whether GitHub should become the primary source/deployment pipeline; configure CI/deployment only after choosing the host.
4. Add owner-approved privacy-aware analytics if there is a clear measurement goal.

### D. Add customer features only if requested

1. A real feedback form/store for collecting reviews from friends; currently reviews are sent directly to the owner.
2. A CMS or simple structured menu editor if the owner needs frequent changes without code.
3. A custom Instagram API feed only if native embeds prove insufficient; use an authorized professional-account connection, server-side secrets, and a documented refresh strategy.
4. Ordering, pickup scheduling, catering enquiries, newsletter updates or reservations only after actual operating requirements and service ownership are confirmed. Existing ordering remains an external Swiggy link.
5. A framework migration only when a concrete requirement justifies it. Tailwind and GSAP already work with the current static site.

## 11. Suggested first prompt for Claude

> Read README.md, CLAUDE.md and AI_FOOD_ASSETS.md, then inspect the actual HTML/CSS/JS. Run the build and tests before proposing changes. Preserve the black-and-yellow Snacko’Clock identity, the relocation teaser, current-location accuracy, AI image disclosure and Instagram embeds. Summarize the most valuable next step from the future-scope list and implement only the work I request. Do not invent business facts, redesign the logo, migrate frameworks, publish, or change site access without the relevant authorization.

## 12. Review follow-up: 24 October 2026

Completed: consolidated CSS, larger body text, tighter section spacing, a grid-based food spotlight, real daylight and night stall photos, persistent mobile call/directions buttons, visible-by-default animation, and SEO/share metadata. Build and assert checks pass, including a regression test that withholds scroll triggers and rejects hidden-content tween values. Mobile 390×844 fast-scroll review shows food cards and Instagram content.

Pending: original photos/logo and photos/menu files were not present in the accessible project or GitHub. Full menu/prices and original-logo replacement remain blocked on those files; hours await owner confirmation. Six AI food previews remain disclosed. Real-phone and Safari/Firefox testing have not been performed; browser viewport checks are not physical-device testing.
