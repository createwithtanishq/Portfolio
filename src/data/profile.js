/*
  Who Tanishq is, what he has done, and how the page frames it.
  Every fact here comes from Tanishq's own CV notes and existing portfolio copy.
  Lens ids tag each item so the "Hiring for" control can highlight what fits a role.
*/

export const EMAIL = 'createwithtanishq@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/tanishq-aryan-463009399';

export const profile = {
  name: 'Tanishq Aryan',
  headline: ['Tanishq Aryan', 'runs game day.'],
  role: 'Esports and creator operations',
  lead: 'Esports and creator operations: I plan and run tournaments, live events and brand campaigns.',
  availability: 'Seven years in esports · MA Games Design, Merit · Open to roles in Gurugram or remote',
  open: 'Open to roles in Gurugram or remote.',
  mailto: `mailto:${EMAIL}?subject=${encodeURIComponent('A role for Tanishq')}`,
  facts: [
    { label: 'Open to', value: 'Roles in Gurugram or remote' },
    { label: 'In esports since', value: '2019, running scrims and lobbies' },
    { label: 'Education', value: 'MA Games Design, Merit (2026)' },
  ],
  bio:
    "I started out making comedy sketches on YouTube, then moved into esports in 2019, running scrims and lobbies for Quiditch Scrims. Since then I've coached esports teams, streamed on Rooter, managed a gaming creator's brand work and spent four years in operations at IFESM. In 2025–26 I studied for an MA in Games Design at Canterbury Christ Church University and helped run Hackabury, a 24-hour game jam. I'm at my best where a plan meets real people: schedules, brackets, creators and crowds.",
  capabilities: [
    'Esports event and tournament operations',
    'Tournament formats, rulesets and brackets',
    'Creator and brand campaign coordination',
    'Team coaching and competitive strategy',
    'Community engagement and moderation',
    'Applied esports research',
  ],
  recognition: [
    { name: 'Top 10 of 60,000+, iQOO Chief Gaming Officer Hunt', year: '2023' },
    { name: 'MA Games Design, awarded with Merit', year: '2026' },
    { name: 'Vice-president, Hackabury Society', year: '2025–26' },
  ],
  proof: [
    'Samsung Galaxy',
    'Intel Gamer Days',
    'Amazon miniTV × StreamO',
    'TVS Raider × DreamHack',
    'iQOO Chief Gaming Officer Hunt',
    'Rooter',
    'Hackabury 2026',
  ],
  proofNote:
    'Brands I have collaborated with, the platform I streamed on, a national competition where I made the top 10 of 60,000+, and an event I helped run.',
};

/* Stations of the 3D world shown in the hero frame, in scroll order. */
export const heroReel = [
  { station: 'bracket', title: 'Tournaments', caption: 'Tournaments and scrims, run since 2019' },
  { station: 'jam', title: 'Live events', caption: 'Hackabury 2026: 107 students, 32 projects, 24 hours' },
  { station: 'creators', title: 'Creators and brands', caption: 'Campaigns with Samsung Galaxy, Intel and Amazon miniTV' },
  { station: 'pathways', title: 'Research', caption: 'MA dissertation: 22 esports degrees, studied in full' },
];

export const lenses = [
  { id: 'all', label: 'Everything' },
  { id: 'events', label: 'Events' },
  { id: 'creators', label: 'Creators and brands' },
  { id: 'community', label: 'Community' },
  { id: 'operations', label: 'Operations' },
  { id: 'research', label: 'Games and research' },
];

/* Presentation details for each case study, keyed by its id in portfolioData.work. */
export const workMeta = {
  9: { short: 'Hackabury 2026', kind: 'Event operations', format: '24-hour game jam, 107 students', station: 'jam', lenses: ['events', 'operations', 'community'], role: 'Vice-president, operations and planning' },
  2: { short: 'Tekken 8 system', kind: 'Tournament design', format: 'Double elimination, 12–16 players', station: 'bracket', lenses: ['events', 'operations', 'community'] },
  4: { short: 'Esports pathways', kind: 'MA dissertation', format: '22 degrees, 12,000 words', station: 'pathways', lenses: ['research'], role: 'Sole author, supervised by Tom Apperley' },
  1: { short: 'Sustainable orgs', kind: 'Organisational model', format: 'Six pillars, India focus', station: 'pillars', lenses: ['research', 'operations'] },
  7: { short: 'Indian ecosystems', kind: 'Comparative study', format: 'Four principles for a new org', station: 'principles', lenses: ['research', 'operations'] },
  3: { short: 'Mental performance', kind: 'Performance framework', format: 'Three core conditions', station: 'conditions', lenses: ['research', 'operations'] },
  6: { short: 'FLANT', kind: 'Game concept', format: 'Co-op sci-fi survival', station: 'flant', lenses: ['research'], role: 'Planning and collaborative documentation' },
};

/*
  The line-up: every role, grouped. `when` is shown as written.
  `link` points at Tanishq's own public post where one exists.
*/
export const career = [
  {
    group: 'Events and tournaments',
    rows: [
      { role: 'Vice-president, operations and planning', org: 'Hackabury Society, CCCU', detail: '24-hour game jam', when: '2025–26', lenses: ['events', 'operations', 'community'] },
      { role: 'Tournament system design (MA project)', org: 'Tekken 8 collegiate prototype', detail: 'Format, ruleset, venue', when: '2025', lenses: ['events', 'operations'] },
      { role: 'Co-owner, manager and host', org: 'Zainishq TDM Tournament', detail: 'Logistics and hosting', when: '2023', lenses: ['events', 'community'] },
      { role: 'Collaborator', org: 'TVS Raider × DreamHack Hyderabad', detail: 'Brand collaboration', when: '2023', lenses: ['events', 'creators'], link: 'https://www.instagram.com/reel/DMS18wrzQ5h/?igsh=MXJxZWRpeHVtdXFlZQ==' },
      { role: 'Manager and host', org: 'Quiditch Scrims and Lockdown League', detail: 'Online tournaments', when: '2019–22', lenses: ['events', 'community', 'operations'] },
    ],
  },
  {
    group: 'Creators and brands',
    rows: [
      { role: 'Brand manager and content collaborator', org: 'A gaming creator (Rooter, 200K+)', detail: 'Content and brand collaborations', when: 'Since 2022', lenses: ['creators', 'community'] },
      { role: 'Collaborator', org: 'StreamO × Amazon miniTV', detail: 'miniTV Playground', when: '2024', lenses: ['creators'], link: 'https://www.instagram.com/p/CzLLg8DviWi/?igsh=YXJjcjIzMjE5anFr' },
      { role: 'Content creator', org: 'Intel Gamer Days', detail: 'Campaign content', when: '2023', lenses: ['creators'], link: 'https://www.instagram.com/p/C48iKkJITJc/?igsh=M253NzVhc3o5M2ky' },
      { role: 'Brand collaboration', org: 'Samsung Galaxy', detail: 'Brand partnership', when: '', lenses: ['creators'], link: 'https://www.instagram.com/p/Cw0fFkGxpdV/?igsh=MTJkZDhqMmw1NnowNw==' },
      { role: 'Professional streamer', org: 'Rooter', detail: 'Live gaming streams', when: '', lenses: ['creators', 'community'] },
      { role: 'Co-founder, writer and director', org: 'Comedy Day and Night (YouTube)', detail: '10K+ subscribers', when: '2016–17', lenses: ['creators'] },
    ],
  },
  {
    group: 'Coaching',
    rows: [
      { role: 'Coach and mentor', org: 'Raze eSports', detail: 'Strategy and preparation', when: 'From 2023', lenses: ['community', 'operations'] },
      { role: 'Coach', org: 'Tanzex eSports', detail: 'Team coaching', when: '2023', lenses: ['community'] },
      { role: 'Coach', org: 'The Soul Reapers', detail: 'Team coaching', when: '2022–23', lenses: ['community'] },
      { role: 'Coach', org: 'OPS Regen', detail: 'BGMI / PUBG Mobile', when: '2022', lenses: ['community'] },
    ],
  },
  {
    group: 'Operations and campus',
    rows: [
      { role: 'Operations associate', org: 'IFESM, Visakhapatnam', detail: 'Workflows, schedules, admin', when: '2020–24', lenses: ['operations'] },
      { role: 'Amber student ambassador', org: 'Amber', detail: 'Student community', when: 'Now', lenses: ['community'], link: 'https://amberstudent.com/flex/tanishq-aryan-1768205165' },
      { role: 'Student ambassador', org: 'Canterbury Christ Church University', detail: 'Open days and events', when: '2025–26', lenses: ['community', 'events'] },
      { role: 'Top 10 finalist of 60,000+', org: 'iQOO Chief Gaming Officer Hunt', detail: 'National selection', when: '2023', lenses: ['creators', 'community'] },
    ],
  },
  {
    group: 'Education',
    rows: [
      { role: 'MA Games Design, Merit', org: 'Canterbury Christ Church University, UK', detail: 'UK Level 7, 180 credits', when: '2025–26', lenses: ['research'] },
      { role: 'Certificate in Data Science', org: 'Board Infinity', detail: 'Online certificate', when: '2023', lenses: ['research'] },
      { role: 'BBA', org: 'Vikram Deb Autonomous College, Odisha', detail: 'Undergraduate degree', when: '2017–20', lenses: ['operations'] },
    ],
  },
];

export const socials = [
  { platform: 'Email', url: `mailto:${EMAIL}`, text: EMAIL },
  { platform: 'LinkedIn', url: LINKEDIN, text: 'LinkedIn' },
  { platform: 'YouTube', url: 'https://youtube.com/@thetanishqaryan?si=EEdYkbTCiVYDNFbv', text: 'YouTube' },
  { platform: 'Instagram', url: 'https://www.instagram.com/thetanishqaryan?igsh=dHVkeTZzZ3pqYjQx&utm_source=qr', text: 'Instagram' },
];
