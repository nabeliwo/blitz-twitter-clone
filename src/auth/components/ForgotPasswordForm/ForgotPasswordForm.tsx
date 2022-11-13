import { useMutation } from '@blitzjs/rpc'

import forgotPassword from 'src/auth/mutations/forgotPassword'
import { ForgotPassword } from 'src/auth/validations'
import { FORM_ERROR, Form } from 'src/core/components/ui/Form'
import { LabeledTextField } from 'src/core/components/ui/LabeledTextField/LabeledTextField'

export const ForgotPasswordForm = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  if (isSuccess) {
    return <p>メールを送信しました。</p>
  }

  return (
    <Form
      submitText="パスワードリセットメールを送信"
      schema={ForgotPassword}
      initialValues={{ email: '' }}
      onSubmit={async (values) => {
        try {
          await forgotPasswordMutation(values)
        } catch (error: any) {
          return {
            [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again.',
          }
        }
      }}
    >
      <p>パスワードリセットメールを送信します。</p>
      <LabeledTextField name="email" label="メールアドレス" width={300} />
    </Form>
  )
}
