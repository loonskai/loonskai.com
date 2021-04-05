import Link from 'next/link';
import { ChildrenProps } from '../types/Props';

export default function Header({ children }: ChildrenProps): JSX.Element {
  return (
    <header className="bg-gray-900 text-green-300">
      <div className="logo">
        <span className="text-2xl font-bold">
          loonskai.com
        </span>
        <span>Siarhei Lunski</span>
      </div>
      <Link href="/">
        <a className="font-bold text-blue-500" >Blog</a>
      </Link>
      <Link href="/about">
        <a className="font-bold text-blue-500" >About</a>
      </Link>
      {children}
    </header>
  );
}
