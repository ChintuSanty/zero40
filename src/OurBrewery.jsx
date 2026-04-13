import React, { useState, useEffect } from 'react';

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const BreweryStyles = () => (
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

    .grain-overlay { position: relative; isolation: isolate; }
    .grain-overlay::after {
      content: ''; position: absolute; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      background-size: 200px 200px; opacity: 0.035; pointer-events: none; z-index: 10; mix-blend-mode: overlay;
    }

    .reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.75s ease, transform 0.75s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-d1 { transition-delay: 0.1s; } .reveal-d2 { transition-delay: 0.2s; }
    .reveal-d3 { transition-delay: 0.3s; } .reveal-d4 { transition-delay: 0.4s; }

    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .marquee-track { animation: ticker 35s linear infinite; display: flex; white-space: nowrap; width: max-content; }
    .marquee-track:hover { animation-play-state: paused; }

    .z40-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; transition: background 0.35s ease, box-shadow 0.35s ease; }
    .z40-nav.solid { background: rgba(13,13,13,0.96); backdrop-filter: blur(12px); box-shadow: 0 1px 0 rgba(212,134,11,0.2); }
    .nav-link { color: var(--z40-offwhite); text-decoration: none; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.75; transition: opacity 0.2s, color 0.2s; }
    .nav-link:hover { opacity: 1; color: var(--z40-amber); }
    .nav-link.active { opacity: 1; color: var(--z40-amber); }

    .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 0; }
    .hamburger span { display: block; width: 24px; height: 2px; background: var(--z40-offwhite); }
    @media (max-width: 900px) {
      .nav-links { display: none !important; }
      .nav-cta   { display: none !important; }
      .hamburger { display: flex; }
    }

    .mobile-menu { position: fixed; inset: 0; background: rgba(13,13,13,0.98); z-index: 199; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2.5rem; transform: translateX(100%); transition: transform 0.4s ease; }
    .mobile-menu.open { transform: translateX(0); }
    .mobile-menu a { font-family: 'Anton', sans-serif; font-size: 2.2rem; letter-spacing: 0.1em; color: var(--z40-offwhite); text-decoration: none; text-transform: uppercase; }
    .mobile-menu a:hover { color: var(--z40-amber); }

    .logo-badge { border-radius: 50%; border: 2px solid var(--z40-amber); background: var(--z40-black); font-family: 'Anton', sans-serif; letter-spacing: 0.18em; color: var(--z40-amber); text-align: center; line-height: 1.1; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
    .section-label { font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--z40-amber); font-weight: 500; display: flex; align-items: center; gap: 0.75rem; }
    .section-label::before { content: ''; display: block; width: 32px; height: 1px; background: var(--z40-amber); }
    .section-label.center { justify-content: center; }

    .btn { font-family: 'Anton', sans-serif; letter-spacing: 0.15em; text-transform: uppercase; font-size: 0.85rem; cursor: pointer; border: none; text-decoration: none; transition: all 0.25s ease; line-height: 1; display: inline-block; padding: 0.9rem 2.2rem; }
    .btn-amber { background: var(--z40-amber); color: var(--z40-black); }
    .btn-amber:hover { background: var(--z40-gold); }
    .btn-amber-sm { background: var(--z40-amber); color: var(--z40-black); padding: 0.65rem 1.4rem; font-size: 0.75rem; }
    .btn-amber-sm:hover { background: var(--z40-gold); }
    .btn-outline { background: transparent; border: 2px solid var(--z40-offwhite); color: var(--z40-offwhite); }
    .btn-outline:hover { background: var(--z40-offwhite); color: var(--z40-black); }

    .section-pad { padding: clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem); }
    .heading-xl  { font-family: 'Anton', sans-serif; text-transform: uppercase; font-size: clamp(2.8rem, 7vw, 5.5rem); line-height: 0.9; letter-spacing: -0.01em; }
    .heading-lg  { font-family: 'Anton', sans-serif; text-transform: uppercase; font-size: clamp(2rem, 5vw, 3.5rem); line-height: 0.95; }
    .font-display { font-family: 'Anton', sans-serif; }
    .amber-hr { border: none; border-top: 1px solid rgba(212,134,11,0.3); }
    .social-icon { color: rgba(245,240,232,0.45); transition: color 0.2s; text-decoration: none; }
    .social-icon:hover { color: var(--z40-amber); }

    /* ── Brewery Hero ── */
    .brew-hero {
      min-height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      overflow: hidden;
    }
    .brew-hero-img {
      position: absolute; inset: 0;
      background-image: url('/images/60f8a1_6e560a9fb8b84e578fa0b157d6018083.jpg');
      background-size: cover;
      background-position: center 30%;
      filter: brightness(0.35);
      transform: scale(1.03);
      transition: transform 8s ease;
    }
    .brew-hero-img.loaded { transform: scale(1); }
    .brew-hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(13,13,13,0.7) 0%, rgba(13,13,13,0.2) 60%, transparent 100%);
    }
    .brew-hero-bottom {
      position: absolute; bottom: 0; left: 0; right: 0; height: 180px;
      background: linear-gradient(to top, var(--z40-black), transparent);
    }
    .brew-hero-line { font-family: 'Anton', sans-serif; text-transform: uppercase; line-height: 0.88; letter-spacing: -0.01em; }
    .brew-hero-since { font-family: 'Anton', sans-serif; font-size: 0.7rem; letter-spacing: 0.35em; color: var(--z40-amber); text-transform: uppercase; margin-bottom: 1.5rem; }

    /* ── Photo strip (horizontal scroll) ── */
    .photo-strip { display: flex; gap: 4px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
    .photo-strip::-webkit-scrollbar { display: none; }
    .photo-strip img { flex: 0 0 auto; height: 380px; width: auto; object-fit: cover; scroll-snap-align: start; filter: brightness(0.85) saturate(0.9); transition: filter 0.35s, transform 0.35s; border-radius: 1px; }
    .photo-strip img:hover { filter: brightness(1) saturate(1.1); transform: scale(1.01); }
    @media (max-width: 768px) { .photo-strip img { height: 240px; } }

    /* ── Brewing process steps ── */
    .process-step { position: relative; }
    .process-number {
      font-family: 'Anton', sans-serif; font-size: clamp(4rem, 8vw, 7rem);
      color: rgba(212,134,11,0.08); line-height: 1;
      position: absolute; top: -0.5rem; left: 0;
      user-select: none; pointer-events: none;
    }
    .process-content { padding-left: clamp(3rem, 6vw, 5.5rem); }

    /* ── Pillar cards ── */
    .pillar-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(212,134,11,0.2);
      padding: clamp(1.5rem, 3vw, 2.5rem);
      transition: border-color 0.3s, background 0.3s, transform 0.3s;
    }
    .pillar-card:hover { border-color: var(--z40-amber); background: rgba(212,134,11,0.05); transform: translateY(-4px); }
    .pillar-icon { font-size: 2rem; margin-bottom: 1rem; display: block; }

    /* ── Image mosaic ── */
    .mosaic { display: grid; gap: 4px; }
    .mosaic-main { grid-column: 1 / 3; grid-row: 1 / 3; }
    .mosaic img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(0.8) saturate(0.85); transition: filter 0.4s, transform 0.4s; overflow: hidden; }
    .mosaic img:hover { filter: brightness(1) saturate(1); transform: scale(1.02); }
    .mosaic-cell { overflow: hidden; }
    @media (max-width: 768px) {
      .mosaic { grid-template-columns: 1fr 1fr !important; }
      .mosaic-main { grid-column: 1 / 3; grid-row: 1 / 2; }
    }

    /* ── Beer feature ── */
    .brew-beer-card {
      background: rgba(255,255,255,0.04);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(212,134,11,0.2);
      border-radius: 2px;
      padding: 1.75rem;
      transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
    }
    .brew-beer-card:hover { transform: translateY(-6px); border-color: var(--z40-amber); box-shadow: 0 20px 60px rgba(212,134,11,0.12); }
    .abv-badge { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.65rem; letter-spacing: 0.2em; font-weight: 600; text-transform: uppercase; color: var(--z40-amber); background: rgba(212,134,11,0.1); border: 1px solid rgba(212,134,11,0.3); padding: 0.25rem 0.6rem; border-radius: 2px; }

    /* ── Awards row ── */
    .award-item { text-align: center; padding: 2rem; border: 1px solid rgba(212,134,11,0.15); border-radius: 2px; transition: border-color 0.3s; }
    .award-item:hover { border-color: rgba(212,134,11,0.45); }
    .award-year { font-family: 'Anton', sans-serif; font-size: 2.5rem; color: var(--z40-amber); line-height: 1; }

    /* ── Timeline ── */
    .timeline-line { position: absolute; left: 15px; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, var(--z40-amber), rgba(212,134,11,0.1)); }
    .timeline-dot { width: 30px; height: 30px; border-radius: 50%; background: var(--z40-black); border: 2px solid var(--z40-amber); flex-shrink: 0; display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; }
    .timeline-dot-inner { width: 10px; height: 10px; border-radius: 50%; background: var(--z40-amber); }
    .timeline-content { padding-bottom: 3rem; }

    /* ── Footer ── */
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; }
    @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 540px) { .footer-grid { grid-template-columns: 1fr; } }
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
  { label: 'Our Brewery',      href: '/our-brewery',       active: true },
  { label: 'Brewfast Club',    href: '/z40-brewfast-club' },
];

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
        <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '2rem', background: 'none', border: 'none', color: 'var(--z40-offwhite)', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
        {NAV_LINKS.map(({ label, href }) => (
          <a key={label} href={href} onClick={() => setMobileOpen(false)}>{label}</a>
        ))}
        <a href="/#reservations" className="btn btn-amber" onClick={() => setMobileOpen(false)}>Reserve a Table</a>
      </div>
    </>
  );
};

/* ─── HERO ────────────────────────────────────────────────────────────────── */
const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);
  return (
    <section className="brew-hero grain-overlay">
      <div className={`brew-hero-img ${loaded ? 'loaded' : ''}`} />
      <div className="brew-hero-overlay" />
      <div className="brew-hero-bottom" />
      <div className="add-padding-x-80 on-mobile:add-padding-x-24 position-relative" style={{ zIndex: 2, paddingTop: '7rem' }}>
        <p className="brew-hero-since">Zero40 Brewing — Est. 2016</p>
        <h1 className="brew-hero-line" style={{ color: 'var(--z40-offwhite)', fontSize: 'clamp(3.5rem, 11vw, 10rem)', lineHeight: 0.88, letterSpacing: '-0.01em' }}>
          CRAFTED<br />
          <span style={{ color: 'var(--z40-amber)' }}>IN</span><br />
          HYDERABAD
        </h1>
        <p className="add-margin-top-32 set-max-width-560" style={{ color: 'rgba(245,240,232,0.7)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, fontWeight: 300 }}>
          Born from a passion for real craft beer, Zero40 was built to bring world-class brewery culture to Hyderabad — one honest pint at a time.
        </p>
        <div className="make-flex gap-16 add-margin-top-40 flex-wrap">
          <a href="#our-story" className="btn btn-amber">Our Story</a>
          <a href="#gallery" className="btn btn-outline">See the Brewery</a>
        </div>
      </div>
      {/* Scroll cue */}
      <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 2 }}>
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 50, background: 'linear-gradient(to bottom, var(--z40-amber), transparent)' }} />
      </div>
    </section>
  );
};

/* ─── MARQUEE ─────────────────────────────────────────────────────────────── */
const Marquee = () => {
  const items = ['Small-Batch Craft Beer', 'Brewed in Hyderabad', 'Since 2016', 'No Compromises', 'Real Ingredients', 'Award-Winning Ales', 'Jubilee Hills', 'Road No. 10'];
  const track = [...items, ...items].map((t, i) => (
    <span key={i} className="make-flex align-center gap-24" style={{ color: i % 2 === 0 ? 'var(--z40-offwhite)' : 'var(--z40-amber)', fontFamily: "'Anton', sans-serif", fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', paddingRight: '3rem' }}>
      {t}
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--z40-amber)', opacity: 0.6, flexShrink: 0 }} />
    </span>
  ));
  return (
    <div style={{ background: 'rgba(212,134,11,0.08)', borderTop: '1px solid rgba(212,134,11,0.2)', borderBottom: '1px solid rgba(212,134,11,0.2)', overflow: 'hidden', padding: '1rem 0' }}>
      <div className="marquee-track">{track}</div>
    </div>
  );
};

/* ─── OUR STORY ───────────────────────────────────────────────────────────── */
const OurStory = () => (
  <section id="our-story" className="section-pad grain-overlay" style={{ background: 'var(--z40-black)' }}>
    <div className="set-max-width-1280 add-margin-x-auto">
      <div className="make-grid grid-cols-2 on-mobile:grid-cols-1 gap-80 align-center">
        {/* Images side */}
        <div className="reveal" style={{ position: 'relative' }}>
          <img
            src="/images/60f8a1_45dab778f38a44ec8cbb471d1a86a999.jpg"
            alt="Zero40 Brewery Interior"
            style={{ width: '100%', height: 540, objectFit: 'cover', display: 'block', filter: 'brightness(0.85) saturate(0.9)' }}
          />
          {/* Overlaid second image */}
          <div style={{ position: 'absolute', bottom: '-2.5rem', right: '-2.5rem', width: '55%', border: '4px solid var(--z40-black)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', zIndex: 2 }}>
            <img
              src="/images/60f8a1_59658cf2019e4c758ac92537df970c21.jpg"
              alt="Zero40 Craft Beer"
              style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block', filter: 'brightness(0.9) saturate(1)' }}
            />
          </div>
          {/* Est. badge */}
          <div style={{ position: 'absolute', top: '1.5rem', left: '-1.5rem', background: 'var(--z40-amber)', color: 'var(--z40-black)', padding: '1rem 1.25rem', zIndex: 3, textAlign: 'center' }}>
            <div className="font-display" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', lineHeight: 1.3 }}>Est.</div>
            <div className="font-display" style={{ fontSize: '2rem', lineHeight: 1 }}>2016</div>
          </div>
        </div>

        {/* Text side */}
        <div>
          <p className="section-label reveal">Our Story</p>
          <h2 className="heading-xl add-margin-top-16 add-margin-bottom-24 reveal reveal-d1" style={{ color: 'var(--z40-offwhite)' }}>
            WHERE BEER<br />
            <span style={{ color: 'var(--z40-amber)' }}>MEETS</span><br />
            PASSION
          </h2>
          <p className="reveal reveal-d2" style={{ color: 'rgba(245,240,232,0.65)', lineHeight: 1.8, fontWeight: 300, fontSize: '1rem', marginBottom: '1.25rem' }}>
            Zero40 Brewing was born out of a simple belief: that Hyderabad deserved a world-class craft beer experience without having to fly abroad for it. Founded in 2016, we set out to build a brewery where every pint tells a story — brewed slowly, with intent, and served with pride.
          </p>
          <p className="reveal reveal-d3" style={{ color: 'rgba(245,240,232,0.65)', lineHeight: 1.8, fontWeight: 300, fontSize: '1rem', marginBottom: '2rem' }}>
            From our flagship Jubilee Hills location on Road No. 10 to our second home across town, Zero40 has grown into a community — a gathering place for those who refuse to settle for the ordinary. We brew in small batches, use the finest imported malts and hops, and refuse to cut corners.
          </p>
          <div className="make-flex gap-48 add-margin-top-32 flex-wrap reveal reveal-d4">
            {[['8+', 'Craft Beers\nOn Tap'], ['2', 'Locations\nin Hyderabad'], ['1000+', 'Happy Pints\nDaily']].map(([num, label]) => (
              <div key={num}>
                <div className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--z40-amber)', lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.45)', marginTop: '0.25rem', whiteSpace: 'pre-line', lineHeight: 1.4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── BREWING PROCESS ─────────────────────────────────────────────────────── */
const BrewingProcess = () => {
  const steps = [
    { num: '01', title: 'Malt Selection', desc: 'We source premium imported malts from Germany, Belgium, and the UK. Every batch begins with a curated grain bill designed to deliver depth, colour, and complexity.' },
    { num: '02', title: 'Mashing', desc: 'Crushed malt is steeped in hot water to extract fermentable sugars. Our brewers control temperature profiles precisely — this is where the base flavour of every beer is decided.' },
    { num: '03', title: 'Boiling & Hopping', desc: 'The wort is brought to a rolling boil and hops are added at exact intervals — bittering hops early, aroma hops late. No shortcuts, no concentrates.' },
    { num: '04', title: 'Fermentation', desc: 'Yeast is pitched at optimal temperatures into our custom fermenters. We ferment clean and slow — ales at 18–22°C, lagers cold-conditioned for weeks.' },
    { num: '05', title: 'Conditioning', desc: 'Each beer conditions until it reaches peak flavour, clarity, and carbonation. We don\'t rush the tank — good beer can\'t be hurried.' },
    { num: '06', title: 'Tap & Serve', desc: 'Fresh from the tank to your glass with no pasteurization, no filtration. Zero40 pours it alive, the way it was meant to be experienced.' },
  ];
  return (
    <section className="section-pad grain-overlay" style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #0f0e0a 100%)' }}>
      <div className="set-max-width-1280 add-margin-x-auto">
        <div className="add-margin-bottom-64 reveal" style={{ textAlign: 'center' }}>
          <p className="section-label center">How We Brew</p>
          <h2 className="heading-xl add-margin-top-16" style={{ color: 'var(--z40-offwhite)' }}>
            THE CRAFT<br /><span style={{ color: 'var(--z40-amber)' }}>BEHIND EVERY PINT</span>
          </h2>
          <p style={{ color: 'rgba(245,240,232,0.5)', maxWidth: 520, margin: '1.5rem auto 0', lineHeight: 1.7, fontWeight: 300 }}>
            Six deliberate stages. No automation, no adjuncts, no compromises.
          </p>
        </div>
        <div className="make-grid grid-cols-2 on-mobile:grid-cols-1 gap-48">
          {steps.map((s, i) => (
            <div key={s.num} className={`process-step reveal reveal-d${(i % 4) + 1}`}>
              <div className="process-number">{s.num}</div>
              <div className="process-content">
                <h3 className="font-display add-margin-bottom-12" style={{ fontSize: '1.15rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--z40-offwhite)' }}>{s.title}</h3>
                <p style={{ color: 'rgba(245,240,232,0.6)', lineHeight: 1.75, fontWeight: 300, fontSize: '0.95rem' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── PHOTO GALLERY ───────────────────────────────────────────────────────── */
const Gallery = () => {
  const imgs = [
    { src: '/images/60f8a1_477494fce72a4de0a23bbfd94624c5c0.jpg', alt: 'Brewery floor' },
    { src: '/images/60f8a1_2354e53fa8ff48faa3f1309355ee89e1.jpg', alt: 'Craft beer pour' },
    { src: '/images/60f8a1_8e3eb99cbafd474390b3d255abcc3083.jpg', alt: 'Zero40 interior' },
    { src: '/images/60f8a1_ee019b1112d24fdbbf11e1c1dd8d373d.jpg', alt: 'Brewery bar' },
    { src: '/images/a63a32_22b8bc122bb24a8083a5de5ea42015b2.jpg', alt: 'Zero40 ambience' },
    { src: '/images/a63a32_3b84aa6c7a834b20b0247e878324626f.jpg', alt: 'Dining area' },
    { src: '/images/a63a32_ae05b2ac9f3448589a016b1b92bb2451.jpg', alt: 'Beer taps' },
    { src: '/images/60f8a1_2daa2eb8f4c24906a68b343d2b846b4f.jpg', alt: 'Craft pour close-up' },
  ];
  return (
    <section id="gallery" className="grain-overlay" style={{ background: 'var(--z40-black)', paddingTop: 'clamp(4rem, 8vw, 7rem)' }}>
      <div className="set-max-width-1280 add-margin-x-auto add-padding-x-80 on-mobile:add-padding-x-24 add-margin-bottom-40">
        <div className="make-flex align-center justify-between flex-wrap gap-16">
          <div>
            <p className="section-label reveal">Visual Story</p>
            <h2 className="heading-lg add-margin-top-12 reveal reveal-d1" style={{ color: 'var(--z40-offwhite)' }}>
              INSIDE<br /><span style={{ color: 'var(--z40-amber)' }}>THE BREWERY</span>
            </h2>
          </div>
          <p className="reveal" style={{ color: 'rgba(245,240,232,0.45)', maxWidth: 340, lineHeight: 1.7, fontWeight: 300, fontSize: '0.9rem' }}>
            Every corner of Zero40 was built with intention — from the tank room to the tap handles.
          </p>
        </div>
      </div>
      {/* Full-width mosaic */}
      <div className="mosaic reveal" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 260px)' }}>
        <div className="mosaic-cell mosaic-main">
          <img src={imgs[0].src} alt={imgs[0].alt} style={{ width: '100%', height: '100%' }} />
        </div>
        {imgs.slice(1, 5).map((img, i) => (
          <div key={i} className="mosaic-cell">
            <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%' }} />
          </div>
        ))}
        <div className="mosaic-cell">
          <img src={imgs[5].src} alt={imgs[5].alt} style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="mosaic-cell">
          <img src={imgs[6].src} alt={imgs[6].alt} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
      {/* Photo strip */}
      <div className="photo-strip add-margin-top-4">
        {[imgs[7], imgs[2], imgs[3], imgs[1], imgs[4]].map((img, i) => (
          <img key={i} src={img.src} alt={img.alt} />
        ))}
      </div>
    </section>
  );
};

/* ─── OUR BEERS ───────────────────────────────────────────────────────────── */
const OurBeers = () => {
  const beers = [
    { name: 'OLD TIMER', style: 'Witbier', abv: '6.0%', desc: 'Our house wheat beer — hazy, citrus-forward, and brewed with real coriander and orange peel. A gateway to the good stuff.', color: '#e8c56d' },
    { name: 'BLUE CAMEL', style: 'Hefeweizen', abv: '5.3%', desc: 'A classic German-style wheat ale with notes of banana and clove. Unfiltered and deeply refreshing.', color: '#f5e19a' },
    { name: 'BEACH BUM', style: 'Pale Ale', abv: '5.0%', desc: 'Hop-forward and tropical. Dry-hopped with mosaic and cascade for a fruity, resinous finish.', color: '#d4860b' },
    { name: 'GO SWAMI', style: 'Basmati Helles', abv: '4.8%', desc: 'Our signature Hyderabadi innovation — a crisp German lager brewed with aromatic Basmati rice. Light, clean, and iconic.', color: '#f0a500' },
    { name: 'SHAVASAN', style: 'Stout', abv: '5.5%', desc: 'Dark, roasty, and silky smooth. Coffee and dark chocolate dominate with just enough bitterness to keep you coming back.', color: '#5a3a1a' },
    { name: 'VINCENT VAN GOAT', style: 'Weizenbock', abv: '6.0%', desc: 'A stronger wheat bock with rich caramel malt backbone and deep fruity esters. Complex, warming, and artfully crafted.', color: '#8b4e1e' },
  ];
  return (
    <section className="section-pad grain-overlay" style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #0a0906 100%)' }}>
      <div className="set-max-width-1280 add-margin-x-auto">
        <div className="add-margin-bottom-64 reveal" style={{ textAlign: 'center' }}>
          <p className="section-label center">On Tap</p>
          <h2 className="heading-xl add-margin-top-16" style={{ color: 'var(--z40-offwhite)' }}>
            THE LINEUP
          </h2>
          <p style={{ color: 'rgba(245,240,232,0.5)', maxWidth: 480, margin: '1.25rem auto 0', lineHeight: 1.7, fontWeight: 300 }}>
            Six originals, brewed in-house, served fresh from tank to tap.
          </p>
        </div>
        <div className="make-grid grid-cols-3 on-mobile:grid-cols-1 gap-24">
          {beers.map((beer, i) => (
            <div key={beer.name} className={`brew-beer-card reveal reveal-d${(i % 4) + 1}`}>
              {/* ABV colour line */}
              <div style={{ height: 3, background: beer.color, marginBottom: '1.25rem', borderRadius: 1 }} />
              <div className="make-flex align-center justify-between add-margin-bottom-8">
                <h3 className="font-display" style={{ fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--z40-offwhite)' }}>{beer.name}</h3>
                <span className="abv-badge">{beer.abv} ABV</span>
              </div>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--z40-amber)', fontWeight: 500, marginBottom: '1rem' }}>{beer.style}</p>
              <p style={{ color: 'rgba(245,240,232,0.55)', fontSize: '0.88rem', lineHeight: 1.7, fontWeight: 300 }}>{beer.desc}</p>
            </div>
          ))}
        </div>
        <div className="add-margin-top-48 reveal" style={{ textAlign: 'center' }}>
          <a href="/#menu" className="btn btn-outline">View Full Menu</a>
        </div>
      </div>
    </section>
  );
};

/* ─── OUR PHILOSOPHY ──────────────────────────────────────────────────────── */
const Philosophy = () => {
  const pillars = [
    { icon: '🌾', title: 'Real Ingredients', desc: 'Imported malt, fresh hops, pure water. No adjuncts, no shortcuts, no flavouring syrups.' },
    { icon: '⚗️', title: 'Small Batch', desc: 'Every brew is made in small quantities. We\'d rather run out than brew cheap.' },
    { icon: '🔬', title: 'Obsessive QC', desc: 'Every pint is tasted before it touches your glass. No bad beer leaves our tanks.' },
    { icon: '🤝', title: 'Community First', desc: 'We\'re not just a bar. Zero40 is a gathering place for Hyderabad\'s craft culture.' },
  ];
  return (
    <section className="section-pad grain-overlay" style={{ background: 'linear-gradient(135deg, #0f0e0a 0%, #0D0D0D 100%)' }}>
      <div className="set-max-width-1280 add-margin-x-auto">
        <div className="make-grid grid-cols-2 on-mobile:grid-cols-1 gap-80 align-center">
          <div>
            <p className="section-label reveal">Our Philosophy</p>
            <h2 className="heading-xl add-margin-top-16 add-margin-bottom-24 reveal reveal-d1" style={{ color: 'var(--z40-offwhite)' }}>
              NO<br />
              <span style={{ color: 'var(--z40-amber)' }}>COMPROMISES.</span>
              <br />EVER.
            </h2>
            <blockquote className="reveal reveal-d2" style={{ fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', lineHeight: 1.5, fontWeight: 300, borderLeft: '3px solid var(--z40-amber)', paddingLeft: '1.5rem', color: 'rgba(245,240,232,0.8)', marginBottom: '2rem' }}>
              "We started Zero40 because we were bored of bad beer. Eight years later, we still are."
            </blockquote>
            <p className="reveal reveal-d3" style={{ color: 'rgba(245,240,232,0.55)', fontStyle: 'italic', fontSize: '0.85rem', letterSpacing: '0.05em' }}>— The Founders, Zero40 Brewing</p>
          </div>
          <div className="make-grid grid-cols-2 gap-16 on-mobile:grid-cols-1">
            {pillars.map((p, i) => (
              <div key={p.title} className={`pillar-card reveal reveal-d${i + 1}`}>
                <span className="pillar-icon">{p.icon}</span>
                <h3 className="font-display add-margin-bottom-10" style={{ fontSize: '0.95rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--z40-offwhite)' }}>{p.title}</h3>
                <p style={{ color: 'rgba(245,240,232,0.55)', fontSize: '0.88rem', lineHeight: 1.65, fontWeight: 300 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── TIMELINE ────────────────────────────────────────────────────────────── */
const Timeline = () => {
  const events = [
    { year: '2016', title: 'Zero40 Brewing Opens', desc: 'Road No. 10, Jubilee Hills. Our first tanks go live. The city gets its first serious craft brewery.' },
    { year: '2017', title: 'First Original Recipes', desc: 'The Old Timer and Beach Bum are born. Both sell out within the first weekend.' },
    { year: '2019', title: 'The Go Swami Launch', desc: 'Our Basmati Helles becomes the talk of Hyderabad — a beer that could only exist here.' },
    { year: '2021', title: 'Second Location', desc: 'Zero40 expands to a second outlet. More taps, same obsession with quality.' },
    { year: '2023', title: 'Brewfast Club Launches', desc: 'Our members-only monthly subscription. The Zero40 community officially has a name.' },
    { year: '2024+', title: 'Still Brewing', desc: 'New seasonals. New collabs. Same zero-compromise philosophy. The story continues.' },
  ];
  return (
    <section className="section-pad grain-overlay" style={{ background: 'var(--z40-black)' }}>
      <div className="set-max-width-800 add-margin-x-auto add-padding-x-24">
        <div className="add-margin-bottom-56 reveal" style={{ textAlign: 'center' }}>
          <p className="section-label center">Since 2016</p>
          <h2 className="heading-xl add-margin-top-16" style={{ color: 'var(--z40-offwhite)' }}>
            OUR <span style={{ color: 'var(--z40-amber)' }}>TIMELINE</span>
          </h2>
        </div>
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          <div className="timeline-line" />
          {events.map((e, i) => (
            <div key={e.year} className={`make-flex gap-24 timeline-content reveal reveal-d${(i % 4) + 1}`}>
              <div className="timeline-dot"><div className="timeline-dot-inner" /></div>
              <div style={{ paddingBottom: i === events.length - 1 ? 0 : '3rem' }}>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--z40-amber)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.35rem' }}>{e.year}</p>
                <h3 className="font-display add-margin-bottom-8" style={{ fontSize: '1.05rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--z40-offwhite)' }}>{e.title}</h3>
                <p style={{ color: 'rgba(245,240,232,0.55)', fontSize: '0.9rem', lineHeight: 1.65, fontWeight: 300 }}>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── VISIT CTA ───────────────────────────────────────────────────────────── */
const VisitCTA = () => (
  <section className="grain-overlay" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(212,134,11,0.12) 0%, rgba(139,78,30,0.06) 50%, transparent 100%)' }} />
    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('/images/60f8a1_530beaf75d6d4398863d8a801d9f14c5.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.12) saturate(0.5)' }} />
    <div className="set-max-width-700 add-margin-x-auto reveal" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
      <p className="section-label center add-margin-bottom-20">Come Visit</p>
      <h2 className="heading-xl add-margin-bottom-24" style={{ color: 'var(--z40-offwhite)' }}>
        COME SEE IT<br /><span style={{ color: 'var(--z40-amber)' }}>FOR YOURSELF</span>
      </h2>
      <p style={{ color: 'rgba(245,240,232,0.6)', lineHeight: 1.8, fontWeight: 300, marginBottom: '2.5rem' }}>
        No brewery tour. No tap room entry fee. Just show up, pull a stool, and let us pour you something honest. Tuesday through Sunday, noon till midnight.
      </p>
      <div className="make-flex gap-16 justify-center flex-wrap">
        <a href="/#reservations" className="btn btn-amber">Reserve a Table</a>
        <a href="/z40-brewfast-club" className="btn btn-outline">Join Brewfast Club</a>
      </div>
      <div className="make-flex gap-48 justify-center add-margin-top-48 flex-wrap">
        {[['271/A Road No. 10', 'Jubilee Hills, Hyderabad'], ['73308 40040 · 91825 28150', 'Jubilee Hills'], ['72079 11036 / 11039 / 11040', 'Financial District'], ['Tue – Sun', '12:00 PM – 11:59 PM']].map(([line1, line2]) => (
          <div key={line1} style={{ textAlign: 'center' }}>
            <p className="font-display" style={{ fontSize: '0.9rem', color: 'var(--z40-offwhite)', letterSpacing: '0.05em' }}>{line1}</p>
            <p style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.2rem' }}>{line2}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── FOOTER ──────────────────────────────────────────────────────────────── */
const Footer = () => (
  <footer style={{ background: '#080808', padding: 'clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 5rem) 2rem' }}>
    <div className="set-max-width-1280 add-margin-x-auto">
      <div className="footer-grid add-margin-bottom-48">
        <div>
          <Logo size={56} />
          <p style={{ color: 'rgba(245,240,232,0.4)', lineHeight: 1.7, fontWeight: 300, fontSize: '0.9rem', marginTop: '1.25rem', maxWidth: 300 }}>
            Craft beer brewed with obsession in Hyderabad, Telangana. No shortcuts. No compromises. Since 2016.
          </p>
          <div className="make-flex gap-16 add-margin-top-20">
            {['IG', 'FB', 'TW'].map(s => <a key={s} href="#" className="social-icon" style={{ fontSize: '0.72rem', letterSpacing: '0.15em', fontWeight: 600 }}>{s}</a>)}
          </div>
        </div>
        {[
          { heading: 'Visit', items: ['271/A Road No. 10, Jubilee Hills', 'Financial District, Nanakramguda', 'Hyderabad, Telangana'] },
          { heading: 'Call Us', items: ['Jubilee Hills:', '73308 40040 · 91825 28150', 'Financial District:', '72079 11036 / 11039 / 11040'] },
          { heading: 'Hours', items: ['Tuesday – Sunday', '12:00 PM – 11:59 PM', 'Monday: Closed'] },
          { heading: 'Explore', items: ['Our Brewery', 'Menu', 'Brewfast Club', 'Reserve a Table'] },
        ].map(col => (
          <div key={col.heading}>
            <h4 className="font-display" style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--z40-amber)', marginBottom: '1.25rem' }}>{col.heading}</h4>
            {col.items.map(item => <p key={item} style={{ color: 'rgba(245,240,232,0.45)', fontSize: '0.88rem', lineHeight: 1.8, fontWeight: 300 }}>{item}</p>)}
          </div>
        ))}
      </div>
      <hr className="amber-hr add-margin-bottom-24" />
      <div className="make-flex justify-between align-center flex-wrap gap-12">
        <p style={{ color: 'rgba(245,240,232,0.25)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
          © 2024 Zero40 Brewing. All rights reserved. ·{' '}
          <a href="mailto:strategy@zero40.com" style={{ color: 'rgba(212,134,11,0.6)', textDecoration: 'none' }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--z40-amber)'}
            onMouseOut={e => e.currentTarget.style.color = 'rgba(212,134,11,0.6)'}>
            strategy@zero40.com
          </a>
        </p>
        <p style={{ color: 'rgba(245,240,232,0.2)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Drink Responsibly · Must be 25+ to consume alcohol</p>
      </div>
    </div>
  </footer>
);

/* ─── PAGE ────────────────────────────────────────────────────────────────── */
export default function OurBrewery() {
  useReveal();
  useSEO(
    'Our Brewery — Zero40 Brewing Co. | Craft Beer Hyderabad',
    'Discover how Zero40 brews small-batch craft beer in Hyderabad. Learn about our brewing process, our story since 2016, and meet the beers on tap.'
  );
  return (
    <>
      <BreweryStyles />
      <Navbar />
      <Hero />
      <Marquee />
      <OurStory />
      <BrewingProcess />
      <Gallery />
      <OurBeers />
      <Philosophy />
      <Timeline />
      <VisitCTA />
      <Footer />
    </>
  );
}
