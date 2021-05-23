import { PropsWithChildren, ReactNode } from 'react';
import { css } from '@emotion/react';
import { breakpoints, mediaQueries } from '../shared/styles';

export const containerCss = css`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  ${mediaQueries[0]} {
    max-width: ${breakpoints[0]};
  }
  ${mediaQueries[1]} {
    max-width: ${breakpoints[1]};
  }
  ${mediaQueries[2]} {
    max-width: ${breakpoints[2]};
  }
`;

export const Container = ({ children }: PropsWithChildren<ReactNode>): JSX.Element => (
  <div css={containerCss}>{children}</div>
);
