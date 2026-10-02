import React from 'react';
import { artistConfig } from '../data/artistConfig';
import { Ticket, MapPin, Calendar, ExternalLink, Radio, Sparkles } from 'lucide-react';

export default function Tour({ onNavigate }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* Header */}
      <div className="border-b-2 border-pop-border pb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-pop-yellow text-pop-black font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
            Live Tour 2026
          </span>
          <span className="px-3 py-1 bg-pop-red text-white font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
            Audiovisual Performance
          </span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-pop-white">
          Upcoming <span className="text-pop-blue">Shows & Tour Dates</span>
        </h1>
        <p className="font-mono text-gray-300 mt-2 max-w-2xl text-sm sm:text-base">
          Experience edoken's live hybrid modular synthesizers and real-time reactive visuals. Each performance features unique generative improvisations and acoustic-electronic interplay.
        </p>
      </div>

      {/* Tour Dates List */}
      <div className="space-y-4">
        {artistConfig.tourDates.map((show) => {
          const isSoldOut = show.status === 'Sold Out';
          const isSellingFast = show.status === 'Selling Fast';

          return (
            <div
              key={show.id}
              className="p-6 sm:p-8 bg-pop-surface border-2 border-pop-border rounded-2xl shadow-pop-solid hover:border-pop-blue transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 pop-card"
            >
              {/* Date Block */}
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 flex-shrink-0 bg-pop-black rounded-xl border-2 border-pop-border flex flex-col items-center justify-center text-center">
                  <span className="font-mono text-xs font-bold text-pop-red uppercase">
                    {show.displayDate.split(' ')[0]}
                  </span>
                  <span className="font-display font-extrabold text-2xl text-pop-white leading-none mt-1">
                    {show.displayDate.split(' ')[1].replace(',', '')}
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 mt-0.5">
                    {show.displayDate.split(' ')[2]}
                  </span>
                </div>

                {/* City & Venue */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display font-bold text-xl sm:text-2xl text-pop-white">
                      {show.city}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded ${
                        isSoldOut
                          ? 'bg-pop-border text-gray-400'
                          : isSellingFast
                          ? 'bg-pop-red text-white animate-pulse'
                          : 'bg-pop-blue text-white'
                      }`}
                    >
                      {show.status}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-pop-yellow font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-pop-red" />
                    <span>{show.venue}</span>
                  </p>
                  <p className="font-mono text-xs text-gray-400 mt-1">{show.event}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-4">
                {isSoldOut ? (
                  <button
                    disabled
                    className="px-6 py-3 bg-pop-black text-gray-500 font-mono font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-pop-border cursor-not-allowed"
                  >
                    Sold Out
                  </button>
                ) : (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-pop-yellow hover:bg-pop-yellow-light text-pop-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-pop-black shadow-pop-solid hover:-translate-y-0.5 hover:shadow-pop-red transition-all"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Get Tickets</span>
                    <ExternalLink className="w-3.5 h-3.5 text-pop-black/60" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking CTA for Promoters */}
      <div className="p-8 bg-pop-surface rounded-2xl border-2 border-pop-border shadow-pop-solid relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <h3 className="font-display font-bold text-2xl text-pop-white">Want to book edoken in your city?</h3>
            <p className="font-mono text-xs sm:text-sm text-gray-300">
              For festivals, club nights, audiovisual installations, and modular synthesizer masterclasses worldwide:
            </p>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-pop-blue hover:bg-pop-blue-glow text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-pop-black shadow-pop-solid hover:-translate-y-0.5 transition-all"
            >
              Contact Booking Agency
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
