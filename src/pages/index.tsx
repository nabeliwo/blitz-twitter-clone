import { BlitzPage, Routes } from '@blitzjs/next'
import { useMutation } from '@blitzjs/rpc'
import Link from 'next/link'
import { Suspense } from 'react'

import logout from 'src/auth/mutations/logout'
import { AppLayout } from 'src/core/components/layout/AppLayout'
import { useCurrentUser } from 'src/users/hooks/useCurrentUser'

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
    <AppLayout>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </AppLayout>
  )
}

Home.authenticate = { redirectTo: Routes.LoginPage() }

export default Home
