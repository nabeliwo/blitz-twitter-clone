import { BlitzPage } from '@blitzjs/next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { ResetPasswordForm } from 'src/auth/components/ResetPasswordForm'
import { AppLayout } from 'src/core/components/layout/AppLayout'

const ResetPasswordPage: BlitzPage = () => {
  const [token, setToken] = useState('')
  const router = useRouter()

  useEffect(() => {
    setToken(router.query.token as string)
  }, [router.isReady, router.query.token])

  return <ResetPasswordForm token={token} />
}

ResetPasswordPage.redirectAuthenticatedTo = '/'
ResetPasswordPage.getLayout = (page) => (
  <AppLayout head={{ title: 'パスワードリセット' }} title="パスワードリセット">
    {page}
  </AppLayout>
)

export default ResetPasswordPage
