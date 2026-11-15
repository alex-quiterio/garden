# garden

A small personal site, grown as a pixel-art garden. It follows the sky over Amsterdam: a day/night toggle turns the sun into a moon, the season follows the date, and seasonal pixels (petals, pollen, leaves, snow) drift down the page.

Inspired by [francisco.garden](https://francisco.garden/).

## Run it

```sh
bun install
bun run web:dev      # http://localhost:3000
bun run web:build    # static files in dist/
```

`dist/` is plain static HTML, CSS and one script, so any static host works. Asset paths are relative, so it also works under a sub-path like `/garden/`.

## Deploy

Pushing to `main` runs `.github/workflows/pages.yml`: install, typecheck, lint, build, then publish `dist/` to GitHub Pages at https://alex-quiterio.github.io/garden/.

## Checks

```sh
bun run typecheck
bun run lint         # also enforces the layer dependency direction
```

## Shape

Layers depend inward only: `domain` ← `application` ← `infrastructure` ← `apps`. Imports use the `@domain/*`, `@application/*`, `@infrastructure/*` and `@apps/*` aliases.

| Layer | What lives there |
| --- | --- |
| `src/domain` | The profile model, the sky model (palettes, sun and moon position for any hour and season) and pixel helpers (dithering, ridges, sprites). No DOM. |
| `src/application` | `composePage`, the use case that turns a profile into the page. |
| `src/infrastructure` | The content (`content/alexProfile.ts`) and the HTML renderer. |
| `src/apps/web` | The build and dev scripts, the browser client (pixel scene, weather, toggle) and the CSS, split by concern. |

To change what the site says, edit `src/infrastructure/content/alexProfile.ts`.

## Notes

- Motion respects `prefers-reduced-motion`: the scene is drawn once and the toggle switches instantly.
- Headings use [Pixelify Sans](https://fonts.google.com/specimen/Pixelify+Sans) (SIL Open Font License), bundled in `src/apps/web/styles/fonts/` so the site makes no third-party requests.
