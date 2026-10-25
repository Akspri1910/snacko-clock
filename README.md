# The Snacko’Clock

A static café website for Kharadi, Pune, using Tailwind v4, modern CSS and GSAP. Black/yellow branding, coral/sage/lilac craving panels, current priced menu, real stall photography, Instagram wall/reels, and a relocation teaser.

Live: https://snacko-clock-pune.berryisle32.chatgpt.site/
Source: https://github.com/Akspri1910/snacko-clock

## Run

```sh
npm ci
npm run build
npm test
python -m http.server 8765 --directory dist
```

Open http://localhost:8765. The checked-in dist directory also runs directly on any static HTTP server.

## Edit

- `dist/index.html`: canonical page content and all 71 menu entries.
- `styles.css`: the single canonical stylesheet; compiled through `tailwind.css` to `dist/styles.css`.
- `dist/app.js`: category selection, hash navigation, and footer year.
- `dist/motion.js`: GSAP entrance/scroll transforms and pause/reduced-motion handling.
- `menu-current.json` and `MENU_SOURCE.md`: observed online menu and provenance. Menu updates are manual.
- `check.cjs`: prices, category behavior, local assets, motion fallback and metadata checks.
- `.openai/hosting.json`: existing public Sites project; preserve its identity.

No application server, database, API keys or customer data store is required. GitHub pushes do not automatically deploy the existing Site.

## Content boundaries

Opening hours and the new address/date remain unannounced. The original sign photograph is used as the logo. Food imagery comes from the owner's ordering menu; its origin as actual serving photography is unverified. Known AI food assets remain in the repository as unused historical files and are not rendered. Real day/night stall photos appear in the story. Instagram uses native public embeds, with direct-link fallbacks.

Read CLAUDE.md before continuing the project.
