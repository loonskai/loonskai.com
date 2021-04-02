import Link from 'next/link';

export default function Header(): JSX.Element {
  return (
    <>
      <Link href="/">
        <a>Blog</a>
      </Link>
    </>
  );
}
