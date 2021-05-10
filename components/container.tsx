import { PropsWithChildren, ReactNode } from 'react';

export const Container = ({ children }: PropsWithChildren<ReactNode>): JSX.Element => (
  <div className="container mx-auto px-4 h-screen">{children}</div>
);
