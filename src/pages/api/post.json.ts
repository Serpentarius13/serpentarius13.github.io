import { db } from '@/lib/db'
import { readPostSchema } from '@/lib/schemas'
import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json()
  const bodyParsed = await readPostSchema.safeParseAsync(body)
  if (!bodyParsed.success) {
    return new Response(
      JSON.stringify({ error: bodyParsed.error.issues[0].message }),
      {
        status: 400,
      },
    )
  }

  const { postId } = bodyParsed.data

  let existingBlog = await db.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!existingBlog) {
    existingBlog = await db.post.create({
      data: {
        id: postId,
        readings: 0,
      },
    })
  }

  const record = await db.post.update({
    where: {
      id: postId,
    },
    data: {
      readings: existingBlog.readings + 1,
    },
  })

  return new Response(JSON.stringify(record))
}
