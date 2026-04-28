/* ================================================
   RUBY LOGISTICS — Main JavaScript
   ================================================ */

(function () {
  'use strict';

  /* ---- PRELOADER ---- */
  const preloaderEl = document.getElementById('preloader');
  if (preloaderEl) {
    document.body.style.overflow = 'hidden';
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloaderEl.classList.add('hidden');
        document.body.style.overflow = '';
      }, 1800);
    });
    // Safety net
    setTimeout(() => { document.body.style.overflow = ''; }, 4500);
  }

  /* ---- PARTICLES ---- */
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 6 + 2;
      p.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 8}s;
        opacity: ${Math.random() * 0.5 + 0.1};
        background: ${Math.random() > 0.5 ? 'rgba(26,111,196,0.4)' : 'rgba(255,107,53,0.25)'};
      `;
      particlesContainer.appendChild(p);
    }
  }

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (navbar) {
      if (scrollY > 60) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
    const btt = document.getElementById('backToTop');
    if (btt) {
      scrollY > 400 ? btt.classList.add('visible') : btt.classList.remove('visible');
    }
  }, { passive: true });

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    document.querySelectorAll('.mob-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  }

  /* ---- ACTIVE NAV LINK BY PAGE ---- */
  (function setActiveNavByPage() {
    const currentPage = (document.body.dataset.page || 'home').toLowerCase();
    document.querySelectorAll('.nav-link, .mob-link').forEach(link => {
      const linkPage = (link.dataset.page || '').toLowerCase();
      if (linkPage === currentPage) link.classList.add('active');
      else link.classList.remove('active');
    });
  })();

  /* ---- MODAL ---- */
  const modal = document.getElementById('quoteModal');
  const closeBtn = document.getElementById('closeModal');
  const openTriggers = ['openModalNav', 'openModalHero', 'openModalMob', 'openModalCoverage', 'openModalCta', 'openModalFleet', 'openModalServices'];

  openTriggers.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => openModal());
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---- FORM SUBMISSION ---- */
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
      btn.style.background = 'linear-gradient(135deg, #2E7D32, #1B5E20)';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        form.reset();
        if (form.id === 'quoteForm') closeModal();
      }, 2500);
    });
  });

  /* ---- AOS (Animate on Scroll) ---- */
  const aosElements = document.querySelectorAll('[data-aos]');
  if ('IntersectionObserver' in window) {
    const aosObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.aosDelay) || 0;
          setTimeout(() => entry.target.classList.add('aos-animate'), delay);
          aosObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    aosElements.forEach(el => aosObserver.observe(el));
  } else {
    aosElements.forEach(el => el.classList.add('aos-animate'));
  }

  /* ---- HERO ANIMATIONS ---- */
  const heroAnimElements = document.querySelectorAll('.animate-fade-up');
  heroAnimElements.forEach(el => {
    const delay = parseInt(el.dataset.delay) || 0;
    setTimeout(() => el.classList.add('visible'), delay + 1900);
  });

  /* ---- COUNTER ANIMATIONS ---- */
  function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target.toLocaleString('en-IN');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start).toLocaleString('en-IN');
      }
    }, 16);
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target);
          animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter, .counter2').forEach(el => {
      counterObserver.observe(el);
    });
  }

  /* ---- SMOOTH SCROLL FOR HASH LINKS ON SAME PAGE ---- */
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      // Only intercept if it's a same-page hash link
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // If page loads with a hash, scroll to it after a tick (after preloader fades)
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 2100);
  }

  /* ---- BACK TO TOP ---- */
  const btt = document.getElementById('backToTop');
  if (btt) {
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- SERVICE CARD ICON MICRO-INTERACTION ---- */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = 'scale(1.15) rotate(-5deg)';
        icon.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)';
      }
    });
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.service-icon');
      if (icon) icon.style.transform = '';
    });
  });

  /* ---- STRENGTH ITEM HOVER EFFECT ---- */
  document.querySelectorAll('.strength-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const num = item.querySelector('.strength-num');
      if (num) {
        num.style.color = 'rgba(255,107,53,0.1)';
        num.style.transition = 'color 0.3s';
      }
    });
    item.addEventListener('mouseleave', () => {
      const num = item.querySelector('.strength-num');
      if (num) num.style.color = '';
    });
  });

  /* ---- TRUCK MARKER TOOLTIPS ---- */
  document.querySelectorAll('.truck-marker').forEach((marker, i) => {
    const trucks = ['MH 12 AB 4521', 'MH 04 FP 0317', 'MH 20 XY 1234', 'GJ 16 AY 6771', 'TN 01 BC 9988'];
    const status = ['En Route', 'At Depot', 'En Route', 'In Transit', 'Loading'];
    marker.style.cursor = 'pointer';
    marker.setAttribute('title', `${trucks[i] || 'Fleet Vehicle'} — ${status[i] || 'Active'}`);
  });

  /* ---- GLASSMORPHISM MOUSE EFFECT on Hero ---- */
  const heroSection = document.querySelector('.hero');
  if (heroSection && window.innerWidth > 768) {
    heroSection.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = heroSection.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      heroSection.style.setProperty('--mouse-x', `${x * 100}%`);
      heroSection.style.setProperty('--mouse-y', `${y * 100}%`);
    });
  }

  /* ---- TEAM CARD TILT (subtle) ---- */
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
  });

  /* ---- INDUSTRY CARD PARALLAX ---- */
  document.querySelectorAll('.industry-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const bg = card.querySelector('.industry-bg');
      if (bg) bg.style.transform = `scale(1.06) translate(${x * 12}px, ${y * 12}px)`;
    });
    card.addEventListener('mouseleave', () => {
      const bg = card.querySelector('.industry-bg');
      if (bg) bg.style.transform = '';
    });
  });

  /* ---- TYPED TEXT EFFECT — cycles only the last word (home page) ---- */
  const words = ['Faith.', 'Trust.', 'Excellence.', 'Faith.'];
  const faithSpan = document.querySelector('.title-faith');
  if (faithSpan) {
    let i = 0, charI = words[0].length, deleting = false;
    faithSpan.textContent = words[0];

    function typeEffect() {
      const current = words[i];
      if (!deleting) {
        faithSpan.textContent = current.slice(0, charI + 1);
        charI++;
        if (charI === current.length) {
          deleting = true;
          setTimeout(typeEffect, 2800);
          return;
        }
      } else {
        faithSpan.textContent = current.slice(0, charI - 1);
        charI--;
        if (charI === 0) {
          deleting = false;
          i = (i + 1) % words.length;
        }
      }
      setTimeout(typeEffect, deleting ? 55 : 110);
    }
    setTimeout(() => { deleting = true; faithSpan.classList.add('typing'); typeEffect(); }, 3200);
  }

  /* ---- COVERAGE STATE HOVER ---- */
  document.querySelectorAll('.coverage-state').forEach(state => {
    state.addEventListener('mouseenter', () => {
      const icon = state.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1.3)';
        icon.style.transition = 'transform 0.3s';
      }
    });
    state.addEventListener('mouseleave', () => {
      const icon = state.querySelector('i');
      if (icon) icon.style.transform = '';
    });
  });

  /* ---- SCROLL PROGRESS INDICATOR ---- */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px;
    background: linear-gradient(90deg, #1a6fc4, #FF6B35);
    z-index: 9999; width: 0; transition: width 0.1s;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });

  /* ---- LAZY LOAD IMAGES ---- */
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  /* ---- CONSOLE BRANDING ---- */
  console.log('%c🚛 RUBY LOGISTICS', 'color: #FF6B35; font-size: 24px; font-weight: 900;');
  console.log('%cWe Deliver Faith.', 'color: #1a6fc4; font-size: 16px; font-style: italic;');
  console.log('%cBuilt with excellence for Ruby Logistics | 2026', 'color: #999; font-size: 12px;');

})();
