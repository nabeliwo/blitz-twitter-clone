import { BlitzPage } from '@blitzjs/next'
import { useRouter } from 'next/router'

import { LoginForm } from 'src/auth/components/LoginForm'
import { AppLayout } from 'src/core/components/layout/AppLayout'

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <AppLayout head={{ title: 'ログイン' }} title="ログイン">
      <LoginForm
        onSuccess={() => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : '/'
          return router.push(next)
        }}
      />
    </AppLayout>
  )
}

export default LoginPage
