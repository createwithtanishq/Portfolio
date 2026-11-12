import React, { useState } from 'react';
import { EMAIL, LINKEDIN, profile } from '../data/profile';
import SpatialFrame from './SpatialFrame';

/* Visit card on the world: the podium with its top step open, and one card to reach Tanishq. */
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ sending: false, ok: false, error: false, text: '' });

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, ok: false, error: false, text: '' });
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: 'New portfolio message' }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ sending: false, ok: true, error: false, text: 'Thanks. Your message is on its way, and I will reply by email.' });
      setForm({ name: '', email: '', message: '' });
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
            Message
            <textarea name="message" rows="4" required value={form.message} onChange={change} placeholder="The role or project, the team, the timeline" className="resize-none" />
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
