(() => {
  'use strict';

  const ACTIVE_EXP_CLASSES = ['border-golden-hour/40', 'bg-surface-container-high', 'text-sand-pearl'];
  const INACTIVE_EXP_CLASSES = ['border-transparent', 'bg-surface-container-low/60', 'text-on-surface-variant'];
  const ACTIVE_MOMENT_CLASSES = ['bg-golden-hour', 'text-on-secondary-fixed', 'shadow-[0_4px_20px_rgba(216,194,154,0.25)]'];
  const INACTIVE_MOMENT_CLASSES = ['bg-surface-container-high', 'text-on-surface-variant'];
  const ACTIVE_PERSONA_CLASSES = ['bg-golden-hour', 'text-on-secondary-fixed', 'shadow-[0_4px_20px_rgba(216,194,154,0.3)]'];
  const INACTIVE_PERSONA_CLASSES = ['bg-surface-container-high', 'text-sand-pearl'];

  function setClasses(el, removeClasses, addClasses) {
    el.classList.remove(...removeClasses);
    el.classList.add(...addClasses);
  }

  function initExperienceTabs() {
    const buttons = [...document.querySelectorAll('.exp-nav-btn[data-target]')];
    const panels = [...document.querySelectorAll('.exp-content[id]')];
    if (!buttons.length || !panels.length) return;

    const tablist = buttons[0].parentElement;
    if (tablist && !tablist.hasAttribute('role')) {
      tablist.setAttribute('role', 'tablist');
      tablist.setAttribute('aria-label', 'Pilihan pengalaman di Pantai Pecaron');
    }

    buttons.forEach((button, index) => {
      const targetId = button.getAttribute('data-target');
      const panel = document.getElementById(targetId);
      if (!panel) return;

      const tabId = button.id || `exp-tab-${targetId}`;
      button.id = tabId;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', targetId);
      button.setAttribute('aria-selected', String(index === 0));
      button.setAttribute('tabindex', index === 0 ? '0' : '-1');

      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tabId);
      panel.setAttribute('tabindex', '0');
      panel.hidden = !button.getAttribute('aria-selected') || button.getAttribute('aria-selected') !== 'true';
      panel.classList.toggle('hidden', panel.hidden);

      button.addEventListener('click', () => activate(targetId));
      button.addEventListener('keydown', event => {
        if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        buttons[next].focus();
        activate(buttons[next].getAttribute('data-target'));
      });
    });

    function activate(targetId) {
      buttons.forEach((button, index) => {
        const active = button.getAttribute('data-target') === targetId;
        setClasses(button, [...ACTIVE_EXP_CLASSES, ...INACTIVE_EXP_CLASSES], active ? ACTIVE_EXP_CLASSES : INACTIVE_EXP_CLASSES);
        button.setAttribute('aria-selected', String(active));
        button.setAttribute('tabindex', active ? '0' : '-1');
        const panel = document.getElementById(button.getAttribute('data-target'));
        if (panel) {
          panel.hidden = !active;
          panel.classList.toggle('hidden', !active);
        }
      });
    }

    activate(buttons.find(b => b.getAttribute('aria-selected') === 'true')?.getAttribute('data-target') || buttons[0].getAttribute('data-target'));
  }

  const momentData = {
    sunrise: {
      bg: "assets/images/pecaron-stock/pecaron-33-moments.jpg",
      time: "Waktu yang disarankan: 05:30 — 06:30 WIB",
      tag: "Cahaya Pagi & Udara Pesisir",
      activity: "Cahaya Pagi di Atas Tebing Pesisir",
      desc: "Pagi memberi cahaya yang lebih lembut untuk jalan santai dan melihat suasana pesisir. Aktivitas tetap menyesuaikan cuaca hari itu.",
      spot: "Titik pandang pesisir",
      vibe: "Laut yang lebih tenang dan suasana yang relatif sepi.",
      tip: "Bawa jaket tipis karena angin pagi bisa terasa cukup sejuk."
    },
    morning: {
      bg: "assets/images/pecaron-stock/pecaron-28.jpg",
      time: "Waktu yang disarankan: 07:00 — 10:00 WIB",
      tag: "Saat Air Surut",
      activity: "Menjelang Siang di Area Batu",
      desc: "Saat air mulai surut, permukaan batu dan kolam kecil di pesisir dapat terlihat lebih jelas. Tetap jaga jarak aman dari tepi air dan perhatikan permukaan yang licin.",
      spot: "Area batu pesisir",
      vibe: "Cahaya pagi, garis pantai yang terbuka, dan waktu yang nyaman untuk berjalan.",
      tip: "Gunakan alas kaki yang nyaman dengan daya cengkeram baik pada permukaan basah."
    },
    golden: {
      bg: "assets/images/pecaron-stock/pecaron-17-moments.jpg",
      time: "Waktu yang disarankan: 16:30 — 17:30 WIB",
      tag: "Cahaya Menjelang Senja",
      activity: "Cahaya Sore di Atas Tebing Pesisir",
      desc: "Menjelang sore, cahaya menjadi lebih hangat dan membantu menonjolkan tekstur tebing serta garis pesisir. Kondisi terbaik tetap bergantung pada cuaca.",
      spot: "Titik pandang pesisir dan area terbuka",
      vibe: "Cahaya hangat di atas laut dan angin sore yang lebih ringan.",
      tip: "Waktu yang baik untuk fotografi lanskap dan potret dengan cahaya alami yang hangat."
    },
    sunset: {
      bg: "assets/images/pecaron-stock/pecaron-03.jpg",
      time: "Waktu yang disarankan: 17:30 — 18:15 WIB",
      tag: "Menikmati Cakrawala",
      activity: "Menikmati Cakrawala dari Tepi Pesisir",
      desc: "Menjelang senja, perubahan warna langit dan laut menjadi penutup perjalanan yang tenang. Pilih titik yang aman dan ikuti arahan pengelola.",
      spot: "Tepi pantai dan titik pandang tebing",
      vibe: "Suasana senja yang lebih tenang, suara ombak, dan perubahan warna langit.",
      tip: "Selesaikan perjalanan sesuai waktu akses dan kondisi lapangan pada hari kunjungan."
    },
    night: {
      bg: "assets/images/pecaron-stock/pecaron-29.jpg",
      time: "Waktu yang disarankan: setelah pukul 19:00 WIB",
      tag: "Malam di Area Camping",
      activity: "Malam di Area Camping",
      desc: "Malam di area camping menawarkan suasana berbeda dari kunjungan siang. Penempatan tenda, penggunaan api, dan waktu bermalam mengikuti ketentuan pengelola.",
      spot: "Area camping yang ditentukan pengelola",
      vibe: "Suara ombak, langit malam, dan suasana yang lebih hening.",
      tip: "Koordinasikan penempatan tenda dan kebutuhan camping dengan pengelola sebelum bermalam."
    }
  };

  function initMomentTabs() {
    const buttons = [...document.querySelectorAll('.moment-tab-btn[data-moment]')];
    const panel = document.getElementById('moment-panel');
    const bg = document.getElementById('moment-bg');
    const time = document.getElementById('moment-time');
    const tag = document.getElementById('moment-tag');
    const activity = document.getElementById('moment-activity');
    const desc = document.getElementById('moment-desc');
    const spot = document.getElementById('moment-spot');
    const vibe = document.getElementById('moment-vibe');
    const tip = document.getElementById('moment-tip');
    if (!buttons.length || !panel || !bg || !time || !tag || !activity || !desc || !spot || !vibe || !tip) return;

    const tablist = buttons[0].parentElement;
    if (tablist) {
      tablist.setAttribute('role', 'tablist');
      tablist.setAttribute('aria-label', 'Waktu yang disarankan di Pantai Pecaron');
    }

    buttons.forEach((button, index) => {
      const moment = button.getAttribute('data-moment');
      const tabId = button.id || `moment-tab-${moment}`;
      button.id = tabId;
      button.setAttribute('aria-controls', 'moment-panel');
      button.setAttribute('tabindex', index === 0 ? '0' : '-1');
      panel.setAttribute('aria-labelledby', tabId);
      button.addEventListener('click', () => activate(moment));
      button.addEventListener('keydown', event => {
        if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        buttons[next].focus();
        activate(buttons[next].getAttribute('data-moment'));
      });
    });

    function activate(moment) {
      const data = momentData[moment];
      if (!data) return;
      buttons.forEach(button => {
        const active = button.getAttribute('data-moment') === moment;
        setClasses(button, [...ACTIVE_MOMENT_CLASSES, ...INACTIVE_MOMENT_CLASSES], active ? ACTIVE_MOMENT_CLASSES : INACTIVE_MOMENT_CLASSES);
        button.setAttribute('aria-selected', String(active));
        button.setAttribute('tabindex', active ? '0' : '-1');
      });
      bg.classList.remove('v9-image-fade');
      void bg.offsetWidth;
      bg.style.backgroundImage = `url("${data.bg}")`;
      bg.classList.add('v9-image-fade');
      time.textContent = data.time;
      tag.textContent = data.tag;
      activity.textContent = data.activity;
      desc.textContent = data.desc;
      spot.textContent = data.spot;
      vibe.replaceChildren(createLabeledLine('Suasana:', data.vibe));
      tip.replaceChildren(createLabeledLine('Catatan:', data.tip));
    }

    function createLabeledLine(label, value) {
      const fragment = document.createDocumentFragment();
      const strong = document.createElement('strong');
      strong.className = 'text-sand-pearl font-medium';
      strong.textContent = label + ' ';
      fragment.append(strong, document.createTextNode(value));
      return fragment;
    }

    activate(buttons.find(button => button.getAttribute('aria-selected') === 'true')?.getAttribute('data-moment') || 'sunrise');
  }

  const personaItineraries = {
    couple: {
      title: 'Menikmati Pesisir & Menunggu Senja',
      tag: 'CONTOH RENCANA • Sesuaikan dengan cuaca, kondisi laut, dan waktu Anda.',
      steps: [
        { time: '07:00 WIB', title: 'Datang Pagi & Jalan Santai Pesisir', desc: 'Datang pagi saat udara masih sejuk. Jalan santai di sekitar pantai dan nikmati angin laut.' },
        { time: '09:30 WIB', title: 'Melihat Area Batu Saat Air Surut', desc: 'Amati area batu yang terbuka saat air surut dari jarak aman dan jangan mendekati bibir air.' },
        { time: '12:30 WIB', title: 'Makan Siang di Warung Lokal', desc: 'Nikmati pilihan makanan dan minuman dari warung di sekitar kawasan.' },
        { time: '15:30 WIB', title: 'Jalan ke Titik Pandang', desc: 'Ikuti jalur yang tersedia menuju area bukit untuk melihat bentang pesisir dari sudut yang lebih tinggi.' },
        { time: '17:30 WIB', title: 'Menikmati Senja', desc: 'Luangkan waktu sebelum pulang untuk menikmati perubahan cahaya di atas laut.' }
      ]
    },
    family: {
      title: 'Sehari Bersama Keluarga di Pesisir',
      tag: 'CONTOH RENCANA • Sesuaikan dengan cuaca, kondisi laut, dan waktu Anda.',
      steps: [
        { time: '08:30 WIB', title: 'Tiba Pagi & Beristirahat di Pesisir', desc: 'Parkir di area yang tersedia, lalu pilih tempat beristirahat yang teduh dan tidak mengganggu jalur pengunjung.' },
        { time: '10:00 WIB', title: 'Bermain di Tepi Pesisir', desc: 'Nikmati area pesisir dengan tetap memperhatikan kondisi air. Anak-anak perlu selalu berada dalam pengawasan orang dewasa di sekitar ombak.' },
        { time: '12:30 WIB', title: 'Makan Siang di Warung Desa', desc: 'Nikmati makanan dan minuman yang tersedia dari warung di sekitar kawasan dan gunakan fasilitas dengan tertib.' },
        { time: '14:30 WIB', title: 'Melihat Aktivitas Nelayan', desc: 'Amati perahu dan aktivitas pesisir dari jarak yang aman, tanpa memasuki area kerja warga.' },
        { time: '16:30 WIB', title: 'Jalan Sore Sebelum Pulang', desc: 'Nikmati jalan santai di tepi pesisir, lalu bersiap meninggalkan kawasan sebelum hari semakin gelap.' }
      ]
    },
    adventure: {
      title: 'Jelajah Bukit & Pesisir',
      tag: 'CONTOH RENCANA • Sesuaikan dengan cuaca, kondisi laut, dan waktu Anda.',
      steps: [
        { time: '06:00 WIB', title: 'Jalan Pagi di Jalur Pesisir', desc: 'Ikuti jalur yang tersedia dengan memperhatikan kondisi medan untuk melihat bentang pesisir dari sudut yang lebih tinggi.' },
        { time: '08:30 WIB', title: 'Mengamati Bentuk Tebing & Batuan', desc: 'Jelajahi area batu dan tebing dari jalur yang aman. Hindari permukaan licin serta bagian yang ditutup atau tidak dianjurkan.' },
        { time: '12:00 WIB', title: 'Menikmati Kuliner Lokal', desc: 'Istirahat dan nikmati makanan yang tersedia di warung sekitar sebelum melanjutkan perjalanan.' },
        { time: '14:30 WIB', title: 'Melanjutkan Jalur Pesisir', desc: 'Ikuti jalur yang diperbolehkan sambil memperhatikan cuaca, stamina, dan waktu tempuh kembali.' },
        { time: '17:30 WIB', title: 'Menunggu Senja dari Titik Aman', desc: 'Nikmati perubahan cahaya sore dari titik pandang yang aman dan sesuai arahan pengelola.' }
      ]
    },
    photography: {
      title: 'Fotografi Lanskap & Cahaya Alami',
      tag: 'CONTOH RENCANA • Sesuaikan dengan cuaca, kondisi laut, dan waktu Anda.',
      steps: [
        { time: '05:15 WIB', title: 'Tiba Pagi & Menyiapkan Peralatan', desc: 'Pilih titik yang aman dan tidak mengganggu jalur pengunjung untuk mempersiapkan kamera sebelum cahaya pagi muncul.' },
        { time: '06:30 WIB', title: 'Cahaya Pagi untuk Fotografi', desc: 'Manfaatkan cahaya pagi yang lebih lembut untuk memotret tebing, garis pantai, dan suasana pesisir.' },
        { time: '11:00 WIB', title: 'Detail Pesisir & Kehidupan Sekitar', desc: 'Perhatikan detail perahu, perlengkapan nelayan, tekstur batu, dan aktivitas warga tanpa mengganggu kegiatan mereka.' },
        { time: '16:30 WIB', title: 'Cahaya Sore di Atas Tebing', desc: 'Abadikan cahaya sore yang menonjolkan tekstur tebing dan garis pesisir dari titik yang aman.' },
        { time: '17:45 WIB', title: 'Peralihan Cahaya Menjelang Senja', desc: 'Gunakan sisa cahaya sore untuk menangkap perubahan warna langit dan laut sebelum perjalanan ditutup.' }
      ]
    },
    camping: {
      title: 'Pengalaman Camping Pesisir Semalam',
      tag: 'CONTOH RENCANA • Sesuaikan dengan cuaca, kondisi laut, dan waktu Anda.',
      steps: [
        { time: '15:00 WIB', title: 'Tiba & Konfirmasi Camping', desc: 'Konfirmasi lokasi tenda dan ketentuan camping kepada pengelola sebelum membawa perlengkapan ke area bermalam.' },
        { time: '16:30 WIB', title: 'Menata Tenda dan Menunggu Senja', desc: 'Tempatkan tenda di area yang ditentukan, lalu nikmati perubahan cahaya sore tanpa meninggalkan area aman.' },
        { time: '17:45 WIB', title: 'Senja dari Area Camping', desc: 'Nikmati senja dari area camping sesuai lokasi dan batas yang telah ditentukan pengelola.' },
        { time: '19:00 WIB', title: 'Makan Malam & Penggunaan Api', desc: 'Pilih makanan sederhana dari warung sekitar bila tersedia. Penggunaan api harus mengikuti area dan ketentuan pengelola.' },
        { time: '05:45 WIB', title: 'Menyambut Cahaya Pagi', desc: 'Nikmati udara pagi dan perubahan cahaya pertama yang mulai menyentuh garis pesisir sebelum merapikan area tenda.' }
      ]
    }
  };

  function initPlanner() {
    const buttons = [...document.querySelectorAll('.planner-pill-btn[data-persona]')];
    const title = document.getElementById('agenda-rencana-title');
    const tag = document.getElementById('agenda-rencana-tag');
    const steps = document.getElementById('agenda-rencana-steps');
    if (!buttons.length || !title || !tag || !steps) return;

    buttons[0].parentElement?.setAttribute('role', 'group');
    buttons[0].parentElement?.setAttribute('aria-label', 'Pilih gaya rencana perjalanan');

    buttons.forEach((button, index) => {
      button.setAttribute('type', 'button');
      button.setAttribute('aria-pressed', String(index === 0));
      button.addEventListener('click', () => activate(button.getAttribute('data-persona')));
    });

    function render(personaKey) {
      const plan = personaItineraries[personaKey];
      if (!plan) return;
      title.textContent = plan.title;
      tag.textContent = plan.tag;
      const fragment = document.createDocumentFragment();
      plan.steps.forEach(step => {
        const item = document.createElement('div');
        item.className = 'relative';
        item.innerHTML = `
          <div class="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full bg-golden-hour ring-4 ring-surface-container-low" aria-hidden="true"></div>
          <div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
            <span class="text-xs font-bold text-golden-hour uppercase tracking-wider"></span>
            <h4 class="font-serif-display text-xl text-sand-pearl"></h4>
          </div>
          <p class="text-xs sm:text-sm text-on-surface-variant font-light mt-1.5 leading-relaxed"></p>`;
        item.querySelector('span').textContent = step.time;
        item.querySelector('h4').textContent = step.title;
        item.querySelector('p').textContent = step.desc;
        fragment.appendChild(item);
      });
      steps.replaceChildren(fragment);
    }

    function activate(persona) {
      if (!persona || !personaItineraries[persona]) return;
      buttons.forEach(button => {
        const active = button.getAttribute('data-persona') === persona;
        setClasses(button, [...ACTIVE_PERSONA_CLASSES, ...INACTIVE_PERSONA_CLASSES], active ? ACTIVE_PERSONA_CLASSES : INACTIVE_PERSONA_CLASSES);
        button.setAttribute('aria-pressed', String(active));
      });
      render(persona);
    }

    const initial = buttons.find(button => button.getAttribute('aria-pressed') === 'true')?.getAttribute('data-persona') || 'couple';
    activate(initial);
  }

  function initPrintButton() {
    const button = document.querySelector('[data-action="print-plan"]');
    if (!button) return;
    button.addEventListener('click', () => window.print());
  }

  initExperienceTabs();
  initMomentTabs();
  initPlanner();
  initPrintButton();
})();

(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('v6-ready');


  // Cinematic polish: gentle hero drift and a restrained Ken Burns movement.
  const heroForMotion = document.querySelector('.mp-page-hero');
  let heroTick = false;
  const updateHeroMotion = () => {
    if (!heroForMotion || reduce) return;
    const y = Math.min(window.scrollY || 0, window.innerHeight * 0.8);
    const drift = Math.min(y * -0.055, 0);
    heroForMotion.style.setProperty('--v9-hero-y', `${drift}px`);
    heroTick = false;
  };
  if (heroForMotion && !reduce) {
    window.addEventListener('scroll', () => {
      if (!heroTick) { heroTick = true; requestAnimationFrame(updateHeroMotion); }
    }, {passive:true});
    updateHeroMotion();
  }

  // Progressive scroll UI
  const bar = document.createElement('div');
  bar.id = 'v6-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  const updateScrollUI = () => {
    const y = window.scrollY || 0;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    bar.style.width = `${Math.min(100, Math.max(0, (y / max) * 100))}%`;
    document.body.classList.toggle('v6-scrolled', y > 30);
  };
  window.addEventListener('scroll', updateScrollUI, {passive:true});
  updateScrollUI();

  // Skip link for keyboard/screen-reader users.
  if (document.getElementById('main-content')) {
    const skip = document.createElement('a');
    skip.className = 'v6-skip-link';
    skip.href = '#main-content';
    skip.textContent = 'Lewati ke konten utama';
    document.body.prepend(skip);
  }

  // Reveal-on-scroll with reduced-motion fallback.
  const candidates = document.querySelectorAll('.mp-page-section section, .mp-page-section article, .mp-page-section h2, .mp-page-section h3, .mp-page-section .grid > div');
  candidates.forEach((el, i) => {
    if (el.closest('header, footer')) return;
    el.classList.add('v6-reveal');
    if (i % 4 === 1) el.classList.add('v6-delay-1');
    if (i % 4 === 2) el.classList.add('v6-delay-2');
    if (i % 4 === 3) el.classList.add('v6-delay-3');
  });
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('v6-visible'); io.unobserve(e.target); }
    }), {rootMargin:'0px 0px -7% 0px', threshold:.06});
    document.querySelectorAll('.v6-reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.v6-reveal').forEach(el => el.classList.add('v6-visible'));
  }

  // Internal page hero uses the first meaningful photo, but never depends on it for content.
  const hero = document.querySelector('.mp-page-hero');
  if (hero) {
    hero.classList.add('v9-cinematic-hero');
    const explicitHero = hero.getAttribute('data-hero-image');
    if (explicitHero) {
      hero.style.setProperty('--v6-hero-image', `url("${explicitHero}")`);
    }
    const img = explicitHero ? null : [...document.querySelectorAll('main img')].find(i => {
      const alt = (i.alt || '').toLowerCase();
      return i.src && !alt.includes('logo');
    });
    if (img) {
      const applyHero = src => hero.style.setProperty('--v6-hero-image', `url("${src}")`);
      if (img.complete && img.naturalWidth > 0) {
        applyHero(img.currentSrc || img.src);
      } else {
        img.addEventListener('load', () => applyHero(img.currentSrc || img.src), {once:true});
      }
    }  }

  // Mark active top navigation link from current filename.
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    const clean = href.split('#')[0];
    if (clean === current || (current === '' && clean === 'index.html')) {
      a.classList.add('v6-nav-active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // Build a compact mobile menu without changing the desktop header.
  const header = document.querySelector('body > header:first-of-type');
  if (header && document.querySelector('#main-content')) {
    const inner = header.firstElementChild;
    const utility = inner?.querySelector(':scope > div.shrink-0');
    if (inner && utility) {
      const menuButton = document.createElement('button');
      menuButton.type = 'button';
      menuButton.className = 'v6-mobile-trigger';
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-controls', 'v6-mobile-drawer');
      menuButton.setAttribute('aria-label', 'Buka menu navigasi');
      menuButton.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">menu</span>';
      utility.prepend(menuButton);

      const desktopCta = [...utility.querySelectorAll('a[href="planner.html"]')].find(a => a.className.includes('bg-golden-hour'));
      if (desktopCta) desktopCta.classList.add('v6-mobile-cta-hide');

      const drawer = document.createElement('aside');
      drawer.id = 'v6-mobile-drawer';
      drawer.className = 'v6-mobile-drawer';
      drawer.setAttribute('aria-label', 'Navigasi mobile');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.inert = true;
      drawer.innerHTML = `
        <button type="button" class="v6-mobile-drawer__close" aria-label="Tutup menu"><span class="material-symbols-outlined" aria-hidden="true">close</span></button>
        <div class="v6-mobile-drawer__section"><div class="v6-mobile-drawer__label">Jelajah Pecaron</div>
          <a href="index.html">Beranda<span aria-hidden="true">↗</span></a>
          <a href="experiences.html">Pengalaman<span aria-hidden="true">↗</span></a>
          <a href="moments.html">Waktu terbaik<span aria-hidden="true">↗</span></a>
          <a href="planner.html">Rute &amp; rencana<span aria-hidden="true">↗</span></a>
        </div>
        <div class="v6-mobile-drawer__section"><div class="v6-mobile-drawer__label">Tentang destinasi</div>
          <a href="community.html">Warga lokal<span aria-hidden="true">↗</span></a>
          <a href="gallery.html">Galeri<span aria-hidden="true">↗</span></a>
          <a href="social.html">Media sosial<span aria-hidden="true">↗</span></a>
        </div>
        <div class="v6-mobile-drawer__section"><div class="v6-mobile-drawer__label">Informasi</div>
          <a href="guide.html">Info kunjungan<span aria-hidden="true">↗</span></a>
          <a href="responsible.html">Etika berkunjung<span aria-hidden="true">↗</span></a>
          <a href="contact.html">Kontak pengelola<span aria-hidden="true">↗</span></a>
        </div>
      `;
      const backdrop = document.createElement('div');
      backdrop.className = 'v6-menu-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.append(backdrop, drawer);

      const drawerLinks = [...drawer.querySelectorAll('a[href]')];
      drawerLinks.forEach(a => {
        const clean = a.getAttribute('href').split('#')[0];
        if (clean === current || (current === '' && clean === 'index.html')) {
          a.classList.add('v6-active');
          a.setAttribute('aria-current','page');
        }
      });
      const closeButton = drawer.querySelector('.v6-mobile-drawer__close');
      let previousFocus = null;
      const closeMenu = () => {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        drawer.inert = true;
        backdrop.classList.remove('is-open');
        document.body.classList.remove('v6-menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Buka menu navigasi');
        menuButton.querySelector('.material-symbols-outlined').textContent = 'menu';
        if (previousFocus) previousFocus.focus();
      };
      const openMenu = () => {
        previousFocus = document.activeElement;
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        drawer.inert = false;
        backdrop.classList.add('is-open');
        document.body.classList.add('v6-menu-open');
        menuButton.setAttribute('aria-expanded', 'true');
        menuButton.setAttribute('aria-label', 'Tutup menu navigasi');
        menuButton.querySelector('.material-symbols-outlined').textContent = 'close';
        closeButton.focus();
      };
      menuButton.addEventListener('click', () => drawer.classList.contains('is-open') ? closeMenu() : openMenu());
      closeButton.addEventListener('click', closeMenu);
      backdrop.addEventListener('click', closeMenu);
      drawerLinks.forEach(a => a.addEventListener('click', () => closeMenu()));
      document.addEventListener('keydown', e => {
        if (!drawer.classList.contains('is-open')) return;
        if (e.key === 'Escape') { closeMenu(); return; }
        if (e.key !== 'Tab') return;
        const focusables = [...drawer.querySelectorAll('button, a[href]')].filter(el => !el.hasAttribute('disabled'));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
    }
  }

  // View-transition-like fade between internal documents.
  if (!reduce) {
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target === '_blank' || a.hasAttribute('download')) return;
      a.addEventListener('click', e => {
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const url = new URL(href, location.href);
        if (url.origin !== location.origin) return;
        e.preventDefault();
        document.body.classList.add('v6-leaving');
        setTimeout(() => { location.href = url.href; }, 160);
      });
    });
  }

  // Accessible, keyboard-friendly gallery lightbox.
  const galleryLinks = [...document.querySelectorAll('#gallery img')].map(img => ({ img }));
  if (galleryLinks.length) {
    const overlay = document.createElement('div');
    overlay.id = 'v6-lightbox';
    overlay.className = 'v6-lightbox';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-label','Pratinjau foto');
    overlay.innerHTML = '<button class="v6-lightbox__button" type="button" aria-label="Tutup galeri">×</button><img class="v6-lightbox__image" alt="" />';
    document.body.appendChild(overlay);
    const lbImg = overlay.querySelector('img');
    const close = overlay.querySelector('button');
    let previousFocus = null;
    const hide = () => {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      if (previousFocus) previousFocus.focus();
    };
    const show = a => {
      const im = a.img;
      previousFocus = document.activeElement;
      lbImg.src = im.currentSrc || im.src;
      lbImg.alt = im.alt || 'Foto Pantai Pecaron';
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      close.focus();
    };
    close.addEventListener('click', hide);
    overlay.addEventListener('click', e => { if (e.target === overlay) hide(); });
    galleryLinks.forEach(item => { item.img.setAttribute('tabindex','0'); item.img.setAttribute('role','button'); item.img.setAttribute('aria-label', `${item.img.alt || 'Foto Pantai Pecaron'} — buka pratinjau`); item.img.style.cursor='zoom-in'; item.img.addEventListener('click', e => { e.preventDefault(); show(item); }); item.img.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(item); } }); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('is-open')) hide(); });
  }

})();
