import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

type StyledLinkProps = {
  isActive: boolean
}

type NavigationLinkProps = {
  href: string;
  as?: string;
}

const StyledLink = styled.a<StyledLinkProps>(({ isActive }) => css`
  display: flex;
  align-items: center;
  margin: 0 0.5rem;
  font-weight: ${isActive ? 700 : 400};
`);

export const NavigationLink = ({ href, as, children }: PropsWithChildren<NavigationLinkProps>): JSX.Element => {
  const { asPath } = useRouter();
  const isActive = asPath === href || asPath === as;

  return (
    <Link href={href}>
      <StyledLink isActive={isActive}>{children}</StyledLink>
    </Link>
  );
};
