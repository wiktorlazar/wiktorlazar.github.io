// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  outDir: 'docs',
  publicDir: 'public',

  // USER PAGE -> base MUSI BYĆ '/'
  base: '/',

  integrations: [tailwind(), react()],

  vite: {
    base: '/',
    build: {
      assetsDir: '',
    },
  },
});