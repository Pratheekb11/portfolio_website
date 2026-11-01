# Portfolio

Personal site for Pratheek B, AI Engineer.

Built with Next.js 16, Tailwind v4 and Motion. Fully static: no server,
no API routes, no database.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into out/
```

`npm run build` writes a static site to `out/`, which can be served from
any file host.

## Layout

```
src/
  app/          layout, global styles, page composition
  components/
    fx/         canvas and scroll effects (halftone, marquee, light band)
    hud/        the fixed header and telemetry bar
    sections/   one file per section of the page
    ui/         small shared pieces (counter, scramble, magnetic, index row)
  lib/
    data.ts     all copy and content, kept out of the components
    asset.ts    base-path aware public asset URLs
```

Content lives in `src/lib/data.ts`. Editing that file changes the site;
the components read from it and never hardcode copy.

## Design

Near-black ground, bone text, one hot orange accent. Archivo for display,
Space Grotesk for body and italics, JetBrains Mono for data and labels.
All tokens are defined at the top of `src/app/globals.css`.

The portrait is never shown as a photograph. `Halftone` renders it once to
a canvas as a grid: a square mosaic in the hero, a duotone halftone in the
skills section. It draws a single frame and then does nothing, so it costs
nothing while scrolling.

Motion is deliberately sparse. Reduced-motion preferences are respected
throughout, and animated scrolling measures within about 2ms per frame of
a fully static build.

## Deploying

GitHub Actions builds and publishes to GitHub Pages on every push
(`.github/workflows/deploy.yml`). Project sites are served from a
subdirectory, so the workflow passes `NEXT_PUBLIC_BASE_PATH=/<repo>` and
every public asset goes through `asset()` in `src/lib/asset.ts`.

To host at a domain root instead, drop that env var and the paths resolve
from `/`.
