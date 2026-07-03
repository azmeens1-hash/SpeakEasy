(function () {
  'use strict';

  /* ============================================================
     THEME — same localStorage key as before ('theme'),
     now using the dashboard's icon-swap treatment
     (Font Awesome fa-sun / fa-moon instead of emoji)
  ============================================================ */
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon   = document.getElementById('themeIcon');

  function applyThemeIcon(isDark) {
    if (themeIcon) themeIcon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    if (themeToggle) themeToggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  }

  var startDark = localStorage.getItem('theme') === 'dark';
  if (startDark) document.body.classList.add('dark');
  applyThemeIcon(startDark);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isDark = document.body.classList.toggle('dark');
      applyThemeIcon(isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* ============================================================
     RTL — same localStorage key as before ('speakeasy-rtl'),
     now using the dashboard's circular button + text-swap treatment
  ============================================================ */
  var rtlToggle = document.getElementById('rtlToggle');
  var rtlLabel  = document.getElementById('rtlLabel');

  if (rtlToggle) {
    var savedDir = null;
    try { savedDir = localStorage.getItem('speakeasy-rtl'); } catch (e) {}
    var isRtlInit = savedDir === 'rtl';
    if (isRtlInit) {
      document.body.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('dir', 'rtl');
    }
    if (rtlLabel) rtlLabel.textContent = isRtlInit ? 'LTR' : 'RTL';

    rtlToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isRtl = document.body.getAttribute('dir') === 'rtl';
      var newDir = isRtl ? 'ltr' : 'rtl';
      document.body.setAttribute('dir', newDir);
      document.documentElement.setAttribute('dir', newDir);
      if (rtlLabel) rtlLabel.textContent = isRtl ? 'RTL' : 'LTR';
      try { localStorage.setItem('speakeasy-rtl', newDir); } catch (e2) {}
    });
  }

  /* ============================================================
     HAMBURGER / MOBILE NAV — unchanged
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

    /* ── Dropdown ──
       Two interaction modes share the same markup:
         - Mobile/tablet (<1024px): the trigger link's click toggles the
           submenu open/closed via the `.open` class, and must NOT
           navigate away (the hamburger menu is the only way in here).
         - Desktop (>=1024px): the CSS `.dropdown:hover .dropdown-menu`
           rule shows the submenu on hover with no JS involvement. But
           the trigger is still a real <a href>, so without handling the
           click here too, clicking it just navigates to that href
           immediately — before a hover-revealed submenu could ever be
           interacted with. Desktop clicks now also toggle `.open`
           instead of navigating, matching the matching CSS rule
           `.dropdown.open .dropdown-menu { opacity:1; visibility:visible; }`. */
    navLinks.querySelectorAll('.dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        link.parentElement.classList.toggle('open');
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