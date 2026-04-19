import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: false, message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitting: false, success: false, error: true, message: 'Please fill out all fields.' });
      return;
    }
    setStatus({ submitting: true, success: false, error: false, message: '' });
    try {
      const response = await fetch("https://formsubmit.co/ajax/createwithtanishq@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "New Portfolio Contact Form Submission!"
        })
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
    <section id="contact" className="border-b-2 border-[#0D0D0D] bg-[#F4EFE6]">

      {/* Section header */}
      <div className="border-b-2 border-[#0D0D0D] px-6 md:px-12 py-5 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="font-mono font-bold text-4xl text-[#0D0D0D]/10 leading-none select-none">04</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight">Contact</h2>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#0D0D0D]/40 hidden md:block">Connect</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">

        {/* Big CTA line */}
        <motion.p
          className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-tight mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Let's build something together.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="brut-card bg-white p-8 mb-6">
              <p className="font-mono text-xs uppercase tracking-widest text-[#0D0D0D]/50 mb-3">Email</p>
              <a
                href="mailto:createwithtanishq@gmail.com"
                className="font-heading font-bold text-xl md:text-2xl hover:text-[#F0E040] hover:bg-[#0D0D0D] px-1 -mx-1 transition-colors duration-150 break-all"
              >
                createwithtanishq@gmail.com
              </a>
            </div>

            <div className="brut-card bg-white p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-[#0D0D0D]/50 mb-6">Socials</p>
              <ul className="flex flex-col gap-0 border-t-2 border-[#0D0D0D]">
                {portfolioData.socials.map((social) => (
                  <li key={social.platform} className="border-b-2 border-[#0D0D0D]">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-4 px-2 font-heading font-bold text-lg hover:bg-[#F0E040] transition-colors duration-150 group"
                    >
                      {social.platform}
                      <span className="group-hover:translate-x-1 transition-transform duration-150">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.form
            onSubmit={handleSubmit}
            className="brut-card bg-white p-8 flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest text-[#0D0D0D]/50">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="border-b-2 border-[#0D0D0D] bg-transparent py-3 text-lg font-light placeholder:text-[#0D0D0D]/25 focus:outline-none focus:border-[#F0E040] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest text-[#0D0D0D]/50">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="border-b-2 border-[#0D0D0D] bg-transparent py-3 text-lg font-light placeholder:text-[#0D0D0D]/25 focus:outline-none focus:border-[#F0E040] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest text-[#0D0D0D]/50">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows="5"
                className="border-b-2 border-[#0D0D0D] bg-transparent py-3 text-lg font-light placeholder:text-[#0D0D0D]/25 focus:outline-none focus:border-[#F0E040] transition-colors resize-none"
              />
            </div>

            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border-2 p-4 font-mono text-xs uppercase tracking-wide ${
                  status.error
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-green-500 bg-green-50 text-green-700'
                }`}
              >
                {status.message}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status.submitting}
              className="brut-btn self-start mt-2 bg-[#0D0D0D] text-[#F4EFE6] px-10 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-[#F0E040] hover:text-[#0D0D0D] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status.submitting ? 'Sending...' : 'Send Message →'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
