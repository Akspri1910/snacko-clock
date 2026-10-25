# The Snacko’Clock

The Snacko’Clock café website: black-and-yellow branding, AI food photography, GSAP animation, an upcoming-location teaser, and an embedded Instagram wall.

**Live website:** https://snacko-clock-pune.berryisle32.chatgpt.site/

**Continuing with Claude? Read [CLAUDE.md](CLAUDE.md) first.** It records what has been built, brand decisions, verified business details, technical limitations, deployment notes, and future scope.

## Run locally

Node.js and npm are needed to rebuild. This workspace used Node.js 24.

```sh
npm ci
npm run build
npm test
```

Serve `dist/` with a static HTTP server. For example, with Python installed:

```sh
python -m http.server 8765 --directory dist
```

Open http://localhost:8765. On systems where Python is named `python3`, use that command instead.

The checked-in `dist/` is already runnable: no application server, database, environment variables, or API keys are required.

## Main files

| Path | Purpose |
| --- | --- |
| `dist/index.html` | All page sections and business content |
| `dist/premium.css` | Current black/yellow brand styling; the final brand system is near the end |
| `dist/style.css`, `dist/redesign.css` | Earlier layout foundations, still loaded before `premium.css` |
| `tailwind.css` | Tailwind v4 source and content scanning |
| `dist/styles.css` | Generated Tailwind output |
| `dist/app.js` | Menu category filters and footer year |
| `dist/motion.js` | GSAP entrance/scroll animation and pause control |
| `dist/assets/ai-*.webp` | Six temporary AI food photographs |
| `dist/vendor/` | Locally served GSAP and ScrollTrigger distributions |
| `build.cjs` | Compiles Tailwind and copies GSAP distributions |
| `check.cjs` | Small assert-based checks |
| `AI_FOOD_ASSETS.md` | AI asset filenames, generation prompts, and replacement notes |
| `.openai/hosting.json` | Identity and static directory for the existing Sites deployment |

## Important content notes

- Fountain Road is the **current** café location. The next location is **revealing soon**; a new address and opening date have not been announced.
- Food photographs are AI-generated previews until the owner supplies real photos. The site discloses this.
- Ordering links open Swiggy. There is no custom checkout or payment system.
- Instagram renders its own public profile wall and two selected reels. This is not a custom Instagram API integration.
- The website is public for friend/customer review. Pushing to this GitHub repository does not automatically update the existing Sites deployment.

See [CLAUDE.md](CLAUDE.md) for the full handoff and prioritized future scope.

## Menu and logo update — 25 October 2026

The owner supplied D:\Snacko Clock\photos. The full board menu is now in dist/index.html at #full-menu: 60 entries across 11 categories, including add-ons, with prices transcribed from the board and a link to its original photograph. See MENU_SOURCE.md. The header, footer, Instagram card and favicon now use assets/original-sign-logo.png, the exact supplied crop of the real sign photograph, with its existing background retained. It is not a vector or transparent original artwork. This supersedes the earlier missing-file and temporary-logo status above. Six AI food previews remain explicitly disclosed because no actual dish photography was supplied. Day/night stall photos remain in the story. Opening hours are intentionally unlisted at the owner’s request. The board birthday offer was not added.

## Current-menu and Puneri direction — 25 October 2026

The owner-designated online menu (https://thesnackoclock.inmyarea.in/) now supersedes the old board: 71 entries across 13 categories, including add-ons/charges and four combos. Full priced menu follows the hero, before mood/gallery and relocation content. Category anchors and persistent mobile menu/order actions avoid hidden content. Known AI food images are no longer rendered; six small images are from the ordering catalog and are labelled as such, without claiming verified real-serving photography. Light Hinglish/Puneri copy is limited to personality areas; item names and prices remain plain. MENU_SOURCE.md and menu-current.json record the source and manual update limit. Hours remain intentionally unlisted. Inspiration: direct menu/order hierarchy (The Halal Guys, Boom Boom Burger), playful brand voice (Phil’s Finest), restrained editorial spacing and clear categories (Ottolenghi). No third-party copy, logos, or food assets were taken from those inspiration sites.
