import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://phantom.style',
  outDir: '../../dist/apps/docs',
  integrations: [
    tailwind({ configFile: 'apps/docs/tailwind.config.ts' }),
    icon({ iconDir: 'apps/docs/public' }),
    mdx(),
    sitemap(),
    robotsTxt(),
  ],
});
