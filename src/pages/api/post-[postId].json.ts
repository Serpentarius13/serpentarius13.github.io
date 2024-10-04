import { db } from '@/lib/db'
import { getPostReadingsQuery } from '@/lib/schemas'
import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async ({ params }) => {
  const queryParsed = await getPostReadingsQuery.safeParseAsync(params)
  if (!queryParsed.success) {
    return new Response(
      JSON.stringify({ error: queryParsed.error.issues[0].message }),
      {
        status: 400,
      },
    )
  }

  const { postId } = queryParsed.data

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!post) {
    return new Response(JSON.stringify({ error: 'Post not found' }), {
      status: 404,
    })
  }

  return new Response(JSON.stringify(post))
}
