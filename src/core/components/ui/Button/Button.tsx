import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { FC } from 'react'

type Props = JSX.IntrinsicElements['button'] & {
  theme?: 'primary' | 'secondary'
}

const themeStyle = {
  primary: css`
    background-color: #0065f2;
    color: #fff;
  `,
}

export const Button: FC<Props> = ({ theme = 'primary', children, ...props }) => (
  <Wrapper {...props} className={themeStyle[theme]}>
    {children}
  </Wrapper>
)

const Wrapper = styled.button`
  padding: 8px 16px;
  border-radius: 6px;

  :disabled {
    opacity: 0.6;
  }
`
