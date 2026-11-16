import React from 'react';
import { Good, Mark, MarkG } from './illo';

/* Brand and design samples: identity board, poster, social posts, deck and menu. Colours come from each invented client. */

export function Identity({ lockup, mark, tagline, colors, fonts, card }) {
  const [c0, c1, c2] = colors;
  return (
    <div className="art art-identity">
      <div className="ai-hero" style={{ background: c0[1], color: c0[2] }}>
        <div className="ai-lockup">
          <Mark kind={mark} fill={c0[2]} bg={c0[1]} size={84} />
          <p className="ai-word"><span>{lockup[0]}</span><span>{lockup[1]}</span></p>
        </div>
        <p className="ai-tag">{tagline}</p>
      </div>
      <div className="ai-row">
        <ul className="ai-palette">
          {colors.map(([name, hex, ink]) => (
            <li key={name} style={{ background: hex, color: ink }}>
              <span>{name}</span>
              <span className="ai-hex">{hex.toUpperCase()}</span>
            </li>
          ))}
        </ul>
        <div className="ai-type">
          {fonts.map(([role, name, family]) => (
            <div key={role}>
              <span className="ai-aa" style={{ fontFamily: `var(--${family})`, fontWeight: family === 'sans' ? 600 : 400 }}>Aa</span>
              <span className="ai-font">{name}</span>
              <span className="ai-role">{role}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ai-apps">
        <div className="ai-card" style={{ background: c1[1], color: c1[2] }}>
          <Mark kind={mark} fill={c1[2]} bg={c1[1]} size={34} />
          <p className="ai-card-word">{lockup.join(' ')}</p>
        </div>
        <div className="ai-card ai-card-back" style={{ background: c2[1], color: c2[2] }}>
          <p className="ai-card-name">{card.title}</p>
          <p>{card.line}</p>
          <p>{card.handle}</p>
        </div>
        <Good kind="mug" color={c2[1]} trim={c0[1]} label="Mug">
          <MarkG kind={mark} fill={c0[1]} bg={c2[1]} x={62} y={66} s={0.85} />
        </Good>
        <div className="ai-sticker" style={{ background: c0[1] }}>
          <Mark kind={mark} fill={c1[1]} bg={c0[1]} size={52} />
        </div>
      </div>
    </div>
  );
}

const Motif = ({ kind, accent, ink }) => {
  if (kind === 'sun') {
    return (
      <svg viewBox="0 0 300 200" className="ap-motif" aria-hidden="true">
        <circle cx="210" cy="120" r="70" fill={accent} />
        {[128, 142, 156, 170, 184].map((y, i) => (
          <path key={y} d={`M0 ${y} Q37 ${y - 8} 75 ${y} T150 ${y} T225 ${y} T300 ${y}`} stroke={ink} strokeWidth={2.2 - i * 0.25} fill="none" opacity={0.85 - i * 0.12} />
        ))}
      </svg>
    );
  }
  return null;
};

export function Poster({ bg, ink, accent, kicker, title, line, details, footer, motif }) {
  return (
    <div className="art art-poster" style={{ background: bg, color: ink }}>
      <Motif kind={motif} accent={accent} ink={ink} />
      <p className="ap-kicker" style={{ color: accent }}>{kicker}</p>
      <p className="ap-title">{title.map((t) => <span key={t}>{t}</span>)}</p>
      <p className="ap-line">{line}</p>
      <dl className="ap-details">
        {details.map(([k, v]) => <div key={k}><dt style={{ color: accent }}>{k}</dt><dd>{v}</dd></div>)}
      </dl>
      <p className="ap-foot">{footer}</p>
    </div>
  );
}

export function Social({ handle, mark, colors, posts }) {
  return (
    <div className="art art-social">
      {posts.map((p) => (
        <figure key={p.title} className="as-post">
          <div className="as-head">
            <span className="as-avatar" style={{ background: colors.main }}><Mark kind={mark} fill={colors.light} bg={colors.main} size={18} /></span>
            <span>{handle}</span>
          </div>
          <div className="as-img" style={{ background: p.bg, color: p.ink }}>
            {p.kind === 'drop' && (
              <>
                <p className="as-small">{p.top}</p>
                <p className="as-big">{p.title}</p>
                <p className="as-small">{p.small}</p>
                <div className="as-stripes">{p.shades.map((c) => <span key={c} style={{ background: c }} />)}</div>
              </>
            )}
            {p.kind === 'dye' && (
              <>
                <p className="as-big as-big-sm">{p.title}</p>
                <ul className="as-dips">
                  {p.shades.map((c, i) => (
                    <li key={c}><span style={{ background: c }} />{p.labels[i]}</li>
                  ))}
                </ul>
              </>
            )}
            {p.kind === 'ways' && (
              <>
                <p className="as-big as-big-sm">{p.title}</p>
                <ol className="as-ways">{p.items.map((x) => <li key={x}>{x}</li>)}</ol>
                <p className="as-small">{p.small}</p>
              </>
            )}
          </div>
          <figcaption className="as-cap"><strong>{handle}</strong> {p.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Deck({ name, mark, theme, slides }) {
  return (
    <div className="art art-deck">
      {slides.map((s, i) => (
        <div key={s.title} className={`ad-slide ad-k-${s.kind}`} style={{ background: s.kind === 'cover' ? theme.main : theme.bg, color: s.kind === 'cover' ? theme.mainInk : theme.ink }}>
          {s.kind === 'cover' && (
            <>
              <div className="ad-brand"><Mark kind={mark} fill={theme.accent} bg={theme.main} size={44} /><span>{name}</span></div>
              <p className="ad-cover-title">{s.title}</p>
              <p className="ad-sub">{s.sub}</p>
            </>
          )}
          {s.kind === 'statement' && (
            <>
              <p className="ad-label" style={{ color: theme.main }}>{s.label}</p>
              <p className="ad-statement">{s.title}</p>
              <p className="ad-sub">{s.sub}</p>
            </>
          )}
          {s.kind === 'steps' && (
            <>
              <p className="ad-label" style={{ color: theme.main }}>{s.label}</p>
              <p className="ad-h">{s.title}</p>
              <ol className="ad-steps">
                {s.items.map((x, n) => <li key={x}><span style={{ background: theme.accent, color: theme.ink }}>{n + 1}</span>{x}</li>)}
              </ol>
            </>
          )}
          {s.kind === 'numbers' && (
            <>
              <p className="ad-label" style={{ color: theme.main }}>{s.label}</p>
              <p className="ad-h">{s.title}</p>
              <div className="ad-numbers">
                {s.items.map(([v, l]) => <div key={l}><span style={{ color: theme.main }}>{v}</span>{l}</div>)}
              </div>
            </>
          )}
          <span className="ad-page">{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

export function Menu({ name, sub, mark, colors, sections, footer }) {
  return (
    <div className="art art-menu" style={{ background: colors.bg, color: colors.ink }}>
      <div className="am-head">
        <Mark kind={mark} fill={colors.main} size={56} />
        <div>
          <p className="am-name">{name}</p>
          <p className="am-sub">{sub}</p>
        </div>
      </div>
      <div className="am-sections">
        {sections.map((s) => (
          <section key={s.title}>
            <h4 style={{ color: colors.main }}>{s.title}</h4>
            <ul>
              {s.items.map(([item, desc, price]) => (
                <li key={item}>
                  <span className="am-item">{item}</span>
                  <span className="am-dots" style={{ borderColor: colors.ink }} />
                  <span className="am-price">{price}</span>
                  {desc && <span className="am-desc">{desc}</span>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="am-foot" style={{ background: colors.main, color: colors.mainInk }}>{footer}</p>
    </div>
  );
}
