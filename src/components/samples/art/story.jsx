import React from 'react';
import { Mark, Scene } from './illo';

/* A storyboard drawn frame by frame, and a designed lead-magnet page. */

export function Storyboard({ frames }) {
  return (
    <ol className="art art-story">
      {frames.map((f) => (
        <li key={f.time}>
          <span className="ast-frame"><Scene kind={f.scene} ink="#1d1c1a" accent="#c8a46a" /></span>
          <span className="ast-time">{f.time} · {f.shot}</span>
          <span className="ast-action">{f.action}</span>
          <span className="ast-said">“{f.said}”</span>
        </li>
      ))}
    </ol>
  );
}

export function LeadMagnet({ brand, mark, colors, title, sub, steps, signup }) {
  return (
    <div className="art art-lead" style={{ background: colors.paper, color: colors.ink }}>
      <div className="alm-cover" style={{ background: colors.main, color: colors.mainInk }}>
        <span className="alm-brand"><Mark kind={mark} fill={colors.mainInk} bg={colors.main} size={26} />{brand}</span>
        <p className="alm-title">{title}</p>
        <p className="alm-sub">{sub}</p>
      </div>
      <ol className="alm-steps">
        {steps.map(([t, x], i) => (
          <li key={t}>
            <span className="alm-n" style={{ color: colors.main }}>{i + 1}</span>
            <span><strong>{t}</strong> {x}</span>
          </li>
        ))}
      </ol>
      <div className="alm-signup" style={{ background: colors.panel }}>
        <p>{signup.text}</p>
        <span className="alm-input">{signup.field}</span>
        <span className="alm-btn" style={{ background: colors.main, color: colors.mainInk }}>{signup.button}</span>
      </div>
    </div>
  );
}
