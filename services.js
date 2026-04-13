(function () {
  'use strict';
  var MOON = '🌙', SUN = '☀️';
  var STORAGE_KEY = 'speakeasy-theme', RTL_KEY = 'speakeasy-rtl';
 

  function isDark() { return document.body.classList.contains('dark'); }
  function syncIcons(dark) {
    document.querySelectorAll('.theme-toggle').forEach(function(btn) {
      btn.textContent = dark ? SUN : MOON;
      btn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    });
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
  document.addEventListener('click', function(e) {
    if (e.target.closest('.theme-toggle')) { e.stopPropagation(); setTheme(!isDark()); }
  });
 
  /* ---- RTL ---- */
  function isRTL() { return document.body.getAttribute('dir') === 'rtl'; }
  function setRTL(rtl) {
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.body.setAttribute('dir', rtl ? 'rtl' : 'ltr');
    var btn = document.getElementById('rtlToggle');
    if (btn) {
      btn.title = rtl ? 'Switch to LTR' : 'Switch to RTL';
      btn.innerHTML = '<i class="fas fa-exchange-alt"></i>';
    }
    try { localStorage.setItem(RTL_KEY, rtl ? 'rtl' : 'ltr'); } catch(e) {}
  }
  (function() {
    var saved = null;
    try { saved = localStorage.getItem(RTL_KEY); } catch(e) {}
    if (saved === 'rtl') setRTL(true);
  })();
  var rtlToggle = document.getElementById('rtlToggle');
  if (rtlToggle) {
    rtlToggle.addEventListener('click', function(e) { e.stopPropagation(); setRTL(!isRTL()); });
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