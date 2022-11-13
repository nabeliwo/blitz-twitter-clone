import { Routes } from '@blitzjs/next'
import { useMutation } from '@blitzjs/rpc'
import { styled } from '@linaria/react'
import { AuthenticationError, PromiseReturnType } from 'blitz'
import { FC } from 'react'

import login from 'src/auth/mutations/login'
import { Login } from 'src/auth/validations'
import { FORM_ERROR, Form } from 'src/core/components/ui/Form'
import { LabeledTextField } from 'src/core/components/ui/LabeledTextField/LabeledTextField'
import { TextLink } from 'src/core/components/ui/TextLink'

type Props = {
  onSuccess: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm: FC<Props> = ({ onSuccess }) => {
  const [loginMutation] = useMutation(login)

  return (
    <Wrapper>
      <Form
        submitText="ログイン"
        schema={Login}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            onSuccess(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: 'メールアドレスもしくはパスワードが間違っています。' }
            } else {
              return {
                [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="メールアドレス" width={300} />

        <Password>
          <LabeledTextField name="password" label="パスワード" type="password" width={520} />

          <TextLink href={Routes.ForgotPasswordPage()}>パスワードを忘れた場合はこちら</TextLink>
        </Password>
      </Form>

      <TextLink href={Routes.SignupPage()}>新規登録はこちら</TextLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  a {
    font-size: 14px;
  }
`
const Password = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
