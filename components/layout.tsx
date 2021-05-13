import { PropsWithChildren, ReactNode } from 'react';
import { Meta } from './meta';
import { Header } from './header';
import { ThemeToggler } from './ui/theme-toggler';
import { useTheme } from '../context/theme';

export const Layout = ({ children }: PropsWithChildren<ReactNode>): JSX.Element => {
  const [ theme, toggleTheme ] = useTheme();

  return (
    <>
      <Meta/>
      <div className={`${theme} text-primary bg-primary`}>
        <Header>
          <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
        </Header>
        <main>
          {children}
        </main>
      </div>
    </>
  );
};
