import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import rehypeExternalLinks from 'rehype-external-links'
import { site } from './src/consts'
import { defaultLocale, locales } from './src/i18n/i18n'
const sitemapLocales = Object.fromEntries(
  locales.map((_, i) => [locales[i], locales[i]]),
) // Create an object with keys and values based on locales
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import vercel from '@astrojs/vercel/serverless'
import yaml from '@rollup/plugin-yaml'
import icon from 'astro-icon'
import million from 'million/compiler'
import { remarkReadingTime } from './src/utilities/readingTime.mjs'

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
    mdx(),
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
  ],
  i18n: {
    defaultLocale: defaultLocale,
    locales: locales,
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
