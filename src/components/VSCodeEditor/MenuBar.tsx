import { Algo } from '@/server/trpc/types';
import React from 'react';
import { VscLayoutSidebarLeft, VscLayoutSidebarRight } from 'react-icons/vsc';

interface MenuBarProps {
  algo: Algo | null;
  onTogglePrimarySidebar: () => void;
  onToggleSecondarySidebar: () => void;
}

export default function MenuBar({
  algo,
  onTogglePrimarySidebar,
  onToggleSecondarySidebar,
}: MenuBarProps) {
  return (
    <div className='h-9 bg-[#3c3c3c] border-b border-[#3e3e42] flex items-center px-2 text-sm'>
      <button
        onClick={onTogglePrimarySidebar}
        className='p-1 hover:bg-[#505050] rounded mr-1'
        title='Toggle Primary Sidebar'
      >
        <VscLayoutSidebarLeft size={16} />
      </button>
      <button
        onClick={onToggleSecondarySidebar}
        className='p-1 hover:bg-[#505050] rounded mr-4'
        title='Toggle Secondary Sidebar'
      >
        <VscLayoutSidebarRight size={16} />
      </button>

      <div className='ml-auto text-[#cccccc] text-xs'>
        {algo?.name ?? 'No Algorithm Selected'}
      </div>
    </div>
  );
}
