import React, { useState } from 'react';
import { downloadEPK } from '../utils/epkDownload';
import { Download, Music, Menu, X, Disc3, Radio } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, isPlaying }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home & Bio' },
    { id: 'visualizer', label: 'Music & Visualizer', highlight: true },
    { id: 'tour', label: 'Tour & Shows' },
    { id: 'gallery', label: 'Press & Live' },
    { id: 'store', label: 'Store' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-pop-black/95 backdrop-blur-md border-b-2 border-pop-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Artist Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          {/* Pop-Art Geometric Badge */}
          <div className="relative w-10 h-10 flex items-center justify-center bg-pop-red rounded-lg border-2 border-pop-black shadow-pop-solid transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-pop-yellow">
            <span className="w-4 h-4 rounded-full bg-pop-yellow border border-pop-black"></span>
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-pop-blue border border-pop-black"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-2xl tracking-tighter text-pop-white group-hover:text-pop-yellow transition-colors">
                edoken
              </span>
              {isPlaying && (
                <span className="flex items-center gap-0.5 h-3">
                  <span className="w-1 bg-pop-red h-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-1 bg-pop-yellow h-2/3 animate-[pulse_0.8s_ease-in-out_infinite_0.2s]" />
                  <span className="w-1 bg-pop-blue h-full animate-[pulse_0.7s_ease-in-out_infinite_0.4s]" />
                </span>
              )}
            </div>
            <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">A/V & Electronic Music</p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-mono font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-pop-blue text-white shadow-pop-solid font-bold -translate-y-0.5'
                    : 'text-gray-300 hover:text-white hover:bg-pop-surface'
                } ${item.highlight && !isActive ? 'text-pop-yellow hover:text-white' : ''}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons (EPK + Mobile Toggle) */}
        <div className="flex items-center gap-3">
          {/* Downloadable EPK Button (Requirement 7) */}
          <button
            onClick={downloadEPK}
            title="Download Official 2026 Press Kit & Technical Rider"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 bg-pop-yellow hover:bg-pop-yellow-light text-pop-black font-mono font-bold text-xs uppercase tracking-wider rounded-lg border-2 border-pop-black shadow-pop-solid hover:-translate-y-0.5 hover:shadow-pop-red transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Download EPK</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-pop-surface border border-pop-border text-gray-200 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-pop-border bg-pop-surface/98 px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-mono font-medium transition-colors ${
                activePage === item.id
                  ? 'bg-pop-blue text-white font-bold'
                  : 'text-gray-300 hover:bg-pop-surface-light hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-pop-border">
            <button
              onClick={() => {
                downloadEPK();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-pop-yellow text-pop-black font-mono font-bold text-xs uppercase tracking-wider rounded-lg border-2 border-pop-black shadow-pop-solid"
            >
              <Download className="w-4 h-4" />
              <span>Download Official EPK Bundle</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
