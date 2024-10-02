import { type FC, type ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export const PreBlock: FC<Props> = ({ children }) => {
  return <pre>{children}</pre>
}
