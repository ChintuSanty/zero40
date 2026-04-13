import React, { useState, useRef } from 'react';

/* ─── MENU DATA (real data from Zero40 Jubilee Hills) ────────────────────── */
const MENU = [
  {
    id: 'beers',
    name: 'Our Beers',
    icon: '🍺',
    tag: 'Craft Brewed In-House',
    color: '#D4860B',
    items: [
      { name: 'Old Timer',        style: 'Belgian Witbier',     abv: '6.0%', note: 'Citrusy & Yeasty wit. Crisp and refreshing.' },
      { name: 'Blue Camel',       style: 'German Hefeweizen',   abv: '5.3%', note: 'Banana & Clove with a smooth wheat finish.' },
      { name: 'Beach Bum',        style: 'English Pale Ale',    abv: '5.0%', note: 'A tropical beach in a pint. Bright & hoppy.' },
      { name: 'Go Swami',         style: 'Basmati Helles',      abv: '4.8%', note: 'Crispy, Nutty & Floral. Lightly malted.' },
      { name: 'Shavasan',         style: 'Irish Stout',         abv: '5.5%', note: "It's always time for coffee. Dark & roasty." },
      { name: 'Vincent Van Goat', style: 'German Weizenbock',   abv: '6.0%', note: 'Dark Fruits & Caramel. Rich and warming.' },
      { name: 'Zero40 Special',   style: 'Chef\'s Seasonal',    abv: '—',    note: "Ask your server for today's rotating special." },
    ],
  },
  {
    id: 'cocktails',
    name: 'Classic Cocktails',
    icon: '🍸',
    tag: 'Bar Classics',
    color: '#F0A500',
    items: [
      { name: 'Mint Mojito',          price: 499,  note: 'White Rum, Lime & Fresh Mint' },
      { name: 'Long Island Iced Tea', price: 595,  note: 'Vodka, Gin, Tequila, White Rum, Cointreau & Coke' },
      { name: 'Margarita',            price: 545,  note: 'Tequila, Triple Sec, Sweet & Sour Mix' },
      { name: 'Old Fashioned',        price: 475,  note: 'Whisky, Bitters & Sugar Cube' },
      { name: 'Daiquiri',             price: 475,  note: 'White Rum, Sweet & Sour Mix' },
      { name: 'Cosmopolitan',         price: 425,  note: 'Vodka, Cranberry Juice, Triple Sec & Lime' },
      { name: 'Bloody Mary',          price: 475,  note: 'Vodka, Tomato Juice, Lime & Spices' },
      { name: 'Moscow Mule',          price: 475,  note: 'Vodka, Lime, Ginger Ale & Bitters' },
      { name: 'Sangria',              price: 499,  note: 'White or Red Wine Sangria — refreshingly Spanish' },
      { name: 'Irish Coffee',         price: 545,  note: 'Irish Whiskey, Cream, Brown Sugar & Brewed Coffee' },
    ],
  },
  {
    id: 'z40cocktails',
    name: 'Zero40 Cocktails',
    icon: '✨',
    tag: 'Our Signatures',
    color: '#8B4E1E',
    items: [
      { name: 'Dark Soul',           price: 525, note: 'Kahlua, Dark Rum, Chocolate & a dash of Cream' },
      { name: 'Screaming Orgasm',    price: 595, note: 'Kahlua, Baileys, Vodka, Irish Cream & Amaretto' },
      { name: 'Cantaritos',          price: 545, note: 'Tequila, Lime, Grape Fruit Juice & Go Swami' },
      { name: 'Dark Crown',          price: 495, note: 'Whisky, Orange Liqueur, Sweet Vermouth, Red Wine Bitters' },
      { name: 'About Thyme',         price: 425, note: 'Gin, Thyme, Lime Juice, Grapefruit, Simple Syrup & Soda' },
      { name: 'Ginger Colin',        price: 425, note: 'Gin, Lemon Grass, Homemade Ginger Syrup & Cherry Soda' },
      { name: 'A Dreamlike Green',   price: 425, note: 'Gin, Jalapeño, Cilantro, Sweet & Sour Mix, Salt & Soda' },
      { name: 'Drunk in Love',       price: 425, note: 'Ask your server for today\'s take on this classic beauty' },
    ],
  },
  {
    id: 'beercoctails',
    name: 'Beer Cocktails',
    icon: '🌊',
    tag: 'Craft × Spirits',
    color: '#5a8a3e',
    items: [
      { name: 'Black and Tan',       price: 345, note: 'Vodka, Black Currant Crush, Shavasan & Blue Camel' },
      { name: 'Cherry Beer-Rita',    price: 445, note: 'Tequila, Cherry Syrup, topped with Go Swami, Chilli Rim' },
      { name: 'Ginger Orange Beer',  price: 395, note: 'Vodka, Orange Juice, Ginger Chunks & Old Timer' },
      { name: 'Michelada',           price: 345, note: 'Tabasco, Worcestershire, Lime, Black Pepper & Blue Camel' },
    ],
  },
  {
    id: 'snacks',
    name: "Brew's BFF",
    icon: '🍟',
    tag: 'Quick Bites',
    color: '#c4a35a',
    items: [
      { name: 'Chicken Popcorn',       price: 339, note: 'Crispy battered chicken bites — classic bar snack' },
      { name: 'Shrimp Popcorn',        price: 399, note: 'Fresh water Shrimp, bread crusted with Seasonal Herbs' },
      { name: 'Onion Rings',           price: 329, note: 'Golden fried onion rings, perfectly salted' },
      { name: 'Loaded Nachos',         price: 399, note: 'Chips that will transport you straight to Mexico' },
      { name: 'Crispy Fried Corn',     price: 329, note: 'Corn Kernels fried to perfection — a great drinking snack' },
      { name: 'Peanut Masala',         price: 249, note: 'Spiced masala peanuts — the original bar companion' },
      { name: 'Country Style Cashews', price: 329, note: 'Roasted cashews with house spice blend' },
      { name: 'Garlic Bread',          price: 299, note: 'Toasted garlic bread with herb butter' },
    ],
  },
  {
    id: 'starters',
    name: 'Gobble Up',
    icon: '🔥',
    tag: 'Starters & Plates',
    color: '#c44a2a',
    items: [
      { name: 'Chicken Wings',               price: 459, note: 'Choose your sauce — the wings Hyderabad can\'t stop ordering' },
      { name: 'Butter Garlic Prawns',        price: 499, note: 'Utterly butterly Garlic Prawns served in a Wonton Cup' },
      { name: 'Beef Bulgogi',                price: 399, note: 'Tender BBQ Beef — juicy, sweet, salty & Korean-spiced' },
      { name: 'Chicken Satay',               price: 399, note: 'Indonesian grilled chicken, skewered & seasoned' },
      { name: 'Basil Chilli Lamb',           price: 449, note: 'Succulent lamb chunks marinated in chilli & basil' },
      { name: 'Masala Calamari',             price: 399, note: 'Crispy fried spicy rings in garlic and curry leaves' },
      { name: 'Fried Chicken & Waffles',     price: 399, note: 'Two delicious classics, served with spicy maple sauce' },
      { name: 'Lamb Galouti Bites',          price: 479, note: 'The spicy melt-in-your-mouth kebab from Lucknow' },
      { name: 'South Indian Fish Fry',       price: 399, note: 'Beach flavours right here. Dig in!' },
      { name: 'Oktoberfest Currywurst',      price: 399, note: 'Pork sausages with Gravy & Fries — classic German street food' },
      { name: 'Pachimirchi Prawn Rolls',     price: 499, note: 'Green Chilli Fried Prawns with Green Chilli Mayo' },
      { name: 'Chilli Cheese Dynamites',     price: 329, note: 'Crispy fried cheese chillies' },
      { name: 'Mushroom Bruschetta',         price: 299, note: 'Sautéed Mushrooms with Parmesan & Olives on toast' },
      { name: 'Tacos',                       price: 399, note: 'Soft tortillas packed with your choice of filling' },
    ],
  },
  {
    id: 'burgers',
    name: 'Buns of Glory',
    icon: '🍔',
    tag: 'Burgers & Sandwiches',
    color: '#D4860B',
    items: [
      { name: 'Chicken Steak Burger',     price: 479, note: 'Grilled chicken, Caramelised Onions & Sautéed Mushrooms' },
      { name: 'Farmer Joe Burger',        price: 499, note: 'Beef Patty, Bacon, Fried Egg, Rocket Leaves — meat overload' },
      { name: 'Roadhouse Blues Burger',   price: 499, note: 'Beef Patty, Sautéed Mushrooms, Caramelized Onions & Emmental' },
      { name: 'Hot Fried Chicken Burger', price: 429, note: 'The HFC is finger licking... you get it!' },
      { name: 'Bhuna Gosht Sliders',      price: 479, note: 'Perfectly roasted bhuna gosht in crumbly soft buns' },
      { name: 'Vada Pav Sliders',         price: 429, note: 'Straight from the streets of Bombay' },
      { name: 'Roast Beef Sliders',       price: 449, note: 'Tender Beef patties in a perfectly toasted bun' },
      { name: 'The Chicken Pulley',       price: 429, note: 'Mint Chutney & pickled onions with Desi butter chicken' },
      { name: 'Egg Salad Sandwich',       price: 399, note: 'Garlic Mayo, Egg, Lettuce in a Sourdough Sandwich' },
    ],
  },
  {
    id: 'pizza',
    name: 'Pizza',
    icon: '🍕',
    tag: 'Wood-Fired Classics',
    color: '#c4512a',
    items: [
      { name: 'Butter Chicken Pizza',       price: 649, note: 'Creamy Butter Chicken Gravy — Desi pizza perfection' },
      { name: 'Four Cheese Pizza',          price: 649, note: 'Parmesan, Feta, Mozzarella & one more — pure indulgence' },
      { name: 'Zero40 Special',             price: 699, note: 'Pineapple, Pepperoni & Green Chillies. The boss loves this.' },
      { name: 'Chicken 65 Pizza',           price: 629, note: 'East meets west in the most delicious way possible' },
      { name: 'Mushroom Truffle Oil Pizza', price: 649, note: 'For the mushroom lovers — generous amounts of truffle oil' },
      { name: 'Pepperoni Pizza',            price: 699, note: 'The most classic pizza. Pork Pepperoni.' },
      { name: 'All Meat',                   price: 699, note: 'Chicken, Lamb, Pork. Nuff Said.' },
      { name: 'Ghee Roast Chicken',         price: 649, note: 'The South Indian classic on your Italian favourite' },
      { name: 'Market Fresh Pizza',         price: 649, note: 'Jalapeños, Onions, Green Peppers, Olives, Tomato' },
      { name: 'Margherita Pizza',           price: 549, note: 'Italian Mozzarella with Basil Leaves — an all time classic' },
    ],
  },
  {
    id: 'tandoor',
    name: 'Tandoor & BBQ',
    icon: '🔥',
    tag: 'Grilled & Smoked',
    color: '#8B4E1E',
    items: [
      { name: 'Tandoori Lamb Chops',  price: 499, note: 'Slow-marinated lamb chops off the clay oven' },
      { name: 'Murgh Malai Kabab',    price: 449, note: 'Soft, creamy chicken kebabs — melt in your mouth' },
      { name: 'Mutton Seekh',         price: 499, note: 'Spicy minced Mutton with in-house spices' },
      { name: 'Joojeh Kebab',         price: 449, note: 'Iranian Lime & Saffron Chicken Kebabs' },
      { name: 'Paneer Tikka',         price: 399, note: 'Classic tandoor paneer — a crowd favourite' },
      { name: 'Tandoori Chicken',     price: 429, note: 'The original, the classic. Simply iconic.' },
      { name: 'BBQ Pork Ribs',        price: 479, note: 'Juicy Pork ribs glazed with smoky BBQ sauce' },
      { name: 'Grilled Shrimp',       price: 499, note: 'Seasoned shrimp straight from the grill' },
      { name: 'Buttery Corn on Cob',  price: 299, note: 'Charred corn with house butter — the perfect side' },
    ],
  },
  {
    id: 'mains',
    name: 'Big Chews',
    icon: '🍽️',
    tag: 'Full Mains',
    color: '#5a7a3e',
    items: [
      { name: 'Butter Chicken & Naan',      price: 499, note: 'Punjabi Style Butter Chicken with baby Naans' },
      { name: 'Fish & Chips',               price: 499, note: 'Battered with our in-house brews — Zero40 signature' },
      { name: 'Peppered Chicken Steak',     price: 499, note: 'With creamy mushroom sauce & crackled black pepper' },
      { name: 'Zero40 Mutton Biryani',      price: 499, note: 'Perfect 1:1 meat to rice — ancient Hyderabadi tradition' },
      { name: 'Zero40 Biryani Murgh Tikka', price: 449, note: 'Tikka marinated chicken in fragrant Hyderabadi biryani' },
      { name: 'Tenderloin Beef Steak',      price: 499, note: 'Beef Jus slow-cooked 12 hours, Garlic mash & Veggies' },
      { name: 'Nasi Goreng Chicken',        price: 499, note: 'Indonesian Fried Rice, fried egg, sambal drizzle' },
      { name: 'Truffle Mac & Cheese',       price: 399, note: 'Classic mac & cheese loaded with truffle oil' },
      { name: 'Paneer Lababdar & Naan',     price: 479, note: 'Punjabi Style Paneer with baby Naans' },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: '🍰',
    tag: 'Sweet Endings',
    color: '#a06090',
    items: [
      { name: 'Basque Burnt Cheesecake',    price: 325, note: 'Rustic & creamy with vanilla & dark caramel crust' },
      { name: 'Hyderabadi Cheesecake',      price: 325, note: 'Osmania biscuit base, baked cheesecake & khuban jam' },
      { name: 'Lotus Biscoff Cheesecake',   price: 325, note: 'Perfect biscoff caramel — you\'ll come back for this one' },
      { name: 'Tiramisu',                   price: 325, note: 'Mascarpone, Kahlua & Coffee. This one will make you cry.' },
      { name: 'Brownie Sundae',             price: 325, note: 'Brownie, Ice Cream, Cookie, Choc Sauce, Caramel Sauce' },
      { name: 'Banana Pudding',             price: 295, note: 'Layers of creamy pudding, bananas & vanilla cookies' },
      { name: 'Chocolate Truffle Cake',     price: 295, note: 'Everything chocolate. That\'s the whole description.' },
    ],
  },
  {
    id: 'mocktails',
    name: 'Mocktails',
    icon: '🥤',
    tag: 'Non-Alcoholic',
    color: '#2a8a7a',
    items: [
      { name: 'Anaar Mojito',      price: 225, note: 'Pomegranate, Lime, Mint & Demerara Sugar' },
      { name: 'The Letch',         price: 225, note: 'Litchi, Cranberry, Lime & Mint' },
      { name: 'GO WAH WAH',        price: 225, note: 'Guava Juice & a dash of Tabasco — surprisingly good' },
      { name: 'Aam Pina',          price: 225, note: 'Mango Juice & Pina Mix' },
      { name: "Doc's Tonic",       price: 225, note: 'Green Apple, Caramel Syrup & Apple Juice' },
      { name: 'Butter Finger',     price: 295, note: 'Banana, Vanilla Ice-Cream, Peanut Butter, Milk & Oats' },
    ],
  },
];

/* ─── STYLES ──────────────────────────────────────────────────────────────── */
const MenuStyles = () => (
  <style>{`
    /* ── Category tabs ── */
    .menu-tab-scroll { display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; scrollbar-width: none; -ms-overflow-style: none; }
    .menu-tab-scroll::-webkit-scrollbar { display: none; }
    .menu-tab { font-family: 'Anton', sans-serif; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.55rem 1.2rem; cursor: pointer; border: 1px solid rgba(212,134,11,0.2); background: transparent; color: rgba(245,240,232,0.5); white-space: nowrap; transition: all 0.2s; flex-shrink: 0; }
    .menu-tab:hover { border-color: rgba(212,134,11,0.5); color: var(--z40-offwhite,#F5F0E8); }
    .menu-tab.active { background: var(--z40-amber,#D4860B); border-color: var(--z40-amber,#D4860B); color: #0D0D0D; }

    /* ── Category card ── */
    @keyframes cardIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
    .cat-card { border: 1px solid rgba(212,134,11,0.15); background: rgba(255,255,255,0.02); position: relative; overflow: hidden; animation: cardIn 0.4s ease both; }
    .cat-card-header { border-bottom: 1px solid rgba(212,134,11,0.12); }

    /* ── Item slider ── */
    .item-slider { display: flex; gap: 0.875rem; overflow-x: auto; padding-bottom: 0.75rem; scrollbar-width: thin; scrollbar-color: rgba(212,134,11,0.4) transparent; cursor: grab; user-select: none; }
    .item-slider:active { cursor: grabbing; }
    .item-slider::-webkit-scrollbar { height: 3px; }
    .item-slider::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); }
    .item-slider::-webkit-scrollbar-thumb { background: rgba(212,134,11,0.4); border-radius: 2px; }

    /* ── Item card ── */
    .item-card { flex-shrink: 0; width: 200px; border: 1px solid rgba(212,134,11,0.12); background: rgba(255,255,255,0.03); padding: 1rem; transition: border-color 0.25s, background 0.25s, transform 0.25s; }
    .item-card:hover { border-color: rgba(212,134,11,0.4); background: rgba(212,134,11,0.06); transform: translateY(-3px); }
    @media (max-width: 640px) {
      .item-card { width: 170px; padding: 0.875rem; }
    }

    /* ── Slider arrow buttons ── */
    .slider-arrow { width: 32px; height: 32px; border: 1px solid rgba(212,134,11,0.3); background: rgba(13,13,13,0.85); color: var(--z40-amber,#D4860B); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; }
    .slider-arrow:hover { background: var(--z40-amber,#D4860B); color: #0D0D0D; border-color: var(--z40-amber,#D4860B); }
    .slider-arrow:disabled { opacity: 0.25; cursor: default; }

    /* ── Category grid ── */
    .cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 520px), 1fr)); gap: 1.5rem; }
    @media (max-width: 640px) { .cat-grid { grid-template-columns: 1fr; } }

    /* ── Beer ABV pill ── */
    .abv-pill { font-family: 'Anton', sans-serif; font-size: 0.6rem; letter-spacing: 0.15em; padding: 0.15rem 0.5rem; border: 1px solid currentColor; display: inline-block; }

  `}</style>
);

/* ─── CATEGORY GROUPS for tab filters ────────────────────────────────────── */
const GROUPS = [
  { label: 'All',       ids: null },
  { label: 'Beers',     ids: ['beers'] },
  { label: 'Cocktails', ids: ['cocktails','z40cocktails','beercoctails'] },
  { label: 'Bites',     ids: ['snacks','starters'] },
  { label: 'Mains',     ids: ['burgers','pizza','tandoor','mains'] },
  { label: 'Desserts',  ids: ['desserts','mocktails'] },
];

/* ─── ITEM SLIDER (per category) ─────────────────────────────────────────── */
const ItemSlider = ({ items, color, isBeer }) => {
  const ref = useRef(null);

  const scroll = (dir) => {
    if (ref.current) ref.current.scrollBy({ left: dir * 220, behavior: 'smooth' });
  };

  /* mouse drag-to-scroll */
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const onMouseDown  = (e) => { drag.current = { active: true, startX: e.pageX - ref.current.offsetLeft, scrollLeft: ref.current.scrollLeft }; };
  const onMouseMove  = (e) => { if (!drag.current.active) return; e.preventDefault(); const x = e.pageX - ref.current.offsetLeft; ref.current.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX); };
  const onMouseUp    = () => { drag.current.active = false; };

  /* touch scroll (mobile) */
  const touch = useRef({ startX: 0, scrollLeft: 0 });
  const onTouchStart = (e) => { touch.current = { startX: e.touches[0].pageX, scrollLeft: ref.current.scrollLeft }; };
  const onTouchMove  = (e) => { const dx = touch.current.startX - e.touches[0].pageX; ref.current.scrollLeft = touch.current.scrollLeft + dx; };

  return (
    <div>
      {/* Slider controls */}
      <div className="make-flex justify-between align-center add-margin-bottom-12">
        <div className="set-text-11" style={{ color: 'rgba(245,240,232,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {items.length} items
        </div>
        <div className="make-flex gap-8">
          <button className="slider-arrow" onClick={() => scroll(-1)} aria-label="Previous">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="slider-arrow" onClick={() => scroll(1)} aria-label="Next">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      {/* Scrollable items */}
      <div className="item-slider" ref={ref}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
        {items.map((item) => (
          <div key={item.name} className="item-card">
            {/* Beer card */}
            {isBeer ? (
              <>
                <div className="make-flex justify-between align-start add-margin-bottom-8">
                  <span className="abv-pill" style={{ color }}>{item.abv}</span>
                </div>
                <p className="font-display set-text-15 text-uppercase add-margin-bottom-6"
                  style={{ color: '#F5F0E8', lineHeight: 1.1, letterSpacing: '0.04em' }}>{item.name}</p>
                <p className="set-text-11 add-margin-bottom-8" style={{ color, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
                  {item.style}
                </p>
                <p className="set-text-12 line-height-relaxed" style={{ color: 'rgba(245,240,232,0.5)', fontWeight: 300 }}>
                  {item.note}
                </p>
              </>
            ) : (
              /* Food / drink card */
              <>
                {item.price && (
                  <div className="font-display set-text-14 add-margin-bottom-8" style={{ color }}>
                    ₹{item.price}
                  </div>
                )}
                <p className="font-display set-text-15 text-uppercase add-margin-bottom-8"
                  style={{ color: '#F5F0E8', lineHeight: 1.1, letterSpacing: '0.04em' }}>{item.name}</p>
                <p className="set-text-12 line-height-relaxed" style={{ color: 'rgba(245,240,232,0.5)', fontWeight: 300 }}>
                  {item.note}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── CATEGORY CARD ───────────────────────────────────────────────────────── */
const CategoryCard = ({ cat }) => (
  <div className="cat-card">
    {/* Card header */}
    <div className="cat-card-header add-padding-x-24 add-padding-y-20 make-flex align-center justify-between">
      <div className="make-flex align-center gap-16">
        <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{cat.icon}</span>
        <div>
          <h3 className="font-display set-text-20 text-uppercase" style={{ color: cat.color, letterSpacing: '0.04em', lineHeight: 1 }}>
            {cat.name}
          </h3>
          <p className="set-text-11 add-margin-top-4" style={{ color: 'rgba(245,240,232,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {cat.tag}
          </p>
        </div>
      </div>
      {/* Accent line */}
      <div style={{ width: '32px', height: '2px', background: cat.color, opacity: 0.6 }} />
    </div>

    {/* Slider */}
    <div className="add-padding-x-24 add-padding-y-20">
      <ItemSlider items={cat.items} color={cat.color} isBeer={cat.id === 'beers'} />
    </div>
  </div>
);

/* ─── MAIN MENU SECTION ───────────────────────────────────────────────────── */
const MenuSection = () => {
  const [activeGroup, setActiveGroup] = useState(0);

  const visibleCategories = activeGroup === 0
    ? MENU
    : MENU.filter(c => GROUPS[activeGroup].ids.includes(c.id));

  return (
    <>
      <MenuStyles />
      <section id="menu" className="grain-overlay" style={{ background: '#0a0a0a', padding: 'clamp(5rem,10vw,8rem) 0' }}>

        {/* Header */}
        <div className="add-padding-x-80 on-mobile:add-padding-x-24 add-margin-bottom-48">
          <div className="reveal make-flex flex-wrap justify-between align-end gap-24 add-margin-bottom-40">
            <div>
              <p className="section-label add-margin-bottom-20">Jubilee Hills &amp; Financial District</p>
              <h2 className="heading-hero" style={{ color: '#F5F0E8' }}>
                THE<br /><span style={{ color: 'var(--z40-amber,#D4860B)' }}>MENU</span>
              </h2>
            </div>
          </div>

          {/* Category filter tabs */}
          <div className="reveal menu-tab-scroll">
            {GROUPS.map((g, i) => (
              <button key={g.label} className={`menu-tab ${activeGroup === i ? 'active' : ''}`}
                onClick={() => setActiveGroup(i)}>
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category cards grid */}
        <div className="add-padding-x-80 on-mobile:add-padding-x-24">
          <div className="cat-grid">
            {visibleCategories.map(cat => (
              <CategoryCard key={cat.id} cat={cat} />
            ))}
          </div>
        </div>

      </section>
    </>
  );
};

export default MenuSection;
