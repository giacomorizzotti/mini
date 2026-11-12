# Dark mode for mini (and jpm)

Status: **phases 1 and 2 built** on 2026-11-12 (`css/scss/_dark_mode.scss`,
mini_vue's `useTheme` and `ThemeSwitch`, a demo on mini.uwa.agency). jpm
(phase 3) is next. Built differently from the text below:

- **Activation** is `body:where(.mini, #mini)`, since the Vue projects mark
  the body with `id="mini"`, not the class. `:where()` adds no specificity,
  so high contrast still wins.
- **One hook family**, `--<token>-on-dark` (`--main-color-on-dark`,
  `--success-on-dark`), instead of `--<name>-text` and `--<name>-on`: the
  same shade serves as text on the page, in the swapped variants and invert
  buttons, and as the text on a light color's deep fill. Named after the
  color token, so aliases (`col`, `color`, `main-color`) share one.
  `--uwa-third-color-text` therefore keeps its name.
- **Code blocks** (`pre`, `code`) stay dark, a raised dark surface, instead
  of swapping to light.
- **The cookie banner** keeps the light theme inside it (white text and
  buttons on gingerbread).

## Goal

An opt-in dark theme in mini, with jpm as its first user. Light mode must
render exactly as it does today, on every site, including the ones that
never opt in.

## Why it isn't a few token overrides

- mini has no "page background" or "body text" tokens. Body text is
  `var(--black)`, surfaces use `var(--white)` directly (about 65 places in
  the partials), and the color maps generate classes named after literal
  colors: `.white-box`, `.grey-text`, `.black-text`.
- jpm uses those neutral classes about 430 times: `grey-text` 261,
  `light-grey-text` 64, `black-text` 46, `white-box`/`white-bg` 42,
  `false-white-*` 20. Its styles add about 120 `var(--grey)`-style
  references and 98 hardcoded colors.
- Brand colors as text fail on a dark page: `--main-color` 2.5:1,
  `--second-color` 3.0:1, `--link-color` 3.75:1, jpm's purple 2.8:1, jpm's
  task red 3.3:1. The pastel status colors pass as text on dark (7-9:1).

## Proposed approach: invert the neutral scale, pin "text on a fill"

### 1. Activation (opt-in, like high contrast)

- `body.mini.dark-mode`: always dark.
- `body.mini.auto-dark-mode`: dark when the operating system prefers it
  (`prefers-color-scheme: dark`).
- Neither class: today's light theme, unchanged.

Dark mode also sets `color-scheme: dark`, so scrollbars, date pickers and
other native controls follow.

### 2. The neutral scale inverts

Everything built on these tokens follows with no markup change: the page,
`.white-box`, borders, body text, `.grey-text`, form fields, and mini_vue's
scoped styles.

| Token | Light (today) | Dark (proposal) | Dark contrast |
|---|---|---|---|
| `--white` | `#ffffff` | `#16161f` | page and surfaces |
| `--false-white` | `rgb(250 248 255)` | `#1e1e2b` | raised surfaces |
| `--light-grey` | `#bbbbc9` | `#3d3d52` | lines only |
| `--field-border-color` | `#8e8ea6` | `#6b6b85` | 3.2:1+ |
| `--grey` | `#70708b` | `#9494ad` | 5.6:1+ |
| `--muted` | `#6d6d89` | `#a3a3ba` | 6.7:1+ |
| `--dark-grey` | `rgb(55 55 80)` | `#d0d0dc` | |
| `--false-black` | `rgb(20 10 40)` | `#e4e3ee` | |
| `--black` | `rgb(10 10 20)` | `#ecebf5` | 14-15:1 |

These keep the violet tint of mini's greys.

### 3. Two new tokens for text on colored fills

- `--on-color` is always white, for text on strong fills: buttons, boxes
  in brand colors, chips.
- `--on-light-color` is always dark, for text on pastel fills: status
  boxes, light accents.

The maps change their text-over-fill values from `var(--white)` and
`var(--black)` to these two. Light mode gets the same values, so nothing
changes there. In dark mode they don't flip along with the neutral scale.

`.white-text` stays white in dark mode, with one override. It's used on
colored bars as well as on photos.

### 4. Colors as text get a dark-mode shade

The `-text` classes, the inverted boxes and chips, and the invert buttons
read `var(--<name>-text, <today's shade>)`. Light mode never defines
`--<name>-text`, so today's value applies.

The dark theme defines a light tint for each color that needs one: the main
color, the second color, links and the brand palettes. Status colors use
their pastel value.

`--uwa-third-color-text`, added on 2026-11-11 and not used anywhere yet,
becomes `--uwa-third-text` to match.

### 5. The contrast checker checks dark mode too

The checker gains a second pass: every generated pair against the dark
surfaces, with the same thresholds (4.5:1 for text, 3:1 for field
outlines).

### Approaches not chosen

- **Semantic tokens only** (`--surface`, `--text`, ..., with `.white-box`
  staying white). The naming is cleaner, but jpm's 430 neutral-class uses,
  and every other consumer's, would each need migrating before dark mode
  looks right.
- **`filter: invert()`**. It costs nothing to add, but it inverts images
  and brand colors, so colors end up wrong everywhere.

## Phases

1. **mini foundation:**
   - the activation classes;
   - the dark neutral scale;
   - `--on-color` and `--on-light-color`;
   - the text hooks;
   - the checker's dark pass;
   - a light/dark preview toggle on the Palette page.

   Light mode is verified identical, through the compiled CSS values and the
   checker.
2. **mini cleanup:**
   - the roughly 76 hardcoded colors in the partials. Shadows are fine;
     literal `#fff` or `white` surfaces get tokens.
   - logos and images. The `_wh` variants already exist.
   - mini_vue's few scoped colors.
3. **jpm:**
   - a Light / Dark / System choice in Profile, saved on the account (see
     Decisions);
   - dark values for jpm's own tokens: the entity colors (`--project`,
     `--task`, ...), `--pin`, `--tag` and `--info-layer`;
   - its 98 hardcoded colors;
   - a contrast and visual pass, page by page. The axe scan already exists.
4. **Other mini sites** adopt it when they choose, by adding a class.
   Nothing changes for them otherwise.

## Decisions (2026-11-11)

1. **Dark surfaces: violet-tinted greys**, continuing mini's palette, as in
   the table above.
2. **Fills in dark mode: deep, muted fills for the light colors.**
   - The light colors are the status colors, `third-color`, `light-blue`,
     `acid-green`, `mini-third` and `uwa-third`. In dark mode each one
     gets a deep tint of its own hue as its fill, with its pastel value as
     the text on it.
   - The strong brand fills keep white text (7:1 and up), unchanged.
   - Why: large pastel areas such as toasts and status boxes glare on a
     dark page and outshine the content, while a deep tint keeps each hue
     recognizable.
   - How: these colors' fills and the text on them get dark-mode values,
     the fill token plus a `--<name>-on` hook with today's text as its
     fallback. The checker's dark pass validates them.
3. **jpm stores the choice per account; the default is Light.**
   - A `User.theme` field (`light` / `dark` / `system`, default `light`)
     comes through `api/users/me/`, and the Profile page changes it.
   - The app sets `dark-mode` or `auto-dark-mode` on `body` from it.
   - So the page doesn't flash light while `users/me` loads, the last value
     is also cached in localStorage and applied before the app mounts. The
     account value wins once it arrives.
