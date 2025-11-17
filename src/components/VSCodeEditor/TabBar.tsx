import React from 'react';
import { FaJava } from 'react-icons/fa';
import { SiPython, SiCplusplus } from 'react-icons/si';
import { VscClose } from 'react-icons/vsc';

interface TabBarProps {
  algo: { name?: string } | null;
  language: 'python' | 'cpp' | 'java';
  activeTab: 'code' | 'info';
  setActiveTab: (tab: 'code' | 'info') => void;
  handleReset: () => void;
}

export default function TabBar({
  algo,
  language,
  activeTab,
  setActiveTab,
  handleReset,
}: TabBarProps) {
  const getLanguageIcon = (lang: string) => {
    const iconProps = { size: 14 };
    switch (lang) {
      case 'python':
        return <SiPython {...iconProps} />;
      case 'cpp':
        return <SiCplusplus {...iconProps} />;
      case 'java':
        return <FaJava {...iconProps} />;
      default:
        return null;
    }
  };
  return (
    <div className='h-9 bg-[#2d2d2d] border-b border-[#3e3e42] flex items-center'>
      {algo && (
        <div className='flex items-center h-full w-full'>
          <div
            onClick={() => setActiveTab('code')}
            className={`cursor-pointer flex items-center gap-2 px-4 h-full border-r border-[#3e3e42] text-sm ${
              activeTab === 'code'
                ? 'bg-[#1e1e1e] text-[#cccccc]'
                : 'bg-[#2d2d2d] text-[#858585] hover:bg-[#2a2d2e]'
            }`}
          >
            <div className='flex items-center gap-2'>
              {getLanguageIcon(language)}
              <span>
                {algo?.name ?? 'Algorithm'}.
                {language === 'cpp'
                  ? 'cpp'
                  : language === 'python'
                    ? 'py'
                    : 'java'}
              </span>
            </div>
            {activeTab === 'code' && (
              <div
                className='ml-2 hover:bg-[#505050] rounded p-0.5'
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                title='Reset'
              >
                <VscClose size={14} />
              </div>
            )}
          </div>
          <button
            onClick={() => setActiveTab('info')}
            className={`cursor-pointer flex items-center gap-2 px-4 h-full border-r border-[#3e3e42] text-sm ${
              activeTab === 'info'
                ? 'bg-[#1e1e1e] text-[#cccccc]'
                : 'bg-[#2d2d2d] text-[#858585] hover:bg-[#2a2d2e]'
            }`}
          >
            <span>📚</span>
            <span>Info</span>
          </button>
        </div>
      )}
    </div>
  );
}
