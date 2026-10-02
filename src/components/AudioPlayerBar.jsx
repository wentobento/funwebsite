import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Sparkles, Disc } from 'lucide-react';
import { soundEngine } from '../audio/SynthesizedAudioEngine';

export default function AudioPlayerBar({
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onNext,
  onPrev,
  onOpenVisualizer
}) {
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolumeState(val);
    setIsMuted(val === 0);
    soundEngine.setVolume(val);
  };

  const toggleMute = () => {
    if (isMuted) {
      soundEngine.setVolume(volume || 0.8);
      setIsMuted(false);
    } else {
      soundEngine.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    // In audio engine, seek if custom element
    if (soundEngine.userAudioElement) {
      soundEngine.userAudioElement.currentTime = newTime;
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-pop-surface/95 backdrop-blur-md border-t-2 border-pop-border py-2.5 px-4 sm:px-6 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Track Metadata */}
        <div className="flex items-center gap-3 w-full md:w-1/3 min-w-0">
          <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border-2 border-pop-border bg-pop-black flex items-center justify-center">
            <Disc className={`w-7 h-7 text-pop-yellow ${isPlaying ? 'animate-spin-slow' : ''}`} />
            {isPlaying && (
              <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-pop-red animate-ping" />
            )}
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <h4 className="font-mono font-bold text-sm text-pop-white truncate">
                {currentTrack ? currentTrack.title : 'Harmonic Bloom'}
              </h4>
              {currentTrack && (
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold bg-pop-blue/20 text-pop-blue rounded border border-pop-blue/40">
                  {currentTrack.genre || 'Electronic'}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 font-mono truncate">
              {currentTrack ? `${currentTrack.album || 'Single'} • edoken` : 'edoken'}
            </p>
          </div>
        </div>

        {/* Center Controls & Scrubber */}
        <div className="flex flex-col items-center gap-1.5 w-full md:w-5/12">
          <div className="flex items-center gap-4">
            <button
              onClick={onPrev}
              title="Previous Track"
              className="p-1.5 text-gray-300 hover:text-white transition-colors hover:scale-110 active:scale-95"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={onPlayPause}
              title={isPlaying ? 'Pause' : 'Play'}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-pop-red text-white border-2 border-pop-black shadow-pop-solid hover:bg-pop-red-glow hover:scale-105 active:scale-95 transition-all duration-150"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={onNext}
              title="Next Track"
              className="p-1.5 text-gray-300 hover:text-white transition-colors hover:scale-110 active:scale-95"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Scrubber */}
          <div className="w-full flex items-center gap-2.5 font-mono text-[11px] text-gray-400">
            <span className="w-9 text-right">{formatTime(currentTime)}</span>
            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-pop-border rounded-lg appearance-none cursor-pointer accent-pop-yellow focus:outline-none"
              />
            </div>
            <span className="w-9">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Tools (Volume & Visualizer Shortcut) */}
        <div className="flex items-center justify-end gap-4 w-full md:w-1/3">
          {/* Volume Control */}
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white">
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-pop-red" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-18 h-1 bg-pop-border rounded appearance-none cursor-pointer accent-pop-blue focus:outline-none"
            />
          </div>

          {/* Quick jump to full Visualizer */}
          <button
            onClick={onOpenVisualizer}
            className="flex items-center gap-2 px-3 py-1.5 bg-pop-blue hover:bg-pop-blue-glow text-white text-xs font-mono font-bold rounded-lg border border-pop-black shadow-pop-solid hover:-translate-y-0.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-pop-yellow animate-spin-slow" />
            <span className="hidden sm:inline">Visualizer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
