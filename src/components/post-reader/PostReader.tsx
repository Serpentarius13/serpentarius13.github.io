import { getPost, readPost } from '@/lib/api'
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
    async function run() {
      if (hasRead) {
        await getPost(postId).then((r) => {
          setPost(r)
        })
        return
      }
      await readPost({ postId }).then((r) => {
        setPost(r)
        setHasRead(true)
      })
    }
    run()
  }, [])

  if (!post) return <div className="skeleton h-4 w-12" />

  return <span>{post.readings} views</span>
}
