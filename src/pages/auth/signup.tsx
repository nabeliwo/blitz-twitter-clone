import { BlitzPage, Routes } from '@blitzjs/next'
import { useRouter } from 'next/router'

import { SignupForm } from 'src/auth/components/SignupForm'
import { AppLayout } from 'src/core/components/layout/AppLayout'

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <AppLayout head={{ title: 'ユーザー登録' }} title="ユーザー登録">
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </AppLayout>
  )
}

export default SignupPage
