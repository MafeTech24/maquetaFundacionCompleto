import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://porunmundomejor.org.ar',
  integrations: [
    tailwind(),
    sitemap({
      // Páginas que no deben aparecer en buscadores
      filter: (page) => !page.includes('/programas/comunidad-terapeutica'),
    }),
  ],
  output: 'static',
});
