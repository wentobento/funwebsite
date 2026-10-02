import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AudioPlayerBar from './components/AudioPlayerBar';
import Home from './pages/Home';
import MusicVisualizer from './pages/MusicVisualizer';
import Tour from './pages/Tour';
import Gallery from './pages/Gallery';
import Store from './pages/Store';
import Downloads from './pages/Downloads';
import Contact from './pages/Contact';
import { artistConfig } from './data/artistConfig';
import { soundEngine } from './audio/SynthesizedAudioEngine';
import { downloadEPK } from './utils/epkDownload';
import { Disc3, ArrowUp, Download } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [currentTrack, setCurrentTrack] = useState(artistConfig.tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(222);

  // Sync Audio Engine progress callback
  const handleProgress = (time, totalDuration) => {
    setCurrentTime(time);
    setDuration(totalDuration || 222);
  };

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    soundEngine.playTrack(track.id, handleProgress);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      soundEngine.pause();
      setIsPlaying(false);
    } else {
      soundEngine.resume(handleProgress);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    const currentIndex = artistConfig.tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % artistConfig.tracks.length;
    handlePlayTrack(artistConfig.tracks[nextIndex]);
  };

  const handlePrevTrack = () => {
    const currentIndex = artistConfig.tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + artistConfig.tracks.length) % artistConfig.tracks.length;
    handlePlayTrack(artistConfig.tracks[prevIndex]);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home
            onNavigate={setActivePage}
            onPlayTrack={handlePlayTrack}
            isPlaying={isPlaying}
            currentTrack={currentTrack}
          />
        );
      case 'visualizer':
        return (
          <MusicVisualizer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayTrack={handlePlayTrack}
            onPlayPause={handlePlayPause}
          />
        );
      case 'tour':
        return <Tour onNavigate={setActivePage} />;
      case 'gallery':
        return <Gallery />;
      case 'store':
        return <Store />;
      case 'downloads':
        return <Downloads />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={setActivePage} onPlayTrack={handlePlayTrack} isPlaying={isPlaying} />;
    }
  };

  return (
    <div className="min-h-screen bg-pop-black text-pop-white flex flex-col justify-between selection:bg-pop-yellow selection:text-pop-black font-sans">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        isPlaying={isPlaying}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Pop-Art Footer */}
      <footer className="border-t-2 border-pop-border bg-pop-surface/90 py-12 px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-8 h-8 rounded bg-pop-red flex items-center justify-center border-2 border-pop-black shadow-pop-solid">
              <span className="font-display font-extrabold text-sm text-white">e</span>
            </div>
            <div>
              <p className="font-display font-bold text-lg text-pop-white">edoken</p>
              <p className="font-mono text-xs text-gray-400">
                Electronic Music & Generative Audiovisual Art • Tokyo / Global
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-gray-300">
            <button onClick={() => setActivePage('home')} className="hover:text-pop-yellow">Home</button>
            <button onClick={() => setActivePage('visualizer')} className="hover:text-pop-red">Visualizer</button>
            <button onClick={() => setActivePage('tour')} className="hover:text-pop-blue">Tour</button>
            <button onClick={() => setActivePage('gallery')} className="hover:text-pop-yellow">Press</button>
            <button onClick={() => setActivePage('store')} className="hover:text-pop-red">Store</button>
            <button onClick={() => setActivePage('downloads')} className="hover:text-pop-blue">Downloads</button>
            <button onClick={() => setActivePage('contact')} className="hover:text-pop-yellow">Contact</button>
            <button onClick={downloadEPK} className="text-pop-yellow font-bold hover:underline flex items-center gap-1">
              <Download className="w-3.5 h-3.5" />
              <span>EPK</span>
            </button>
          </div>

          <div className="font-mono text-xs text-gray-500 text-center md:text-right">
            <p>© {new Date().getFullYear()} edoken. All rights reserved.</p>
            <p className="text-[10px] text-gray-600 mt-0.5">Influenced by Sakamoto, Floating Points, Four Tet, Porter Robinson.</p>
          </div>
        </div>
      </footer>

      {/* Persistent Bottom Audio Player Bar */}
      <AudioPlayerBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={handlePlayPause}
        onNext={handleNextTrack}
        onPrev={handlePrevTrack}
        onOpenVisualizer={() => {
          setActivePage('visualizer');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
