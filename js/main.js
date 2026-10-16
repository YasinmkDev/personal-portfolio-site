// Mobile navigation toggle
var navToggle = document.getElementById('nav-toggle');
var navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Render project cards from js/projects-data.js
(function renderProjects() {
  var grid = document.getElementById('projects-grid');
  if (!grid || typeof PROJECTS === 'undefined') return;
  grid.innerHTML = PROJECTS.map(function (p) {
    var tags = p.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');
    return '<article class="project-card"><h3>' + p.name + '</h3><p>' + p.description +
      '</p><div class="tag-row">' + tags + '</div>' +
      '<a class="project-link" href="' + p.url + '" target="_blank" rel="noopener">View on GitHub</a></article>';
  }).join('');
})();

// Contact form validation (front-end only; wire a backend or form service to receive messages)
(function contactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;
  function setError(id, msg) {
    var el = form.querySelector('[data-error-for="' + id + '"]');
    if (el) el.textContent = msg || '';
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();
    var ok = true;
    setError('cf-name'); setError('cf-email'); setError('cf-message');
    if (name.length < 2) { setError('cf-name', 'Please enter your name.'); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('cf-email', 'Please enter a valid email address.'); ok = false; }
    if (message.length < 10) { setError('cf-message', 'Please write at least 10 characters.'); ok = false; }
    var status = document.getElementById('form-status');
    if (!ok) { status.textContent = ''; return; }
    status.textContent = 'Thank you, ' + name + '. Your message is ready — this demo form does not send email yet, please reach me via GitHub.';
    form.reset();
  });
})();

// Dark mode toggle, persisted in localStorage
(function themeToggle() {
  var btn = document.getElementById('theme-toggle');
  var saved = null;
  try { saved = localStorage.getItem('portfolio-theme'); } catch (e) {}
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  function sync() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (btn) btn.textContent = dark ? 'Light' : 'Dark';
  }
  sync();
  if (btn) btn.addEventListener('click', function () {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (dark) document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', 'dark');
    try { localStorage.setItem('portfolio-theme', dark ? 'light' : 'dark'); } catch (e) {}
    sync();
  });
})();

// Scroll reveal animations
(function reveal() {
  var items = document.querySelectorAll('.section, .project-card, .skill-card');
  items.forEach(function (el) { el.classList.add('reveal'); });
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();
