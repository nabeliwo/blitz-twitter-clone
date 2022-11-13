import { styled } from '@linaria/react'
import { ComponentPropsWithoutRef, PropsWithoutRef, forwardRef } from 'react'
import { UseFieldConfig, useField } from 'react-final-form'

export type LabeledTextFieldProps = PropsWithoutRef<JSX.IntrinsicElements['input']> & {
  name: string
  label: string
  type?: 'text' | 'password' | 'email' | 'number'
  width?: number
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
  labelProps?: ComponentPropsWithoutRef<'label'>
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, width, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === 'number'
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === '' ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError

    return (
      <div {...outerProps}>
        <Label {...labelProps} style={{ width: width ? `${width}px` : 'auto' }}>
          {label}
          <Input {...input} {...props} disabled={submitting} ref={ref} />
        </Label>

        {touched && normalizedError && <Alert role="alert">{normalizedError}</Alert>}
      </div>
    )
  },
)

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const Input = styled.input`
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid grey;
`
const Alert = styled.div`
  margin-top: 8px;
  color: red;
`
