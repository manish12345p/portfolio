'use client';

import React, { useState, useEffect } from 'react';
import { site } from '@/config/site';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#work', id: 'work' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;

      for (const item of navLinks) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            return;
          }
        }
      }

      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 h-[72px] w-full border-b border-[var(--line)] bg-white/90 backdrop-blur-md transition-colors duration-200">
      <div className="w-full max-w-[1160px] h-full mx-auto px-[var(--container-pad)] flex items-center justify-between">
        
        {/* Left: Round "MC" Logo Mark + Name */}
        <a
          href="#top"
          className="flex items-center gap-3 text-[var(--ink)] hover:opacity-90 transition-opacity group"
          aria-label={site.name}
        >
          <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--red)] via-[var(--burgundy)] to-[var(--maroon)] text-white flex items-center justify-center font-display text-sm font-bold shadow-xs group-hover:scale-105 transition-transform duration-200">
            MC
          </span>
          <span className="font-display text-lg sm:text-xl font-medium tracking-tight text-[var(--ink)]">
            {site.name}
          </span>
        </a>

        {/* Right Desktop Nav (visible at >= 860px) */}
        <nav className="hidden min-[860px]:flex items-center gap-8 text-[15px] font-medium" aria-label="Main navigation">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative py-1 transition-colors duration-200 group ${
                  isActive ? 'text-[var(--red)] font-semibold' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] w-full bg-[var(--red)] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Hamburger Menu Button (visible under 860px) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="min-[860px]:hidden w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5 text-[var(--ink)] border border-[var(--line)] bg-[var(--soft)] cursor-pointer"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-5 h-[2px] bg-current transition-transform duration-200 origin-center ${
              mobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-current transition-opacity duration-200 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-current transition-transform duration-200 origin-center ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''
            }`}
          />
        </button>

      </div>

      {/* Clean Full-width Dropdown Menu under 860px */}
      {mobileMenuOpen && (
        <div className="min-[860px]:hidden border-b border-[var(--line)] bg-white px-[var(--container-pad)] py-4 flex flex-col gap-3 shadow-lg">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[var(--ink)] py-2 border-b border-[var(--line)]/50 last:border-b-0 hover:text-[var(--red)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export { Header };
