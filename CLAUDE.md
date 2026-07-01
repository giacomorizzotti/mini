# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

"mini" — a minimal frontend framework (vanilla CSS + JS) plus a Vite demo/showcase app for its Vue port. Distributed by filesystem symlink to consuming projects, not as a published package: `css/` is consumed via Sass `loadPaths` (each project's own `vite.config.js` points at `/home/projects/mini/css/`), and the Vue component/composable library is consumed via a symlinked directory (see below). License/docs site: [mini.uwa.agency](https://mini.uwa.agency).

This is one of **four separate git repositories** that all live under this `mini/` path on disk — know which one you're actually in before editing:

| Path | Repo | Stack |
|---|---|---|
| `/home/projects/mini` (here) | this repo | vanilla CSS/JS + Vite demo app |
| `/home/projects/mini/vue/src/mini` | `mini_vue` (own GitHub remote) | Vue 3 components/composables |
| `/home/projects/mini/wp/mini-theme` | mini-theme | WordPress PHP theme |
| `/home/projects/mini/wp/mini-plugin` | mini-plugin | WordPress PHP plugin |

Each of the latter three has its own `CLAUDE.md` — read that one instead of this one if you're working inside it. `mini/vue` itself (the directory one level up from `mini/vue/src/mini`) is **not** its own repo — it's the Vite demo app, part of *this* repo, and just happens to symlink the separate `mini_vue` repo into its `src/mini`.

## Critical: other consumers may be invisible to you

Everything here is consumed by multiple separate projects (jpm, brff, and others), some of which may live on machines/servers you cannot see or grep from here. Before removing or renaming anything **pre-existing**, treat "no local consumers found" as inconclusive, not as license to delete — the cost of leaving something unused in place is near zero; the cost of silently breaking an invisible consumer is a hard-to-trace regression there. This doesn't apply to anything created fresh in the current session (no possible external consumer yet).

Also watch for **over-fitting to one consumer's domain model** — something can look generic while actually encoding one project's specific business conventions (field names, URL schemes, etc.). If it only makes sense given one project's rules, it belongs in that project, not here.

## Structure (this repo)

```
css/scss/      ~30 partials (_vars, _buttons, _colors, _typo, _forms, ...), entry point css/mini.scss
css/           compiled mini.css/.min.css + source maps (checked in)
js/            vanilla JS: mini.js (main utility lib), gdpr.js, slider.js, debug.js
img/           shared brand/icon assets, reused across consuming sites
vue/           Vite app — demo/showcase pages (Palette, Typography, Structure, Utilities, Login,
               UserProfile) for the mini_vue library symlinked in at vue/src/mini
wp/            parent directory for the two separate WP repos (mini-theme, mini-plugin) — see their own CLAUDE.md
one-page/      a single PHP page (index.php)
```

`api/` and `public/` also exist under this path but are themselves separate, unrelated git repos — not part of this one, not covered here.

## Two parallel implementations, one visual language

The vanilla `css/`+`js/mini.js` and the Vue component library (`vue/src/mini`) are **separate implementations of the same design system**, not one wrapping the other — `vue/src/mini`'s own README describes itself as "converted from the original mini.js utility library." Both consume the *same* `css/` (Sass `loadPaths`, or the compiled `mini.css` enqueued directly in WordPress). The split exists because the consumers need different paradigms:

- WordPress (`wp/mini-theme`, `wp/mini-plugin`) → vanilla `css/`/`js/mini.js`, server-rendered PHP.
- Vue SPAs (jpm, brff, the `vue/` demo app itself) → the `mini_vue` component/composable library.

Don't assume a fix in one automatically applies to the other — check whether the equivalent behavior needs porting to both.

## Commands (this repo, the `vue/` demo app)

```bash
cd vue && npm run dev      # demo/showcase app, also where mini_vue gets developed/previewed live
cd vue && npm run build
cd vue && npm run preview
```

There's no build step for `css/`/`js/` themselves beyond whatever Sass compilation the *consuming* project runs — this repo doesn't compile its own CSS via npm scripts (unlike `wp/mini-theme`, which does — see that repo's `CLAUDE.md`).
