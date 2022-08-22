import { css, useTheme } from '@emotion/react'

type Props = {
  tag: string
}

export const Tag = ({ tag }: Props): JSX.Element => {
  const theme = useTheme()

  return (
    <span
      css={css`
        background: ${theme.background.primary};
        font-weight: 600;
        border-radius: 0.375rem;
        padding: 0.25rem;
        margin: 0 0.145rem;
      `}
    >
      {tag}
    </span>
  )
}
