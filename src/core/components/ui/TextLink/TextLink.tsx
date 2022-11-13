import { styled } from '@linaria/react'
import { RouteUrlObject } from 'blitz'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

type Props = {
  href: string | RouteUrlObject
  children: ReactNode
}

export const TextLink: FC<Props> = ({ href, children }) => (
  <Link href={href} passHref>
    <Anchor>{children}</Anchor>
  </Link>
)

const Anchor = styled.a`
  color: 0065f2;
`
