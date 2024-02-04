import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://phantom.style',
  outDir: '../../dist/apps/docs',
  integrations: [
    tailwind({ configFile: 'apps/docs/tailwind.config.ts' }),
    mdx(),
    sitemap(),
    robotsTxt(),
  ],
});
