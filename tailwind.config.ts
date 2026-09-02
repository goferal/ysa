import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand: #ffe5e5 (blush) and #4b1212 (maroon). Everything else derives from them.
        mist: '#FFF3F3',      // page ground: brand blush lifted for long reading
        blush: '#FFE5E5',     // brand blush, used at full strength in washes & covers
        rose: '#FFC9C9',      // deeper blush for washes
        ink: '#4B1212',       // brand maroon: text and the one button
        soft: '#8A5555',      // muted text, maroon at reduced strength
        mulberry: '#4B1212',  // kept as an alias so older classes still work
        honey: '#F3D48A',     // marker highlight
        cream: '#FFF8EC',     // warm counterpoint wash
        lilac: '#F1DDEB',     // soft secondary wash
        sky: '#FFE5E5',
      },
      fontFamily: {
        display: ['"Bodoni Moda"', '"Bodoni 72"', 'Didot', 'Georgia', 'serif'],
        body: ['Karla', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
        'display-sm': ['Karla', 'system-ui', 'sans-serif'],
      },
      maxWidth: { prose: '66ch' },
    },
  },
  plugins: [],
} satisfies Config;
