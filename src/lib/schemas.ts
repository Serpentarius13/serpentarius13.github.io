import { z } from 'astro/zod'

export const readPostSchema = z.object({
  postId: z.string(),
})
export type ReadPostSchema = z.infer<typeof readPostSchema>

export const getPostReadingsQuery = z.object({
  postId: z.string(),
})
export type GetPostReadingsQuery = z.infer<typeof getPostReadingsQuery>
