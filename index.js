(function () {
  'use strict';

  var MOON = '🌙';
  var SUN  = '☀️';
  var STORAGE_KEY = 'speakeasy-theme';
  var RTL_KEY = 'speakeasy-rtl';

  function isDark() { return document.body.classList.contains('dark'); }

  function syncIcons(dark) {
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.textContent = dark ? SUN : MOON;
      btn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    });
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

  document.addEventListener('click', function (e) {
    if (e.target.closest('.theme-toggle')) { e.stopPropagation(); setTheme(!isDark()); }
  });

  
  function isRTL() { return document.documentElement.dir === 'rtl' || document.body.getAttribute('dir') === 'rtl'; }

  function setRTL(rtl) {
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.body.setAttribute('dir', rtl ? 'rtl' : 'ltr');
    var btn = document.getElementById('rtlToggle');
    if (btn) {
      btn.title = rtl ? 'Switch to LTR' : 'Switch to RTL';
      btn.innerHTML = rtl
        ? '<i class="fas fa-exchange-alt"></i>'
        : '<i class="fas fa-exchange-alt"></i>';
    }
    try { localStorage.setItem(RTL_KEY, rtl ? 'rtl' : 'ltr'); } catch (e) {}
  }

  
  (function () {
    var saved = null;
    try { saved = localStorage.getItem(RTL_KEY); } catch (e) {}
    if (saved === 'rtl') setRTL(true);
  })();

  var rtlToggle = document.getElementById('rtlToggle');
  if (rtlToggle) {
    rtlToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setRTL(!isRTL());
    });
  }

 
  var hamburger = document.getElementById('hamburger');
  var navLinks   = document.querySelector('.nav-links');

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

 
  document.querySelectorAll('.dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (navLinks && navLinks.classList.contains('open')) {
        e.preventDefault();
        link.closest('.dropdown').classList.toggle('open');
      }
    });
  });

  
  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    if (!target) return;
    var duration = 2000;
    var start    = performance.now();
    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      var current  = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + (el.getAttribute('data-suffix') || '+');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + (el.getAttribute('data-suffix') || '+');
    }
    requestAnimationFrame(step);
  }

  var counterEls = document.querySelectorAll('.sb-num[data-target]');
  var counterDone = false;
  if (counterEls.length && 'IntersectionObserver' in window) {
    var counterObs = new IntersectionObserver(function (entries) {
      if (!counterDone && entries[0].isIntersecting) {
        counterDone = true;
        counterEls.forEach(function (el) { animateCounter(el); });
      }
    }, { threshold: 0.3 });
    counterObs.observe(counterEls[0].closest('.stats-band') || counterEls[0]);
  }

  
  var words    = ['Every Language', 'Speak Freely', 'Go Global', 'No Limits', 'Any Culture'];
  var wordEl   = document.getElementById('wordRotate');
  var wordIdx  = 0;
  if (wordEl) {
    setInterval(function () {
      wordEl.style.opacity = '0';
      wordEl.style.transform = 'translateY(10px)';
      setTimeout(function () {
        wordIdx = (wordIdx + 1) % words.length;
        wordEl.textContent = words[wordIdx];
        wordEl.style.transition = 'opacity .4s, transform .4s';
        wordEl.style.opacity = '1';
        wordEl.style.transform = 'translateY(0)';
      }, 300);
    }, 2000);
    wordEl.style.transition = 'opacity .4s, transform .4s';
  }

  
  window.switchTab = function (btn, panelId) {
    document.querySelectorAll('.path-tab').forEach(function (t) { t.classList.remove('active'); });
    document.querySelectorAll('.paths-panel').forEach(function (p) { p.classList.remove('active'); });
    btn.classList.add('active');
    var panel = document.getElementById(panelId);
    if (panel) panel.classList.add('active');
  };

  
  var track   = document.getElementById('testi2Track');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var dotsWrap= document.getElementById('t2Dots');

  if (track && prevBtn && nextBtn) {
    var cards     = track.querySelectorAll('.testi2-card');
    var total     = cards.length;
    var current   = 0;
    var cardW     = 340 + 22;

    if (dotsWrap) {
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('div');
        dot.className = 't2-dot' + (i === 0 ? ' active' : '');
        (function (idx) {
          dot.addEventListener('click', function () { goTo(idx); });
        })(i);
        dotsWrap.appendChild(dot);
      }
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, total - 1));
      track.style.transform = 'translateX(-' + (current * cardW) + 'px)';
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.t2-dot').forEach(function (d, i) {
          d.classList.toggle('active', i === current);
        });
      }
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); });
    setInterval(function () { goTo(current < total - 1 ? current + 1 : 0); }, 5000);
  }

})();