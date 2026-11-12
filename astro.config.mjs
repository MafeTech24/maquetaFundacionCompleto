import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Dirección del sitio: en Vercel se toma sola del dominio de producción.
// Mientras no esté conectado porunmundomejor.org.ar, usa la dirección .vercel.app
// (así las vistas previas de WhatsApp y redes encuentran las imágenes);
// cuando se conecte el dominio en Vercel, pasa a usarlo automáticamente.
const SITE = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://porunmundomejor.org.ar';

export default defineConfig({
  site: SITE,
  integrations: [
    tailwind(),
    sitemap({
      // Páginas que no deben aparecer en buscadores
      filter: (page) => !page.includes('/programas/comunidad-terapeutica'),
    }),
  ],
  output: 'static',
});
