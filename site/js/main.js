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

  /* ---- Dynamic gallery from content.json ---- */
  const galleryGrid = document.querySelector('.gallery-grid');

  // Assign grid spans to fill 6-column grid without gaps
  function assignGridSpans(container) {
    const items = container.querySelectorAll('.gallery-item');
    const count = items.length;
    if (!count) return;

    // Reset all spans
    items.forEach(el => el.classList.remove('span-2', 'span-3', 'span-tall'));

    // Pattern: fill rows of 6 columns
    // Row patterns: [3,3], [2,2,2], [3,3] with occasional tall
    let col = 0;
    let rowType = 0;
    const patterns = [[3,3],[2,2,2],[3,3],[2,4],[4,2],[2,2,2]];

    for (let i = 0; i < count; i++) {
      if (col === 0) {
        // Pick pattern that fits remaining items
        const remaining = count - i;
        if (remaining >= 6) {
          rowType = i % patterns.length;
        } else if (remaining >= 4) {
          rowType = remaining === 4 ? 3 : (remaining === 5 ? 1 : 0);
        } else if (remaining === 3) {
          rowType = 0; // [3,3] — will only use first 3
        } else if (remaining === 2) {
          rowType = 0; // [3,3]
        } else {
          // 1 item left — span full row
          items[i].classList.add('span-3');
          items[i].classList.add('span-tall');
          break;
        }
      }

      const pattern = patterns[rowType % patterns.length];
      const spanIdx = Math.min(col, pattern.length - 1);
      let span = pattern[spanIdx] || 2;

      // Check if this is last item and doesn't fill the row
      const remaining = count - i;
      if (remaining === 1 && col > 0) {
        span = 6 - col; // Fill rest of row
      }

      if (span === 2) items[i].classList.add('span-2');
      else if (span === 3) items[i].classList.add('span-3');
      else if (span === 4) { items[i].classList.add('span-2'); items[i].style.gridColumn = 'span 4'; }

      col += span;
      if (col >= 6) col = 0;
    }

    // Add occasional tall items for variety
    if (count > 6) {
      const tallIdx = 5; // 6th item
      if (items[tallIdx]) items[tallIdx].classList.add('span-tall');
    }
  }

  async function loadGallery() {
    try {
      const res = await fetch('/data/content.json');
      if (!res.ok) throw new Error('no content.json');
      const data = await res.json();
      if (data.gallery && data.gallery.length > 0 && galleryGrid) {
        galleryGrid.innerHTML = data.gallery.map(src =>
          `<div class="gallery-item"><img src="/${src}" alt="Hit Factory live" loading="lazy"><div class="gallery-overlay"></div></div>`
        ).join('');
        assignGridSpans(galleryGrid);
        initLightbox();
        galleryGrid.querySelectorAll('.gallery-item').forEach(el => {
          el.classList.add('reveal');
          revealObserver.observe(el);
        });
      }
    } catch (e) {
      // Use HTML defaults, still assign spans
      if (galleryGrid) assignGridSpans(galleryGrid);
    }
  }

  loadGallery();

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
