'use client';

import { usePathname } from 'next/navigation';
import { MdLeaderboard } from 'react-icons/md';
import {
  VscBracketDot,
  VscFiles,
  VscTerminalBash,
  VscAccount,
} from 'react-icons/vsc';

import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

const navigation = [
  { name: 'Home', href: '/', icon: VscBracketDot },
  { name: 'Explorer', href: '/type', icon: VscFiles },
  { name: 'Leaderboard', href: '/leaderboard', icon: MdLeaderboard },
  { name: 'race', href: '/race', icon: VscTerminalBash },
  { name: 'Profile', href: '/profile', icon: VscAccount },
];

export default function NavBar() {
  const current = usePathname();
  const { googleUser } = useAuth();

  return (
    <div className='flex h-full w-14 border-r border-[#3e3e42]'>
      <div className='w-full bg-[#333333] flex flex-col items-center border-r border-[#3e3e42]'>
        {navigation.map((item) => {
          const isProfile = item.name === 'Profile';
          return (
            <a
              key={item.name}
              href={item.href}
              className={`p-3 my-1 hover:bg-[#2a2d2e] rounded ${item.href == current && !isProfile ? 'bg-[#37373d] border-l-2 border-[#007acc]' : ''}`}
              aria-current={item.href == current ? 'page' : undefined}
            >
              {isProfile && googleUser && googleUser.photoURL ? (
                <span className='flex items-center justify-center w-8 h-8'>
                  <Image
                    src={googleUser.photoURL}
                    alt='User Avatar'
                    width={32}
                    height={32}
                    className='rounded-full shadow-md object-cover w-8 h-8'
                    style={{ background: '#222' }}
                  />
                </span>
              ) : (
                <item.icon size={24} className='text-[#cccccc]' />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
