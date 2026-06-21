/* ========================================
   Mental Wellness Montclair — Script.js
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ----- Mobile Menu Toggle ----- */
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.header-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      this.classList.toggle('active');
      nav.classList.toggle('open');
    });

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  /* ----- Header Scroll Effect ----- */
  const header = document.querySelector('.header');

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  if (header) {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
  }

  /* ----- Smooth Scroll for Anchor Links ----- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ----- FAQ Accordion ----- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function () {
      const isActive = item.classList.contains('active');

      // Close all FAQ items
      faqItems.forEach(function (other) {
        other.classList.remove('active');
      });

      // Open clicked one if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* ----- IntersectionObserver for Scroll Reveal ----- */
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children'
  );

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ----- Animate counters (simple version) ----- */
  const counters = document.querySelectorAll('.stat-number');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'), 10) || 0;
            animateCounter(el, target);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  function animateCounter(el, target) {
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(start + (target - start) * eased);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  /* ----- Page Transition ----- */
  const transition = document.querySelector('.page-transition');

  if (transition) {
    // Fade out on page load (show content)
    transition.classList.remove('active');

    // Intercept internal links for smooth page transitions
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a');

      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Skip external links, hash links, and mailto/tel
      if (
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      // Same directory page transitions
      if (!href.endsWith('.html') && !href.match(/^\/?[^/]+$/)) return;

      e.preventDefault();
      transition.classList.add('active');

      setTimeout(function () {
        window.location.href = href;
      }, 400);
    });
  }
});
