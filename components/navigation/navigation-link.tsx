import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css, useTheme, Theme } from '@emotion/react';
import { focusOutline } from '../../shared/styles';

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
  padding: 0.5rem;
  margin: 0 0.2rem;
  color: ${theme.text.primary};
  text-decoration: none;
  font-weight: ${isActive ? 700 : 400};
  border-bottom: ${isActive ? `2px solid ${theme.menu.activeLink.color}` : 'none' };
  cursor: ${isActive ? 'default' : 'pointer' };

  ${focusOutline}
  &:focus, &:active {
    border-radius: 0.2rem;
  } 
`);

export const NavigationLink = ({ href, as, children }: PropsWithChildren<NavigationLinkProps>): JSX.Element => {
  const { asPath } = useRouter();
  const theme = useTheme();
  const isActive = asPath.startsWith(href) || asPath.startsWith(as);

  return isActive ? <StyledLink theme={theme} isActive={isActive}>{children}</StyledLink> : (
    <Link href={href} passHref>
      <StyledLink theme={theme} isActive={isActive}>{children}</StyledLink>
    </Link>
  );
};
