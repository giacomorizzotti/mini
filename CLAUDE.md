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
css/scss/      36 partials (_vars, _buttons, _colors, _typo, _forms, _dark_mode, ...), entry point css/mini.scss
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

**New class names reach live sites with their own plugins and themes** (WordPress sites load `mini.css`, some straight from the dev CDN), so check a new name isn't one they already style. Tabs are `.tab-bar` (`_tabs.scss`), not `.tabs`, which WooCommerce and Foundation use.

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

Breakpoints are 576, 768, 992, 1200 and 1920px. A range includes its lower breakpoint and stops just below the upper one (max-width queries use 767.98px and so on), so at exactly 768px only the classes from 768px up apply. Each class also has a container-query version that measures the nearest `.contain` ancestor instead of the screen. Box widths (`box-*`, `_box.scss`, and `boxWidth.js` in mini_vue) use the same breakpoints; their `xl` tier started at 1400px until 2026-11-11. `--max-screen` (1400px) is a different thing: the container's maximum width.

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
  eye: a color can look fine and sit at 2:1. `css/build.sh` does it after
  every compile (`css/check-contrast.js`), in light and in dark mode.

### Dark mode (since 2026-11-12)

Opt-in: `.dark-mode` (always) or `.auto-dark-mode` (follows the system) on
mini's body, `body.mini` in WordPress or `body#mini` in the Vue projects
(mini_vue's `useTheme` and `ThemeSwitch` set it). Without either class a site
renders exactly as before. Everything is in `_dark_mode.scss`; the design
and its decisions are in [plans/DARK_MODE.md](plans/DARK_MODE.md).

- **The neutral scale swaps** (`--white` becomes the dark page, `--black`
  the light text, the greys in between), so whatever uses those tokens
  follows by itself.
- **Text on a colored fill** uses `--on-color` (white) or `--on-light-color`
  (dark), which don't swap. White text on a brand color or a colored bar is
  `var(--on-color)`, not `var(--white)`. As classes: `.on-color-text` and
  `.on-light-color-text`; `.black-text` is text on the page and turns light
  in dark mode.
- **Links in running text** (`p a`) are underlined in dark mode, where the
  link tints are too close to the body text for color alone (WCAG 1.4.1).
- **A color as text** reads `var(--<token>-on-dark, <its light value>)`:
  `color: var(--main-color-on-dark, var(--main-color))`. Only dark mode
  defines the `-on-dark` tokens. The color loops add the hook themselves.
- **Adding a color** to the maps means adding its `--<token>-on-dark` to
  `_dark_mode.scss` (and, for a light color, a deep fill): the checker's dark
  pass fails without it.
- **Light mode must not change**: every dark-mode hook falls back to today's
  value. Check by compiling before and after, resolving each `var()` to its
  light value, and comparing rule by rule.

`mini.scss` and some partials (`_accessibility`, `_animations`, `_basic`,
`_breakpoints`, `_colors`, `_debug`, `_flexboxes`, `_reset`, `_slides`,
`_typo`, `_vars`) use CRLF line endings; the others use LF. An editor keeps
them, but a script that reads and rewrites a file as text may silently
convert the whole file, and tools such as `sass-migrator` write their new
lines as LF.

## Compiling the CSS

The compiled files must be regenerated and committed with any SCSS change, because WordPress sites load them rather than the SCSS. One command does it, from anywhere:

```bash
css/build.sh
```

It compiles `mini.css` (Sass 1.91.0) and `mini.min.css` (clean-css 5.6.3) with their source maps, then runs `css/check-contrast.js`, which exits with an error when any generated color pair misses WCAG AA. The pinned versions reproduce the checked-in files byte for byte, and the build prints no warnings; keep it that way.

Vue projects don't use these files. They compile `mini.scss` themselves with their own Sass version (1.89 to 1.104 on this machine), so the SCSS must give the same CSS on every version: since 2026-11-11, 1.89.0, 1.91.0, 1.101.0 and 1.108.2 all produce identical output. Until then, 1.92+ placed a declaration written after a nested rule after that rule instead of before it (commit `4ebb13a`), which changed the button cascade in jpm and brff.

## SCSS modules

The SCSS uses the module system (`@use`/`@forward`, no `@import`) since 2026-11-11. When editing it:

- **`mini.scss` forwards every partial**, in the order its CSS must appear. That also passes their mixins, functions and variables on to projects that load mini with `@import 'mini'` or `@use 'mini'` (jpm's stylesheet uses `text-box-base`). Two names exist twice, so `mini.scss` hides the earlier one: `$breakpoints` from `_flexboxes` (`_box`'s wins) and `$colors` from `_buttons` (`_colors`' wins), which is what `@import` used to give.
- **A partial `@use`s what it uses**: `breakpoints` for its `sm`/`md`/... mixins, `inline_mixins` for `chip-base` and the like, `sass:map`/`sass:list`/`sass:string`/`sass:math` for built-in functions, which no longer exist as globals (`map.get`, not `map-get`).
- **`@extend` only reaches modules the extending partial loads**, unlike `@import`, where it reached the whole stylesheet. `_buttons` `@use`s `reset` so its buttons extend `_reset`'s `.btn::selection`, and `_colors` `@use`s `forms` for the chip inputs. Only `@use` a partial that `mini.scss` loads earlier, or its CSS moves. After adding an `@extend` of a selector in another partial, compare the compiled CSS: a missed one doesn't error, it just drops the selectors.
- **Declarations go before nested rules** in a block, or Sass 1.92+ outputs them in a different order (`mixed-decls`).
- **`@if` instead of the `if()` function**, which Sass 1.95+ deprecates and whose replacement older versions can't parse.
- **The header comment** sits at the top of `_reset.scss`: a loud comment above the first `@forward` in `mini.scss` would be repeated wherever another partial loads `_reset`.
- **Project settings** are the `!default` variables in `_settings.scss`, which `mini.scss` forwards first: `$color-names` (generate only these colors' classes) and `$standalone-color-buttons` (false: color button classes only set colors, so they need `btn` or a `<button>`). A project sets them with `@use "mini" with (...)`, or as variables before `@import "mini"`; the file shows both. Their defaults generate everything, so `mini.css` and `mini.min.css` don't depend on them; a new setting must default to the current output too.
- **Write color-independent rules once**: in a per-color loop, declarations that don't use the color go in a private placeholder (`%-name`, written after the loop) that each color `@extend`s, as the bubble positions do, instead of being repeated for all 53 colors. Names with a leading `-` are private, so projects that load mini don't see them (jpm's stylesheet has its own `$bubble-sizes`).

To check a change, compile before and after and compare the output; `@extend` changes may only reorder selectors inside a list, which doesn't matter.

## Commands (the `website/` app)

```bash
cd website && npm run dev      # demo/showcase app, also where mini_vue gets developed/previewed live
cd website && npm run build    # writes into dist/, which mini_website_deploy then commits and pushes
cd website && npm run preview
```

There are no unit tests. Two GitHub workflows run on every push since 2026-11-11: this repo's `.github/workflows/css.yml` runs `css/build.sh` and fails when the committed compiled files differ from what the SCSS gives or a color pair misses WCAG AA, and `mini_vue`'s builds both barrels without `vue-i18n` (see its `ci/`).
