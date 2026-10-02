import React, { useState } from 'react';
import { artistConfig } from '../data/artistConfig';
import { downloadEPK } from '../utils/epkDownload';
import { Mail, Send, CheckCircle, ExternalLink, MapPin, Download, Radio, Disc3, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Booking Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: 'Booking Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* Header */}
      <div className="border-b-2 border-pop-border pb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-pop-yellow text-pop-black font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
            Get In Touch
          </span>
          <span className="px-3 py-1 bg-pop-red text-white font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
            Booking & Management
          </span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-pop-white">
          Contact & <span className="text-pop-blue">Socials</span>
        </h1>
        <p className="font-mono text-gray-300 mt-2 max-w-2xl text-sm sm:text-base">
          Direct communication channels for worldwide tour booking, scoring commissions, press interviews, and collaboration inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Emails, Location & Social Matrix */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct Email Inboxes */}
          <div className="p-6 bg-pop-surface border-2 border-pop-border rounded-2xl shadow-pop-solid space-y-4">
            <h2 className="font-display font-bold text-xl text-pop-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-pop-red" />
              <span>Direct Inboxes</span>
            </h2>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-pop-black/60 rounded-xl border border-pop-border flex items-center justify-between">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Tour & Concert Bookings</span>
                  <a href={`mailto:${artistConfig.contact.bookingEmail}`} className="text-pop-yellow font-bold text-sm hover:underline">
                    {artistConfig.contact.bookingEmail}
                  </a>
                </div>
                <Mail className="w-4 h-4 text-pop-yellow" />
              </div>

              <div className="p-3 bg-pop-black/60 rounded-xl border border-pop-border flex items-center justify-between">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Press & Media Inquiries</span>
                  <a href={`mailto:${artistConfig.contact.pressEmail}`} className="text-pop-blue font-bold text-sm hover:underline">
                    {artistConfig.contact.pressEmail}
                  </a>
                </div>
                <Mail className="w-4 h-4 text-pop-blue" />
              </div>

              <div className="p-3 bg-pop-black/60 rounded-xl border border-pop-border flex items-center justify-between">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Artist Management</span>
                  <a href={`mailto:${artistConfig.contact.managementEmail}`} className="text-pop-white font-bold text-sm hover:underline">
                    {artistConfig.contact.managementEmail}
                  </a>
                </div>
                <Mail className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 font-mono text-xs text-gray-400">
              <MapPin className="w-4 h-4 text-pop-red" />
              <span>Studio: {artistConfig.contact.studio}</span>
            </div>
          </div>

          {/* Social Media Links Matrix (Requirement 6) */}
          <div className="p-6 bg-pop-surface border-2 border-pop-border rounded-2xl shadow-pop-solid space-y-4">
            <h2 className="font-display font-bold text-xl text-pop-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-pop-yellow" />
              <span>Social Channels</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {artistConfig.socialLinks.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-pop-black hover:bg-pop-surface-light border border-pop-border hover:border-pop-blue rounded-xl flex items-center justify-between transition-all group"
                >
                  <div>
                    <span className="font-display font-bold text-xs text-pop-white block group-hover:text-pop-yellow transition-colors">
                      {soc.name}
                    </span>
                    <span className="font-mono text-[11px] text-gray-400">{soc.handle}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-pop-blue transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Downloadable EPK Box (Requirement 7) */}
          <div className="p-6 bg-gradient-to-br from-pop-surface via-pop-surface-light to-pop-black border-2 border-pop-border rounded-2xl shadow-pop-solid flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-lg text-pop-white">Need the Press Kit?</h3>
              <p className="font-mono text-xs text-gray-400 mt-1">Download bio, tech plot, and 300 DPI photos.</p>
            </div>
            <button
              onClick={downloadEPK}
              className="px-4 py-2.5 bg-pop-yellow hover:bg-pop-yellow-light text-pop-black font-mono font-bold text-xs uppercase rounded-xl border-2 border-pop-black shadow-pop-solid flex items-center gap-2 hover:-translate-y-0.5 transition-all flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>EPK</span>
            </button>
          </div>

        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 bg-pop-surface border-2 border-pop-border rounded-2xl shadow-pop-solid space-y-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-pop-blue" />
              <h2 className="font-display font-bold text-2xl text-pop-white">Send a Direct Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase font-bold">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Kenji Sato"
                    className="w-full px-4 py-3 bg-pop-black border border-pop-border focus:border-pop-blue rounded-xl text-pop-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pop-blue"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase font-bold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="promoter@venue.com"
                    className="w-full px-4 py-3 bg-pop-black border border-pop-border focus:border-pop-blue rounded-xl text-pop-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pop-blue"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 uppercase font-bold">Inquiry Type</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-pop-black border border-pop-border focus:border-pop-blue rounded-xl text-pop-white focus:outline-none focus:ring-1 focus:ring-pop-blue"
                >
                  <option value="Booking Inquiry">Tour & Festival Booking Inquiry</option>
                  <option value="Press & Media">Press, Interview & Media Coverage</option>
                  <option value="Licensing & Film Scoring">Licensing & Original Film Scoring</option>
                  <option value="Modular Synthesis Collaboration">Modular Synthesis Collaboration</option>
                  <option value="General Hello">General Message</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 uppercase font-bold">Message Details</label>
                <textarea
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide event date, city, venue capacity, or project scope..."
                  className="w-full px-4 py-3 bg-pop-black border border-pop-border focus:border-pop-blue rounded-xl text-pop-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pop-blue resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-pop-red hover:bg-pop-red-glow text-white font-mono font-bold text-sm uppercase tracking-wider rounded-xl border-2 border-pop-black shadow-pop-solid hover:-translate-y-0.5 hover:shadow-pop-yellow transition-all"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Message Sent to edoken Management!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
