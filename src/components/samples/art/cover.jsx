import React from 'react';
import { Mark, Pattern } from './illo';

/*
  The designed cover that opens each document sample: the client's colours and mark, the document's name set large,
  and one drawn motif that says what kind of document it is. Motifs are hand-built SVG in a 320 x 240 box.
*/

const Motif = ({ kind, c, data = {} }) => {
  const { ink, accent, soft } = c;
  switch (kind) {
    case 'figure':
      return (
        <g>
          <text x="300" y="150" textAnchor="end" fontFamily="var(--serif)" fontSize="128" fill={ink}>{data.value}</text>
          <rect x="182" y="172" width="118" height="3" fill={accent} />
          <text x="300" y="198" textAnchor="end" fontFamily="var(--sans)" fontSize="13" fill={ink} opacity="0.85">{data.label}</text>
        </g>
      );
    case 'bracket': {
      const ys = [40, 80, 120, 160, 200];
      return (
        <g stroke={ink} strokeWidth="2.4" fill="none" strokeLinecap="round">
          {[0, 2].map((i) => <path key={i} d={`M40 ${ys[i] - 14} H110 V${ys[i] + 26} H40 M110 ${ys[i] + 6} H170`} />)}
          <path d="M170 46 V146 M170 96 H232" />
          <path d="M40 190 H170 V146" opacity="0.45" />
          <rect x="232" y="80" width="64" height="32" rx="4" fill={accent} stroke="none" />
          <path d="M252 96 l7 7 l14 -16" stroke={c.bg} strokeWidth="3" />
        </g>
      );
    }
    case 'timeline':
      return (
        <g>
          {(data.bars ?? [[0, 70], [40, 90], [100, 70], [130, 90], [190, 60], [230, 60]]).map(([x, w], i) => (
            <rect key={i} x={30 + x} y={28 + i * 32} width={w} height="18" rx="9" fill={i === (data.hi ?? 3) ? accent : ink} opacity={i === (data.hi ?? 3) ? 1 : 0.85 - i * 0.08} />
          ))}
          <path d="M30 222 H300" stroke={ink} strokeWidth="1.5" opacity="0.5" />
          {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${30 + i * 54} 218 V226`} stroke={ink} strokeWidth="1.5" opacity="0.5" />)}
        </g>
      );
    case 'bars':
      return (
        <g>
          {(data.values ?? [38, 52, 46, 70, 64, 92]).map((v, i, a) => (
            <rect key={i} x={40 + i * 44} y={210 - v * 1.9} width="28" height={v * 1.9} rx="3" fill={i === a.length - 1 ? accent : ink} opacity={i === a.length - 1 ? 1 : 0.35 + i * 0.1} />
          ))}
          <path d="M30 212 H300" stroke={ink} strokeWidth="2" />
          <path d="M54 130 L98 104 L142 116 L186 72 L230 84 L274 34" stroke={accent} strokeWidth="3" fill="none" strokeLinejoin="round" />
          <circle cx="274" cy="34" r="6" fill={accent} />
        </g>
      );
    case 'pillars':
      return (
        <g>
          <path d="M28 46 L164 14 L300 46 Z" fill={accent} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={40 + i * 44} y="58" width="28" height="140" rx="2" fill={ink} opacity={0.95 - i * 0.07} />
          ))}
          <rect x="22" y="204" width="284" height="14" rx="2" fill={ink} />
        </g>
      );
    case 'flow': {
      const n = [[50, 70], [150, 70], [250, 70], [250, 170], [150, 170]];
      return (
        <g>
          <path d="M50 70 H250 V170 H150" stroke={ink} strokeWidth="2.4" fill="none" strokeDasharray="6 6" />
          {n.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="26" fill={i === (data.hi ?? 2) ? accent : soft} stroke={ink} strokeWidth="2.4" />
              <text x={x} y={y + 7} textAnchor="middle" fontFamily="var(--serif)" fontSize="22" fill={ink}>{i + 1}</text>
            </g>
          ))}
        </g>
      );
    }
    case 'frames':
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${44 + i * 88} ${22 + (i % 2) * 22}) rotate(${(i - 1) * 4} 36 90)`}>
              <rect width="72" height="150" rx="10" fill={i === 1 ? accent : soft} stroke={ink} strokeWidth="2.4" />
              <rect x="10" y="108" width="52" height="7" rx="3.5" fill={ink} opacity="0.8" />
              <rect x="16" y="120" width="40" height="7" rx="3.5" fill={ink} opacity="0.5" />
              {i === 1 && <path d="M28 58 L48 70 L28 82 Z" fill={ink} />}
            </g>
          ))}
        </g>
      );
    case 'chat':
      return (
        <g fontFamily="var(--sans)" fontSize="13">
          <path d="M40 40 H230 Q246 40 246 56 V92 Q246 108 230 108 H72 L52 124 V108 Q40 108 40 92 Z" fill={soft} stroke={ink} strokeWidth="2.2" />
          <rect x="58" y="58" width="150" height="8" rx="4" fill={ink} opacity="0.75" />
          <rect x="58" y="78" width="100" height="8" rx="4" fill={ink} opacity="0.45" />
          <path d="M100 140 H288 Q300 140 300 152 V186 Q300 198 288 198 H276 V214 L258 198 H100 Q88 198 88 186 V152 Q88 140 100 140 Z" fill={accent} />
          <rect x="110" y="158" width="150" height="8" rx="4" fill={c.bg} opacity="0.9" />
          <rect x="110" y="176" width="90" height="8" rx="4" fill={c.bg} opacity="0.6" />
        </g>
      );
    case 'checks':
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(44 ${24 + i * 40})`}>
              <rect width="26" height="26" rx="5" fill={i < (data.done ?? 3) ? accent : 'none'} stroke={ink} strokeWidth="2.4" />
              {i < (data.done ?? 3) && <path d="M6 13 l5 5 l10 -11" stroke={ink} strokeWidth="3" fill="none" />}
              <rect x="42" y="9" width={[190, 150, 210, 130, 170][i]} height="9" rx="4.5" fill={ink} opacity={i < (data.done ?? 3) ? 0.35 : 0.85} />
            </g>
          ))}
        </g>
      );
    case 'clock':
      return (
        <g fill="none" stroke={ink} strokeWidth="2.4">
          <circle cx="170" cy="120" r="94" />
          <path d="M170 120 L170 26 A94 94 0 0 1 251 167 Z" fill={accent} stroke="none" />
          <circle cx="170" cy="120" r="94" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            return <path key={i} d={`M${170 + Math.sin(a) * 80} ${120 - Math.cos(a) * 80} L${170 + Math.sin(a) * 90} ${120 - Math.cos(a) * 90}`} />;
          })}
          <path d="M170 120 L170 58 M170 120 L214 140" strokeWidth="4" strokeLinecap="round" />
          <circle cx="170" cy="120" r="5" fill={ink} />
        </g>
      );
    case 'subtitle':
      return (
        <g>
          <rect x="96" y="12" width="128" height="220" rx="14" fill={soft} stroke={ink} strokeWidth="2.4" />
          <rect x="108" y="150" width="104" height="22" rx="4" fill={ink} />
          <text x="160" y="165" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" fill={c.bg}>{data.line ?? 'ninety seconds'}</text>
          <rect x="108" y="44" width="104" height="96" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
          <text x="234" y="96" fontFamily="var(--sans)" fontSize="10" fill={ink}>safe zone</text>
        </g>
      );
    default:
      return null;
  }
};

export function Cover({ client, mark, theme, kind, title, line, motif, data }) {
  const uid = React.useId().replace(/:/g, '');
  const c = { bg: theme.bg, ink: theme.ink, accent: theme.accent, soft: theme.soft ?? theme.bg };
  return (
    <div className="art art-cover" style={{ background: c.bg, color: c.ink }}>
      <div className="acv-text">
        <p className="acv-client">
          {mark && <Mark kind={mark} fill={c.ink} bg={c.bg} size={26} />}
          <span>{client}</span>
        </p>
        <p className="acv-kind" style={{ color: c.accent }}>{kind}</p>
        <p className="acv-title">{title}</p>
        {line && <p className="acv-line">{line}</p>}
      </div>
      <svg className="acv-art" viewBox="0 0 330 240" aria-hidden="true">
        <defs><Pattern id={`cv${uid}`} kind={theme.pattern ?? 'dots'} color={c.ink} size={18} /></defs>
        <rect x="0" y="0" width="330" height="240" fill={`url(#cv${uid})`} opacity="0.12" />
        <Motif kind={motif} c={c} data={data} />
      </svg>
    </div>
  );
}
