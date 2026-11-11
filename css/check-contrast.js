// WCAG AA contrast check of every color pair mini's color and button maps
// generate: text 4.5:1, form field outlines 3:1 (WCAG 1.4.11).
//
//   node css/check-contrast.js [compiled.css] [scss dir]
//
// Both default to this folder's mini.css and scss/. It reads the :root
// values from the compiled CSS and the map entries from _colors.scss and
// _buttons.scss, prints a summary and every failing pair, and exits with 1
// when any pair fails. build.sh runs it after compiling.
const fs = require('fs');
const path = require('path');
const css = process.argv[2] ?? path.join(__dirname, 'mini.css');
const scssDir = process.argv[3] ?? path.join(__dirname, 'scss');
const src = fs.readFileSync(css, 'utf8');

// :root custom properties (plain :root blocks only, not the high-contrast one).
const vars = {};
for (const block of src.matchAll(/(^|\n):root\s*\{([^}]*)\}/g))
  for (const m of block[2].matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) vars[m[1]] = m[2].trim();

function parse(value, depth = 0) {
  if (depth > 10 || value == null) return null;
  value = value.trim();
  const v = /^var\(--([\w-]+)\)$/.exec(value);
  if (v) return parse(vars[v[1]], depth + 1);
  let m = /^#([0-9a-f]{3,8})$/i.exec(value);
  if (m) {
    let h = m[1];
    if (h.length <= 4) h = [...h].map(c => c + c).join('');
    const a = h.length === 8 ? parseInt(h.slice(6), 16) / 255 : 1;
    return { rgb: [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)), a };
  }
  m = /^rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)\s*(?:[\/,]\s*([\d.]+)(%?))?\s*\)$/i.exec(value);
  if (m) {
    let a = m[4] === undefined ? 1 : parseFloat(m[4]) / (m[5] ? 100 : 1);
    return { rgb: [m[1], m[2], m[3]].map(Number), a };
  }
  if (value === 'black') return { rgb: [0, 0, 0], a: 1 };
  if (value === 'white') return { rgb: [255, 255, 255], a: 1 };
  return null;
}
const lum = ({ rgb }) => {
  const [r, g, b] = rgb.map(v => v / 255).map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const hex = c => '#' + c.rgb.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');

function readMap(file) {
  const text = fs.readFileSync(`${scssDir}/${file}`, 'utf8');
  const start = text.indexOf('$colors');
  const end = text.indexOf(';', start);
  return [...text.slice(start, end).matchAll(/^\s*"([\w-]+)"((?:\s+var\(--[\w-]+\))+)/gm)]
    .map(m => ({ name: m[1], vals: [...m[2].matchAll(/var\(--([\w-]+)\)/g)].map(x => x[1]) }));
}

const rows = [];
function check(kind, name, fgVar, bgVar, min) {
  const fg = parse(`var(--${fgVar})`), bg = parse(`var(--${bgVar})`);
  if (!fg || !bg) { rows.push({ kind, name, pair: `--${fgVar} on --${bgVar}`, r: null, min, note: 'undefined token' }); return; }
  if (fg.a < 1 || bg.a < 1) return;
  rows.push({ kind, name, pair: `${fgVar} ${hex(fg)} on ${bgVar} ${hex(bg)}`, r: ratio(fg, bg), min });
}

// _colors.scss: "-text" (its readable shade, if any) on the light page
// backgrounds, "-box"/"-bg" pairs, and the swapped variants.
for (const { name, vals: [color, text, shade] } of readMap('_colors.scss')) {
  if (!['white', 'false-white', 'light-grey'].includes(color)) {
    check('text on page', name, shade || color, 'white', 4.5);
    check('text on page', name, shade || color, 'false-white', 4.5);
  }
  check('box/bg', name, text, color, 4.5);
  check('swapped variant', name, shade || color, shade ? 'white' : text, 4.5);
}
// _buttons.scss: normal, hover/active, invert (on a white page), invert hover.
for (const { name, vals: [color, active, text, invertText, hoverText] } of readMap('_buttons.scss')) {
  check('button', name, text, color, 4.5);
  check('button hover/active', name, hoverText || text, active, 4.5);
  if (!['white', 'false-white', 'wh'].includes(color)) check('button invert', name, invertText || color, 'white', 4.5);
}
// Non-text (WCAG 1.4.11, 3:1): form field outline and its focus state.
check('form field border', 'input', 'field-border-color', 'white', 3);
check('form field border', 'input', 'field-border-color', 'false-white', 3);
check('focus border', 'input:focus', 'main-color', 'white', 3);

const seen = new Set();
const fails = rows.filter(r => r.r === null || r.r < r.min).filter(r => { const k = r.kind + r.pair; if (seen.has(k)) return false; seen.add(k); return true; });
const byKind = {};
for (const r of rows) { byKind[r.kind] ??= [0, 0]; byKind[r.kind][0]++; if (r.r !== null && r.r >= r.min) byKind[r.kind][1]++; }
console.log('pairs checked by kind (passing/total):', Object.entries(byKind).map(([k, [t, p]]) => `${k} ${p}/${t}`).join(' | '));
console.log(`\nFAILING (${fails.length} unique):`);
for (const r of fails.sort((a, b) => (a.r ?? 0) - (b.r ?? 0)))
  console.log(`${(r.r === null ? '  n/a' : r.r.toFixed(2).padStart(5))}  (needs ${r.min})  ${r.kind.padEnd(20)} ${r.name.padEnd(18)} ${r.pair}${r.note ? '  ' + r.note : ''}`);
process.exitCode = fails.length ? 1 : 0;
