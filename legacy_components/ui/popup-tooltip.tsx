import { PropsWithChildren, ReactNode } from 'react'
import { css, useTheme } from '@emotion/react'

export const PopUpTooltip = ({ children }: PropsWithChildren<ReactNode>): JSX.Element => {
  const theme = useTheme()

  return (
    <div
      css={css`
        position: absolute;
        width: max-content;
        top: 3rem;
        left: 50%;
        font-size: 0.9rem;
        font-style: italic;
        transform: translate(-50%, 0);
        background: ${theme.background.primary};
        border-radius: 0.375rem;
        padding: 0.25rem;
        margin: 0 0.145rem;
      `}
    >
      {children}
    </div>
  )
}
