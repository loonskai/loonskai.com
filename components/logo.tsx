import { css, useTheme } from '@emotion/react';
import LogoSvg from '../public/assets/logo.svg';

export const Logo = (): JSX.Element => {
  const theme = useTheme();

  return (
    <LogoSvg
      css={css`
        width: 180px;
        margin: 1rem;
        fill: ${theme.text.primary}; 
      `}
    />
  );
}; 
