import { PropsWithChildren, ReactNode } from 'react'
import { css } from '@emotion/react'

export const Heading = ({ children }: PropsWithChildren<ReactNode>): JSX.Element => (
  <h1
    css={css`
      margin-bottom: 2rem;
      font-size: 3rem;
      font-weight: 700;
      line-height: 1.2;
      text-align: center;
    `}
  >
    {children}
  </h1>
)
