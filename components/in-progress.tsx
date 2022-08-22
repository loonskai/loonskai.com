import { css } from '@emotion/react'

export const InProgress = (): JSX.Element => (
  <p
    css={css`
      justify-self: center;
      flex: 1;
      text-align: center;
    `}
  >
    Coming soon
  </p>
)
