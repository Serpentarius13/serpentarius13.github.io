import { db } from '@/lib/db'
import type { APIRoute } from 'astro'
import { z } from 'astro/zod'

const schema = z.object({
  blog: z.string(),
})

export const prerender = false

export const GET: APIRoute = async ({ params, request }) => {
  const paramsParsed = await schema.safeParseAsync(params)
  if (!paramsParsed.success) {
    return new Response(
      JSON.stringify({ error: paramsParsed.error.issues[0].message }),
      {
        status: 400,
      },
    )
  }

  const { blog } = paramsParsed.data

  let existingBlog = await db.post.findUnique({
    where: {
      postId: blog,
    },
  })

  if (!existingBlog) {
    existingBlog = await db.post.create({
      data: {
        postId: blog,
        likes: 0,
      },
    })
  }

  const record = await db.post.update({
    where: { postId: blog },
    data: { likes: existingBlog.likes + 1 },
  })

  return new Response(JSON.stringify(record))
}
