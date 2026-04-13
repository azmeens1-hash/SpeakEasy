
  const themeToggle = document.getElementById('themeToggle');
  if (localStorage.getItem('speakeasy-theme') === 'dark' ||
      (!localStorage.getItem('speakeasy-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
  themeToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isDark = document.body.classList.toggle('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('speakeasy-theme', isDark ? 'dark' : 'light');
  });

  
  const rtlToggle = document.getElementById('rtlToggle');
  if (localStorage.getItem('speakeasy-rtl') === 'rtl') {
    document.documentElement.dir = 'rtl';
    document.body.setAttribute('dir', 'rtl');
  }
  rtlToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isRtl = document.body.getAttribute('dir') === 'rtl';
    document.documentElement.dir = isRtl ? 'ltr' : 'rtl';
    document.body.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
    localStorage.setItem('speakeasy-rtl', isRtl ? 'ltr' : 'rtl');
  });

  
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  document.addEventListener('click', e => {
    if (navLinks?.classList.contains('open') &&
        !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      navLinks?.classList.remove('open');
      hamburger?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  navLinks?.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth < 1024) {
        e.preventDefault(); e.stopPropagation();
        link.parentElement.classList.toggle('open');
      }
    });
  });


  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => ro.observe(el));

  
  function switchTab(btn, id) {
    document.querySelectorAll('.ctab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(t => { t.style.display = 'none'; t.classList.remove('show'); });
    const tc = document.getElementById(id);
    if (tc) { tc.style.display = 'flex'; tc.classList.add('show'); }
  }

  
  function toggleModule(header) { header.closest('.module-item').classList.toggle('open'); }