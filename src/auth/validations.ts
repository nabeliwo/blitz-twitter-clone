import { z } from 'zod'

const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const Signup = z
  .object({
    email,
    password,
    passwordConfirmation: password,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'パスワードと確認用パスワードが一致していません。',
    path: ['passwordConfirmation'], // set the path of the error
  })

export const Login = z.object({
  email,
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'パスワードと確認用パスワードが一致していません。',
    path: ['passwordConfirmation'], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
