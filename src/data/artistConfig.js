/**
 * edoken — Artist & Website Central Configuration
 * Primary pop-art aesthetics x Electronic Artistry
 * (Ryuichi Sakamoto, Floating Points, Four Tet, Porter Robinson inspired)
 */

export const artistConfig = {
  name: "edoken",
  tagline: "Electronic soundscapes, organic harmonics & generative pop-art",
  location: "Tokyo / Global",
  
  // Artist Bio & Statement
  bio: {
    short: "edoken crafts luminous electronic compositions suspended between neoclassical piano harmonics, modular generative synthesis, and punchy pop-art vibrancy.",
    full: [
      "edoken is an electronic music producer, composer, and sound artist whose sonic world bridges pristine acoustic instruments with cutting-edge algorithmic synthesis. Drawing deep philosophical and textural inspiration from Ryuichi Sakamoto's delicate piano compositions and ambient silence, Floating Points' astronomical modular harmonies, Four Tet's organic folk-sampling warmth, and Porter Robinson's evocative emotional heights, edoken constructs spaces that are at once deeply intimate and kinetically explosive.",
      "Rooted in both live analog instrumentation and procedural sound design, edoken's live performances combine real-time modular improvisations with reactive generative visual art. The result is an all-encompassing audiovisual canvas where primary colors meet transcendent polyrhythms."
    ],
    influences: [
      "Ryuichi Sakamoto",
      "Floating Points",
      "Four Tet",
      "Porter Robinson"
    ],
    stats: [
      { label: "Monthly Listeners", value: "140K+" },
      { label: "Live Performances", value: "35+ Cities" },
      { label: "Releases", value: "3 EPs / 1 LP" },
      { label: "Modular Racks", value: "84HP x 6" }
    ]
  },

  // Streaming Quick Links
  streamingLinks: [
    { name: "Spotify", url: "https://open.spotify.com/artist/edoken", color: "#1DB954", icon: "spotify" },
    { name: "Apple Music", url: "https://music.apple.com/artist/edoken", color: "#FA243C", icon: "apple" },
    { name: "Bandcamp", url: "https://edoken.bandcamp.com", color: "#629AA9", icon: "bandcamp" },
    { name: "SoundCloud", url: "https://soundcloud.com/edoken", color: "#FF5500", icon: "soundcloud" },
    { name: "YouTube Music", url: "https://music.youtube.com/channel/edoken", color: "#FF0000", icon: "youtube" },
    { name: "Tidal", url: "https://tidal.com/artist/edoken", color: "#000000", icon: "tidal" }
  ],

  // Social Links
  socialLinks: [
    { name: "Instagram", handle: "@edoken", url: "https://instagram.com/edoken" },
    { name: "X / Twitter", handle: "@edokenmusic", url: "https://x.com/edokenmusic" },
    { name: "YouTube", handle: "@edoken", url: "https://youtube.com/@edoken" },
    { name: "Bandcamp", handle: "edoken.bandcamp.com", url: "https://edoken.bandcamp.com" },
    { name: "GitHub", handle: "wentobento", url: "https://github.com/wentobento" }
  ],

  // Contact & Inquiries
  contact: {
    bookingEmail: "booking@edoken.com",
    managementEmail: "mgmt@edoken.com",
    pressEmail: "press@edoken.com",
    generalEmail: "hello@edoken.com",
    studio: "Shibuya Sound Lab / Tokyo"
  },

  // Audio Tracks for Built-in Player & Visualizer
  tracks: [
    {
      id: "track-1",
      title: "Harmonic Bloom (Promises in Tokyo)",
      album: "Prismatic Frequencies EP",
      year: "2026",
      duration: "03:42",
      genre: "Generative Ambient / Neoclassical",
      description: "Delicate modal piano runs interwoven with warm analog polyrhythms and sparkling FM bells.",
      bpm: 118,
      key: "D Major",
      audioUrl: "synthesized://harmonic-bloom",
      waveformSeed: 42
    },
    {
      id: "track-2",
      title: "Circuit Starlight",
      album: "Prismatic Frequencies EP",
      year: "2026",
      duration: "04:15",
      genre: "Modular Electronica",
      description: "Floating Points inspired 303 arpeggiations building into euphoric, brassy synth crescendos.",
      bpm: 126,
      key: "F# Minor",
      audioUrl: "synthesized://circuit-starlight",
      waveformSeed: 88
    },
    {
      id: "track-3",
      title: "Subtle Raindrops / Wood & Wire",
      album: "Async Reflections",
      year: "2025",
      duration: "03:10",
      genre: "Folktronica / Ambient",
      description: "Four Tet-style textured hydrophone samples, wooden percussions, and acoustic guitar resonances.",
      bpm: 104,
      key: "A Minor",
      audioUrl: "synthesized://subtle-raindrops",
      waveformSeed: 17
    },
    {
      id: "track-4",
      title: "Nurture Sky",
      album: "Singles",
      year: "2025",
      duration: "03:55",
      genre: "Emotive Electronic",
      description: "Porter Robinson inspired uplift with pitched vocal chops, soaring Supersaws, and chime fills.",
      bpm: 130,
      key: "B Major",
      audioUrl: "synthesized://nurture-sky",
      waveformSeed: 63
    }
  ],

  // Store Merchandise Items (Direct external links to Bandcamp / Shopify)
  merch: [
    {
      id: "merch-1",
      title: "Prismatic Frequencies 12\" Gatefold Vinyl",
      category: "Music & Vinyl",
      price: "$34.00",
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
      description: "Heavyweight 180g canary yellow & electric blue splattered vinyl in foil-stamped pop-art gatefold jacket. Includes bonus digital stems.",
      status: "In Stock",
      directUrl: "https://edoken.bandcamp.com/album/prismatic-frequencies"
    },
    {
      id: "merch-2",
      title: "Limited Edition Tour Cassette (Chrome Type II)",
      category: "Music & Tapes",
      price: "$16.00",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
      description: "Direct-to-tape analog dub on high-bias chrome cassette with screenprinted primary red shell.",
      status: "Limited (40 left)",
      directUrl: "https://edoken.bandcamp.com/merch/tour-cassette"
    },
    {
      id: "merch-3",
      title: "edoken 'Primary Circuit' Screenprinted Tee",
      category: "Apparel",
      price: "$38.00",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      description: "100% heavyweight Japanese organic cotton. Hand-pulled 4-color pop-art silkscreen on front and tour dates on back.",
      status: "In Stock",
      directUrl: "https://edoken.bandcamp.com/merch/primary-circuit-tee"
    },
    {
      id: "merch-4",
      title: "Modular Synthesis Preset & Sample Library (Vol. 1)",
      category: "Digital / Producers",
      price: "$28.00",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
      description: "2.4 GB of Eurorack modular patches, Prophet-6 warm pads, Ableton instrument racks, and tape-processed drum one-shots.",
      status: "Instant Download",
      directUrl: "https://edoken.bandcamp.com/merch/modular-sample-library"
    },
    {
      id: "merch-5",
      title: "Pop-Art Risograph Live Tour Poster (Signed)",
      category: "Art Prints",
      price: "$24.00",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
      description: "A2 3-color risograph print on Munken Lynx 240gsm paper. Individually hand-numbered and signed by edoken.",
      status: "Only 100 printed",
      directUrl: "https://edoken.bandcamp.com/merch/risograph-poster"
    }
  ],

  // Bandcamp & Digital Downloads
  digitalDownloads: [
    {
      id: "dl-1",
      title: "Prismatic Frequencies (Full EP - 24-bit FLAC / WAV / MP3)",
      size: "420 MB",
      format: "FLAC / 48kHz 24-bit + High-Res Artwork",
      bandcampEmbedId: "1234567890",
      bandcampUrl: "https://edoken.bandcamp.com/album/prismatic-frequencies",
      downloadUrl: "#download-prismatic-ep",
      notes: "Includes full digital booklet, Sakamoto tribute liner notes, and high-res vector artwork."
    },
    {
      id: "dl-2",
      title: "Live at Liquidroom Tokyo (Audiophile Soundboard Stems)",
      size: "860 MB",
      format: "Multi-track WAV Stems (Dry & Wet)",
      bandcampUrl: "https://edoken.bandcamp.com/album/live-at-liquidroom",
      downloadUrl: "#download-liquidroom-stems",
      notes: "Full multi-channel stems from the Tokyo modular live performance for remixers and producers."
    },
    {
      id: "dl-3",
      title: "Free Ambient Tape Loops & Generative Seeds Pack",
      size: "185 MB",
      format: "WAV 44.1kHz 16-bit Royalty-Free",
      bandcampUrl: "https://edoken.bandcamp.com",
      downloadUrl: "#download-ambient-pack",
      notes: "Free community sound pack created with Nagra reel-to-reel and vintage tape delay."
    }
  ],

  // Tour Dates & Shows
  tourDates: [
    {
      id: "tour-1",
      date: "2026-10-24",
      displayDate: "OCT 24, 2026",
      city: "Tokyo, Japan",
      venue: "Liquidroom Ebisu",
      event: "Prismatic Soundscapes Live A/V",
      status: "Selling Fast",
      ticketUrl: "https://tickets.edoken.com/tokyo"
    },
    {
      id: "tour-2",
      date: "2026-11-12",
      displayDate: "NOV 12, 2026",
      city: "London, UK",
      venue: "Village Underground",
      event: "Modular Oscillations Night",
      status: "Tickets Available",
      ticketUrl: "https://tickets.edoken.com/london"
    },
    {
      id: "tour-3",
      date: "2026-11-18",
      displayDate: "NOV 18, 2026",
      city: "Berlin, Germany",
      venue: "Funkhaus Saal 1",
      event: "Spatial Audio & Generative Canvas",
      status: "Sold Out",
      ticketUrl: "https://tickets.edoken.com/berlin"
    },
    {
      id: "tour-4",
      date: "2026-12-05",
      displayDate: "DEC 05, 2026",
      city: "Los Angeles, CA",
      venue: "The Regent Theater",
      event: "Pop-Art Electronic Showcase",
      status: "Tickets Available",
      ticketUrl: "https://tickets.edoken.com/la"
    },
    {
      id: "tour-5",
      date: "2026-12-11",
      displayDate: "DEC 11, 2026",
      city: "Brooklyn, New York",
      venue: "Elsewhere (The Hall)",
      event: "East Coast Tour Finale",
      status: "Selling Fast",
      ticketUrl: "https://tickets.edoken.com/ny"
    }
  ],

  // Press Photos & Performance Videos
  pressGallery: {
    photos: [
      {
        id: "photo-1",
        title: "Modular Synthesis in Shinjuku",
        credit: "Photo by Kenji Takahashi",
        year: "2026",
        location: "Tokyo, JP",
        thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=90",
        category: "Live"
      },
      {
        id: "photo-2",
        title: "Liquidroom A/V Visualizer Setup",
        credit: "Photo by Mia Sommer",
        year: "2026",
        location: "Tokyo, JP",
        thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=90",
        category: "Live"
      },
      {
        id: "photo-3",
        title: "Studio Session — Acoustic Grand & Eurorack",
        credit: "Photo by Tatsuya Sato",
        year: "2025",
        location: "Shibuya Sound Lab",
        thumbnail: "https://images.unsplash.com/photo-1520523839898-507125cd53c1?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1520523839898-507125cd53c1?auto=format&fit=crop&w=1600&q=90",
        category: "Studio"
      },
      {
        id: "photo-4",
        title: "Primary Spectrum Stage Lighting",
        credit: "Photo by Elena Rossi",
        year: "2026",
        location: "Berlin Funkhaus",
        thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=90",
        category: "Stage"
      }
    ],
    videos: [
      {
        id: "vid-1",
        title: "Live Modular Improvisation at Liquidroom",
        duration: "08:42",
        venue: "Liquidroom Ebisu, Tokyo",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "vid-2",
        title: "Harmonic Bloom (Official Audiovisual Experience)",
        duration: "04:15",
        venue: "Generative Canvas Studio",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },

  // Downloadable EPK (Electronic Press Kit) Pack
  epk: {
    downloadFilename: "edoken_EPK_2026.zip",
    fileSize: "28.5 MB",
    version: "2026 Official",
    contents: [
      "Official Artist Bio & One-Sheet (PDF)",
      "High-Resolution Press Photos (300 DPI TIFF & JPG)",
      "Stage Plot & Technical Input Rider (Modular & A/V)",
      "Press Quotes & Notable Media Features",
      "Selected Audio Master Samples (320kbps MP3)",
      "Logos & Pop-Art Vector Brand Assets"
    ],
    pressQuotes: [
      {
        quote: "edoken fuses the serene mathematical grace of Ryuichi Sakamoto with the explosive polyrhythmic fireworks of Floating Points. An essential modern electronic voice.",
        source: "Tokyo Electronic Review"
      },
      {
        quote: "Eclectic, joyous, and visually unstoppable. The live reactive visuals turn every beat into a primary-colored shockwave.",
        source: "Modular Sound Journal"
      }
    ]
  }
};
