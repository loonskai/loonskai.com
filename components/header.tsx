import { PropsWithChildren, ReactNode } from 'react';
import NavigationLink from './navigation/navigation-link';

export default function Header({ children }: PropsWithChildren<ReactNode>): JSX.Element {
  return (
    <header className="bg-skin-base text-skin-base">
      <div className="logo">
        <span className="text-2xl font-bold text-brand">
          loonskai.com
        </span>
        <span>Siarhei Lunski</span>
      </div>
      <NavigationLink href="/">Blog</NavigationLink>
      <NavigationLink href="/about">About</NavigationLink>
      {children}
    </header>
  );
}
