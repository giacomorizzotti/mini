# mini improvement plan

Open work across the mini repos, most important first, from a review of all of them on 2026-11-02. Remove items as they're done.

Before changing anything that already exists, read "other consumers may be invisible" in [CLAUDE.md](CLAUDE.md): a change here can reach projects that can't be searched from this machine.

## Build and tooling

- **CSS size.** `mini.min.css` is 969 KB, 86 KB gzipped (2026-11-11). Each color is part of every class name, so each of the 53 colors costs about 12 KB (7 KB for the `-dark` ones, which have no buttons), and every button rule lists all 380 color button classes through `@extend`, so that `class="blue-btn"` works without `btn`: 178 KB, 21 KB gzipped. Vue projects can leave out either with the settings in `css/scss/_settings.scss`; jpm would first need `btn` on its 2 `<span>`s with a color button class. For the file WordPress loads, two candidates have no use on this machine outside mini's own docs pages, and removing both brings it to 745 KB, 67 KB gzipped:
  - the `-btn-inv`, `-btn-negative` and `-btn-neg` aliases of `-btn-invert` (54 uses), 59 KB minified, 8 KB gzipped;
  - 16 colors: `gingerbread`, `light-blue`, `jpm-second`, `mini-second`, `mini-third`, `mini-fourth`, `uwa-third`, `uwa-fourth`, `uwa-link`, and `jpm-dark`, `jpm-second-dark`, `main-color-dark`, `mini-dark`, `mini-second-dark`, `mini-third-dark`, `mini-fourth-dark`; 181 KB minified, 14 KB gzipped.

  Both are breaking for any site that uses them, including ones not on this machine and WordPress post content, so it needs a decision; a removal also means a note in the docs and on the Palette page. A smaller one with no local use: `-btn-clicked` (check `mini.js` first).
