import React from 'react';
import { Good, Mark, MarkG } from './illo';

/* Merch mock-ups: flat garments and goods with the artwork placed where it would be printed. */

const CENTRE = { tee: [100, 96], jersey: [100, 104], hoodie: [100, 118], tote: [100, 140], cap: [100, 66], mug: [90, 92], notebook: [80, 100] };

function Print({ kind, p }) {
  const [cx, cy] = p.at ?? CENTRE[kind];
  const markSize = 64 * (p.markS ?? 0.6);
  let y = cy - ((p.mark ? markSize : 0) + (p.lines?.length ?? 0) * 14) / 2;
  const out = [];
  if (p.mark) {
    out.push(<MarkG key="m" kind={p.mark} fill={p.markFill} bg={p.markBg} x={cx - markSize / 2} y={y} s={p.markS ?? 0.6} />);
    y += markSize + 6;
  }
  (p.lines ?? []).forEach(([text, size = 12, weight = 600, family = 'sans', fill = p.ink], i) => {
    y += size;
    out.push(
      <text key={i} x={cx} y={y} textAnchor="middle" fontFamily={`var(--${family})`} fontSize={size} fontWeight={weight} fill={fill} letterSpacing={family === 'sans' && size < 12 ? 1 : 0}>
        {text}
      </text>,
    );
    y += 4;
  });
  return <g>{out}</g>;
}

function Stickers({ colors, mark, words, label }) {
  return (
    <figure className="art-good am-stickers">
      <div>
        <span className="am-st am-st-circle" style={{ background: colors[0] }}><Mark kind={mark} fill={colors[1]} bg={colors[0]} size={44} /></span>
        <span className="am-st am-st-pill" style={{ background: colors[1], color: colors[0] }}>{words[0]}</span>
        <span className="am-st am-st-square" style={{ background: colors[2], color: colors[0] }}>{words[1]}</span>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

export function Merch({ items, cols = 3, bg, dark }) {
  return (
    <div className="art art-merch" style={{ '--cols': cols, background: bg, ...(dark ? { '--p-muted': '#B7C3C1' } : {}) }}>
      {items.map((it) =>
        it.kind === 'stickers' ? (
          <Stickers key={it.label} {...it} />
        ) : (
          <Good key={it.label} kind={it.kind} color={it.color} trim={it.trim} label={it.label} pattern={it.pattern}>
            {it.panel && <path d={it.panel} fill={it.trim} />}
            {it.stripes && it.stripes.map(([x, w]) => <rect key={x} x={x} y="66" width={w} height="144" fill={it.trim} opacity="0.9" />)}
            {(it.prints ?? (it.print ? [it.print] : [])).map((p, i) => <Print key={i} kind={it.kind} p={p} />)}
          </Good>
        ),
      )}
    </div>
  );
}
