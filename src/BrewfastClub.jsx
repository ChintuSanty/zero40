import React, { useState, useEffect } from 'react';

/* ─── PAGE STYLES ─────────────────────────────────────────────────────────── */
const BrewfastStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

    :root {
      --z40-black:    #0D0D0D;
      --z40-amber:    #D4860B;
      --z40-gold:     #F0A500;
      --z40-offwhite: #F5F0E8;
      --z40-copper:   #8B4E1E;
      --santy-primary: #D4860B;
      --santy-font:    'Inter', system-ui, sans-serif;
      --santy-radius:  2px;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: var(--z40-black); color: var(--z40-offwhite); font-family: 'Inter', sans-serif; overflow-x: hidden; }

    /* ── Grain overlay ── */
    .grain-overlay { position: relative; isolation: isolate; }
    .grain-overlay::after {
      content: ''; position: absolute; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      background-size: 200px 200px; opacity: 0.04; pointer-events: none; z-index: 10; mix-blend-mode: overlay;
    }

    /* ── Reveal ── */
    .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-d1 { transition-delay: 0.1s; }
    .reveal-d2 { transition-delay: 0.2s; }
    .reveal-d3 { transition-delay: 0.3s; }
    .reveal-d4 { transition-delay: 0.4s; }

    /* ── Navbar ── */
    .z40-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; transition: background 0.35s, box-shadow 0.35s; }
    .z40-nav.solid { background: rgba(13,13,13,0.96); backdrop-filter: blur(12px); box-shadow: 0 1px 0 rgba(212,134,11,0.2); }
    .nav-link { color: var(--z40-offwhite); text-decoration: none; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.75; transition: opacity 0.2s, color 0.2s; }
    .nav-link:hover { opacity: 1; color: var(--z40-amber); }
    .nav-link.active { opacity: 1; color: var(--z40-amber); }
    .logo-badge { border-radius: 50%; border: 2px solid var(--z40-amber); background: var(--z40-black); font-family: 'Anton', sans-serif; letter-spacing: 0.18em; color: var(--z40-amber); text-align: center; line-height: 1.1; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
    .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 0; }
    .hamburger span { display: block; width: 24px; height: 2px; background: var(--z40-offwhite); }
    @media (max-width: 900px) { .nav-links { display: none !important; } .nav-cta { display: none !important; } .hamburger { display: flex; } }
    .mobile-menu { position: fixed; inset: 0; background: rgba(13,13,13,0.98); z-index: 199; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2.5rem; transform: translateX(100%); transition: transform 0.4s ease; }
    .mobile-menu.open { transform: translateX(0); }
    .mobile-menu a { font-family: 'Anton', sans-serif; font-size: 2.2rem; letter-spacing: 0.1em; color: var(--z40-offwhite); text-decoration: none; text-transform: uppercase; }
    .mobile-menu a:hover { color: var(--z40-amber); }

    /* ── Section label ── */
    .section-label { font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--z40-amber); font-weight: 500; display: flex; align-items: center; gap: 0.75rem; }
    .section-label::before { content: ''; display: block; width: 32px; height: 1px; background: var(--z40-amber); }
    .section-label.center { justify-content: center; }
    .section-label.center::before { display: none; }
    .section-label.copper { color: var(--z40-copper); }

    /* ── Buttons ── */
    .btn { font-family: 'Anton', sans-serif; letter-spacing: 0.15em; text-transform: uppercase; font-size: 0.85rem; cursor: pointer; border: none; text-decoration: none; transition: all 0.25s ease; line-height: 1; display: inline-block; padding: 0.9rem 2.2rem; }
    .btn-amber { background: var(--z40-amber); color: var(--z40-black); }
    .btn-amber:hover { background: var(--z40-gold); }
    .btn-amber-sm { background: var(--z40-amber); color: var(--z40-black); padding: 0.65rem 1.4rem; font-size: 0.75rem; }
    .btn-amber-sm:hover { background: var(--z40-gold); }
    .btn-outline { background: transparent; border: 2px solid var(--z40-offwhite); color: var(--z40-offwhite); }
    .btn-outline:hover { background: var(--z40-offwhite); color: var(--z40-black); }
    .btn-outline-amber { background: transparent; border: 2px solid var(--z40-amber); color: var(--z40-amber); }
    .btn-outline-amber:hover { background: var(--z40-amber); color: var(--z40-black); }
    .btn-dark { background: var(--z40-black); color: var(--z40-offwhite); border: 2px solid var(--z40-offwhite); }
    .btn-dark:hover { background: var(--z40-amber); border-color: var(--z40-amber); color: var(--z40-black); }
    .btn-full { display: block; width: 100%; text-align: center; }

    /* ── Headings ── */
    .font-display { font-family: 'Anton', sans-serif; }
    .heading-hero { font-family: 'Anton', sans-serif; text-transform: uppercase; font-size: clamp(3rem, 8vw, 7rem); line-height: 0.88; letter-spacing: -0.01em; }
    .heading-xl   { font-family: 'Anton', sans-serif; text-transform: uppercase; font-size: clamp(2.4rem, 5vw, 4rem); line-height: 0.9; letter-spacing: -0.01em; }
    .heading-lg   { font-family: 'Anton', sans-serif; text-transform: uppercase; font-size: clamp(1.6rem, 3vw, 2.4rem); line-height: 1; }
    .section-pad  { padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem); }

    /* ── Hero ── */
    .bc-hero-bg {
      background:
        radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,134,11,0.2) 0%, transparent 70%),
        radial-gradient(ellipse 40% 30% at 80% 10%, rgba(139,78,30,0.12) 0%, transparent 60%),
        linear-gradient(175deg, #0D0D0D 0%, #120d02 50%, #0D0D0D 100%);
    }
    .bc-hero-stamp {
      position: absolute; right: clamp(1.5rem, 6vw, 5rem); top: 50%; transform: translateY(-50%);
      width: clamp(140px, 18vw, 220px); height: clamp(140px, 18vw, 220px);
      border-radius: 50%; border: 2px solid rgba(212,134,11,0.25);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      font-family: 'Anton', sans-serif; text-align: center; gap: 4px;
      background: rgba(212,134,11,0.05);
    }
    @media (max-width: 900px) { .bc-hero-stamp { display: none; } }
    @keyframes rotateSlow { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }
    @keyframes rotateMobile { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .bc-hero-stamp-ring { animation: rotateSlow 30s linear infinite; }
    .bc-hero-stamp-mobile { display: none; }
    @media (max-width: 900px) {
      .bc-hero-stamp-mobile {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        position: relative; width: 130px; height: 130px; border-radius: 50%;
        border: 2px solid rgba(212,134,11,0.25); background: rgba(212,134,11,0.05);
        font-family: 'Anton', sans-serif; text-align: center; gap: 4px;
        margin-top: 2rem; margin-bottom: 2rem;
      }
      .bc-hero-stamp-mobile .bc-hero-stamp-ring { animation: rotateMobile 30s linear infinite; }
    }
    @keyframes amberPulse { 0%,100%{opacity:0.12} 50%{opacity:0.25} }
    .amber-glow { animation: amberPulse 4s ease-in-out infinite; }

    /* ── Marquee ── */
    @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    .marquee-track { animation: ticker 30s linear infinite; display: flex; white-space: nowrap; width: max-content; }
    .marquee-track:hover { animation-play-state: paused; }

    /* ── Tier cards ── */
    .tier-card {
      position: relative; overflow: hidden;
      border: 1px solid rgba(212,134,11,0.2);
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(10px);
      transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
    }
    .tier-card:hover { transform: translateY(-8px); box-shadow: 0 24px 64px rgba(212,134,11,0.12); border-color: rgba(212,134,11,0.55); }
    .tier-card.featured { border-color: var(--z40-amber); background: rgba(212,134,11,0.06); }
    .tier-card.featured:hover { box-shadow: 0 28px 72px rgba(212,134,11,0.2); }
    .tier-badge { position: absolute; top: 0; right: 2rem; font-family: 'Anton', sans-serif; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; background: var(--z40-amber); color: var(--z40-black); padding: 0.3rem 0.8rem 0.25rem; }
    .tier-divider { height: 1px; background: rgba(212,134,11,0.2); }
    .perk-check { color: var(--z40-amber); font-size: 0.75rem; flex-shrink: 0; margin-top: 2px; }
    .perk-cross { color: rgba(245,240,232,0.2); font-size: 0.75rem; flex-shrink: 0; margin-top: 2px; }

    /* ── Perk cards ── */
    .perk-card {
      border: 1px solid rgba(212,134,11,0.15);
      background: rgba(255,255,255,0.02);
      transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
    }
    .perk-card:hover { transform: translateY(-4px); border-color: rgba(212,134,11,0.4); background: rgba(212,134,11,0.05); }
    .perk-icon-wrap { width: 52px; height: 52px; border: 1px solid rgba(212,134,11,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

    /* ── FAQ ── */
    .faq-item { border-bottom: 1px solid rgba(212,134,11,0.15); cursor: pointer; }
    .faq-item:first-child { border-top: 1px solid rgba(212,134,11,0.15); }
    .faq-arrow { transition: transform 0.3s ease; }
    .faq-arrow.open { transform: rotate(180deg); }
    .faq-body { overflow: hidden; transition: max-height 0.4s ease, padding 0.3s ease; }

    /* ── How it works ── */
    .step-card { position: relative; }
    .step-num { font-family: 'Anton', sans-serif; font-size: clamp(4rem, 8vw, 7rem); line-height: 1; color: rgba(212,134,11,0.08); position: absolute; top: 0; left: 0; }
    .step-content { position: relative; padding-left: clamp(3.5rem, 6vw, 5rem); padding-top: 1rem; }

    /* ── Misc ── */
    .amber-hr { border: none; border-top: 1px solid rgba(212,134,11,0.2); }
    .social-icon { color: rgba(245,240,232,0.45); transition: color 0.2s; text-decoration: none; }
    .social-icon:hover { color: var(--z40-amber); }
    .back-link { color: rgba(245,240,232,0.5); text-decoration: none; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 500; transition: color 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; }
    .back-link:hover { color: var(--z40-amber); }

    /* ── Testimonial cards ── */
    .testi-card { border: 1px solid rgba(212,134,11,0.15); background: rgba(255,255,255,0.02); position: relative; }
    .testi-card::before { content: '"'; font-family: 'Anton', sans-serif; font-size: 6rem; line-height: 0.7; color: rgba(212,134,11,0.12); position: absolute; top: 1.5rem; left: 2rem; }

    /* ── Hero stats grid ── */
    .hero-stats {
      display: flex; flex-wrap: nowrap; gap: 0;
      margin-top: 4rem; padding-top: 3rem;
      border-top: 1px solid rgba(212,134,11,0.15);
    }
    .hero-stats-item { padding-right: 2.5rem; padding-bottom: 0; }
    @media (max-width: 900px) {
      .hero-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
      .hero-stats-item {
        padding: 1.25rem 1rem;
        border: 1px solid rgba(212,134,11,0.12);
      }
      .hero-stats-item:nth-child(odd) { border-right: none; }
      .hero-stats-item:nth-child(1),
      .hero-stats-item:nth-child(2) { border-bottom: none; }
      .hero-stats-divider { display: none; }
    }

    /* ── Toggle billing ── */
    .billing-toggle { display: flex; align-items: center; gap: 0; border: 1px solid rgba(212,134,11,0.3); overflow: hidden; }
    .billing-opt { font-family: 'Anton', sans-serif; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.6rem 1.4rem; cursor: pointer; border: none; background: transparent; color: rgba(245,240,232,0.5); transition: all 0.2s; }
    .billing-opt.active { background: var(--z40-amber); color: var(--z40-black); }
  `}</style>
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
  { label: 'Home',             href: '/' },
  { label: 'Menu',             href: '/#menu' },
  { label: 'Tribe Membership', href: '/#tribe-membership' },
  { label: 'Party Packages',   href: '/#party-packages' },
  { label: 'Our Brewery',      href: '/our-brewery' },
  { label: 'Brewfast Club',    href: '/z40-brewfast-club', active: true },
];

/* ─── REVEAL HOOK ─────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
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

/* ─── NAVBAR ──────────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav className={`z40-nav make-flex align-center justify-between add-padding-x-32 set-height-72 ${scrolled ? 'solid' : ''}`}>
        <a href="/" style={{ textDecoration: 'none' }} aria-label="Zero40 Brewing Home"><Logo /></a>
        <div className="nav-links make-flex gap-32">
          {NAV_LINKS.map(({ label, href, active }) => (
            <a key={label} href={href} className={`nav-link${active ? ' active' : ''}`}>{label}</a>
          ))}
        </div>
        <a href="/#reservations" className="btn btn-amber-sm nav-cta">Reserve a Table</a>
        <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button onClick={() => setMobileOpen(false)}
          style={{ position:'absolute', top:'1.5rem', right:'2rem', background:'none', border:'none', color:'var(--z40-offwhite)', fontSize:'2rem', cursor:'pointer', lineHeight:1 }}>×</button>
        {NAV_LINKS.map(({ label, href }) => (
          <a key={label} href={href} onClick={() => setMobileOpen(false)}>{label}</a>
        ))}
        <a href="/#reservations" className="btn btn-amber" onClick={() => setMobileOpen(false)}>Reserve a Table</a>
      </div>
    </>
  );
};

/* ─── HERO ────────────────────────────────────────────────────────────────── */
const Hero = () => (
  <section className="bc-hero-bg grain-overlay make-flex align-center position-relative overflow-hidden set-min-height-dvh">
    <div className="amber-glow position-absolute set-width-full"
      style={{ bottom: '-5%', height: '50vh', background: 'radial-gradient(ellipse, rgba(212,134,11,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

    {/* Rotating stamp */}
    <div className="bc-hero-stamp" style={{ zIndex: 2 }}>
      <svg className="bc-hero-stamp-ring" viewBox="0 0 200 200" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
        <path id="circlePath" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" fill="none"/>
        <text fontSize="13" fontFamily="Anton" letterSpacing="14" fill="rgba(212,134,11,0.5)" textTransform="uppercase">
          <textPath href="#circlePath">DIALED IN SINCE 2016 · ZERO40 ·</textPath>
        </text>
      </svg>
      <div className="font-display set-text-11 text-center" style={{ color:'rgba(212,134,11,0.6)', letterSpacing:'0.2em', lineHeight:1.4 }}>
        MEMBER<br />
        <span style={{ fontSize:'2rem', color:'var(--z40-amber)', lineHeight:1 }}>Z40</span><br />
        CLUB
      </div>
    </div>

    {/* Content */}
    <div className="position-relative add-padding-x-80 add-padding-top-128 on-mobile:add-padding-x-24 set-max-width-900" style={{ zIndex: 2 }}>
      <a href="/" className="back-link add-margin-bottom-40" style={{ display:'inline-flex' }}>← Back to Zero40</a>

      <p className="section-label add-margin-bottom-28">Exclusive Membership Programme</p>

      <h1 className="heading-hero add-margin-bottom-24" style={{ color: 'var(--z40-offwhite)' }}>
        THE<br />
        <span style={{ color: 'var(--z40-amber)' }}>BREWFAST</span><br />
        CLUB
      </h1>

      <p className="set-text-18 on-mobile:set-text-16"
        style={{ fontWeight:300, lineHeight:1.7, color:'rgba(245,240,232,0.65)', maxWidth:'520px' }}>
        Hyderabad's most exclusive craft beer membership. Perks, priority, and pints — for those who take their brews seriously.
      </p>

      {/* Mobile-only stamp — shown below paragraph on small screens */}
      <div className="bc-hero-stamp-mobile">
        <svg className="bc-hero-stamp-ring" viewBox="0 0 200 200" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
          <path id="circlePathM" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" fill="none"/>
          <text fontSize="13" fontFamily="Anton" letterSpacing="14" fill="rgba(212,134,11,0.5)">
            <textPath href="#circlePathM">DIALED IN SINCE 2016 · ZERO40 ·</textPath>
          </text>
        </svg>
        <div className="font-display set-text-11 text-center" style={{ color:'rgba(212,134,11,0.6)', letterSpacing:'0.2em', lineHeight:1.4 }}>
          MEMBER<br />
          <span style={{ fontSize:'1.6rem', color:'var(--z40-amber)', lineHeight:1 }}>Z40</span><br />
          CLUB
        </div>
      </div>

      <div className="make-flex flex-wrap gap-16">
        <a href="#membership-tiers" className="btn btn-amber">Explore Plans</a>
        <a href="#how-it-works" className="btn btn-outline">How It Works</a>
      </div>

      {/* Stats strip */}
      <div className="hero-stats">
        {[['500+','Active Members'],['₹0','Joining Fee'],['3','Membership Tiers'],['15%+','Average Savings']].map(([v,l],i,arr) => (
          <React.Fragment key={l}>
            <div className="hero-stats-item">
              <div className="font-display set-text-36 add-margin-bottom-4" style={{ color:'var(--z40-amber)', lineHeight:1 }}>{v}</div>
              <div className="set-text-11 text-semibold" style={{ letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(245,240,232,0.4)' }}>{l}</div>
            </div>
            {i < arr.length-1 && <div className="hero-stats-divider" style={{ width:'1px', height:'44px', background:'rgba(212,134,11,0.2)', alignSelf:'center', marginRight:'2.5rem' }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

/* ─── MARQUEE ─────────────────────────────────────────────────────────────── */
const Marquee = () => {
  const items = ['WELCOME PINT ON US','PRIORITY RESERVATIONS','MEMBER-ONLY EVENTS','HAPPY HOUR ALWAYS ON','BIRTHDAY SURPRISES','EXCLUSIVE RELEASES','BREW DAY ACCESS','COMPLIMENTARY TASTINGS'];
  const rep = [...items,...items];
  return (
    <div className="overflow-hidden add-padding-y-12" style={{ background:'var(--z40-amber)', borderTop:'1px solid rgba(0,0,0,0.2)', borderBottom:'1px solid rgba(0,0,0,0.2)' }}>
      <div className="marquee-track">
        {rep.map((item,i) => (
          <span key={i} className="font-display add-padding-right-48 set-text-13" style={{ letterSpacing:'0.2em', color:'var(--z40-black)' }}>
            {item}&nbsp;&nbsp;<span style={{ opacity:0.45 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── HOW IT WORKS ────────────────────────────────────────────────────────── */
const HowItWorks = () => {
  const steps = [
    { n:'01', title:'Pick Your Plan',    body:'Choose from Tap, Craft, or Brew Master. Monthly or annual — cancel anytime, no questions.' },
    { n:'02', title:'Get Your Z40 Card', body:'Your digital + physical membership card arrives within 48 hours. Flash it at either location.' },
    { n:'03', title:'Walk In, Drink Up',  body:'Show your card at the bar. Your welcome pint is waiting. Your perks activate immediately.' },
    { n:'04', title:'Level Up',          body:'The more you visit, the more you unlock. Earn Brew Points and redeem them for pints and merch.' },
  ];
  return (
    <section id="how-it-works" className="grain-overlay section-pad" style={{ background:'#080808' }}>
      <div className="set-max-width-1400 add-margin-x-auto">
        <div className="reveal text-center add-margin-bottom-64">
          <p className="section-label center add-margin-bottom-20">Simple Process</p>
          <h2 className="heading-xl" style={{ color:'var(--z40-offwhite)' }}>How It Works</h2>
        </div>

        <div className="make-grid grid-cols-4 on-mobile:grid-cols-1 md:grid-cols-2 gap-48 reveal">
          {steps.map((s,i) => (
            <div key={s.n} className={`step-card reveal reveal-d${i+1}`}>
              <div className="step-num">{s.n}</div>
              <div className="step-content">
                <div className="add-margin-bottom-20" style={{ width:'32px', height:'2px', background:'var(--z40-amber)' }} />
                <h3 className="heading-lg add-margin-bottom-16" style={{ color:'var(--z40-offwhite)' }}>{s.title}</h3>
                <p className="set-text-15 line-height-relaxed" style={{ color:'rgba(245,240,232,0.55)', fontWeight:300 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── MEMBERSHIP TIERS ────────────────────────────────────────────────────── */
const MembershipTiers = () => {
  const [billing, setBilling] = useState('monthly');

  const tiers = [
    {
      name: 'TAP',
      subtitle: 'For the casual pint lover',
      price: { monthly: 499, annual: 399 },
      color: 'rgba(245,240,232,0.7)',
      accent: 'rgba(245,240,232,0.2)',
      featured: false,
      badge: null,
      perks: [
        { text: '1 Welcome Pint on sign-up',        included: true },
        { text: '10% off on all beverages',          included: true },
        { text: 'Happy Hour: Mon–Thu extra 30 mins', included: true },
        { text: 'Birthday pint (any visit that month)',included: true },
        { text: 'Member newsletter & tap updates',   included: true },
        { text: 'Priority reservation window',       included: false },
        { text: 'Complimentary tasting flights',     included: false },
        { text: 'Invite to Brew Days',               included: false },
        { text: 'Early seasonal release access',     included: false },
        { text: 'Exclusive member events',           included: false },
        { text: 'Brew Points 2× multiplier',         included: false },
        { text: 'Dedicated table host',              included: false },
      ],
      cta: 'Join Tap',
      ctaStyle: 'btn-outline-amber',
    },
    {
      name: 'CRAFT',
      subtitle: 'For the dedicated regular',
      price: { monthly: 999, annual: 799 },
      color: 'var(--z40-amber)',
      accent: 'rgba(212,134,11,0.2)',
      featured: true,
      badge: 'Most Popular',
      perks: [
        { text: '2 Welcome Pints on sign-up',        included: true },
        { text: '15% off on all beverages',          included: true },
        { text: 'Happy Hour: all days, all hours',   included: true },
        { text: 'Birthday pint + dessert',           included: true },
        { text: 'Member newsletter & tap updates',   included: true },
        { text: '48-hour priority reservation window',included: true },
        { text: '1 complimentary tasting flight/month',included: true },
        { text: 'Invite to Brew Days (1/quarter)',   included: true },
        { text: 'Early seasonal release access',     included: true },
        { text: 'Exclusive member events',           included: false },
        { text: 'Brew Points 2× multiplier',         included: false },
        { text: 'Dedicated table host',              included: false },
      ],
      cta: 'Join Craft',
      ctaStyle: 'btn-amber',
    },
    {
      name: 'BREW MASTER',
      subtitle: 'For the true craft obsessive',
      price: { monthly: 2499, annual: 1999 },
      color: 'var(--z40-gold)',
      accent: 'rgba(240,165,0,0.15)',
      featured: false,
      badge: 'Premium',
      perks: [
        { text: '4 Welcome Pints on sign-up',        included: true },
        { text: '20% off on food & beverages',       included: true },
        { text: 'Happy Hour: all days, all hours',   included: true },
        { text: 'Birthday pint + dedicated table',   included: true },
        { text: 'Member newsletter & tap updates',   included: true },
        { text: '72-hour priority reservation window',included: true },
        { text: 'Unlimited tasting flights',         included: true },
        { text: 'Unlimited Brew Day invites',        included: true },
        { text: 'Early seasonal + exclusive releases',included: true },
        { text: 'VIP-only quarterly events',         included: true },
        { text: 'Brew Points 3× multiplier',         included: true },
        { text: 'Dedicated table host',              included: true },
      ],
      cta: 'Join Brew Master',
      ctaStyle: 'btn-amber',
    },
  ];

  return (
    <section id="membership-tiers" className="grain-overlay section-pad" style={{ background:'#0a0a0a' }}>
      <div className="set-max-width-1400 add-margin-x-auto">

        <div className="reveal text-center add-margin-bottom-16">
          <p className="section-label center add-margin-bottom-20">Choose Your Level</p>
          <h2 className="heading-xl add-margin-bottom-32" style={{ color:'var(--z40-offwhite)' }}>Membership Plans</h2>

          {/* Billing toggle */}
          <div className="make-flex justify-center add-margin-bottom-12">
            <div className="billing-toggle">
              <button className={`billing-opt ${billing==='monthly'?'active':''}`} onClick={() => setBilling('monthly')}>Monthly</button>
              <button className={`billing-opt ${billing==='annual'?'active':''}`} onClick={() => setBilling('annual')}>Annual</button>
            </div>
          </div>
          {billing === 'annual' && (
            <p className="set-text-13 add-margin-bottom-0" style={{ color:'var(--z40-amber)' }}>
              ✦ Save up to 20% with annual billing
            </p>
          )}
        </div>

        <div className="make-grid grid-cols-3 on-mobile:grid-cols-1 gap-24 add-margin-top-48">
          {tiers.map((tier, i) => (
            <div key={tier.name} className={`tier-card add-padding-40 reveal reveal-d${i+1} ${tier.featured ? 'featured' : ''}`}>
              {tier.badge && <div className="tier-badge">{tier.badge}</div>}

              {/* Header */}
              <div className="add-margin-bottom-32" style={{ paddingTop: tier.badge ? '1.5rem' : 0 }}>
                <p className="set-text-11 text-semibold add-margin-bottom-12" style={{ letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(245,240,232,0.4)' }}>
                  {tier.subtitle}
                </p>
                <h3 className="font-display set-text-40 add-margin-bottom-24" style={{ color: tier.color, lineHeight:1, letterSpacing:'0.02em' }}>
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="make-flex align-end gap-8">
                  <span className="font-display" style={{ fontSize:'clamp(2.2rem,4vw,3rem)', color:'var(--z40-offwhite)', lineHeight:1 }}>
                    ₹{billing==='monthly' ? tier.price.monthly : tier.price.annual}
                  </span>
                  <span className="set-text-13 add-margin-bottom-4" style={{ color:'rgba(245,240,232,0.4)' }}>
                    / {billing==='monthly' ? 'month' : 'month, billed annually'}
                  </span>
                </div>
                {billing === 'annual' && (
                  <p className="set-text-12 add-margin-top-8" style={{ color: tier.color }}>
                    Save ₹{(tier.price.monthly - tier.price.annual) * 12}/year
                  </p>
                )}
              </div>

              <div className="tier-divider add-margin-bottom-32" />

              {/* Perks list */}
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.85rem', marginBottom:'2.5rem' }}>
                {tier.perks.map(p => (
                  <li key={p.text} className="make-flex align-start gap-12">
                    <span className={p.included ? 'perk-check' : 'perk-cross'}>{p.included ? '✓' : '—'}</span>
                    <span className="set-text-14" style={{ color: p.included ? 'rgba(245,240,232,0.8)' : 'rgba(245,240,232,0.25)', fontWeight: p.included ? 400 : 300 }}>
                      {p.text}
                    </span>
                  </li>
                ))}
              </ul>

              <a href="#join" className={`btn ${tier.ctaStyle} btn-full`}>{tier.cta}</a>
            </div>
          ))}
        </div>

        <p className="text-center set-text-13 add-margin-top-32" style={{ color:'rgba(245,240,232,0.3)' }}>
          All plans include a physical + digital Z40 Member Card · No lock-in · Cancel anytime
        </p>
      </div>
    </section>
  );
};

/* ─── PERKS DEEP DIVE ─────────────────────────────────────────────────────── */
const PerksSection = () => {
  const perks = [
    {
      icon: '🍺',
      title: 'Welcome Pints',
      body: 'Start your membership right. Your welcome pints are poured the moment you walk in and show your Z40 card. No waiting, no vouchers.',
      tag: 'All tiers',
    },
    {
      icon: '⏰',
      title: 'Extended Happy Hour',
      body: 'Tap members get an extra 30 mins on happy hour. Craft and Brew Master? Happy Hour is every hour. Life is too short for bad timing.',
      tag: 'Craft & Brew Master',
    },
    {
      icon: '📅',
      title: 'Priority Reservations',
      body: 'Beat the crowd. Members get a private 48–72 hour advance booking window before tables open to the public. Your spot, secured.',
      tag: 'Craft & Brew Master',
    },
    {
      icon: '🧪',
      title: 'Tasting Flights',
      body: 'Sample what\'s new on the line-up. One complimentary flight per month on Craft, unlimited on Brew Master. Curated by our head brewer.',
      tag: 'Craft & Brew Master',
    },
    {
      icon: '🏭',
      title: 'Brew Day Access',
      body: 'Go behind the tanks. Join our brew team on live batch days, learn the process, and taste straight from the conditioning vessel.',
      tag: 'Craft & Brew Master',
    },
    {
      icon: '🎂',
      title: 'Birthday Perks',
      body: 'Your birthday month means a complimentary pint — on the house. Brew Masters get a dedicated table and full-party treatment.',
      tag: 'All tiers',
    },
    {
      icon: '🌱',
      title: 'Early Release Access',
      body: 'Seasonal specials and limited-edition batches land in your inbox before anyone else knows they exist. First pour, always.',
      tag: 'Craft & Brew Master',
    },
    {
      icon: '🪙',
      title: 'Brew Points',
      body: 'Every visit earns Brew Points. Redeem them for pints, merchandise, private table bookings, or donate to our local grain farmers initiative.',
      tag: 'All tiers',
    },
  ];

  return (
    <section className="grain-overlay section-pad" style={{ background:'#080808' }}>
      <div className="set-max-width-1400 add-margin-x-auto">
        <div className="reveal add-margin-bottom-56">
          <p className="section-label add-margin-bottom-20">What You Get</p>
          <div className="make-grid grid-cols-2 on-mobile:grid-cols-1 gap-8 align-end">
            <h2 className="heading-xl" style={{ color:'var(--z40-offwhite)' }}>Member Perks,<br /><span style={{ color:'var(--z40-amber)' }}>Unpacked.</span></h2>
            <p className="set-text-16 line-height-relaxed" style={{ color:'rgba(245,240,232,0.55)', fontWeight:300 }}>
              Every benefit is designed around one goal: making sure your time at Zero40 is always worth it. No filler perks, no fine print catches.
            </p>
          </div>
        </div>

        <div className="make-grid grid-cols-4 on-mobile:grid-cols-1 md:grid-cols-2 gap-20">
          {perks.map((p, i) => (
            <div key={p.title} className={`perk-card add-padding-32 reveal reveal-d${Math.min(i%4+1,4)}`}>
              <div className="perk-icon-wrap add-margin-bottom-24">
                <span style={{ fontSize:'1.4rem' }}>{p.icon}</span>
              </div>
              <div className="set-text-11 text-semibold add-margin-bottom-12" style={{ letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--z40-amber)' }}>
                {p.tag}
              </div>
              <h3 className="font-display set-text-20 add-margin-bottom-16 text-uppercase" style={{ color:'var(--z40-offwhite)', letterSpacing:'0.04em' }}>
                {p.title}
              </h3>
              <p className="set-text-14 line-height-relaxed" style={{ color:'rgba(245,240,232,0.5)', fontWeight:300 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── TESTIMONIALS ────────────────────────────────────────────────────────── */
const Testimonials = () => {
  const testimonials = [
    { name:'Arjun Reddy', tier:'Brew Master · 2 Years', quote:'The Brew Day experience alone is worth every rupee. I\'ve brought clients here just for that. Zero40 treats its members like family.' },
    { name:'Priya Mehta',  tier:'Craft Member · 1 Year',  quote:'Happy hour never ends when you\'re a Craft member. I\'ve saved more than I paid for the membership just on a busy Friday night.' },
    { name:'Sai Kumar',   tier:'Tap Member · 6 Months', quote:'Started on Tap just to see. Three months later I upgraded to Craft. The priority reservations on weekends alone made that decision easy.' },
  ];

  return (
    <section className="grain-overlay section-pad" style={{ background:'#0a0806' }}>
      <div className="set-max-width-1400 add-margin-x-auto">
        <div className="reveal text-center add-margin-bottom-56">
          <p className="section-label center add-margin-bottom-20">Member Stories</p>
          <h2 className="heading-xl" style={{ color:'var(--z40-offwhite)' }}>The Tribe Speaks</h2>
        </div>

        <div className="make-grid grid-cols-3 on-mobile:grid-cols-1 gap-24">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`testi-card add-padding-40 reveal reveal-d${i+1}`}>
              <p className="set-text-16 line-height-loose add-margin-bottom-32 add-margin-top-24"
                style={{ fontStyle:'italic', fontWeight:300, color:'rgba(245,240,232,0.75)', position:'relative', zIndex:1 }}>
                {t.quote}
              </p>
              <div style={{ height:'1px', background:'rgba(212,134,11,0.2)', marginBottom:'1.5rem' }} />
              <p className="font-display set-text-16 text-uppercase add-margin-bottom-4" style={{ color:'var(--z40-offwhite)', letterSpacing:'0.05em' }}>{t.name}</p>
              <p className="set-text-12" style={{ color:'var(--z40-amber)', letterSpacing:'0.1em', textTransform:'uppercase' }}>{t.tier}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── FAQ ─────────────────────────────────────────────────────────────────── */
const FAQ = () => {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q:'Is there a joining fee?', a:'None whatsoever. You pay only the monthly or annual membership fee. No hidden charges, no security deposit.' },
    { q:'Can I use my membership at both locations?', a:'Yes. Your Z40 card works at both Jubilee Hills and Financial District. Perks, discounts, and priority booking apply at either location.' },
    { q:'How does the Brew Points system work?', a:'You earn 1 point per ₹100 spent. Craft members earn 1.5× and Brew Masters earn 3× points. Points can be redeemed for pints (200 pts), merchandise (500 pts), or private table experiences (1000 pts).' },
    { q:'Can I pause or cancel my membership?', a:'Yes. You can pause your membership for up to 2 months per year (Craft and above) or cancel anytime with 30 days notice. Annual plans are refunded on a pro-rata basis.' },
    { q:'When do I receive my membership card?', a:'Your digital card is issued instantly on confirmation. Your physical card arrives within 48 hours via courier to your registered address.' },
    { q:'Are there guest passes included?', a:'Craft members receive 2 guest day-passes per quarter. Brew Masters receive 4. Guests enjoy member-level discounts for that visit.' },
    { q:'What happens on my birthday?', a:'Whichever tier you\'re on, visit any Zero40 during your birthday month and your first pint is on us. Just show your ID and member card. Brew Masters get a reserved table and complimentary starter.' },
    { q:'Can I gift a membership?', a:'Absolutely. Gift memberships are available for all tiers. Email tribe@zero40.com and we\'ll send a physical gift card within 48 hours.' },
  ];

  return (
    <section className="grain-overlay section-pad" style={{ background:'#0a0a0a' }}>
      <div className="set-max-width-900 add-margin-x-auto">
        <div className="reveal text-center add-margin-bottom-56">
          <p className="section-label center add-margin-bottom-20">Got Questions</p>
          <h2 className="heading-xl" style={{ color:'var(--z40-offwhite)' }}>FAQs</h2>
        </div>

        <div className="reveal">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item" onClick={() => setOpen(open === i ? null : i)}>
              <div className="make-flex justify-between align-center add-padding-y-24">
                <h4 className="set-text-16 text-semibold" style={{ color: open===i ? 'var(--z40-amber)' : 'var(--z40-offwhite)', letterSpacing:'0.02em', paddingRight:'2rem' }}>
                  {faq.q}
                </h4>
                <svg className={`faq-arrow ${open===i?'open':''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color:'var(--z40-amber)', flexShrink:0 }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
              <div className="faq-body" style={{ maxHeight: open===i ? '300px' : '0' }}>
                <p className="set-text-15 line-height-relaxed add-padding-bottom-24" style={{ color:'rgba(245,240,232,0.6)', fontWeight:300 }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── JOIN CTA ────────────────────────────────────────────────────────────── */
const JoinCTA = () => (
  <section id="join" className="grain-overlay section-pad position-relative overflow-hidden"
    style={{ background:'linear-gradient(135deg, #1a0d00 0%, #0D0D0D 50%, #0a0d00 100%)' }}>

    <div className="amber-glow position-absolute set-width-full"
      style={{ top:'50%', transform:'translateY(-50%)', height:'80%', background:'radial-gradient(ellipse, rgba(212,134,11,0.15) 0%, transparent 70%)', pointerEvents:'none' }} />

    <div className="reveal text-center position-relative set-max-width-800 add-margin-x-auto" style={{ zIndex:2 }}>
      <p className="section-label center add-margin-bottom-24">Ready to Join</p>
      <h2 className="heading-hero add-margin-bottom-24" style={{ color:'var(--z40-offwhite)' }}>
        YOUR FIRST PINT<br /><span style={{ color:'var(--z40-amber)' }}>IS ON US.</span>
      </h2>
      <p className="set-text-18 line-height-relaxed add-margin-bottom-48" style={{ color:'rgba(245,240,232,0.55)', fontWeight:300, maxWidth:'480px', margin:'0 auto 3rem' }}>
        Join 500+ members who've made Zero40 their second home. Pick a plan, get your card, pour your first pint.
      </p>
      <div className="make-flex flex-wrap justify-center gap-16">
        <a href="#membership-tiers" className="btn btn-amber">Choose a Plan</a>
        <a href="/#reservations" className="btn btn-outline">Book a Table First</a>
      </div>
      <p className="set-text-12 add-margin-top-32" style={{ color:'rgba(245,240,232,0.3)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
        Questions? WhatsApp us at 73308 40040 (Jubilee Hills) or 72079 11036 (Financial District)
      </p>
    </div>
  </section>
);

/* ─── FOOTER ──────────────────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="grain-overlay" style={{ background:'#080808', borderTop:'1px solid rgba(212,134,11,0.15)' }}>
    <div className="section-pad text-center">
      <div className="make-flex justify-center add-margin-bottom-32"><Logo size={64} /></div>
      <p className="font-display set-text-11 add-margin-bottom-40" style={{ letterSpacing:'0.3em', color:'var(--z40-amber)', textTransform:'uppercase' }}>
        Brewfast Club · Dialed In Since 2016
      </p>
      <div className="make-flex flex-wrap justify-center gap-x-32 gap-y-8 add-margin-bottom-40">
        {['Menu','Our Brewery','Tribe Membership','Party Packages','Reservations'].map(l => (
          <a key={l} href={`/#${l.toLowerCase().replace(/\s+/g,'-')}`} className="nav-link">{l}</a>
        ))}
      </div>
      <hr className="amber-hr set-max-width-384 add-margin-x-auto add-margin-bottom-40" />
      <div className="make-flex justify-center gap-24 add-margin-bottom-32">
        <a href="https://instagram.com/zero40brewing" target="_blank" rel="noopener noreferrer" className="social-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="https://wa.me/917330840040" target="_blank" rel="noopener noreferrer" className="social-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </a>
      </div>
      <a href="mailto:strategy@zero40.com" style={{ display: 'inline-block', marginBottom: '1rem', color: 'rgba(212,134,11,0.7)', fontSize: '0.82rem', letterSpacing: '0.08em', textDecoration: 'none', transition: 'color 0.2s' }}
        onMouseOver={e => e.currentTarget.style.color = 'var(--z40-amber)'}
        onMouseOut={e => e.currentTarget.style.color = 'rgba(212,134,11,0.7)'}>
        strategy@zero40.com
      </a>
      <p className="set-text-11" style={{ color:'rgba(245,240,232,0.2)', letterSpacing:'0.08em', lineHeight:1.7 }}>
        © 2024 Zero40 Brewing Co. · Hyderabad, Telangana, India<br />
        <span style={{ fontSize:'0.62rem', textTransform:'uppercase', letterSpacing:'0.12em' }}>Drink Responsibly · Must be 21+ to consume alcohol</span>
      </p>
    </div>
  </footer>
);

/* ─── PAGE ROOT ───────────────────────────────────────────────────────────── */
const BrewfastClub = () => {
  useReveal();
  useSEO(
    'Brewfast Club — Zero40 Brewing Co. | Monthly Craft Beer Membership Hyderabad',
    'Join the Zero40 Brewfast Club. Monthly craft beer memberships starting ₹499 — exclusive pints, member discounts, priority reservations, and more in Hyderabad.'
  );
  return (
    <>
      <BrewfastStyles />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <MembershipTiers />
        <PerksSection />
        <Testimonials />
        <FAQ />
        <JoinCTA />
      </main>
      <Footer />
    </>
  );
};

export default BrewfastClub;
