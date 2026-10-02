/**
 * edoken — Web Audio Procedural & Playback Sound Engine
 * Synthesizes electronic music stems in real-time matching the aesthetic of:
 * - Ryuichi Sakamoto (harmonic piano & ambient resonance)
 * - Floating Points (modular filter arpeggios & polyrhythms)
 * - Four Tet (organic percussive clicks & textured pads)
 * - Porter Robinson (luminous supersaws & melodic bells)
 *
 * Also supports custom user audio files (MP3, WAV, etc.) routed into
 * the same real-time AnalyserNode for 60fps FFT frequency & waveform analysis.
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.analyser = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.currentTrackId = null;
    this.userAudioSource = null;
    this.userAudioElement = null;
    this.loopTimer = null;
    this.stepIndex = 0;
    this.volume = 0.8;

    // Track state
    this.currentTime = 0;
    this.duration = 222; // default ~3:42 in seconds
    this.progressInterval = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
      
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.82;

      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Real-time FFT Frequency Data for Visualizer
  getFrequencyData() {
    if (!this.analyser) return new Uint8Array(64);
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  // Waveform Time Domain Data for Oscilloscope
  getTimeDomainData() {
    if (!this.analyser) return new Uint8Array(256).fill(128);
    const dataArray = new Uint8Array(this.analyser.fftSize);
    this.analyser.getByteTimeDomainData(dataArray);
    return dataArray;
  }

  // Set Master Volume (0.0 to 1.0)
  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
    if (this.userAudioElement) {
      this.userAudioElement.volume = this.volume;
    }
  }

  // Play a track by ID
  playTrack(trackId, onProgress) {
    this.init();
    this.stop();

    this.currentTrackId = trackId;
    this.isPlaying = true;
    this.currentTime = 0;

    if (trackId.startsWith('user-')) {
      if (this.userAudioElement) {
        this.userAudioElement.play().catch(e => console.log('Audio autoplay prevented:', e));
      }
    } else {
      // Start Procedural Synthesis Pattern based on track
      this.startSynthesizerLoop(trackId);
    }

    // Progress tick
    clearInterval(this.progressInterval);
    this.progressInterval = setInterval(() => {
      if (!this.isPlaying) return;
      if (this.userAudioElement && !this.userAudioElement.paused) {
        this.currentTime = this.userAudioElement.currentTime;
        this.duration = this.userAudioElement.duration || 222;
      } else {
        this.currentTime += 0.5;
        if (this.currentTime >= this.duration) {
          this.currentTime = 0;
        }
      }
      if (onProgress) {
        onProgress(this.currentTime, this.duration);
      }
    }, 500);
  }

  // Procedural Generative Synthesizer Engine
  startSynthesizerLoop(trackId) {
    let bpm = 120;
    if (trackId === 'track-1') bpm = 112; // Sakamoto / Floating Points ambient
    if (trackId === 'track-2') bpm = 126; // Modular arpeggio
    if (trackId === 'track-3') bpm = 104; // Four Tet folktronica
    if (trackId === 'track-4') bpm = 130; // Porter Robinson uplifting

    const beatIntervalMs = (60 / bpm) * 1000 / 2; // eighth notes
    this.stepIndex = 0;

    // Scale notes in Hz
    // D Major / F# Minor / Pentatonic modes
    const D_MAJ = [146.83, 164.81, 185.00, 220.00, 246.94, 293.66, 329.63, 369.99, 440.00, 587.33];
    const F_SHARP_MIN = [185.00, 220.00, 246.94, 277.18, 329.63, 369.99, 440.00, 554.37, 739.99];
    const FOUR_TET_SCALE = [130.81, 164.81, 196.00, 220.00, 261.63, 329.63, 392.00, 523.25];
    const PORTER_SCALE = [246.94, 277.18, 329.63, 369.99, 440.00, 493.88, 554.37, 659.25, 739.99];

    this.loopTimer = setInterval(() => {
      if (!this.isPlaying || !this.audioCtx) return;
      const t = this.audioCtx.currentTime;
      const step = this.stepIndex % 16;
      this.stepIndex++;

      if (trackId === 'track-1') {
        // Ryuichi Sakamoto + Floating Points: Ethereal piano chords + warm bass + bell chimes
        if (step === 0 || step === 8) {
          this.triggerPianoChord([D_MAJ[0] / 2, D_MAJ[3] / 2, D_MAJ[5]], t, 2.5);
        }
        if (step % 2 === 0) {
          const note = D_MAJ[(step * 3 + 2) % D_MAJ.length];
          this.triggerBell(note * 1.5, t, 1.2, 0.15);
        }
        if (step === 4 || step === 12) {
          this.triggerKick(t, 0.4);
        }
      } else if (trackId === 'track-2') {
        // Floating Points Modular 303 Arp & Cosmic Shimmer
        const note = F_SHARP_MIN[(this.stepIndex * 5) % F_SHARP_MIN.length];
        this.triggerAcidArp(note, t, 0.18, 0.25);
        if (step % 4 === 0) {
          this.triggerKick(t, 0.7);
        }
        if (step === 4 || step === 12) {
          this.triggerSnare(t, 0.35);
        }
        if (step % 2 === 1) {
          this.triggerHiHat(t, 0.18);
        }
      } else if (trackId === 'track-3') {
        // Four Tet: Organic Wood clicks, textured vinyl flutter & kalimba plucks
        if (step % 3 === 0) {
          const note = FOUR_TET_SCALE[(this.stepIndex * 2) % FOUR_TET_SCALE.length];
          this.triggerWoodPluck(note, t, 0.4, 0.22);
        }
        if (step % 2 === 0) {
          this.triggerGlitchClick(t, 0.12);
        }
        if (step === 0) {
          this.triggerWarmSub(65.41, t, 1.8);
        }
      } else if (trackId === 'track-4') {
        // Porter Robinson: Soaring Supersaw arpeggio & euphoric sidechained pulse
        const note = PORTER_SCALE[(this.stepIndex * 3) % PORTER_SCALE.length];
        this.triggerSuperSaw(note, t, 0.3, 0.28);
        if (step % 4 === 0) {
          this.triggerKick(t, 0.85);
        }
        if (step === 4 || step === 12) {
          this.triggerSnare(t, 0.45);
        }
        if (step % 2 === 1) {
          this.triggerHiHat(t, 0.25);
        }
        if (step === 8) {
          this.triggerBell(PORTER_SCALE[PORTER_SCALE.length - 1] * 2, t, 2.0, 0.2);
        }
      }
    }, beatIntervalMs);
  }

  // --- Sound Design Synthesizer Voices ---

  triggerKick(t, volume = 0.6) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.15);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.26);
  }

  triggerSnare(t, volume = 0.3) {
    // Noise buffer
    const bufferSize = this.audioCtx.sampleRate * 0.18;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 800;

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(t);
  }

  triggerHiHat(t, volume = 0.15) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(8000, t);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.06);
  }

  triggerPianoChord(freqs, t, duration = 2.0) {
    freqs.forEach(freq => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + duration);
    });
  }

  triggerBell(freq, t, duration = 1.0, volume = 0.2) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + duration);
  }

  triggerAcidArp(freq, t, duration = 0.2, volume = 0.25) {
    const osc = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, t);

    filter.type = 'lowpass';
    filter.Q.value = 6;
    filter.frequency.setValueAtTime(600, t);
    filter.frequency.exponentialRampToValueAtTime(3200, t + 0.08);
    filter.frequency.exponentialRampToValueAtTime(400, t + duration);

    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + duration);
  }

  triggerWoodPluck(freq, t, duration = 0.3, volume = 0.2) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + duration);
  }

  triggerGlitchClick(t, volume = 0.1) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.frequency.setValueAtTime(2500, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.02);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.03);
  }

  triggerWarmSub(freq, t, duration = 1.5) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + duration);
  }

  triggerSuperSaw(freq, t, duration = 0.35, volume = 0.22) {
    [-8, 0, 8].forEach(detune => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      osc.detune.value = detune;

      gain.gain.setValueAtTime(volume / 3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + duration);
    });
  }

  // --- Custom Audio File Uploader Integration ---
  loadUserAudioFile(file, onLoaded) {
    this.init();
    this.stop();

    if (this.userAudioElement) {
      this.userAudioElement.pause();
      this.userAudioElement.src = '';
    }

    const objectUrl = URL.createObjectURL(file);
    const audio = new Audio();
    audio.src = objectUrl;
    audio.crossOrigin = "anonymous";
    audio.loop = true;
    this.userAudioElement = audio;

    const source = this.audioCtx.createMediaElementSource(audio);
    source.connect(this.masterGain);
    this.userAudioSource = source;

    audio.onloadedmetadata = () => {
      this.duration = audio.duration;
      this.currentTrackId = `user-${file.name}`;
      this.isPlaying = true;
      audio.play();
      if (onLoaded) onLoaded(file.name, audio.duration);
    };
  }

  pause() {
    this.isPlaying = false;
    clearInterval(this.loopTimer);
    if (this.userAudioElement) {
      this.userAudioElement.pause();
    }
    if (this.audioCtx && this.audioCtx.state === 'running') {
      this.audioCtx.suspend();
    }
  }

  resume(onProgress) {
    if (!this.currentTrackId) {
      this.playTrack('track-1', onProgress);
      return;
    }
    this.init();
    this.isPlaying = true;
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    if (this.userAudioElement) {
      this.userAudioElement.play();
    } else {
      this.startSynthesizerLoop(this.currentTrackId);
    }
  }

  stop() {
    this.isPlaying = false;
    clearInterval(this.loopTimer);
    clearInterval(this.progressInterval);
    if (this.userAudioElement) {
      this.userAudioElement.pause();
    }
  }
}

export const soundEngine = new SoundEngine();
