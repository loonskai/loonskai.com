import Meta from '../components/meta';

type Props = {
  children: JSX.Element | JSX.Element[]
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <Meta/>
      <main>
        {children}
      </main>
    </>
  );
}
