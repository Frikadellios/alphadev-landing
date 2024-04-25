import { site } from '@/consts'
import { collectionDirectoryNames } from '@/i18n/i18n'
import { locales } from '@/i18n/i18n'
import getPagePath from '@/utilities/getPagePath'

export function getRelativePostPath(
  locale: string,
  collection: string,
  slug: string,
  addLeadingSlash = true,
): string {
  const trueSlug = slug.slice(slug.indexOf('/') + 1) // remove /[locale]/ from start of slug
  const collectionDirectory = [collectionDirectoryNames[collection][locale]]
  if (locales.includes(locale))
    return getPagePath(locale, collectionDirectory, trueSlug, addLeadingSlash)
  // biome-ignore lint/style/noUselessElse: <explanation>
  else throw new Error(`Unknown locale: ${locale}`)
}

export function getAbsolutePostPath(
  locale: string,
  collection: string,
  slug: string,
): string {
  return `${site}${getRelativePostPath(locale, collection, slug, true)}`
}
