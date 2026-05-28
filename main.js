/* ════════════════════════════════════════════════════
   FALLA RAMIRO DE MAEZTU · ELS LLEONS — main.js v2
   Requires GSAP 3 + ScrollTrigger (loaded in HTML)
════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── GSAP REGISTER ──────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger);

  /* ── ACTIVE NAV LINK ────────────────────────────── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    if (a.getAttribute('href') === page || (page === '' && a.getAttribute('href') === 'index.html'))
      a.classList.add('active');
  });

  /* ── NAVBAR SCROLL ──────────────────────────────── */
  const nav = document.getElementById('siteNav');
  if (nav) {
    let lastY = 0, ticking = false;
    const updateNav = () => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 50);
      if (y > lastY + 12 && y > 200) nav.classList.add('hidden');
      else if (y < lastY - 5)        nav.classList.remove('hidden');
      lastY = y; ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(updateNav); ticking = true; }
    }, { passive: true });
  }

  /* ── HAMBURGER ──────────────────────────────────── */
  const btn    = document.getElementById('navHamburger');
  const drawer = document.getElementById('navDrawer');
  if (btn && drawer) {
    const toggle = open => {
      btn.classList.toggle('open', open);
      drawer.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    btn.addEventListener('click', () => toggle(!btn.classList.contains('open')));
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
  }

  /* ════════════════════════════════════════════════
     HOVER LIFT — TODAS LAS CARDS
     Sube al hacer hover, vuelve con rebote elástico
  ════════════════════════════════════════════════ */
  function addHoverLift(selector, liftY, scaleUp) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          y: liftY,
          scale: scaleUp || 1,
          duration: 0.35,
          ease: 'power2.out'
        });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: 'elastic.out(1, 0.45)'
        });
      });
    });
  }

  addHoverLift('.news-card',      -10, 1);
  addHoverLift('.media-card',     -8,  1);
  addHoverLift('.activity-card',  -8,  1);
  addHoverLift('.rep-card',       -8,  1);
  addHoverLift('.contact-item',   -4,  1);
  addHoverLift('.value-item',     -4,  1);
  addHoverLift('.poster-card',     0,  1.04);   /* posters: solo escala */
  addHoverLift('.sidebar-card',   -4,  1);

  /* ════════════════════════════════════════════════
     MAGNETIC BUTTONS
  ════════════════════════════════════════════════ */
  document.querySelectorAll('.magnet-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.30;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.30;
      gsap.to(btn, { x: dx, y: dy, duration: 0.35, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    });
  });

  /* ════════════════════════════════════════════════
     SCROLL REVEALS
  ════════════════════════════════════════════════ */
  gsap.utils.toArray('.gsap-reveal').forEach(el => {
    gsap.from(el, {
      y: 48, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' }
    });
  });

  gsap.utils.toArray('.gsap-stagger').forEach(container => {
    const items = container.querySelectorAll('.gsap-stagger-item');
    if (!items.length) return;
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.75, ease: 'power3.out', stagger: 0.10,
      scrollTrigger: { trigger: container, start: 'top 84%', toggleActions: 'play none none none' }
    });
  });

  gsap.utils.toArray('.gsap-left').forEach(el => {
    gsap.from(el, {
      x: -56, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' }
    });
  });

  gsap.utils.toArray('.gsap-right').forEach(el => {
    gsap.from(el, {
      x: 56, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' }
    });
  });

  /* ════════════════════════════════════════════════
     TIMELINE (si existe #timeline)
  ════════════════════════════════════════════════ */
  const timelineEl   = document.getElementById('timeline');
  const progressBar  = document.getElementById('timelineProgress');
  const tlItems      = document.querySelectorAll('[data-timeline-item]');

  if (timelineEl && progressBar && tlItems.length) {
    gsap.to(progressBar, {
      height: '100%', ease: 'none',
      scrollTrigger: { trigger: timelineEl, start: 'top 70%', end: 'bottom 70%', scrub: 0.6 }
    });
    tlItems.forEach((item, i) => {
      const content = item.querySelector('.timeline-content');
      if (content) {
        gsap.from(content, {
          x: i % 2 === 0 ? -52 : 52, opacity: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 78%', toggleActions: 'play none none none' }
        });
      }
      ScrollTrigger.create({
        trigger: item, start: 'top 65%',
        onEnter:     () => item.classList.add('is-active'),
        onLeaveBack: () => item.classList.remove('is-active'),
      });
    });
  }

  /* ════════════════════════════════════════════════
     COUNTERS con data-count
  ════════════════════════════════════════════════ */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const delay  = +(el.dataset.delay  || 0.8);
    const obj    = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 2.2, ease: 'power2.out', delay,
      onUpdate() { el.textContent = Math.round(obj.val) + suffix; }
    });
  });

  /* ════════════════════════════════════════════════
     HERO INTRO (solo index)
  ════════════════════════════════════════════════ */
  if (document.getElementById('heroTitle')) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const get = id => document.getElementById(id);
    if (get('heroEscudo'))   tl.from(get('heroEscudo'),   { y: 30, opacity: 0, duration: 1.0 });
    if (get('heroBadge'))    tl.from(get('heroBadge'),    { y: 20, opacity: 0, duration: 0.7 }, '-=0.45');
    if (get('heroTitle'))    tl.from(get('heroTitle'),    { y: 30, opacity: 0, duration: 0.9 }, '-=0.4');
    if (get('heroSubtitle')) tl.from(get('heroSubtitle'), { y: 20, opacity: 0, duration: 0.7 }, '-=0.5');
    if (get('heroStats'))    tl.from(get('heroStats'),    { y: 20, opacity: 0, duration: 0.7 }, '-=0.4');
    const btns = document.querySelectorAll('#heroActions a');
    if (btns.length) tl.from(btns, { y: 16, opacity: 0, duration: 0.6, stagger: 0.12 }, '-=0.35');
    if (get('heroScroll'))   tl.from(get('heroScroll'),   { opacity: 0, duration: 0.8 }, '-=0.2');
  }

  /* ════════════════════════════════════════════════
     PAGE HERO INTRO (páginas internas)
  ════════════════════════════════════════════════ */
  const ph = document.querySelector('.page-hero-title');
  if (ph) {
    const pl = document.querySelector('.page-hero-label');
    const pd = document.querySelector('.page-hero-desc');
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (pl) tl.from(pl, { y: 16, opacity: 0, duration: 0.6 });
    tl.from(ph, { y: 28, opacity: 0, duration: 0.85 }, pl ? '-=0.3' : '0');
    if (pd) tl.from(pd, { y: 16, opacity: 0, duration: 0.7 }, '-=0.4');
  }

  /* ════════════════════════════════════════════════
     PARALLAX HERO (solo index)
  ════════════════════════════════════════════════ */
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const stCfg = { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: true };
    const heroEscudo  = document.getElementById('heroEscudo');
    const heroContent = document.getElementById('heroContent');
    const heroGlow    = document.getElementById('heroGlow');
    if (heroEscudo)  gsap.to(heroEscudo,  { yPercent: -28, ease: 'none', scrollTrigger: { ...stCfg, scrub: 1.2 } });
    if (heroContent) gsap.to(heroContent, { yPercent:  18, ease: 'none', scrollTrigger: { ...stCfg, scrub: 1.8 } });
    if (heroGlow)    gsap.to(heroGlow,    { yPercent:  45, ease: 'none', scrollTrigger: { ...stCfg, scrub: 3   } });
  }

  /* ════════════════════════════════════════════════
     EMBER PARTICLES (solo index — canvas#ember-canvas)
  ════════════════════════════════════════════════ */
  const canvas = document.getElementById('ember-canvas');
  if (canvas) {
    const ctx    = canvas.getContext('2d');
    const COLORS = ['#FFBA08','#F48C06','#E85D04','#C1340A','#FF7B2B','#FFD54F'];

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    new ResizeObserver(resize).observe(canvas.parentElement);

    class Ember {
      constructor() { this.reset(true); }
      reset(init) {
        this.x       = Math.random() * canvas.width;
        this.y       = init ? Math.random() * canvas.height : canvas.height + 10;
        this.r       = Math.random() * 2.2 + 0.4;
        this.vy      = Math.random() * 1.1 + 0.4;
        this.vx      = (Math.random() - 0.5) * 0.5;
        this.color   = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.life    = 0;
        this.maxLife = Math.random() * 180 + 80;
        if (init) this.life = Math.random() * this.maxLife;
      }
      update() {
        this.x  += this.vx + Math.sin(this.life * 0.04) * 0.35;
        this.y  -= this.vy;
        this.life++;
        this.op = Math.max(0, (1 - this.life / this.maxLife) * 0.65);
        if (this.life >= this.maxLife || this.y < -10) this.reset(false);
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.op;
        ctx.fillStyle   = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur  = this.r * 5;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
    }

    const particles = Array.from({ length: 70 }, () => new Ember());
    let animId;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(loop);
    };
    document.addEventListener('visibilitychange', () =>
      document.hidden ? cancelAnimationFrame(animId) : loop()
    );
    loop();
  }

  /* ════════════════════════════════════════════════
     LIGHTBOX GENÉRICO (poster + rep cards)
  ════════════════════════════════════════════════ */
  const lb       = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightboxImg');
  const lbCap    = document.getElementById('lightboxCaption');
  const lbClose  = document.getElementById('lightboxClose');

  if (lb && lbImg) {
    const openLb = (src, alt, caption) => {
      lbImg.src = src; lbImg.alt = alt || '';
      if (lbCap) lbCap.textContent = caption || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };

    /* Poster cards */
    document.querySelectorAll('.poster-card').forEach(card => {
      card.addEventListener('click', () => openLb(card.dataset.src, card.dataset.alt, card.dataset.alt));
    });
    /* Rep cards */
    document.querySelectorAll('.rep-card[data-img]').forEach(card => {
      card.addEventListener('click', () => openLb(card.dataset.img, card.dataset.name, card.dataset.name + ' · ' + card.dataset.role));
    });

    if (lbClose) lbClose.addEventListener('click', closeLb);
    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
  }

})();
 // ─── Configuración ───────────────────────────────
    const DURATION = 4000; // Milisegundos entre slides (4000 = 4 seg)
    // ────────────────────────────────────────────────
 
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('dots');
    const counter = document.getElementById('counter');
    const progress = document.getElementById('progress');
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
 
    let current = 0;
    let playing = true;
    let timer = null;
 
    // Crear puntos dinámicamente según el número de slides
    slides.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Ir al slide ' + (i + 1));
      d.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(d);
    });
 
    // Actualiza puntos y contador
    function updateUI(idx) {
      dotsContainer.querySelectorAll('.dot').forEach((d, i) =>
        d.classList.toggle('active', i === idx)
      );
      counter.textContent = (idx + 1) + ' / ' + slides.length;
    }
 
    // Ir a un slide específico
    function goTo(idx) {
      if (idx === current) return;
      slides[current].classList.add('exit');
      slides[current].classList.remove('active');
      const prevIdx = current;
      setTimeout(() => slides[prevIdx].classList.remove('exit'), 620);
 
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add('active');
      updateUI(current);
 
      if (playing) startProgress();
    }
 
    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }
 
    // Barra de progreso animada
    function startProgress() {
      clearTimeout(timer);
      progress.style.transition = 'none';
      progress.style.width = '0%';
 
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progress.style.transition = 'width ' + DURATION + 'ms linear';
          progress.style.width = '100%';
        });
      });
 
      timer = setTimeout(nextSlide, DURATION);
    }
 
    function stopProgress() {
      clearTimeout(timer);
      progress.style.transition = 'none';
      progress.style.width = '0%';
    }
 
    // Play / Pausa
    function togglePlay() {
      playing = !playing;
      if (playing) {
        playIcon.className = 'ti ti-player-pause';
        playBtn.setAttribute('aria-label', 'Pausar');
        startProgress();
      } else {
        playIcon.className = 'ti ti-player-play';
        playBtn.setAttribute('aria-label', 'Reproducir');
        stopProgress();
      }
    }
 
    // Eventos
    document.getElementById('next').addEventListener('click', () => {
      nextSlide();
      if (playing) startProgress();
    });
 
    document.getElementById('prev').addEventListener('click', () => {
      prevSlide();
      if (playing) startProgress();
    });
 
    playBtn.addEventListener('click', togglePlay);
 
    // Pausa al pasar el ratón por encima
    document.getElementById('stage').addEventListener('mouseenter', () => {
      if (playing) stopProgress();
    });
    document.getElementById('stage').addEventListener('mouseleave', () => {
      if (playing) startProgress();
    });
 
    // Soporte táctil (swipe)
    let touchStartX = 0;
    document.getElementById('stage').addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    });
    document.getElementById('stage').addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        dx < 0 ? nextSlide() : prevSlide();
        if (playing) startProgress();
      }
    });
 
    // Iniciar
    updateUI(0);
    startProgress();
    
/* ════════════════════════════════════════════════════════
   PETARDS ENGINE — Falla Ramiro de Maeztu · Els Lleons
   Canvas fireworks + Web Audio synthesised cracker sounds
════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─── Canvas setup ─────────────────────────────────── */
  const cvs = document.createElement('canvas');
  cvs.id    = 'petards-canvas';
  document.body.appendChild(cvs);
  const ctx = cvs.getContext('2d');

  const resize = () => { cvs.width = window.innerWidth; cvs.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* ─── Colour palette (fire + festive) ──────────────── */
  const PALETTES = [
    ['#FFBA08','#FFD54F','#FFF176','#FFE082'],   // gold
    ['#F48C06','#FF7B2B','#FFBA08','#C1340A'],   // fire
    ['#E85D04','#FF4444','#FF8C00','#FFD700'],   // ember
    ['#00E5FF','#80D8FF','#FFFFFF','#B0E0FF'],   // icy blue
    ['#FF4FC8','#FF8AE2','#FFBA08','#FFFFFF'],   // pink burst
    ['#B9F70A','#FFFF00','#FFBA08','#FFFFFF'],   // lime-gold
  ];

  /* ─── Particle class ────────────────────────────────── */
  class Particle {
    constructor(x, y, color, angle, speed, type) {
      this.x  = x; this.y  = y; this.color = color;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.gravity = type === 'tail' ? 0.06 : 0.12;
      this.decay   = type === 'tail' ? 0.018 : (Math.random() * 0.014 + 0.012);
      this.radius  = type === 'tail' ? Math.random() * 1.5 + 0.5 : Math.random() * 3 + 1;
      this.friction = 0.975;
      this.tail    = type === 'tail';
      this.sparkle = Math.random() < 0.4; // some particles twinkle
      this.twinklePhase = Math.random() * Math.PI * 2;
    }
    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x  += this.vx;
      this.y  += this.vy;
      this.alpha -= this.decay;
      this.twinklePhase += 0.3;
    }
    draw() {
      const a = this.sparkle
        ? this.alpha * (0.6 + 0.4 * Math.abs(Math.sin(this.twinklePhase)))
        : this.alpha;
      ctx.save();
      ctx.globalAlpha = Math.max(0, a);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle   = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur  = this.radius * (this.tail ? 4 : 8);
      ctx.fill();
      ctx.restore();
    }
    get dead() { return this.alpha <= 0; }
  }

  /* ─── Firework class ────────────────────────────────── */
  class Firework {
    constructor(x, y) {
      this.x = x; this.y = y;
      this.palette  = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      this.particles = [];
      this.done = false;
      this._burst();
    }
    _burst() {
      const count  = Math.floor(Math.random() * 60 + 80);
      const type   = Math.random();

      for (let i = 0; i < count; i++) {
        let angle, speed;
        if (type < 0.35) {
          // Radial burst
          angle = (i / count) * Math.PI * 2;
          speed = Math.random() * 5 + 3;
        } else if (type < 0.65) {
          // Random scatter
          angle = Math.random() * Math.PI * 2;
          speed = Math.random() * 7 + 2;
        } else {
          // Ring pattern
          angle = (i / count) * Math.PI * 2;
          speed = 5 + (i % 3) * 1.5;
        }
        const color = this.palette[Math.floor(Math.random() * this.palette.length)];
        this.particles.push(new Particle(this.x, this.y, color, angle, speed, 'burst'));
      }

      // Trailing sparkles
      const tailCount = Math.floor(Math.random() * 20 + 15);
      for (let i = 0; i < tailCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 0.5;
        const color = '#FFFFFF';
        this.particles.push(new Particle(this.x, this.y, color, angle, speed, 'tail'));
      }
    }
    update() {
      this.particles = this.particles.filter(p => !p.dead);
      this.particles.forEach(p => p.update());
      if (!this.particles.length) this.done = true;
    }
    draw() { this.particles.forEach(p => p.draw()); }
  }

  /* ─── Rocket (ascending trail) ──────────────────────── */
  class Rocket {
    constructor() {
      const margin = window.innerWidth * 0.15;
      this.x    = margin + Math.random() * (window.innerWidth  - margin * 2);
      this.y    = window.innerHeight + 10;
      this.tx   = this.x + (Math.random() - 0.5) * 120;
      this.ty   = window.innerHeight * (0.10 + Math.random() * 0.40);
      this.speed = Math.random() * 5 + 8;
      this.trail = [];
      this.done  = false;
      this.exploded = false;
      const pal = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      this.color = pal[0];
    }
    update(fireworks) {
      if (this.exploded) { this.done = true; return; }
      const dx  = this.tx - this.x;
      const dy  = this.ty - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist < this.speed) {
        // Arrived — explode!
        fireworks.push(new Firework(this.x, this.y));
        playCracker();
        this.exploded = true;
        return;
      }

      const nx = dx / dist;
      const ny = dy / dist;
      this.x += nx * this.speed;
      this.y += ny * this.speed;

      this.trail.push({ x: this.x, y: this.y, alpha: 1 });
      if (this.trail.length > 14) this.trail.shift();
    }
    draw() {
      this.trail.forEach((pt, i) => {
        const a = (i / this.trail.length) * 0.7;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        ctx.fillStyle   = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur  = 8;
        ctx.fill();
        ctx.restore();
      });
    }
  }

  /* ─── Web Audio cracker sound ───────────────────────── */
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch(e) { return null; }
    }
    return audioCtx;
  }

  function playCracker() {
    const ac = getAudioCtx();
    if (!ac) return;

    /* ── KEY FIX: browsers start AudioContext suspended.
       Always resume before playing — works even mid-auto-animation. ── */
    const doPlay = () => {
      const now = ac.currentTime;
      const TYPES = ['sharp', 'soft', 'whistle'];
      const type  = TYPES[Math.floor(Math.random() * TYPES.length)];

      if (type === 'sharp') {
        // Sharp crack — white-noise burst
        const bufLen = ac.sampleRate * 0.18;
        const buf    = ac.createBuffer(1, bufLen, ac.sampleRate);
        const data   = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++)
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 2.8);

        const src = ac.createBufferSource();
        src.buffer = buf;

        const gain = ac.createGain();
        gain.gain.setValueAtTime(0.55 + Math.random() * 0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        const bpf = ac.createBiquadFilter();
        bpf.type = 'bandpass';
        bpf.frequency.value = 1800 + Math.random() * 1200;
        bpf.Q.value = 0.5;

        src.connect(bpf); bpf.connect(gain); gain.connect(ac.destination);
        src.start(now); src.stop(now + 0.22);

      } else if (type === 'soft') {
        // Softer boom — low freq + decay
        const osc  = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120 + Math.random() * 80, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
        gain.gain.setValueAtTime(0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain); gain.connect(ac.destination);
        osc.start(now); osc.stop(now + 0.5);

        // Layer noise on top
        const bufLen = ac.sampleRate * 0.12;
        const buf    = ac.createBuffer(1, bufLen, ac.sampleRate);
        const nd     = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) nd[i] = (Math.random() * 2 - 1) * (1 - i / bufLen);
        const nsrc  = ac.createBufferSource();
        nsrc.buffer = buf;
        const ngain = ac.createGain();
        ngain.gain.setValueAtTime(0.25, now);
        ngain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        nsrc.connect(ngain); ngain.connect(ac.destination);
        nsrc.start(now); nsrc.stop(now + 0.15);

      } else {
        // Whistle + pop — rising tone + sharp hit
        const osc  = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(2200, now + 0.25);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.connect(gain); gain.connect(ac.destination);
        osc.start(now); osc.stop(now + 0.3);

        // Pop at the end
        const popDelay = 0.24;
        const bufLen2  = ac.sampleRate * 0.1;
        const buf2     = ac.createBuffer(1, bufLen2, ac.sampleRate);
        const pd2      = buf2.getChannelData(0);
        for (let i = 0; i < bufLen2; i++) pd2[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen2, 3);
        const psrc  = ac.createBufferSource();
        psrc.buffer = buf2;
        const pgain = ac.createGain();
        pgain.gain.setValueAtTime(0.5, now + popDelay);
        pgain.gain.exponentialRampToValueAtTime(0.001, now + popDelay + 0.1);
        psrc.connect(pgain); pgain.connect(ac.destination);
        psrc.start(now + popDelay); psrc.stop(now + popDelay + 0.15);
      }
    };

    if (ac.state === 'suspended') {
      ac.resume().then(doPlay).catch(() => {});
    } else {
      doPlay();
    }
  }

  /* ─── Main loop ─────────────────────────────────────── */
  let rockets   = [];
  let fireworks = [];
  let animId;

  const loop = () => {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    rockets.forEach(r => { r.update(fireworks); r.draw(); });
    fireworks.forEach(f => { f.update(); f.draw(); });
    rockets   = rockets.filter(r => !r.done);
    fireworks = fireworks.filter(f => !f.done);
    animId = requestAnimationFrame(loop);
  };
  document.addEventListener('visibilitychange', () =>
    document.hidden ? cancelAnimationFrame(animId) : loop()
  );
  loop();

  /* ─── Launch a rocket ───────────────────────────────── */
  function launchRocket() {
    rockets.push(new Rocket());
  }

  /* ─── Auto-launch scheduler ──────────────────────────── */
  let autoTimer = null;

  function scheduleNext() {
    const delay = 3500 + Math.random() * 5000; // 3.5–8.5 s
    autoTimer = setTimeout(() => {
      launchRocket();
      // Sometimes launch 2 in quick succession
      if (Math.random() < 0.3) {
        setTimeout(launchRocket, 400 + Math.random() * 600);
      }
      scheduleNext();
    }, delay);
  }

  scheduleNext();

  /* ─── Manual trigger button ─────────────────────────── */
  const btn = document.createElement('button');
  btn.id          = 'petard-btn';
  btn.title       = 'Llança petards!';
  btn.innerHTML   = '🎆';
  btn.setAttribute('aria-label', 'Llança petards');
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    // Unlock + resume audio context on user interaction
    const ac = getAudioCtx();
    if (ac && ac.state === 'suspended') ac.resume().catch(() => {});
    // Salvo of 3–5 rockets
    const n = Math.floor(Math.random() * 3 + 3);
    for (let i = 0; i < n; i++) {
      setTimeout(launchRocket, i * 280);
    }
  });

  /* ─── Click anywhere fires a petard from that spot ─── */
  document.addEventListener('click', e => {
    // Ignore clicks on the btn itself or interactive elements
    if (e.target.closest('#petard-btn, a, button, input, textarea, select, label, .lightbox')) return;
    const ac = getAudioCtx();
    if (ac && ac.state === 'suspended') ac.resume().catch(() => {});
    // Direct explosion at click point (no rocket)
    fireworks.push(new Firework(e.clientX, e.clientY));
    playCracker();
  });

})();
