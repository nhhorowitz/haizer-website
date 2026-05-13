/* ============================================================
   Haizer — homepage data + dynamic rendering
   Renders cards into the containers from index HTML.
   No framework — vanilla DOM for the static lists.
   ============================================================ */
(function () {
  'use strict';

  // ---------------------------------------------------------- HEART (svg)
  const HEART_SVG = '<svg class="heart__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" stroke-linejoin="round" stroke-linecap="round"/></svg>';

  // ---------------------------------------------------------- FEATURED HOMES
  const FEATURED = [
    { price: '$485,000', addr: '412 Maple Ridge Dr, Lakewood, NJ', bd: 3, ba: 2, sqft: '1,840', type: 'for sale', agent: 'Aaron L.',   tint: 'moss',   cap: '4-bed colonial · exterior',  badge: 'new' },
    { price: '$729,000', addr: '218 Forest St, Borough Park, NY',   bd: 4, ba: 3, sqft: '2,210', type: 'for sale', agent: 'Rivka M.',   tint: 'clay',   cap: 'brick rowhouse · front',    badge: 'active', saved: true },
    { price: '$365,000', addr: '7 Oakhill Ln, Monsey, NY',          bd: 3, ba: 2, sqft: '1,520', type: 'flip',     agent: 'Yossi B.',   tint: 'sand',   cap: 'ranch · backyard',          badge: 'promoted' },
    { price: '$1,150,000', addr: '94 Pinehurst Ave, Teaneck, NJ',   bd: 5, ba: 4, sqft: '3,640', type: 'for sale', agent: 'Devorah K.', tint: 'slate',  cap: 'modern build · facade',     badge: 'active' },
    { price: '$2,950 /mo', addr: '38B Hawthorne Pl, Far Rockaway, NY', bd: 2, ba: 1, sqft: '980',  type: 'for rent', agent: 'Shoshana T.', tint: 'lichen', cap: 'cottage · garden side',   badge: 'new' },
    { price: '$612,500', addr: '1109 Sterling Ave, Passaic, NJ',    bd: 4, ba: '2.5', sqft: '2,050', type: 'for sale', agent: 'Menachem R.', tint: 'rose', cap: 'duplex · street view',    badge: 'active' },
  ];

  function listingCard(d, opts) {
    opts = opts || {};
    const horiz = opts.horiz ? ' lcard--horiz' : '';
    const badge = d.badge
      ? `<div class="badge-row"><span class="badge badge--${d.badge}">${d.badge === 'new' ? 'New' : d.badge === 'active' ? 'Active' : 'Promoted'}</span></div>`
      : '';
    const deals = d.deals
      ? `<div class="deals" aria-label="Deal numbers">
           <span class="chip"><span class="chip__k">Asking</span>${d.deals.asking}</span>
           <span class="chip"><span class="chip__k">ARV</span>${d.deals.arv}</span>
           <span class="chip chip--profit"><span class="chip__k">Auto-profit</span>${d.deals.profit}</span>
         </div>`
      : '';
    return `
      <a href="#" class="lcard${horiz}" role="listitem">
        <div class="lcard__photo">
          <div class="lcard__photo-img ph ph--${d.tint}" data-cap="// ${d.cap}"></div>
          ${badge}
          <button class="heart" type="button" aria-pressed="${d.saved ? 'true' : 'false'}" aria-label="Save listing">${HEART_SVG}</button>
        </div>
        <div class="lcard__body">
          <div class="lcard__price">${d.price}</div>
          <p class="lcard__address">${d.addr}</p>
          <div class="lcard__stats">
            <span><strong>${d.bd}</strong> bd</span><span class="dot"></span>
            <span><strong>${d.ba}</strong> ba</span><span class="dot"></span>
            <span><strong>${d.sqft}</strong> sqft</span>
          </div>
          ${deals}
        </div>
        ${!d.deals ? `
        <div class="lcard__footer">
          <span class="listing-type">${d.type}</span>
          <span class="agent">
            <span class="agent__avatar" aria-hidden="true"></span>
            <span class="agent__name"><b>${d.agent}</b></span>
          </span>
        </div>` : ''}
      </a>`;
  }

  document.getElementById('featGrid').innerHTML = FEATURED.map(d => listingCard(d)).join('');

  // ---------------------------------------------------------- CITIES
  const CITIES = [
    { name: 'Boro Park',     count: '847 listings', cls: 'boropark',     cap: 'boro park · skyline' },
    { name: 'Williamsburg',  count: '612 listings', cls: 'williamsburg', cap: 'williamsburg · brownstones' },
    { name: 'Monsey',        count: '534 listings', cls: 'monsey',       cap: 'monsey · tree-lined street' },
    { name: 'Scranton',      count: '318 listings', cls: 'scranton',     cap: 'scranton · downtown' },
    { name: 'Linden',        count: '261 listings', cls: 'linden',       cap: 'linden · residential' },
  ];
  document.getElementById('citiesGrid').innerHTML = CITIES.map(c => `
    <a href="#" class="city-tile" role="listitem" aria-label="${c.name}, ${c.count}">
      <div class="city-photo ${c.cls}"></div>
      <div class="city-shade"></div>
      <span class="city-cap-hint">// ${c.cap}</span>
      <span class="city-arrow" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <div class="city-body">
        <span class="city-name">${c.name}</span>
        <span class="city-count">${c.count}</span>
      </div>
    </a>
  `).join('');

  // ---------------------------------------------------------- INVESTOR OPPS
  const FLIPS = [
    { price: '$185,000', addr: '19 Roosevelt Ave, Scranton, PA',     bd: 3, ba: 1,    sqft: '1,420', tint: 'clay',  cap: 'brick semi · needs paint',  deals: { asking: '$185K', arv: '$310K', profit: '$42K' } },
    { price: '$224,500', addr: '82 Linden Blvd, Linden, NJ',         bd: 4, ba: 2,    sqft: '1,780', tint: 'sand',  cap: 'duplex · vacant',           deals: { asking: '$224K', arv: '$345K', profit: '$58K' } },
    { price: '$142,000', addr: '311 N Webster Ave, Wilkes-Barre, PA',bd: 3, ba: '1.5',sqft: '1,240', tint: 'moss',  cap: 'cape cod · estate sale',    deals: { asking: '$142K', arv: '$235K', profit: '$31K' } },
    { price: '$268,900', addr: '15 Cherrywood Ct, Lakewood, NJ',     bd: 4, ba: 2,    sqft: '1,950', tint: 'dune',  cap: 'ranch · cosmetic only',     deals: { asking: '$269K', arv: '$395K', profit: '$67K' }, saved: true },
  ];
  const BRRR = [
    { price: '$315,000', addr: '442 Adams St, Scranton, PA',     bd: 4, ba: 2, sqft: '2,100', tint: 'slate',  cap: '2-family · tenanted',    deals: { asking: '$315K', arv: '$420K', profit: '$48K' } },
    { price: '$498,000', addr: '76 Sunset Dr, Linden, NJ',       bd: 6, ba: 3, sqft: '2,860', tint: 'lichen', cap: '3-flat · stabilized',    deals: { asking: '$498K', arv: '$640K', profit: '$72K' } },
    { price: '$378,500', addr: '503 W 4th St, Wilkes-Barre, PA', bd: 5, ba: 2, sqft: '2,340', tint: 'olive',  cap: 'rowhouse · light reno',  deals: { asking: '$379K', arv: '$510K', profit: '$54K' } },
    { price: '$612,000', addr: '28 Park View, Far Rockaway, NY', bd: 8, ba: 4, sqft: '3,450', tint: 'rose',   cap: '4-flat · BRRRR ready',   deals: { asking: '$612K', arv: '$795K', profit: '$94K' } },
  ];
  document.getElementById('flipsList').innerHTML = FLIPS.map(d => listingCard(d, { horiz: true })).join('');
  document.getElementById('brrrList').innerHTML  = BRRR.map(d => listingCard(d, { horiz: true })).join('');

  // ---------------------------------------------------------- FEATURED PROS
  const STAR = '<svg class="star" viewBox="0 0 12 12" fill="currentColor"><path d="M6 .5l1.6 3.4 3.7.4-2.8 2.5.9 3.7L6 8.6 2.6 10.5l.9-3.7L.7 4.3l3.7-.4L6 .5z"/></svg>';
  const PROS = [
    { kind: 'agent',  name: 'Aaron Lefkowitz',  aff: 'ABC Realty',          tags: ['Flips', 'Monsey'],                    stat: '4.9', sub: '182 closings' },
    { kind: 'lender', logo: 'CL', logoCls: 'logo logo-emerald', name: 'Cedar Lending', aff: 'DSCR & bridge loans', tags: ['BRRRR', 'DSCR', 'Bridge'], stat: '4.8', sub: '7d avg close' },
    { kind: 'agent',  name: 'Rivka Mendelsohn', aff: 'Skyline NY',          tags: ['Boro Park', 'Multifamily'],          stat: '5.0', sub: '96 closings' },
    { kind: 'lender', logo: 'NB', logoCls: 'logo logo-light', name: 'Northbridge Capital', aff: 'Hard money & flips', tags: ['Flips', 'Hard money'], stat: '4.7', sub: '410 loans' },
    { kind: 'agent',  name: 'Yossi Berkowitz',  aff: 'Berkowitz Group',     tags: ['Commercial', 'Lakewood'],            stat: '4.9', sub: '240 closings' },
    { kind: 'lender', logo: 'PT', logoCls: 'logo', name: 'Pinecrest Trust', aff: 'Conventional & FHA', tags: ['First-time', 'FHA', 'VA'], stat: '4.6', sub: '14d avg close' },
    { kind: 'agent',  name: 'Devorah Klein',    aff: 'Klein Realty',        tags: ['Williamsburg', 'Rentals'],           stat: '4.8', sub: '121 closings' },
    { kind: 'lender', logo: 'HS', logoCls: 'logo logo-light', name: 'Hudson Street Cap.', aff: 'Commercial real estate', tags: ['Commercial', 'CMBS'], stat: '4.7', sub: '89 closings' },
  ];
  document.getElementById('proRail').innerHTML = PROS.map(p => `
    <article class="pro-card" role="listitem">
      <span class="pro-sponsored">sponsored</span>
      <div class="pro-photo ${p.kind === 'agent' ? 'agent' : p.logoCls}" aria-hidden="true">${p.kind === 'lender' ? p.logo : ''}</div>
      <span class="pro-role">${p.kind}</span>
      <h3 class="pro-name">${p.name}</h3>
      <p class="pro-aff">${p.aff}</p>
      <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="pro-spacer"></div>
      <div class="ministat">${STAR}<strong>${p.stat}</strong><span>· ${p.sub}</span></div>
      <a href="#" class="btn-primary">Contact</a>
    </article>
  `).join('');

  // ---------------------------------------------------------- FREE TOOLS
  const TOOLS = [
    {
      title: 'Deal Analyzer',
      desc: 'Run the numbers in 30 seconds — purchase, repairs, ARV, profit.',
      hint: 'paste a listing url',
      icon: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>'
    },
    {
      title: 'Mortgage',
      desc: 'Compare conventional, FHA, and DSCR side-by-side with live rates.',
      hint: 'monthly payment',
      icon: '<path d="M3 11l9-7 9 7"/><path d="M5 10v9h14v-9"/><path d="M11 19v-5h2v5"/>'
    },
    {
      title: 'BRRRR',
      desc: 'Project cash-out refi, equity left in, and 5-year cash flow.',
      hint: 'buy · rehab · rent · refi · repeat',
      icon: '<path d="M21 12a9 9 0 0 1-15.5 6.3"/><path d="M3 12a9 9 0 0 1 15.5-6.3"/><path d="M21 4v5h-5"/><path d="M3 20v-5h5"/>'
    },
    {
      title: 'Fix-and-Flip',
      desc: 'Estimate rehab budget, timeline, and holding costs by ZIP.',
      hint: '60–120 day projects',
      icon: '<path d="M15 4a4 4 0 0 1 5 5l-2-1-2 2-2-2 2-2-1-2z"/><path d="M14 9L5 18l1 2 2 1 9-9"/>'
    },
  ];
  document.getElementById('toolsGrid').innerHTML = TOOLS.map(t => `
    <a href="#" class="tool-card" role="listitem">
      <span class="tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${t.icon}</svg></span>
      <span class="tool-arrow" aria-hidden="true">
        <svg viewBox="0 0 16 16"><path d="M3 13L13 3M13 3H6M13 3v7"/></svg>
      </span>
      <h3 class="tool-title">${t.title}</h3>
      <p class="tool-desc">${t.desc}</p>
      <span class="tool-hint">${t.hint}</span>
    </a>
  `).join('');

  // ---------------------------------------------------------- LOCAL PROS TILES
  const LP_ICONS = {
    contractors:      '<path d="M3 11l9-7 9 7"/><path d="M5 10v9h14v-9"/><path d="M9 19v-5h6v5"/>',
    title:            '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    attorneys:        '<path d="M12 3v18"/><path d="M6 7l6-3 6 3"/><path d="M4 21h16"/><path d="M8 7l-3 9h6L8 7z"/><path d="M16 7l-3 9h6l-3-9z"/>',
    inspectors:       '<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5L20 20"/><path d="M7.5 10h5M10 7.5v5"/>',
    'mortgage brokers':'<path d="M3 11l9-7 9 7"/><path d="M5 10v9h14v-9"/><path d="M11 19v-5h2v5"/><path d="M8 13h.01M16 13h.01"/>',
    lenders:          '<rect x="3" y="7" width="18" height="12" rx="2"/><path d="M3 11h18"/><path d="M8 7V5h8v2"/>',
    insurance:        '<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/>',
    'property managers':'<path d="M3 11l9-7 9 7"/><path d="M5 10v9h14v-9"/><circle cx="12" cy="14" r="1.5"/><path d="M12 15.5V18"/>',
    cpas:             '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  };
  const LP_ORDER = [
    ['Contractors', 'contractors'],
    ['Title', 'title'],
    ['Attorneys', 'attorneys'],
    ['Inspectors', 'inspectors'],
    ['Mortgage brokers', 'mortgage brokers'],
    ['Lenders', 'lenders'],
    ['Insurance', 'insurance'],
    ['Property managers', 'property managers'],
    ['CPAs', 'cpas'],
  ];
  document.getElementById('proTiles').innerHTML = LP_ORDER.map(([name, key]) => `
    <a href="#" class="lp-tile" role="listitem">
      <span class="lp-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${LP_ICONS[key]}</svg></span>
      <span class="lp-name">${name}</span>
    </a>
  `).join('');

  // ---------------------------------------------------------- BEHAVIORS

  // Sticky nav shadow
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 4) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger
  const hamburger = nav.querySelector('.hamburger');
  const scrim = document.querySelector('.scrim');
  const closeMenu = () => {
    nav.classList.remove('is-menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  };
  const openMenu = () => {
    nav.classList.add('is-menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
  };
  hamburger.addEventListener('click', () => {
    nav.classList.contains('is-menu-open') ? closeMenu() : openMenu();
  });
  scrim.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  window.matchMedia('(min-width: 921px)').addEventListener('change', (e) => { if (e.matches) closeMenu(); });

  // Hero search toggle (segmented variant)
  document.querySelector('.toggle').addEventListener('click', (e) => {
    const btn = e.target.closest('.toggle__btn');
    if (!btn) return;
    document.querySelectorAll('.toggle__btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
  });

  // Hero search type DROPDOWN (default)
  const typeBtn = document.getElementById('typeBtn');
  const typeDropdown = document.getElementById('typeDropdown');
  const typeBtnVal = document.getElementById('typeBtnVal');
  if (typeBtn && typeDropdown) {
    const menu = typeDropdown.querySelector('.type-dropdown__menu');
    const openType = () => typeBtn.setAttribute('aria-expanded', 'true');
    const closeType = () => typeBtn.setAttribute('aria-expanded', 'false');
    typeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      typeBtn.getAttribute('aria-expanded') === 'true' ? closeType() : openType();
    });
    menu.addEventListener('click', (e) => {
      const li = e.target.closest('li[role="option"]');
      if (!li) return;
      menu.querySelectorAll('li').forEach(x => x.setAttribute('aria-selected', 'false'));
      li.setAttribute('aria-selected', 'true');
      typeBtnVal.textContent = li.dataset.val;
      // mirror to segmented toggle so the two variants stay in sync if user flips tweak
      document.querySelectorAll('.toggle__btn').forEach(b => {
        b.setAttribute('aria-pressed', String(b.textContent.trim() === li.dataset.val));
      });
      closeType();
    });
    document.addEventListener('click', (e) => {
      if (!typeDropdown.contains(e.target)) closeType();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeType(); });
  }

  // Filter pills
  document.querySelectorAll('.filter-pill').forEach(p => {
    p.addEventListener('click', () => {
      const on = p.getAttribute('aria-pressed') === 'true';
      p.setAttribute('aria-pressed', String(!on));
    });
  });

  // Heart toggle (event delegation since cards are dynamic)
  document.addEventListener('click', (e) => {
    const heart = e.target.closest('.heart');
    if (!heart) return;
    e.preventDefault();
    e.stopPropagation();
    const on = heart.getAttribute('aria-pressed') === 'true';
    heart.setAttribute('aria-pressed', String(!on));
    const icon = heart.querySelector('.heart__icon');
    if (!on && icon) {
      icon.style.animation = 'none';
      // eslint-disable-next-line no-unused-expressions
      icon.offsetHeight;
      icon.style.animation = '';
    }
  });

  // Card link suppression (demo)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a.lcard, a.city-tile, a.tool-card, a.lp-tile, a.section-seeall, a.lp-cta, a.cta-outline, a.signin, a.mobile-menu__link, a.mobile-menu__signin, a.fcol__link, a.fbottom__link, a.fcities__link');
    if (a && a.getAttribute('href') === '#') e.preventDefault();
  });

  // Smooth-scroll for in-page anchor links (nav + mobile menu)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = document.getElementById('nav').offsetHeight || 64;
    const y = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top: y, behavior: 'smooth' });
    // update aria-current on nav links
    document.querySelectorAll('.nav-link').forEach(l => l.removeAttribute('aria-current'));
    if (a.classList.contains('nav-link')) a.setAttribute('aria-current', 'page');
    // close mobile menu if open
    document.getElementById('nav').classList.remove('is-menu-open');
  });

  // Pros rail prev/next
  const rail = document.getElementById('proRail');
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  const stepBy = () => Math.max(280, rail.clientWidth * 0.7);
  prev && prev.addEventListener('click', () => rail.scrollBy({ left: -stepBy(), behavior: 'smooth' }));
  next && next.addEventListener('click', () => rail.scrollBy({ left:  stepBy(), behavior: 'smooth' }));
  const updateBtns = () => {
    if (!prev || !next) return;
    const max = rail.scrollWidth - rail.clientWidth - 2;
    prev.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft >= max;
  };
  rail.addEventListener('scroll', updateBtns, { passive: true });
  window.addEventListener('resize', updateBtns);
  setTimeout(updateBtns, 0);
})();
