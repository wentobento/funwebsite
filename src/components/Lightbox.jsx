import React from 'react';
import { X, Download, ExternalLink, Calendar, MapPin, Camera } from 'lucide-react';

export default function Lightbox({ item, type, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pop-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-4xl w-full bg-pop-surface border-2 border-pop-border rounded-2xl overflow-hidden shadow-2xl">
        {/* Top bar with close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-pop-border bg-pop-black/60">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-pop-red" />
            <span className="w-3 h-3 rounded-full bg-pop-yellow" />
            <span className="w-3 h-3 rounded-full bg-pop-blue" />
            <h3 className="font-mono font-bold text-sm text-pop-white ml-2">{item.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-pop-surface hover:bg-pop-border text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Viewer (Photo or Video) */}
        <div className="relative bg-pop-black flex items-center justify-center max-h-[70vh] overflow-hidden">
          {type === 'video' ? (
            <div className="w-full aspect-video">
              <iframe
                src={`${item.embedUrl}?autoplay=1`}
                title={item.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={item.full || item.thumbnail}
              alt={item.title}
              className="max-h-[70vh] w-auto object-contain"
            />
          )}
        </div>

        {/* Metadata Footer */}
        <div className="p-6 bg-pop-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 font-mono text-xs">
            {item.credit && (
              <p className="flex items-center gap-2 text-gray-300">
                <Camera className="w-4 h-4 text-pop-yellow" />
                <span>{item.credit}</span>
              </p>
            )}
            <div className="flex items-center gap-4 text-gray-400">
              {item.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-pop-red" />
                  {item.location}
                </span>
              )}
              {item.year && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-pop-blue" />
                  {item.year}
                </span>
              )}
              {item.venue && <span>{item.venue}</span>}
            </div>
          </div>

          {type === 'photo' && (
            <a
              href={item.full || item.thumbnail}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-pop-blue hover:bg-pop-blue-glow text-white text-xs font-mono font-bold rounded-lg border-2 border-pop-black shadow-pop-solid transition-all hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Hi-Res 300 DPI</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
