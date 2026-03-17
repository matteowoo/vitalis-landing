// ============================================
// VITALIS HEALTH GROUP — Shared JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll-triggered Nav Background ---
  const nav = document.querySelector('.nav');
  if (nav) {
    const updateNav = () => {
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  // --- Active Nav Link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Reveal on Scroll ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // --- Accordion ---
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isActive = item.classList.contains('active');
      // Close all siblings
      item.parentElement.querySelectorAll('.accordion-item').forEach(sibling => {
        sibling.classList.remove('active');
      });
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- Contact Form Handler ---
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      console.log('Form submitted:', Object.fromEntries(data));
      form.style.display = 'none';
      const success = document.querySelector('#success-message');
      if (success) success.classList.remove('hidden');
    });
  }

});
