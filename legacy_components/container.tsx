import { PropsWithChildren, ReactNode } from 'react'
import { css } from '@emotion/react'
import { breakpoints, mediaQueries } from '../shared/styles'

export const containerCss = css`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${mediaQueries.mobile} {
    max-width: ${breakpoints.mobile};
  }
  ${mediaQueries.tablet} {
    max-width: ${breakpoints.tablet};
  }
  ${mediaQueries.laptopSmall} {
    max-width: ${breakpoints.laptopSmall};
  }
`

export const Container = ({ children }: PropsWithChildren<ReactNode>): JSX.Element => (
  <div css={containerCss}>{children}</div>
)
