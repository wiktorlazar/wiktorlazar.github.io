// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  outDir: 'docs',
  base: '/', // User Page – zostaw '/'
  integrations: [tailwind(), react()],
  vite: {
    build: {
      assetsDir: '', // aby nie dodawało folderu _astro w ścieżkach
    },
  },
});