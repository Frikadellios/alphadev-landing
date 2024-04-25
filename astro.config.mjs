import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeExternalLinks from 'rehype-external-links';
import { defaultLocale, locales } from './src/i18n/i18n';
import { site } from './src/consts';
import tailwindcss from '@tailwindcss/vite';
const sitemapLocales = Object.fromEntries(locales.map((_, i) => [locales[i], locales[i]])); // Create an object with keys and values based on locales
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import million from "million/compiler";
 
export default defineConfig({
  vite: {
    plugins: [
      million.vite({
        mode: "react",
        server: true,
        auto: {
          threshold: 0.05,
          skip: ["useBadHook", /badVariable/g],
        },
      }),
	  tailwindcss()]
  },
  site: site,
  integrations: [mdx(), sitemap({
    filter: page => page.secret !== true,
    i18n: {
      defaultLocale: defaultLocale,
      locales: sitemapLocales
    }
  }), react(), svelte()],
  i18n: {
    defaultLocale: defaultLocale,
    locales: locales
  },
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, {
      target: '_blank',
      rel: ['nofollow', 'noreferrer']
    }]]
  }
});