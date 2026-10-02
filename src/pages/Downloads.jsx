import React, { useState } from 'react';
import { artistConfig } from '../data/artistConfig';
import { Download, ExternalLink, Disc, FileAudio, CheckCircle, Radio } from 'lucide-react';

export default function Downloads() {
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const handleInstantDownload = (item) => {
    // Generate a dummy downloadable bundle with README and stems description
    const fileContent = `================================================================================
edoken — ${item.title}
Format: ${item.format}
Official Bandcamp: ${item.bandcampUrl}
================================================================================

Thank you for downloading ${item.title}!

Included in this release:
- High-fidelity audio masters (24-bit 48kHz FLAC / 320kbps MP3)
- Vector artwork & printable album insert (300 DPI PDF)
- Complete synthesizer patch notes & live performance documentation

Sonic Lineage:
Inspired by Ryuichi Sakamoto, Floating Points, Four Tet, Porter Robinson.

For bookings & inquiries: booking@edoken.com
Follow on Bandcamp: https://edoken.bandcamp.com
`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.replace(/[^a-zA-Z0-9]/g, '_')}_Bundle.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(item.id);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* Header */}
      <div className="border-b-2 border-pop-border pb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-pop-red text-white font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
            Bandcamp Integration
          </span>
          <span className="px-3 py-1 bg-pop-blue text-white font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
            Digital Downloads & Stems
          </span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-pop-white">
          Bandcamp & <span className="text-pop-yellow">Digital Downloads</span>
        </h1>
        <p className="font-mono text-gray-300 mt-2 max-w-2xl text-sm sm:text-base">
          Direct downloads of high-resolution 24-bit audio releases, multi-channel soundboard stems for remixers, and embedded Bandcamp streaming players.
        </p>
      </div>

      {/* Embedded Bandcamp Player Section */}
      <div className="p-6 sm:p-8 bg-pop-surface border-2 border-pop-border rounded-2xl shadow-pop-solid space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-2xl text-pop-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-pop-red" />
              <span>Official Bandcamp Player</span>
            </h2>
            <p className="font-mono text-xs text-gray-400 mt-1">
              Stream full discography directly on Bandcamp or support the artist directly.
            </p>
          </div>
          <a
            href="https://edoken.bandcamp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-pop-black hover:bg-pop-surface-light text-pop-white font-mono font-bold text-xs uppercase rounded-xl border border-pop-border transition-colors"
          >
            <span>Visit edoken.bandcamp.com</span>
            <ExternalLink className="w-3.5 h-3.5 text-pop-blue" />
          </a>
        </div>

        {/* Bandcamp Embed Container */}
        <div className="w-full rounded-xl overflow-hidden border border-pop-border bg-pop-black p-2">
          {/* Mock Bandcamp Player with real streaming UI and direct links */}
          <div className="p-6 bg-gradient-to-r from-pop-black via-pop-surface to-pop-black rounded-lg border border-pop-border flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-pop-blue rounded-xl flex items-center justify-center border-2 border-pop-black shadow-pop-solid">
                <Disc className="w-10 h-10 text-white animate-spin-slow" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-pop-yellow font-bold uppercase tracking-wider">Bandcamp Featured Album</span>
                <h3 className="font-display font-bold text-xl text-pop-white">Prismatic Frequencies EP</h3>
                <p className="font-mono text-xs text-gray-400 mt-0.5">edoken • 4 Tracks • 24-bit Lossless</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://edoken.bandcamp.com/album/prismatic-frequencies"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#629AA9] hover:bg-[#528290] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl border border-pop-black shadow-pop-solid hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>Buy / Stream on Bandcamp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Download Packages Grid */}
      <div className="space-y-4">
        <h2 className="font-display font-bold text-2xl text-pop-white flex items-center gap-2">
          <FileAudio className="w-5 h-5 text-pop-yellow" />
          <span>Available Digital Downloads & Sound Packs</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artistConfig.digitalDownloads.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-pop-surface border-2 border-pop-border rounded-2xl shadow-pop-solid hover:border-pop-yellow transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-pop-black font-mono text-[10px] text-pop-yellow font-bold uppercase rounded border border-pop-border">
                    {item.format}
                  </span>
                  <span className="font-mono text-xs text-gray-400">{item.size}</span>
                </div>

                <h3 className="font-display font-bold text-lg text-pop-white">{item.title}</h3>
                <p className="font-mono text-xs text-gray-300 leading-relaxed">{item.notes}</p>
              </div>

              <div className="pt-6 space-y-2">
                <button
                  onClick={() => handleInstantDownload(item)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-pop-yellow hover:bg-pop-yellow-light text-pop-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-pop-black shadow-pop-solid hover:-translate-y-0.5 transition-all"
                >
                  {downloadSuccess === item.id ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-pop-black" />
                      <span>Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Instant Download</span>
                    </>
                  )}
                </button>

                <a
                  href={item.bandcampUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 text-gray-400 hover:text-white font-mono text-xs"
                >
                  <span>Bandcamp release page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
