import { useState, PropsWithChildren, ReactNode } from 'react';
import styled from '@emotion/styled';
import { css, ThemeProvider } from '@emotion/react';
import { Meta } from './meta';
import { Header } from './header';
import { ThemeToggler } from './ui/theme-toggler';
import { themeValues, THEMES } from '../shared/themes';
import { sans } from '../shared/fonts';

const Wrapper = styled.div(({ theme }) => css`
  min-height: 100vh;
  color: ${theme.textPrimary};
  background: ${theme.backgroundPrimary};
  ${sans}
`);

export const Layout = ({ children }: PropsWithChildren<ReactNode>): JSX.Element => {
  const [ theme, setTheme ] = useState(THEMES.LIGHT);
  const toggleTheme = () => {
    setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  };

  return (
    <ThemeProvider theme={themeValues[theme]}>
      <Meta/>
      <Wrapper>
        <Header>
          <ThemeToggler activeTheme={theme} toggleTheme={toggleTheme} />
        </Header>
        <main>{children}</main>
      </Wrapper>
    </ThemeProvider>
  );
};
