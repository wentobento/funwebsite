/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pop: {
          blue: "#0052FF",
          "blue-glow": "#246BFE",
          red: "#FF1E44",
          "red-glow": "#FF385C",
          yellow: "#FFD500",
          "yellow-light": "#FFE853",
          black: "#08090C",
          surface: "#12141C",
          "surface-light": "#1B1E2B",
          border: "#292E42",
          white: "#F8FAFC"
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Syne', 'Space Grotesk', 'sans-serif']
      },
      boxShadow: {
        'pop-blue': '4px 4px 0px #0052FF',
        'pop-red': '4px 4px 0px #FF1E44',
        'pop-yellow': '4px 4px 0px #FFD500',
        'pop-solid': '5px 5px 0px #08090C',
        'pop-glow': '0 0 25px rgba(0, 82, 255, 0.45)',
        'pop-glow-red': '0 0 25px rgba(255, 30, 68, 0.45)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 3s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      }
    },
  },
  plugins: [],
}
