import { BlitzPage, Routes } from '@blitzjs/next'
import { useMutation } from '@blitzjs/rpc'
import Link from 'next/link'
import { Suspense } from 'react'

import logout from 'src/auth/mutations/logout'
import Layout from 'src/core/layouts/Layout'
import { useCurrentUser } from 'src/users/hooks/useCurrentUser'

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className="container">
        <main>
          <div className="buttons" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>
          </div>
          <p>
            <strong>
              To add a new model to your app, <br />
              run the following in your terminal:
            </strong>
          </p>
          <pre>
            <code>blitz generate all project name:string</code>
          </pre>
          <div style={{ marginBottom: '1rem' }}>(And select Yes to run prisma migrate)</div>
          <div>
            <p>
              Then <strong>restart the server</strong>
            </p>
            <pre>
              <code>Ctrl + c</code>
            </pre>
            <pre>
              <code>blitz dev</code>
            </pre>
            <p>
              and go to{' '}
              <Link href="/projects">
                <a>/projects</a>
              </Link>
            </p>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Home
