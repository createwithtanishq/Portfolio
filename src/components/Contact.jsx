import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: false, message: '' });

  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitting: false, success: false, error: true, message: 'Please fill out all fields.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: false, message: '' });

    try {
      const response = await fetch('https://formsubmit.co/ajax/createwithtanishq@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: 'New Portfolio Contact Form Submission!',
        }),
      });

      if (response.ok) {
        setStatus({ submitting: false, success: true, error: false, message: 'Message sent. I will get back to you soon!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ submitting: false, success: false, error: true, message: 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus({ submitting: false, success: false, error: true, message: 'Connection error. Please try again.' });
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="poster-panel bg-[#111111] text-[#FFF8EF] p-4 sm:p-6 md:p-8">
              <span className="border-[3px] border-[#FFF8EF] text-[#FFF8EF] inline-block px-3 py-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.24em] mb-5 sm:mb-6">
                Contact / Collaborate
              </span>
              <h2 className="text-[#FFF8EF] font-heading font-black text-2xl sm:text-3xl md:text-5xl uppercase tracking-[-0.08em] leading-[0.9]">
                {portfolioData.contactIntro.title}
              </h2>
              <p className="mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-[#FFF8EF]/82">
                {portfolioData.contactIntro.subtitle}
              </p>
            </div>

            <div className="poster-panel p-4 sm:p-6 bg-[#F6B4B0]">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#111111]/55 mb-3">Email</p>
              <a href="mailto:createwithtanishq@gmail.com" className="font-heading font-black text-lg sm:text-2xl md:text-3xl uppercase tracking-[-0.05em] underline break-all">
                createwithtanishq@gmail.com
              </a>
            </div>

            <div className="poster-panel p-4 sm:p-6 bg-[#FFF8EF]">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#111111]/55 mb-4">Socials</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {portfolioData.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brut-btn bg-[#FFD84D] text-[#111111] px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em]"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="poster-panel p-4 sm:p-6 md:p-8 bg-[#FFF8EF] space-y-5 sm:space-y-6"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-5">
              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#111111]/55">Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="mt-3 w-full border-[3px] border-[#111111] bg-[#F5EAD7] px-4 py-3.5 sm:py-4 text-base sm:text-lg font-light focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#111111]/55">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="mt-3 w-full border-[3px] border-[#111111] bg-[#F5EAD7] px-4 py-3.5 sm:py-4 text-base sm:text-lg font-light focus:outline-none"
                />
              </label>
            </div>

            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#111111]/55">Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me what you want to build..."
                rows="7"
                className="mt-3 w-full border-[3px] border-[#111111] bg-[#F5EAD7] px-4 py-3.5 sm:py-4 text-base sm:text-lg font-light resize-none focus:outline-none"
              />
            </label>

            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border-[3px] p-4 font-mono text-[11px] uppercase tracking-[0.18em] ${
                  status.error ? 'border-[#F04E23] bg-[#ffe3dc] text-[#8a1f11]' : 'border-[#111111] bg-[#FFD84D] text-[#111111]'
                }`}
              >
                {status.message}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status.submitting}
              className="brut-btn bg-[#F04E23] text-[#FFF8EF] w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 font-heading font-black uppercase tracking-[0.15em] sm:tracking-[0.18em] text-xs sm:text-sm disabled:opacity-40"
            >
              {status.submitting ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
