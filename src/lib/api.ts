import type { Post } from '@prisma/client'
import type { ReadPostSchema } from './schemas'

export const getPost = async (postId: string) => {
  return (await fetch(`/api/post-${postId}.json`).then((res) =>
    res.json(),
  )) as Post
}

export const readPost = async (dto: ReadPostSchema) => {
  return (await fetch(`/api/post.json`, {
    method: 'POST',
    body: JSON.stringify(dto),
  }).then((res) => res.json())) as Post
}
