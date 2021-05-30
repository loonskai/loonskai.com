import { PropsWithChildren, ReactNode } from 'react';
import { css } from '@emotion/react';
import { Logo } from './logo';
import { NavigationLink } from './navigation/navigation-link';
import { mediaQueries } from '../shared/styles';

export const Header = ({ children }: PropsWithChildren<ReactNode>): JSX.Element =>  (
  <header
    css={css`
      display: flex;
      flex-wrap: wrap;
      padding: 0.5rem;
      justify-content: center;

      ${mediaQueries.tablet} {
        justify-content: space-between;
      }
    `}
  >
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        ${mediaQueries.tablet} {
          width: auto;
          justify-content: flex-start;
        }
        `}
    >
      <Logo/>
      <nav
        css={css`
          width: 100%;
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          justify-content: center;

          ${mediaQueries.tablet} {
            width: auto;
            justify-content: flex-start;
          }
        `}
      >
        <NavigationLink href="/blog">Blog</NavigationLink>
        <NavigationLink href="/about">About Me</NavigationLink>
      </nav>
    </div>
    <div
      css={css`
          width: 100%;
          display: flex;
          justify-content: center;

          ${mediaQueries.tablet} {
            width: auto;
          }
      `}
    >
      {children}
    </div>
  </header>
);
