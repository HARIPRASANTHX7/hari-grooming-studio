/* =========================================================
   HARI GROOMING STUDIO — script.js
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     0. PRELOADER
  --------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hide'), 300);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => preloader && preloader.classList.add('hide'), 2500);

  /* ---------------------------------------------------
     1. DATA — SERVICES / BARBERS / GALLERY / TESTIMONIALS
     (Edit these arrays to update site content easily)
  --------------------------------------------------- */
  const SERVICES = [
    { id: 'classic-haircut', name: 'Classic Haircut', desc: 'Timeless scissor & clipper cut, tailored to your face shape and finished to perfection.', price: 249, duration: '30 mins', icon: 'fa-scissors' },
    { id: 'premium-haircut', name: 'Premium Haircut', desc: 'Precision fade or design cut with wash, styling and premium finishing products.', price: 449, duration: '45 mins', icon: 'fa-crown' },
    { id: 'beard-trim', name: 'Beard Trim', desc: 'Sharp beard shaping and line-up with hot towel prep for a clean, defined look.', price: 149, duration: '20 mins', icon: 'fa-user-tie' },
    { id: 'hair-beard', name: 'Hair + Beard', desc: 'Our most popular combo — full haircut and beard grooming in one seamless session.', price: 549, duration: '60 mins', icon: 'fa-star' },
    { id: 'hair-styling', name: 'Hair Styling', desc: 'Wash, blow-dry and styling with premium products for any occasion.', price: 199, duration: '25 mins', icon: 'fa-wind' },
    { id: 'kids-haircut', name: 'Kids Haircut', desc: 'Gentle, patient haircuts for young gentlemen aged 12 and under.', price: 179, duration: '25 mins', icon: 'fa-child' },
    { id: 'head-massage', name: 'Head Massage', desc: 'Relaxing scalp and head massage with warm oils to relieve stress and tension.', price: 299, duration: '30 mins', icon: 'fa-spa' },
    { id: 'premium-grooming', name: 'Premium Grooming', desc: 'The full experience — haircut, beard, hot towel shave, face massage & styling.', price: 899, duration: '90 mins', icon: 'fa-gem' }
  ];

  const BARBERS = [
    { name: 'Hari Rathod', role: 'Founder & Master Barber', exp: '14+ Years Experience', spec: 'Classic Cuts & Razor Shaves', img: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=800&auto=format&fit=crop' },
    { name: 'Rohan Verma', role: 'Senior Barber', exp: '9+ Years Experience', spec: 'Skin Fades & Modern Styling', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop' },
    { name: 'Karan Sharma', role: 'Style Specialist', exp: '7+ Years Experience', spec: 'Beard Sculpting & Design', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop' },
    { name: 'Aditya Nair', role: 'Grooming Expert', exp: '6+ Years Experience', spec: 'Hot Towel Shaves & Facials', img: 'https://images.unsplash.com/photo-1506634572416-48cdfe530110?q=80&w=800&auto=format&fit=crop' }
  ];

  const GALLERY = [
    { img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=900&auto=format&fit=crop', title: 'Precision Fade', cat: 'Haircuts', cls: 'tall' },
    { img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=900&auto=format&fit=crop', title: 'Beard Sculpting', cat: 'Beard Styling', cls: '' },
    { img: 'https://images.unsplash.com/photo-1521490878406-4d6cb6e4ec13?q=80&w=900&auto=format&fit=crop', title: 'Studio Interior', cat: 'Our Space', cls: 'wide' },
    { img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=900&auto=format&fit=crop', title: 'Barber Station', cat: 'Our Space', cls: '' },
    { img: 'https://images.unsplash.com/photo-1587909209111-5097ee578ec3?q=80&w=900&auto=format&fit=crop', title: 'Hot Towel Ritual', cat: 'Grooming', cls: '' },
    { img: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?q=80&w=900&auto=format&fit=crop', title: 'Barber At Work', cat: 'Craft', cls: 'tall' },
    { img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?q=80&w=900&auto=format&fit=crop', title: 'Clean Line-Up', cat: 'Haircuts', cls: '' },
    { img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=900&auto=format&fit=crop', title: 'Modern Style', cat: 'Styling', cls: '' }
  ];

  const TESTIMONIALS = [
    { name: 'Vikram Singh', role: 'Regular Client', rating: 5, text: 'Best barber shop in the city, hands down. The fade was razor sharp and the vibe is genuinely premium. Hari knows his craft.', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Aman Gupta', role: 'First-time Visitor', rating: 5, text: 'Booked online in seconds and was seen right on time. Clean, professional and the beard trim was exactly what I asked for.', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { name: 'Rahul Kapoor', role: 'Monthly Member', rating: 4, text: 'Consistently great haircuts every single visit. The head massage add-on is unreal after a long week. Highly recommend.', img: 'https://randomuser.me/api/portraits/men/12.jpg' },
    { name: 'Sameer Khan', role: 'Regular Client', rating: 5, text: 'The premium grooming package is worth every rupee. Hot towel shave felt like a five-star spa treatment.', img: 'https://randomuser.me/api/portraits/men/67.jpg' },
    { name: 'Nikhil Joshi', role: 'Regular Client', rating: 5, text: 'Professional, punctual and genuinely talented barbers. My go-to place for every haircut, no exceptions.', img: 'https://randomuser.me/api/portraits/men/78.jpg' }
  ];

  /* ---------------------------------------------------
     2. RENDER SERVICES
  --------------------------------------------------- */
  const servicesGrid = document.getElementById('servicesGrid');
  const custServiceSelect = document.getElementById('custService');

  SERVICES.forEach(s => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <div class="service-icon"><i class="fa-solid ${s.icon}"></i></div>
      <h3>${s.name}</h3>
      <p class="service-desc">${s.desc}</p>
      <div class="service-meta">
        <span class="service-price">₹${s.price}</span>
        <span class="service-duration"><i class="fa-regular fa-clock"></i> ${s.duration}</span>
      </div>
      <a href="#booking" class="service-book-btn" data-service="${s.id}">Book Now</a>
    `;
    servicesGrid.appendChild(card);

    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.name} — ₹${s.price} (${s.duration})`;
    custServiceSelect.appendChild(opt);
  });

  // Pre-fill service select when "Book Now" clicked on a service card
  servicesGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.service-book-btn');
    if (!btn) return;
    custServiceSelect.value = btn.dataset.service;
  });

  /* ---------------------------------------------------
     3. RENDER BARBERS
  --------------------------------------------------- */
  const barbersGrid = document.getElementById('barbersGrid');
  const custBarberSelect = document.getElementById('custBarber');

  BARBERS.forEach(b => {
    const card = document.createElement('div');
    card.className = 'barber-card';
    card.innerHTML = `
      <div class="barber-photo">
        <img src="${b.img}" alt="${b.name}, ${b.role} at Hari Grooming Studio" loading="lazy">
        <div class="barber-social">
          <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="https://wa.me/911234567890" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>
      <div class="barber-info">
        <h3>${b.name}</h3>
        <p class="barber-role">${b.role}</p>
        <p class="barber-exp"><i class="fa-regular fa-clock"></i> ${b.exp}</p>
        <p class="barber-spec"><i class="fa-solid fa-scissors"></i> ${b.spec}</p>
      </div>
    `;
    barbersGrid.appendChild(card);

    const opt = document.createElement('option');
    opt.value = b.name;
    opt.textContent = b.name;
    custBarberSelect.appendChild(opt);
  });

  /* ---------------------------------------------------
     4. RENDER GALLERY + LIGHTBOX
  --------------------------------------------------- */
  const galleryGrid = document.getElementById('galleryGrid');

  GALLERY.forEach((g, i) => {
    const item = document.createElement('div');
    item.className = `gallery-item ${g.cls}`.trim();
    item.dataset.index = i;
    item.innerHTML = `
      <img src="${g.img}" alt="${g.title} — ${g.cat} at Hari Grooming Studio" loading="lazy">
      <span class="gallery-zoom"><i class="fa-solid fa-expand"></i></span>
      <div class="gallery-overlay">
        <span>${g.cat}</span>
        <h4>${g.title}</h4>
      </div>
    `;
    galleryGrid.appendChild(item);
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let currentGalleryIndex = 0;

  function openLightbox(index) {
    currentGalleryIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function updateLightbox() {
    const g = GALLERY[currentGalleryIndex];
    lightboxImg.src = g.img;
    lightboxImg.alt = g.title;
    lightboxCaption.textContent = `${g.title} — ${g.cat}`;
  }
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    openLightbox(parseInt(item.dataset.index, 10));
  });

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxNext').addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % GALLERY.length;
    updateLightbox();
  });
  document.getElementById('lightboxPrev').addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + GALLERY.length) % GALLERY.length;
    updateLightbox();
  });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
    if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
  });

  /* ---------------------------------------------------
     5. RENDER TESTIMONIALS + SLIDER
  --------------------------------------------------- */
  const track = document.getElementById('testimonialsTrack');
  const dotsWrap = document.getElementById('testimonialDots');

  TESTIMONIALS.forEach(t => {
    const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="testimonial-stars">${stars}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <img src="${t.img}" alt="${t.name}" loading="lazy">
        <div>
          <h5>${t.name}</h5>
          <span>${t.role}</span>
        </div>
      </div>
    `;
    track.appendChild(card);
  });

  function getPerView() {
    if (window.innerWidth <= 720) return 1;
    if (window.innerWidth <= 960) return 2;
    return 3;
  }

  let testimonialIndex = 0;
  function maxIndex() { return Math.max(0, TESTIMONIALS.length - getPerView()); }

  function renderDots() {
    dotsWrap.innerHTML = '';
    const total = maxIndex() + 1;
    for (let i = 0; i < total; i++) {
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

  renderDots();
  updateSlider();

  let autoSlide = setInterval(() => {
    testimonialIndex = testimonialIndex >= maxIndex() ? 0 : testimonialIndex + 1;
    updateSlider();
  }, 5000);

  window.addEventListener('resize', () => {
    renderDots();
    updateSlider();
  });

  /* ---------------------------------------------------
     6. HEADER SCROLL + ACTIVE NAV LINK
  --------------------------------------------------- */
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('show', window.scrollY > 500);

    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 130;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------------------------------------------------
     7. MOBILE HAMBURGER MENU
  --------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');

  function closeMenu() {
    hamburger.classList.remove('open');
    mainNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.main-nav .nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------------------------------------------------
     8. SCROLL REVEAL (IntersectionObserver)
  --------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------
     9. HERO STAT COUNTERS
  --------------------------------------------------- */
  const statEls = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;
    statEls.forEach(el => {
      const target = parseFloat(el.dataset.count);
      const isDecimal = !Number.isInteger(target);
      const duration = 1600;
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
  setTimeout(animateCounters, 500);

  /* ---------------------------------------------------
     10. BOOKING FORM VALIDATION + LOCALSTORAGE
  --------------------------------------------------- */
  const bookingForm = document.getElementById('bookingForm');
  const dateInput = document.getElementById('custDate');

  // Restrict date picker to today and future dates
  const todayStr = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', todayStr);

  const fields = {
    custName: { el: document.getElementById('custName'), errEl: document.getElementById('err-custName') },
    custPhone: { el: document.getElementById('custPhone'), errEl: document.getElementById('err-custPhone') },
    custService: { el: document.getElementById('custService'), errEl: document.getElementById('err-custService') },
    custBarber: { el: document.getElementById('custBarber'), errEl: document.getElementById('err-custBarber') },
    custDate: { el: document.getElementById('custDate'), errEl: document.getElementById('err-custDate') },
    custTime: { el: document.getElementById('custTime'), errEl: document.getElementById('err-custTime') }
  };

  function setError(fieldKey, message) {
    const { el, errEl } = fields[fieldKey];
    el.classList.toggle('invalid', Boolean(message));
    errEl.textContent = message || '';
  }

  function validateForm() {
    let valid = true;

    // Name
    const nameVal = fields.custName.el.value.trim();
    if (nameVal.length < 3) {
      setError('custName', 'Please enter your full name (min. 3 characters).');
      valid = false;
    } else if (!/^[a-zA-Z\s.'-]+$/.test(nameVal)) {
      setError('custName', 'Name should contain letters only.');
      valid = false;
    } else setError('custName', '');

    // Phone (basic 10-digit validation, adjustable)
    const phoneVal = fields.custPhone.el.value.trim();
    if (!/^[6-9]\d{9}$/.test(phoneVal.replace(/\s|-/g, ''))) {
      setError('custPhone', 'Enter a valid 10-digit mobile number.');
      valid = false;
    } else setError('custPhone', '');

    // Service
    if (!fields.custService.el.value) {
      setError('custService', 'Please select a service.');
      valid = false;
    } else setError('custService', '');

    // Barber (optional field — "Any available barber" is valid)
    setError('custBarber', '');

    // Date
    if (!fields.custDate.el.value) {
      setError('custDate', 'Please select a date.');
      valid = false;
    } else if (fields.custDate.el.value < todayStr) {
      setError('custDate', 'Please choose today or a future date.');
      valid = false;
    } else setError('custDate', '');

    // Time
    if (!fields.custTime.el.value) {
      setError('custTime', 'Please select a time.');
      valid = false;
    } else setError('custTime', '');

    return valid;
  }

  // Live validation on blur
  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('blur', validateForm);
    fields[key].el.addEventListener('input', () => setError(key, ''));
  });

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
  function formatTime(timeStr) {
    const [h, m] = timeStr.split(':');
    const d = new Date();
    d.setHours(+h, +m);
    return d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstInvalid = bookingForm.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const serviceObj = SERVICES.find(s => s.id === fields.custService.el.value);
    const booking = {
      id: 'HGS-' + Date.now(),
      name: fields.custName.el.value.trim(),
      phone: fields.custPhone.el.value.trim(),
      service: serviceObj ? serviceObj.name : fields.custService.el.value,
      price: serviceObj ? serviceObj.price : null,
      barber: fields.custBarber.el.value || 'Any available barber',
      date: fields.custDate.el.value,
      time: fields.custTime.el.value,
      message: document.getElementById('custMessage').value.trim(),
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('hgs_bookings') || '[]');
      existing.push(booking);
      localStorage.setItem('hgs_bookings', JSON.stringify(existing));
    } catch (err) {
      console.warn('Could not save booking to localStorage:', err);
    }

    showConfirmation(booking);
    bookingForm.reset();
  });

  /* ---------------------------------------------------
     11. CONFIRMATION MODAL
  --------------------------------------------------- */
  const confirmModal = document.getElementById('confirmModal');
  const modalName = document.getElementById('modalName');
  const modalDetails = document.getElementById('modalDetails');

  function showConfirmation(booking) {
    modalName.textContent = `, ${booking.name}`;
    modalDetails.innerHTML = `
      <div><span>Service</span> <strong>${booking.service}</strong></div>
      <div><span>Barber</span> <strong>${booking.barber}</strong></div>
      <div><span>Date</span> <strong>${formatDate(booking.date)}</strong></div>
      <div><span>Time</span> <strong>${formatTime(booking.time)}</strong></div>
      <div><span>Booking ID</span> <strong>${booking.id}</strong></div>
    `;
    confirmModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    confirmModal.classList.remove('active');
    document.body.style.overflow = '';
  }
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalDone').addEventListener('click', closeModal);
  confirmModal.addEventListener('click', (e) => { if (e.target === confirmModal) closeModal(); });

  /* ---------------------------------------------------
     12. FOOTER YEAR
  --------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
