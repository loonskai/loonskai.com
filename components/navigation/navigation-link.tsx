import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css, useTheme, Theme } from '@emotion/react';

type StyledLinkProps = {
  isActive: boolean
  theme: Theme
}

type NavigationLinkProps = {
  href: string
  as?: string
}

const StyledLink = styled.a<StyledLinkProps>(({ theme, isActive }) => css`
  display: flex;
  align-items: center;
  margin: 0 0.5rem;
  font-weight: ${isActive ? 700 : 400};
  color: ${theme.menu.activeLink.color};
  border-bottom: ${isActive ? `2px solid ${theme.menu.activeLink.color}` : 'none' };
  cursor: ${isActive ? 'default' : 'pointer' };
`);

export const NavigationLink = ({ href, as, children }: PropsWithChildren<NavigationLinkProps>): JSX.Element => {
  const { asPath } = useRouter();
  const theme = useTheme();
  const isActive = asPath.startsWith(href) || asPath.startsWith(as);

  return isActive ? <StyledLink theme={theme} isActive={isActive}>{children}</StyledLink> : (
    <Link href={href} >
      <StyledLink theme={theme} isActive={isActive}>{children}</StyledLink>
    </Link>
  );
};
