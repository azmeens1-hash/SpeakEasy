
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

 
  const rtlToggle = document.getElementById('rtlToggle');
  rtlToggle?.addEventListener('click', () => {
    const isRtl = document.body.getAttribute('dir') === 'rtl';
    document.body.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
  });

  
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
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

 
  function filterCat(btn, cat) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

 
  const searchInput = document.querySelector('.hero-search input');
  const searchBtn   = document.querySelector('.hero-search button');
  searchBtn?.addEventListener('click', () => {
    const q = searchInput?.value.trim().toLowerCase();
    if (!q) return;
    document.querySelectorAll('.post-card, .featured-post').forEach(card => {
      const title = card.querySelector('h2,h3')?.textContent.toLowerCase() || '';
      card.style.display = title.includes(q) ? '' : 'none';
    });
  });
  searchInput?.addEventListener('keydown', e => { if (e.key === 'Enter') searchBtn.click(); });

  function loadMore() {
    const btn = document.querySelector('.load-more-btn');
    if (btn) { btn.textContent = 'Loading…'; btn.disabled = true; }
    setTimeout(() => {
      if (btn) { btn.textContent = 'All articles loaded ✓'; }
    }, 1000);
  }

  
  document.querySelector('.sb-submit')?.addEventListener('click', function () {
    const email = document.querySelectorAll('.sb-input')[1]?.value.trim();
    if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); return; }
    this.textContent = 'Subscribed! ✓';
    this.style.background = '#16a34a';
    this.disabled = true;
  });