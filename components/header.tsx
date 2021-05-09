import { PropsWithChildren, ReactNode } from 'react';
import { NavigationLink } from './navigation/navigation-link';

export const Header = ({ children }: PropsWithChildren<ReactNode>): JSX.Element =>  (
  <header className="flex justify-between p-2">
    <div className="flex">
      <span className="flex items-center text-2xl font-bold mx-8 font-serif">
        loonskai.com
      </span>
      <NavigationLink href="/">Blog</NavigationLink>
      <NavigationLink href="/about">About</NavigationLink>
    </div>
    <div>
      {children}
    </div>
  </header>
);
