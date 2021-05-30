import { forwardRef } from 'react';

import { css, useTheme } from '@emotion/react';
import LogoSvg from '../public/assets/logo.svg';

const LogoComponent = forwardRef<HTMLLinkElement, any>(() => {
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
});

LogoComponent.displayName = 'Logo';

export const Logo = LogoComponent;
