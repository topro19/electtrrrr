/* main.js — JDV Elektrotechniek */

/* ── Sticky nav shadow ── */
const nav = document.getElementById('main-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });
}

/* ── Mobile hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (nav && !nav.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}

/* ── Scroll-in animations (service cards, feature cards) ── */
const animateTargets = document.querySelectorAll('[data-aos], .service-card, .feature-card');
if (animateTargets.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings
        const siblings = [...entry.target.parentElement.querySelectorAll('.service-card, .feature-card, [data-aos]')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animateTargets.forEach(el => observer.observe(el));
}

/* ── Contact form functionality is now handled by the Formspree AJAX library in contact.html ── */

/* ── Smooth scroll for anchor links on same page ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Multi-Section Sliders ── */
function initSlider(containerId, dotClass, prevId, nextId) {
  const sliderTrack = document.getElementById(containerId);
  const container = sliderTrack ? sliderTrack.parentElement : null;
  const sliderDots = container ? container.querySelectorAll(`.${dotClass}`) : [];
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  if (!sliderTrack || !sliderDots.length) return;

  let currentIndex = 0;
  const totalSlides = sliderDots.length;

  function updateSlider(index) {
    currentIndex = index;
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    sliderDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  sliderDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      updateSlider(index);
      resetAutoSlide();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider(currentIndex);
      resetAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider(currentIndex);
      resetAutoSlide();
    });
  }

  // Auto slide
  let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider(currentIndex);
  }, 5000);

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider(currentIndex);
    }, 5000 + (Math.random() * 1000)); // slight jitter to avoid synchronization
  }
}

// Initialize all sliders
document.addEventListener('DOMContentLoaded', () => {
  initSlider('renovation-slider', 'slider-dot', 'prev-slide', 'next-slide');
  initSlider('telecom-slider', 'slider-dot', 'telecom-prev', 'telecom-next');
  initSlider('sustainability-slider', 'slider-dot', 'sustainability-prev', 'sustainability-next');
});
