import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand: #ffe5e5 (blush) and #4b1212 (maroon). Everything else derives from them.
        mist: '#FFFDFB',      // page ground: warm paper white
        blush: '#FFE5E5',     // brand blush: an accent (covers, ticker, the maroon band's text), not a ground
        rose: '#FFC9C9',      // deeper blush for covers
        ink: '#4B1212',       // brand maroon: text, the maroon band, and the one button
        soft: '#8A5555',      // muted text, maroon at reduced strength
        mulberry: '#4B1212',  // kept as an alias so older classes still work
        honey: '#F3D48A',     // marker highlight
        cream: '#FFF8EC',     // warm counterpoint
        lilac: '#F1DDEB',     // soft secondary, covers only
        sky: '#FFE5E5',
      },
      fontFamily: {
        display: ['"Abril Fatface"', '"Bodoni 72"', 'Georgia', 'serif'],
        body: ['Karla', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
        'display-sm': ['Karla', 'system-ui', 'sans-serif'],
      },
      maxWidth: { prose: '66ch' },
      boxShadow: {
        card: '0 18px 40px -24px rgba(75, 18, 18, 0.28)',
        sheet: '0 30px 60px -30px rgba(75, 18, 18, 0.35)',
      },
    },
  },
  plugins: [],
} satisfies Config;
