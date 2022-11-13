import { styled } from '@linaria/react'
import Head from 'next/head'
import React, { FC, ReactNode } from 'react'

type Props = {
  head?: {
    title?: string
  }
  title?: string
  children: ReactNode
}

const SITE_NAME = 'blitz-twitter-clone'

export const AppLayout: FC<Props> = ({ head, title, children }) => {
  const pageTitle = head?.title ? `${head.title} | ${SITE_NAME}` : SITE_NAME

  return (
    <Container>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {title && <PageTitle>{title}</PageTitle>}

      {children}
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`
const PageTitle = styled.h1`
  margin-bottom: 24px;
  font-weight: bold;
  font-size: 32px;
`
