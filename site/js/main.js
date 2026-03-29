/* Main JS — Hit Factory */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ---- Active nav link highlight ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { passive: true });

  /* ---- Mobile menu toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });

  // Close mobile menu on click outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });

  /* ---- Scroll reveal ---- */
  const revealElements = document.querySelectorAll(
    '.section-header, .about-hero-image, .about-text-block, .about-stats, .member-card, .gallery-item, .video-wrapper, .contact-card, .contact-description'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---- Load dynamic content from admin ---- */
  const galleryGrid = document.querySelector('.gallery-grid');
  // Detect actual CSS grid columns
  function getGridCols(container) {
    const style = getComputedStyle(container);
    return style.gridTemplateColumns.split(' ').length;
  }

  // Row patterns for 6-col grid (sum to 6)
  const PATTERNS_6 = [[4,2],[2,2,2],[3,3],[2,4],[2,2,2],[3,3],[4,2],[2,2,2]];

  function layoutGallery(container) {
    const items = Array.from(container.querySelectorAll('.gallery-item'));
    const count = items.length;
    if (!count) return;

    const cols = getGridCols(container);

    // On small grids (<=3 cols) — all items span 1, no JS layout needed
    if (cols <= 3) {
      items.forEach(el => el.style.gridColumn = '');
      return;
    }

    // 6-column layout with varied rows
    // Last row: 2 items (span 3 each) or 3 items (span 2 each)
    let lastRowSize = count <= 3 ? count : (count % 2 === 0 ? 2 : 3);
    const bodyCount = count - lastRowSize;

    const plan = [];
    let placed = 0;
    let patIdx = 0;
    while (placed < bodyCount) {
      const remaining = bodyCount - placed;
      if (remaining === 2) {
        plan.push(patIdx % 2 === 0 ? [4, 2] : [2, 4]);
        placed += 2;
      } else if (remaining === 3) {
        plan.push([2, 2, 2]);
        placed += 3;
      } else {
        const pat = PATTERNS_6[patIdx % PATTERNS_6.length];
        plan.push(pat);
        placed += pat.length;
        patIdx++;
      }
    }

    // Last row — equal widths filling all 6 cols
    const spanEach = Math.floor(cols / lastRowSize);
    plan.push(Array(lastRowSize).fill(spanEach));

    // Apply
    let idx = 0;
    for (const row of plan) {
      for (const span of row) {
        if (idx < count) {
          items[idx].style.gridColumn = 'span ' + span;
          idx++;
        }
      }
    }
  }

  async function loadDynamicContent() {
    try {
      const res = await fetch('/data/content.json?t=' + Date.now());
      if (!res.ok) return;
      const data = await res.json();

      // Dynamic gallery
      if (data.gallery && data.gallery.length > 0 && galleryGrid) {
        const filtered = data.gallery.filter(src => /^images\/[a-zA-Z0-9_.-]+\.(avif|jpg|jpeg|png|webp)$/.test(src));
        galleryGrid.innerHTML = filtered
          .map(src =>
            `<div class="gallery-item"><img src="/${src}" alt="Hit Factory live" loading="lazy"><div class="gallery-overlay"></div></div>`
          ).join('');
        layoutGallery(galleryGrid);
        initLightbox();
        galleryGrid.querySelectorAll('.gallery-item').forEach(el => {
          el.classList.add('reveal');
          revealObserver.observe(el);
        });
      } else if (galleryGrid) {
        layoutGallery(galleryGrid);
      }

      // Dynamic translations — override static HTML with admin-edited text
      if (data.translations) {
        const lang = document.documentElement.lang || 'en';
        const t = data.translations[lang];
        if (t) {
          document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.textContent = t[key];
          });
          // Update page title
          if (t['page.title']) document.title = t['page.title'];
        }
      }

      // Inject custom head/footer code
      if (data.customHeadCode) {
        const headEl = document.getElementById('custom-head-code');
        if (headEl) { headEl.outerHTML = data.customHeadCode; }
      }
      if (data.customFooterCode) {
        const footEl = document.getElementById('custom-footer-code');
        if (footEl) { footEl.outerHTML = data.customFooterCode; }
      }
    } catch (e) {
      // Fallback: layout static gallery items
      if (galleryGrid) layoutGallery(galleryGrid);
    }
  }

  loadDynamicContent();

  /* ---- Gallery lightbox ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  let currentIndex = 0;
  let galleryImages = [];

  function initLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    galleryImages = Array.from(items).map(item => item.querySelector('img').src);
    items.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
    });
  }

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  }

  // Init lightbox for HTML-default gallery items
  initLightbox();

  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
  document.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  /* ---- Lite YouTube embed (lazy load) ---- */
  document.querySelectorAll('.lite-youtube').forEach(el => {
    el.addEventListener('click', () => {
      const videoId = el.dataset.videoid;
      if (!videoId || videoId === 'YOUR_YOUTUBE_ID') {
        // No video ID set — do nothing
        return;
      }
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0&enablejsapi=1';
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.title = el.dataset.title || 'Video';
      iframe.id = 'yt-iframe';
      el.innerHTML = '';
      el.appendChild(iframe);
      el.classList.add('playing');
    });
  });

  /* ---- Pause YouTube on tab switch or out of viewport ---- */
  function postYTCommand(cmd) {
    const iframe = document.getElementById('yt-iframe');
    if (iframe) iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: cmd, args: [] }), '*');
  }

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) postYTCommand('pauseVideo');
  });

  // Pause when video scrolls out of viewport
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) postYTCommand('pauseVideo');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.lite-youtube').forEach(el => videoObserver.observe(el));

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
