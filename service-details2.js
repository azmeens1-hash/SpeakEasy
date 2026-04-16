 
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
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { hamburger?.classList.remove('open'); navLinks?.classList.remove('open'); }
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