import { useState, createContext, PropsWithChildren, ReactNode, ChangeEvent } from 'react';
import Meta from './meta';
import Header from './header';
import Toolbar from './toolbar';

export const themes = {
  dark: 'theme-dark',
  light: 'theme-light',
};

export const ThemeContext = createContext(themes.light);

export default function Layout({ children }: PropsWithChildren<ReactNode>): JSX.Element {
  const [ theme, setTheme ] = useState(themes.light);

  const toggleTheme = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === theme) return;
    setTheme(value);
  };
  
  return (
    <>
      <Meta/>
      <ThemeContext.Provider value={theme}>
        <div className={theme}>
          <Header>
            <Toolbar toggleTheme={toggleTheme} />
          </Header>
          <main>
            {children}
          </main>
        </div>
      </ThemeContext.Provider>
    </>
  );
}
