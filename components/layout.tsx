import { PropsWithChildren, ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Header } from './header';
import { Footer } from './footer';
import { ThemeToggler } from './ui/theme-toggler';
import { THEME } from '../shared/themes';

const Wrapper = styled.div(({ theme }) => css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${theme.text.primary};
  background: ${theme.background.primary};
  transition: all ease 0.3s;
`);

type Props = {
  activeTheme: THEME
  toggleTheme(string): void
  displaySubscriptionForm?: boolean
} & PropsWithChildren<ReactNode>

export const Layout = ({ children, activeTheme, toggleTheme, displaySubscriptionForm }: Props): JSX.Element => {
  return (
    <Wrapper>
      <Header>
        <ThemeToggler activeTheme={activeTheme} toggleTheme={toggleTheme} />
      </Header>
      <main>{children}</main>
      <Footer displaySubscriptionForm={displaySubscriptionForm} />
    </Wrapper>
  );
};
