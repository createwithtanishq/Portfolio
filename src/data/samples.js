/*
  Fifty work samples, five per service, written by hand and drawn in code (no generated images).
  basis: 'real'   — every fact comes from one of Tanishq's case studies (linked in `source`).
         'mixed'  — the format comes from a case study; names, dates and figures are invented.
         'sample' — made to show the work; brands, names, dates and figures are invented.
  Samples are for viewing only: there is no download, and printing shows a note instead.

  The invented clients recur so the samples read like real projects:
  Halli Roasters (coffee), Neel Studio (clothing), Tiffin Lab (food delivery), Kitepoint (salon booking app),
  Plate Postcard (food creator), Vizag Founders Meetup (start-up community).
*/

import { leadMagnetSample, storyboardSample, visualSamples } from './samples-visual.js';
import { covers } from './covers.js';

const TEKKEN = { label: 'Tekken 8 collegiate tournament system', to: '/project/2' };
const ORGS = { label: 'Conceptual Model for Sustainable Esports Organisations', to: '/project/1' };
const PATHWAYS = { label: 'Esports Education and Employment Pathways (MA dissertation)', to: '/project/4' };
const INDIA = { label: 'Emerging Indian Esports Ecosystems', to: '/project/7' };

const docs = [
  /* ================= Events and tournaments ================= */
  {
    id: 'tournament-ruleset',
    service: 'events',
    title: 'Tournament ruleset',
    summary: 'A one-page ruleset for a Tekken 8 double-elimination event, sent to players before the day.',
    basis: 'real',
    source: TEKKEN,
    blocks: [
      { t: 'facts', items: [['Game', 'Tekken 8'], ['Format', 'Double elimination'], ['Players', '8 minimum, 12–16 ideal'], ['Matches', 'Best of 3, finals best of 5']] },
      { t: 'h', text: 'Match settings' },
      { t: 'cards', cols: 3, items: [
        { title: '3 rounds', text: 'Rounds per game' },
        { title: '60 seconds', text: 'Round timer' },
        { title: 'Random', text: 'Stage selection' },
      ] },
      { t: 'split', left: [
        { t: 'h', text: 'Characters' },
        { t: 'list', items: ['The winner of a game keeps the same character.', 'The loser may change character.'] },
      ], right: [
        { t: 'h', text: 'Fair play' },
        { t: 'list', items: ['No pauses unless the organiser allows it.', 'Report hardware problems straight away.', 'No modified controllers or macros.'] },
      ] },
      { t: 'h', text: 'Who does what' },
      { t: 'p', text: 'Players register in advance, arrive on time and play when their match is called. The organiser runs the bracket, the schedule and every ruling, so players only have to play.' },
      { t: 'note', text: 'Double elimination means nobody is out after a single loss.' },
    ],
  },
  {
    id: 'tournament-bracket',
    service: 'events',
    title: 'Top 8 bracket',
    summary: 'The double-elimination bracket from the Tekken 8 system, filled in for an eight-player top cut.',
    basis: 'mixed',
    source: TEKKEN,
    blocks: [
      { t: 'facts', items: [['Event', 'Tekken 8 Campus Open'], ['Players', 'Top 8'], ['Matches', 'Best of 3, finals best of 5'], ['Winner', 'Rook']] },
      { t: 'bracket', data: {
        winners: [
          { a: ['Rook', 1, 2], b: ['TwoTap', 8, 0], w: 0 },
          { a: ['Mithra', 4, 1], b: ['Kaizo', 5, 2], w: 1 },
          { a: ['Nightjar', 2, 1], b: ['Saffron', 7, 2], w: 1 },
          { a: ['Vikr4m', 3, 2], b: ['Ghostrvn', 6, 0], w: 0 },
        ],
        winnersSemis: [
          { a: ['Rook', 1, 2], b: ['Kaizo', 5, 1], w: 0 },
          { a: ['Saffron', 7, 1], b: ['Vikr4m', 3, 2], w: 1 },
        ],
        winnersFinal: { a: ['Rook', 1, 3], b: ['Vikr4m', 3, 2], w: 0 },
        losers1: [
          { a: ['TwoTap', 8, 0], b: ['Mithra', 4, 2], w: 1 },
          { a: ['Nightjar', 2, 2], b: ['Ghostrvn', 6, 1], w: 0 },
        ],
        losers2: [
          { a: ['Saffron', 7, 2], b: ['Mithra', 4, 1], w: 0 },
          { a: ['Kaizo', 5, 2], b: ['Nightjar', 2, 0], w: 0 },
        ],
        losers3: { a: ['Saffron', 7, 1], b: ['Kaizo', 5, 2], w: 1 },
        losersFinal: { a: ['Vikr4m', 3, 3], b: ['Kaizo', 5, 1], w: 0 },
        grandFinal: { a: ['Rook', 1, 3], b: ['Vikr4m', 3, 2], w: 0 },
      } },
      { t: 'p', text: 'Players who lose on the winners side drop into the losers side and get a second life. The grand final is best of 5.' },
    ],
  },
  {
    id: 'meetup-registration',
    service: 'events',
    title: 'Registration and attendee messages',
    summary: 'The sign-up form for a start-up meetup, and three short messages that keep no-shows down.',
    basis: 'sample',
    blocks: [
      { t: 'split', left: [
        { t: 'h', text: 'Sign-up form' },
        { t: 'form', title: 'Vizag Founders Meetup', fields: [
          ['Full name', 'As you’d like it on your badge'],
          ['Email', 'For your ticket and updates'],
          ['Company or project', 'Or “still deciding”'],
          ['You are a…', 'Founder, builder, investor or student'],
          ['What do you want from the evening?', 'One line is enough'],
        ], button: 'Get my ticket' },
      ], right: [
        { t: 'h', text: 'Messages' },
        { t: 'messages', items: [
          { when: 'When they sign up', text: 'You’re in for the Vizag Founders Meetup on Friday 4 December, 6:30 pm at The Deck, Beach Road. Can’t make it? Reply “cancel” and your seat goes to the waitlist.' },
          { when: 'The day before', text: 'See you tomorrow. Doors at 6:30, demos start at 7:15 sharp. Bring a card or just your phone; there’s a QR wall for swapping details.' },
          { when: 'One hour before', text: 'Parking is behind the building, gate 2. Your ticket is this message. See you soon.' },
        ] },
      ] },
    ],
  },
  {
    id: 'meetup-run-of-show',
    service: 'events',
    title: 'Run of show',
    summary: 'A minute-by-minute plan for a two-and-a-half-hour evening meetup, with an owner for every slot.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Event', 'Vizag Founders Meetup'], ['Guests', '90 expected'], ['Venue', 'The Deck, Beach Road'], ['Date', 'Friday 4 December']] },
      { t: 'timeline', rows: [
        ['17:30', 'Set up the stage, the screen and the check-in desk; test the mic', 'Organiser, venue'],
        ['18:30', 'Doors open; check-in and name badges', 'Desk'],
        ['18:45', 'Networking, with the QR wall for swapping details', 'Everyone'],
        ['19:15', 'Welcome and housekeeping, five minutes', 'Host'],
        ['19:20', 'Six founder demos, five minutes each, timer on screen', 'Host, timekeeper'],
        ['19:55', 'Panel: “Your first 100 customers”', 'Host'],
        ['20:25', 'Audience questions', 'Host'],
        ['20:40', 'Networking and food', 'Everyone'],
        ['21:30', 'Venue closes; pack down', 'Organiser'],
      ] },
      { t: 'note', text: 'Every slot has one owner, so on the night nobody has to ask who is doing what.' },
    ],
  },
  {
    id: 'meetup-wrap-up',
    service: 'events',
    title: 'Event wrap-up',
    summary: 'One page after the event: what happened, what worked and what to change next time.',
    basis: 'sample',
    blocks: [
      { t: 'stats', items: [['120', 'signed up'], ['84', 'came'], ['6', 'founder demos'], ['10 min', 'over schedule']] },
      { t: 'split', left: [
        { t: 'h', text: 'What worked' },
        { t: 'list', items: [
          'The on-screen timer kept every demo to five minutes.',
          'The QR wall got people talking in the first half hour.',
          'Day-before reminders brought turnout to 70% of sign-ups.',
        ] },
      ], right: [
        { t: 'h', text: 'What to change' },
        { t: 'list', items: [
          'Check-in queued at 6:45. Open a second desk for the first 20 minutes.',
          'The panel ran over. Cut it to three speakers.',
          'Food arrived late. Ask the caterer for 8:15, not 8:30.',
        ] },
      ] },
      { t: 'h', text: 'Before the next one' },
      { t: 'checks', items: ['Book the same venue for February', 'Open demo applications three weeks out', 'Ask two sponsors to cover food'] },
    ],
  },

  /* ================= Creator and brand partnerships ================= */
  {
    id: 'creator-media-kit',
    service: 'creators',
    title: 'Creator media kit',
    summary: 'A one-page media kit that tells a brand who the creator is, who watches and what they make.',
    basis: 'sample',
    blocks: [
      { t: 'profile', name: 'Plate Postcard', handle: '@platepostcard', line: 'Street food and small cafés across Hyderabad, in Telugu, Hindi and English.' },
      { t: 'stats', items: [['86K', 'Instagram followers'], ['31K', 'YouTube subscribers'], ['2M', 'Reel views a month'], ['3', 'posts a week']] },
      { t: 'split', left: [
        { t: 'h', text: 'Audience' },
        { t: 'bars', items: [['18–24', 41], ['25–34', 44], ['35+', 12], ['Under 18', 3]] },
        { t: 'p', small: true, text: 'Top cities: Hyderabad, Bengaluru, Chennai, Pune.' },
      ], right: [
        { t: 'h', text: 'What I make' },
        { t: 'list', items: ['Café visits and honest reviews', 'Reels and Shorts', 'Recipe-style Stories', 'Launch and event coverage'] },
      ] },
      { t: 'h', text: 'Working together' },
      { t: 'p', text: 'Good fits: cafés, restaurants, coffee, kitchenware and food delivery. Rates on request; briefs go to my manager.' },
    ],
  },
  {
    id: 'brand-pitch-email',
    service: 'creators',
    title: 'Brand pitch email',
    summary: 'A short first email to a brand: who the creator is, one clear idea and an easy next step.',
    basis: 'sample',
    blocks: [
      { t: 'email',
        to: 'Marketing team, Halli Roasters',
        subject: 'Idea: a “first sip” series with Plate Postcard',
        body: [
          'Hi Halli team,',
          'I manage Plate Postcard, a Hyderabad food creator with 86K followers on Instagram and around 2M Reel views a month.',
          'One idea: “first sip”. Plate visits three cafés that pour your beans, films the first sip and the story of the estate, then makes a home-brew Reel with your filter kit.',
          'What you get: three café Reels, six Story sets with a link sticker and one YouTube Short that pulls it all together.',
          'Could we do a 15-minute call this week? I can send the media kit before it.',
        ],
        sign: ['Tanishq Aryan', 'Manager, Plate Postcard'],
      },
    ],
  },
  {
    id: 'campaign-brief',
    service: 'creators',
    title: 'Campaign brief',
    summary: 'The page both sides sign before anything is filmed, so nobody is surprised later.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Brand', 'Halli Roasters'], ['Creator', 'Plate Postcard'], ['Campaign', 'First sip'], ['Dates', '7–28 January']] },
      { t: 'h', text: 'Goal' },
      { t: 'p', text: 'Introduce Halli’s single-estate beans to Hyderabad coffee drinkers and send them to the online store.' },
      { t: 'h', text: 'Deliverables' },
      { t: 'table', head: ['Deliverable', 'Length', 'Draft to brand', 'Goes live'], rows: [
        ['Café Reel × 3', '45–60 seconds', '9, 16 and 23 Jan', '12, 19 and 26 Jan'],
        ['Story set × 6', '3 frames each', 'With each Reel', 'Two per Reel'],
        ['YouTube Short × 1', 'Under 60 seconds', '26 Jan', '28 Jan'],
      ] },
      { t: 'split', left: [
        { t: 'h', text: 'Do' },
        { t: 'list', items: ['Show the bag and the café’s name', 'Mention the online store once per Reel', 'Keep Plate’s own voice'] },
      ], right: [
        { t: 'h', text: 'Don’t' },
        { t: 'list', items: ['Make health claims', 'Compare with named brands', 'Script the creator word for word'] },
      ] },
      { t: 'h', text: 'Approvals and payment' },
      { t: 'list', items: ['Drafts reach the brand 3 days before posting; replies within 48 hours.', 'One round of changes is included.', 'Half on signing, half within 15 days of the last post.'] },
    ],
  },
  {
    id: 'deliverables-tracker',
    service: 'creators',
    title: 'Deliverables tracker',
    summary: 'Every deliverable, its dates and where it stands, in one table the brand and the creator both see.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Campaign', 'First sip'], ['Updated', '17 January'], ['Done', '3 of 10 pieces'], ['Next date', 'Reel 2 goes live 19 Jan']] },
      { t: 'table', status: 4, head: ['Deliverable', 'Draft sent', 'Brand reply', 'Live', 'Status'], rows: [
        ['Café Reel 1', '9 Jan', 'Approved 10 Jan', '12 Jan', 'Live'],
        ['Stories 1–2', '9 Jan', 'Approved 10 Jan', '12 Jan', 'Live'],
        ['Café Reel 2', '16 Jan', 'Changes asked 17 Jan', '19 Jan', 'In changes'],
        ['Stories 3–4', '16 Jan', 'Approved 17 Jan', '19 Jan', 'Scheduled'],
        ['Café Reel 3', 'Due 23 Jan', 'n/a', '26 Jan', 'Not started'],
        ['Stories 5–6', 'Due 23 Jan', 'n/a', '26 Jan', 'Not started'],
        ['YouTube Short', 'Due 26 Jan', 'n/a', '28 Jan', 'Not started'],
        ['Invoice 1 (50%)', '5 Jan', 'n/a', 'n/a', 'Paid'],
        ['Invoice 2 (50%)', 'After last post', 'n/a', 'Due 12 Feb', 'Not due'],
      ] },
    ],
  },
  {
    id: 'campaign-results',
    service: 'creators',
    title: 'Campaign results note',
    summary: 'A short note after the campaign: what went live, what it did and what to try next.',
    basis: 'sample',
    blocks: [
      { t: 'stats', items: [['1.1M', 'Reel views'], ['4,800', 'store visits from links'], ['312', 'orders with code PLATE10'], ['10 of 10', 'pieces on time']] },
      { t: 'split', left: [
        { t: 'h', text: 'What worked' },
        { t: 'list', items: ['Café owners re-shared all three Reels to their own followers.', 'The home-brew Reel drove more orders than the café visits.', 'A discount code made sales countable, not just clicks.'] },
      ], right: [
        { t: 'h', text: 'Try next time' },
        { t: 'list', items: ['Keep the code live for two weeks after the last post.', 'Start with the home-brew Reel.', 'Ask viewers to share their own first sip.'] },
      ] },
    ],
  },

  /* ================= Content and video ================= */
  {
    id: 'reel-script',
    service: 'content',
    title: 'Reel script',
    summary: 'A 30-second script showing what is on screen and what is said, line by line.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Brand', 'Halli Roasters'], ['Topic', 'Café filter coffee at home'], ['Length', '30 seconds'], ['Format', 'Reel and Short']] },
      { t: 'script', rows: [
        ['0:00', 'Close-up: decoction dripping', 'Café-style filter coffee at home. Three steps.'],
        ['0:03', 'Two spoons of coffee into the filter', 'One: two spoons of medium-fine coffee, packed lightly.'],
        ['0:10', 'Hot water poured, lid on', 'Two: hot water, not boiling. Lid on. Wait fifteen minutes.'],
        ['0:18', 'Milk poured between two tumblers', 'Three: hot milk, sugar if you like, and pour it high.'],
        ['0:25', 'Finished tumbler, bag in frame', 'Beans from Halli Roasters. Link in bio.'],
      ] },
    ],
  },
  {
    id: 'hook-bank',
    service: 'content',
    title: 'Hook bank',
    summary: 'Ten opening lines for Reels and Shorts across five niches, written to stop the scroll in two seconds.',
    basis: 'sample',
    blocks: [
      { t: 'cards', cols: 2, items: [
        { title: 'Food', text: '“I tried every filter coffee on this street.”\n“This ₹40 dosa beats the ₹400 one.”' },
        { title: 'Fashion', text: '“Three ways to wear one white shirt.”\n“Stop buying basics like this.”' },
        { title: 'Tech', text: '“One phone setting that saves an hour a day.”\n“I used only free apps for a week.”' },
        { title: 'Small business', text: '“Our first 100 customers came without ads.”\n“The cheapest marketing a café can do.”' },
        { title: 'Gaming', text: '“Stop looting first. Seriously.”\n“Can I win a match with only a pistol?”' },
      ] },
      { t: 'note', text: 'A good hook makes a promise the next five seconds keep.' },
    ],
  },
  {
    id: 'posting-plan',
    service: 'content',
    title: 'Two-week posting plan',
    summary: 'Two weeks of posts around a clothing drop: what goes out, where and when.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Brand', 'Neel Studio'], ['Moment', 'Indigo drop, Saturday'], ['Channels', 'Instagram and WhatsApp'], ['Posting time', '7 pm']] },
      { t: 'calendar', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], weeks: [
        { label: 'Week 1', days: [
          ['Reel', 'One shirt, three ways'], ['Story', 'Poll: indigo or black'], ['Carousel', 'Behind the dye'], ['Reel', 'Customer try-on'], ['Story', 'Drop countdown'], ['Live', 'Drop goes live, 7 pm'], ['Rest', 'No posts'],
        ] },
        { label: 'Week 2', days: [
          ['Reel', 'Unboxing'], ['Carousel', 'How to wash indigo'], ['Story', 'Questions'], ['Reel', 'Creator collab'], ['Post', 'Restock note'], ['Reel', 'Week recap'], ['Rest', 'No posts'],
        ] },
      ] },
    ],
  },
  {
    id: 'subtitles',
    service: 'content',
    title: 'Subtitles',
    summary: 'A subtitle file for the coffee Reel, timed line by line, and how the words sit on screen.',
    basis: 'sample',
    blocks: [
      { t: 'split', left: [
        { t: 'srt', cues: [
          ['1', '00:00:00,000', '00:00:02,800', 'Café-style filter coffee at home.'],
          ['2', '00:00:02,900', '00:00:04,000', 'Three steps.'],
          ['3', '00:00:04,100', '00:00:09,800', 'One: two spoons of medium-fine coffee,'],
          ['4', '00:00:09,900', '00:00:12,000', 'packed lightly.'],
          ['5', '00:00:12,100', '00:00:17,800', 'Two: hot water, not boiling.'],
        ] },
      ], right: [
        { t: 'phone', caption: 'Two: hot water, not boiling.', label: 'Lower third, two lines at most, about 32 characters a line' },
      ] },
    ],
  },

  /* ================= Marketing and growth ================= */
  {
    id: 'campaign-plan',
    service: 'marketing',
    title: 'Festive campaign plan',
    summary: 'A four-week plan for a coffee brand’s gift boxes: the goal, the channels, the money and the timeline on one page.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Brand', 'Halli Roasters'], ['Goal', '400 gift boxes sold online'], ['Length', 'Four weeks'], ['Budget', '₹1.2 lakh']] },
      { t: 'split', left: [
        { t: 'h', text: 'Where the money goes' },
        { t: 'bars', unit: '%', items: [['Creators', 40], ['Instagram ads', 30], ['Gift box printing', 20], ['Giveaway', 10]] },
      ], right: [
        { t: 'h', text: 'Channels' },
        { t: 'list', items: ['Reels three times a week', 'Two local food creators', 'WhatsApp message to past customers', 'QR card on every café counter'] },
      ] },
      { t: 'h', text: 'Timeline' },
      { t: 'steps', items: ['Week 1: tease the box with close-ups, no price yet.', 'Week 2: launch with price, link and a two-day early-bird offer.', 'Week 3: creator posts go live; giveaway runs.', 'Week 4: last-order date in every post and message.'] },
      { t: 'p', small: true, text: 'Measured by orders on the gift page and how many come from the creators’ codes.' },
    ],
  },
  {
    id: 'social-audit',
    service: 'marketing',
    title: 'Social media audit',
    summary: 'A quick scorecard of a brand’s Instagram, with the fixes that matter most this month.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Brand', 'Tiffin Lab'], ['Channel', 'Instagram'], ['Period', 'Last 90 days'], ['Overall', '3 out of 5']] },
      { t: 'table', score: 1, head: ['Area', 'Score', 'What I found', 'Quick fix'], rows: [
        ['Profile and bio', 4, 'Clear, but no link to order.', 'Add the WhatsApp order link.'],
        ['Posting rhythm', 2, 'Six posts in three weeks, then silence.', 'Three a week, same days.'],
        ['Content mix', 3, 'All food photos, no people.', 'Show the kitchen and the riders.'],
        ['Calls to action', 2, 'Captions rarely say what to do.', 'End every post with one ask.'],
        ['Replies', 4, 'DMs answered the same day.', 'Keep it up; save answers as quick replies.'],
        ['Reels', 2, 'Two Reels, both landscape.', 'Shoot vertical, under 30 seconds.'],
      ] },
      { t: 'h', text: 'Top three fixes this month' },
      { t: 'steps', items: ['Add the order link to the bio.', 'Post three times a week on fixed days.', 'One vertical Reel a week from the kitchen.'] },
    ],
  },
  {
    id: 'customer-journey',
    service: 'marketing',
    title: 'Customer journey map',
    summary: 'How a shopper finds a clothing label, decides, buys and comes back, and what to change at each step.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Brand', 'Neel Studio'], ['Shopper', '22–30, buys online'], ['Average order', '₹1,800'], ['Repeat rate', '18%']] },
      { t: 'table', head: ['', 'Discover', 'Consider', 'Buy', 'After'], rows: [
        ['What they do', 'See a Reel or a friend’s post', 'Check the profile and reviews', 'Order on the website', 'Wear it, wash it, post it'],
        ['What they think', '“That indigo looks good.”', '“Will it fit me?”', '“Is delivery free?”', '“Will the colour last?”'],
        ['Where we meet them', 'Reels, creators', 'Highlights, size guide', 'Product page, checkout', 'Box insert, WhatsApp'],
        ['What we change', 'More try-on Reels', 'Pin a fit guide', 'Show delivery cost early', 'Send the care guide'],
      ] },
    ],
  },
  {
    id: 'monthly-report',
    service: 'marketing',
    title: 'Monthly report',
    summary: 'One page a month in plain English: the numbers, what changed and what we do next.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Brand', 'Tiffin Lab'], ['Month', 'October'], ['Compared with', 'September'], ['Overall', 'Up']] },
      { t: 'stats', items: [['1,240', 'orders, up 18%'], ['96K', 'Instagram reach'], ['38%', 'repeat customers'], ['₹62', 'marketing cost per order']] },
      { t: 'split', left: [
        { t: 'h', text: 'Orders by channel' },
        { t: 'bars', unit: '%', items: [['Swiggy', 46], ['Zomato', 31], ['WhatsApp direct', 23]] },
      ], right: [
        { t: 'h', text: 'What changed' },
        { t: 'list', items: ['Kitchen Reels doubled reach.', 'WhatsApp orders grew after the bio link.', 'Weekend lunch sold out twice.'] },
      ] },
      { t: 'h', text: 'Next month' },
      { t: 'steps', items: ['Move more regulars to WhatsApp ordering, which has no commission.', 'Add a second weekend lunch slot.', 'Test one paid Reel at ₹5,000.'] },
    ],
  },

  /* ================= Research and reports ================= */
  {
    id: 'six-pillar-model',
    service: 'research',
    title: 'Six-pillar model',
    summary: 'My model for why esports organisations last, or don’t: six pillars, what each one does and the risk when it is missing.',
    basis: 'real',
    source: ORGS,
    blocks: [
      { t: 'cards', cols: 3, items: [
        { title: 'Revenue diversification', text: 'Financial stability', meta: 'If missing: revenue dependency' },
        { title: 'Competitive portfolio', text: 'Risk distribution', meta: 'If missing: title dependence' },
        { title: 'Brand and content systems', text: 'Engagement continuity', meta: 'If missing: loss of audience' },
        { title: 'Community identity', text: 'Loyalty', meta: 'If missing: weak support base' },
        { title: 'Governance and internal control', text: 'Structure', meta: 'If missing: instability' },
        { title: 'Talent development and wellbeing', text: 'Performance', meta: 'If missing: inconsistency' },
      ] },
      { t: 'note', text: 'Organisations should put structural stability before expansion, especially in emerging ecosystems such as India.' },
    ],
  },
  {
    id: 'dissertation-at-a-glance',
    service: 'research',
    title: 'Dissertation at a glance',
    summary: 'My MA dissertation on one page: the question, the method, the census and the themes.',
    basis: 'real',
    source: PATHWAYS,
    blocks: [
      { t: 'quote', text: 'In what ways do formal esports education materials construct employability in relation to the structural conditions of the esports occupational ecosystem?' },
      { t: 'stats', items: [['22', 'undergraduate programmes'], ['15', 'providers'], ['12,000', 'words'], ['5', 'analytical themes']] },
      { t: 'split', left: [
        { t: 'h', text: 'Method' },
        { t: 'p', text: 'Qualitative interpretive document analysis with reflexive thematic analysis of formal esports education materials. Census recorded as at 22 August 2026.' },
      ], right: [
        { t: 'h', text: 'Themes' },
        { t: 'list', items: ['Professional identities', 'Evidence of capability', 'Career agency', 'Structural literacy', 'Occupational portability'] },
      ] },
    ],
  },
  {
    id: 'operating-model',
    service: 'research',
    title: 'Operating model for a new organisation',
    summary: 'A proposed structure for a new Indian esports organisation, designed to avoid the usual failure points.',
    basis: 'real',
    source: INDIA,
    blocks: [
      { t: 'cards', cols: 2, items: [
        { title: 'Coaching and VOD analysis', text: 'A formal performance function, not an afterthought.' },
        { title: 'Roles and workflows', text: 'Clear role allocation, communication and internal workflows.' },
        { title: 'Competition and content', text: 'Competitive and content divisions that work together.' },
        { title: 'Wellbeing and revenue', text: 'Player wellbeing designed in, with diversified revenue and resources.' },
      ] },
      { t: 'h', text: 'Four principles' },
      { t: 'steps', items: ['Formal coaching and analytics', 'Player wellbeing as a built-in function', 'Coordinated competition and content divisions', 'Diversified roles and revenue'] },
      { t: 'p', small: true, text: 'Reference points included S8UL and Global Esports, for what works and what tends to be missing.' },
    ],
  },
  {
    id: 'one-page-summary',
    service: 'research',
    title: 'One-page summary',
    summary: 'A full research project cut down to one page for people who won’t read the whole thing.',
    basis: 'real',
    source: ORGS,
    blocks: [
      { t: 'h', text: 'The question' },
      { t: 'p', text: 'Why do esports organisations struggle to last, even as the industry grows?' },
      { t: 'h', text: 'What I did' },
      { t: 'p', text: 'Document analysis, comparative case reading and a cross-sector comparison with traditional sports, with a focus on India.' },
      { t: 'h', text: 'What I found' },
      { t: 'list', items: [
        'Sponsorship-heavy models are unpredictable, which shortens planning horizons.',
        'Publisher control puts key competitive structures outside an organisation’s influence.',
        'Community identity helps stabilise long-term engagement.',
        'Emerging markets need adaptive strategies because of resource and infrastructure gaps.',
        'Weak governance limits efficiency and scale.',
      ] },
      { t: 'h', text: 'What it means' },
      { t: 'p', text: 'Short-term performance can exist without structural stability, but long-term sustainability cannot. The answer is system design, not just winning.' },
      { t: 'note', text: 'Limits: there is little public financial data in esports, so the study relies on pattern recognition and published research rather than financial modelling.' },
    ],
  },
  {
    id: 'competitor-snapshot',
    service: 'research',
    title: 'Competitor snapshot',
    summary: 'Where a small coffee brand stands against three rivals, and the gaps it can own.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Client', 'Halli Roasters'], ['Market', 'Specialty coffee, online'], ['Rivals', 'Three, unnamed here'], ['Checked', 'November']] },
      { t: 'table', head: ['', 'Halli Roasters', 'Rival A', 'Rival B', 'Rival C'], rows: [
        ['Price, 250 g', '₹520', '₹650', '₹480', '₹700'],
        ['Range', '6 coffees', '14 coffees', '4 coffees', '9 coffees'],
        ['Delivery', '3–5 days', '2–3 days', '5–7 days', '2–4 days'],
        ['Brew guides', 'None', 'Videos', 'None', 'Blog'],
        ['Gift boxes', 'No', 'Yes', 'No', 'Yes'],
      ] },
      { t: 'h', text: 'Gaps Halli can own' },
      { t: 'steps', items: ['Short brew-guide Reels: only one rival does video.', 'A mid-price gift box before the festive season.', 'Faster delivery in Bengaluru, where the roastery is.'] },
    ],
  },

  /* ================= Business support and AI workflows ================= */
  {
    id: 'onboarding-checklist',
    service: 'business',
    title: 'Client onboarding checklist',
    summary: 'Everything that happens between a client saying yes and the first piece of work, so nothing slips.',
    basis: 'sample',
    blocks: [
      { t: 'split', left: [
        { t: 'h', text: 'Before the kick-off' },
        { t: 'checks', done: [0, 1, 2], items: ['Signed agreement and first invoice sent', 'Shared folder created', 'Kick-off call booked', 'Brand files, logins and past work requested'] },
        { t: 'h', text: 'Kick-off call' },
        { t: 'checks', items: ['Agree the goal in one sentence', 'Name one decision-maker on each side', 'Set check-in days and the reply time', 'Confirm the first deadline'] },
      ], right: [
        { t: 'h', text: 'First week' },
        { t: 'checks', items: ['Send the plan and timeline in writing', 'Set up the shared tracker', 'Deliver one small win early'] },
        { t: 'h', text: 'Every Friday' },
        { t: 'checks', items: ['Send the status update', 'Log hours and costs', 'Flag anything late before it is late'] },
      ] },
    ],
  },
  {
    id: 'launch-project-plan',
    service: 'business',
    title: 'Six-week project plan',
    summary: 'A website launch from first draft to live, with an owner for every piece.',
    basis: 'sample',
    blocks: [
      { t: 'facts', items: [['Client', 'Kitepoint'], ['Project', 'New website'], ['Length', 'Six weeks'], ['Launch', 'Week 6']] },
      { t: 'gantt', weeks: 6, rows: [
        ['Copy and page plan', 1, 2, 'Copy'],
        ['Design', 2, 3, 'Design'],
        ['Build', 3, 5, 'Build'],
        ['Booking form and emails', 4, 5, 'Build'],
        ['Testing on phones', 5, 5, 'Everyone'],
        ['Fixes', 5, 6, 'Build'],
        ['Launch', 6, 6, 'Everyone'],
        ['First-week report', 6, 6, 'Lead'],
      ] },
      { t: 'p', small: true, text: 'Owners are roles, so the plan still works when people change.' },
    ],
  },
  {
    id: 'weekly-status-update',
    service: 'business',
    title: 'Weekly status update',
    summary: 'A five-minute read every Friday: where things stand, what is next and what needs a decision.',
    basis: 'sample',
    blocks: [
      { t: 'facts', status: 2, items: [['Project', 'Kitepoint website'], ['Week', '4 of 6'], ['Overall', 'On track'], ['Sent', 'Friday 20 November']] },
      { t: 'split', left: [
        { t: 'h', text: 'Done this week' },
        { t: 'list', items: ['Home and pricing pages built', 'Booking form connected to the calendar', 'Copy signed off'] },
      ], right: [
        { t: 'h', text: 'Next week' },
        { t: 'list', items: ['Test on six phones', 'Write the confirmation emails', 'Set up the domain'] },
      ] },
      { t: 'h', text: 'Risks' },
      { t: 'table', status: 1, head: ['Risk', 'Level', 'What we’re doing', 'Owner'], rows: [
        ['Salon photos not in yet', 'Watch', 'Using placeholders; photos due Tuesday', 'Client'],
        ['Domain login unknown', 'Low', 'Client resetting it with the registrar', 'Client'],
      ] },
      { t: 'h', text: 'Decision needed' },
      { t: 'p', text: 'Launch on Monday 30 November, or wait a week for the photos?' },
    ],
  },
  {
    id: 'order-process-map',
    service: 'business',
    title: 'Process map',
    summary: 'How an order moves from the app to the customer’s door, and who owns each step.',
    basis: 'sample',
    blocks: [
      { t: 'flow', steps: [
        ['Order', 'App or WhatsApp', 'Customer'],
        ['Confirm', 'Auto message', 'System'],
        ['Cook', 'Ticket on screen', 'Kitchen'],
        ['Pack', 'Label and seal', 'Packer'],
        ['Dispatch', 'Rider pick-up', 'Packer'],
        ['Follow up', 'Message next day', 'Owner'],
      ] },
      { t: 'h', text: 'When something goes wrong' },
      { t: 'table', head: ['Problem', 'What happens', 'Who decides'], rows: [
        ['Rider is late', 'Message the customer with a new time', 'Packer'],
        ['Wrong item sent', 'Replace it or refund it, same day', 'Owner'],
        ['Bad review', 'Reply within a day; fix the cause', 'Owner'],
      ] },
    ],
  },
  {
    id: 'ai-enquiry-workflow',
    service: 'business',
    title: 'AI-assisted enquiry replies',
    summary: 'A workflow where AI drafts the first reply and a person always checks it before anything is sent.',
    basis: 'sample',
    blocks: [
      { t: 'flow', steps: [
        ['Enquiry arrives', 'Email or form', 'Customer'],
        ['Sorted', 'By topic', 'Rules'],
        ['Draft reply', 'From the FAQ', 'AI'],
        ['Checked', 'Edited if needed', 'Person'],
        ['Sent', 'Same inbox', 'Person'],
        ['Logged', 'Tracker', 'System'],
      ] },
      { t: 'h', text: 'House rules' },
      { t: 'list', items: ['Nothing is sent until a person has read it.', 'Prices and dates come from the price sheet, never from the draft.', 'Complaints and anything sensitive skip the draft step.'] },
      { t: 'stats', items: [['2 hours', 'typical reply time, down from a day'], ['100%', 'of replies checked by a person']] },
    ],
  },
];

const after = (list, id, item) => {
  const i = list.findIndex((s) => s.id === id);
  return [...list.slice(0, i + 1), item, ...list.slice(i + 1)];
};

const withCovers = docs.map((d) => (covers[d.id] ? { ...d, blocks: [{ t: 'art', kind: 'cover', props: covers[d.id] }, ...d.blocks] } : d));

export const samples = [
  ...after(after(withCovers, 'reel-script', storyboardSample), 'monthly-report', leadMagnetSample),
  ...visualSamples,
];

export const samplesFor = (serviceId) => samples.filter((s) => s.service === serviceId);
export const sampleById = (id) => samples.find((s) => s.id === id);

/* The honest one-liner shown under every sample. */
export const basisLine = (s) => {
  if (s.basis === 'real') return `From real work: ${s.source.label}.`;
  if (s.basis === 'mixed') return `Format from my ${s.source.label}. Names, dates and figures are invented.`;
  return 'Sample made to show the work. Brands, names and figures are invented.';
};
