import React, { useState, useEffect } from 'react';
import MenuSection from './MenuSection.jsx';

/* ─── BRAND STYLES ───────────────────────────────────────────────────────────
   Only things SantyCSS cannot express as utility classes:
   - Font imports, CSS vars, body base
   - Pseudo-elements (::after grain, ::before section-label line)
   - Complex keyframe animations (marquee, amber pulse)
   - backdrop-filter glass (beer cards)
   - Location panel hover-state transitions
   - Fixed navbar blur / transparency toggle
   - Mobile menu slide-in
   - Writing-mode (vertical text)
─────────────────────────────────────────────────────────────────────────── */
const BrandStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

    :root {
      --z40-black:    #0D0D0D;
      --z40-amber:    #D4860B;
      --z40-gold:     #F0A500;
      --z40-offwhite: #F5F0E8;
      --z40-copper:   #8B4E1E;
      /* SantyCSS token overrides */
      --santy-primary: #D4860B;
      --santy-font:    'Inter', system-ui, sans-serif;
      --santy-radius:  2px;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--z40-black);
      color: var(--z40-offwhite);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }

    /* ── Grain overlay ── */
    .grain-overlay { position: relative; isolation: isolate; }
    .grain-overlay::after {
      content: ''; position: absolute; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      background-size: 200px 200px; opacity: 0.035;
      pointer-events: none; z-index: 10; mix-blend-mode: overlay;
    }

    /* ── Reveal on scroll ── */
    .reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.75s ease, transform 0.75s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-d1 { transition-delay: 0.1s; }
    .reveal-d2 { transition-delay: 0.2s; }
    .reveal-d3 { transition-delay: 0.3s; }
    .reveal-d4 { transition-delay: 0.4s; }

    /* ── Marquee ── */
    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .marquee-track { animation: ticker 35s linear infinite; display: flex; white-space: nowrap; width: max-content; }
    .marquee-track:hover { animation-play-state: paused; }

    /* ── Amber glow pulse ── */
    @keyframes amberPulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.30; } }
    .amber-glow { animation: amberPulse 4s ease-in-out infinite; }

    /* ── Navbar ── */
    .z40-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; transition: background 0.35s ease, box-shadow 0.35s ease; }
    .z40-nav.solid { background: rgba(13,13,13,0.96); backdrop-filter: blur(12px); box-shadow: 0 1px 0 rgba(212,134,11,0.2); }
    .nav-link { color: var(--z40-offwhite); text-decoration: none; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.75; transition: opacity 0.2s, color 0.2s; }
    .nav-link:hover { opacity: 1; color: var(--z40-amber); }
    .nav-link.active { opacity: 1; color: var(--z40-amber); }

    /* ── Hamburger ── */
    .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 0; }
    .hamburger span { display: block; width: 24px; height: 2px; background: var(--z40-offwhite); }
    @media (max-width: 900px) {
      .nav-links { display: none !important; }
      .nav-cta   { display: none !important; }
      .hamburger { display: flex; }
    }

    /* ── Mobile menu ── */
    .mobile-menu { position: fixed; inset: 0; background: rgba(13,13,13,0.98); z-index: 199; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2.5rem; transform: translateX(100%); transition: transform 0.4s ease; }
    .mobile-menu.open { transform: translateX(0); }
    .mobile-menu a { font-family: 'Anton', sans-serif; font-size: 2.2rem; letter-spacing: 0.1em; color: var(--z40-offwhite); text-decoration: none; text-transform: uppercase; }
    .mobile-menu a:hover { color: var(--z40-amber); }

    /* ── Logo badge ── */
    .logo-badge { border-radius: 50%; border: 2px solid var(--z40-amber); background: var(--z40-black); font-family: 'Anton', sans-serif; letter-spacing: 0.18em; color: var(--z40-amber); text-align: center; line-height: 1.1; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }

    /* ── Section label (::before line) ── */
    .section-label { font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--z40-amber); font-weight: 500; display: flex; align-items: center; gap: 0.75rem; }
    .section-label::before { content: ''; display: block; width: 32px; height: 1px; background: var(--z40-amber); }
    .section-label.center { justify-content: center; }
    .section-label.copper { color: var(--z40-copper); }
    .section-label.copper::before { background: var(--z40-copper); }

    /* ── Hero ── */
    .hero-bg {
      background:
        radial-gradient(ellipse 80% 60% at 50% 80%, rgba(139,78,30,0.25) 0%, transparent 65%),
        radial-gradient(ellipse 50% 40% at 30% 20%, rgba(212,134,11,0.08) 0%, transparent 60%),
        linear-gradient(180deg, #0D0D0D 0%, #111008 50%, #0D0D0D 100%);
    }
    .hero-line { font-family: 'Anton', sans-serif; text-transform: uppercase; line-height: 0.88; letter-spacing: -0.01em; color: var(--z40-offwhite); font-size: clamp(4.5rem, 14vw, 13rem); }
    .hero-line-outline { -webkit-text-stroke: 1px rgba(245,240,232,0.5); color: transparent; }
    .hero-line-amber { color: var(--z40-amber); }
    .hero-year { font-family: 'Anton', sans-serif; font-size: 0.7rem; letter-spacing: 0.25em; color: rgba(245,240,232,0.25); text-transform: uppercase; writing-mode: vertical-rl; }
    .hero-scroll-line { width: 1px; height: 60px; background: linear-gradient(to bottom, var(--z40-amber), transparent); }
    .hero-amber-line { position: absolute; top: 72px; left: 0; right: 0; height: 1px; background: rgba(212,134,11,0.15); }

    /* ── Buttons ── */
    .btn { font-family: 'Anton', sans-serif; letter-spacing: 0.15em; text-transform: uppercase; font-size: 0.85rem; cursor: pointer; border: none; text-decoration: none; transition: all 0.25s ease; line-height: 1; display: inline-block; padding: 0.9rem 2.2rem; }
    .btn-amber { background: var(--z40-amber); color: var(--z40-black); }
    .btn-amber:hover { background: var(--z40-gold); }
    .btn-amber-sm { background: var(--z40-amber); color: var(--z40-black); padding: 0.65rem 1.4rem; font-size: 0.75rem; }
    .btn-amber-sm:hover { background: var(--z40-gold); }
    .btn-outline { background: transparent; border: 2px solid var(--z40-offwhite); color: var(--z40-offwhite); }
    .btn-outline:hover { background: var(--z40-offwhite); color: var(--z40-black); }
    .btn-dark { background: var(--z40-black); color: var(--z40-offwhite); border: 2px solid var(--z40-black); }
    .btn-dark:hover { background: var(--z40-amber); border-color: var(--z40-amber); color: var(--z40-black); }

    /* ── Beer cards — glass effect + hover ── */
    .beer-card { background: rgba(255,255,255,0.04); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid rgba(212,134,11,0.25); border-radius: 2px; transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
    .beer-card:hover { transform: translateY(-6px); border-color: var(--z40-amber); box-shadow: 0 20px 60px rgba(212,134,11,0.15); }

    /* ── Location panels ── */
    .loc-panel { position: relative; overflow: hidden; cursor: pointer; }
    .loc-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,13,13,0.98) 0%, rgba(13,13,13,0.6) 60%, transparent 100%); transition: background 0.4s ease; }
    .loc-panel:hover .loc-overlay { background: linear-gradient(to top, rgba(13,13,13,0.99) 0%, rgba(13,13,13,0.85) 100%); }
    .loc-details { position: absolute; bottom: 2.5rem; left: 2.5rem; right: 2.5rem; transform: translateY(8px); opacity: 0.85; transition: transform 0.4s ease, opacity 0.4s ease; z-index: 2; }
    .loc-panel:hover .loc-details { transform: translateY(0); opacity: 1; }

    /* ── Stats ── */
    .stat-divider { width: 1px; height: 40px; background: rgba(212,134,11,0.35); align-self: center; }

    /* ── Tribe accent bar ── */
    .tribe-accent { width: 80px; height: 3px; background: var(--z40-amber); margin-bottom: 2rem; }

    /* ── Misc ── */
    .amber-hr { border: none; border-top: 1px solid rgba(212,134,11,0.3); }
    .social-icon { color: rgba(245,240,232,0.45); transition: color 0.2s; text-decoration: none; }
    .social-icon:hover { color: var(--z40-amber); }

    /* ── Form fields ── */
    .z40-field { border: none; border-bottom: 1px solid rgba(13,13,13,0.35); background: transparent; width: 100%; padding: 0.75rem 0; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--z40-black); outline: none; appearance: none; -webkit-appearance: none; transition: border-color 0.25s; }
    .z40-field::placeholder { color: rgba(13,13,13,0.4); }
    .z40-field:focus { border-bottom-color: var(--z40-amber); }
    select.z40-field { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M0 0l6 8 6-8z' fill='%230D0D0D' opacity='.4'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0 center; padding-right: 1.5rem; cursor: pointer; }

    /* ── Beer scroll scrollbar ── */
    .beer-scroll::-webkit-scrollbar { height: 4px; }
    .beer-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
    .beer-scroll::-webkit-scrollbar-thumb { background: var(--z40-amber); border-radius: 2px; }

    /* ── Display font helper ── */
    .font-display { font-family: 'Anton', sans-serif; }

    /* ── Heading sizes (fluid) ── */
    .heading-hero  { font-family: 'Anton', sans-serif; text-transform: uppercase; font-size: clamp(2.8rem, 7vw, 6rem);  line-height: 0.9;  letter-spacing: -0.01em; }
    .heading-xl    { font-family: 'Anton', sans-serif; text-transform: uppercase; font-size: clamp(2.8rem, 7vw, 5.5rem); line-height: 0.9; letter-spacing: -0.01em; }
    .heading-lg    { font-family: 'Anton', sans-serif; text-transform: uppercase; font-size: clamp(2rem, 5vw, 3.5rem);  line-height: 0.95; }
    .blockquote-big { font-style: italic; font-size: clamp(1.6rem, 3.5vw, 2.6rem); line-height: 1.25; font-weight: 300; border-left: 3px solid var(--z40-amber); padding-left: 2rem; }

    /* ── Section padding ── */
    .section-pad { padding: clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem); }

    /* ── Tribe bg text ── */
    .tribe-bg-text { position: absolute; right: -2vw; top: 50%; transform: translateY(-50%); font-family: 'Anton', sans-serif; font-size: clamp(8rem, 22vw, 22rem); color: rgba(212,134,11,0.04); line-height: 1; letter-spacing: -0.02em; text-transform: uppercase; user-select: none; pointer-events: none; white-space: nowrap; }
  `}</style>
);

/* ─── REVEAL HOOK ─────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── LOGO ────────────────────────────────────────────────────────────────── */
const Logo = ({ size = 48 }) => (
  <div className="logo-badge" style={{ width: size, height: size, fontSize: size * 0.135 }}>
    ZERO<br />40
  </div>
);

/* ─── SEO HOOK ────────────────────────────────────────────────────────────── */
function useSEO(title, description) {
  useEffect(() => {
    document.title = title;
    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', 'website', 'property');
  }, [title, description]);
}

/* ─── NAV LINKS CONFIG ────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',             href: '/',                  sectionId: 'home' },
  { label: 'Menu',             href: '/#menu',             sectionId: 'menu' },
  { label: 'Tribe Membership', href: '/#tribe-membership', sectionId: 'tribe-membership' },
  { label: 'Party Packages',   href: '/#party-packages',   sectionId: null },
  { label: 'Our Brewery',      href: '/our-brewery',       sectionId: null },
  { label: 'Brewfast Club',    href: '/z40-brewfast-club', sectionId: null },
];

/* ─── NAVBAR ──────────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      if (window.scrollY < 120) setActiveId('home');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['menu', 'tribe-membership'];
    const ios = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.25 }
      );
      io.observe(el);
      return io;
    });
    return () => ios.forEach(io => io?.disconnect());
  }, []);

  return (
    <>
      <nav className={`z40-nav make-flex align-center justify-between add-padding-x-32 set-height-72 ${scrolled ? 'solid' : ''}`}>
        <a href="/" style={{ textDecoration: 'none' }} aria-label="Zero40 Brewing Home"><Logo /></a>

        <div className="nav-links make-flex gap-32">
          {NAV_LINKS.map(({ label, href, sectionId }) => (
            <a key={label} href={href}
              className={`nav-link${activeId === sectionId ? ' active' : ''}`}
            >{label}</a>
          ))}
        </div>

        <a href="#reservations" className="btn btn-amber-sm nav-cta">Reserve a Table</a>

        <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button onClick={() => setMobileOpen(false)}
          style={{ position: 'absolute', top: '1.5rem', right: '2rem', background: 'none', border: 'none', color: 'var(--z40-offwhite)', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>
          ×
        </button>
        {NAV_LINKS.map(({ label, href }) => (
          <a key={label} href={href} onClick={() => setMobileOpen(false)}>{label}</a>
        ))}
        <a href="#reservations" className="btn btn-amber" onClick={() => setMobileOpen(false)}>Reserve a Table</a>
      </div>
    </>
  );
};

/* ─── HERO ────────────────────────────────────────────────────────────────── */
const Hero = () => (
  <section id="hero" className="hero-bg grain-overlay make-flex align-center position-relative overflow-hidden set-min-height-dvh">

    <div className="amber-glow position-absolute set-width-full"
      style={{ bottom: '-10%', height: '55vh', background: 'radial-gradient(ellipse, rgba(212,134,11,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />

    <div className="hero-amber-line" />

    <div className="position-relative set-width-full add-padding-x-80 add-padding-top-128 on-mobile:add-padding-x-24" style={{ zIndex: 2 }}>
      <p className="section-label add-margin-bottom-32">Hyderabad's Finest Microbrewery</p>

      <h1 className="add-margin-bottom-40">
        <div className="hero-line">Hyderabad's</div>
        <div className="hero-line hero-line-outline">Favourite</div>
        <div className="hero-line hero-line-amber">Brewery.</div>
      </h1>

      <p className="set-text-12 add-margin-bottom-48 on-mobile:add-margin-bottom-32"
        style={{ letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.55)' }}>
        Dialed In Since 2016&nbsp;&nbsp;·&nbsp;&nbsp;Jubilee Hills &amp; Financial District
      </p>

      <div className="make-flex flex-wrap gap-16">
        <a href="#menu" className="btn btn-outline">Explore Our Beers</a>
        <a href="#reservations" className="btn btn-amber">Reserve Now</a>
      </div>
    </div>

    <div className="hero-year position-absolute" style={{ bottom: '2.5rem', right: 'clamp(1.5rem, 5vw, 4rem)' }}>
      Est. 2016 · Hyderabad
    </div>

    <div className="position-absolute make-flex flex-column align-center gap-8" style={{ bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)' }}>
      <div className="hero-scroll-line" />
    </div>
  </section>
);

/* ─── MARQUEE TICKER ──────────────────────────────────────────────────────── */
const Marquee = () => {
  const items = [
    'CRAFT LAGER', 'WHEAT ALE', 'HOP BOMB IPA', 'ROBUST PORTER',
    'SEASONAL SPECIALS', 'LIVE MUSIC', 'PRIVATE EVENTS',
    'FRESH ON TAP', 'JUBILEE HILLS', 'FINANCIAL DISTRICT',
    'DIALED IN SINCE 2016', 'CRAFT BREWED DAILY',
  ];
  const repeated = [...items, ...items];

  return (
    <div className="overflow-hidden add-padding-y-12"
      style={{ background: 'var(--z40-amber)', borderTop: '1px solid rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span key={i} className="font-display add-padding-right-48 set-text-14"
            style={{ letterSpacing: '0.2em', color: 'var(--z40-black)' }}>
            {item}&nbsp;&nbsp;<span style={{ opacity: 0.5 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── OUR CRAFT ───────────────────────────────────────────────────────────── */
const OurCraft = () => {
  const stats = [
    { value: '8+',    label: 'Craft Beers on Tap' },
    { value: '2016',  label: 'Established' },
    { value: '2',     label: 'Locations' },
    { value: '1000+', label: 'Happy Pints Daily' },
  ];

  return (
    <section id="our-brewery" className="grain-overlay section-pad" style={{ background: '#0a0a0a' }}>
      <div className="make-grid grid-cols-2 on-mobile:grid-cols-1 gap-64 align-center set-max-width-1400 add-margin-x-auto">

        {/* Left — Quote */}
        <div className="reveal">
          <p className="section-label add-margin-bottom-40">Our Craft</p>
          <blockquote className="blockquote-big" style={{ color: 'var(--z40-offwhite)' }}>
            "We don't just brew beer — we brew experiences."
          </blockquote>
          <p className="set-text-12 add-margin-top-32" style={{ letterSpacing: '0.15em', color: 'var(--z40-amber)', textTransform: 'uppercase' }}>
            — Zero40 Brewing Co.
          </p>
        </div>

        {/* Right — Copy + Stats */}
        <div className="reveal reveal-d2">
          <p className="set-text-16 line-height-loose add-margin-bottom-56 on-mobile:add-margin-bottom-32"
            style={{ color: 'rgba(245,240,232,0.7)', fontWeight: 300 }}>
            Born in 2016 out of a deep love for craft culture, Zero40 Brewing was built to challenge
            what beer means in Hyderabad. Every batch we brew is a deliberate act — carefully
            temperature-controlled, ingredient-obsessed, and designed to tell a story in the glass.
            From our signature lagers to rotating seasonal specials, we marry technical precision
            with raw creative passion to deliver flavours the city has never tasted before.
          </p>

          <div className="make-flex flex-wrap add-padding-left-48 on-mobile:add-padding-left-0">
            {stats.map((s, i) => (
              <React.Fragment key={s.value}>
                <div className={`add-padding-x-32 ${i === 0 ? 'add-padding-left-0' : ''}`}>
                  <div className="font-display set-text-40 add-margin-bottom-4" style={{ color: 'var(--z40-amber)', lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div className="set-text-11 text-semibold" style={{ letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)' }}>
                    {s.label}
                  </div>
                </div>
                {i < stats.length - 1 && <div className="stat-divider" />}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

/* ─── FEATURED BREWS ──────────────────────────────────────────────────────── */
const FeaturedBrews = () => {
  const beers = [
    { name: 'Zero Lager',      style: 'Munich Lager',      abv: '4.5%', color: '#D4860B', note: 'Crisp, clean, and refreshingly smooth. Our flagship brew with a subtle golden malt backbone and a dry, satisfying finish.' },
    { name: 'Wheat Wit',       style: 'Belgian Witbier',   abv: '4.8%', color: '#F0A500', note: 'Hazy straw-gold with bright notes of orange peel and coriander. Silky soft body with a pillowy, effervescent finish.' },
    { name: 'Hop Bomb IPA',    style: 'West Coast IPA',    abv: '6.5%', color: '#7a9e2e', note: 'Bold citrus, pine resin, and a wave of tropical aroma. Firm, bitter backbone balanced by clean dry malt.' },
    { name: 'Midnight Porter', style: 'Robust Porter',     abv: '5.2%', color: '#6b3a2a', note: 'Dark chocolate, roasted espresso, and a velvety smooth body. A contemplative nightcap in a glass.' },
    { name: 'Copper Ale',      style: 'American Amber Ale',abv: '5.0%', color: '#8B4E1E', note: 'Rich caramel malt character with earthy noble hops. Warm, balanced, and endlessly sessionable.' },
    { name: 'Saison du Déccan',style: 'Farmhouse Saison',  abv: '5.8%', color: '#c4a35a', note: 'Our seasonal tribute — spicy yeast, ripe stone fruit, and a bone-dry effervescent finish. Limited batches only.' },
  ];

  return (
    <section id="menu" className="grain-overlay overflow-hidden" style={{ background: '#080808', padding: 'clamp(5rem, 10vw, 9rem) 0' }}>

      <div className="add-padding-x-80 add-margin-bottom-56 on-mobile:add-padding-x-24 reveal">
        <p className="section-label add-margin-bottom-20">What's Brewing</p>
        <h2 className="heading-hero" style={{ color: 'var(--z40-offwhite)' }}>On Tap Now</h2>
      </div>

      <div className="beer-scroll make-grid grid-auto-fit-min-280 gap-20 overflow-x-auto add-padding-x-80 add-padding-bottom-32 on-mobile:add-padding-x-24"
        style={{ paddingTop: '0.5rem' }}>
        {beers.map((beer, i) => (
          <div key={beer.name} className={`beer-card add-padding-32 reveal reveal-d${Math.min(i + 1, 4)}`}>

            <div className="make-flex justify-between align-start add-margin-bottom-24">
              <div>
                <div className="set-text-11 text-semibold add-margin-bottom-12 add-padding-x-8 add-padding-y-4"
                  style={{ display: 'inline-block', letterSpacing: '0.2em', textTransform: 'uppercase', color: beer.color, border: `1px solid ${beer.color}55` }}>
                  {beer.style}
                </div>
                <h3 className="font-display set-text-28 text-uppercase" style={{ color: 'var(--z40-offwhite)', lineHeight: 1, letterSpacing: '0.02em' }}>
                  {beer.name}
                </h3>
              </div>
              <div className="font-display set-text-18 add-margin-left-16" style={{ color: beer.color, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                {beer.abv}
              </div>
            </div>

            <div className="add-margin-bottom-20" style={{ height: '1px', background: `${beer.color}30` }} />

            <p className="set-text-14 line-height-relaxed" style={{ color: 'rgba(245,240,232,0.6)', fontWeight: 300 }}>
              {beer.note}
            </p>

            <div className="add-margin-top-24">
              <div style={{ height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px' }}>
                <div style={{ height: '100%', width: `${(parseFloat(beer.abv) / 8) * 100}%`, background: beer.color, borderRadius: '1px', transition: 'width 1s ease' }} />
              </div>
              <div className="make-flex justify-between add-margin-top-6">
                <span className="set-text-11" style={{ color: 'rgba(245,240,232,0.3)', letterSpacing: '0.1em' }}>ABV</span>
                <span className="set-text-11" style={{ color: beer.color, letterSpacing: '0.1em' }}>{beer.abv}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── TWO LOCATIONS ───────────────────────────────────────────────────────── */
const TwoLocations = () => {
  const locations = [
    { name: 'Jubilee Hills',      address: '271/A, Road No.10, Jubilee Hills,\nHyderabad, Telangana 500033', hours: 'Tue–Sun · 12:00 PM – 11:59 PM\nMonday Closed', phones: [{ num: '73308 40040', tel: '+917330840040' }, { num: '91825 28150', tel: '+919182528150' }], mapsUrl: 'https://maps.google.com/?q=Zero40+Brewing+Jubilee+Hills+Hyderabad',        num: '01', accent: 'var(--z40-amber)', bg: 'linear-gradient(135deg,#1a0f00 0%,#0D0D0D 100%)' },
    { name: 'Financial District',  address: 'Financial District, Nanakramguda,\nHyderabad, Telangana 500032', hours: 'Tue–Sun · 12:00 PM – 11:59 PM\nMonday Closed', phones: [{ num: '72079 11036', tel: '+917207911036' }, { num: '72079 11039', tel: '+917207911039' }, { num: '72079 11040', tel: '+917207911040' }], mapsUrl: 'https://maps.google.com/?q=Zero40+Brewing+Financial+District+Hyderabad', num: '02', accent: 'var(--z40-gold)',  bg: 'linear-gradient(135deg,#0D0D0D 0%,#0a0d12 100%)' },
  ];

  return (
    <section className="make-grid grid-cols-2 on-mobile:grid-cols-1">
      {locations.map(loc => (
        <div key={loc.name} className="loc-panel grain-overlay" style={{ minHeight: 'clamp(380px,55vw,560px)', background: loc.bg }}>
          <div className="loc-overlay" />
          <div className="loc-details">
            <p className="section-label add-margin-bottom-16" style={{ color: loc.accent }}>Location {loc.num}</p>
            <h3 className="heading-lg add-margin-bottom-24" style={{ color: 'var(--z40-offwhite)' }}>{loc.name}</h3>
            <p className="set-text-14 add-margin-bottom-12" style={{ lineHeight: 1.75, color: 'rgba(245,240,232,0.65)', whiteSpace: 'pre-line' }}>{loc.address}</p>
            <p className="set-text-13 add-margin-bottom-24" style={{ lineHeight: 1.7, color: 'rgba(245,240,232,0.45)', whiteSpace: 'pre-line' }}>{loc.hours}</p>
            <div className="make-flex flex-wrap align-center gap-20">
              <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-display set-text-13"
                style={{ letterSpacing: '0.15em', textTransform: 'uppercase', color: loc.accent, textDecoration: 'none', borderBottom: `1px solid ${loc.accent}66`, paddingBottom: '2px' }}>
                Get Directions →
              </a>
              <div className="make-flex flex-wrap gap-12">
                {loc.phones.map(p => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="set-text-13" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    {p.num}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

/* ─── THE TRIBE ───────────────────────────────────────────────────────────── */
const TheTribe = () => (
  <section id="tribe-membership" className="grain-overlay section-pad position-relative overflow-hidden" style={{ background: '#0a0806' }}>
    <div className="tribe-bg-text">TRIBE</div>

    <div className="reveal position-relative set-max-width-768" style={{ zIndex: 2 }}>
      <div className="tribe-accent" />
      <p className="section-label add-margin-bottom-24">Exclusive Membership</p>
      <h2 className="heading-xl add-margin-bottom-40" style={{ color: 'var(--z40-offwhite)' }}>
        Join the<br /><span style={{ color: 'var(--z40-amber)' }}>Tribe.</span>
      </h2>

      <p className="set-text-16 line-height-loose add-margin-bottom-48 set-max-width-640"
        style={{ color: 'rgba(245,240,232,0.65)', fontWeight: 300 }}>
        The Zero40 Tribe is our inner circle — a membership crafted for those who take their pint
        seriously. Unlock priority reservations, exclusive member pricing, early access to seasonal
        releases, invitations to private brew days, and a community of Hyderabad's most passionate
        beer lovers. One city, one tribe, one obsession.
      </p>

      <div className="make-flex flex-wrap gap-40 add-margin-bottom-48">
        {['Priority Reservations', 'Member Pricing', 'Exclusive Releases', 'Brew Day Access'].map(perk => (
          <div key={perk} className="make-flex align-center gap-10">
            <span className="set-text-11" style={{ color: 'var(--z40-amber)' }}>✦</span>
            <span className="set-text-12 text-semibold" style={{ letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)' }}>{perk}</span>
          </div>
        ))}
      </div>

      <a href="/z40-brewfast-club" className="btn btn-amber">Learn More →</a>
    </div>
  </section>
);

/* ─── RESERVE ─────────────────────────────────────────────────────────────── */
const Reserve = () => {
  const [form, setForm] = useState({ name: '', phone: '', date: '', size: '', location: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="reservations" className="section-pad" style={{ background: 'var(--z40-offwhite)' }}>
      <div className="set-max-width-640 add-margin-x-auto">

        <div className="reveal text-center add-margin-bottom-64">
          <p className="section-label center copper add-margin-bottom-20">Make a Booking</p>
          <h2 className="heading-xl" style={{ color: 'var(--z40-black)' }}>
            Book Your<br />Table
          </h2>
        </div>

        {submitted ? (
          <div className="reveal visible text-center add-padding-y-48 add-padding-x-32">
            <div className="font-display set-text-48 add-margin-bottom-16" style={{ color: 'var(--z40-amber)' }}>✓</div>
            <h3 className="font-display set-text-28 text-uppercase add-margin-bottom-16" style={{ color: 'var(--z40-black)' }}>
              Reservation Received!
            </h3>
            <p className="set-text-14 line-height-relaxed" style={{ color: 'rgba(13,13,13,0.6)' }}>
              We'll confirm your table at <strong>{form.location || 'Zero40 Brewing'}</strong> within 30 minutes.
              Check your phone for a WhatsApp message from our team.
            </p>
            <button className="btn btn-dark add-margin-top-32" onClick={() => setSubmitted(false)}>
              Make Another Reservation
            </button>
          </div>
        ) : (
          <form className="reveal" onSubmit={handleSubmit}>
            <div className="make-grid grid-cols-2 on-mobile:grid-cols-1 gap-x-48">
              {[
                { label: 'Full Name',    name: 'name',  type: 'text',   placeholder: 'Your name',     required: true },
                { label: 'Phone Number', name: 'phone', type: 'tel',    placeholder: '+91 98XXX XXXXX',required: true },
                { label: 'Date',         name: 'date',  type: 'date',   placeholder: '',              required: true },
                { label: 'Party Size',   name: 'size',  type: 'number', placeholder: '2',             required: true },
              ].map(field => (
                <div key={field.name} className="add-margin-bottom-36">
                  <label className="set-text-11 text-semibold add-margin-bottom-8" style={{ display: 'block', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(13,13,13,0.45)' }}>
                    {field.label}
                  </label>
                  <input className="z40-field" name={field.name} type={field.type} placeholder={field.placeholder}
                    required={field.required} value={form[field.name]} onChange={handleChange}
                    min={field.type === 'number' ? 1 : undefined} max={field.type === 'number' ? 50 : undefined} />
                </div>
              ))}

              <div className="add-margin-bottom-36" style={{ gridColumn: '1 / -1' }}>
                <label className="set-text-11 text-semibold add-margin-bottom-8" style={{ display: 'block', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(13,13,13,0.45)' }}>
                  Preferred Location
                </label>
                <select className="z40-field" name="location" required value={form.location} onChange={handleChange}
                  style={{ color: form.location ? 'var(--z40-black)' : 'rgba(13,13,13,0.4)' }}>
                  <option value="" disabled>Select a location</option>
                  <option value="Jubilee Hills">Jubilee Hills</option>
                  <option value="Financial District">Financial District</option>
                </select>
              </div>
            </div>

            <div className="text-center add-margin-top-16">
              <button type="submit" className="btn btn-dark" style={{ minWidth: '220px' }}>Confirm Reservation</button>
              <p className="set-text-12 add-margin-top-20" style={{ color: 'rgba(13,13,13,0.4)', letterSpacing: '0.05em' }}>
                We'll confirm via WhatsApp within 30 minutes.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

/* ─── FOOTER ──────────────────────────────────────────────────────────────── */
const Footer = () => {
  const navLinks = ['Menu', 'Our Brewery', 'Tribe Membership', 'Party Packages', 'Reservations'];

  return (
    <footer className="grain-overlay" style={{ background: '#080808', borderTop: '1px solid rgba(212,134,11,0.15)' }}>
      <div className="section-pad text-center">

        <div className="make-flex justify-center add-margin-bottom-32">
          <Logo size={72} />
        </div>

        <p className="font-display set-text-11 add-margin-bottom-40"
          style={{ letterSpacing: '0.3em', color: 'var(--z40-amber)', textTransform: 'uppercase' }}>
          Dialed In Since 2016
        </p>

        <div className="make-flex flex-wrap justify-center gap-x-32 gap-y-8 add-margin-bottom-40">
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, '-')}`} className="nav-link">{l}</a>
          ))}
        </div>

        <hr className="amber-hr set-max-width-384 add-margin-x-auto add-margin-bottom-40" />

        <div className="make-flex justify-center gap-24 add-margin-bottom-40">
          <a href="https://instagram.com/zero40brewing" target="_blank" rel="noopener noreferrer" className="social-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://wa.me/917330840040" target="_blank" rel="noopener noreferrer" className="social-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </a>
          <a href="tel:+917330840040" className="social-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </a>
        </div>

        <a href="mailto:strategy@zero40.com" style={{ display: 'inline-block', marginBottom: '1.25rem', color: 'rgba(212,134,11,0.7)', fontSize: '0.82rem', letterSpacing: '0.08em', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseOver={e => e.currentTarget.style.color = 'var(--z40-amber)'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(212,134,11,0.7)'}>
          strategy@zero40.com
        </a>

        <p className="set-text-11 line-height-relaxed" style={{ color: 'rgba(245,240,232,0.25)', letterSpacing: '0.08em' }}>
          © 2024 Zero40 Brewing Co. · Hyderabad, Telangana, India<br />
          <span style={{ letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.62rem' }}>
            Drink Responsibly · Must be 21+ to consume alcohol
          </span>
        </p>
      </div>
    </footer>
  );
};

/* ─── ROOT ────────────────────────────────────────────────────────────────── */
const Zero40HomePage = () => {
  useReveal();
  useSEO(
    'Zero40 Brewing Co. — Craft Beer in Hyderabad | Jubilee Hills',
    'Zero40 Brewing is Hyderabad\'s premier craft microbrewery. 8+ beers on tap, two locations in Jubilee Hills. Book a table or join the Brewfast Club.'
  );
  return (
    <>
      <BrandStyles />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <OurCraft />
        <FeaturedBrews />
        <MenuSection />
        <TwoLocations />
        <TheTribe />
        <Reserve />
      </main>
      <Footer />
    </>
  );
};

export default Zero40HomePage;
