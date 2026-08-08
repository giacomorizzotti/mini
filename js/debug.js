// Mini Debug — developer overlay
// Activated by adding ?debug to any URL
//
// Displays: device type, viewport size, breakpoint, pixel ratio,
//           colour scheme, scroll position, device orientation (mobile).
// Also intercepts console.error / console.warn and surfaces them
// in the on-page #msg panel (see _debug.scss).

(() => {
  'use strict';

  if (!new URLSearchParams(window.location.search).has('debug')) return;

  // Breakpoints — must match _breakpoints.scss
  const BREAKPOINTS = [
    { name: 'xxl', min: 1920 },
    { name: 'xl',  min: 1200 },
    { name: 'lg',  min: 992  },
    { name: 'md',  min: 768  },
    { name: 'sm',  min: 576  },
    { name: 'xs',  min: 0    },
  ];

  // ── Helpers ──────────────────────────────────────────────────────────────────

  function getBreakpoint() {
    return BREAKPOINTS.find(b => window.innerWidth >= b.min)?.name ?? 'xs';
  }

  function isMobile() {
    return typeof window.mobileCheck === 'function'
      ? window.mobileCheck()
      : /Mobi|Android/i.test(navigator.userAgent);
  }

  function getTheme() {
    return document.documentElement.dataset.theme
        ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  // ── Build ────────────────────────────────────────────────────────────────────

  function makeRow(id) {
    const wrap = document.createElement('div');
    wrap.id = id;
    wrap.className = 'debug-data';
    const p = document.createElement('p');
    p.className = 'S m-0 wh-text mono';
    wrap.appendChild(p);
    return wrap;
  }

  function buildDebugBox() {
    const box = document.createElement('div');
    box.id = 'debug-box';

    // Title
    const title = document.createElement('div');
    title.className = 'debug-data';
    title.innerHTML = '<p class="S m-0 wh-text mono">🐛 <span class="mini-text black">mini</span> debug</p>';
    box.appendChild(title);

    // Data rows
    ['dbg-device', 'dbg-screen', 'dbg-bp', 'dbg-dpr', 'dbg-theme', 'dbg-scroll'].forEach(id => {
      box.appendChild(makeRow(id));
    });

    // Orientation row — mobile only
    if (isMobile()) box.appendChild(makeRow('dbg-orient'));

    document.body.appendChild(box);
  }

  function buildMsgPanel() {
    const panel = document.createElement('div');
    panel.id = 'msg';
    panel.innerHTML = `
      <p class="label S mono grey-text">console</p>
      <div id="errors"   class="danger-bg minified"><ul></ul></div>
      <div id="warnings" class="warning-bg minified"><ul></ul></div>
    `;
    document.body.appendChild(panel);
  }

  // ── Update ───────────────────────────────────────────────────────────────────

  function set(id, label, value) {
    const row = document.getElementById(id);
    if (!row) return;
    row.querySelector('p').innerHTML =
      `<span class="grey-text">${label}</span> ${value}`;
  }

  function update() {
    set('dbg-device', 'dev',    isMobile() ? 'mobile' : 'desktop');
    set('dbg-screen', 'screen', `${window.innerWidth}×${window.innerHeight}px`);
    set('dbg-bp',     'bp',     getBreakpoint());
    set('dbg-dpr',    'dpr',    window.devicePixelRatio);
    set('dbg-theme',  'theme',  getTheme());
    set('dbg-scroll', 'scroll', `${Math.round(window.scrollY)}px`);
  }

  // ── Orientation — wired once ─────────────────────────────────────────────────

  function setupOrientation() {
    if (!window.DeviceOrientationEvent || !document.getElementById('dbg-orient')) return;
    window.addEventListener('deviceorientation', e => {
      set('dbg-orient', 'orient',
        `α${Math.round(e.alpha)} β${Math.round(e.beta)} γ${Math.round(e.gamma)}`);
    }, { passive: true });
  }

  // ── Console interceptor ──────────────────────────────────────────────────────

  function addMsg(panelId, text) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    const li = document.createElement('li');
    li.className = 'S wh-text mono';
    li.textContent = text;
    panel.querySelector('ul').appendChild(li);
    panel.classList.remove('minified');
  }

  function interceptConsole() {
    const _error = console.error.bind(console);
    const _warn  = console.warn.bind(console);
    console.error = (...args) => { _error(...args); addMsg('errors',   args.join(' ')); };
    console.warn  = (...args) => { _warn(...args);  addMsg('warnings', args.join(' ')); };
  }

  // ── Init ─────────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', () => {
    buildDebugBox();
    buildMsgPanel();
    update();
    setupOrientation();
    interceptConsole();
  });

  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('scroll', update, { passive: true });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', update);

})();
