import { useMutation } from '@blitzjs/rpc'
import { FC } from 'react'

import signup from 'src/auth/mutations/signup'
import { Signup } from 'src/auth/validations'
import { FORM_ERROR, Form } from 'src/core/components/ui/Form'
import { LabeledTextField } from 'src/core/components/ui/LabeledTextField/LabeledTextField'

type Props = {
  onSuccess: () => void
}

export const SignupForm: FC<Props> = ({ onSuccess }) => {
  const [signupMutation] = useMutation(signup)

  return (
    <Form
      submitText="登録"
      schema={Signup}
      initialValues={{ email: '', password: '', passwordConfirmation: '' }}
      onSubmit={async (values) => {
        try {
          await signupMutation(values)
          onSuccess()
        } catch (error: any) {
          if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            // This error comes from Prisma
            return { email: 'このメールアドレスはすでに登録されています。' }
          } else {
            return { [FORM_ERROR]: error.toString() }
          }
        }
      }}
    >
      <LabeledTextField name="email" label="メールアドレス" width={300} />
      <LabeledTextField name="password" label="パスワード" type="password" width={520} />
      <LabeledTextField name="passwordConfirmation" label="パスワード(確認用 再入力)" type="password" width={520} />
    </Form>
  )
}
