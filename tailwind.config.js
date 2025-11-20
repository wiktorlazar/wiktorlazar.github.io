/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        azeret: ['AzeretMono', 'monospace'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
      colors: {
        'tm-beige': '#f5f0e8',       // jasne tło
        'tm-gray': '#333333',        // tekst
        'tm-light-gray': '#888888',  // dla nagłówków / subtelne
        'tm-link': '#1a73e8',        // linki
      },
    },
  },
  plugins: [],
};