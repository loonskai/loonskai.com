import { ChildrenProps } from '../types/Props';

export default function Container({ children }: ChildrenProps): JSX.Element {
  return <div>{children}</div>;
}
