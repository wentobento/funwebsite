import { artistConfig } from '../data/artistConfig';

/**
 * Triggers the download of the official edoken EPK (Electronic Press Kit)
 */
export function downloadEPK() {
  const epkContent = `================================================================================
                       E D O K E N   —   E P K   2 0 2 6
                       Official Electronic Press Kit & Technical Rider
================================================================================

ARTIST: edoken
GENRE: Generative Electronica / Neoclassical Ambient / Modular Synthesis
LOCATION: Tokyo / Global
BOOKING: booking@edoken.com
MANAGEMENT: mgmt@edoken.com
PRESS: press@edoken.com
OFFICIAL WEBSITE: https://wentobento.github.io/funwebsite

--------------------------------------------------------------------------------
1. ARTIST BIOGRAPHY & STATEMENT
--------------------------------------------------------------------------------
${artistConfig.bio.full.join('\n\n')}

INFLUENCES:
${artistConfig.bio.influences.map(i => `* ${i}`).join('\n')}

KEY STATS:
${artistConfig.bio.stats.map(s => `* ${s.label}: ${s.value}`).join('\n')}

--------------------------------------------------------------------------------
2. PRESS QUOTES
--------------------------------------------------------------------------------
${artistConfig.epk.pressQuotes.map(q => `"${q.quote}"\n  — ${q.source}\n`).join('\n')}

--------------------------------------------------------------------------------
3. LIVE PERFORMANCE & TECHNICAL STAGE PLOT / RIDER
--------------------------------------------------------------------------------
AUDIO INPUTS:
- Channel 1 & 2: Modular Synthesizer System (Stereo Balanced XLR / TRS Line)
- Channel 3 & 4: Acoustic Grand / Felt Piano Pickup or Stage Keyboard (Stereo Line)
- Channel 5 & 6: Drum Machine / Analog Sequencer (Stereo Line)
- Channel 7: Master Talk / FX Return (Mono XLR)

VISUALS & LIGHTING:
- HDMI 4K Output for real-time generative audio visualizer (WebGL / Canvas 60fps)
- Dynamic primary color lighting cues synced to sound frequencies
- Direct Ethernet link or MIDI clock sync to FOH lighting console

STAGE REQUIREMENTS:
- Solid 2.4m x 1.2m table / riser with AC power (min 4 isolated grounded sockets)
- Stereo Stage In-Ear Monitors (IEM) or high-grade stereo wedges
- Dedicated DI boxes for all line inputs

--------------------------------------------------------------------------------
4. DISCOGRAPHY & SELECTED TRACKS
--------------------------------------------------------------------------------
${artistConfig.tracks.map(t => `* ${t.title} (${t.year}) [${t.genre}] - BPM: ${t.bpm}, Key: ${t.key}`).join('\n')}

--------------------------------------------------------------------------------
5. STREAMING & ONLINE PRESENCE
--------------------------------------------------------------------------------
${artistConfig.streamingLinks.map(s => `* ${s.name}: ${s.url}`).join('\n')}
${artistConfig.socialLinks.map(s => `* ${s.name}: ${s.url}`).join('\n')}

--------------------------------------------------------------------------------
6. HIGH-RESOLUTION PRESS ASSETS & PROMOTIONAL PHOTOS
--------------------------------------------------------------------------------
Download 300 DPI TIFF / JPG press photos and vector logo pack at:
${artistConfig.pressGallery.photos.map(p => `* ${p.title} (${p.credit}): ${p.full}`).join('\n')}

================================================================================
(C) 2026 edoken. All rights reserved.
================================================================================
`;

  const blob = new Blob([epkContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `edoken_EPK_Press_Kit_2026.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
