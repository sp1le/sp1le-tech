// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://sp1le.tech';

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  i18n: {
    locales: ['en', 'uk'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', uk: 'uk' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  // One cached stylesheet beats re-sending 28 KB of CSS on every navigation.
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
