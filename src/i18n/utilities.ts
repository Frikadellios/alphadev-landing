import { defaultLocale, locales, languages, defaultLang, ui } from '@/i18n/i18n'


export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function changeLangFromUrl(url: URL, lang: string) {
  const newLang = lang === 'en' ? 'uk' : 'en'
  const splitUrl = url.pathname.split('/');
  splitUrl[1] = newLang
  return splitUrl.join('/').substring(1)
}

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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function getStaticPaths(pages: any[]): Promise<any[]> {
  return pages.map(page => ({
    params: { slug: page.slug },
    props: { page },
  }))
}
