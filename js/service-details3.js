(function () {
  'use strict';

  var themeToggle = document.getElementById('themeToggle');
  var themeIcon   = document.getElementById('themeIcon');
  var STORAGE_KEY = 'speakeasy-theme', RTL_KEY = 'speakeasy-rtl';

  /* ── Theme ── */
  function isDark() { return document.body.classList.contains('dark'); }

  function syncIcons(dark) {
    if (themeIcon) themeIcon.className = dark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    if (themeToggle) themeToggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  }

  function setTheme(dark) {
    document.body.classList.toggle('dark', dark);
    syncIcons(dark);
    try { localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light'); } catch (e) {}
  }

  (function () {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (!saved) saved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(saved === 'dark');
  })();

  if (themeToggle) {
    themeToggle.addEventListener('click', function (e) { e.stopPropagation(); setTheme(!isDark()); });
  }

  /* ── RTL ── */
  var rtlToggle = document.getElementById('rtlToggle');
  var rtlLabel  = document.getElementById('rtlLabel');

  if (rtlToggle) {
    var savedDir = null;
    try { savedDir = localStorage.getItem(RTL_KEY); } catch (e) {}
    if (savedDir === 'rtl') {
      document.body.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('dir', 'rtl');
      if (rtlLabel) rtlLabel.textContent = 'LTR';
    } else {
      if (rtlLabel) rtlLabel.textContent = 'RTL';
    }

    rtlToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isRtl = document.body.getAttribute('dir') === 'rtl';
      var newDir = isRtl ? 'ltr' : 'rtl';
      document.body.setAttribute('dir', newDir);
      document.documentElement.setAttribute('dir', newDir);
      if (rtlLabel) rtlLabel.textContent = isRtl ? 'RTL' : 'LTR';
      rtlToggle.title = isRtl ? 'Switch to RTL' : 'Switch to LTR';
      try { localStorage.setItem(RTL_KEY, newDir); } catch (e) {}
    });
  } /* ← rtlToggle block correctly closed here */

  /* ── Hamburger ── */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('li > a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (!link.closest('.dropdown')) {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('open') &&
          !navLinks.contains(e.target) &&
          !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Dropdown ── */
  document.querySelectorAll('.dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (navLinks && navLinks.classList.contains('open')) {
        e.preventDefault();
        link.closest('.dropdown').classList.toggle('open');
      }
    });
  });

  /* ── Scroll reveal ── */
  var ro = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
    ro.observe(el);
  });

  /* ── Tabs ── */
  window.switchTab = function (btn, id) {
    document.querySelectorAll('.ctab').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(function (t) {
      t.style.display = 'none'; t.classList.remove('show');
    });
    var tc = document.getElementById(id);
    if (tc) { tc.style.display = 'flex'; tc.classList.add('show'); }
  };

  /* ── Toggle module ── */
  window.toggleModule = function (header) {
    header.closest('.module-item').classList.toggle('open');
  };

})();