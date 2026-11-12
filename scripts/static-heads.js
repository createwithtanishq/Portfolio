/*
  After the build, writes a small static HTML file for every route with that page's own title, description,
  share image and canonical link, plus sitemap.xml and robots.txt. Link previews (WhatsApp, LinkedIn, X) don't
  run JavaScript, so without this every shared link would show the home page's card. The app itself still boots
  from the same bundle on every page.
*/
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';

export const SITE = 'https://tanishqaryan.netlify.app';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function headFor(html, { url, title, description, image, imageAlt, jsonld }) {
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  if (image) {
    out = out
      .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`)
      .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`)
      .replace(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${esc(imageAlt ?? title)}$2`);
  }
  if (jsonld) out = out.replace('</head>', `    <script type="application/ld+json">${JSON.stringify(jsonld)}</script>\n  </head>`);
  return out;
}

export default function staticHeads() {
  let outDir;
  return {
    name: 'static-heads',
    apply: 'build',
    configResolved(c) { outDir = path.resolve(c.root, c.build.outDir); },
    async closeBundle() {
      const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error', configFile: false });
      try {
        const { services } = await vite.ssrLoadModule('/src/data/services.js');
        const { samples } = await vite.ssrLoadModule('/src/data/samples.js');
        const { WORK } = await vite.ssrLoadModule('/src/data/work.js');
        const html = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
        const pages = [];

        pages.push({
          route: '/services', title: 'Services and samples · Tanishq Aryan',
          description: `Ten services for any industry, from brand and packaging to events, creator campaigns and AI workflows, with five hand-made samples each.`,
          image: `${SITE}/og/services.jpg`,
          jsonld: {
            '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Tanishq Aryan', url: `${SITE}/services`,
            areaServed: ['IN', 'Worldwide'], founder: { '@type': 'Person', name: 'Tanishq Aryan' },
            hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Services', itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.line } })) },
          },
        });
        for (const s of samples) {
          const svc = services.find((x) => x.id === s.service);
          pages.push({
            route: `/services/samples/${s.id}`,
            title: `${s.title} · ${s.basis === 'real' ? 'From real work' : 'Sample'} · Tanishq Aryan`,
            description: `${s.summary} ${svc ? `Part of ${svc.title.toLowerCase()}.` : ''}`.trim(),
            image: fs.existsSync(path.join(outDir, 'og', 'samples', `${s.id}.jpg`)) ? `${SITE}/og/samples/${s.id}.jpg` : undefined,
            imageAlt: `${s.title}, a work sample by Tanishq Aryan`,
          });
        }
        for (const w of WORK) {
          pages.push({ route: `/project/${w.id}`, title: `${w.title} · Tanishq Aryan`, description: `Case study: ${w.meta?.kind ? `${w.meta.kind}. ` : ''}${w.title}.` });
        }
        pages.push({ route: '/resume', title: 'Résumé · Tanishq Aryan', description: 'Esports and creator operations: tournaments, live events and brand campaigns. MA Games Design, Merit.' });

        for (const p of pages) {
          const dir = path.join(outDir, p.route);
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, 'index.html'), headFor(html, { ...p, url: `${SITE}${p.route}` }));
        }

        const urls = ['/', ...pages.map((p) => p.route)];
        fs.writeFileSync(path.join(outDir, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
        fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
      } finally {
        await vite.close();
      }
    },
  };
}
