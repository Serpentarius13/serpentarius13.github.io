import { cn } from '@/lib/utils'
import { useEffect, useState, type FC, type ReactNode } from 'react'

interface Props {
  src: string
  alt: string
  placeholder: ReactNode

  wrapperClassName?: string
  imgWrapperClassname?: string
  imgClassname?: string
  placeholderClassname?: string
}

export const Avatar: FC<Props> = ({
  src,
  alt,
  placeholder,

  wrapperClassName,
  imgWrapperClassname,
  imgClassname,
  placeholderClassname,
}) => {
  const [isError, setIsError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsError(false)
    setIsLoaded(false)
    const image = new Image()

    image.onload = () => {
      console.log('loaded')
      setIsLoaded(true)
    }

    image.onerror = () => {
      setIsError(true)
    }

    image.src = src
  }, [src])

  if (!isLoaded) {
    return (
      <div className={cn('avatar', wrapperClassName)}>
        <div className={cn('', imgWrapperClassname)}>
          <span className={cn('text-3xl', placeholderClassname)}>
            {placeholder}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('avatar', wrapperClassName)}>
      <div className={cn('', imgWrapperClassname)}>
        <img
          alt={alt}
          src={isError ? '/static/logo.webp' : src}
          className={cn('', imgClassname)}
        />
      </div>
    </div>
  )
}
