import alpine from '@astrojs/alpinejs';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';
import rehypePrettyCode, { type Options, type Theme } from 'rehype-pretty-code';
import { createCssVariablesTheme } from 'shiki';
import form from 'simple-stack-form';

export default defineConfig({
  site: 'https://phantom.style',
  outDir: '../../dist/apps/docs',
  output: 'hybrid',
  adapter: vercel(),
  vite: { cacheDir: '../../node_modules/.vite' },
  integrations: [
    mdx(),
    sitemap(),
    robotsTxt(),
    form(),
    alpine({ entrypoint: '/alpine.config.ts' }),
    tailwind({ configFile: 'apps/docs/tailwind.config.ts' }),
  ],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: createCssVariablesTheme({
            name: 'css-variables',
            variablePrefix: '--astro-code-',
          }) as Theme,
        } satisfies Options,
      ],
    ],
  },
});
