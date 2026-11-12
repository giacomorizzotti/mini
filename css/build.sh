#!/usr/bin/env bash
# Builds mini's compiled CSS from scss/, then checks color contrast.
#
#   css/build.sh
#
# The pinned versions reproduce the checked-in files byte for byte, source
# maps included (other Sass versions give the same CSS since 2026-11-11, see
# CLAUDE.md, but needn't give the same maps). clean-css reads mini.css.map, so
# mini.min.css.map leads back to the SCSS partials too. Commit all five
# output files with the SCSS change: WordPress sites load them, not the SCSS.
set -euo pipefail
cd "$(dirname "$0")"

npx -y sass@1.91.0 --quiet-deps mini.scss mini.css
npx -y -p clean-css-cli@5.6.3 cleancss --source-map -o mini.min.css mini.css
node check-contrast.js mini.css scss
