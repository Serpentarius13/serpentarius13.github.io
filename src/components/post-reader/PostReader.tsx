import { readPost } from '@/lib/api'
import { type Post } from '@prisma/client'
import { useEffect, useRef, useState, type FC } from 'react'

interface Props {
  postId: string
}

export const PostReader: FC<Props> = ({ postId }) => {
  const hasRead = useRef(false)
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    if (hasRead.current) return
    hasRead.current = true
    async function run() {
      await readPost({ postId }).then((r) => setPost(r))
    }
    run()
  }, [])

  if (!post) return null

  return <span>{post.readings} views</span>
}
