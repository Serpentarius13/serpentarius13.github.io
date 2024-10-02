export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
  NUM_POSTS_ON_HOMEPAGE: number
  POSTS_PER_PAGE: number
  SITEURL: string
}

export type Link = {
  href: string
  label: string
}

export const SITE: Site = {
  TITLE: 'Void Flower',
  DESCRIPTION:
    'Void Flower is my personal website with (for now just a) blog, where I write about stuff programming & not.',
  EMAIL: 'serpentarium13@mail.ru',
  NUM_POSTS_ON_HOMEPAGE: 3,
  POSTS_PER_PAGE: 3,
  SITEURL: 'https://void-flower.vercel.app/',
}

export const NAV_LINKS: Link[] = [{ href: '/blog', label: 'blog' }]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://github.com/Serpentarius13', label: 'GitHub' },
  { href: 'https://x.com/numinosityy', label: 'Twitter' },
  // { href: 'jason@enscribe.dev', label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
]
