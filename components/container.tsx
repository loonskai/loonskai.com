import { PropsWithChildren, ReactNode } from 'react';

export default function Container({ children }: PropsWithChildren<ReactNode>): JSX.Element {
  return <div>{children}</div>;
}
