// Mini Consent — GDPR cookie consent banner
// v2.0
//
// Usage — call MiniConsent.init() with your project config:
//
//   MiniConsent.init({
//     onAccept() {
//       gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' });
//     },
//     onDeny() {
//       gtag('consent', 'update', { analytics_storage: 'denied',  ad_storage: 'denied'  });
//     },
//     cookiesToDelete: ['_ga', '_gid', '_gat'],
//   });
//
// Wire banner buttons with data attributes (no onclick needed):
//
//   <button data-consent-accept>Accept</button>
//   <button data-consent-deny>Decline</button>
//   <a data-consent-open>Cookie settings</a>   ← reopen from anywhere
//   <a data-consent-close>×</a>                ← close if decision already made
//
// Public API:
//   MiniConsent.accept()   — record consent granted
//   MiniConsent.deny()     — record consent denied
//   MiniConsent.open()     — expand banner
//   MiniConsent.close()    — minimise banner (only if consent already recorded)
//   MiniConsent.status()   — returns 'granted' | 'denied' | null

const MiniConsent = (() => {
  'use strict';

  const DEFAULTS = {
    cookieName:      'consent_banner',
    cookieDays:      365,
    lang:            null,   // auto-detected from <html lang> when null
    translations: {
      en: { yes: 'yes', no: 'no' },
      it: { yes: 'sì',  no: 'no' },
    },
    cookiesToDelete: [],
    onAccept:        null,
    onDeny:          null,
    onChange:        null,
  };

  let cfg = {};

  // ── Cookies ─────────────────────────────────────────────────────────────────

  function setCookie(name, value, days, path = '/') {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=${path};SameSite=Lax`;
  }

  function getCookie(name) {
    const row = document.cookie.split('; ').find(r => r.startsWith(name + '='));
    return row ? decodeURIComponent(row.split('=')[1]) : null;
  }

  function deleteCookie(name, path = '/') {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
  }

  // ── i18n ─────────────────────────────────────────────────────────────────────

  function getLang() {
    return cfg.lang ?? document.documentElement.lang?.split('-')[0] ?? 'en';
  }

  function t(key) {
    const lang = getLang();
    return cfg.translations?.[lang]?.[key]
        ?? DEFAULTS.translations[lang]?.[key]
        ?? DEFAULTS.translations.en[key]
        ?? key;
  }

  // ── DOM ──────────────────────────────────────────────────────────────────────

  function getBanner()  { return document.getElementById('consent-banner'); }
  function getOverlay() { return document.getElementById('consent-overlay'); }

  function showOverlay() {
    if (getOverlay()) return;
    const el = document.createElement('div');
    el.id = 'consent-overlay';
    document.body.prepend(el);
  }

  function hideOverlay() {
    const el = getOverlay();
    if (!el) return;
    el.classList.add('gone');
    setTimeout(() => el.remove(), 350);
  }

  function updateStatusLabels() {
    const raw = status();
    const text = raw === 'granted' ? t('yes') : t('no');
    document.querySelectorAll('.consent-status').forEach(el => {
      el.textContent = text;
    });
  }

  function setBannerState(state) {
    const banner = getBanner();
    if (!banner) return;
    banner.classList.remove('open', 'mini');
    if (state) banner.classList.add(state);
    banner.dataset.consentStatus = status() ?? '';
  }

  // ── Status ───────────────────────────────────────────────────────────────────

  function status() {
    const raw = getCookie(cfg.cookieName);
    if (raw === 'yes')  return 'granted'; // migrate v1 cookie values
    if (raw === 'no')   return 'denied';
    return raw; // 'granted' | 'denied' | null
  }

  // ── Actions ──────────────────────────────────────────────────────────────────

  function accept() {
    setCookie(cfg.cookieName, 'granted', cfg.cookieDays);
    document.body.classList.remove('consent-pending');
    hideOverlay();
    setBannerState('mini');
    updateStatusLabels();
    cfg.onAccept?.();
    cfg.onChange?.('granted');
  }

  function deny() {
    setCookie(cfg.cookieName, 'denied', cfg.cookieDays);
    document.body.classList.remove('consent-pending');
    hideOverlay();
    setBannerState('mini');
    updateStatusLabels();
    cfg.cookiesToDelete?.forEach(name => deleteCookie(name));
    cfg.onDeny?.();
    cfg.onChange?.('denied');
  }

  function open() {
    setBannerState('open');
  }

  function close() {
    if (status()) setBannerState('mini'); // no-op if no decision yet
  }

  // ── Init ─────────────────────────────────────────────────────────────────────

  function wireButtons() {
    document.addEventListener('click', e => {
      if (e.target.closest('[data-consent-accept]')) { accept(); return; }
      if (e.target.closest('[data-consent-deny]'))   { deny();   return; }
      if (e.target.closest('[data-consent-open]'))   { open();   return; }
      if (e.target.closest('[data-consent-close]'))  { close();  return; }
    });
  }

  function setup() {
    const s = status();
    if (s === 'granted') {
      cfg.onAccept?.();
      setBannerState('mini');
    } else if (s === 'denied') {
      cfg.onDeny?.();
      setBannerState('mini');
    } else {
      // first visit — block scroll, show overlay, open banner
      document.body.classList.add('consent-pending');
      showOverlay();
      setBannerState('open');
    }
    updateStatusLabels();
  }

  function init(options = {}) {
    cfg = { ...DEFAULTS, ...options };
    // merge translations additively so custom langs don't wipe built-ins
    if (options.translations) {
      cfg.translations = { ...DEFAULTS.translations, ...options.translations };
    }
    wireButtons();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup);
    } else {
      setup();
    }
  }

  // ── Public API ───────────────────────────────────────────────────────────────

  return { init, accept, deny, open, close, status };

})();

