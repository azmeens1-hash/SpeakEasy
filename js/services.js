(function () {
  'use strict';
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon   = document.getElementById('themeIcon');
  var STORAGE_KEY = 'speakeasy-theme';

  function isDark() { return document.body.classList.contains('dark'); }
  function syncIcons(dark) {
    if (themeIcon) themeIcon.className = dark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    if (themeToggle) themeToggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  }
  function setTheme(dark) {
    document.body.classList.toggle('dark', dark);
    syncIcons(dark);
    try { localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light'); } catch(e) {}
  }
  (function() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch(e) {}
    if (!saved) saved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(saved === 'dark');
  })();
  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) { e.stopPropagation(); setTheme(!isDark()); });
  }
 
  /* ---- RTL ---- */
  var rtlToggle = document.getElementById('rtlToggle');
  var rtlLabel  = document.getElementById('rtlLabel');

if (rtlToggle) {
  /* init from localStorage */
  var savedDir = null;
  try { savedDir = localStorage.getItem('speakeasy-rtl'); } catch(e) {}
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
    try { localStorage.setItem('speakeasy-rtl', newDir); } catch(e) {}
  });
}
 

  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    navLinks.querySelectorAll('li > a').forEach(function(link) {
      link.addEventListener('click', function() {
        if (!link.closest('.dropdown')) {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('open') &&
          !navLinks.contains(e.target) &&
          !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
 
  /* Dropdown toggle in mobile */
  document.querySelectorAll('.dropdown > a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (navLinks && navLinks.classList.contains('open')) {
        e.preventDefault();
        link.closest('.dropdown').classList.toggle('open');
      }
    });
  });
 
 
  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function(el) { observer.observe(el); });
  } else {
    revealEls.forEach(function(el) { el.classList.add('visible'); });
  }
 
 
  window.filterCards = function(btn, cat) {
    document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('.srv-card').forEach(function(card) {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  };
 

  var searchInput = document.querySelector('.banner-search input');
  var searchBtn   = document.querySelector('.banner-search button');
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function() {
      var val = searchInput.value.trim().toLowerCase();
      if (!val) {
        document.querySelectorAll('.srv-card').forEach(function(c){ c.style.display=''; });
        return;
      }
      document.querySelectorAll('.srv-card').forEach(function(card) {
        var title = card.querySelector('.srv-title') ? card.querySelector('.srv-title').textContent.toLowerCase() : '';
        card.style.display = title.includes(val) ? '' : 'none';
      });
      var courses = document.getElementById('courses');
      if (courses) courses.scrollIntoView({ behavior:'smooth' });
    });
    searchInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') searchBtn.click(); });
  }
})();