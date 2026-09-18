'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLFooterElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'luxury',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const guarantees = [
    { icon: '🏆', title: 'High Quality Editing', desc: 'Premium output every time' },
    { icon: '⏰', title: 'On-Time Delivery', desc: 'Never miss a deadline' },
    { icon: '🔄', title: 'Unlimited Revisions*', desc: 'Until you\'re 100% happy' },
    { icon: '💰', title: 'Money Back Guarantee', desc: 'Risk-free investment' },
    { icon: '⭐', title: '100% Satisfaction', desc: 'Client happiness guaranteed' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-gold-600/20 bg-dark-950/80 backdrop-blur-xl"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="font-serif text-xl font-bold text-dark-950">D</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-platinum-100">DARK</h3>
                <p className="font-display text-xs font-medium text-gold-400 tracking-wider">EDITING AND WEBSITE</p>
              </div>
            </div>
            <p className="font-sans text-platinum-300 leading-relaxed max-w-xs">
              Transforming ideas into masterpieces with premium video editing, motion graphics, and modern web design.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-platinum-100 mb-6">Quick Links</h4>
            <nav className="space-y-3" aria-label="Footer navigation">
              <a href="#services" className="font-sans text-platinum-300 hover:text-gold-400 transition-colors block">Services</a>
              <a href="#pricing" className="font-sans text-platinum-300 hover:text-gold-400 transition-colors block">Pricing</a>
              <a href="#contact" className="font-sans text-platinum-300 hover:text-gold-400 transition-colors block">Contact</a>
              <a href="https://wa.me/919209358212" target="_blank" rel="noopener noreferrer" className="font-sans text-platinum-300 hover:text-gold-400 transition-colors block">WhatsApp</a>
              <a href="https://instagram.com/darkeditingandwebsite" target="_blank" rel="noopener noreferrer" className="font-sans text-platinum-300 hover:text-gold-400 transition-colors block">Instagram</a>
            </nav>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-platinum-100 mb-6">Services</h4>
            <ul className="space-y-2 text-sm" role="list">
              <li className="font-sans text-platinum-300 hover:text-gold-400 transition-colors cursor-default">Video Editing</li>
              <li className="font-sans text-platinum-300 hover:text-gold-400 transition-colors cursor-default">Graphics & Motion</li>
              <li className="font-sans text-platinum-300 hover:text-gold-400 transition-colors cursor-default">Social Media Content</li>
              <li className="font-sans text-platinum-300 hover:text-gold-400 transition-colors cursor-default">Website Design</li>
              <li className="font-sans text-platinum-300 hover:text-gold-400 transition-colors cursor-default">Brand Editing</li>
              <li className="font-sans text-platinum-300 hover:text-gold-400 transition-colors cursor-default">Color Grading</li>
              <li className="font-sans text-platinum-300 hover:text-gold-400 transition-colors cursor-default">Reels & Shorts</li>
              <li className="font-sans text-platinum-300 hover:text-gold-400 transition-colors cursor-default">SEO & Digital Support</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-600/20 pt-12 mb-12">
          <h4 className="font-serif text-xl font-bold text-platinum-100 text-center mb-8">Our Guarantees</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {guarantees.map((guarantee) => (
              <div key={guarantee.title} className="text-center p-4 rounded-xl bg-dark-900/50 border border-gold-500/10 hover:border-gold-400/30 transition-all">
                <div className="text-3xl mb-2">{guarantee.icon}</div>
                <h5 className="font-serif text-sm font-bold text-platinum-100 mb-1">{guarantee.title}</h5>
                <p className="font-sans text-xs text-platinum-400">{guarantee.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gold-600/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-sm text-platinum-400 text-center md:text-left">
              © {new Date().getFullYear()} DARK EDITING AND WEBSITE. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://wa.me/919209358212" target="_blank" rel="noopener noreferrer" className="text-platinum-400 hover:text-gold-400 transition-colors" aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
              <a href="https://instagram.com/darkeditingandwebsite" target="_blank" rel="noopener noreferrer" className="text-platinum-400 hover:text-gold-400 transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
            <p className="font-sans text-xs text-platinum-500 text-center md:text-right">
              Made with <span className="text-gold-400">♥</span> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}