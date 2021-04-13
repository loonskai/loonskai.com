import { PropsWithChildren, ReactNode } from 'react';

export default function Container({ children }: PropsWithChildren<ReactNode>): JSX.Element {
  return <div className="md:container mx-auto h-screen flex bg-gray-50">{children}</div>;
}
