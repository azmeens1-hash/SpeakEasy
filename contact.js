
  const themeToggle = document.getElementById('themeToggle');
 
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
  themeToggle?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });


 /* ---- RTL ---- */
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
 
 
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (hamburger && navLinks && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
  
  navLinks?.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        e.stopPropagation();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

  function setTab(el) {
    document.querySelectorAll('.eq-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }

  function toggleSlot(el) { el.classList.toggle('active'); }

  function toggleFaq(el) {
    const item = el.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  }

  function setMapTab(el, tab) {
    document.querySelectorAll('.map-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    const onlineCard = document.getElementById('onlineCard');
    const mapFrame   = document.getElementById('mapFrame');
    if (tab === 'online') {
      if (mapFrame) mapFrame.style.opacity = '0.3';
      if (onlineCard) onlineCard.style.display = '';
    } else {
      if (mapFrame) mapFrame.style.opacity = '1';
      if (onlineCard) onlineCard.style.display = 'none';
    }
  }

  function submitForm() {
    const fname   = document.getElementById('fname')?.value.trim();
    const email   = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const consent = document.getElementById('consent')?.checked;
    if (!fname || !email || !message) { alert('Please fill in all required fields.'); return; }
    if (!consent) { alert('Please agree to our Privacy Policy to continue.'); return; }
    const btn = document.getElementById('submitBtn');
    const txt = document.getElementById('submitText');
    if (btn) btn.disabled = true;
    if (txt) txt.textContent = 'Sending…';
    setTimeout(() => {
      const fc = document.getElementById('formContent');
      const sm = document.getElementById('successMsg');
      if (fc) fc.style.display = 'none';
      if (sm) sm.style.display = 'block';
    }, 1200);
  }

  function resetForm() {
    const fc = document.getElementById('formContent');
    const sm = document.getElementById('successMsg');
    if (fc) fc.style.display = '';
    if (sm) sm.style.display = 'none';
    const btn = document.getElementById('submitBtn');
    const txt = document.getElementById('submitText');
    if (btn) btn.disabled = false;
    if (txt) txt.textContent = 'Send Message →';
    document.querySelectorAll('.form-input').forEach(i => {
      if (i.tagName !== 'SELECT') i.value = ''; else i.selectedIndex = 0;
    });
    const consent = document.getElementById('consent');
    if (consent) consent.checked = false;
  }

  function updateHoursBadges() {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const day = now.getDay();
    const h   = now.getHours() * 60 + now.getMinutes();
    const wBadge = document.getElementById('weekdayBadge');
    const sBadge = document.getElementById('satBadge');
    if (wBadge) {
      const openWeekday = day >= 1 && day <= 5 && h >= 540 && h < 1140;
      wBadge.textContent = openWeekday ? 'Open Now' : 'Closed';
      wBadge.className   = 'hours-badge ' + (openWeekday ? 'open' : 'closed');
    }
    if (sBadge) {
      const openSat = day === 6 && h >= 600 && h < 1020;
      sBadge.textContent = openSat ? 'Open Now' : 'Closed';
      sBadge.className   = 'hours-badge ' + (openSat ? 'open' : 'closed');
    }
  }
  updateHoursBadges();