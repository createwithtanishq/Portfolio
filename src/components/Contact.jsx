import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EMAIL, LINKEDIN, profile } from '../data/profile';
import { services } from '../data/services';
import { sampleById } from '../data/samples';
import SpatialFrame from './SpatialFrame';

const ROLE = 'A full-time role';
const TOPICS = [...services.map((s) => s.title), ROLE, 'Something else'];
const BUDGETS = ['Under ₹10,000', '₹10,000 to ₹25,000', '₹25,000 to ₹75,000', 'Above ₹75,000', 'Not sure yet'];
const TIMES = ['This week', 'This month', 'In 1 to 3 months', 'Flexible'];
const EMPTY = { name: '', email: '', topic: '', budget: '', timeline: '', message: '' };

/* Visit card on the world: the podium with its top step open, and one card to reach Tanishq. */
const Contact = () => {
  const { search } = useLocation();
  const [form, setForm] = useState(EMPTY);
  const [sample, setSample] = useState(null);

  /* Links from a service or a sample (/?service=brand&sample=coffee-pouch#contact) fill in what the enquiry is about. */
  useEffect(() => {
    const q = new URLSearchParams(search);
    const svc = services.find((x) => x.id === q.get('service'));
    if (svc) setForm((f) => ({ ...f, topic: svc.title }));
    setSample(sampleById(q.get('sample') ?? '') ?? null);
  }, [search]);

  const [status, setStatus] = useState({ sending: false, ok: false, error: false, text: '' });

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, ok: false, error: false, text: '' });
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          ...(sample ? { sample: `${sample.title} (${window.location.origin}/services/samples/${sample.id})` } : {}),
          _subject: form.topic ? `Enquiry: ${form.topic}` : 'New portfolio message',
          _template: 'table',
          _honey: '',
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ sending: false, ok: true, error: false, text: 'Thanks. Your message is on its way, and I will reply by email.' });
      setForm(EMPTY);
      setSample(null);
    } catch {
      setStatus({ sending: false, ok: false, error: true, text: `That didn't send. Please email ${EMAIL} directly.` });
    }
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <SpatialFrame station="final" compose="card" className="contact-world" />
      <p className="contact-caption" aria-hidden="true">The top step is open.</p>
      <div className="contact-card">
        <h2 id="contact-title" className="head">Let's talk</h2>
        <p className="mt-4">{profile.open}</p>
        <p className="mt-5"><a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        <p className="mt-1"><a className="link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn profile</a></p>

        <form onSubmit={submit} className="mt-4">
          <label>
            Name
            <input type="text" name="name" autoComplete="name" required value={form.name} onChange={change} placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" name="email" autoComplete="email" required value={form.email} onChange={change} placeholder="you@company.com" />
          </label>
          <label>
            What is it about?
            <select name="topic" required value={form.topic} onChange={change}>
              <option value="" disabled>Choose one</option>
              {TOPICS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          {sample && (
            <p className="contact-sample small">
              About the sample: <strong>{sample.title}</strong>{' '}
              <button type="button" className="link" onClick={() => setSample(null)}>Remove</button>
            </p>
          )}
          <div className="contact-row">
            {form.topic !== ROLE && (
              <label>
                Budget
                <select name="budget" value={form.budget} onChange={change}>
                  <option value="">Optional</option>
                  {BUDGETS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
            )}
            <label>
              When
              <select name="timeline" value={form.timeline} onChange={change}>
                <option value="">Optional</option>
                {TIMES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
          </div>
          <label>
            Message
            <textarea name="message" rows="3" required value={form.message} onChange={change} placeholder={form.topic === ROLE ? "The role, the team and where it's based" : "What you need and what it's for. A few lines is enough."} className="resize-none" />
          </label>
          {status.text && (
            <p role="status" className="mt-4 small">{status.text}</p>
          )}
          <button type="submit" disabled={status.sending} className="btn mt-6 disabled:opacity-60">
            {status.sending ? 'Sending…' : <>Send message <span className="arrow" aria-hidden="true">→</span></>}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
