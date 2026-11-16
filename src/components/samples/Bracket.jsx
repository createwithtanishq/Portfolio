import React from 'react';

/*
  A double-elimination top-8 bracket drawn as SVG: winners side on top, losers side below,
  grand final on the right. Players who drop from the winners side are explained in the text, not drawn.
*/
const W = 150; // match box width
const H = 44; // match box height
const COL = 186; // column step
const X = (col) => col * COL;
const WY = 26; // winners top
const LY = 304; // losers top

function Match({ m, x, y }) {
  const rows = [m.a, m.b];
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect className="br-box" width={W} height={H} rx="2" />
      <line className="br-mid" x1="0" x2={W} y1={H / 2} y2={H / 2} />
      {rows.map(([name, seed, score], i) => {
        const won = m.w === i;
        const ty = i === 0 ? 15 : 37;
        return (
          <g key={name} className={won ? 'br-win' : 'br-lose'}>
            <text x="8" y={ty} className="br-seed">{seed}</text>
            <text x="26" y={ty} className="br-name">{name}</text>
            <text x={W - 10} y={ty} className="br-score" textAnchor="end">{score}</text>
          </g>
        );
      })}
    </g>
  );
}

const link = (x1, y1, x2, y2) => {
  const mid = x1 + (x2 - x1) / 2;
  return `M${x1} ${y1} H${mid} V${y2} H${x2}`;
};
const cy = (y) => y + H / 2;

export default function Bracket({ data }) {
  const qf = [WY, WY + 60, WY + 120, WY + 180];
  const sf = [WY + 30, WY + 150];
  const wf = WY + 90;
  const l1 = [LY, LY + 60];
  const l3 = LY + 30;
  const gf = Math.round((cy(wf) + cy(l3)) / 2 - H / 2);

  const paths = [
    link(X(0) + W, cy(qf[0]), X(1), cy(sf[0])), link(X(0) + W, cy(qf[1]), X(1), cy(sf[0])),
    link(X(0) + W, cy(qf[2]), X(1), cy(sf[1])), link(X(0) + W, cy(qf[3]), X(1), cy(sf[1])),
    link(X(1) + W, cy(sf[0]), X(2), cy(wf)), link(X(1) + W, cy(sf[1]), X(2), cy(wf)),
    link(X(2) + W, cy(wf), X(4), cy(gf)),
    link(X(0) + W, cy(l1[0]), X(1), cy(l1[0])), link(X(0) + W, cy(l1[1]), X(1), cy(l1[1])),
    link(X(1) + W, cy(l1[0]), X(2), cy(l3)), link(X(1) + W, cy(l1[1]), X(2), cy(l3)),
    link(X(2) + W, cy(l3), X(3), cy(l3)),
    link(X(3) + W, cy(l3), X(4), cy(gf)),
  ];

  const labels = [
    [X(0), WY - 10, 'Winners round 1'], [X(1), WY - 10, 'Winners semi-finals'], [X(2), WY - 10, 'Winners final'],
    [X(0), LY - 10, 'Losers round 1'], [X(1), LY - 10, 'Losers round 2'], [X(2), LY - 10, 'Losers round 3'], [X(3), LY - 10, 'Losers final'],
    [X(4), gf - 10, 'Grand final'],
  ];

  return (
    <div className="sb-scroll">
      <svg className="sb-bracket" viewBox={`0 0 ${X(4) + W + 2} ${LY + 112}`} role="img" aria-label="Double-elimination bracket for eight players. Rook beat Vikr4m 3–2 in the grand final.">
        {paths.map((d, i) => <path key={i} d={d} className="br-link" />)}
        {labels.map(([x, y, t]) => <text key={t} x={x} y={y} className="br-label">{t}</text>)}
        {data.winners.map((m, i) => <Match key={`w${i}`} m={m} x={X(0)} y={qf[i]} />)}
        {data.winnersSemis.map((m, i) => <Match key={`s${i}`} m={m} x={X(1)} y={sf[i]} />)}
        <Match m={data.winnersFinal} x={X(2)} y={wf} />
        {data.losers1.map((m, i) => <Match key={`l1${i}`} m={m} x={X(0)} y={l1[i]} />)}
        {data.losers2.map((m, i) => <Match key={`l2${i}`} m={m} x={X(1)} y={l1[i]} />)}
        <Match m={data.losers3} x={X(2)} y={l3} />
        <Match m={data.losersFinal} x={X(3)} y={l3} />
        <Match m={data.grandFinal} x={X(4)} y={gf} />
      </svg>
    </div>
  );
}
