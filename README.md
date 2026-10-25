# The Snacko’Clock

A static one-page website for The Snacko’Clock café, Kharadi, Pune: a time-aware clock hero, a veg / non-veg fork, a full menu, a Maharashtra chapter, Instagram embeds and the current-location details. No framework and no dependencies.

Live (old version until republished): https://snacko-clock-pune.berryisle32.chatgpt.site/
Source: https://github.com/Akspri1910/snacko-clock

**Continuing with Claude or another developer? Read [CLAUDE.md](CLAUDE.md) first, then [DESIGN_BRIEF.md](DESIGN_BRIEF.md).**

## Run

```sh
npm run build   # regenerates the menu and Maharashtra sections inside dist/index.html
npm test        # asserts menu data, links, facts, credits and the time-aware headline
```

Serve `dist/` with any static server, e.g. `npx http-server dist`. Node 18+ is the only requirement.

## Files

| Path | Purpose |
| --- | --- |
| `dist/index.html` | The page. Menu and Maharashtra sections sit between `<!--MENU:START-->` and `<!--MAHA:START-->` markers and are generated; edit everything else by hand. |
| `dist/site.css` | The only stylesheet (tokens at the top, sections in page order). |
| `dist/site.js` | Live clock, time-aware headline, veg/non-veg switch, menu rail, hover preview, chapter entrance. |
| `menu-data.json` | Source of truth for every dish and price. Edit this, then `npm run build`. |
| `gen-menu.cjs`, `gen-maha.cjs` | Generators for the two sections above. |
| `check.cjs` | Tests. |
| `dist/assets/` | Only images the page uses (real stall photos, catalogue menu photos, CC BY-SA food photos). |
| `NONVEG_MENU_DRAFT.md`, `MENU_SOURCE.md` | Where the menu came from and what is still unconfirmed. |

Local photo folders (`photos/`, `Photos-1-001/`) are git-ignored on purpose.
