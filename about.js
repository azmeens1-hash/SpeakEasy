(function () {
  'use strict';

  
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
    rtlToggle.addEventListener('click', function () {
      var isRtl = document.body.getAttribute('dir') === 'rtl';
      var newDir = isRtl ? 'ltr' : 'rtl';
      document.documentElement.dir = newDir;
      document.body.setAttribute('dir', newDir);
    });
  }

 
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    /* close on outside click */
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

  
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
    observer.observe(el);
  });

  
  var sr = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.val-card,.team-card,.testi-card,.feat-item,.tl-item').forEach(function (c, i) {
        c.style.opacity = '0';
        c.style.transform = 'translateY(16px)';
        c.style.transition = 'none';
        setTimeout(function () {
          c.style.transition = 'opacity .5s ease,transform .5s ease';
          c.style.opacity = '1';
          c.style.transform = 'translateY(0)';
        }, 60 + i * 70);
      });
      sr.unobserve(e.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.values-grid,.team-grid,.testi-grid,.features-grid,.timeline-wrap').forEach(function (el) {
    sr.observe(el);
  });

  setTimeout(function () {
    document.querySelectorAll('.val-card,.team-card,.testi-card,.feat-item,.tl-item').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 1400);

  
  function animateCounter(el, target, suffix) {
    var current = 0;
    var isLarge = target > 999;
    var step = Math.ceil(target / 60);
    var timer = setInterval(function () {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = (isLarge ? (current / 1000).toFixed(0) + 'K' : current) + suffix;
    }, 24);
  }

  var sbObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var nums = e.target.querySelectorAll('.stat-num');
      var data = [{ val: 50000, sfx: '+' }, { val: 12, sfx: '' }, { val: 200, sfx: '+' }, { val: 95, sfx: '%' }];
      nums.forEach(function (n, i) { if (data[i]) animateCounter(n, data[i].val, data[i].sfx); });
      sbObs.unobserve(e.target);
    });
  }, { threshold: .4 });

  var sb = document.querySelector('.stats-band');
  if (sb) sbObs.observe(sb);

})();