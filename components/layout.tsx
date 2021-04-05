import React, { useState, createContext } from 'react';
import Meta from './meta';
import Header from './header';
import Toolbar from './toolbar';
import { ChildrenProps } from '../types/Props';

export const themes = {
  dark: 'dark',
  light: 'light',
};

export const ThemeContext = createContext(themes.light);

export default function Layout({ children }: ChildrenProps): JSX.Element {
  const [ theme, setTheme ] = useState(themes.light);

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === theme) return;
    setTheme(value);
  };
  
  return (
    <>
      <Meta/>
      <ThemeContext.Provider value={theme}>
        <Header>
          <Toolbar toggleTheme={toggleTheme} />
        </Header>
        <main>
          {children}
        </main>
      </ThemeContext.Provider>
    </>
  );
}
