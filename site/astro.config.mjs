// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.new/config
export default defineConfig({
  site: 'https://dazzlit.com',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
