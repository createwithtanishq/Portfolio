/* Hand-drawn visual kits (identity boards, posters, merch, packaging, site mock-ups), keyed by block `kind`. */
import { Deck, Identity, Menu, Poster, Social } from './art/brand';
import { Site } from './art/web';
import { Merch } from './art/merch';
import { Dieline, Jar, Mailer, Pouch, Tags } from './art/pack';
import { LeadMagnet, Storyboard } from './art/story';
import { Cover } from './art/cover';

export const ART = {
  identity: Identity,
  poster: Poster,
  social: Social,
  deck: Deck,
  menu: Menu,
  site: Site,
  merch: Merch,
  pouch: Pouch,
  jar: Jar,
  dieline: Dieline,
  tags: Tags,
  mailer: Mailer,
  storyboard: Storyboard,
  lead: LeadMagnet,
  cover: Cover,
};
