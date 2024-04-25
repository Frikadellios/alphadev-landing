import { siteTitle } from '@/consts'
import { uiStrings } from '@/i18n/uiStrings'
import { getPostsToRenderInRSS } from '@/utilities/getPostsToRenderInRSS'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
const parser = new MarkdownIt()

export async function GET(context: APIContext) {
  const postsToRender = await getPostsToRenderInRSS(context, 'nl', 'blog')

  return rss({
    title: siteTitle,
    description: uiStrings.siteDescription.nl,
    site: context.site,
    items: postsToRender.map(post => ({
      title: post.title ?? '',
      pubDate: post.pubDate ?? new Date(),
      link: post.link,
      content: sanitizeHtml(parser.render(post.body)),
      ...post,
    })),
  })
}
