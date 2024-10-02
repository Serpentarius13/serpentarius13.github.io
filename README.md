<div align="center">

## My Personal Blog

Pettily-stolen from **enscribe**: https://astro.build/themes/details/astro-erudite/

</div>

---

## Technology Stack

This is a list of the various technologies used to build this website:

| Category            | Technology Name                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| Framework           | [Astro](https://astro.build/)                                                                      |
| Styling             | [Tailwind](https://tailwindcss.com)                                                                |
| Components          | [daisyui](https://daisyui.com/)                                                                    |
| Content             | [MDX](https://mdxjs.com/)                                                                          |
| Syntax Highlighting | [Shiki](https://github.com/shikijs/shiki) + [rehype-pretty-code](https://rehype-pretty.pages.dev/) |
| Graphics            | [Figma](https://www.figma.com/)                                                                    |
| Deployment          | [Vercel](https://vercel.com)                                                                       |

---

## Features

- [Astro](https://astro.build/)&rsquo;s [Islands](https://docs.astro.build/en/concepts/islands/) architecture for partial/selective hydration and client-side interactivity while maintaining a fast-to-render static site.
- [rehype-pretty-code](https://rehype-pretty.pages.dev/) with [Shiki](https://github.com/shikijs/shiki) for advanced code block styling, highlighting, and code block titles/captions.
- Blog post authoring using [MDX](https://mdxjs.com/) for component-style content
- Astro [View Transitions](https://docs.astro.build/en/guides/view-transitions/) in <abbr title="Single Page Application">SPA</abbr> mode for smooth, opt-in animations during route switching.
- SEO optimization with fine-grained control over metadata and [Open Graph](https://ogp.me/) tags for each post.
- [RSS](https://en.wikipedia.org/wiki/RSS) feeds and sitemap generation!

## Getting Started

1. Hit &ldquo;Use this template&rdquo;, the big green button on the top right, to create a new repository in your own GitHub account with this template.

2. Clone the repository:

   ```bash
   git clone https://github.com/[YOUR_USERNAME]/[YOUR_REPO_NAME].git
   cd [YOUR_REPO_NAME]
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:1234` to get started. The following commands are also available:

   | Command            | Description                                                     |
   | ------------------ | --------------------------------------------------------------- |
   | `npm run start`    | Alias for `npm run dev`                                         |
   | `npm run build`    | Run type checking and build the project                         |
   | `npm run preview`  | Previews the built project                                      |
   | `npm run astro`    | Run Astro CLI commands                                          |
   | `npm run prettier` | Blanket format all files using [Prettier](https://prettier.io/) |

## Customization

### Site Configuration

Edit the `src/consts.ts` file to update your site's metadata, navigation links, and social links:

```typescript
export const SITE: Site = {
  TITLE: 'astro-erudite',
  DESCRIPTION:
    'astro-erudite is a opinionated, no-frills blogging template—built with Astro, Tailwind, and shadcn/ui.',
  EMAIL: 'jason@enscribe.dev',
  NUM_POSTS_ON_HOMEPAGE: 2,
  SITEURL: 'https://astro-erudite.vercel.app',
}

export const NAV_LINKS: Link[] = [
  { href: '/blog', label: 'blog' },
  { href: '/authors', label: 'authors' },
  { href: '/about', label: 'about' },
  { href: '/tags', label: 'tags' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://github.com/jktrn', label: 'GitHub' },
  { href: 'https://twitter.com/enscry', label: 'Twitter' },
  { href: 'jason@enscribe.dev', label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
]
```

## Adding Content

### Blog Posts

Add new blog posts as MDX files in the `src/content/blog/` directory. Use the following frontmatter structure:

```yml
---
title: 'Your Post Title'
description: 'A brief description of your post!'
date: 2024-01-01
tags: ['tag1', 'tag2']
image: './image.png'
authors: ['author1', 'author2']
draft: false
---
```

The blog post schema is defined as follows:

| Field         | Type (Zod)      | Requirements                                                                                                                                                                      | Required |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `title`       | `string`        | Must be ≤60 characters.                                                                                                                                                           | Yes      |
| `description` | `string`        | Must be ≤155 characters.                                                                                                                                                          | Yes      |
| `date`        | `coerce.date()` | Must be in `YYYY-MM-DD` format.                                                                                                                                                   | Yes      |
| `image`       | `image()`       | Must be exactly 1200px &times; 630px.                                                                                                                                             | Optional |
| `tags`        | `string[]`      | Preferably use kebab-case for these.                                                                                                                                              | Optional |
| `authors`     | `string[]`      | If the author has a profile, use the slug associated with their Markdown file in `src/content/authors/` (e.g. if their file is named `jane-doe.md`, use `jane-doe` in the array). | Optional |
| `draft`       | `boolean`       | Defaults to `false` if not provided.                                                                                                                                              | Optional |
