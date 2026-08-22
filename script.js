/* =========================================================
   HARI GROOMING STUDIO — script.js
   Organized so localStorage can later be swapped for a
   real backend without touching the UI code:
     createBooking(), getBookings(), updateBooking(),
     cancelBooking(), getAvailableSlots()
========================================================= */

/* =========================================================
   0. STATIC DATA (editable) — falls back to localStorage
      overrides made from the Studio Partner dashboard
========================================================= */
const DEFAULT_SERVICES = [
  { id: 'classic-haircut', name: 'Classic Haircut', desc: 'Timeless scissor & clipper cut, tailored to your face shape.', price: 250, duration: 30, icon: 'fa-scissors', enabled: true },
  { id: 'premium-haircut', name: 'Premium Haircut', desc: 'Precision fade or design cut with wash and premium styling.', price: 450, duration: 45, icon: 'fa-crown', enabled: true },
  { id: 'beard-trim', name: 'Beard Trim', desc: 'Sharp beard shaping and line-up with hot towel prep.', price: 150, duration: 20, icon: 'fa-user-tie', enabled: true },
  { id: 'hair-beard', name: 'Hair + Beard', desc: 'Our most popular combo — full haircut and beard grooming.', price: 350, duration: 45, icon: 'fa-star', enabled: true },
  { id: 'hair-styling', name: 'Hair Styling', desc: 'Wash, blow-dry and styling with premium products.', price: 200, duration: 25, icon: 'fa-wind', enabled: true },
  { id: 'kids-haircut', name: 'Kids Haircut', desc: 'Gentle, patient haircuts for young gentlemen aged 12 and under.', price: 180, duration: 25, icon: 'fa-child', enabled: true },
  { id: 'head-massage', name: 'Head Massage', desc: 'Relaxing scalp and head massage with warm oils.', price: 300, duration: 30, icon: 'fa-spa', enabled: true },
  { id: 'premium-grooming', name: 'Premium Grooming', desc: 'Haircut, beard, hot towel shave, face massage & styling.', price: 600, duration: 60, icon: 'fa-gem', enabled: true }
];

const DEFAULT_BARBERS = [
  { id: 'hari-rathod', name: 'Hari Rathod', role: 'Founder & Master Barber', exp: '14+ Years', spec: 'Classic Cuts & Razor Shaves', rating: 5, available: true, img: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=800&auto=format&fit=crop' },
  { id: 'rohan-verma', name: 'Rohan Verma', role: 'Senior Barber', exp: '9+ Years', spec: 'Skin Fades & Modern Styling', rating: 5, available: true, img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop' },
  { id: 'karan-sharma', role: 'Style Specialist', name: 'Karan Sharma', exp: '7+ Years', spec: 'Beard Sculpting & Design', rating: 4, available: true, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop' },
  { id: 'aditya-nair', name: 'Aditya Nair', role: 'Grooming Expert', exp: '6+ Years', spec: 'Hot Towel Shaves & Facials', rating: 5, available: true, img: 'https://images.unsplash.com/photo-1506634572416-48cdfe530110?q=80&w=800&auto=format&fit=crop' }
];

const GALLERY = [
  { img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=900&auto=format&fit=crop', title: 'Precision Fade', cat: 'Haircuts', cls: 'tall' },
  { img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=900&auto=format&fit=crop', title: 'Beard Sculpting', cat: 'Beard Styling', cls: '' },
  { img: 'https://images.unsplash.com/photo-1521490878406-4d6cb6e4ec13?q=80&w=900&auto=format&fit=crop', title: 'Studio Interior', cat: 'Our Space', cls: 'wide' },
  { img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=900&auto=format&fit=crop', title: 'Barber Station', cat: 'Our Space', cls: '' },
  { img: 'https://images.unsplash.com/photo-1587909209111-5097ee578ec3?q=80&w=900&auto=format&fit=crop', title: 'Hot Towel Ritual', cat: 'Grooming', cls: '' },
  { img: 'https://images.unsplash.com/photo-1519958436657-4b7d6362e0e5?q=80&w=900&auto=format&fit=crop', title: 'Barber At Work', cat: 'Craft', cls: 'tall' },
  { img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?q=80&w=900&auto=format&fit=crop', title: 'Clean Line-Up', cat: 'Haircuts', cls: '' },
  { img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=900&auto=format&fit=crop', title: 'Modern Style', cat: 'Styling', cls: '' }
];

const TESTIMONIALS = [
  { name: 'Vikram Singh', role: 'Regular Client', rating: 5, text: 'Best barber shop in Coimbatore, hands down. The fade was razor sharp and the vibe is genuinely premium.', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Aman Gupta', role: 'First-time Visitor', rating: 5, text: 'Booked online in seconds and was seen right on time. Clean, professional and exactly what I asked for.', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Rahul Kapoor', role: 'Monthly Member', rating: 4, text: 'Consistently great haircuts every visit. The head massage add-on is unreal after a long week.', img: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { name: 'Sameer Khan', role: 'Regular Client', rating: 5, text: 'The premium grooming package is worth every rupee. Hot towel shave felt like a five-star spa treatment.', img: 'https://randomuser.me/api/portraits/men/67.jpg' },
  { name: 'Nikhil Joshi', role: 'Regular Client', rating: 5, text: 'Professional, punctual and genuinely talented barbers. My go-to place for every haircut, no exceptions.', img: 'https://randomuser.me/api/portraits/men/78.jpg' }
];

const TIME_SLOTS = {
  'Morning': ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'],
  'Evening': ['16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00']
};

/* =========================================================
   1. STORAGE HELPERS (localStorage — swap for API later)
========================================================= */
const LS_KEYS = {
  bookings: 'hgs_bookings',
  services: 'hgs_services',
  barbers: 'hgs_barbers',
  settings: 'hgs_settings',
  seeded: 'hgs_seeded'
};

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function writeLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.warn('localStorage write failed', e); }
}

/* ---- Services store ---- */
function getServices() { return readLS(LS_KEYS.services, DEFAULT_SERVICES); }
function saveServices(list) { writeLS(LS_KEYS.services, list); }
function updateService(id, changes) {
  const list = getServices().map(s => s.id === id ? { ...s, ...changes } : s);
  saveServices(list);
  return list;
}

/* ---- Barbers store ---- */
function getBarbers() { return readLS(LS_KEYS.barbers, DEFAULT_BARBERS); }
function saveBarbers(list) { writeLS(LS_KEYS.barbers, list); }
function updateBarber(id, changes) {
  const list = getBarbers().map(b => b.id === id ? { ...b, ...changes } : b);
  saveBarbers(list);
  return list;
}

/* =========================================================
   2. BOOKING FUNCTIONS (future-backend-ready)
========================================================= */
function createBooking(data) {
  const bookings = getBookings();
  const booking = {
    id: 'HGS-' + Date.now().toString().slice(-6),
    status: 'confirmed', // confirmed | completed | cancelled
    createdAt: new Date().toISOString(),
    ...data
  };
  bookings.push(booking);
  writeLS(LS_KEYS.bookings, bookings);
  return booking;
}

function getBookings() {
  return readLS(LS_KEYS.bookings, []);
}

function updateBooking(id, changes) {
  const bookings = getBookings().map(b => b.id === id ? { ...b, ...changes } : b);
  writeLS(LS_KEYS.bookings, bookings);
  return bookings.find(b => b.id === id);
}

function cancelBooking(id) {
  return updateBooking(id, { status: 'cancelled' });
}

function getAvailableSlots(barberId, dateStr) {
  const bookings = getBookings();
  const takenByBarber = bookings
    .filter(b => b.date === dateStr && b.status !== 'cancelled' && (barberId === 'any' || b.barberId === barberId || b.barberId === 'any'))
    .map(b => b.time);
  const allSlots = [...TIME_SLOTS['Morning'], ...TIME_SLOTS['Evening']];
  return allSlots.filter(t => !takenByBarber.includes(t));
}

function isSlotBooked(barberId, dateStr, time) {
  const bookings = getBookings();
  return bookings.some(b => b.date === dateStr && b.time === time && b.status !== 'cancelled' && (b.barberId === barberId || b.barberId === 'any' || barberId === 'any'));
}

/* Seed a handful of demo bookings on first run so the time-slot
   grid, partner dashboard and calendar aren't empty out of the box. */
function seedDemoDataIfNeeded() {
  if (readLS(LS_KEYS.seeded, false)) return;
  const today = new Date();
  const fmt = (d) => d.toISOString().split('T')[0];
  const barbers = getBarbers();
  const services = getServices();
  const demo = [
    { name: 'Deepak Ramesh', phone: '9876500001', serviceId: services[3].id, service: services[3].name, price: services[3].price, barberId: barbers[0].id, barber: barbers[0].name, date: fmt(today), time: '11:00', duration: services[3].duration, status: 'confirmed', message: '' },
    { name: 'Suresh Iyer', phone: '9876500002', serviceId: services[0].id, service: services[0].name, price: services[0].price, barberId: barbers[1].id, barber: barbers[1].name, date: fmt(today), time: '17:00', duration: services[0].duration, status: 'confirmed', message: '' },
    { name: 'Manoj Kumar', phone: '9876500003', serviceId: services[7].id, service: services[7].name, price: services[7].price, barberId: barbers[0].id, barber: barbers[0].name, date: fmt(new Date(today.getTime() - 86400000)), time: '12:00', duration: services[7].duration, status: 'completed', message: '' },
    { name: 'Praveen Raj', phone: '9876500004', serviceId: services[2].id, service: services[2].name, price: services[2].price, barberId: barbers[2].id, barber: barbers[2].name, date: fmt(new Date(today.getTime() + 86400000)), time: '18:30', duration: services[2].duration, status: 'confirmed', message: '' },
    { name: 'Ganesh Babu', phone: '9876500005', serviceId: services[1].id, service: services[1].name, price: services[1].price, barberId: barbers[3].id, barber: barbers[3].name, date: fmt(new Date(today.getTime() - 2 * 86400000)), time: '16:00', duration: services[1].duration, status: 'cancelled', message: '' }
  ];
  demo.forEach(d => createBooking(d));
  writeLS(LS_KEYS.seeded, true);
}

/* =========================================================
   3. UTILITIES
========================================================= */
function todayStr() { return new Date().toISOString().split('T')[0]; }
function formatDateLong(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function formatDateShort(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}
function formatTime12(timeStr) {
  const [h, m] = timeStr.split(':');
  const d = new Date(); d.setHours(+h, +m);
  return d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* =========================================================
   MAIN
========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  seedDemoDataIfNeeded();

  /* ---------------------------------------------------
     LOADER
  --------------------------------------------------- */
  const loader = document.getElementById('loader');
  setTimeout(() => loader && loader.classList.add('hide'), 1500);

  /* ---------------------------------------------------
     HERO PARTICLES
  --------------------------------------------------- */
  const particlesWrap = document.getElementById('heroParticles');
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('span');
    p.className = 'hero-particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    p.style.animationDuration = (8 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = (0.3 + Math.random() * 0.4).toFixed(2);
    particlesWrap.appendChild(p);
  }

  /* ---------------------------------------------------
     MODE SWITCH — CUSTOMER / STUDIO PARTNER
  --------------------------------------------------- */
  const customerApp = document.getElementById('customerApp');
  const partnerApp = document.getElementById('partnerApp');
  const modeCustomerBtn = document.getElementById('modeCustomerBtn');
  const modePartnerBtn = document.getElementById('modePartnerBtn');
  const exitPartnerBtn = document.getElementById('exitPartnerBtn');

  function setMode(mode) {
    if (mode === 'partner') {
      customerApp.classList.add('hidden');
      partnerApp.classList.remove('hidden');
      modeCustomerBtn.classList.remove('active');
      modePartnerBtn.classList.add('active');
      renderPartnerDashboard();
      window.scrollTo(0, 0);
    } else {
      partnerApp.classList.add('hidden');
      customerApp.classList.remove('hidden');
      modePartnerBtn.classList.remove('active');
      modeCustomerBtn.classList.add('active');
      window.scrollTo(0, 0);
    }
  }
  modeCustomerBtn.addEventListener('click', () => setMode('customer'));
  modePartnerBtn.addEventListener('click', () => setMode('partner'));
  exitPartnerBtn.addEventListener('click', () => setMode('customer'));

  /* ---------------------------------------------------
     RENDER: SERVICES (customer landing grid)
  --------------------------------------------------- */
  const servicesGrid = document.getElementById('servicesGrid');
  function renderServiceCards() {
    servicesGrid.innerHTML = '';
    getServices().filter(s => s.enabled !== false).forEach((s, i) => {
      const card = document.createElement('div');
      card.className = 'service-card reveal';
      card.style.transitionDelay = (i % 4) * 80 + 'ms';
      card.innerHTML = `
        <div class="service-icon"><i class="fa-solid ${s.icon}"></i></div>
        <h3>${escapeHtml(s.name)}</h3>
        <p class="service-desc">${escapeHtml(s.desc)}</p>
        <div class="service-meta">
          <span class="service-price">₹${s.price}</span>
          <span class="service-duration"><i class="fa-regular fa-clock"></i> ${s.duration} mins</span>
        </div>
        <a href="#booking" class="service-book-btn" data-service="${s.id}">Book Now</a>
      `;
      servicesGrid.appendChild(card);
    });
  }
  renderServiceCards();
  servicesGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.service-book-btn');
    if (!btn) return;
    wizardState.serviceId = btn.dataset.service;
    goToStep(1);
    renderWizardStep();
  });

  /* ---------------------------------------------------
     RENDER: BARBERS (customer landing grid)
  --------------------------------------------------- */
  const barbersGrid = document.getElementById('barbersGrid');
  function renderBarberCards() {
    barbersGrid.innerHTML = '';
    getBarbers().forEach((b, i) => {
      const card = document.createElement('div');
      card.className = 'barber-card reveal';
      card.style.transitionDelay = (i % 4) * 80 + 'ms';
      card.innerHTML = `
        <div class="barber-photo">
          <img src="${b.img}" alt="${escapeHtml(b.name)}, ${escapeHtml(b.role)} at Hari Grooming Studio" loading="lazy">
          <div class="barber-social">
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>
        <div class="barber-info">
          <h3>${escapeHtml(b.name)}</h3>
          <p class="barber-role">${escapeHtml(b.role)}</p>
          <p class="barber-exp"><i class="fa-regular fa-clock"></i> ${escapeHtml(b.exp)} Experience</p>
          <p class="barber-spec"><i class="fa-solid fa-scissors"></i> ${escapeHtml(b.spec)}</p>
          <p class="barber-rating">${'★'.repeat(b.rating)}${'☆'.repeat(5 - b.rating)}</p>
        </div>
      `;
      barbersGrid.appendChild(card);
    });
  }
  renderBarberCards();

  /* ---------------------------------------------------
     RENDER: GALLERY + LIGHTBOX
  --------------------------------------------------- */
  const galleryGrid = document.getElementById('galleryGrid');
  GALLERY.forEach((g, i) => {
    const item = document.createElement('div');
    item.className = `gallery-item reveal ${g.cls}`.trim();
    item.style.transitionDelay = (i % 4) * 70 + 'ms';
    item.dataset.index = i;
    item.innerHTML = `
      <img src="${g.img}" alt="${escapeHtml(g.title)} — ${escapeHtml(g.cat)} at Hari Grooming Studio" loading="lazy"
           onerror="this.closest('.gallery-item').style.display='none'">
      <span class="gallery-zoom"><i class="fa-solid fa-expand"></i></span>
      <div class="gallery-overlay"><span>${escapeHtml(g.cat)}</span><h4>${escapeHtml(g.title)}</h4></div>
    `;
    galleryGrid.appendChild(item);
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let currentGalleryIndex = 0;
  function openLightbox(index) { currentGalleryIndex = index; updateLightbox(); lightbox.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function updateLightbox() { const g = GALLERY[currentGalleryIndex]; lightboxImg.src = g.img; lightboxImg.alt = g.title; lightboxCaption.textContent = `${g.title} — ${g.cat}`; }
  function closeLightbox() { lightbox.classList.remove('active'); document.body.style.overflow = ''; }
  galleryGrid.addEventListener('click', (e) => { const item = e.target.closest('.gallery-item'); if (item) openLightbox(parseInt(item.dataset.index, 10)); });
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxNext').addEventListener('click', () => { currentGalleryIndex = (currentGalleryIndex + 1) % GALLERY.length; updateLightbox(); });
  document.getElementById('lightboxPrev').addEventListener('click', () => { currentGalleryIndex = (currentGalleryIndex - 1 + GALLERY.length) % GALLERY.length; updateLightbox(); });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
    if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
  });

  /* ---------------------------------------------------
     RENDER: TESTIMONIALS SLIDER
  --------------------------------------------------- */
  const track = document.getElementById('testimonialsTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  TESTIMONIALS.forEach(t => {
    const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="testimonial-stars">${stars}</div>
      <p class="testimonial-text">"${escapeHtml(t.text)}"</p>
      <div class="testimonial-author">
        <img src="${t.img}" alt="${escapeHtml(t.name)}" loading="lazy">
        <div><h5>${escapeHtml(t.name)}</h5><span>${escapeHtml(t.role)}</span></div>
      </div>`;
    track.appendChild(card);
  });
  function getPerView() { return window.innerWidth <= 720 ? 1 : window.innerWidth <= 960 ? 2 : 3; }
  let testimonialIndex = 0;
  function maxIndex() { return Math.max(0, TESTIMONIALS.length - getPerView()); }
  function renderDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= maxIndex(); i++) {
      const dot = document.createElement('button');
      dot.className = i === testimonialIndex ? 'active' : '';
      dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
      dot.addEventListener('click', () => { testimonialIndex = i; updateSlider(); });
      dotsWrap.appendChild(dot);
    }
  }
  function updateSlider() {
    if (testimonialIndex > maxIndex()) testimonialIndex = maxIndex();
    const cardWidth = track.children[0] ? track.children[0].getBoundingClientRect().width + 24 : 0;
    track.style.transform = `translateX(-${testimonialIndex * cardWidth}px)`;
    [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === testimonialIndex));
  }
  renderDots(); updateSlider();
  setInterval(() => { testimonialIndex = testimonialIndex >= maxIndex() ? 0 : testimonialIndex + 1; updateSlider(); }, 5000);
  window.addEventListener('resize', () => { renderDots(); updateSlider(); });

  /* ---------------------------------------------------
     HEADER SCROLL / ACTIVE NAV / BACK TO TOP
  --------------------------------------------------- */
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('#customerApp section[id]');
  const backToTop = document.getElementById('backToTop');
  function onScroll() {
    if (partnerApp.classList.contains('hidden')) {
      header.classList.toggle('scrolled', window.scrollY > 40);
      backToTop.classList.toggle('show', window.scrollY > 500);
      let current = '';
      sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 130) current = sec.id; });
      navLinks.forEach(link => link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`));
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------------------------------------------------
     MOBILE HAMBURGER MENU
  --------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  function closeMenu() { hamburger.classList.remove('open'); mainNav.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('.main-nav .nav-link, .nav-cta').forEach(link => link.addEventListener('click', closeMenu));

  /* ---------------------------------------------------
     SCROLL REVEAL
  --------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------
     HERO STAT COUNTERS
  --------------------------------------------------- */
  function animateCounters(container) {
    container.querySelectorAll('.stat-num, .pc-num').forEach(el => {
      const target = parseFloat(el.dataset.count);
      if (Number.isNaN(target)) return;
      const isDecimal = !Number.isInteger(target);
      const duration = 1400;
      const startTime = performance.now();
      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value).toLocaleString('en-IN');
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString('en-IN');
      }
      requestAnimationFrame(tick);
    });
  }
  setTimeout(() => animateCounters(document), 500);

  document.getElementById('year').textContent = new Date().getFullYear();

  /* =========================================================
     BOOKING WIZARD
  ========================================================= */
  const wizardState = { serviceId: null, barberId: null, date: null, time: null, name: '', phone: '', message: '' };
  let currentStep = 1;
  const TOTAL_STEPS = 3; // Step 1: Service + Barber · Step 2: Date + Time · Step 3: Details + Confirm

  const wizardStepsEls = document.querySelectorAll('.wizard-step');
  const wizardPanels = document.querySelectorAll('.wizard-panel');
  const wizardBackBtn = document.getElementById('wizardBackBtn');
  const wizardNextBtn = document.getElementById('wizardNextBtn');
  const wizardLineFills = document.querySelectorAll('.wizard-line-fill');

  function goToStep(n) {
    currentStep = n;
    wizardStepsEls.forEach(el => {
      const s = parseInt(el.dataset.step, 10);
      el.classList.toggle('active', s === n);
      el.classList.toggle('done', s < n);
    });
    // Animate the connecting line filling in as the user progresses
    wizardLineFills.forEach((fill, i) => { fill.style.width = (i < n - 1) ? '100%' : '0%'; });

    wizardPanels.forEach(el => el.classList.toggle('active', parseInt(el.dataset.panel, 10) === n));
    wizardBackBtn.disabled = n === 1;
    wizardNextBtn.style.display = n === TOTAL_STEPS ? 'none' : 'inline-flex';
    document.getElementById('confirmBookingBtn').style.display = n === TOTAL_STEPS ? 'inline-flex' : 'none';
    renderWizardStep();
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderWizardStep() {
    if (currentStep === 1) { renderServiceStep(); renderBarberStep(); }
    if (currentStep === 2) { renderDateStep(); renderTimeStep(); }
    if (currentStep === 3) { renderSummaryStep(); }
  }

  /* Stagger helper: fades grid items in one after another */
  function applyStagger(container, selector) {
    container.querySelectorAll(selector).forEach((el, i) => {
      el.style.animationDelay = (i * 55) + 'ms';
      el.classList.add('stagger-in');
    });
  }

  function renderServiceStep() {
    const grid = document.getElementById('wizardServiceGrid');
    grid.innerHTML = '';
    getServices().filter(s => s.enabled !== false).forEach(s => {
      const card = document.createElement('div');
      card.className = 'pick-card' + (wizardState.serviceId === s.id ? ' selected' : '');
      card.dataset.id = s.id;
      card.innerHTML = `
        <span class="pick-check"><i class="fa-solid fa-check"></i></span>
        <div class="pick-icon"><i class="fa-solid ${s.icon}"></i></div>
        <h4>${escapeHtml(s.name)}</h4>
        <p>${s.duration} mins</p>
        <div class="pick-price">₹${s.price}</div>
      `;
      card.addEventListener('click', () => { wizardState.serviceId = s.id; renderServiceStep(); });
      grid.appendChild(card);
    });
    applyStagger(grid, '.pick-card');
  }

  function renderBarberStep() {
    const grid = document.getElementById('wizardBarberGrid');
    grid.innerHTML = '';
    const anyCard = document.createElement('div');
    anyCard.className = 'pick-card' + (wizardState.barberId === 'any' ? ' selected' : '');
    anyCard.innerHTML = `
      <span class="pick-check"><i class="fa-solid fa-check"></i></span>
      <div class="pick-icon"><i class="fa-solid fa-shuffle"></i></div>
      <h4>Any Available</h4>
      <p>First available barber</p>
    `;
    anyCard.addEventListener('click', () => { wizardState.barberId = 'any'; renderBarberStep(); });
    grid.appendChild(anyCard);

    getBarbers().filter(b => b.available !== false).forEach(b => {
      const card = document.createElement('div');
      card.className = 'pick-card' + (wizardState.barberId === b.id ? ' selected' : '');
      card.innerHTML = `
        <span class="pick-check"><i class="fa-solid fa-check"></i></span>
        <img class="pick-avatar" src="${b.img}" alt="${escapeHtml(b.name)}">
        <h4>${escapeHtml(b.name)}</h4>
        <p>${escapeHtml(b.exp)} · ${escapeHtml(b.spec)}</p>
        <p style="color:var(--gold-light)">${'★'.repeat(b.rating)}${'☆'.repeat(5 - b.rating)}</p>
      `;
      card.addEventListener('click', () => { wizardState.barberId = b.id; renderBarberStep(); });
      grid.appendChild(card);
    });
    applyStagger(grid, '.pick-card');
  }

  function renderDateStep() {
    const strip = document.getElementById('dateStrip');
    strip.innerHTML = '';
    const start = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(start.getTime() + i * 86400000);
      const dateStr = d.toISOString().split('T')[0];
      const chip = document.createElement('div');
      chip.className = 'date-chip' + (wizardState.date === dateStr ? ' selected' : '');
      chip.innerHTML = `
        <span class="dow">${d.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
        <span class="dom">${d.getDate()}</span>
        <span class="mon">${d.toLocaleDateString('en-IN', { month: 'short' })}</span>
      `;
      // Selecting a date instantly refreshes the time slots below — no extra step needed
      chip.addEventListener('click', () => { wizardState.date = dateStr; wizardState.time = null; renderDateStep(); renderTimeStep(); });
      strip.appendChild(chip);
    }
    applyStagger(strip, '.date-chip');
  }

  function renderTimeStep() {
    const wrap = document.getElementById('slotGroups');
    wrap.innerHTML = '';
    if (!wizardState.date) {
      wrap.innerHTML = '<p style="color:var(--text-muted)">Pick a date above to see available times.</p>';
      return;
    }
    const barberId = wizardState.barberId || 'any';
    Object.keys(TIME_SLOTS).forEach(groupName => {
      const groupTitle = document.createElement('p');
      groupTitle.className = 'slot-group-title';
      groupTitle.textContent = groupName;
      wrap.appendChild(groupTitle);

      const grid = document.createElement('div');
      grid.className = 'slot-grid';
      TIME_SLOTS[groupName].forEach(t => {
        const booked = isSlotBooked(barberId, wizardState.date, t);
        const btn = document.createElement('div');
        btn.className = 'slot' + (booked ? ' booked' : '') + (wizardState.time === t ? ' selected' : '');
        btn.textContent = booked ? `${formatTime12(t)} · Booked` : formatTime12(t);
        if (!booked) btn.addEventListener('click', () => { wizardState.time = t; renderTimeStep(); });
        grid.appendChild(btn);
      });
      wrap.appendChild(grid);
      applyStagger(grid, '.slot');
    });
  }

  function renderSummaryStep() {
    const service = getServices().find(s => s.id === wizardState.serviceId);
    const barber = wizardState.barberId === 'any' ? null : getBarbers().find(b => b.id === wizardState.barberId);
    const card = document.getElementById('summaryCard');
    card.innerHTML = `
      <div class="summary-row"><span>Service</span><strong>${service ? escapeHtml(service.name) : '—'}</strong></div>
      <div class="summary-row"><span>Barber</span><strong>${barber ? escapeHtml(barber.name) : 'Any available barber'}</strong></div>
      <div class="summary-row"><span>Date</span><strong>${wizardState.date ? formatDateLong(wizardState.date) : '—'}</strong></div>
      <div class="summary-row"><span>Time</span><strong>${wizardState.time ? formatTime12(wizardState.time) : '—'}</strong></div>
      <div class="summary-row"><span>Duration</span><strong>${service ? service.duration + ' minutes' : '—'}</strong></div>
      <div class="summary-row"><span>Customer</span><strong>${escapeHtml(wizardState.name) || '—'}</strong></div>
      <div class="summary-row"><span>Mobile</span><strong>${escapeHtml(wizardState.phone) || '—'}</strong></div>
      <div class="summary-row total"><span>Total Price</span><strong>₹${service ? service.price : 0}</strong></div>
    `;
  }

  // Live summary updates as the customer types their details
  ['custName', 'custPhone', 'custMessage'].forEach(id => {
    document.getElementById(id).addEventListener('input', (e) => {
      e.target.classList.remove('invalid');
      wizardState.name = document.getElementById('custName').value.trim();
      wizardState.phone = document.getElementById('custPhone').value.trim();
      wizardState.message = document.getElementById('custMessage').value.trim();
      if (currentStep === 3) renderSummaryStep();
    });
  });

  function validateStep(n) {
    if (n === 1) {
      if (!wizardState.serviceId) { alert('Please choose a service to continue.'); return false; }
      if (!wizardState.barberId) { alert('Please choose a barber (or "Any Available") to continue.'); return false; }
      return true;
    }
    if (n === 2) {
      if (!wizardState.date) { alert('Please choose a date to continue.'); return false; }
      if (!wizardState.time) { alert('Please choose a time slot to continue.'); return false; }
      return true;
    }
    return true;
  }

  function validateDetailsForm() {
    let valid = true;
    const nameEl = document.getElementById('custName');
    const phoneEl = document.getElementById('custPhone');
    const nameErr = document.getElementById('err-custName');
    const phoneErr = document.getElementById('err-custPhone');
    const nameVal = nameEl.value.trim();
    const phoneVal = phoneEl.value.trim().replace(/\s|-/g, '');

    if (nameVal.length < 3 || !/^[a-zA-Z\s.'-]+$/.test(nameVal)) {
      nameEl.classList.add('invalid'); nameErr.textContent = 'Enter your full name (letters only, min 3 characters).'; valid = false;
    } else { nameEl.classList.remove('invalid'); nameErr.textContent = ''; }

    if (!/^[6-9]\d{9}$/.test(phoneVal)) {
      phoneEl.classList.add('invalid'); phoneErr.textContent = 'Enter a valid 10-digit mobile number.'; valid = false;
    } else { phoneEl.classList.remove('invalid'); phoneErr.textContent = ''; }

    if (valid) {
      wizardState.name = nameVal;
      wizardState.phone = phoneVal;
      wizardState.message = document.getElementById('custMessage').value.trim();
    }
    return valid;
  }

  wizardNextBtn.addEventListener('click', () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < TOTAL_STEPS) goToStep(currentStep + 1);
  });
  wizardBackBtn.addEventListener('click', () => { if (currentStep > 1) goToStep(currentStep - 1); });

  goToStep(1);

  /* ---------------------------------------------------
     CONFIRM BOOKING + SUCCESS ANIMATION
  --------------------------------------------------- */
  const successOverlay = document.getElementById('successOverlay');
  const successCheck = document.getElementById('successCheck');
  const successResult = document.getElementById('successResult');

  document.getElementById('confirmBookingBtn').addEventListener('click', () => {
    if (!validateDetailsForm()) {
      document.getElementById('custName').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const service = getServices().find(s => s.id === wizardState.serviceId);
    const barber = wizardState.barberId === 'any' ? null : getBarbers().find(b => b.id === wizardState.barberId);

    const booking = createBooking({
      name: wizardState.name,
      phone: wizardState.phone,
      serviceId: wizardState.serviceId,
      service: service ? service.name : wizardState.serviceId,
      price: service ? service.price : null,
      duration: service ? service.duration : null,
      barberId: wizardState.barberId,
      barber: barber ? barber.name : 'Any available barber',
      date: wizardState.date,
      time: wizardState.time,
      message: wizardState.message
    });

    playSuccessAnimation(booking);
  });

  function playSuccessAnimation(booking) {
    successOverlay.classList.add('active');
    successCheck.classList.remove('show');
    successResult.classList.remove('show');
    document.body.style.overflow = 'hidden';

    document.getElementById('successId').textContent = `Booking ID: ${booking.id}`;
    document.getElementById('successDetails').innerHTML = `
      <div><span>Service</span><strong>${escapeHtml(booking.service)}</strong></div>
      <div><span>Barber</span><strong>${escapeHtml(booking.barber)}</strong></div>
      <div><span>Date</span><strong>${formatDateLong(booking.date)}</strong></div>
      <div><span>Time</span><strong>${formatTime12(booking.time)}</strong></div>
      <div><span>Price</span><strong>₹${booking.price}</strong></div>
    `;

    // Stage timing: scissors snip ~1.1s, then check, then result card
    setTimeout(() => successCheck.classList.add('show'), 1100);
    setTimeout(() => successResult.classList.add('show'), 1550);
  }

  document.getElementById('viewBookingBtn').addEventListener('click', () => {
    successOverlay.classList.remove('active');
    document.body.style.overflow = '';
    resetWizard();
    renderMyBookings();
    document.getElementById('mybookings').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('backHomeBtn').addEventListener('click', () => {
    successOverlay.classList.remove('active');
    document.body.style.overflow = '';
    resetWizard();
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
  });

  function resetWizard() {
    wizardState.serviceId = null; wizardState.barberId = null; wizardState.date = null;
    wizardState.time = null; wizardState.name = ''; wizardState.phone = ''; wizardState.message = '';
    document.getElementById('detailsForm').reset();
    goToStep(1);
  }

  /* ---------------------------------------------------
     MY BOOKINGS (customer)
  --------------------------------------------------- */
  const upcomingWrap = document.getElementById('upcomingBookings');
  const pastWrap = document.getElementById('pastBookings');
  const bookingTabs = document.querySelectorAll('.bookings-tab');

  bookingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      bookingTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      upcomingWrap.classList.toggle('hidden', tab.dataset.tab !== 'upcoming');
      pastWrap.classList.toggle('hidden', tab.dataset.tab !== 'past');
    });
  });

  function bookingCardHtml(b, showCancel) {
    const statusClass = b.status === 'confirmed' ? 'status-confirmed' : b.status === 'completed' ? 'status-completed' : 'status-cancelled';
    return `
      <div class="booking-card" data-id="${b.id}">
        <div class="booking-card-top">
          <div><h4>${escapeHtml(b.service)}</h4><span class="booking-id-tag">${b.id}</span></div>
          <span class="status-badge ${statusClass}">${b.status}</span>
        </div>
        <div class="booking-card-body">
          <p><span>Barber</span> <strong>${escapeHtml(b.barber)}</strong></p>
          <p><span>Date</span> <strong>${formatDateShort(b.date)}</strong></p>
          <p><span>Time</span> <strong>${formatTime12(b.time)}</strong></p>
          <p><span>Price</span> <strong>₹${b.price}</strong></p>
        </div>
        ${showCancel ? `<button class="booking-cancel-btn" data-cancel="${b.id}"><i class="fa-solid fa-xmark"></i> Cancel Appointment</button>` : ''}
      </div>`;
  }

  function renderMyBookings() {
    const all = getBookings().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    const today = todayStr();
    const upcoming = all.filter(b => b.status === 'confirmed' && b.date >= today);
    const past = all.filter(b => b.status !== 'confirmed' || b.date < today);

    upcomingWrap.innerHTML = upcoming.length
      ? upcoming.map(b => bookingCardHtml(b, true)).join('')
      : `<div class="bookings-empty"><i class="fa-regular fa-calendar"></i>No upcoming appointments yet. <br>Book one above!</div>`;

    pastWrap.innerHTML = past.length
      ? past.map(b => bookingCardHtml(b, false)).join('')
      : `<div class="bookings-empty"><i class="fa-regular fa-clock"></i>No past appointments yet.</div>`;
  }
  renderMyBookings();

  document.getElementById('upcomingBookings').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cancel]');
    if (!btn) return;
    if (confirm('Cancel this appointment?')) {
      cancelBooking(btn.dataset.cancel);
      renderMyBookings();
    }
  });

  /* =========================================================
     STUDIO PARTNER DASHBOARD
  ========================================================= */
  const partnerTabs = document.querySelectorAll('.partner-tab');
  const partnerViews = document.querySelectorAll('.partner-view');
  partnerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      partnerTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      partnerViews.forEach(v => v.classList.toggle('active', v.dataset.view === tab.dataset.tab));
    });
  });

  function renderPartnerDashboard() {
    renderOverview();
    renderPartnerBookings('all');
    renderCalendarWeek();
    renderPartnerServices();
    renderPartnerBarbers();
    renderPartnerCustomers();
    loadSettingsForm();
  }

  function renderOverview() {
    const bookings = getBookings();
    const today = todayStr();
    const todays = bookings.filter(b => b.date === today && b.status !== 'cancelled');
    const upcoming = bookings.filter(b => b.status === 'confirmed' && b.date >= today);
    const completed = bookings.filter(b => b.status === 'completed');
    const revenue = todays.reduce((sum, b) => sum + (Number(b.price) || 0), 0);

    const cardsWrap = document.getElementById('overviewCards');
    cardsWrap.innerHTML = `
      <div class="partner-card"><i class="fa-solid fa-calendar-day"></i><span class="pc-num" data-count="${todays.length}">0</span><span class="pc-label">Today's Bookings</span></div>
      <div class="partner-card"><i class="fa-solid fa-hourglass-half"></i><span class="pc-num" data-count="${upcoming.length}">0</span><span class="pc-label">Upcoming</span></div>
      <div class="partner-card"><i class="fa-solid fa-circle-check"></i><span class="pc-num" data-count="${completed.length}">0</span><span class="pc-label">Completed</span></div>
      <div class="partner-card"><i class="fa-solid fa-indian-rupee-sign"></i><span class="pc-num" data-count="${revenue}">0</span><span class="pc-label">Today's Revenue (₹)</span></div>
    `;
    animateCounters(cardsWrap);

    const recent = [...bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
    document.getElementById('overviewRecentBookings').innerHTML = recent.length
      ? recent.map(b => partnerBookingRowHtml(b)).join('')
      : `<div class="bookings-empty"><i class="fa-regular fa-calendar"></i>No bookings yet.</div>`;
  }

  function partnerBookingRowHtml(b) {
    const statusClass = b.status === 'confirmed' ? 'status-confirmed' : b.status === 'completed' ? 'status-completed' : 'status-cancelled';
    const actions = [];
    if (b.status === 'confirmed') {
      actions.push(`<button class="p-action-btn success" data-action="complete" data-id="${b.id}">Complete</button>`);
      actions.push(`<button class="p-action-btn danger" data-action="cancel" data-id="${b.id}">Cancel</button>`);
    } else if (b.status === 'cancelled') {
      actions.push(`<button class="p-action-btn" data-action="reinstate" data-id="${b.id}">Reinstate</button>`);
    } else {
      actions.push(`<span class="pb-sub">No actions</span>`);
    }
    return `
      <div class="p-booking-row" data-id="${b.id}">
        <div><div class="pb-name">${escapeHtml(b.name)}</div><div class="pb-sub">${escapeHtml(b.phone)}</div></div>
        <div>${escapeHtml(b.service)}</div>
        <div>${escapeHtml(b.barber)}</div>
        <div>${formatDateShort(b.date)}</div>
        <div>${formatTime12(b.time)}</div>
        <div><span class="status-badge ${statusClass}">${b.status}</span></div>
        <div class="p-booking-actions">${actions.join('')}</div>
      </div>`;
  }

  function renderPartnerBookings(filter) {
    const bookings = getBookings().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);
    document.getElementById('partnerBookingsList').innerHTML = filtered.length
      ? filtered.map(b => partnerBookingRowHtml(b)).join('')
      : `<div class="bookings-empty"><i class="fa-regular fa-calendar"></i>No bookings in this filter.</div>`;
  }

  document.querySelectorAll('.partner-filter-row .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.partner-filter-row .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderPartnerBookings(chip.dataset.filter);
    });
  });

  // Delegate action buttons for both Overview + Bookings tab
  document.querySelector('.partner-main').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    if (action === 'complete') updateBooking(id, { status: 'completed' });
    if (action === 'cancel') updateBooking(id, { status: 'cancelled' });
    if (action === 'reinstate') updateBooking(id, { status: 'confirmed' });
    renderPartnerDashboard();
    renderMyBookings();
  });

  function renderCalendarWeek() {
    const wrap = document.getElementById('calendarWeek');
    wrap.innerHTML = '';
    const bookings = getBookings();
    const start = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(start.getTime() + i * 86400000);
      const dateStr = d.toISOString().split('T')[0];
      const dayBookings = bookings.filter(b => b.date === dateStr);
      const day = document.createElement('div');
      day.className = 'cal-day';
      const slotsHtml = dayBookings.length
        ? dayBookings.sort((a, b) => a.time.localeCompare(b.time)).map(b =>
            `<div class="cal-slot ${b.status === 'cancelled' ? 'cancelled' : 'booked'}">${formatTime12(b.time)} · ${escapeHtml(b.name.split(' ')[0])}</div>`
          ).join('')
        : `<div class="cal-slot free">No bookings</div>`;
      day.innerHTML = `
        <div class="cal-day-head"><span class="cd-dow">${d.toLocaleDateString('en-IN', { weekday: 'short' })}</span><br><span class="cd-num">${d.getDate()}</span></div>
        ${slotsHtml}
      `;
      wrap.appendChild(day);
    }
  }

  function renderPartnerServices() {
    const wrap = document.getElementById('partnerServiceList');
    wrap.innerHTML = '';
    getServices().forEach(s => {
      const card = document.createElement('div');
      card.className = 'p-service-card';
      card.innerHTML = `
        <div class="p-service-card-top">
          <h4>${escapeHtml(s.name)}</h4>
          <label class="toggle-switch">
            <span class="toggle-track ${s.enabled !== false ? 'on' : ''}" data-toggle-service="${s.id}"></span>
            ${s.enabled !== false ? 'Enabled' : 'Disabled'}
          </label>
        </div>
        <p>${escapeHtml(s.desc)}</p>
        <div class="p-inline-edit">
          <input type="number" min="0" value="${s.price}" data-edit-price="${s.id}" aria-label="Price">
          <input type="number" min="5" value="${s.duration}" data-edit-duration="${s.id}" aria-label="Duration">
        </div>
        <div class="p-card-actions"><button class="p-action-btn" data-save-service="${s.id}">Save Changes</button></div>
      `;
      wrap.appendChild(card);
    });
  }

  document.getElementById('partnerServiceList').addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-toggle-service]');
    if (toggle) {
      const id = toggle.dataset.toggleService;
      const svc = getServices().find(s => s.id === id);
      updateService(id, { enabled: !(svc.enabled !== false) });
      renderPartnerServices(); renderServiceCards();
      return;
    }
    const save = e.target.closest('[data-save-service]');
    if (save) {
      const id = save.dataset.saveService;
      const priceInput = document.querySelector(`[data-edit-price="${id}"]`);
      const durationInput = document.querySelector(`[data-edit-duration="${id}"]`);
      updateService(id, { price: Number(priceInput.value) || 0, duration: Number(durationInput.value) || 0 });
      renderServiceCards();
      save.textContent = 'Saved!';
      setTimeout(() => save.textContent = 'Save Changes', 1200);
    }
  });

  function renderPartnerBarbers() {
    const wrap = document.getElementById('partnerBarberList');
    wrap.innerHTML = '';
    getBarbers().forEach(b => {
      const card = document.createElement('div');
      card.className = 'p-barber-card';
      card.innerHTML = `
        <div class="p-barber-card-top">
          <h4>${escapeHtml(b.name)}</h4>
          <label class="toggle-switch">
            <span class="toggle-track ${b.available !== false ? 'on' : ''}" data-toggle-barber="${b.id}"></span>
            ${b.available !== false ? 'Available' : 'Off duty'}
          </label>
        </div>
        <p>${escapeHtml(b.role)} · ${escapeHtml(b.exp)}</p>
        <p>Specialization: ${escapeHtml(b.spec)}</p>
        <p>Rating: ${'★'.repeat(b.rating)}${'☆'.repeat(5 - b.rating)}</p>
      `;
      wrap.appendChild(card);
    });
  }

  document.getElementById('partnerBarberList').addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-toggle-barber]');
    if (!toggle) return;
    const id = toggle.dataset.toggleBarber;
    const b = getBarbers().find(x => x.id === id);
    updateBarber(id, { available: !(b.available !== false) });
    renderPartnerBarbers(); renderBarberCards();
  });

  function renderPartnerCustomers() {
    const bookings = getBookings();
    const byPhone = {};
    bookings.forEach(b => {
      if (!byPhone[b.phone]) byPhone[b.phone] = { name: b.name, phone: b.phone, visits: 0, spent: 0, last: b.date };
      byPhone[b.phone].visits += 1;
      if (b.status !== 'cancelled') byPhone[b.phone].spent += Number(b.price) || 0;
      if (b.date > byPhone[b.phone].last) byPhone[b.phone].last = b.date;
    });
    const customers = Object.values(byPhone).sort((a, b) => b.visits - a.visits);
    const wrap = document.getElementById('partnerCustomerList');
    wrap.innerHTML = customers.length ? customers.map(c => `
      <div class="p-customer-card">
        <h4>${escapeHtml(c.name)}</h4>
        <p><i class="fa-solid fa-phone"></i> ${escapeHtml(c.phone)}</p>
        <p>Visits: <strong>${c.visits}</strong> · Total Spent: <strong>₹${c.spent}</strong></p>
        <p>Last Visit: ${formatDateShort(c.last)}</p>
      </div>
    `).join('') : `<div class="bookings-empty"><i class="fa-regular fa-user"></i>No customers yet.</div>`;
  }

  /* ---------------------------------------------------
     PARTNER SETTINGS
  --------------------------------------------------- */
  function loadSettingsForm() {
    const settings = readLS(LS_KEYS.settings, {
      studioName: 'HARI GROOMING STUDIO',
      address: '45, Race Course Road, Near Brookefields Mall, Coimbatore, Tamil Nadu 641018',
      phone: '+91 98765 43210',
      hours: 'Mon–Sat 10:00 AM–8:00 PM, Sun 11:00 AM–6:00 PM'
    });
    document.getElementById('setStudioName').value = settings.studioName;
    document.getElementById('setAddress').value = settings.address;
    document.getElementById('setPhone').value = settings.phone;
    document.getElementById('setHours').value = settings.hours;
  }
  document.getElementById('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const settings = {
      studioName: document.getElementById('setStudioName').value.trim(),
      address: document.getElementById('setAddress').value.trim(),
      phone: document.getElementById('setPhone').value.trim(),
      hours: document.getElementById('setHours').value.trim()
    };
    writeLS(LS_KEYS.settings, settings);
    const confirmEl = document.getElementById('settingsSaved');
    confirmEl.classList.add('show');
    setTimeout(() => confirmEl.classList.remove('show'), 2000);
  });

});
