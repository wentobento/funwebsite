import React, { useEffect, useRef, useState } from 'react';
import { soundEngine } from '../audio/SynthesizedAudioEngine';
import { Sparkles, Waves, RefreshCw } from 'lucide-react';

/**
 * VisualizerCanvas
 * Unique interactive music visualizer reacting to real-time Web Audio FFT
 * and cursor physics (particles deflect, ripple, and leave glowing primary pop trails).
 * Inspired by Ryuichi Sakamoto, Floating Points, Four Tet, and Porter Robinson.
 */
export default function VisualizerCanvas({ visualMode = 'primary', isPlaying = false, height = 480 }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0, isHovering: false });
  const animFrameRef = useRef(null);

  // Particles state
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize canvas to match display size
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = (height || rect.height) * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize 160 particles
    const particleColors = [
      '#0052FF', // Electric Blue
      '#FF1E44', // Pop Red
      '#FFD500', // Vivid Yellow
      '#FFFFFF'  // Pure White
    ];

    const rect = containerRef.current.getBoundingClientRect();
    particlesRef.current = Array.from({ length: 140 }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * height,
      baseX: Math.random() * rect.width,
      baseY: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 3.5 + 1.5,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      alpha: Math.random() * 0.7 + 0.3,
      angle: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.04
    }));

    // Mouse tracking with speed
    const handleMouseMove = (e) => {
      const cRect = canvas.getBoundingClientRect();
      const currentX = e.clientX - cRect.left;
      const currentY = e.clientY - cRect.top;
      mouseRef.current.vx = currentX - mouseRef.current.lastX;
      mouseRef.current.vy = currentY - mouseRef.current.lastY;
      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;
      mouseRef.current.lastX = currentX;
      mouseRef.current.lastY = currentY;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.02;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const h = height;

      // Clear with dark obsidian trail persistence
      ctx.fillStyle = visualMode === 'monochrome' 
        ? 'rgba(8, 9, 12, 0.28)' 
        : 'rgba(8, 9, 12, 0.22)';
      ctx.fillRect(0, 0, width, h);

      // Get real-time audio FFT data
      const freqData = soundEngine.getFrequencyData();
      const waveData = soundEngine.getTimeDomainData();

      // Calculate audio energy bands
      let bass = 0;
      let mids = 0;
      let highs = 0;
      for (let i = 0; i < 16; i++) bass += freqData[i] || 0;
      for (let i = 16; i < 64; i++) mids += freqData[i] || 0;
      for (let i = 64; i < 128; i++) highs += freqData[i] || 0;
      bass = bass / 16 / 255;
      mids = mids / 48 / 255;
      highs = highs / 64 / 255;

      const audioEnergy = (bass * 1.5 + mids * 1.0 + highs * 0.8) / 3.3;

      // 1. Draw Background Pop-Art Harmonic Oscilloscope Waves
      ctx.save();
      const waveLines = visualMode === 'monochrome' ? 3 : 4;
      const waveColors = visualMode === 'monochrome'
        ? ['rgba(255,255,255,0.7)', 'rgba(180,180,180,0.5)', 'rgba(90,90,90,0.4)']
        : [
            'rgba(0, 82, 255, 0.75)',  // Pop Blue
            'rgba(255, 30, 68, 0.75)',  // Pop Red
            'rgba(255, 213, 0, 0.75)',  // Pop Yellow
            'rgba(248, 250, 252, 0.6)'  // White
          ];

      for (let w = 0; w < waveLines; w++) {
        ctx.beginPath();
        ctx.lineWidth = 2.5 + w * 0.5;
        ctx.strokeStyle = waveColors[w % waveColors.length];
        ctx.shadowBlur = 12;
        ctx.shadowColor = waveColors[w % waveColors.length];

        const sliceWidth = width / (waveData.length / 2);
        let x = 0;

        for (let i = 0; i < waveData.length / 2; i++) {
          const v = (waveData[i] || 128) / 128.0; // 0 to 2
          const yOffset = (w - (waveLines - 1) / 2) * 22;
          
          // Harmonic wave equation with Floating Points / Sakamoto generative swell
          const harmonic = Math.sin(i * 0.05 + time * 1.5 + w * 1.2) * (15 + bass * 45);
          let y = (v * h) / 2 + yOffset + harmonic;

          // Interactive cursor reaction: wave ripples and distorts when cursor passes nearby
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseRadius = 140;
          if (dist < mouseRadius) {
            const force = (1 - dist / mouseRadius) * 45;
            y += Math.sin(dist * 0.08 - time * 4) * force * (mouseRef.current.vy > 0 ? 1 : -1);
          }

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
        ctx.stroke();
      }
      ctx.restore();

      // 2. Draw Interactive Particles (Swelling to beats, scattering with mouse cursor)
      const particles = particlesRef.current;
      const mouseRadius = 120;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Float movement
        p.angle += p.spinSpeed;
        p.x += p.vx + Math.cos(p.angle) * 0.5;
        p.y += p.vy + Math.sin(p.angle) * 0.5;

        // Wrap around canvas edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Interactive cursor repulsion physics
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const force = (1 - dist / mouseRadius) * 8;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force;
          p.y += Math.sin(angle) * force;
        }

        // Particle size scales with audio energy
        const currentSize = p.size * (1 + audioEnergy * 1.8);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, currentSize), 0, Math.PI * 2);
        
        if (visualMode === 'monochrome') {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#ffffff';
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        }
        
        ctx.fill();

        // Connect nearby particles with delicate harmonic lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 45) {
            ctx.beginPath();
            ctx.strokeStyle = visualMode === 'monochrome' 
              ? `rgba(255, 255, 255, ${(1 - dist2 / 45) * 0.25})`
              : `${p.color}33`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // 3. Cursor Aura Halo (Pop-art interactive pointer trail)
      if (mouseRef.current.isHovering) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 16 + audioEnergy * 24, 0, Math.PI * 2);
        ctx.strokeStyle = '#FFD500';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#FFD500';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FF1E44';
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [visualMode, height]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-xl border-2 border-pop-border bg-pop-black shadow-pop-solid">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
        style={{ height: `${height}px` }}
      />
      {/* Interactive Helper Overlay Badge */}
      <div className="absolute top-3 left-4 flex items-center gap-2 px-3 py-1 bg-pop-surface/90 backdrop-blur-sm border border-pop-border rounded-full text-xs font-mono text-pop-white">
        <Sparkles className="w-3.5 h-3.5 text-pop-yellow animate-pulse" />
        <span>Hover or drag cursor across canvas to deform sound waves</span>
      </div>

      <div className="absolute bottom-3 right-4 flex items-center gap-2 px-3 py-1 bg-pop-surface/90 backdrop-blur-sm border border-pop-border rounded-full text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-pop-blue animate-ping" />
        <span className="text-gray-400">Web Audio FFT 60fps</span>
      </div>
    </div>
  );
}
