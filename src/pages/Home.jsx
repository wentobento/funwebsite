import React from 'react';
import { artistConfig } from '../data/artistConfig';
import StreamingBadges from '../components/StreamingBadges';
import VisualizerCanvas from '../components/VisualizerCanvas';
import { downloadEPK } from '../utils/epkDownload';
import { Play, Sparkles, Download, ArrowRight, Disc, Calendar, Ticket, Compass } from 'lucide-react';

export default function Home({ onNavigate, onPlayTrack, isPlaying, currentTrack }) {
  const latestRelease = artistConfig.tracks[0];
  const upcomingShow = artistConfig.tourDates[0];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b-2 border-pop-border pop-dots-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Bold Pop-Art Typography & Badges */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category / Genre Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-pop-red text-white font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
                  Electronic Soundscapes
                </span>
                <span className="px-3 py-1 bg-pop-blue text-white font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
                  Generative Pop-Art
                </span>
                <span className="px-3 py-1 bg-pop-yellow text-pop-black font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
                  A/V Interactive
                </span>
              </div>

              {/* Main Artist Headline */}
              <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-pop-white">
                edo<span className="text-pop-yellow">ken</span>
              </h1>

              <p className="font-mono text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
                {artistConfig.tagline}
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onPlayTrack(latestRelease)}
                  className="flex items-center gap-2 px-6 py-3.5 bg-pop-red hover:bg-pop-red-glow text-white font-mono font-bold text-sm uppercase tracking-wider rounded-xl border-2 border-pop-black shadow-pop-solid hover:-translate-y-1 hover:shadow-pop-yellow transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Listen to Latest EP</span>
                </button>

                <button
                  onClick={() => onNavigate('visualizer')}
                  className="flex items-center gap-2 px-6 py-3.5 bg-pop-surface hover:bg-pop-surface-light text-pop-white font-mono font-bold text-sm uppercase tracking-wider rounded-xl border-2 border-pop-border hover:border-pop-blue shadow-pop-solid hover:-translate-y-1 hover:shadow-pop-blue transition-all"
                >
                  <Sparkles className="w-4 h-4 text-pop-yellow" />
                  <span>Launch Visualizer</span>
                </button>
              </div>

              {/* Quick Links to Streaming Services (Requirement 2) */}
              <div className="pt-4 border-t border-pop-border/60">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
                  Stream on preferred platform:
                </p>
                <StreamingBadges />
              </div>
            </div>

            {/* Right Column: Interactive Visualizer Card */}
            <div className="lg:col-span-5">
              <div className="relative p-2 bg-pop-surface border-2 border-pop-border rounded-2xl shadow-pop-solid">
                <VisualizerCanvas height={320} visualMode="primary" isPlaying={isPlaying} />
                <div className="p-4 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-pop-blue animate-pulse" />
                    <span>Real-time Audio Reactive Canvas</span>
                  </div>
                  <button
                    onClick={() => onNavigate('visualizer')}
                    className="text-pop-yellow hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>Full Screen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Page Artist Bio Section (Requirement 10) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-pop-surface border-2 border-pop-border rounded-2xl shadow-pop-solid relative overflow-hidden">
          {/* Pop-art graphic badge in top right */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-pop-blue/20 rounded-full blur-xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-pop-surface-light border border-pop-border rounded-full text-xs font-mono text-pop-yellow font-bold">
                <Compass className="w-3.5 h-3.5" />
                <span>Artist Biography</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-pop-white">
                Suspended between neoclassical silence and modular electricity.
              </h2>
              
              {/* Influences Badges */}
              <div className="pt-2">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Sonic Lineage & Influences:</p>
                <div className="flex flex-wrap gap-2">
                  {artistConfig.bio.influences.map((inf) => (
                    <span
                      key={inf}
                      className="px-2.5 py-1 bg-pop-black border border-pop-border rounded-md text-xs font-mono text-gray-200"
                    >
                      {inf}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              {artistConfig.bio.full.map((paragraph, idx) => (
                <p key={idx} className="font-mono text-base text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Numerical Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-pop-border">
                {artistConfig.bio.stats.map((stat) => (
                  <div key={stat.label} className="p-4 bg-pop-black/60 rounded-xl border border-pop-border text-center">
                    <p className="font-display font-extrabold text-2xl text-pop-yellow">{stat.value}</p>
                    <p className="font-mono text-xs text-gray-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* EPK Download CTA */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <p className="text-xs font-mono text-gray-400">
                  Promoters, booking agents, and journalists can download the complete press kit package:
                </p>
                <button
                  onClick={downloadEPK}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-pop-yellow hover:bg-pop-yellow-light text-pop-black font-mono font-bold text-xs uppercase tracking-wider rounded-lg border-2 border-pop-black shadow-pop-solid hover:-translate-y-0.5 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Press Kit (EPK)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Release & Upcoming Show Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Latest EP Card */}
          <div className="p-6 sm:p-8 bg-pop-surface border-2 border-pop-border rounded-2xl shadow-pop-solid flex flex-col justify-between pop-card-red">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 bg-pop-red text-white text-xs font-mono font-bold rounded">Featured EP</span>
                <span className="text-xs font-mono text-gray-400">{latestRelease.year}</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-pop-white mb-2">{latestRelease.album}</h3>
              <p className="text-sm font-mono text-gray-300 mb-6">{latestRelease.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onPlayTrack(latestRelease)}
                className="flex items-center gap-2 px-4 py-2 bg-pop-red text-white font-mono font-bold text-xs uppercase rounded-lg border border-pop-black shadow-pop-solid hover:-translate-y-0.5 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Play Release</span>
              </button>
              <button
                onClick={() => onNavigate('downloads')}
                className="px-4 py-2 bg-pop-surface-light text-gray-300 hover:text-white font-mono font-bold text-xs uppercase rounded-lg border border-pop-border"
              >
                Download Stems & FLAC
              </button>
            </div>
          </div>

          {/* Next Tour Date Spotlight */}
          <div className="p-6 sm:p-8 bg-pop-surface border-2 border-pop-border rounded-2xl shadow-pop-solid flex flex-col justify-between pop-card-yellow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 bg-pop-yellow text-pop-black text-xs font-mono font-bold rounded">Next Live Performance</span>
                <span className="text-xs font-mono text-pop-red font-bold animate-pulse">{upcomingShow.status}</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-pop-white mb-1">{upcomingShow.city}</h3>
              <p className="text-sm font-mono text-pop-blue font-bold mb-2">{upcomingShow.venue}</p>
              <p className="text-sm font-mono text-gray-300 mb-6">{upcomingShow.event} • {upcomingShow.displayDate}</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={upcomingShow.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-pop-yellow text-pop-black font-mono font-bold text-xs uppercase rounded-lg border border-pop-black shadow-pop-solid hover:-translate-y-0.5 transition-all"
              >
                <Ticket className="w-4 h-4" />
                <span>Get Tickets</span>
              </a>
              <button
                onClick={() => onNavigate('tour')}
                className="px-4 py-2 bg-pop-surface-light text-gray-300 hover:text-white font-mono font-bold text-xs uppercase rounded-lg border border-pop-border"
              >
                View All Tour Dates
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
