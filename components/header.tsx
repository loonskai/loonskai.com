import { PropsWithChildren, ReactNode } from 'react';
import { css } from '@emotion/react';
import { NavigationLink } from './navigation/navigation-link';
import { StyledLogo } from './styled/styled-logo';

export const Header = ({ children }: PropsWithChildren<ReactNode>): JSX.Element =>  (
  <header
    css={css`
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
    `}
  >
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      <StyledLogo>loonskai.com</StyledLogo>
      <NavigationLink href="/">Blog</NavigationLink>
      <NavigationLink href="/about">About</NavigationLink>
    </div>
    <div>
      {children}
    </div>
  </header>
);
