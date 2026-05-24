# lapinskim4.github.io

Landing page for public projects from [lapinskim4](https://github.com/lapinskim4).

Live at https://lapinskim4.github.io and https://seclayer.top (custom domain).

Built with vanilla HTML, CSS, and [three.js](https://threejs.org/). No build step, no framework, no tracking. Hosted on GitHub Pages.

## Highlights

- **Living favicon** — a small WebGL scene (icosahedron + starfield + iridescent shader) renders to a hidden canvas and pipes each frame into the `<link rel="icon">` via `toDataURL`. The favicon literally animates in your browser tab.
- **Cosmic backdrop** — a subtle full-viewport nebula shader sits behind the page, half-res and capped at 30 fps so it stays cheap.
- **Theme toggle** — manual dark/light switch with no-flash inline init and localStorage persistence. Falls back to system preference.
- **Accessibility** — animation respects `prefers-reduced-motion`. Tilt and crossfade effects are skipped on touch / reduced-motion devices.
- **CI** — every PR runs a link checker ([lychee](https://lychee.cli.rs)) and a Playwright smoke test that loads the page in headless Chromium and fails on JS errors.

## Repo layout

```
.
├── index.html          # the landing page (markup + inline three.js + theme/reveal logic)
├── style.css           # shared styles
├── CNAME               # custom domain
├── lychee.toml         # link-checker config
├── tests/
│   ├── package.json    # playwright dev dep
│   └── smoke.mjs       # headless-browser smoke test
└── .github/workflows/
    └── check.yml       # CI: link check + smoke test
```

## Run it locally

```bash
python3 -m http.server
# or
npx serve
```

Open http://localhost:8000.

## Fork it

The page is a working starter for a one-page personal site or project hub. Fork, swap the content in `index.html`, tweak the colors in `style.css`, push. GitHub Pages will serve it within minutes.

## License

MIT &mdash; see [LICENSE](LICENSE).
