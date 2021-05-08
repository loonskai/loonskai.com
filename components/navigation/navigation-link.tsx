import Link from 'next/link';
import { PropsWithChildren } from 'react';

export function NavigationLink({ href, children }: PropsWithChildren<{
  href: string;
}>): JSX.Element {
  return (
    <Link href={href}>
      <a className="mx-2">{children}</a>
    </Link>
  );
}
