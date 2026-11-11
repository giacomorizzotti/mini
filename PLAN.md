# mini improvement plan

Open work across the mini repos, most important first, from a review of all of them on 2026-11-02. Remove items as they're done.

Before changing anything that already exists, read "other consumers may be invisible" in [CLAUDE.md](CLAUDE.md): a change here can reach projects that can't be searched from this machine.

## Build and tooling

- **Sass versions.** Each Vue project compiles `mini.scss` with its own Sass, so a project on Sass 1.92+ may get a different rule order. Either pin it in those projects or remove the order dependence.
- **`@import`.** `mini.scss` uses `@import`, which Dart Sass has deprecated, and the build also warns about `mixed-decls`. Migrate to `@use` before Sass removes it.
- **CSS size.** `mini.min.css` is 1.04 MB, about 88 KB gzipped, mostly from the colour, state and breakpoint loops. Find out which loops generate classes nobody uses.
- **Theme tooling.** `package.json` is still the Underscores boilerplate and uses `node-sass`, which is deprecated.
- **Tests.** None of these repos has any. The cheapest useful start is a CI build that imports both `mini_vue` barrels and runs `css/build.sh`, failing when the compiled CSS differs from the checked-in files or a color pair misses WCAG AA.
