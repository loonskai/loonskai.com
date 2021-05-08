import { PropsWithChildren, ReactNode } from 'react';

export function Container({ children }: PropsWithChildren<ReactNode>): JSX.Element {
  return <div className="md:container mx-auto h-screen flex flex-wrap">{children}</div>;
}
