type Props = {
  children: JSX.Element[]
}

export default function Container({ children }: Props): JSX.Element {
  return <div>{children}</div>;
}
