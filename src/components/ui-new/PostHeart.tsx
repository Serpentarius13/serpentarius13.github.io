import { useEffect, useState, type FC } from 'react'

interface Props {
  postid: string
}

export const PostHeart: FC<Props> = ({}) => {
  const [likes, setLikes] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function run() {
      setLoading(true)
      fetch('/api/aboba.json')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setLikes(data.likes)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    run()
  }, [])

  if (loading) return null

  return <>{likes}</>
}
