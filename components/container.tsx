import { PropsWithChildren, ReactNode } from 'react';

export const Container = ({ children }: PropsWithChildren<ReactNode>): JSX.Element => (
  <div className="flex flex-wrap p-5 md:container h-screen">{children}</div>
);
