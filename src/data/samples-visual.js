/*
  The visual samples: brand boards, posters, social posts, a deck, a menu, website mock-ups, merch,
  packaging, a storyboard and a lead magnet. Every one is drawn in code by hand (see src/components/samples/art).
  All clients are invented; each sample is labelled "Sample" wherever it appears.
*/

/* Palettes of the invented clients, so the same brand looks the same in every sample. */
const HALLI = { forest: '#1E3A2F', cherry: '#9E2B25', mist: '#DCE5DF', ink: '#141414', light: '#EEF0EA' };
const NEEL = { indigo: '#24346E', chalk: '#F2F0EA', orange: '#F05A28', deep: '#141B3A', shades: ['#D7DEF0', '#A9B6DD', '#6F80BD', '#3E5196', '#24346E'] };
const KITE = { main: '#0F766E', mainInk: '#F4FBF9', accent: '#FACC15', ink: '#0F172A', bg: '#F7FAF9', panel: '#E3EFEC', muted: '#4B5B66' };
const TIFFIN = { main: '#2F6B3A', mainInk: '#FFF8E7', bg: '#FBE7A1', ink: '#1F2A1F', accent: '#E8A400' };
const PLATE = { main: '#D64933', mainInk: '#FFF5EE', bg: '#FDEDE6', panel: '#F7D9CE', ink: '#2A1A16', accent: '#F2B33D' };
const MEETUP = { navy: '#0B2545', ink: '#F3EFE7', accent: '#FF7A3D', panel: '#E8EDF4', muted: '#4A5872' };

const art = (kind, props) => ({ t: 'art', kind, props });

export const visualSamples = [
  /* ================= Brand and design ================= */
  {
    id: 'coffee-brand-identity',
    service: 'brand',
    title: 'Brand identity',
    summary: 'A logo, colours, type and first applications for a small coffee roaster.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Client', 'Halli Roasters'], ['Industry', 'Specialty coffee'], ['Delivered', 'Logo, colours, type, stationery'], ['Files', 'Vector, web and print']] },
      art('identity', {
        lockup: ['Halli', 'Roasters'],
        mark: 'bean',
        tagline: 'Single-estate coffee, roasted every week in Bengaluru.',
        colors: [['Forest', HALLI.forest, HALLI.light], ['Cherry', HALLI.cherry, HALLI.light], ['Mist', HALLI.mist, HALLI.forest], ['Ink', HALLI.ink, HALLI.light]],
        fonts: [['Display', 'Instrument Serif', 'serif'], ['Text', 'Geist', 'sans']],
        card: { title: 'Roastery and café', line: 'Indiranagar, Bengaluru', handle: '@halliroasters' },
      }),
      { t: 'note', text: 'The mark is a coffee bean with a path running through it: the route from the estate to the cup.' },
    ],
  },
  {
    id: 'event-poster',
    service: 'brand',
    title: 'Event poster',
    summary: 'An A3 poster for a start-up meetup that also works as an Instagram post.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Client', 'Vizag Founders Meetup'], ['Size', 'A3 and 1080 × 1350'], ['Used on', 'Café and campus noticeboards'], ['Edition', 'December']] },
      art('poster', {
        bg: MEETUP.navy, ink: MEETUP.ink, accent: MEETUP.accent, motif: 'sun',
        kicker: 'Vizag', title: ['Founders', 'Meetup'], line: 'Six demos, one panel and a room full of people building things.',
        details: [['When', 'Friday 4 December, 6:30 pm'], ['Where', 'The Deck, Beach Road'], ['Entry', 'Free, sign up first']],
        footer: 'Sign up: link in bio, @vizagfounders',
      }),
      { t: 'note', text: 'The sun over the sea nods to Beach Road. It becomes the look for every edition; only the date changes.' },
    ],
  },
  {
    id: 'launch-social-posts',
    service: 'brand',
    title: 'Launch posts',
    summary: 'Three feed posts for a clothing drop: the announcement, the story behind it and a styling tip.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Client', 'Neel Studio'], ['Format', 'Three posts, 1080 × 1080'], ['Moment', 'The indigo drop'], ['Posting', 'Tuesday to Thursday']] },
      art('social', {
        handle: 'neelstudio', mark: 'drop', colors: { main: NEEL.indigo, light: NEEL.chalk },
        posts: [
          { kind: 'drop', bg: NEEL.indigo, ink: NEEL.chalk, top: 'Saturday, 7 pm', title: 'The indigo drop', small: 'Twelve pieces. Dyed by hand.', shades: NEEL.shades, caption: 'It’s here on Saturday. Turn on notifications.' },
          { kind: 'dye', bg: NEEL.chalk, ink: NEEL.deep, title: 'How deep is the blue?', shades: NEEL.shades, labels: ['1 dip', '3 dips', '6 dips', '10 dips', '14 dips'], caption: 'Every shirt goes in the vat fourteen times.' },
          { kind: 'ways', bg: NEEL.orange, ink: NEEL.deep, title: 'One shirt, three ways', items: ['Buttoned, tucked in', 'Open over a tee', 'Knotted at the waist'], small: 'Save this for later', caption: 'Which way are you wearing it?' },
        ],
      }),
    ],
  },
  {
    id: 'pitch-deck',
    service: 'brand',
    title: 'Pitch deck',
    summary: 'Four slides from a twelve-slide deck for an early-stage start-up: the cover, the problem, how it works and the pilot.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Client', 'Kitepoint'], ['Product', 'Salon bookings on WhatsApp'], ['Format', '16:9 deck'], ['Shown', '4 of 12 slides']] },
      art('deck', {
        name: 'Kitepoint', mark: 'kite', theme: KITE,
        slides: [
          { kind: 'cover', title: 'Bookings for small salons, right inside WhatsApp.', sub: 'Seed round, 2027' },
          { kind: 'statement', label: 'The problem', title: 'A missed call is a missed booking.', sub: 'Small salons take bookings by phone between clients, so calls go unanswered at the busiest times.' },
          { kind: 'steps', label: 'How it works', title: 'Three taps for the customer', items: ['Message the salon on WhatsApp', 'Pick a free slot from the list', 'Get a reminder the day before'] },
          { kind: 'numbers', label: 'The pilot', title: 'Twelve weeks, one city', items: [['120', 'salons signed up'], ['9,400', 'bookings made'], ['31%', 'fewer no-shows']] },
        ],
      }),
    ],
  },
  {
    id: 'lunch-menu',
    service: 'brand',
    title: 'Lunch menu',
    summary: 'A one-page menu for a lunch-box kitchen, designed for print and for sending as a WhatsApp image.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Client', 'Tiffin Lab'], ['Format', 'A5 and phone image'], ['Updated', 'Every Monday'], ['Prices', 'Sample prices']] },
      art('menu', {
        name: 'Tiffin Lab', sub: 'Lunch boxes, Monday to Saturday', mark: 'tiffin', colors: TIFFIN,
        sections: [
          { title: 'Lunch boxes', items: [['Veg thali box', 'Dal, sabzi, rice, two rotis, salad', '₹180'], ['Paneer box', 'Paneer butter masala, jeera rice, two rotis', '₹220'], ['Egg curry box', 'Egg curry, rice, two rotis', '₹200'], ['Chicken curry box', 'Home-style curry, rice, two rotis', '₹240']] },
          { title: 'Add-ons', items: [['Extra roti', '', '₹15'], ['Curd', '', '₹30'], ['Sweet of the day', '', '₹45']] },
        ],
        footer: 'Order on WhatsApp before 11 am. Delivered by 1 pm.',
      }),
    ],
  },

  /* ================= Websites and digital ================= */
  {
    id: 'coffee-landing-page',
    service: 'web',
    title: 'Shop landing page',
    summary: 'A home page for a coffee roaster: the best seller up top, three coffees to choose from and a subscription.',
    basis: 'sample',
    blocks: [
      art('site', {
        url: 'halliroasters.in', brand: { name: 'Halli Roasters', mark: 'bean' }, nav: ['Coffee', 'Brew guides', 'Café', 'Wholesale'], cta: 'Shop beans',
        theme: { bg: HALLI.light, ink: HALLI.ink, muted: '#4E5A53', main: HALLI.forest, mainInk: HALLI.light, accent: HALLI.cherry, panel: HALLI.mist, display: 'serif' },
        hero: {
          kicker: 'Roasted this week', title: 'Coffee that tastes like where it grew.', sub: 'Single-estate beans from the Western Ghats, roasted in small batches and posted within two days.',
          cta: 'Shop the coffee', cta2: 'Find your brew',
          art: { kind: 'pouch', mark: 'bean', name: 'Kaimara Estate', note: 'Jaggery, orange, cocoa', weight: '250 g', label: 'Best seller' },
        },
        sections: [
          { kind: 'cards', title: 'Pick your coffee', items: [['Kaimara Estate', 'Medium roast. Jaggery, orange, cocoa.', '₹520'], ['Hill Dark', 'Dark roast. Chocolate, spice.', '₹480'], ['Filter Blend', 'For South Indian filter coffee.', '₹420']] },
          { kind: 'band', text: 'Fresh beans every month. Pause any time.', cta: 'Start a subscription' },
        ],
        footer: 'Free delivery over ₹999 · Roasted in Bengaluru',
      }),
    ],
  },
  {
    id: 'creator-link-page',
    service: 'web',
    title: 'Creator link page',
    summary: 'A mobile link page for a food creator: the latest video first, then the links brands and fans need.',
    basis: 'sample',
    blocks: [
      { t: 'split', left: [
        art('site', {
          frame: 'phone', url: 'platepostcard.in', brand: { name: 'Plate Postcard', mark: 'plate' },
          theme: { bg: PLATE.bg, ink: PLATE.ink, muted: '#6B4C44', main: PLATE.main, mainInk: PLATE.mainInk, accent: PLATE.accent, panel: PLATE.panel, display: 'serif' },
          hero: { title: 'Street food and small cafés in Hyderabad.', sub: 'New café every Friday.', cta: 'Watch Friday’s video' },
          sections: [
            { kind: 'links', items: ['This week: the ₹40 dosa', 'Café map: every place I’ve reviewed', 'Work with me', 'YouTube channel'] },
            { kind: 'grid', items: ['tumblers', 'final', 'drip', 'pour', 'scoop', 'talk'] },
          ],
        }),
      ], right: [
        { t: 'h', text: 'Why it works' },
        { t: 'list', items: ['The newest video sits at the top, because that’s what most visitors came for.', 'One link for brands, so partnership emails stop landing in DMs.', 'Loads fast on mobile data: no heavy embeds.'] },
      ] },
    ],
  },
  {
    id: 'event-page',
    service: 'web',
    title: 'Event sign-up page',
    summary: 'One page that says what the event is, when and where, and gets people signed up in under a minute.',
    basis: 'sample',
    blocks: [
      art('site', {
        url: 'vizagfounders.in/december', brand: { name: 'Vizag Founders', mark: 'wave' }, nav: ['Past events', 'Speak', 'Sponsor'], cta: 'Get a ticket',
        theme: { bg: '#F7F5F0', ink: MEETUP.navy, muted: MEETUP.muted, main: MEETUP.navy, mainInk: MEETUP.ink, accent: MEETUP.accent, panel: MEETUP.panel, display: 'sans' },
        hero: { kicker: 'Friday 4 December, 6:30 pm', title: 'Six founders. Five minutes each. One good evening.', sub: 'Demos from local start-ups, a short panel on finding your first 100 customers, then food and conversation.', cta: 'Get a free ticket', cta2: 'See the speakers', art: { kind: 'scene', scene: 'talk' } },
        sections: [
          { kind: 'details', items: [['Where', 'The Deck, Beach Road'], ['Entry', 'Free, 90 seats'], ['Parking', 'Gate 2, behind the building']] },
          { kind: 'form', title: 'Get your ticket', fields: ['Full name', 'Email', 'Company or project'], button: 'Reserve my seat' },
        ],
      }),
    ],
  },
  {
    id: 'startup-landing-page',
    service: 'web',
    title: 'Start-up landing page',
    summary: 'A landing page for a booking app that explains the product in three steps and asks for one thing: a demo.',
    basis: 'sample',
    blocks: [
      art('site', {
        url: 'kitepoint.app', brand: { name: 'Kitepoint', mark: 'kite' }, nav: ['How it works', 'Pricing', 'For salons'], cta: 'Book a demo',
        theme: { bg: KITE.bg, ink: KITE.ink, muted: KITE.muted, main: KITE.main, mainInk: KITE.mainInk, accent: KITE.accent, panel: KITE.panel, display: 'sans' },
        hero: { kicker: 'For small salons', title: 'Take bookings on WhatsApp without picking up the phone.', sub: 'Customers choose a free slot in the chat. You get the booking, they get a reminder.', cta: 'Book a 15-minute demo', cta2: 'See pricing', art: { kind: 'mark', mark: 'kite' } },
        sections: [
          { kind: 'cards', title: 'How it works', items: [['1. Connect', 'Link your WhatsApp Business number in five minutes.'], ['2. Set your hours', 'Add services, staff and breaks.'], ['3. Take bookings', 'Customers book in the chat, day or night.']] },
          { kind: 'band', text: 'Free for your first 50 bookings.', cta: 'Book a demo' },
        ],
        footer: 'Kitepoint · Bookings for small salons',
      }),
    ],
  },
  {
    id: 'product-page',
    service: 'web',
    title: 'Product page',
    summary: 'A product page for a clothing label: big product view, sizes, delivery cost early and care in plain words.',
    basis: 'sample',
    blocks: [
      art('site', {
        url: 'neelstudio.in/indigo-shirt', brand: { name: 'Neel Studio', mark: 'drop' }, nav: ['New', 'Shirts', 'Tees', 'Care'], cta: 'Bag (1)',
        theme: { bg: NEEL.chalk, ink: NEEL.deep, muted: '#4C5370', main: NEEL.indigo, mainInk: NEEL.chalk, accent: NEEL.orange, panel: '#E3E2DA', display: 'serif' },
        sections: [
          { kind: 'product', kicker: 'The indigo drop', title: 'Hand-dyed indigo shirt', price: '₹1,800', note: 'Free delivery over ₹1,500. Ships in 2 days.', sizes: ['S', 'M', 'L', 'XL'], cta: 'Add to bag', points: ['100% cotton, dyed 14 times', 'Relaxed fit: take your usual size', 'Wash cold, dry in shade'], art: { kind: 'tee', color: NEEL.indigo, ink: NEEL.chalk, print: '', label: 'Front' } },
        ],
        footer: 'Free returns within 7 days · Made in Jaipur',
      }),
    ],
  },

  /* ================= Merch and product design ================= */
  {
    id: 'team-jersey',
    service: 'merch',
    title: 'Team jersey and cap',
    summary: 'A jersey set for an esports team: front, back with player number, and a matching cap.',
    basis: 'sample',
    blocks: [
      art('merch', {
        cols: 3, bg: '#0E1A1C', dark: true,
        items: [
          { kind: 'jersey', color: '#06383D', trim: '#F2C230', label: 'Front', pattern: { kind: 'shards', color: '#0B4E55', size: 30, y: 60, h: 160 },
            panel: 'M48 66 L60 66 L56 210 L48 210 Z M152 66 L140 66 L144 210 L152 210 Z',
            prints: [
              { at: [124, 70], mark: 'wave', markFill: '#F2C230', markBg: '#06383D', markS: 0.34 },
              { at: [100, 120], lines: [['KITEPOINT', 15, 800, 'sans', '#F2F4F3'], ['BOOK ON WHATSAPP', 6.5, 600, 'sans', '#F2C230']] },
            ] },
          { kind: 'jersey', color: '#06383D', trim: '#F2C230', label: 'Back', pattern: { kind: 'shards', color: '#0B4E55', size: 30, y: 60, h: 160 },
            panel: 'M48 66 L60 66 L56 210 L48 210 Z M152 66 L140 66 L144 210 L152 210 Z',
            print: { lines: [['KAIZO', 13, 700, 'sans', '#F2F4F3'], ['07', 58, 800, 'sans', '#F2C230'], ['TEAM MONSOON', 6.5, 700, 'sans', '#F2F4F3']] } },
          { kind: 'cap', color: '#06383D', trim: '#F2C230', label: 'Cap, embroidered', print: { mark: 'wave', markFill: '#F2C230', markBg: '#06383D', markS: 0.5 } },
        ],
      }),
      { t: 'table', head: ['Item', 'Colours', 'Print', 'Sizes', 'Quantity'], rows: [
        ['Jersey', 'Deep teal, tonal shard pattern, yellow side panels', 'Full sublimation; crest left chest, sponsor centre chest', 'S to XXL', '12'],
        ['Cap', 'Deep teal, yellow mark', 'Flat embroidery, front', 'One size', '12'],
      ] },
      { t: 'note', text: 'Placement follows how team kits are usually laid out: crest over the heart, main sponsor across the chest, player name and number on the back.' },
    ],
  },
  {
    id: 'cafe-merch',
    service: 'merch',
    title: 'Café merch',
    summary: 'A tote, a cap and a mug a coffee brand can sell at the counter, all in its own colours.',
    basis: 'sample',
    blocks: [
      art('merch', {
        cols: 3, bg: '#E9ECE8',
        items: [
          { kind: 'tote', color: HALLI.mist, trim: HALLI.forest, label: 'Canvas tote', print: { mark: 'bean', markFill: HALLI.forest, markBg: HALLI.mist, markS: 0.8, lines: [['Halli Roasters', 16, 400, 'serif', HALLI.forest]] } },
          { kind: 'cap', color: HALLI.forest, trim: HALLI.mist, label: 'Cap', print: { mark: 'bean', markFill: HALLI.cherry, markBg: HALLI.forest, markS: 0.5 } },
          { kind: 'mug', color: HALLI.cherry, trim: HALLI.cherry, label: 'Enamel mug', print: { mark: 'bean', markFill: HALLI.light, markBg: HALLI.cherry, markS: 0.6 } },
        ],
      }),
      { t: 'table', head: ['Item', 'Colours', 'Print', 'Sizes', 'Quantity'], rows: [
        ['Tote', 'Natural mist canvas', 'Screen print, one colour', '38 × 42 cm', '100'],
        ['Cap', 'Forest', 'Embroidery, front', 'One size', '50'],
        ['Mug', 'Cherry enamel', 'Pad print', '350 ml', '60'],
      ] },
    ],
  },
  {
    id: 'creator-merch-drop',
    service: 'merch',
    title: 'Creator merch drop',
    summary: 'A small drop for a food creator: a hoodie, a tee and a tote with a line their audience already says.',
    basis: 'sample',
    blocks: [
      art('merch', {
        cols: 3, bg: '#F3E3DC',
        items: [
          { kind: 'hoodie', color: PLATE.main, trim: PLATE.mainInk, label: 'Hoodie', print: { lines: [['eat local,', 15, 400, 'serif', PLATE.mainInk], ['post later', 15, 400, 'serif', PLATE.mainInk]] } },
          { kind: 'tee', color: PLATE.bg, trim: PLATE.main, label: 'Tee', print: { mark: 'plate', markFill: PLATE.main, markBg: PLATE.bg, markS: 0.42, lines: [['PLATE POSTCARD', 8, 700, 'sans', PLATE.ink]] } },
          { kind: 'tote', color: PLATE.accent, trim: PLATE.ink, label: 'Tote', print: { lines: [['Hyderabad', 14, 400, 'serif', PLATE.ink], ['one plate', 14, 400, 'serif', PLATE.ink], ['at a time', 14, 400, 'serif', PLATE.ink]] } },
        ],
      }),
      { t: 'table', head: ['Item', 'Colour', 'Print', 'Sizes', 'Run'], rows: [
        ['Hoodie', 'Tomato red', 'Screen print, chest', 'S to XXL', 'Pre-order, 7 days'],
        ['Tee', 'Blush', 'Small chest print', 'S to XXL', 'Pre-order, 7 days'],
        ['Tote', 'Butter yellow', 'Screen print', 'One size', '150'],
      ] },
    ],
  },
  {
    id: 'college-fest-tees',
    service: 'merch',
    title: 'College fest T-shirts',
    summary: 'Crew T-shirts for a college fest, easy to spot in a crowd, with a cap for the volunteers.',
    basis: 'sample',
    blocks: [
      art('merch', {
        cols: 3, bg: '#EDE6E9',
        items: [
          { kind: 'tee', color: '#C2185B', trim: '#FFD23F', label: 'Front', print: { mark: 'star', markFill: '#FFD23F', markBg: '#C2185B', markS: 0.42, lines: [['RIVERSIDE', 14, 800, 'sans', '#F7F7F2'], ['FEST', 14, 800, 'sans', '#F7F7F2']] } },
          { kind: 'tee', color: '#C2185B', trim: '#FFD23F', label: 'Back', print: { lines: [['CREW', 30, 800, 'sans', '#FFD23F'], ['Ask me anything', 10, 600, 'sans', '#F7F7F2']] } },
          { kind: 'cap', color: '#161616', trim: '#FFD23F', label: 'Volunteer cap', print: { mark: 'star', markFill: '#FFD23F', markBg: '#161616', markS: 0.45 } },
        ],
      }),
      { t: 'table', head: ['Item', 'Colours', 'Print', 'Sizes', 'Quantity'], rows: [
        ['Crew tee', 'Magenta, yellow and white print', 'Screen print, front and back', 'S to XXL', '80'],
        ['Volunteer cap', 'Black, yellow star', 'Embroidery', 'One size', '40'],
      ] },
    ],
  },
  {
    id: 'welcome-kit',
    service: 'merch',
    title: 'New-joiner welcome kit',
    summary: 'A welcome kit a start-up sends new team members: notebook, mug, tee and stickers.',
    basis: 'sample',
    blocks: [
      art('merch', {
        cols: 4, bg: '#E6EEEC',
        items: [
          { kind: 'notebook', color: KITE.main, trim: KITE.accent, label: 'A5 notebook', print: { mark: 'kite', markFill: KITE.accent, markBg: KITE.main, markS: 0.6 } },
          { kind: 'mug', color: KITE.accent, trim: KITE.accent, label: 'Mug', print: { mark: 'kite', markFill: KITE.main, markBg: KITE.accent, markS: 0.55 } },
          { kind: 'tee', color: KITE.ink, trim: KITE.main, label: 'Tee', print: { mark: 'kite', markFill: KITE.accent, markBg: KITE.ink, markS: 0.3, lines: [['kitepoint', 9, 700, 'sans', KITE.mainInk]] } },
          { kind: 'stickers', colors: [KITE.main, KITE.accent, KITE.panel], mark: 'kite', words: ['Booked!', 'Day one'], label: 'Sticker sheet' },
        ],
      }),
      { t: 'p', small: true, text: 'Packed in a printed box with a welcome note from the founders. Reordered in batches of 10.' },
    ],
  },

  /* ================= Packaging and labels ================= */
  {
    id: 'coffee-pouch',
    service: 'packaging',
    title: 'Coffee pouch',
    summary: 'A 250 g stand-up pouch with a front label that sells and a back label that answers the questions.',
    basis: 'sample',
    blocks: [
      art('pouch', {
        colors: { bag: HALLI.forest, trim: HALLI.mist, labelBg: HALLI.light, ink: HALLI.ink, main: HALLI.cherry, pattern: '#264A3C', stage: '#D9E2DC' },
        mark: 'bean', brand: 'Halli Roasters', product: 'Kaimara Estate', notes: 'Jaggery, orange, cocoa', weight: '250 g',
        back: [
          ['Product', 'Roasted coffee beans, 100% arabica'],
          ['Origin', 'Kaimara Estate, Chikkamagaluru'],
          ['Net quantity', '250 g'],
          ['MRP', '₹520.00 (incl. of all taxes)'],
          ['Unit sale price', '₹2.08 per g'],
          ['Roasted and packed', 'Month and year on the seal'],
          ['Best before', '6 months from roasting'],
          ['Made by', 'Halli Roasters, Indiranagar, Bengaluru'],
          ['FSSAI Lic. No.', 'Printed from the licence'],
          ['Consumer care', 'Phone and email of the roaster'],
        ],
        info: { veg: true, footer: 'Brew: two level spoons per cup. Keep sealed, cool and dry.' },
      }),
      { t: 'p', small: true, text: 'Matte kraft-lined pouch with a one-way degassing valve and a roast-date strip. The back carries the declarations Indian food and packaging rules ask for: common name, net quantity, MRP and unit price, dates, maker’s address, FSSAI licence and consumer care.' },
    ],
  },
  {
    id: 'soap-box-dieline',
    service: 'packaging',
    title: 'Soap box dieline',
    summary: 'A flat box net for a handmade soap, ready for the printer: cut lines, folds and artwork in place.',
    basis: 'sample',
    blocks: [
      art('dieline', {
        colors: { side: '#E9476F', panel: '#FBF3F4', labelBg: '#FBF3F4', ink: '#3A1530', accent: '#B8204A', cut: '#3A1530', pattern: '#F07A96', bleed: '#2F7DD1' },
        mark: 'flower', brand: 'Gulmohar', product: 'Rose and clay soap', sub: '100 g, handmade bar',
        backLines: [
          'Ingredients',
          'Sodium Olivate, Sodium Cocoate, Kaolin, Aqua,',
          'Rosa Damascena Flower Oil, Glycerin',
          'Net weight 100 g',
          'MRP ₹249.00 (incl. of all taxes)',
          'Batch no., Mfg. date, Use before: on base',
          'Mfg. Lic. No.: from the licence',
          'Made by Gulmohar, Pune, Maharashtra',
          'For external use only.',
          'Consumer care: phone and email',
        ],
        dims: 'Box 90 × 60 × 30 mm, 350 gsm card',
      }),
      { t: 'note', text: 'Laid out the way printers expect: solid cut lines, dashed folds, 3 mm bleed past the cut, and the glue flap and tuck flaps marked. The back panel follows Indian cosmetics labelling: ingredient list, net weight, MRP, batch, dates, licence number and the maker’s address. The maker supplies and checks the final text.' },
    ],
  },
  {
    id: 'chutney-jar-label',
    service: 'packaging',
    title: 'Jar label',
    summary: 'A front and back label for a small-batch chutney, with space kept for the details the law needs.',
    basis: 'sample',
    blocks: [
      art('jar', {
        colors: { glass: '#B88A4A', lid: TIFFIN.main, labelBg: TIFFIN.bg, ink: TIFFIN.ink, main: TIFFIN.main, pattern: '#F2C94C', stage: '#F3E6C4' },
        mark: 'tiffin', brand: 'Tiffin Lab', product: 'Peanut chutney', sub: 'Made fresh every Monday', weight: '200 g',
        back: [
          ['Ingredients', 'Roasted peanuts (62%), dry red chilli, garlic, tamarind, groundnut oil, salt'],
          ['Allergen', 'Contains peanuts'],
          ['Net quantity', '200 g'],
          ['MRP', '₹180.00 (incl. of all taxes)'],
          ['Unit sale price', '₹0.90 per g'],
          ['Date and batch', 'Packed, best before and batch on the lid'],
          ['Storage', 'Refrigerate after opening, use within 15 days'],
          ['Made by', 'Tiffin Lab, Madhapur, Hyderabad'],
          ['FSSAI Lic. No.', 'Printed from the licence'],
        ],
        info: { veg: true, nutrition: { title: 'Nutrition per 100 g', value: 'from lab report', rows: ['Energy (kcal)', 'Protein (g)', 'Carbohydrate (g)', 'Total sugars (g)', 'Added sugars (g)', 'Total fat (g)', 'Saturated fat (g)', 'Trans fat (g)', 'Sodium (mg)'] } },
      }),
      { t: 'note', text: 'The back follows the FSS (Labelling and Display) Regulations, 2020: ingredients in descending order with the key one as a percentage, a separate allergen line, the veg mark, nutrition per 100 g, dates, batch and the FSSAI licence. Values come from the lab report and the licence, never made up.' },
    ],
  },
  {
    id: 'garment-tags',
    service: 'packaging',
    title: 'Garment tags',
    summary: 'A hang tag, a woven neck label and a care label for a shirt, so it feels finished before it is worn.',
    basis: 'sample',
    blocks: [
      art('tags', {
        colors: { main: NEEL.indigo, paper: NEEL.chalk, trim: '#9AA0B5', ink: NEEL.deep },
        mark: 'drop', brand: 'Neel', price: '₹1,800', size: 'Size M, indigo shirt',
        care: ['Gentle wash, 30°C', 'Do not bleach', 'Do not tumble dry', 'Dry in shade', 'Warm iron', 'Do not dry clean', 'Made in India'],
        material: '100% cotton',
        back: [['Product', 'Shirt, 1 N'], ['Size', 'M, chest 102 cm'], ['MRP', '₹1,800 incl. all taxes'], ['Mfd.', 'Month and year'], ['Made by', 'Neel Studio, Jaipur'], ['Customer care', 'Phone and email']],
      }),
      { t: 'note', text: 'Care symbols run in the standard order (wash, bleach, dry, iron, dry clean), and the back of the tag carries what Indian packaged-goods rules ask for: generic name and count, size, MRP, month and year of manufacture, maker and customer care.' },
    ],
  },
  {
    id: 'unboxing-mailer',
    service: 'packaging',
    title: 'Mailer and unboxing',
    summary: 'A one-colour mailer box with a printed inside lid, a thank-you card and a seal sticker.',
    basis: 'sample',
    blocks: [
      art('mailer', {
        colors: { box: '#C9A27A', boxInk: NEEL.deep, main: NEEL.indigo, mainInk: NEEL.chalk, card: NEEL.chalk, cardInk: NEEL.deep, accent: NEEL.orange },
        mark: 'drop', brand: 'Neel Studio', insideLine: 'Indigo fades. That’s the point.',
        card: { title: 'Thank you for buying slow.', text: 'Wash it cold, dry it in the shade, and send us a photo in a year.', sign: 'The Neel team' },
        sticker: 'Dyed by hand',
      }),
      { t: 'p', small: true, text: 'Kraft mailer printed in one colour to keep the cost down; the inside lid does the talking.' },
    ],
  },
];

/* Visual samples for services that are otherwise document-led. */
export const storyboardSample = {
  id: 'reel-storyboard',
  service: 'content',
  title: 'Storyboard',
  summary: 'The coffee Reel drawn frame by frame, so the shoot takes one morning instead of three.',
  basis: 'sample',
  blocks: [
    art('storyboard', {
      frames: [
        { time: '0:00', shot: 'Close-up', scene: 'drip', action: 'Decoction drips into the tumbler.', said: 'Café-style filter coffee at home.' },
        { time: '0:03', shot: 'Top-down', scene: 'scoop', action: 'Two spoons into the filter.', said: 'Two spoons, packed lightly.' },
        { time: '0:10', shot: 'Side', scene: 'pour', action: 'Hot water poured, lid on.', said: 'Hot water, not boiling.' },
        { time: '0:18', shot: 'Wide', scene: 'tumblers', action: 'Milk poured between tumblers.', said: 'Pour it high.' },
        { time: '0:25', shot: 'Product', scene: 'final', action: 'Finished cup next to the bag.', said: 'Link in bio.' },
      ],
    }),
    { t: 'p', small: true, text: 'Shot list: five set-ups, one location, natural light. Matches the Reel script sample.' },
  ],
};

export const leadMagnetSample = {
  id: 'brew-guide-lead-magnet',
  service: 'marketing',
  title: 'Lead magnet',
  summary: 'A free brew guide a coffee brand trades for an email address, designed to be read on a phone.',
  basis: 'sample',
  blocks: [
    art('lead', {
      brand: 'Halli Roasters', mark: 'bean',
      colors: { paper: HALLI.light, ink: HALLI.ink, main: HALLI.forest, mainInk: HALLI.light, panel: HALLI.mist },
      title: 'Better coffee at home in five steps',
      sub: 'No machines, no jargon. Just a filter, a kettle and fresh beans.',
      steps: [
        ['Buy whole beans.', 'Grind just before you brew; flavour fades fast.'],
        ['Weigh it once.', 'Two level spoons is about 15 g. Remember the spoon.'],
        ['Mind the water.', 'Just off the boil, about 30 seconds after the kettle clicks.'],
        ['Give it time.', 'Fifteen minutes in a filter, three in a press.'],
        ['Store it right.', 'Sealed bag, cool cupboard, never the fridge.'],
      ],
      signup: { text: 'Get the full guide, with a grind chart, in your inbox.', field: 'Your email', button: 'Send me the guide' },
    }),
  ],
};
