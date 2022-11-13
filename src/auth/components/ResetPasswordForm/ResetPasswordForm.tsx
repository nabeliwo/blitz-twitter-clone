import { Routes } from '@blitzjs/next'
import { useMutation } from '@blitzjs/rpc'
import Link from 'next/link'
import { FC } from 'react'

import resetPassword from 'src/auth/mutations/resetPassword'
import { ResetPassword } from 'src/auth/validations'
import { FORM_ERROR, Form } from 'src/core/components/ui/Form'
import { LabeledTextField } from 'src/core/components/ui/LabeledTextField/LabeledTextField'

type Props = {
  token: string
}

export const ResetPasswordForm: FC<Props> = ({ token }) => {
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  if (isSuccess) {
    return (
      <div>
        <p>パスワードがリセットをされました。</p>
        <p>
          <Link href={Routes.Home()}>トップページへ</Link>
        </p>
      </div>
    )
  }

  return (
    <Form
      submitText="パスワードを更新"
      schema={ResetPassword}
      initialValues={{ password: '', passwordConfirmation: '', token }}
      onSubmit={async (values) => {
        try {
          await resetPasswordMutation({ ...values, token })
        } catch (error: any) {
          if (error.name === 'ResetPasswordError') {
            return {
              [FORM_ERROR]: error.message,
            }
          } else {
            return {
              [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again.',
            }
          }
        }
      }}
    >
      <LabeledTextField name="password" label="新しいパスワード" type="password" width={520} />
      <LabeledTextField name="passwordConfirmation" label="新しいパスワード(確認用 再入力)" type="password" width={520} />
    </Form>
  )
}
