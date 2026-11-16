/*
  Covers for the document samples: each opens with a designed panel in its client's colours.
  Real-work samples use my own colours and only the case study's facts.
*/

const T = {
  me: { bg: '#0d0c0b', ink: '#ece7df', accent: '#c8a46a', soft: '#1f1d1a', pattern: 'dots' },
  meetup: { bg: '#0B2545', ink: '#F3EFE7', accent: '#FF7A3D', soft: '#17375E', pattern: 'waves' },
  plate: { bg: '#D64933', ink: '#FFF5EE', accent: '#F2B33D', soft: '#E06A55', pattern: 'bloom' },
  halli: { bg: '#1E3A2F', ink: '#EEF0EA', accent: '#E3B65B', soft: '#2A4C3E', pattern: 'dots' },
  neel: { bg: '#24346E', ink: '#F2F0EA', accent: '#F05A28', soft: '#3E5196', pattern: 'waves' },
  kite: { bg: '#0F766E', ink: '#F4FBF9', accent: '#FACC15', soft: '#168579', pattern: 'chevron' },
  tiffin: { bg: '#2F6B3A', ink: '#FFF8E7', accent: '#FBE7A1', soft: '#3C7D47', pattern: 'bloom' },
};

const C = (theme, mark, client, kind, title, motif, extra = {}) => ({ theme: T[theme], mark, client, kind, title, motif, ...extra });

export const covers = {
  'tournament-ruleset': C('me', null, 'Tekken 8 tournament system', 'Ruleset', 'How the day runs', 'checks', { line: 'Double elimination. Best of 3, finals best of 5.', data: { done: 2 } }),
  'tournament-bracket': C('me', null, 'Tekken 8 Campus Open', 'Top 8 bracket', 'Nobody is out after one loss', 'bracket'),
  'meetup-registration': C('meetup', 'star', 'Vizag Founders Meetup', 'Registration', 'Save your seat', 'checks', { line: 'Friday 4 December, The Deck, Beach Road.' }),
  'meetup-run-of-show': C('meetup', 'star', 'Vizag Founders Meetup', 'Run of show', 'Minute by minute', 'clock'),
  'meetup-wrap-up': C('meetup', 'star', 'Vizag Founders Meetup', 'Wrap-up', 'What the night did', 'bars'),

  'creator-media-kit': C('plate', 'plate', 'Plate Postcard', 'Media kit', 'Street food, honestly', 'figure', { data: { value: '86K', label: 'Instagram followers' } }),
  'brand-pitch-email': C('plate', 'plate', 'Plate Postcard', 'Pitch email', 'One idea, one easy yes', 'chat'),
  'campaign-brief': C('plate', 'plate', 'Halli Roasters with Plate Postcard', 'Campaign brief', 'First sip', 'frames', { line: '7 to 28 January.' }),
  'deliverables-tracker': C('plate', 'plate', 'First sip campaign', 'Deliverables tracker', 'Three of ten done', 'checks', { data: { done: 2 } }),
  'campaign-results': C('plate', 'plate', 'First sip campaign', 'Results', 'How First sip did', 'bars'),

  'reel-script': C('halli', 'bean', 'Halli Roasters', 'Reel script', 'Café filter coffee at home', 'frames', { line: '30 seconds, for Reels and Shorts.' }),
  'hook-bank': C('me', null, 'Five niches', 'Hook bank', 'Two seconds to stop the scroll', 'chat'),
  'posting-plan': C('neel', 'drop', 'Neel Studio', 'Posting plan', 'The indigo drop', 'timeline', { line: 'Two weeks on Instagram and WhatsApp.', data: { hi: 4 } }),
  'subtitles': C('halli', 'bean', 'Halli Roasters', 'Subtitles', 'Every word on screen', 'subtitle', { data: { line: 'Three steps.' } }),

  'campaign-plan': C('halli', 'bean', 'Halli Roasters', 'Campaign plan', 'Festive gift boxes', 'timeline', { line: 'Four weeks to 400 boxes.' }),
  'social-audit': C('tiffin', 'tiffin', 'Tiffin Lab', 'Social audit', 'Three out of five', 'bars', { line: 'Instagram, the last 90 days.', data: { values: [62, 40, 55, 30, 48, 60] } }),
  'customer-journey': C('neel', 'drop', 'Neel Studio', 'Customer journey', 'From scroll to second order', 'flow', { data: { hi: 4 } }),
  'monthly-report': C('tiffin', 'tiffin', 'Tiffin Lab', 'Monthly report', 'October', 'bars', { line: 'Compared with September.' }),

  'six-pillar-model': C('me', null, 'Esports organisation research', 'Model', 'Six pillars', 'pillars'),
  'dissertation-at-a-glance': C('me', null, 'MA Games Design dissertation', 'At a glance', 'Esports education and work', 'flow'),
  'operating-model': C('me', null, 'Indian esports research', 'Operating model', 'Structure before expansion', 'pillars'),
  'one-page-summary': C('me', null, 'Esports organisation research', 'One-page summary', 'Why organisations last', 'bars'),
  'competitor-snapshot': C('halli', 'bean', 'Halli Roasters', 'Competitor snapshot', 'Where Halli stands', 'bars', { data: { values: [44, 70, 58, 86, 52, 64] } }),

  'onboarding-checklist': C('kite', 'kite', 'Kitepoint', 'Onboarding checklist', 'From yes to first work', 'checks'),
  'launch-project-plan': C('kite', 'kite', 'Kitepoint', 'Project plan', 'A new website in six weeks', 'timeline', { data: { hi: 5 } }),
  'weekly-status-update': C('kite', 'kite', 'Kitepoint website', 'Status update', 'Week 4 of 6, on track', 'timeline', { data: { hi: 3 } }),
  'order-process-map': C('tiffin', 'tiffin', 'Tiffin Lab', 'Process map', 'App to doorstep', 'flow', { data: { hi: 3 } }),
  'ai-enquiry-workflow': C('kite', 'kite', 'Kitepoint', 'Workflow', 'AI drafts, a person sends', 'chat'),
};
