import { directoryNames } from '@/i18n/i18n'
import getPagePath from '@/utilities/getPagePath'
import getPublishedPosts from '@/utilities/getPublishedPosts'
import slugify from '@sindresorhus/slugify'

export type Tags = {
  slugified: string
  name: string
}[]

export async function getUniqueTags(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  collection: any,
  locale = '',
): Promise<Tags> {
  return (await getPublishedPosts(locale, collection, ''))
    .flatMap(post => post.data.tags)
    .map(tag => ({
      slugified: slugify(tag),
      name: tag,
    }))
    .filter(
      (value, index, self) =>
        // Tag is slugified here just in case in other places we'd use a different method to slugify it.
        self.findIndex(tag => tag.slugified === value.slugified) === index,
    )
    .sort((tagA, tagB) => tagA.slugified.localeCompare(tagB.slugified))
}

export async function getPostsByTag(
  collection: 'blog',
  tag: string,
  locale: string,
) {
  return (await getPublishedPosts(locale, collection)).filter(post =>
    post.data.tags
      .map(item => {
        return slugify(item)
      })
      .includes(slugify(tag)),
  )
}

export const getTagPath = (
  locale: string,
  tag: string,
  addLeadingSlash = true,
): string => {
  // biome-ignore lint/complexity/useLiteralKeys: <explanation>
  const directories = [directoryNames['tags'][locale]]
  return getPagePath(locale, directories, tag, addLeadingSlash)
}
