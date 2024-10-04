import { rehypeHeadingIds, type RemarkPlugin } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import sectionize from '@hbsnow/rehype-sectionize'
import { transformerCopyButton } from '@rehype-pretty/transformers'
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from '@shikijs/transformers'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkEmoji from 'remark-emoji'
import remarkToc from 'remark-toc'

import node from '@astrojs/node'

import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'

import react from '@astrojs/react'

const remarkTimePlugin: RemarkPlugin = () => {
  return function (tree, { data }) {
    const filteredChildren = tree.children.filter((c) => c.type !== 'code')

    const textOnPage = toString({
      type: 'root',
      children: filteredChildren,
    })
    const readingTime = getReadingTime(textOnPage)
    //@ts-expect-error
    data.astro.frontmatter.readingTime = readingTime.text
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://void-flower.vercel.app/',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    icon(),
    react(),
  ],

  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      rehypeHeadingIds,
      sectionize,
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'github-light-high-contrast',
            dark: 'github-dark-high-contrast',
          },
          transformers: [
            transformerNotationDiff(),
            transformerMetaHighlight(),
            transformerCopyButton({
              visibility: 'hover',
              feedbackDuration: 1000,
            }),
          ],
        },
      ],
    ],
    remarkPlugins: [remarkToc, remarkEmoji, remarkTimePlugin],
  },
  server: {
    port: 1234,
  },
  devToolbar: {
    enabled: false,
  },

  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
})
