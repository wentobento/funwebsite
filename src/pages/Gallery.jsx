import React, { useState } from 'react';
import { artistConfig } from '../data/artistConfig';
import Lightbox from '../components/Lightbox';
import { downloadEPK } from '../utils/epkDownload';
import { Play, Download, Camera, Video, Sparkles, Filter } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [activeItem, setActiveItem] = useState(null);
  const [activeType, setActiveType] = useState('photo');

  const photos = artistConfig.pressGallery.photos;
  const videos = artistConfig.pressGallery.videos;

  const filteredPhotos = filter === 'all' || filter === 'photos'
    ? photos
    : filter === 'live'
    ? photos.filter(p => p.category === 'Live')
    : filter === 'studio'
    ? photos.filter(p => p.category === 'Studio')
    : [];

  const showVideos = filter === 'all' || filter === 'videos';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-pop-border pb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-pop-red text-white font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
              Press & Media
            </span>
            <span className="px-3 py-1 bg-pop-yellow text-pop-black font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
              Live Performances
            </span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-pop-white">
            Live Photos & <span className="text-pop-yellow">Performance Videos</span>
          </h1>
          <p className="font-mono text-gray-300 mt-2 max-w-2xl text-sm sm:text-base">
            High-resolution press photos from worldwide performances, modular improvisations, and official A/V video recordings. Click any image to view in full resolution or download.
          </p>
        </div>

        {/* EPK Download Action */}
        <button
          onClick={downloadEPK}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-pop-yellow hover:bg-pop-yellow-light text-pop-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-pop-black shadow-pop-solid hover:-translate-y-0.5 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Download All Press Assets (ZIP)</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Media' },
          { id: 'photos', label: 'All Photos' },
          { id: 'live', label: 'Live Concerts' },
          { id: 'studio', label: 'Studio & Synthesizers' },
          { id: 'videos', label: 'Performance Videos' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              filter === tab.id
                ? 'bg-pop-blue text-white shadow-pop-solid border-2 border-pop-black -translate-y-0.5'
                : 'bg-pop-surface text-gray-400 hover:text-white border border-pop-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Live Videos Section (if visible) */}
      {showVideos && (
        <div className="space-y-4">
          <h2 className="font-display font-bold text-2xl text-pop-white flex items-center gap-2">
            <Video className="w-5 h-5 text-pop-red" />
            <span>Featured Live Performance Videos</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => {
                  setActiveItem(vid);
                  setActiveType('video');
                }}
                className="group relative bg-pop-surface border-2 border-pop-border hover:border-pop-red rounded-2xl overflow-hidden shadow-pop-solid cursor-pointer transition-all duration-200 hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden bg-pop-black">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                  />
                  <div className="absolute inset-0 bg-pop-black/30 group-hover:bg-pop-black/10 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-pop-red group-hover:bg-pop-red-glow text-white flex items-center justify-center border-2 border-pop-black shadow-pop-solid group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 px-2 py-1 bg-pop-black/80 font-mono text-xs text-white rounded border border-pop-border">
                    {vid.duration}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-mono font-bold text-base text-pop-white group-hover:text-pop-yellow transition-colors">
                    {vid.title}
                  </h3>
                  <p className="font-mono text-xs text-gray-400 mt-1">{vid.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photo Gallery Grid */}
      {filteredPhotos.length > 0 && (
        <div className="space-y-4 pt-4">
          <h2 className="font-display font-bold text-2xl text-pop-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-pop-yellow" />
            <span>Press & Live Performance Photography</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => {
                  setActiveItem(photo);
                  setActiveType('photo');
                }}
                className="group relative bg-pop-surface border-2 border-pop-border hover:border-pop-blue rounded-2xl overflow-hidden shadow-pop-solid cursor-pointer transition-all duration-200 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-pop-black">
                  <img
                    src={photo.thumbnail}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 bg-pop-black/80 font-mono text-[10px] text-pop-yellow font-bold uppercase rounded border border-pop-border">
                      {photo.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-mono font-bold text-sm text-pop-white group-hover:text-pop-blue transition-colors line-clamp-1">
                      {photo.title}
                    </h3>
                    <p className="font-mono text-xs text-gray-400 mt-1 line-clamp-1">{photo.credit}</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-pop-border flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span>{photo.location}</span>
                    <span>{photo.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {activeItem && (
        <Lightbox
          item={activeItem}
          type={activeType}
          onClose={() => setActiveItem(null)}
        />
      )}
    </div>
  );
}
