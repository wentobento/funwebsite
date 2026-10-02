import React, { useState, useRef } from 'react';
import { artistConfig } from '../data/artistConfig';
import VisualizerCanvas from '../components/VisualizerCanvas';
import { soundEngine } from '../audio/SynthesizedAudioEngine';
import { Play, Pause, Upload, Sparkles, Sliders, Music, Info, HelpCircle } from 'lucide-react';

export default function MusicVisualizer({
  currentTrack,
  isPlaying,
  onPlayTrack,
  onPlayPause
}) {
  const [visualMode, setVisualMode] = useState('primary');
  const [uploadedTrackName, setUploadedTrackName] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    soundEngine.loadUserAudioFile(file, (fileName, duration) => {
      setUploadedTrackName(fileName);
      onPlayTrack({
        id: `user-${fileName}`,
        title: fileName.replace(/\.[^/.]+$/, ''),
        album: 'Custom User Upload',
        year: 'Live',
        genre: 'User Audio File',
        duration: `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`,
        bpm: 'Live FFT',
        key: 'Dynamic'
      });
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-pop-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-pop-blue text-white font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
              Web Audio API 60FPS
            </span>
            <span className="px-3 py-1 bg-pop-yellow text-pop-black font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
              Interactive Physics
            </span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-pop-white">
            Harmonic <span className="text-pop-red">Visualizer</span>
          </h1>
          <p className="font-mono text-sm sm:text-base text-gray-300 mt-2 max-w-2xl">
            A dynamic oscilloscope and harmonic particle field inspired by Ryuichi Sakamoto and Floating Points. Sound waves deform in real time, and cursor motion generates gravitational ripples and glowing stardust trails.
          </p>
        </div>

        {/* Visualizer Preset Switcher & Audio Uploader */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Selector */}
          <div className="inline-flex p-1 bg-pop-surface rounded-xl border border-pop-border">
            <button
              onClick={() => setVisualMode('primary')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                visualMode === 'primary'
                  ? 'bg-pop-red text-white shadow-pop-solid'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Primary Pop
            </button>
            <button
              onClick={() => setVisualMode('monochrome')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                visualMode === 'monochrome'
                  ? 'bg-pop-white text-pop-black shadow-pop-solid'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Zen Monochrome
            </button>
          </div>

          {/* Upload Custom Audio File Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="audio/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="flex items-center gap-2 px-3.5 py-2 bg-pop-yellow hover:bg-pop-yellow-light text-pop-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-pop-black shadow-pop-solid hover:-translate-y-0.5 transition-all"
            title="Visualize your own MP3, WAV or FLAC track"
          >
            <Upload className="w-4 h-4" />
            <span>Drop In Audio</span>
          </button>
        </div>
      </div>

      {/* Main Full-Size Visualizer Canvas */}
      <div className="space-y-4">
        <VisualizerCanvas height={540} visualMode={visualMode} isPlaying={isPlaying} />

        {/* Interactive Physics Instructions Bar */}
        <div className="p-4 bg-pop-surface border border-pop-border rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-gray-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pop-yellow" />
            <span><strong>Cursor Physics:</strong> Sweep mouse across canvas to deflect stardust particles and stretch audio waveforms.</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <span>BPM: <strong className="text-pop-white">{currentTrack?.bpm || '120'}</strong></span>
            <span>Key: <strong className="text-pop-white">{currentTrack?.key || 'D Major'}</strong></span>
            <span>Mode: <strong className="text-pop-yellow capitalize">{visualMode}</strong></span>
          </div>
        </div>
      </div>

      {/* Curated Tracklist & Player Selector */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-2xl text-pop-white flex items-center gap-2">
            <Music className="w-6 h-6 text-pop-red" />
            <span>Select Track to Visualize</span>
          </h2>
          {uploadedTrackName && (
            <span className="px-3 py-1 bg-pop-surface-light border border-pop-border rounded-lg text-xs font-mono text-pop-yellow">
              Loaded: {uploadedTrackName}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {artistConfig.tracks.map((track) => {
            const isThisPlaying = isPlaying && currentTrack?.id === track.id;
            return (
              <div
                key={track.id}
                onClick={() => onPlayTrack(track)}
                className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isThisPlaying
                    ? 'bg-pop-surface-light border-pop-blue shadow-pop-blue -translate-y-1'
                    : 'bg-pop-surface border-pop-border hover:border-gray-500 hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentTrack?.id === track.id) {
                        onPlayPause();
                      } else {
                        onPlayTrack(track);
                      }
                    }}
                    className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center border-2 border-pop-black transition-all ${
                      isThisPlaying
                        ? 'bg-pop-red text-white shadow-pop-solid animate-pulse'
                        : 'bg-pop-surface-light text-pop-yellow hover:bg-pop-yellow hover:text-pop-black'
                    }`}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </button>

                  <div className="truncate">
                    <h3 className="font-mono font-bold text-base text-pop-white truncate">{track.title}</h3>
                    <p className="text-xs font-mono text-gray-400 truncate mt-0.5">{track.description}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-gray-500">
                      <span className="text-pop-blue font-semibold">{track.genre}</span>
                      <span>•</span>
                      <span>{track.bpm} BPM</span>
                      <span>•</span>
                      <span>Key: {track.key}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono text-xs text-gray-400 flex-shrink-0">
                  {track.duration}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
