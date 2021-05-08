import { useState, createContext, PropsWithChildren, ReactNode } from 'react';


export const themes = {
  dark: 'theme-dark',
  light: 'theme-light',
};

export const ThemeContext = createContext(themes.light);

export const useTheme = (): [string, (theme: string) => void] => {
  const [ theme, setTheme ] = useState(themes.light);
  
  const toggleTheme = value => {
    if (theme !== value) {
      setTheme(value);
    }
  };

  return [ theme, toggleTheme ];
};

export function ThemeProvider({ children }: PropsWithChildren<ReactNode>): JSX.Element {
  return (
    <ThemeContext.Provider value={themes.light}>
      {children}
    </ThemeContext.Provider>
  );
}
