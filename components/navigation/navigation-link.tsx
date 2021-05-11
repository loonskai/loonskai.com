import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const NavigationLink = ({ href, as, children }: PropsWithChildren<{
  href: string;
  as?: string;
}>): JSX.Element => {
  const { asPath } = useRouter();
  const isActive = asPath === href || asPath === as;

  return (
    <Link href={href}>
      <a className={`flex items-center mx-2${isActive ? ' font-bold' : ''}`}>{children}</a>
    </Link>
  );
};
