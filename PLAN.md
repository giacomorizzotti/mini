# mini improvement plan

Open work across the mini repos, most important first, from a review of all of them on 2026-11-02. Remove items as they're done.

Before changing anything that already exists, read "other consumers may be invisible" in [CLAUDE.md](CLAUDE.md): a change here can reach projects that can't be searched from this machine.

## 1. Left over from the 2026-11-02 changes

The lowercase size classes have been gone from `main` since 2026-11-09, and the projects on this machine were switched to uppercase that day. Left:

- **WordPress post content** wasn't checked. To search a project:
  ```sh
  /usr/bin/grep -rnE "class=[\"']([^\"']* )?(xxs|xs|s|l|xl|xxl)[\"' ]" src/
  ```

## 2. Smaller fixes

- **`xl` means two things.** Box widths use 1400px (`_box.scss`, `boxWidth.js`) and everything else uses 1200px. Either make them match or record why they differ. Changing it moves layouts on every site between 1200px and 1400px.
- **Umami wording.** The privacy text and the consent banner (`GDPR.vue`, all four languages since 2026-11-11) call Umami "self-hosted". Review that wording for any site whose data controller isn't the one running analytics.uwa.agency.

## 3. Build and tooling

- **Sass versions.** Each Vue project compiles `mini.scss` with its own Sass, so a project on Sass 1.92+ may get a different rule order. Either pin it in those projects or remove the order dependence.
- **`@import`.** `mini.scss` uses `@import`, which Dart Sass has deprecated, and the build also warns about `mixed-decls`. Migrate to `@use` before Sass removes it.
- **CSS size.** `mini.min.css` is 1.04 MB, about 88 KB gzipped, mostly from the colour, state and breakpoint loops. Find out which loops generate classes nobody uses.
- **Theme tooling.** `package.json` is still the Underscores boilerplate and uses `node-sass`, which is deprecated.
- **Tests.** None of these repos has any. The cheapest useful start is a CI build that imports both `mini_vue` barrels and runs `css/build.sh`, failing when the compiled CSS differs from the checked-in files or a color pair misses WCAG AA.
