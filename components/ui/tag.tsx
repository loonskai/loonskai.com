import { css, useTheme } from '@emotion/react';

type Props = {
  tag: string
}

export const Tag = ({ tag }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <span
      css={css`
        background: ${theme.background.primary};
        border-radius: 0.375rem;
        padding: 0.25rem;
        margin-right: 0.5rem;
      `}
    >{tag}</span>
  );
}; 
