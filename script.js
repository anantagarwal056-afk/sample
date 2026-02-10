// script.js - stable production version (reveal + nav active + mobile menu + contact form)
document.addEventListener('DOMContentLoaded', function() {

  /* ---------------- IntersectionObserver reveal ---------------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px"
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // fallback scroll check (in case observer misses something)
  function revealOnScrollFallback() {
    document.querySelectorAll('.reveal:not(.show)').forEach(el => {
      const rectTop = el.getBoundingClientRect().top;
      if (rectTop < window.innerHeight - 100) {
        el.classList.add('show');
      }
    });
  }
  window.addEventListener('load', revealOnScrollFallback);
  window.addEventListener('scroll', revealOnScrollFallback);

  /* ---------------- Active nav link ---------------- */
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(a => {
    try {
      const href = a.getAttribute('href');
      // Normalize path, handle index.html as root
      if ((location.pathname.endsWith(href)) || (location.pathname === '/' && href === 'index.html') || (href === 'index.html' && location.pathname.includes('index.html'))) {
        a.classList.add('active');
      }
    } catch (err) { /* ignore */ }
  });

  /* ---------------- Mobile menu toggle ---------------- */
  const menuBtn = document.querySelector('.menu-toggle');
  const navContainer = document.querySelector('.navlinks');

  if (menuBtn && navContainer) {
    // Toggle menu on click/tap
    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      navContainer.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navContainer.contains(e.target) && !menuBtn.contains(e.target)) {
        navContainer.classList.remove('open');
      }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        navContainer.classList.remove('open');
      }
    });

    // Support keyboard accessibility: ESC closes menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') navContainer.classList.remove('open');
    });
  }

  /* ---------------- Contact form (open mail client) ---------------- */
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = this.querySelector('input[name="name"]').value.trim();
      const phone = this.querySelector('input[name="phone"]').value.trim();
      const msg = this.querySelector('textarea[name="message"]').value.trim();
      const emailTo = this.getAttribute('data-email') || 'your@email.com';

      if (!name || !phone || !msg) {
        alert('Please fill Name, Phone and Message.');
        return;
      }

      const subject = encodeURIComponent('Inquiry from Website - ' + name);
      const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\nMessage:\n${msg}`);
      window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    });
  }

}); // DOMContentLoaded end
