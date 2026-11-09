# mini improvement plan

Open work across the mini repos, most important first, from a review of all of them on 2026-11-02. Remove items as they're done.

Before changing anything that already exists, read "other consumers may be invisible" in [CLAUDE.md](CLAUDE.md): a change here can reach projects that can't be searched from this machine.

## 1. Before pushing the root repo

The 2026-11-02 commit removed the lowercase size classes, and it isn't on GitHub yet. Every project on this machine was checked on 2026-11-09.

- **Lowercase size classes are still used by several sites.** Sites loading `mini.min.css` from jsDelivr `@main` lose those sizes when `main` is pushed, sites on the dev CDN have lost them already, and Vue projects lose them on their next build. In each project, change `s`, `xs`, `xxs` and `l` to uppercase, which works with the old CSS and the new. Decide `xl` and `xxl` element by element: the lowercase class also hides the element below 1200px or 1920px, and the uppercase one doesn't. WordPress post content wasn't checked. To search a project:
  ```sh
  /usr/bin/grep -rnE "class=[\"']([^\"']* )?(xxs|xs|s|l|xl|xxl)[\"' ]" src/
  ```
- **Sites relying on `PrivacyPolicy.vue`'s default `purposes`** now disclose Umami. Two of them don't load Umami and should pass `purposes` explicitly.

The `Box`/`Boxes` change affects nothing found: no project passes `margin` or a bound `padding`.

## 2. Smaller fixes

- **`xl` means two things.** Box widths use 1400px (`_box.scss`, `boxWidth.js`) and everything else uses 1200px. Either make them match or record why they differ. Changing it moves layouts on every site between 1200px and 1400px.
- **`Boxes` `gap` prop.** `:gap="0"` is ignored, and the `025`, `075`, `10` and `20` classes can't be reached through it. This is the same bug `padding` and `margin` had. Keep the string `gap="0"` working: projects use it about 70 times.
- **`Button` `size` prop.** There's no `XXS`, so it falls back to regular size.
- **Policy links on the demo site.** The site uses hash routing, but the consent banner links to `/privacy-policy` and the API's privacy text links to `/cookie-policy/`. Pass `#/` URLs to `GDPR` in `App.vue`. For the API's link, switch the site to `createWebHistory` with a host rewrite.
- **Consent banner text.** In `GDPR.vue`, French and German say third-party analytics, while Italian and English say self-hosted. Align them with the Umami setup.
- **Umami wording.** The privacy text calls Umami "self-hosted". Review that wording for any site whose data controller isn't the one running analytics.uwa.agency.
- **Credits badge.** Restrict `?color=` to a real colour value and correct the comment above it, which overstates what the escaping prevents.
- **Override examples aren't in git (`mini-theme`).** `overrides/.gitignore` ignores the subfolders, so the examples in `parts/`, `styles/` and `templates/`, plus `QUICKSTART.md`, exist only on this disk, although the docs tell people to copy them. Add `!*/` and `!QUICKSTART.md` to that file.
- **`inc/post-types.php` (`mini-plugin`).** Nothing loads it. Delete it.
- **`CODE_REVIEW.md` (`mini-theme`).** Two small items are left. Delete the file once they're done.

## 3. Build and tooling

- **One command for the CSS.** The compile steps in `CLAUDE.md` are manual, which is how the compiled files once fell two months behind the SCSS. Add a small script with the versions pinned.
- **Sass versions.** Each Vue project compiles `mini.scss` with its own Sass, so a project on Sass 1.92+ may get a different rule order. Either pin it in those projects or remove the order dependence.
- **`@import`.** `mini.scss` uses `@import`, which Dart Sass has deprecated, and the build also warns about `mixed-decls`. Migrate to `@use` before Sass removes it.
- **`mini.min.css.map`.** It's stale. Regenerate it in the build script or delete it.
- **CSS size.** `mini.min.css` is 1.04 MB, about 88 KB gzipped, mostly from the colour, state and breakpoint loops. Find out which loops generate classes nobody uses.
- **Theme tooling.** `package.json` is still the Underscores boilerplate and uses `node-sass`, which is deprecated.
- **Tests.** None of these repos has any. The cheapest useful start is a CI build that imports both `mini_vue` barrels and a check that the compiled CSS matches the SCSS.
