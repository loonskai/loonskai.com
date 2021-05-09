import Link from 'next/link';
import { PropsWithChildren } from 'react';

export const NavigationLink = ({ href, children }: PropsWithChildren<{
  href: string;
}>): JSX.Element => (
  <Link href={href}>
    <a className="mx-2">{children}</a>
  </Link>
);
