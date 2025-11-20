// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react'; 

export default defineConfig({
  // Folder wyjściowy dla GitHub Pages
  outDir: 'docs',

  // Publiczny folder na statyczne pliki (favicon, fonty)
  publicDir: 'public',

  // Base URL (ważne dla repozytoriów typu project page)
  // Dla User Page (username.github.io) można zostawić '/'
  base: '/wiktorlazar.github.io/',

  integrations: [
    tailwind(),
    react(),
  ],

  vite: {
    // Opcjonalnie: poprawia ładowanie assetów dla GH Pages
    base: '/wiktorlazar.github.io/',
  },
});