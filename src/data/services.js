import { career } from './profile';

/*
  The ten services Tanishq offers, for clients in any industry; gaming is one niche among many.
  "Where I've done it" lists only real work already on this site (case studies, the line-up,
  brand posts). Each service also has five hand-built samples (src/data/samples.js); samples
  for fictional brands are labelled as samples wherever they appear.
*/
const post = (org) => career.flatMap((g) => g.rows).find((r) => r.org === org)?.link;

export const services = [
  {
    id: 'brand',
    title: 'Brand and design',
    line: 'Logos, brand identities, posters, social graphics and decks that look like they belong together.',
    includes: ['A logo and identity system', 'Colours, type and simple brand rules', 'Posters, social posts and ads', 'Pitch decks, menus and company profiles'],
    proof: [{ label: 'Event poster and QR registration for the Tekken 8 tournament', to: '/project/2' }],
    for: 'Start-ups, cafés, shops, creators and events.',
  },
  {
    id: 'content',
    title: 'Content and video',
    line: 'Scripts, storyboards, posting plans and subtitles for brands and creators in any niche.',
    includes: ['Hooks and short-form scripts', 'Storyboards for shoots and edits', 'Posting plans across platforms', 'Captions and subtitles'],
    proof: [
      { label: 'Co-founder, writer and director, Comedy Day and Night (YouTube, 10K+ subscribers)' },
      { label: 'Campaign content for Intel Gamer Days', href: post('Intel Gamer Days') },
    ],
    for: 'Brands, creators, cafés, shops and start-ups.',
  },
  {
    id: 'marketing',
    title: 'Marketing and growth',
    line: 'Campaign plans, audits and reports that turn effort into enquiries and sales.',
    includes: ['Campaign concepts and plans', 'Social media and marketing audits', 'Customer journeys and lead magnets', 'Monthly reports in plain English'],
    proof: [{ label: 'Brand and audience work for a creator on Rooter (200K+) since 2022' }],
    for: 'Small brands, D2C shops, cafés and creators.',
  },
  {
    id: 'creators',
    title: 'Creator and brand partnerships',
    line: 'I match creators with brands across niches and run each campaign from the pitch to the payment.',
    includes: ['Media kits and pitches', 'Briefs, deliverables and dates in writing', 'Coordinating content and approvals', 'Following up until it’s live and paid'],
    proof: [
      { label: 'Brand manager for a creator (Rooter, 200K+) since 2022' },
      { label: 'Samsung Galaxy', href: post('Samsung Galaxy') },
      { label: 'StreamO × Amazon miniTV', href: post('StreamO × Amazon miniTV') },
      { label: 'TVS Raider × DreamHack Hyderabad', href: post('TVS Raider × DreamHack Hyderabad') },
    ],
    for: 'Creators who want brand deals, and brands looking for creators.',
  },
  {
    id: 'events',
    title: 'Events and tournaments',
    line: 'Launches, meetups, workshops, game jams and tournaments, planned and run from first idea to wrap-up.',
    includes: ['Format, schedule and run of show', 'Registration and attendee messages', 'Running the day', 'A wrap-up of what worked and what to change'],
    proof: [
      { label: 'Hackabury 2026: operations for 107 students over 24 hours', to: '/project/9' },
      { label: 'Tekken 8 collegiate tournament system', to: '/project/2' },
      { label: 'Open days and campus events, CCCU student ambassador' },
      { label: 'Quiditch Scrims and Lockdown League, 2019–22' },
    ],
    for: 'Colleges, start-up communities, brands, cafés and gaming groups.',
  },
  {
    id: 'web',
    title: 'Websites and digital',
    line: 'Landing pages, link pages and simple sites that load fast and make the next step obvious.',
    includes: ['Page design and copy', 'Mobile-first layouts', 'Contact, booking and sign-up forms', 'Launch and small updates'],
    proof: [{ label: 'This website', to: '/' }],
    for: 'Freelancers, cafés, small brands, events and start-ups.',
  },
  {
    id: 'merch',
    title: 'Merch and product design',
    line: 'Merch people actually want to wear, with mockups and print-ready specs your supplier can follow.',
    includes: ['Collection concepts and artwork', 'Mockups in each colourway', 'Print and embroidery specs', 'Supplier quotes and sample checks'],
    proof: [],
    for: 'Creators, teams, colleges, events and companies.',
  },
  {
    id: 'packaging',
    title: 'Packaging and labels',
    line: 'Boxes, labels and tags that look right on the shelf and survive the courier.',
    includes: ['A packaging look for the whole range', 'Front and back labels', 'Dielines and print-ready artwork', 'Printer coordination and proofs'],
    proof: [],
    for: 'D2C brands, food and drink, soaps and cosmetics, clothing labels.',
  },
  {
    id: 'research',
    title: 'Research and reports',
    line: 'Clear, sourced answers to hard questions about markets, audiences and industries.',
    includes: ['Market, competitor and audience research', 'Reports and decks with the findings first', 'Frameworks you can act on', 'One-page summaries'],
    proof: [
      { label: 'MA dissertation: 22 degree programmes studied in full', to: '/project/4' },
      { label: 'A model for sustainable esports organisations', to: '/project/1' },
      { label: 'A study of Indian esports organisations', to: '/project/7' },
    ],
    for: 'Founders, brands entering a new market and organisations planning a change.',
  },
  {
    id: 'business',
    title: 'Business support and AI workflows',
    line: 'Checklists, trackers, status updates and simple AI-assisted workflows that take admin off your plate.',
    includes: ['Process documents and checklists', 'Plans, trackers and weekly updates', 'AI-assisted workflows with a human check', 'Tidy data and simple reports'],
    proof: [
      { label: 'Operations associate, IFESM, 2020–24' },
      { label: 'Hackabury 2026 operations and planning', to: '/project/9' },
    ],
    for: 'Small teams, founders, clinics, shops and event organisers.',
  },
];

export const terms = [
  { label: 'Where', value: 'Remote, with clients anywhere' },
  { label: 'In person', value: 'Events in India' },
  { label: 'Pricing', value: 'Per project, agreed before we start' },
];

export const steps = [
  { title: 'Tell me what you need', text: 'The goal, the dates and your budget. A few lines is enough.' },
  { title: 'Get a plan', text: 'I reply with the scope, a timeline and a price.' },
  { title: 'The work', text: 'I do the work and update you at the check-ins we agree.' },
  { title: 'Wrap-up', text: 'You get the finished work and a short note on what to do next.' },
];
