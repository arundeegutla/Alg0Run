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

const navigation = [
  { name: 'Home', href: '/', icon: VscBracketDot },
  { name: 'Explorer', href: '/type', icon: VscFiles },
  { name: 'Leaderboard', href: '/leaderboard', icon: MdLeaderboard },
  { name: 'race', href: '/race', icon: VscTerminalBash },
  { name: 'Profile', href: '/profile', icon: VscAccount },
];

export default function NavBar() {
  const current = usePathname();
  return (
    <div className='flex h-full w-12 bg-[#000055] border-r border-[#3e3e42]'>
      <div className=' bg-[#333333] flex flex-col items-center border-r border-[#3e3e42]'>
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`p-3 mb-1 hover:bg-[#2a2d2e] rounded ${item.href == current ? 'bg-[#37373d] border-l-2 border-[#007acc]' : ''}`}
            aria-current={item.href == current ? 'page' : undefined}
          >
            {<item.icon size={24} className='text-[#cccccc]' />}
          </a>
        ))}
      </div>
    </div>
  );
}
