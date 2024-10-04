import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'

export const Search = ({
  onChange,
  value,
  placeholder,
  onClick,
  inputClassName,
  wrapperClassName,
}: {
  onChange?: (value: string) => void
  value?: string
  onClick?: () => void
  placeholder?: string
  inputClassName?: string
  wrapperClassName?: string
}) => {
  return (
    <label
      className={cn(
        'group flex w-full items-center gap-2 rounded-md bg-base-100 px-1 py-1 ring-2 ring-base-content backdrop-blur-sm dark:ring-primary ',
        wrapperClassName,
      )}
      onClick={onClick}
    >
      <SearchIcon className="min-w-8" />
      <input
        className={cn(
          'h-full w-full border-none bg-transparent px-1 py-2 text-lg text-base-content outline-none placeholder:text-base-content/70',
          inputClassName,
        )}
        type="search"
        value={value}
        onChange={(ev) => {
          onChange?.(ev.target.value)
        }}
        placeholder={placeholder}
      />
    </label>
  )
}
