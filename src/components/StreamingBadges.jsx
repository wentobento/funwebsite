import React from 'react';
import { artistConfig } from '../data/artistConfig';
import { ExternalLink, Disc3, Radio, Music, PlayCircle } from 'lucide-react';

export default function StreamingBadges({ compact = false }) {
  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'spotify':
        return <Disc3 className="w-4 h-4 text-[#1DB954]" />;
      case 'apple':
        return <Music className="w-4 h-4 text-[#FA243C]" />;
      case 'bandcamp':
        return <Radio className="w-4 h-4 text-[#629AA9]" />;
      case 'soundcloud':
        return <Radio className="w-4 h-4 text-[#FF5500]" />;
      case 'youtube':
        return <PlayCircle className="w-4 h-4 text-[#FF0000]" />;
      default:
        return <Disc3 className="w-4 h-4 text-pop-yellow" />;
    }
  };

  return (
    <div className={`flex flex-wrap gap-2.5 ${compact ? 'justify-start' : 'justify-center sm:justify-start'}`}>
      {artistConfig.streamingLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 bg-pop-surface hover:bg-pop-surface-light border border-pop-border hover:border-pop-blue rounded-lg text-xs font-mono font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pop-blue"
        >
          {getServiceIcon(link.icon)}
          <span className="text-gray-200 group-hover:text-white">{link.name}</span>
          <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-pop-blue transition-colors" />
        </a>
      ))}
    </div>
  );
}
