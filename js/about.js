(function () {
  'use strict';

  /* ── Theme Toggle — icon-swap treatment (Font Awesome fa-sun / fa-moon) ── */
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon   = document.getElementById('themeIcon');
  var THEME_KEY   = 'theme';

  function applyThemeIcon(isDark) {
    if (themeIcon) themeIcon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    if (themeToggle) themeToggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  }

  (function () {
    var startDark = localStorage.getItem(THEME_KEY) === 'dark';
    document.body.classList.toggle('dark', startDark);
    applyThemeIcon(startDark);
  })();

  if (themeToggle) {
    themeToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isDark = document.body.classList.toggle('dark');
      applyThemeIcon(isDark);
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    });
  }

  /* ── RTL Toggle — circular button + text-swap treatment ── */
  var rtlToggle = document.getElementById('rtlToggle');
  var rtlLabel  = document.getElementById('rtlLabel');

  if (rtlToggle) {
    if (rtlLabel) rtlLabel.textContent = 'RTL';

    rtlToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isRtl  = document.body.getAttribute('dir') === 'rtl';
      var newDir = isRtl ? 'ltr' : 'rtl';
      document.documentElement.dir = newDir;
      document.body.setAttribute('dir', newDir);
      if (rtlLabel) rtlLabel.textContent = isRtl ? 'RTL' : 'LTR';
      rtlToggle.title = isRtl ? 'Switch to RTL' : 'Switch to LTR';
    });
  }

  /* ── Hamburger / Mobile Nav ── */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.querySelector('.nav-links');

  function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden'; /* prevent scroll behind open menu */
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.classList.remove('menu-open');
    /* close all dropdown sub-menus */
    navLinks.querySelectorAll('.dropdown').forEach(function (d) {
      d.classList.remove('open');
    });
    document.body.style.overflow = '';
  }

  if (hamburger && navLinks) {

    /* Toggle on hamburger click */
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Close when a nav link is clicked (except dropdown toggles) */
    navLinks.querySelectorAll('li:not(.dropdown) > a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 1024) {
          closeMenu();
        }
      });
    });

    /* Accordion dropdowns on mobile */
    navLinks.querySelectorAll('.dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth < 1024) {
          e.preventDefault();
          e.stopPropagation();
          var parent = link.parentElement;
          /* close all other open dropdowns first */
          navLinks.querySelectorAll('.dropdown.open').forEach(function (d) {
            if (d !== parent) d.classList.remove('open');
          });
          parent.classList.toggle('open');
        }
      });
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (
        navLinks.classList.contains('open') &&
        !hamburger.contains(e.target) &&
        !navLinks.contains(e.target)
      ) {
        closeMenu();
      }
    });

    /* Close on Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
        hamburger.focus();
      }
    });

    /* Close on window resize to desktop width */
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && navLinks.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* ── Scroll Reveal ── */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
    revealObs.observe(el);
  });

  /* ── Staggered Grid Reveal ── */
  var staggerObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.val-card, .team-card, .testi-card, .feat-item, .tl-item').forEach(function (card, i) {
        card.style.opacity    = '0';
        card.style.transform  = 'translateY(16px)';
        card.style.transition = 'none';
        setTimeout(function () {
          card.style.transition = 'opacity .5s ease, transform .5s ease';
          card.style.opacity    = '1';
          card.style.transform  = 'translateY(0)';
        }, 60 + i * 70);
      });
      staggerObs.unobserve(e.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.values-grid, .team-grid, .testi-grid, .features-grid, .timeline-wrap').forEach(function (el) {
    staggerObs.observe(el);
  });

  /* Safety net: ensure nothing stays hidden after 1.4s */
  setTimeout(function () {
    document.querySelectorAll('.val-card, .team-card, .testi-card, .feat-item, .tl-item').forEach(function (el) {
      el.style.opacity  = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 1400);

  /* ── Counter Animation ── */
  function animateCounter(el, target, suffix) {
    var current = 0;
    var isLarge = target > 999;
    var step    = Math.ceil(target / 60);
    var timer   = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = (isLarge ? Math.round(current / 1000) + 'K' : current) + suffix;
    }, 24);
  }

  var sbObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('[data-target]').forEach(function (el) {
        animateCounter(
          el,
          parseInt(el.getAttribute('data-target'), 10),
          el.getAttribute('data-suffix') || ''
        );
      });
      sbObs.unobserve(e.target);
    });
  }, { threshold: 0.4 });

  var sb = document.querySelector('.stats-band');
  if (sb) sbObs.observe(sb);

  /* ── Smooth scroll for hero "Scroll to explore" ── */
  var ahScroll = document.querySelector('.ah-scroll');
  if (ahScroll) {
    ahScroll.addEventListener('click', function () {
      var target = document.getElementById('mission');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

})();