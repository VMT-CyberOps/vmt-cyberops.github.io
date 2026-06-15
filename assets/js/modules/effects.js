window.VMT = window.VMT || {};

function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px',
  });

  revealElements.forEach((element) => observer.observe(element));
}

function initHeaderScrollState() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader);
}

function initMobileNavigation() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

function initCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (!yearElement) return;

  yearElement.textContent = new Date().getFullYear();
}

window.VMT.initEffects = function initEffects() {
  initRevealAnimations();
  initHeaderScrollState();
  initMobileNavigation();
  initCurrentYear();
};
