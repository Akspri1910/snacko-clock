# Snacko’Clock — current handoff

Updated 25 October 2026. This file describes the current implementation and supersedes the historical iterations in Git history.

## Owner's direction

A café website that feels like an international food brand with a light Puneri voice. Black and yellow remain primary. Menu, mood, food and ordering must be easy to reach. Avoid confusing navigation, fake food presentation, invented business claims and a new logo design.

The owner supplied The Halal Guys, Boom Boom Burger, Phil's Finest and Ottolenghi as references. After the first adaptation was judged too superficial, the visual system was rebuilt: a yellow food-led hero, broad bold type mixed with italic serif, coral/sage/lilac craving panels, an editorial photographic story, a category-based menu, a relocation ticket and a compact three-column Instagram section. These are original compositions using design principles from the references, not copied logos, copy, images or page layouts.

## Current state

- Live: https://snacko-clock-pune.berryisle32.chatgpt.site/
- GitHub: https://github.com/Akspri1910/snacko-clock
- Sites project: appgprj_6adbabf3e8188191b13554c2f82c885e
- Audience: public, for customer/friend review. Preserve it.
- Static HTML/CSS/JS, Tailwind v4 and GSAP/ScrollTrigger. No framework migration is needed.

Page flow: navigation → hero → three craving choices → full menu → real stall story/Puneri paati → relocation teaser → Instagram profile and two reels → current-location directions/phone → footer.

## Design implementation

- Primary black #141411 and yellow #ffd521.
- Cream #f6f1e7, paper #fffdf7, coral #f47d61, lilac #d0c2ed, sage #d4dfbf.
- Bricolage Grotesque for broad display typography, DM Serif Display italic accents, DM Sans for body/UI.
- Header and mobile bottom actions make menu/order persistent. The mood is directly linked in both desktop and mobile headers.
- The three craving panels link into the corresponding menu category. All categories and 71 entries are in HTML.
- With JavaScript, Chaat is the default category; category links select one group, View everything shows all groups, and browser hash navigation stays synchronized. Without JavaScript, all groups remain visible.
- GSAP animates transforms only. No opacity-zero or clipping entrance states. Content survives a missed scroll trigger. Pause reverts animations and pauses the marquee. Reduced motion is respected.

## Menu and business facts

Owner-designated current menu: https://thesnackoclock.inmyarea.in/

Checked 25 October 2026: 71 entries across 13 categories, including add-ons/parcel charges and four combos. Oreo Shake is ₹100. This supersedes the older menu-board photo. `menu-current.json` preserves observed source names/prices/image URLs; normalized display names are in the HTML. `MENU_SOURCE.md` documents provenance. No live synchronization is configured; changes must be verified and updated manually.

Current location: Fountain Road, near Ganga Platino, EON Free Zone, Kharadi, Pune, Maharashtra 411014.
Phone: +91 84828 39332.

The owner explicitly asked to leave opening hours unlisted. Do not import hours from the ordering site. The move is planned, but no new address or date is announced. Do not invent a pin, date, countdown, ratings, reviews, partnerships or certifications.

All order CTAs open the owner's current online menu. This site has no custom checkout or payment flow.

## Assets

Owner files: D:\Snacko Clock\photos

- `dist/assets/original-sign-logo.png` is the exact supplied logo-crop.png photograph of the real sign, with its existing background. It is not a transparent vector original. Do not generate a replacement logo.
- `dist/assets/shop.webp` and `night.webp` are real supplied current-stall photos.
- Rendered food images are local copies from the owner's ordering catalog: menu-shevpuri.png.jpeg, menu-bombaysand.png.jpeg and menu-chocolatewaffles.png.jpeg. Their origin as actual café serving photography is unverified; the site labels them as ordering-menu images.
- Six old AI food images and the earlier generated logo remain unused historical assets; none is rendered. Do not reintroduce them without owner agreement.
- The original board photo is retained as a historical asset; current menu prices follow the online menu.

Actual food photography remains a launch-quality improvement. Use it when the owner provides it. Do not pass off stock/catalog/AI photos as verified real servings.

## Instagram

Public profile embed and the two requested reel embeds remain:
- https://www.instagram.com/the_snacko_clock/embed/
- https://www.instagram.com/reel/DWdOpyURX6C/embed/
- https://www.instagram.com/reel/Dd3vucxo1l-/embed/

This is a native embed wall, not an authenticated API integration. Instagram controls updates, playback and sign-in prompts. Direct links are provided. No Instagram token, OAuth app, feed subscription or scheduled sync exists.

## Files and workflow

`dist/index.html` is the canonical markup. `styles.css` holds all design rules. `tailwind.css` imports it and utilities; `build.cjs` produces `dist/styles.css` and copies GSAP. `dist/app.js` owns category selection; `dist/motion.js` owns motion.

```sh
npm ci
npm run build
npm test
python -m http.server 8765 --directory dist
```

Checks cover local links/assets, every current price, category selection/View everything/hash navigation, no hidden-content motion states, pause/resume, reduced-motion gating, all three embeds and SEO metadata. Browser viewport QA is separate from these assert-based tests.

The manifest declares static directory dist. Use the existing Sites source/credential workflow, package the exact pushed commit, save and deploy with the audience-appropriate flow. GitHub does not auto-deploy. Never commit credentials or tokens. Any hosting migration/custom domain requires a specific owner decision.

## Future scope and verification limits

1. Replace catalog images with real dish photos and obtain a clean original logo export.
2. Verify on physical iPhone/Android and Safari/Firefox; current browser viewport checks are not physical-device tests.
3. Measure mobile performance, especially the large sign photograph, fonts and Instagram embeds. Optimize based on evidence.
4. Confirm and announce the new location and hours only when supplied.
5. Verify social card rendering, search indexing and accessibility on actual devices. Metadata, canonical, Restaurant JSON-LD, robots and sitemap already exist.
6. Consider a structured menu editor or authorized Instagram API integration only if operational needs justify them. No CMS, analytics, customer review store or custom ordering backend is currently implemented.
