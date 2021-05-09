import { PropsWithChildren, ReactNode } from 'react';

export const Container = ({ children }: PropsWithChildren<ReactNode>): JSX.Element => (
  <div className="md:container mx-auto h-screen flex flex-wrap">{children}</div>
);
