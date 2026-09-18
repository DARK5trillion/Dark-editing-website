'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GoldButton } from '@/components/ui/GoldButton';
import { GlassCard } from '@/components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLSectionElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'luxury',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919209358212'}?text=${encodeURIComponent(
      `Hello! I'm ${formData.name}. ${formData.message} My email: ${formData.email}, Phone: ${formData.phone}. Interested in: ${formData.service}`
    )}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-20 px-6 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="contact-heading" className="font-serif text-4xl md:text-6xl font-bold text-platinum-100 mb-4">
            Let's <span className="text-gold-400">Create Together</span>
          </h2>
          <p className="font-sans text-lg text-platinum-300 max-w-2xl mx-auto">
            Ready to transform your vision into a masterpiece? Let's talk about your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <GlassCard className="p-8">
              <h3 className="font-serif text-2xl font-bold text-platinum-100 mb-6 text-center">
                Direct Contact
              </h3>
              <div className="space-y-6">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919209358212'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-dark-800/50 border border-gold-500/20 hover:border-gold-400/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-400/20 flex items-center justify-center group-hover:bg-gold-400/40 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-400">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-platinum-400">WhatsApp</p>
                    <p className="font-display text-lg font-semibold text-platinum-100">+91 92093 58212</p>
                  </div>
                </a>
                <a
                  href={`https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'darkeditingandwebsite'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-dark-800/50 border border-gold-500/20 hover:border-gold-400/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-400/20 flex items-center justify-center group-hover:bg-gold-400/40 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-400">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-platinum-400">Instagram</p>
                    <p className="font-display text-lg font-semibold text-platinum-100">@darkeditingandwebsite</p>
                  </div>
                </a>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h3 className="font-serif text-2xl font-bold text-platinum-100 mb-6 text-center">
                Working Hours
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-dark-800/50 border border-gold-500/10">
                  <span className="font-sans text-platinum-200">Monday – Saturday</span>
                  <span className="font-display font-semibold text-gold-400">5:00 PM – 9:00 PM</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-dark-800/50 border border-gold-500/10">
                  <span className="font-sans text-platinum-200">Sunday</span>
                  <span className="font-display font-semibold text-gold-400">Whole Day</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 text-center">
              <h3 className="font-serif text-2xl font-bold text-platinum-100 mb-4">
                Scan & Follow
              </h3>
              <div className="w-40 h-40 mx-auto mb-4 rounded-xl bg-platinum-100 flex items-center justify-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-dark-900">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="4" height="4" />
                  <rect x="18" y="18" width="3" height="3" />
                  <rect x="8" y="8" width="3" height="3" />
                  <rect x="8" y="16" width="2" height="2" />
                  <rect x="16" y="8" width="2" height="2" />
                </svg>
              </div>
              <p className="font-sans text-platinum-300">QR Code to Instagram</p>
            </GlassCard>
          </div>

          <GlassCard className="p-8">
            <h3 className="font-serif text-2xl font-bold text-platinum-100 mb-8 text-center">
              Project Inquiry
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-sans text-sm text-platinum-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-gold-500/20 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20 text-platinum-100 placeholder-platinum-500 transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-sans text-sm text-platinum-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-gold-500/20 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20 text-platinum-100 placeholder-platinum-500 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block font-sans text-sm text-platinum-300 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-gold-500/20 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20 text-platinum-100 placeholder-platinum-500 transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block font-sans text-sm text-platinum-300 mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-gold-500/20 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20 text-platinum-100 transition-all appearance-none"
                  >
                    <option value="">Select a service</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Graphics & Motion">Graphics & Motion</option>
                    <option value="Social Media Content">Social Media Content</option>
                    <option value="Website Design">Website Design</option>
                    <option value="Brand Editing">Brand Editing</option>
                    <option value="Color Grading">Color Grading</option>
                    <option value="Reels & Shorts">Reels & Shorts</option>
                    <option value="SEO & Digital Support">SEO & Digital Support</option>
                    <option value="Epic Monthly">Epic Monthly</option>
                    <option value="Pro Website">Pro Website</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block font-sans text-sm text-platinum-300 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-gold-500/20 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20 text-platinum-100 placeholder-platinum-500 transition-all resize-none"
                  placeholder="Tell us about your project, timeline, and any specific requirements..."
                />
              </div>
              <GoldButton
                type="submit"
                label={submitted ? 'Sent! Redirecting...' : 'Send via WhatsApp'}
                icon="💬"
                className="w-full"
                disabled={submitted}
              />
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}