import { readPost } from '@/lib/api'
import { type Post } from '@prisma/client'
import { useEffect, useState, type FC } from 'react'
import { useLocalStorage } from 'usehooks-ts'

interface Props {
  postId: string
}

export const PostReader: FC<Props> = ({ postId }) => {
  const [hasRead, setHasRead] = useLocalStorage(`post-${postId}`, false)

  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    if (hasRead) return
    setHasRead(true)
    async function run() {
      await readPost({ postId }).then((r) => setPost(r))
    }
    run()
  }, [])

  if (!post) return null

  return <span>{post.readings} views</span>
}
