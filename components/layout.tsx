import { PropsWithChildren, ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Meta } from './meta';
import { Header } from './header';
import { ThemeToggler } from './ui/theme-toggler';
import { sans } from '../shared/fonts';
import { THEME } from '../shared/themes';

const Wrapper = styled.div(({ theme }) => css`
  min-height: 100vh;
  color: ${theme.textPrimary};
  background: ${theme.backgroundPrimary};
  transition: all ease 0.3s;
  ${sans}
`);

type Props = {
  activeTheme: THEME
  toggleTheme(string): void
} & PropsWithChildren<ReactNode>

export const Layout = ({ children, activeTheme, toggleTheme }: Props): JSX.Element => {
  return (
    <>
      <Meta/>
      <Wrapper>
        <Header>
          <ThemeToggler activeTheme={activeTheme} toggleTheme={toggleTheme} />
        </Header>
        <main>{children}</main>
      </Wrapper>
    </>
  );
};
