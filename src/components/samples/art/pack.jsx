import React from 'react';
import { Good, Mark, MarkG, Pattern } from './illo';

/* Packaging samples: pouch, box dieline, jar label, garment tags and a mailer, drawn flat as a printer would see them. */

/* The FSSAI veg mark: green square outline with a filled circle. */
const VegMark = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-label="Vegetarian" role="img" className="apk-veg">
    <rect x="1" y="1" width="14" height="14" fill="#fff" stroke="#1E8A3A" strokeWidth="1.6" />
    <circle cx="8" cy="8" r="3.8" fill="#1E8A3A" />
  </svg>
);

function InfoPanel({ title, rows, colors, veg, nutrition, footer }) {
  return (
    <div className="apk-info" style={{ background: colors.labelBg, color: colors.ink }}>
      <p className="apk-info-t">{title}{veg && <VegMark size={18} />}</p>
      <dl>
        {rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
      {nutrition && (
        <table className="apk-nutri">
          <caption>{nutrition.title}</caption>
          <tbody>
            {nutrition.rows.map((r) => <tr key={r}><th scope="row">{r}</th><td>{nutrition.value}</td></tr>)}
          </tbody>
        </table>
      )}
      {footer && <p className="apk-info-foot">{footer}</p>}
    </div>
  );
}

export function Pouch({ colors, mark, brand, product, notes, weight, back, info }) {
  return (
    <div className="art art-pack" style={{ background: colors.stage }}>
      <Good kind="pouch" color={colors.bag} trim={colors.trim} label="Front, 250 g stand-up pouch" pattern={{ kind: 'dots', color: colors.pattern, size: 18, y: 50, h: 214 }}>
        <circle cx="110" cy="62" r="7" fill={colors.trim} opacity="0.85" />
        <circle cx="110" cy="62" r="3" fill="none" stroke={colors.bag} strokeWidth="1.2" />
        <rect x="46" y="74" width="128" height="170" rx="4" fill={colors.labelBg} />
        <MarkG kind={mark} fill={colors.main} bg={colors.labelBg} x={88} y={86} s={0.68} />
        <text x="110" y="152" textAnchor="middle" fontFamily="var(--serif)" fontSize="13" fill={colors.ink}>{brand}</text>
        <text x="110" y="178" textAnchor="middle" fontFamily="var(--serif)" fontSize="19" fill={colors.ink}>{product}</text>
        <text x="110" y="198" textAnchor="middle" fontFamily="var(--sans)" fontSize="8.5" fill={colors.ink}>{notes}</text>
        <rect x="80" y="214" width="60" height="18" rx="2" fill={colors.main} />
        <text x="110" y="226.5" textAnchor="middle" fontFamily="var(--sans)" fontSize="9" fontWeight="600" fill={colors.labelBg}>{weight}</text>
        <rect x="58" y="252" width="104" height="12" rx="2" fill="none" stroke={colors.trim} strokeDasharray="2 2" />
        <text x="110" y="261" textAnchor="middle" fontFamily="var(--sans)" fontSize="6.5" fill={colors.trim}>ROASTED ON  __ / __ / __</text>
      </Good>
      <InfoPanel title="Back of pack" rows={back} colors={colors} {...info} />
    </div>
  );
}

export function Jar({ colors, mark, brand, product, sub, weight, back, info }) {
  const uid = React.useId().replace(/:/g, '');
  return (
    <div className="art art-pack" style={{ background: colors.stage }}>
      <Good kind="jar" color={colors.glass} trim={colors.lid} label="Front label on a 200 g jar">
        <path d="M46 14 H154 V44 H46 Z" fill={colors.lid} />
        <defs><Pattern id={`j${uid}`} kind="bloom" color={colors.pattern} size={20} /></defs>
        <rect x="40" y="92" width="120" height="142" fill={colors.labelBg} />
        <rect x="40" y="92" width="120" height="142" fill={`url(#j${uid})`} />
        <rect x="50" y="104" width="100" height="118" rx="50" fill={colors.labelBg} />
        <g transform="translate(138 210)"><rect width="12" height="12" fill="#fff" stroke="#1E8A3A" strokeWidth="1.3" /><circle cx="6" cy="6" r="3" fill="#1E8A3A" /></g>
        <MarkG kind={mark} fill={colors.main} bg={colors.labelBg} x={86} y={112} s={0.44} />
        <text x="100" y="162" textAnchor="middle" fontFamily="var(--sans)" fontSize="9" fontWeight="600" fill={colors.main}>{brand}</text>
        <text x="100" y="184" textAnchor="middle" fontFamily="var(--serif)" fontSize="17" fill={colors.ink}>{product}</text>
        <text x="100" y="200" textAnchor="middle" fontFamily="var(--sans)" fontSize="8" fill={colors.ink}>{sub}</text>
        <text x="100" y="214" textAnchor="middle" fontFamily="var(--sans)" fontSize="8" fontWeight="600" fill={colors.ink}>{weight}</text>
      </Good>
      <InfoPanel title="Back label" rows={back} colors={colors} {...info} />
    </div>
  );
}

/* Box net for a W×H×D carton: cut lines solid, folds dashed, artwork on the front and back panels. */
export function Dieline({ colors, mark, brand, product, sub, backLines, dims }) {
  const uid = React.useId().replace(/:/g, '');
  const outline = 'M10 98 L30 82 L36 54 L96 54 L102 82 L102 16 L108 10 L312 10 L318 16 L318 82 L324 54 L384 54 L390 82 L606 82 L606 226 L390 226 L384 254 L324 254 L318 226 L318 292 L312 298 L108 298 L102 292 L102 226 L96 254 L36 254 L30 226 L10 210 Z';
  const folds = 'M30 82 V226 M102 82 V226 M318 82 V226 M390 82 V226 M30 82 H390 M30 226 H390';
  return (
    <div className="art art-dieline">
      <svg viewBox="-6 -6 628 320" role="img" aria-label={`Box dieline for ${brand} ${product}`}>
        <defs><Pattern id={`d${uid}`} kind="bloom" color={colors.pattern} size={22} /></defs>
        <path d={outline} fill="none" stroke={colors.bleed} strokeWidth="10" strokeLinejoin="round" opacity="0.5" />
        <path d={outline} fill={colors.side} />
        <path d={outline} fill={`url(#d${uid})`} />
        <rect x="102" y="82" width="216" height="144" fill={colors.panel} />
        <rect x="390" y="82" width="216" height="144" fill={colors.labelBg} />
        <MarkG kind={mark} fill={colors.accent} bg={colors.panel} x={186} y={96} s={0.75} />
        <text x="210" y="168" textAnchor="middle" fontFamily="var(--serif)" fontSize="22" fill={colors.ink}>{brand}</text>
        <text x="210" y="192" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="600" fill={colors.ink}>{product}</text>
        <text x="210" y="210" textAnchor="middle" fontFamily="var(--sans)" fontSize="9" fill={colors.ink}>{sub}</text>
        {backLines.map((l, i) => (
          <text key={l} x="400" y={98 + i * 13} fontFamily="var(--sans)" fontSize="7.6" fontWeight={i === 0 ? 700 : 400} fill={colors.ink}>{l}</text>
        ))}
        <g fontFamily="var(--sans)" fontSize="7" fill={colors.ink} opacity="0.75" textAnchor="middle">
          <text x="20" y="158" transform="rotate(-90 20 154)">GLUE</text>
          <text x="210" y="36">TUCK FLAP</text>
          <text x="210" y="278">TUCK FLAP</text>
          <text x="66" y="72">DUST FLAP</text>
          <text x="354" y="72">DUST FLAP</text>
        </g>
        <text x="66" y="160" textAnchor="middle" fontFamily="var(--sans)" fontSize="8" fill={colors.ink} transform="rotate(-90 66 156)">{brand}</text>
        <text x="354" y="160" textAnchor="middle" fontFamily="var(--sans)" fontSize="8" fill={colors.ink} transform="rotate(90 354 156)">{product}</text>
        <path d={outline} fill="none" stroke={colors.cut} strokeWidth="1.4" />
        <path d={folds} fill="none" stroke={colors.cut} strokeWidth="1" strokeDasharray="5 4" />
      </svg>
      <ul className="apk-legend">
        <li><span className="apk-cut" />Cut</li>
        <li><span className="apk-fold" />Fold</li>
        <li><span className="apk-bleed" style={{ borderColor: colors.bleed }} />Bleed, 3 mm</li>
        <li>{dims}</li>
      </ul>
    </div>
  );
}

export function Tags({ colors, mark, brand, price, size, care, material, back }) {
  return (
    <div className="art art-tags">
      <figure className="art-good">
        <svg viewBox="0 0 140 230" role="img" aria-label="Hang tag">
          <path d="M20 40 Q20 20 40 20 H100 Q120 20 120 40 V214 H20 Z" fill={colors.main} />
          <circle cx="70" cy="40" r="6" fill={colors.paper} />
          <path d="M70 40 C60 10 90 4 86 -8" stroke={colors.trim} strokeWidth="2" fill="none" />
          <MarkG kind={mark} fill={colors.paper} bg={colors.main} x={50} y={64} s={0.62} />
          <text x="70" y="134" textAnchor="middle" fontFamily="var(--serif)" fontSize="20" fill={colors.paper}>{brand}</text>
          <text x="70" y="176" textAnchor="middle" fontFamily="var(--sans)" fontSize="9" fill={colors.paper}>{size}</text>
          <text x="70" y="196" textAnchor="middle" fontFamily="var(--sans)" fontSize="12" fontWeight="600" fill={colors.paper}>{price}</text>
        </svg>
        <figcaption>Hang tag, front</figcaption>
      </figure>
      <figure className="art-good">
        <svg viewBox="0 0 140 230" role="img" aria-label="Hang tag, back">
          <path d="M20 40 Q20 20 40 20 H100 Q120 20 120 40 V214 H20 Z" fill={colors.paper} stroke={colors.trim} />
          <circle cx="70" cy="40" r="6" fill="#fff" stroke={colors.trim} />
          {back.map(([k, v], i) => (
            <g key={k} fontFamily="var(--sans)" fill={colors.ink}>
              <text x="30" y={66 + i * 19} fontSize="5.6" opacity="0.7">{k.toUpperCase()}</text>
              <text x="30" y={74 + i * 19} fontSize="7" fontWeight={k === 'MRP' ? 700 : 400}>{v}</text>
            </g>
          ))}
          <g transform={`translate(30 ${66 + back.length * 19})`}>
            {[0, 2, 3, 5, 7, 8, 10, 12, 13, 15, 17, 18, 20, 22, 23, 25, 27, 28, 30, 32, 33, 35, 37, 39, 40, 42, 44, 45, 47, 49, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72, 74, 76, 78].map((x) => <rect key={x} x={x} y="0" width={x % 3 ? 1 : 1.8} height="16" fill={colors.ink} />)}
          </g>
        </svg>
        <figcaption>Hang tag, back</figcaption>
      </figure>
      <figure className="art-good">
        <svg viewBox="0 0 180 90" role="img" aria-label="Woven neck label">
          <rect x="6" y="18" width="168" height="54" rx="3" fill={colors.paper} stroke={colors.trim} />
          <MarkG kind={mark} fill={colors.main} bg={colors.paper} x={18} y={29} s={0.5} />
          <text x="58" y="50" fontFamily="var(--serif)" fontSize="18" fill={colors.main}>{brand}</text>
          <text x="58" y="63" fontFamily="var(--sans)" fontSize="8" fill={colors.ink}>{size.split(',')[0]}</text>
        </svg>
        <figcaption>Woven neck label</figcaption>
      </figure>
      <figure className="art-good">
        <svg viewBox="0 0 110 230" role="img" aria-label="Care label">
          <rect x="10" y="6" width="90" height="218" rx="2" fill={colors.paper} stroke={colors.trim} />
          {/* ISO 3758 order: wash, bleach, dry, iron, professional care */}
          <g stroke={colors.ink} strokeWidth="1.6" fill="none" strokeLinejoin="round">
            <path d="M22 30 L26 46 H48 L52 30 M22 30 Q30 36 37 30 Q44 24 52 30" />
            <text x="37" y="43" textAnchor="middle" fontFamily="var(--sans)" fontSize="8" fill={colors.ink} stroke="none">30</text>
            <path d="M62 46 L76 22 L90 46 Z M62 22 L90 46 M90 22 L62 46" />
            <rect x="24" y="56" width="26" height="22" />
            <circle cx="37" cy="67" r="7" />
            <path d="M24 56 L50 78 M50 56 L24 78" />
            <rect x="64" y="56" width="22" height="22" />
            <path d="M64 63 L71 56" />
            <path d="M22 108 H52 L48 96 H32 Q24 96 22 108 Z" />
            <circle cx="33" cy="103" r="1.3" fill={colors.ink} />
            <circle cx="41" cy="103" r="1.3" fill={colors.ink} />
            <circle cx="76" cy="98" r="11" />
            <path d="M66 88 L86 108 M86 88 L66 108" />
          </g>
          {care.map((l, i) => <text key={l} x="18" y={132 + i * 13} fontFamily="var(--sans)" fontSize="8" fill={colors.ink}>{l}</text>)}
          <text x="18" y={132 + care.length * 13 + 8} fontFamily="var(--sans)" fontSize="8" fontWeight="600" fill={colors.ink}>{material}</text>
        </svg>
        <figcaption>Care label</figcaption>
      </figure>
    </div>
  );
}

export function Mailer({ colors, mark, brand, insideLine, card, sticker }) {
  return (
    <div className="art art-mailer">
      <figure className="art-good amb-box">
        <div className="amb-top" style={{ background: colors.box, color: colors.boxInk }}>
          <Mark kind={mark} fill={colors.main} bg={colors.box} size={54} />
          <p className="amb-brand">{brand}</p>
        </div>
        <figcaption>Outside: kraft mailer, one-colour print</figcaption>
      </figure>
      <figure className="art-good amb-box">
        <div className="amb-top amb-inside" style={{ background: colors.main, color: colors.mainInk }}>
          <p className="amb-inside-line">{insideLine}</p>
        </div>
        <figcaption>Inside the lid</figcaption>
      </figure>
      <figure className="art-good">
        <div className="amb-card" style={{ background: colors.card, color: colors.cardInk }}>
          <p className="amb-card-t">{card.title}</p>
          <p>{card.text}</p>
          <p className="amb-card-s">{card.sign}</p>
        </div>
        <figcaption>Thank-you card</figcaption>
      </figure>
      <figure className="art-good">
        <div className="amb-sticker" style={{ background: colors.accent, color: colors.main }}>
          <Mark kind={mark} fill={colors.main} bg={colors.accent} size={34} />
          <span>{sticker}</span>
        </div>
        <figcaption>Seal sticker</figcaption>
      </figure>
    </div>
  );
}
