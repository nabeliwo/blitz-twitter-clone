import { styled } from '@linaria/react'
import { validateZodSchema } from 'blitz'
import { PropsWithoutRef, ReactNode } from 'react'
import { Form as FinalForm, FormProps } from 'react-final-form'
import { z } from 'zod'

import { Button } from '../Button'

export { FORM_ERROR } from 'final-form'

export type Props<S extends z.ZodType<any, any>> = {
  submitText?: string
  initialValues?: FormProps<z.infer<S>>['initialValues']
  schema?: S
  children?: ReactNode
  onSubmit: FormProps<z.infer<S>>['onSubmit']
} & Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'>

export const Form = <S extends z.ZodType<any, any>>({
  submitText,
  initialValues,
  schema,
  children,
  onSubmit,
  ...props
}: Props<S>) => (
  <FinalForm
    initialValues={initialValues}
    validate={validateZodSchema(schema)}
    onSubmit={onSubmit}
    render={({ handleSubmit, submitting, submitError }) => (
      <Wrapper {...props} onSubmit={handleSubmit}>
        {children}

        {submitError && <Alert role="alert">{submitError}</Alert>}

        {submitText && (
          <Button type="submit" disabled={submitting}>
            {submitText}
          </Button>
        )}
      </Wrapper>
    )}
  />
)

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`
const Alert = styled.div`
  color: red;
`
