# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

"mini" — a minimal frontend framework: SCSS, compiled CSS, vanilla JS and shared images. It's distributed by filesystem symlink and CDN, not as a published package: Vue projects consume `css/` through Sass `loadPaths` (each project's own `vite.config.js` points at `/home/projects/mini/css/`), and WordPress sites load the compiled `mini.min.css`. License/docs site: [mini.uwa.agency](https://mini.uwa.agency). Open work is listed in [PLAN.md](PLAN.md).

Six git repositories and one unversioned folder live under this `mini/` path on disk — know which one you're actually in before editing:

| Path | Repo | What it is | How a change goes live |
|---|---|---|---|
| `/home/projects/mini` (here) | `mini` (public on GitHub) | SCSS, compiled CSS, vanilla JS, images | Pushing `main` for sites on jsDelivr `@main`; saving a file for sites on the dev CDN, which serves this folder from disk; the next build for Vue projects |
| `website/src/mini` | `mini_vue` (GitHub) | Vue 3 components and composables | Each project's next build, through its symlink |
| `wp/mini-theme` | `mini-wp-theme` (GitHub) | WordPress parent theme | Saving a file, through symlinks in the WordPress installs |
| `wp/mini-plugin` | `mini-wp-plugin` (GitHub) | WordPress plugin | Saving a file, through symlinks in the WordPress installs |
| `api` | Deploy repo, its remote is the live server | Legal text and credits badge, in PHP | `mini_api_deploy` pushes, and the push is the deploy |
| `website/dist` | Deploy repo, its remote is the live server | The built mini.uwa.agency | `mini_website_deploy` builds, commits and pushes |
| `website` | None, deliberately | Vite app | Builds into `website/dist` |

`mini_vue`, the theme, the plugin and `api` each have their own `CLAUDE.md` — read that one instead of this one if you're working inside it. `mini_website_deploy` and `mini_api_deploy` are functions in `~/.bash_aliases`.

`website/` isn't versioned on purpose: it's a container for developing `mini_vue` and building mini's website, and `dist/` is the part that matters. `website/src/mini` is a real clone of `mini_vue`, and other projects symlink to it. The pages in `website/src/pages` are the public docs for the CSS classes, so update them when classes change.

The root `.gitignore` excludes `api/`, `website/` and `wp/`, so a search tool that honours `.gitignore` silently skips them when run from here. Search from inside the folder you care about, or turn ignore files off.

## Critical: other consumers may be invisible to you

Everything here is consumed by multiple separate projects (jpm, brff, and others), some of which may live on machines/servers you cannot see or grep from here. Before removing or renaming anything **pre-existing**, treat "no local consumers found" as inconclusive, not as license to delete — the cost of leaving something unused in place is near zero; the cost of silently breaking an invisible consumer is a hard-to-trace regression there. This doesn't apply to anything created fresh in the current session (no possible external consumer yet).

Also watch for **over-fitting to one consumer's domain model** — something can look generic while actually encoding one project's specific business conventions (field names, URL schemes, etc.). If it only makes sense given one project's rules, it belongs in that project, not here.

## Structure (this repo)

```
css/scss/      33 partials (_vars, _buttons, _colors, _typo, _forms, ...), entry point css/mini.scss
css/           compiled mini.css/.min.css + source maps (checked in, see "Compiling the CSS")
js/            vanilla JS: mini.js (main utility lib), gdpr.js, slider.js, debug.js
img/           shared brand/icon assets, reused across consuming sites
one-page/      a single PHP page template (index.php)
```

The `img/<client>/` folders listed in `.gitignore` exist only on disk, but they still reach mini.uwa.agency through the `website/public/img` symlink. The API's credits badge loads `img/uwa/brand/uwa_logo.svg` from there.

## Two parallel implementations, one visual language

The vanilla `css/`+`js/mini.js` and the Vue component library (`website/src/mini`) are **separate implementations of the same design system**, not one wrapping the other. Both consume the *same* `css/` (Sass `loadPaths`, or the compiled `mini.css` enqueued directly in WordPress). The split exists because the consumers need different paradigms:

- WordPress (`wp/mini-theme`, `wp/mini-plugin`) → vanilla `css/`/`js/mini.js`, server-rendered PHP.
- Vue SPAs (jpm, brff, the `website/` demo app itself) → the `mini_vue` component/composable library.

Don't assume a fix in one automatically applies to the other — check whether the equivalent behavior needs porting to both.

## CSS class conventions

**Size classes are uppercase only:** `XXS`, `XS`, `S`, `L`, `XL`, `XXL`, on text, form fields, chips and buttons. Don't add lowercase aliases: lowercase `xl` and `xxl` are visibility classes, so an alias would hide the element it's meant to resize.

**Visibility classes**, all using `display: none !important`:

| Class | Hidden |
|---|---|
| `no-sm` | up to 576px |
| `no-md` | 576px to 768px |
| `no-lg` | 768px to 992px |
| `no-xl` | 992px to 1200px |
| `no-xxl` | 1200px to 1920px |
| `no-xxxl` | from 1920px |
| `sm-up` / `sm`, `md-up` / `md`, `lg-up` / `lg`, `xl-up` / `xl`, `xxl-up` / `xxl` | below that breakpoint |
| `sm-down`, `md-down`, `lg-down`, `xl-down`, `xxl-down` | from that breakpoint up |

Breakpoints are 576, 768, 992, 1200 and 1920px. A range includes its lower breakpoint and stops just below the upper one (max-width queries use 767.98px and so on), so at exactly 768px only the classes from 768px up apply. Each class also has a container-query version that measures the nearest `.contain` ancestor instead of the screen. Box widths (`box-*`, `_box.scss`) are the exception: their `xl` tier starts at 1400px.

## Colors and contrast (WCAG AA)

Since 2026-11-11 every pair the color maps generate reaches 4.5:1 for text,
and 3:1 for form field outlines. Keep it that way when adding or changing
a color:

- **Greys:** `--muted` (and anything darker) is for text. `--light-grey` is
  for lines, borders and surfaces only; `.light-grey-text` exists for dark
  backgrounds. Form fields use `--field-border-color`.
- **Light colors** (the status colors, `third-color`, `light-blue`,
  `acid-green`, `mini-third`, `uwa-third`) keep their pastel fill with dark
  text on it. Each names a darker shade (`--success-dark`,
  `--uwa-third-color-text`, ...), used for its `-text` classes, its inverted
  boxes, chips and flags, and its invert buttons.
- That's done through optional trailing values in the maps: a 4th value in
  `_colors.scss` (the readable shade; its swapped variants then stay white
  instead of swapping to the text color) and a 5th and 6th in
  `_buttons.scss` (the invert variant's text, and the text over the
  hover/active color). Entries without them behave as before.
- Check any change by computing each generated pair's contrast ratio, not by
  eye: a color can look fine and sit at 2:1.
- An opt-in dark mode is designed, decisions included, in
  [plans/DARK_MODE.md](plans/DARK_MODE.md); it's not built yet.

Some partials (`_vars`, `_colors`, `_typo`, `_accessibility`) use CRLF line
endings. An editor keeps them, but a script that reads and rewrites a file
as text may silently convert the whole file to LF.

## Compiling the CSS

The compiled files must be regenerated and committed with any SCSS change, because WordPress sites load them rather than the SCSS. There's no npm script for this; run from `css/`:

```bash
npx -y sass@1.91.0 --quiet-deps mini.scss mini.css
npx -y -p clean-css-cli@5.6.3 cleancss -o mini.min.css mini.css
```

These versions reproduce the checked-in files byte for byte. Don't use a newer Sass without checking the output: commit `4ebb13a` records that Sass 1.92+ reorders nested rules. `mini.min.css.map` is stale and nothing references it.

Vue projects don't use these files. They compile `mini.scss` themselves with their own Sass version.

## Commands (the `website/` app)

```bash
cd website && npm run dev      # demo/showcase app, also where mini_vue gets developed/previewed live
cd website && npm run build    # writes into dist/, which mini_website_deploy then commits and pushes
cd website && npm run preview
```

There are no automated tests in any of these repos.
