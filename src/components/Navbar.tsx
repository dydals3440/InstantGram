'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

import {
  HomeIcon,
  HomeFillIcon,
  SearchIcon,
  SearchFillIcon,
  NewIcon,
  NewFillIcon,
} from './ui/icons/index';
import ColorButton from './ColorButton';
import Avatar from './Avatar';

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className='flex justify-between items-center px-6'>
      <Link href='/'>
        <h1 className='text-3xl font-bold'>Instagram</h1>
      </Link>
      <nav>
        <ul className='flex gap-4 p-4 items-center'>
          {menu.map(({ href, clickedIcon, icon }) => (
            <li key={href} className='m-3'>
              <Link href={href}>{href === pathname ? clickedIcon : icon}</Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size='small' highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton
                text='로그아웃'
                onClick={() => signOut()}
                size='small'
              />
            ) : (
              <ColorButton
                text='로그인'
                onClick={() => signIn()}
                size='small'
              />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
