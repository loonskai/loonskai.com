import { PropsWithChildren, ReactNode } from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';
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
      <Link href="/blog">
        <StyledLogo>loonskai.com</StyledLogo>
      </Link>
      <NavigationLink href="/blog">Blog</NavigationLink>
      <NavigationLink href="/about">About Me</NavigationLink>
    </div>
    <div>
      {children}
    </div>
  </header>
);
