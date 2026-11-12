import React from 'react';
import { Good, Mark, MarkG, Scene } from './illo';

/*
  Website mock-ups drawn as layouts inside a browser or phone frame. These show page design and copy,
  not working sites, and no product screens are faked: product imagery is drawn as illustration.
*/

function HeroArt({ art, t }) {
  if (!art) return null;
  if (art.kind === 'pouch') {
    return (
      <Good kind="pouch" color={t.main} trim={t.mainInk} label={art.label}>
        <rect x="52" y="96" width="116" height="130" rx="4" fill={t.bg} />
        <MarkG kind={art.mark} fill={t.main} bg={t.bg} x={90} y={108} s={0.62} />
        <text x="110" y="172" textAnchor="middle" fontFamily="var(--serif)" fontSize="17" fill={t.ink}>{art.name}</text>
        <text x="110" y="192" textAnchor="middle" fontFamily="var(--sans)" fontSize="9.5" fill={t.ink}>{art.note}</text>
        <text x="110" y="212" textAnchor="middle" fontFamily="var(--sans)" fontSize="9" fontWeight="600" fill={t.accent}>{art.weight}</text>
      </Good>
    );
  }
  if (art.kind === 'tee') {
    return (
      <Good kind="tee" color={art.color} trim="rgba(255,255,255,0.35)" label={art.label}>
        <text x="100" y="92" textAnchor="middle" fontFamily="var(--serif)" fontSize="15" fill={art.ink}>{art.print}</text>
      </Good>
    );
  }
  if (art.kind === 'mark') return <div className="aw-markart" style={{ background: t.panel }}><Mark kind={art.mark} fill={t.main} bg={t.panel} size={150} /></div>;
  if (art.kind === 'scene') return <div className="aw-markart" style={{ background: t.panel }}><Scene kind={art.scene} ink={t.ink} accent={t.accent} /></div>;
  return null;
}

function Section({ s, t }) {
  switch (s.kind) {
    case 'cards':
      return (
        <div className="aw-sec">
          {s.title && <p className="aw-h2" style={{ fontFamily: `var(--${t.display})` }}>{s.title}</p>}
          <div className="aw-cards" style={{ '--n': s.items.length }}>
            {s.items.map(([title, text, extra]) => (
              <div key={title} style={{ background: t.panel }}>
                <p className="aw-card-t">{title}</p>
                <p className="aw-card-x" style={{ color: t.muted }}>{text}</p>
                {extra && <p className="aw-card-p" style={{ color: t.main }}>{extra}</p>}
              </div>
            ))}
          </div>
        </div>
      );
    case 'band':
      return (
        <div className="aw-band" style={{ background: t.main, color: t.mainInk }}>
          <p style={{ fontFamily: `var(--${t.display})` }}>{s.text}</p>
          <span className="aw-btn" style={{ background: t.accent, color: t.ink }}>{s.cta}</span>
        </div>
      );
    case 'form':
      return (
        <div className="aw-sec aw-form" style={{ background: t.panel }}>
          <p className="aw-h2" style={{ fontFamily: `var(--${t.display})` }}>{s.title}</p>
          {s.fields.map((f) => <span key={f} className="aw-input" style={{ borderColor: t.muted, color: t.muted }}>{f}</span>)}
          <span className="aw-btn" style={{ background: t.main, color: t.mainInk }}>{s.button}</span>
        </div>
      );
    case 'details':
      return (
        <dl className="aw-details">
          {s.items.map(([k, v]) => <div key={k}><dt style={{ color: t.muted }}>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      );
    case 'links':
      return (
        <ul className="aw-links">
          {s.items.map((x, i) => (
            <li key={x} style={i === 0 ? { background: t.main, color: t.mainInk } : { background: t.panel }}>{x}</li>
          ))}
        </ul>
      );
    case 'grid':
      return (
        <div className="aw-grid">
          {s.items.map((sc, i) => (
            <span key={i} style={{ background: i % 2 ? t.panel : t.accent }}><Scene kind={sc} ink={t.ink} accent={t.main} /></span>
          ))}
        </div>
      );
    case 'product':
      return (
        <div className="aw-product">
          <div className="aw-product-img" style={{ background: t.panel }}>
            <HeroArt art={s.art} t={t} />
          </div>
          <div className="aw-product-info">
            <p className="aw-small" style={{ color: t.muted }}>{s.kicker}</p>
            <p className="aw-h1" style={{ fontFamily: `var(--${t.display})` }}>{s.title}</p>
            <p className="aw-price">{s.price}</p>
            <p className="aw-small" style={{ color: t.muted }}>{s.note}</p>
            <div className="aw-sizes">{s.sizes.map((z, i) => <span key={z} style={i === 2 ? { background: t.ink, color: t.bg } : { borderColor: t.muted }}>{z}</span>)}</div>
            <span className="aw-btn aw-btn-wide" style={{ background: t.main, color: t.mainInk }}>{s.cta}</span>
            <ul className="aw-points" style={{ color: t.muted }}>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function Site({ frame = 'desktop', url, theme: t, brand, nav, cta, hero, sections, footer }) {
  const page = (
    <div className="aw-page" style={{ background: t.bg, color: t.ink }}>
      <div className="aw-nav">
        <span className="aw-logo"><Mark kind={brand.mark} fill={t.main} bg={t.bg} size={frame === 'phone' ? 20 : 22} />{brand.name}</span>
        {frame === 'desktop' && nav && <span className="aw-navlinks">{nav.map((n) => <span key={n}>{n}</span>)}</span>}
        {cta && <span className="aw-btn aw-btn-sm" style={{ background: t.main, color: t.mainInk }}>{cta}</span>}
      </div>
      {hero && (
        <div className={`aw-hero ${hero.art ? '' : 'aw-hero-solo'}`}>
          <div>
            {hero.kicker && <p className="aw-small" style={{ color: t.main }}>{hero.kicker}</p>}
            <p className="aw-h1" style={{ fontFamily: `var(--${t.display})` }}>{hero.title}</p>
            <p className="aw-sub" style={{ color: t.muted }}>{hero.sub}</p>
            <div className="aw-ctas">
              <span className="aw-btn" style={{ background: t.main, color: t.mainInk }}>{hero.cta}</span>
              {hero.cta2 && <span className="aw-link" style={{ borderColor: t.ink }}>{hero.cta2}</span>}
            </div>
          </div>
          <HeroArt art={hero.art} t={t} />
        </div>
      )}
      {sections.map((s, i) => <Section key={i} s={s} t={t} />)}
      {footer && <p className="aw-foot" style={{ color: t.muted, borderColor: t.panel }}>{footer}</p>}
    </div>
  );

  if (frame === 'phone') {
    return (
      <div className="art art-web art-web-phone">
        <div className="aw-phone">
          <div className="aw-phone-bar"><span>{url}</span></div>
          {page}
        </div>
      </div>
    );
  }
  return (
    <div className="art art-web">
      <div className="aw-browser">
        <div className="aw-chrome"><span className="aw-dots"><i /><i /><i /></span><span className="aw-url">{url}</span></div>
        {page}
      </div>
    </div>
  );
}
