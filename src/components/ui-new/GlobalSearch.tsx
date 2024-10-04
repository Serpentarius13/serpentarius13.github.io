import type Fuse from 'fuse.js'
import { type FuseResult } from 'fuse.js'
import { useEffect, useRef, useState, type FC, type ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

type Record = {
  title: string
  content: string
  tags: string[]
}

export const GlobalSearch: FC<Props> = ({}) => {
  const fuse = useRef<Fuse<Record> | null>(null)
  const [searchResults, setSearchResults] = useState<FuseResult<Record>[]>([])

  useEffect(() => {
    async function run() {}

    run()
  }, [])

  const handleSearch = async (query: string) => {
    console.log(query)
    try {
      if (!fuse.current) {
        await import('fuse.js').then((r) => {
          fuse.current = new r.default(
            [
              {
                title: 'Hello World!',
                content: 'I worked!',
                tags: ['personal', 'add'],
              },
            ],
            {
              keys: ['title', 'content', 'tags'],
              includeMatches: true,
              includeScore: true,
              threshold: 0.6,
            },
          )
        })
      }

      if (!fuse.current) return

      setSearchResults(fuse.current.search(query))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <input
        type="search"
        id="search"
        placeholder="Search..."
        onInput={(ev) => {
          handleSearch((ev.target as HTMLInputElement).value)
        }}
      />
      <div className="flex flex-col gap-4" id="results">
        {searchResults.map((result) => {
          return <div key={result.item.title}>{result.item.title}</div>
        })}
      </div>
    </>
  )
}
