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
      <div className={`${theme} text-skin-base bg-skin-base`}>
        <Header>
          {/* <Toolbar> */}
          <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
          {/* </Toolbar> */}
        </Header>
        <main>
          {children}
        </main>
      </div>
    </>
  );
};
