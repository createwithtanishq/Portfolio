import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Decode from './Decode';

const field =
  'mt-2 w-full rounded-xl border border-ink/15 bg-ink/4 px-4 py-3.5 text-base font-light text-ink placeholder:text-ink/35 outline-none transition-all focus:border-accent/60 focus:bg-ink/6 focus:shadow-[0_0_0_3px_rgba(255,106,43,0.12)]';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: false, message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitting: false, success: false, error: true, message: 'All fields are required.' });
      return;
    }
    setStatus({ submitting: true, success: false, error: false, message: '' });
    try {
      const res = await fetch('https://formsubmit.co/ajax/createwithtanishq@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...formData, _subject: 'New Portfolio Contact Form Submission!' }),
      });
      if (res.ok) {
        setStatus({ submitting: false, success: true, error: false, message: 'Transmission received. I will get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ submitting: false, success: false, error: true, message: 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus({ submitting: false, success: false, error: true, message: 'Connection error. Please try again.' });
    }
  };

  return (
    <section id="contact" className="scene relative px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Decode as="p" text="05 — Open Channel" className="hud hud-accent mb-3" />
            <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.02em] sm:text-6xl">
              Let's build<br />something
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/65 sm:text-base">
              {portfolioData.contactIntro.title}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/45">
              {portfolioData.contactIntro.subtitle}
            </p>

            <a
              href="mailto:createwithtanishq@gmail.com"
              className="glass grain mt-7 flex items-center justify-between gap-4 p-5 transition-transform hover:-translate-y-1"
            >
              <div>
                <p className="hud">Direct line</p>
                <p className="mt-1 font-display text-base font-bold tracking-tight text-ink sm:text-lg">
                  createwithtanishq@gmail.com
                </p>
              </div>
              <span className="text-accent" aria-hidden="true">→</span>
            </a>

            <div className="mt-4 flex flex-wrap gap-2">
              {portfolioData.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip transition-colors hover:border-accent/60 hover:text-ink"
                >
                  {s.platform}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="glass grain p-6 sm:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="hud">Name</span>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className={field} />
              </label>
              <label className="block">
                <span className="hud">Email</span>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className={field} />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="hud">Message</span>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="6" placeholder="What do you want to build?" className={`${field} resize-none`} />
            </label>

            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-5 rounded-xl border px-4 py-3 text-sm ${
                  status.error ? 'border-red-400/40 bg-red-500/10 text-red-200' : 'border-accent/40 bg-accent/10 text-accent'
                }`}
              >
                {status.message}
              </motion.div>
            )}

            <button type="submit" disabled={status.submitting} className="btn-signal mt-6 w-full justify-center px-6 py-4 text-sm disabled:opacity-50 sm:w-auto">
              {status.submitting ? 'Sending…' : 'Send transmission'}
              <span aria-hidden="true">↗</span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
