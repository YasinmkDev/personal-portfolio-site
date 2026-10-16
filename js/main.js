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
