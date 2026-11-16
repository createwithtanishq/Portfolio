import React from 'react';
import { basisLine } from '../../data/samples';
import Bracket from './Bracket';
import { ART } from './art';

/*
  One work sample drawn as a sheet of ivory paper. Each block type is a small renderer;
  the sample data in src/data/samples.js decides which blocks appear and in what order.
*/

const TONE = {
  solid: ['Live', 'Paid', 'Confirmed', 'Done', 'On track', 'Up'],
  accent: ['Approved', 'Scheduled', 'Ordered', 'Quote in', 'Reel', 'Live stream'],
  outline: ['In changes', 'Waiting', 'In review', 'Watch', 'Story', 'Carousel', 'Short', 'Post'],
  muted: ['Not started', 'Not due', 'Low', 'Rest', 'n/a'],
};
const toneOf = (text) => Object.keys(TONE).find((k) => TONE[k].includes(text)) ?? 'outline';

const Chip = ({ children }) => <span className={`sc-chip sc-chip-${toneOf(children)}`}>{children}</span>;

const Dots = ({ n }) => (
  <span className="sc-dots" role="img" aria-label={`${n} out of 5`}>
    {[1, 2, 3, 4, 5].map((i) => <span key={i} className={i <= n ? 'on' : ''} />)}
  </span>
);

const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2);

function Block({ b }) {
  switch (b.t) {
    case 'h':
      return <h3 className="sc-h">{b.text}</h3>;
    case 'p':
      return <p className={b.small ? 'sc-p sc-small' : 'sc-p'}>{b.text}</p>;
    case 'note':
      return <p className="sc-note">{b.text}</p>;
    case 'quote':
      return <blockquote className="sc-quote">“{b.text}”</blockquote>;
    case 'list':
      return <ul className="sc-list">{b.items.map((x) => <li key={x}>{x}</li>)}</ul>;
    case 'steps':
      return (
        <ol className="sc-steps">
          {b.items.map((x, i) => <li key={x}><span className="sc-step-n">{i + 1}</span><span>{x}</span></li>)}
        </ol>
      );
    case 'checks':
      return (
        <ul className="sc-checks">
          {b.items.map((x, i) => (
            <li key={x} className={b.done?.includes(i) ? 'done' : ''}>
              <span className="sc-box" aria-hidden="true" />
              <span>{x}</span>
              {b.done?.includes(i) && <span className="sr-only"> (done)</span>}
            </li>
          ))}
        </ul>
      );
    case 'facts':
      return (
        <dl className="sc-facts">
          {b.items.map(([k, v], i) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{b.status === i ? <Chip>{v}</Chip> : v}</dd>
            </div>
          ))}
        </dl>
      );
    case 'cards':
      return (
        <div className="sc-cards" style={{ '--cols': b.cols ?? 3 }}>
          {b.items.map((c, i) => (
            <div key={c.title} className="sc-card">
              {b.numbered && <span className="sc-card-n">{i + 1}</span>}
              <p className="sc-card-title">{c.title}</p>
              <p className="sc-card-text">{c.text}</p>
              {c.meta && <p className="sc-card-meta">{c.meta}</p>}
            </div>
          ))}
        </div>
      );
    case 'split':
      return (
        <div className="sc-split">
          <div>{b.left.map((x, i) => <Block key={i} b={x} />)}</div>
          <div>{b.right.map((x, i) => <Block key={i} b={x} />)}</div>
        </div>
      );
    case 'table':
      return (
        <div className="sc-scroll">
          <table className="sc-table">
            <thead><tr>{b.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
            <tbody>
              {b.rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, ci) => {
                    const content = b.status === ci ? <Chip>{c}</Chip> : b.score === ci ? <Dots n={c} /> : c;
                    return ci === 0 ? <th key={ci} scope="row">{content}</th> : <td key={ci}>{content}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'timeline':
      return (
        <ol className="sc-timeline">
          {b.rows.map(([time, what, who]) => (
            <li key={time}>
              <span className="sc-time">{time}</span>
              <span>{what}</span>
              <span className="sc-who">{who}</span>
            </li>
          ))}
        </ol>
      );
    case 'script':
      return (
        <div className="sc-scroll">
          <table className="sc-table sc-script">
            <thead><tr><th scope="col">Time</th><th scope="col">On screen</th><th scope="col">Said</th></tr></thead>
            <tbody>
              {b.rows.map(([time, screen, said]) => (
                <tr key={time}><th scope="row" className="sc-time">{time}</th><td>{screen}</td><td className="sc-said">{said}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'gantt':
      return (
        <div className="sc-scroll">
          <div className="sc-gantt" style={{ '--weeks': b.weeks }} role="table" aria-label="Project plan by week">
            <div className="sc-gantt-row sc-gantt-head" role="row">
              <span role="columnheader">Task</span>
              {Array.from({ length: b.weeks }, (_, i) => <span key={i} role="columnheader">Week {i + 1}</span>)}
            </div>
            {b.rows.map(([task, from, to, who]) => (
              <div key={task} className="sc-gantt-row" role="row">
                <span role="rowheader">{task}</span>
                <span className="sc-gantt-bar" role="cell" style={{ gridColumn: `${from + 1} / ${to + 2}` }}>
                  {who}
                  <span className="sr-only">: week {from}{to !== from ? ` to week ${to}` : ''}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'calendar':
      return (
        <div className="sc-scroll">
          <div className="sc-cal">
            <span />
            {b.days.map((d) => <span key={d} className="sc-cal-day">{d}</span>)}
            {b.weeks.map((w) => (
              <React.Fragment key={w.label}>
                <span className="sc-cal-week">{w.label}</span>
                {w.days.map(([kind, text], i) => (
                  <div key={i} className={`sc-cal-cell ${kind === 'Rest' ? 'rest' : ''}`}>
                    <Chip>{kind}</Chip>
                    <span>{text}</span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    case 'flow':
      return (
        <ol className="sc-flow">
          {b.steps.map(([title, tool, who], i) => (
            <li key={title}>
              <span className="sc-flow-n">{i + 1}</span>
              <span className="sc-flow-title">{title}</span>
              <span className="sc-small">{tool}</span>
              <Chip>{who}</Chip>
            </li>
          ))}
        </ol>
      );
    case 'form':
      return (
        <div className="sc-form" aria-label={`Sign-up form: ${b.title}`}>
          <p className="sc-form-title">{b.title}</p>
          {b.fields.map(([label, hint]) => (
            <div key={label} className="sc-field">
              <span className="sc-field-label">{label}</span>
              <span className="sc-field-input">{hint}</span>
            </div>
          ))}
          <span className="sc-form-btn">{b.button}</span>
        </div>
      );
    case 'messages':
      return (
        <ul className="sc-msgs">
          {b.items.map((m) => (
            <li key={m.when}>
              <span className="sc-small">{m.when}</span>
              <p className="sc-bubble">{m.text}</p>
            </li>
          ))}
        </ul>
      );
    case 'email':
      return (
        <div className="sc-email">
          <dl className="sc-email-head">
            <div><dt>To</dt><dd>{b.to}</dd></div>
            <div><dt>Subject</dt><dd>{b.subject}</dd></div>
          </dl>
          <div className="sc-email-body">
            {b.body.map((p) => <p key={p}>{p}</p>)}
            <p className="sc-email-sign">{b.sign.map((l) => <span key={l}>{l}</span>)}</p>
          </div>
        </div>
      );
    case 'stats':
      return (
        <div className="sc-stats" style={{ '--n': b.items.length }}>
          {b.items.map(([v, l]) => (
            <div key={l}><span className="sc-stat-v">{v}</span><span className="sc-stat-l">{l}</span></div>
          ))}
        </div>
      );
    case 'bars':
      return (
        <ul className="sc-bars">
          {b.items.map(([label, v]) => (
            <li key={label}>
              <span>{label}</span>
              <span className="sc-bar"><span style={{ width: `${v}%` }} /></span>
              <span className="sc-bar-v">{v}{b.unit ?? '%'}</span>
            </li>
          ))}
        </ul>
      );
    case 'profile':
      return (
        <div className="sc-profile">
          <span className="sc-avatar" aria-hidden="true">{initials(b.name)}</span>
          <div>
            <p className="sc-profile-name">{b.name} <span className="sc-small">{b.handle}</span></p>
            <p className="sc-p">{b.line}</p>
          </div>
        </div>
      );
    case 'srt':
      return (
        <pre className="sc-srt" aria-label="Subtitle file">
          {b.cues.map(([n, a, z, text]) => `${n}\n${a} --> ${z}\n${text}\n`).join('\n')}
        </pre>
      );
    case 'phone':
      return (
        <figure className="sc-phone">
          <div className="sc-phone-screen" aria-hidden="true">
            <span className="sc-phone-cup" />
            <span className="sc-phone-steam" />
            <span className="sc-phone-cap">{b.caption}</span>
          </div>
          <figcaption className="sc-small">{b.label}</figcaption>
        </figure>
      );
    case 'bracket':
      return <Bracket data={b.data} />;
    case 'art': {
      const Art = ART[b.kind];
      return Art ? <Art {...b.props} /> : null;
    }
    default:
      return null;
  }
}

export default function Sheet({ sample, level = 'h2' }) {
  const Title = level;
  return (
    <article className="sheet" aria-labelledby={`sheet-${sample.id}`}>
      <header className="sheet-head">
        <span className={`sheet-tag ${sample.basis === 'real' ? 'real' : ''}`}>{sample.basis === 'real' ? 'From real work' : 'Sample'}</span>
        <span className="sheet-mark">Tanishq Aryan</span>
      </header>
      <Title id={`sheet-${sample.id}`} className="sheet-title">{sample.title}</Title>
      <p className="sheet-sum">{sample.summary}</p>
      <div className="sheet-body">
        {sample.blocks.map((b, i) => <Block key={i} b={b} />)}
      </div>
      <footer className="sheet-foot">{basisLine(sample)}</footer>
    </article>
  );
}
