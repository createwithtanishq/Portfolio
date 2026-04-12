import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitting: false, success: false, error: true, message: 'Please fill out all fields.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: false, message: '' });

    try {
      const response = await fetch("https://formsubmit.co/ajax/createwithtanishq@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: "New Portfolio Contact Form Submission!"
        })
      });

      if (response.ok) {
        setStatus({ submitting: false, success: true, error: false, message: 'Message sent successfully. I will get back to you soon!' });
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        setStatus({ submitting: false, success: false, error: true, message: 'Oops! Something went wrong. Please try again later.' });
      }
    } catch (error) {
      setStatus({ submitting: false, success: false, error: true, message: 'Oops! Something went wrong. Please check your connection and try again.' });
    }
  };

  return (
    <motion.section 
      id="contact" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="py-32 px-6 max-w-6xl mx-auto w-full border-t border-black/10"
    >
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-6">
        <h2 className="text-4xl md:text-5xl font-bold">Contact</h2>
        <span className="text-sm font-medium tracking-widest uppercase">04 // Connect</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <p className="text-2xl font-light leading-relaxed mb-12 max-w-md">
            Have a project in mind or just want to say hi? I'm always open to discussing new opportunities.
          </p>
          <div className="flex flex-col gap-2 mb-12">
            <h3 className="text-sm uppercase tracking-widest font-semibold mb-4 text-black/60">Email</h3>
            <a href="mailto:createwithtanishq@gmail.com" className="text-xl hover:underline underline-offset-4 decoration-1 w-max">
              createwithtanishq@gmail.com
            </a>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-sm uppercase tracking-widest font-semibold mb-2 text-black/60">Socials</h3>
            <ul className="flex flex-col gap-3">
              {portfolioData.socials.map((social) => (
                <li key={social.platform}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-xl hover:underline underline-offset-4 decoration-1 w-max">
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form className="flex flex-col gap-8 w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name" 
              className="w-full border-b border-black/20 bg-transparent py-4 text-lg font-light placeholder:text-black/30 focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="flex flex-col">
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address" 
              className="w-full border-b border-black/20 bg-transparent py-4 text-lg font-light placeholder:text-black/30 focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="flex flex-col">
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message" 
              rows="4"
              className="w-full border-b border-black/20 bg-transparent py-4 text-lg font-light placeholder:text-black/30 focus:outline-none focus:border-black transition-colors resize-none"
            ></textarea>
          </div>
          
          {status.message && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 text-sm font-medium tracking-wide ${status.error ? 'bg-black/5 text-red-600 border-l-2 border-red-600' : 'bg-black/5 text-green-600 border-l-2 border-green-600'}`}
            >
              {status.message}
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={status.submitting}
            className="self-start mt-2 bg-black text-white px-10 py-4 font-medium uppercase tracking-widest hover:scale-105 transition-transform duration-300 cursor-pointer disabled:opacity-50 disabled:hover:scale-100"
          >
            {status.submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Contact;
