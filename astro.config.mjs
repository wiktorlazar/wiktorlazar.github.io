// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  // Folder wyjściowy dla GitHub Pages
  outDir: 'docs',

  // Publiczny folder na statyczne pliki (favicon, fonty)
  publicDir: 'public',

  // Base URL dla repozytorium typu Project Page
  // W przypadku User Page można zostawić '/'
  base: '/wiktorlazar.github.io/',

  integrations: [
    tailwind(),
    react(),
  ],

  vite: {
    // Vite też musi używać base URL, aby CSS i JS ładowały się poprawnie
    base: '/wiktorlazar.github.io/',
    build: {
      // dodatkowo upewniamy się, że assets mają poprawny prefix
      assetsDir: '', 
    },
  },
});