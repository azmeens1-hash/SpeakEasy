(function () {
  'use strict';

  /* ============================================================
     THEME — matches contact.js (localStorage key: 'theme')
  ============================================================ */
  var themeToggle = document.getElementById('themeToggle');

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isDark = document.body.classList.toggle('dark');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

 
 var rtlToggle = document.getElementById('rtlToggle');

if (rtlToggle) {
  /* init from localStorage */
  var savedDir = null;
  try { savedDir = localStorage.getItem('speakeasy-rtl'); } catch(e) {}
  if (savedDir === 'rtl') {
    document.body.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('dir', 'rtl');
    rtlToggle.textContent = 'LTR';
  } else {
    rtlToggle.textContent = 'RTL';
  }

  rtlToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var isRtl = document.body.getAttribute('dir') === 'rtl';
    var newDir = isRtl ? 'ltr' : 'rtl';
    document.body.setAttribute('dir', newDir);
    document.documentElement.setAttribute('dir', newDir);
    rtlToggle.textContent = isRtl ? 'RTL' : 'LTR';
    try { localStorage.setItem('speakeasy-rtl', newDir); } catch(e) {}
  });
}

  /* ============================================================
     HAMBURGER / MOBILE NAV — matches contact.js
  ============================================================ */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });

    navLinks.querySelectorAll('.dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth < 1024) {
          e.preventDefault();
          e.stopPropagation();
          link.parentElement.classList.toggle('open');
        }
      });
    });
  }

  /* ============================================================
     SCROLL REVEAL — unchanged
  ============================================================ */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
    observer.observe(el);
  });

})();