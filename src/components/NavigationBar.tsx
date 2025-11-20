'use client'; // This is a client component 👈🏽

import { usePathname } from 'next/navigation';
// Icons
import { MdLeaderboard } from 'react-icons/md';
// Auth
import {
  VscBracketDot,
  VscBracketError,
  VscChip,
  VscExtensions,
  VscFiles,
  VscSearch,
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
  { name: 'Profile', href: '/profile', icon: VscAccount }, // icon will be replaced in render if user exists
];

export default function NavBar() {
  const current = usePathname();
  const { googleUser } = useAuth();
  return (
    <div className='flex h-full w-12 bg-[#000055] border-r border-[#3e3e42]'>
      <div className=' bg-[#333333] flex flex-col items-center border-r border-[#3e3e42]'>
        {navigation.map((item) => {
          // Replace Profile icon with user photo if available
          const isProfile = item.name === 'Profile';
          return (
            <a
              key={item.name}
              href={item.href}
              className={`p-3 mb-1 hover:bg-[#2a2d2e] rounded ${item.href == current ? 'bg-[#37373d] border-l-2 border-[#007acc]' : ''}`}
              aria-current={item.href == current ? 'page' : undefined}
            >
              {isProfile && googleUser && googleUser.photoURL ? (
                <span className='flex items-center justify-center w-8 h-8'>
                  <Image
                    src={googleUser.photoURL}
                    alt='User Avatar'
                    width={32}
                    height={32}
                    className='rounded-full border-2 border-[#007acc] shadow-md object-cover w-8 h-8'
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
