# mini improvement plan

Open work across the mini repos, most important first, from a review of all of them on 2026-11-02. Remove items as they're done.

Before changing anything that already exists, read "other consumers may be invisible" in [CLAUDE.md](CLAUDE.md): a change here can reach projects that can't be searched from this machine.

## 1. Check after the 2026-11-02 changes

These changes are made. The projects that use mini haven't been checked for what they affect, because that work stayed inside this folder.

- **Lowercase size classes are gone.** `.xxs`, `.xs`, `.s`, `.l`, `.xl` and `.xxl` no longer set a size on text, form fields, chips or buttons. A project using them loses that size, and elements with `xl` or `xxl` were already being hidden below 1200px and 1920px. WordPress post content can use them too. Search each project:
  ```sh
  /usr/bin/grep -rnE "class=[\"']([^\"']* )?(xxs|xs|s|l|xl|xxl)[\"' ]" src/
  ```
  `Button`'s `size` prop isn't affected, because it always outputs the uppercase class.
- **`Box` and `Boxes` props now take effect.** `margin` was ignored and `:padding="0"` did nothing. A project passing either will see its layout change.
- **The `analytics` purpose now renders the Umami text.** Every site using `PrivacyPolicy.vue`'s default now discloses Umami on analytics.uwa.agency, whether or not it loads the script. A site without analytics should pass `purposes` explicitly.

## 2. Things that break or mislead

### Barrel imports fail without vue-i18n (`mini_vue`)
`composables/index.js` and `components/index.js` include `useLocale` and `LanguageSwitcher`. `useLocale.js` statically imports `vue-i18n` and `@/config/locale`, so importing either barrel fails the build in a project without them.

- **Fix:** give the locale code its own entry point and take it out of both barrels. First find out which projects import those names from the barrels, since this removes an export.
- **Check:** build a project without `vue-i18n` that imports both barrels.

### A fresh clone of the theme has no CSS or JS (`mini-theme`)
`css/mini.min.css` and `js/mini.js` are gitignored, no CDN default is set, and `js/slider.js` doesn't exist in the theme. With the CDN off, all of them 404. Existing local copies also fall behind without any warning.

- **Fix:** when the CDN is off and the local file is missing, fall back to the jsDelivr URL. The same resolution logic is repeated in `mini_css()`, `mini_js()`, `mini_slider()` and `mini_gwf_font_editor()`, so move it into one function first.
- **Check:** activate a clean clone with no CDN option saved.

### Version bumps don't clear browser caches (`mini-theme`)
Every asset's `?ver=` comes from `MINI_VERSION` (1.1.5), while `style.css` says 1.1.6.

- **Fix:** derive `MINI_VERSION` from `wp_get_theme( get_template() )->get( 'Version' )`. At the same time, update `Tested up to` and `Requires PHP` in `sass/style.scss` and `style.css`, which still say 5.4 and 5.6.
- **Check:** look at the `?ver=` in a page's source after a bump.

### Elements vanish at exact breakpoints (`mini`)
`@media (max-width: 768px)` and `@media (min-width: 768px)` both match at exactly 768px, so `.md-up` and `.md-down` are both hidden there. The same happens at 576, 992, 1200 and 1920px. The `.no-*` ranges overlap at those widths too, in the same way.

- **Fix:** make the `max-width` mixins and `respondContainerMax`/`respondContainerOnly` stop just below the breakpoint, for example `767.98px`. This changes behaviour only at those exact widths.
- **Check:** open the page in a browser at each exact width.

### `.top-shown` and `.scroll-hidden` never hide (`mini`)
`_show_hide.scss` targets `body.scroll`, but `mini.js` and `useScrollState` set `scrolled`.

- **Fix:** add `body.scrolled` to that rule and keep `body.scroll`.
- **Check:** scroll a page using both classes, in vanilla and in Vue.

## 3. Smaller fixes

- **`xl` means two things.** Box widths use 1400px (`_box.scss`, `boxWidth.js`) and everything else uses 1200px. Either make them match or record why they differ. Changing it moves layouts on every site between 1200px and 1400px.
- **`Boxes` `gap` prop.** `:gap="0"` is ignored, and the `025`, `075`, `10` and `20` classes can't be reached through it. This is the same bug `padding` and `margin` had.
- **`Button` `size` prop.** There's no `XXS`, so it falls back to regular size.
- **Policy links on the demo site.** The site uses hash routing, but the consent banner links to `/privacy-policy` and the API's privacy text links to `/cookie-policy/`. Pass `#/` URLs to `GDPR` in `App.vue`. For the API's link, switch the site to `createWebHistory` with a host rewrite.
- **Consent banner text.** In `GDPR.vue`, French and German say third-party analytics, while Italian and English say self-hosted. Align them with the Umami setup.
- **Umami wording.** The privacy text calls Umami "self-hosted". Review that wording for any site whose data controller isn't the one running analytics.uwa.agency.
- **Credits badge.** Restrict `?color=` to a real colour value and correct the comment above it, which overstates what the escaping prevents.
- **Override examples aren't in git (`mini-theme`).** `overrides/.gitignore` ignores the subfolders, so the examples in `parts/`, `styles/` and `templates/`, plus `QUICKSTART.md`, exist only on this disk, although the docs tell people to copy them. Add `!*/` and `!QUICKSTART.md` to that file.
- **`inc/post-types.php` (`mini-plugin`).** Nothing loads it. Delete it.
- **`Actions` (`mini_vue`).** It's the only component missing from the barrel. Add it once the barrels are fixed.
- **`CODE_REVIEW.md` (`mini-theme`).** Two small items are left. Delete the file once they're done.

## 4. Build and tooling

- **One command for the CSS.** The compile steps in `CLAUDE.md` are manual, which is how the compiled files once fell two months behind the SCSS. Add a small script with the versions pinned.
- **Sass versions.** Each Vue project compiles `mini.scss` with its own Sass, so a project on Sass 1.92+ may get a different rule order. Either pin it in those projects or remove the order dependence.
- **`@import`.** `mini.scss` uses `@import`, which Dart Sass has deprecated, and the build also warns about `mixed-decls`. Migrate to `@use` before Sass removes it.
- **`mini.min.css.map`.** It's stale. Regenerate it in the build script or delete it.
- **CSS size.** `mini.min.css` is 1.04 MB, about 88 KB gzipped, mostly from the colour, state and breakpoint loops. Find out which loops generate classes nobody uses.
- **Theme tooling.** `package.json` is still the Underscores boilerplate and uses `node-sass`, which is deprecated.
- **Tests.** None of these repos has any. The cheapest useful start is a CI build that imports both `mini_vue` barrels and a check that the compiled CSS matches the SCSS.
