import { defaultLocale, locales } from '@/i18n/i18n'

export function getLocaleFromUrl(url: string): string {
  if (url === undefined) return undefined
  const parts = url.split('/').filter(el => el !== '')
  let match = ''
  // biome-ignore lint/complexity/noForEach: <explanation>
  parts.forEach(part => {
    if (locales.includes(part)) match = part
  })
  if (match) return match
  return defaultLocale
}

export function localeIsInUrl(locale: string, url: string): boolean {
  return url
    .split('/')
    .filter(el => el !== '')
    .includes(locale)
}

export async function getStaticPaths(pages: any[]): Promise<any[]> {
  return pages.map(page => ({
    params: { slug: page.slug },
    props: { page },
  }))
}
