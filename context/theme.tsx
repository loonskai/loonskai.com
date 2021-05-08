import { useState, createContext, PropsWithChildren, ReactNode, useContext } from 'react';


export const themes = {
  dark: 'theme-dark',
  light: 'theme-light',
};

const ThemeContext = createContext(null);
const ToggleThemeContext = createContext(null);

export const useTheme = (): [string, (theme: string) => void] => {
  const theme = useContext(ThemeContext);
  const toggleTheme = useContext(ToggleThemeContext);

  return [ theme, toggleTheme ];
};

export function ThemeProvider({ children }: PropsWithChildren<ReactNode>): JSX.Element {
  const [ theme, setTheme ] = useState(themes.light);
  const toggleTheme = value => {
    if (value !== theme) {
      setTheme(value);
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <ToggleThemeContext.Provider value={toggleTheme}>
        {children}
      </ToggleThemeContext.Provider>
    </ThemeContext.Provider>
  );
}
