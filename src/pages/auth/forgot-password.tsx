import { BlitzPage } from '@blitzjs/next'

import { ForgotPasswordForm } from 'src/auth/components/ForgotPasswordForm'
import { AppLayout } from 'src/core/components/layout/AppLayout'

const ForgotPasswordPage: BlitzPage = () => (
  <AppLayout head={{ title: 'パスワードを忘れた場合' }} title="パスワードを忘れた場合">
    <ForgotPasswordForm />
  </AppLayout>
)

export default ForgotPasswordPage
