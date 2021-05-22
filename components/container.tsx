import { PropsWithChildren, ReactNode } from 'react';

export const Container = ({ children }: PropsWithChildren<ReactNode>): JSX.Element => (
  <div className="container mx-auto px-60">{children}</div>
);
