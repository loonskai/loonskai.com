import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default function NavigationLink({ href, children }: PropsWithChildren<{
  href: string;
}>): JSX.Element {
  return (
    <Link href={href}>
      <a className="font-bold">{children}</a>
    </Link>
  );
}
