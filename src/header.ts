export type navigationItem = Readonly<{
  path: string
  label: string
}>

export const headerMenu: Record<string, Record<string, navigationItem[]>> = {
  en: {
    items: [
      {
        path: '/en/',
        label: 'Home',
      },
      {
        path: '/en/blog',
        label: 'Blog',
      },
      {
        path: '/en/tag',
        label: 'Tags',
      },
      {
        path: '/en/about',
        label: 'About',
      },
    ],
  },
  de: {
    items: [
      {
        path: '/de/',
        label: 'Home',
      },
      {
        path: '/de/blog',
        label: 'Blog',
      },
      {
        path: '/de/thema',
        label: 'Themen',
      },
      {
        path: '/de/about',
        label: 'About',
      },
    ],
  },
  nl: {
    items: [
      {
        path: '/nl/',
        label: 'Home',
      },
      {
        path: '/nl/blog',
        label: 'Blog',
      },
      {
        path: '/nl/thema',
        label: 'Themen',
      },
      {
        path: '/nl/about',
        label: 'About',
      },
    ],
  },
  ru: {
    items: [
      {
        path: '/ru/',
        label: 'Home',
      },
      {
        path: '/ru/blog',
        label: 'Blog',
      },
      {
        path: '/ru/thema',
        label: 'Themen',
      },
      {
        path: '/ru/about',
        label: 'About',
      },
    ],
  },
  fr: {
    items: [
      {
        path: '/fr/',
        label: 'Home',
      },
      {
        path: '/fr/blog',
        label: 'Blog',
      },
      {
        path: '/fr/thema',
        label: 'Themen',
      },
      {
        path: '/fr/about',
        label: 'About',
      },
    ],
  },
  es: {
    items: [
      {
        path: '/es/',
        label: 'Home',
      },
      {
        path: '/es/blog',
        label: 'Blog',
      },
      {
        path: '/es/thema',
        label: 'Themen',
      },
      {
        path: '/es/about',
        label: 'About',
      },
    ],
  },
  uk: {
    items: [
      {
        path: '/uk/',
        label: 'Home',
      },
      {
        path: '/uk/blog',
        label: 'Blog',
      },
      {
        path: '/uk/thema',
        label: 'Themen',
      },
      {
        path: '/uk/about',
        label: 'About',
      },
    ],
  },
}
