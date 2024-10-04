import {
  lazy,
  useEffect,
  useRef,
  useState,
  useTransition,
  type FC,
  type MouseEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { Search } from '../ui-new/Search'
import type { GlobalSearchRecord } from './types'

interface Props {
  records: GlobalSearchRecord[]
}

const LazyLoaded = lazy(() =>
  import('./GlobalSearch').then((r) => ({ default: r.GlobalSearch })),
)

export const GlobalSearchTrigger: FC<Props> = ({ records }) => {
  const [transition, setTransition] = useTransition()
  const [isSearchModalOpened, setIsSearchModalOpened] = useState(false)

  const nodeRef = useRef<HTMLDivElement>(null)

  const closeModal = () => {
    setTransition(() => {
      setIsSearchModalOpened(false)
    })
  }

  const handleCloseModal = (ev: MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation()
    if (ev.target !== nodeRef.current) {
      return
    }
    closeModal()
  }

  const handleOpenModal = () => {
    setTransition(() => {
      setIsSearchModalOpened(true)
    })
  }

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true)
    }
  }, [])

  console.log(hasMounted, isSearchModalOpened)

  return (
    <>
      <Search onClick={handleOpenModal} placeholder="Tap here!" />

      {hasMounted &&
        createPortal(
          <CSSTransition
            classNames={{
              enterActive: 'opacity-100 !z-[100]',
              enterDone: 'opacity-100 !z-[100]',
              exitActive: 'opacity-0',
              exitDone: 'opacity-0',
            }}
            nodeRef={nodeRef}
            in={isSearchModalOpened}
            timeout={200}
          >
            <div
              className={
                'absolute left-0 top-0 -z-[10] h-screen w-screen bg-black/60 pt-12 opacity-0  backdrop-blur-md transition-all'
              }
              onClick={handleCloseModal}
              ref={nodeRef}
              id="portal"
            >
              {isSearchModalOpened && (
                <LazyLoaded onClose={closeModal} records={records} />
              )}
            </div>
          </CSSTransition>,
          document.body,
        )}
    </>
  )
}
