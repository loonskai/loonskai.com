import Link from 'next/link'
import { forwardRef } from 'react'
import { css, useTheme } from '@emotion/react'
import { primaryButtonCss } from './primary-button'
import { focusOutline } from '../../shared/styles'

const PrimaryLinkComponent = forwardRef<HTMLLinkElement, any>(({ children, ...props }, ref) => {
  const theme = useTheme()

  return (
    <Link
      ref={ref}
      css={css`
        ${primaryButtonCss}
        color: ${theme.buttons.default.color};
        background-color: ${theme.buttons.default.background};

        &:hover {
          color: ${theme.buttons.hover.color};
          background-color: ${theme.buttons.hover.background};
        }

        ${focusOutline}
      `}
      {...props}
    >
      {children}
    </Link>
  )
})

PrimaryLinkComponent.displayName = 'PrimaryLink'

export const PrimaryLink = PrimaryLinkComponent
