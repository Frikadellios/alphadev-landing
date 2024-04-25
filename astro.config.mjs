import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import rehypeExternalLinks from 'rehype-external-links'
import { site } from './src/consts'
import { defaultLocale, locales } from './src/i18n/i18n'
const sitemapLocales = Object.fromEntries(
  locales.map((_, i) => [locales[i], locales[i]]),
) // Create an object with keys and values based on locales
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import vercel from '@astrojs/vercel/serverless'
import yaml from '@rollup/plugin-yaml'
import astroExpressiveCode from 'astro-expressive-code'
import icon from 'astro-icon'
import million from 'million/compiler'
import { remarkReadingTime } from './remark-reading-time.mjs';

import robotsTxt from 'astro-robots-txt'

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    plugins: [
      million.vite({
        mode: 'react',
        server: true,
        auto: {
          threshold: 0.05,
          skip: ['useBadHook', /badVariable/g],
        },
      }),
      tailwindcss(),
      yaml(),
    ],
  },
  site: site,
  integrations: [
    astroExpressiveCode({
      themes: ['material-theme-palenight', 'material-theme-palenight'],
      shiki: {},
    }),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'material-theme-palenight',
        wrap: true,
      },
      drafts: true,
    }),
    sitemap({
      filter: page => page.secret !== true,
      i18n: {
        defaultLocale: defaultLocale,
        locales: sitemapLocales,
      },
    }),
    react(),
    svelte(),
    icon({
      iconDir: 'src/assets/icons',
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
        debug: false,
      },
    }),
    robotsTxt({
      sitemap: 'https://www.devopsick.com/sitemap-0.xml',
      host: 'devopsick.com',
    }),
  ],
  i18n: {
    defaultLocale: defaultLocale,
    locales: locales,
    routing: {
      prefixDefaultLocale: true
  },
  },
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noreferrer'],
        },
      ],
    ],
    remarkPlugins: [remarkReadingTime],
    drafts: true,
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: true,
    },
  },
  output: 'server',
  adapter: vercel(),
})
