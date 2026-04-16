
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

 
  document.querySelectorAll('.share i').forEach(icon => {
    icon.addEventListener('click', () => {
      const url   = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      let link = '#';
      if (icon.classList.contains('fa-facebook')) link = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      if (icon.classList.contains('fa-twitter'))  link = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      if (icon.classList.contains('fa-linkedin')) link = `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`;
      if (icon.classList.contains('fa-whatsapp')) link = `https://wa.me/?text=${title}%20${url}`;
      if (link !== '#') window.open(link, '_blank', 'noopener');
    });
  });


  document.getElementById('subscribeBtn')?.addEventListener('click', function () {
    const input = this.previousElementSibling;
    if (!input?.value.trim() || !input.value.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    this.textContent = 'Subscribed! ✓';
    this.style.background = '#16a34a';
    this.disabled = true;
  });