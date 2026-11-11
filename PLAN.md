# mini improvement plan

Open work across the mini repos, most important first, from a review of all of them on 2026-11-02. Remove items as they're done.

Before changing anything that already exists, read "other consumers may be invisible" in [CLAUDE.md](CLAUDE.md): a change here can reach projects that can't be searched from this machine.

## Build and tooling

- **CSS size.** `mini.min.css` is 1,027 KB, 85 KB gzipped. Measured 2026-11-11 from the source map: `_buttons` makes 37% of it and `_colors` 34%, because each of the 53 colors costs 25-28 KB (10 KB for the `-dark` ones), and every `.btn` rule carries all their button selectors through `@extend`. Two candidates have no use on this machine outside mini's own docs pages, and removing both brings it to 788 KB, 67 KB gzipped:
  - the `-btn-inv`, `-btn-negative` and `-btn-neg` aliases of `-btn-invert` (54 uses), 55 KB minified, 7 KB gzipped;
  - 16 colors: `gingerbread`, `light-blue`, `jpm-second`, `mini-second`, `mini-third`, `mini-fourth`, `uwa-third`, `uwa-fourth`, `uwa-link`, and `jpm-dark`, `jpm-second-dark`, `main-color-dark`, `mini-dark`, `mini-second-dark`, `mini-third-dark`, `mini-fourth-dark`; 199 KB minified, 13 KB gzipped.

  Both are breaking for any site that uses them, including ones not on this machine and WordPress post content, so it needs a decision; a removal also means a note in the docs and on the Palette page. Smaller ones with no local use: `-btn-clicked` (check `mini.js` first) and the large bubbles (`-bubble-l`).
- **Theme tooling.** `package.json` is still the Underscores boilerplate and uses `node-sass`, which is deprecated.
- **Tests.** None of these repos has any. The cheapest useful start is a CI build that imports both `mini_vue` barrels and runs `css/build.sh`, failing when the compiled CSS differs from the checked-in files or a color pair misses WCAG AA.
