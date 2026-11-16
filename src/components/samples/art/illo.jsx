import React from 'react';

/*
  Hand-drawn vector pieces shared by the visual samples: brand marks, garments, containers, small scenes.
  Every shape is written out by hand as SVG paths; nothing is generated.
*/

/* A brand mark as an SVG group, for placing inside other drawings (64×64 units, scaled by `s`). */
export function MarkG({ kind, fill, bg, x = 0, y = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><MarkShapes kind={kind} fill={fill} bg={bg} /></g>;
}

/* Brand marks, drawn in a 64×64 box. */
export function Mark({ kind, fill = 'currentColor', size = 48, bg }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" style={{ display: 'block', flex: 'none' }}>
      <MarkShapes kind={kind} fill={fill} bg={bg} />
    </svg>
  );
}

function MarkShapes({ kind, fill = 'currentColor', bg }) {
  const shapes = {
    bean: (
      <>
        <ellipse cx="32" cy="32" rx="18" ry="25" transform="rotate(28 32 32)" fill={fill} />
        <path d="M24 12 C38 22 26 42 40 52" stroke={bg ?? '#fff'} strokeWidth="3.2" fill="none" strokeLinecap="round" />
      </>
    ),
    kite: (
      <>
        <path d="M32 4 L52 26 L32 50 L12 26 Z" fill={fill} />
        <path d="M32 4 V50 M12 26 H52" stroke={bg ?? '#fff'} strokeWidth="2" />
        <path d="M32 50 C30 54 36 56 33 60" stroke={fill} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </>
    ),
    wave: (
      <>
        <circle cx="32" cy="32" r="28" fill={fill} />
        <path d="M10 34 Q17 27 24 34 T38 34 T52 34 M12 44 Q19 37 26 44 T40 44 T54 44" stroke={bg ?? '#fff'} strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    ),
    leaf: (
      <>
        <path d="M32 6 C52 18 54 44 32 58 C10 44 12 18 32 6 Z" fill={fill} />
        <path d="M32 14 V54 M32 30 L42 22 M32 40 L22 32" stroke={bg ?? '#fff'} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </>
    ),
    plate: (
      <>
        <circle cx="32" cy="32" r="27" fill={fill} />
        <circle cx="32" cy="32" r="17" fill="none" stroke={bg ?? '#fff'} strokeWidth="2.6" />
      </>
    ),
    tiffin: (
      <>
        <rect x="14" y="18" width="36" height="12" rx="3" fill={fill} />
        <rect x="14" y="32" width="36" height="12" rx="3" fill={fill} />
        <rect x="14" y="46" width="36" height="12" rx="3" fill={fill} />
        <path d="M22 18 V8 H42 V18" stroke={fill} strokeWidth="3" fill="none" />
      </>
    ),
    drop: (
      <path d="M32 6 C44 22 50 32 50 40 A18 18 0 0 1 14 40 C14 32 20 22 32 6 Z" fill={fill} />
    ),
    flower: (
      <>
        {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="32" cy="18" rx="8" ry="13" fill={fill} transform={`rotate(${a} 32 32)`} />)}
        <circle cx="32" cy="32" r="6" fill={bg ?? '#fff'} />
      </>
    ),
    star: (
      <path d="M32 4 L39 24 L60 24 L43 37 L49 58 L32 45 L15 58 L21 37 L4 24 L25 24 Z" fill={fill} />
    ),
  };
  return shapes[kind] ?? shapes.star;
}

/* Garments and goods, front view. `color` is the item, `trim` the details. Print artwork is passed as children (SVG). */
const GOODS = {
  tee: { vb: '0 0 200 220', body: 'M78 12 L40 24 L6 62 L26 84 L48 66 L48 210 Q100 214 152 210 L152 66 L174 84 L194 62 L160 24 L122 12 Q100 32 78 12 Z', trim: 'M79 13 Q100 30 121 13' },
  jersey: { vb: '0 0 200 220', body: 'M78 12 L40 24 L6 62 L26 84 L48 66 L48 210 Q100 214 152 210 L152 66 L174 84 L194 62 L160 24 L122 12 L100 42 Z', trim: 'M80 14 L100 40 L120 14' },
  hoodie: { vb: '0 0 200 232', body: 'M70 34 L36 44 L8 124 L28 132 L50 84 L50 222 Q100 226 150 222 L150 84 L172 132 L192 124 L164 44 L130 34 Q132 4 100 4 Q68 4 70 34 Z', trim: 'M78 34 Q100 58 122 34 M92 50 L90 78 M108 50 L110 78 M68 168 L132 168 L140 206 L60 206 Z' },
  cap: { vb: '0 0 200 140', body: 'M30 102 Q30 30 100 26 Q170 30 170 102 Z M22 104 Q100 134 178 104 Q100 120 22 104 Z', trim: 'M100 28 V100 M100 28 Q70 52 62 101 M100 28 Q130 52 138 101' },
  tote: { vb: '0 0 200 220', body: 'M30 74 L170 74 L176 214 L24 214 Z', trim: 'M62 74 Q62 12 100 12 Q138 12 138 74 M74 74 Q74 26 100 26 Q126 26 126 74' },
  mug: { vb: '0 0 200 170', body: 'M40 30 L140 30 L136 152 Q136 162 126 162 L54 162 Q44 162 44 152 Z', trim: 'M141 56 Q184 56 179 98 Q174 132 138 130' },
  notebook: { vb: '0 0 160 210', body: 'M14 8 H146 Q152 8 152 14 V196 Q152 202 146 202 H14 Q8 202 8 196 V14 Q8 8 14 8 Z', trim: 'M120 8 V202 M30 8 V202' },
  pouch: { vb: '0 0 220 300', body: 'M30 26 L190 26 L196 268 Q198 290 178 290 L42 290 Q22 290 24 268 Z', trim: 'M30 50 H190 M28 262 Q110 278 192 262 M182 26 V40' },
  jar: { vb: '0 0 200 260', body: 'M40 62 Q40 48 56 48 L144 48 Q160 48 160 62 L160 236 Q160 252 144 252 L56 252 Q40 252 40 236 Z M52 14 H148 Q154 14 154 20 V44 H46 V20 Q46 14 52 14 Z', trim: 'M46 30 H154' },
};

/* Repeat patterns for sublimated or all-over prints, drawn in a 24-unit tile. */
const TILES = {
  hatch: (c) => <path d="M-6 6 L6 -6 M0 24 L24 0 M18 30 L30 18" stroke={c} strokeWidth="5" />,
  chevron: (c) => <path d="M0 18 L12 8 L24 18" stroke={c} strokeWidth="3.4" fill="none" />,
  dots: (c) => <><circle cx="6" cy="6" r="2.4" fill={c} /><circle cx="18" cy="18" r="2.4" fill={c} /></>,
  waves: (c) => <path d="M0 12 Q6 4 12 12 T24 12" stroke={c} strokeWidth="2.2" fill="none" />,
  shards: (c) => <path d="M0 24 L10 0 L14 0 L4 24 Z M14 24 L22 6 L24 6 L24 10 L18 24 Z" fill={c} />,
  bloom: (c) => <><circle cx="12" cy="12" r="3" fill={c} />{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="12" cy="6" rx="2.6" ry="4.4" fill={c} transform={`rotate(${a} 12 12)`} />)}</>,
};

export function Pattern({ id, kind, color, size = 24, rotate = 0 }) {
  return (
    <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" patternTransform={`rotate(${rotate}) scale(${size / 24})`}>
      {TILES[kind](color)}
    </pattern>
  );
}

export function Good({ kind, color, trim = 'rgba(0,0,0,0.28)', children, label, width = '100%', pattern }) {
  const g = GOODS[kind];
  const uid = React.useId().replace(/:/g, '');
  return (
    <figure className="art-good" style={{ width }}>
      <svg viewBox={g.vb} role="img" aria-label={label ?? kind}>
        <path d={g.body} fill={color} stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" />
        {pattern && (
          <>
            <defs>
              <clipPath id={`c${uid}`}><path d={g.body} /></clipPath>
              <Pattern id={`p${uid}`} {...pattern} />
            </defs>
            <rect x="0" y={pattern.y ?? 0} width="100%" height={pattern.h ?? '100%'} fill={`url(#p${uid})`} clipPath={`url(#c${uid})`} opacity={pattern.opacity ?? 1} />
          </>
        )}
        <path d={g.trim} fill="none" stroke={trim} strokeWidth={kind === 'mug' || kind === 'tote' ? 7 : 1.6} strokeLinecap="round" />
        {children}
      </svg>
      {label && <figcaption>{label}</figcaption>}
    </figure>
  );
}

/* Small scenes for storyboards and site heroes, in a 160×120 box. Line art in `ink`, one fill in `accent`. */
export function Scene({ kind, ink = '#1a1a1a', accent = '#c8a46a', bg = 'transparent' }) {
  const s = { stroke: ink, strokeWidth: 2.2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const scenes = {
    drip: (
      <>
        <path d="M58 22 H102 L94 50 H66 Z" {...s} />
        <path d="M80 54 V62 M80 70 V74" {...s} />
        <path d="M62 80 H98 L94 112 H66 Z" {...s} fill={accent} />
      </>
    ),
    scoop: (
      <>
        <path d="M52 64 H108 L98 104 H62 Z" {...s} />
        <path d="M40 30 Q60 20 76 40 L70 46 Q58 34 44 38 Z" {...s} fill={accent} />
        <path d="M76 40 L104 64" {...s} />
      </>
    ),
    pour: (
      <>
        <path d="M30 40 H70 V78 H30 Z M70 50 Q86 50 92 62" {...s} />
        <path d="M94 64 Q98 80 100 92" {...s} stroke={accent} strokeWidth="3" />
        <path d="M86 92 H120 L114 112 H92 Z" {...s} />
      </>
    ),
    tumblers: (
      <>
        <path d="M36 30 H62 L58 66 H40 Z M98 70 H124 L120 106 H102 Z" {...s} />
        <path d="M60 34 Q84 20 104 70" {...s} stroke={accent} strokeWidth="3" />
      </>
    ),
    final: (
      <>
        <path d="M44 50 H72 L68 102 H48 Z" {...s} fill={accent} />
        <path d="M36 104 H80" {...s} />
        <path d="M92 30 H128 L130 104 H90 Z M92 42 H128" {...s} />
      </>
    ),
    talk: (
      <>
        <circle cx="80" cy="44" r="16" {...s} />
        <path d="M50 108 Q80 64 110 108" {...s} />
        <path d="M108 26 H140 V46 H120 L112 54 V46 H108 Z" {...s} fill={accent} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true" style={{ display: 'block', width: '100%', height: '100%', background: bg }}>
      {scenes[kind]}
    </svg>
  );
}
