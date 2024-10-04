import FocusTrap from 'focus-trap-react'
import Fuse, { type FuseResult } from 'fuse.js/min-basic'
import { X } from 'lucide-react'
import { useMemo, useRef, useState, type FC } from 'react'
import { useEventListener } from 'usehooks-ts'
import { Search } from '../ui-new/Search'
import type { GlobalSearchRecord } from './types'

interface Props {
  records: GlobalSearchRecord[]
  onClose: () => void
}

export const GlobalSearch: FC<Props> = ({ records, onClose }) => {
  const fuse = useRef<Fuse<GlobalSearchRecord>>(
    new Fuse(records, {
      keys: ['title', 'content', 'description', 'tags'],
      threshold: 0.45,
      ignoreLocation: true,
      includeScore: true,
      isCaseSensitive: true,
    }),
  )

  const [hasTriedSearching, setHasTriedSearching] = useState(false)
  const [search, setSearch] = useState<string>('')

  const searchResults = useMemo<FuseResult<GlobalSearchRecord>[]>(() => {
    if (!search) {
      return records.map((record) => {
        return {
          refIndex: 0,
          item: record,
        } satisfies FuseResult<GlobalSearchRecord>
      })
    }

    const results = fuse.current.search(search)
    return results
  }, [search])

  const handleSetSearch = (value: string) => {
    setSearch(value)
    if (!hasTriedSearching) {
      setHasTriedSearching(true)
    }
  }

  useEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      onClose()
    }
  })

  const isNothingFound = searchResults.length === 0

  return (
    <div className="mx-auto w-[300px] sm:w-[600px]">
      <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
        <div className="flex flex-col gap-2 px-4">
          <button
            onClick={onClose}
            className="btn btn-primary absolute right-4 top-4"
          >
            <X />
          </button>

          <Search
            placeholder="Search anything here..."
            onChange={handleSetSearch}
            value={search}
          />

          <div className="mt-4 flex flex-col gap-4">
            {isNothingFound ? (
              <div className="badge mx-auto py-4 text-lg">Nothing found</div>
            ) : (
              searchResults.map((result, index) => {
                return (
                  <a
                    href={`/blog/${result.item.slug}`}
                    key={index}
                    className="focus:shadow-3xl flex flex-col gap-2 border bg-base-100 p-4 transition-all duration-300 ease-in-out hover:shadow-2xl focus:shadow-2xl focus:shadow-black focus:outline-none dark:hover:border-primary dark:hover:shadow-none dark:focus:shadow-none"
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-semibold">
                        {result.item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {result.item.description}
                      </p>
                    </div>
                  </a>
                )
              })
            )}
          </div>
        </div>
      </FocusTrap>
    </div>
  )
}
