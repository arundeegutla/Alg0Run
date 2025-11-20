import { Language } from '@/server/trpc/types';
import React from 'react';
import { VscRefresh, VscZoomIn, VscZoomOut } from 'react-icons/vsc';

interface EditorControlsBarProps {
  isFormatting: boolean;
  handleReset: () => void;
  handleIncreaseFontSize: () => void;
  handleDecreaseFontSize: () => void;
  fontSize: number;
  language: Language;
  availableLanguages: readonly Language[];
  onLanguageChange: (lang: Language) => void;
}

export default function EditorControlsBar({
  isFormatting,
  handleReset,
  handleIncreaseFontSize,
  handleDecreaseFontSize,
  fontSize,
  language,
  availableLanguages,
  onLanguageChange,
}: EditorControlsBarProps) {
  return (
    <div className='flex items-center justify-between border-b border-[#3C3C3C] bg-[#252526] px-4 py-1'>
      <div className='flex items-center space-x-2'>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleReset();
          }}
          disabled={isFormatting}
          className='h-8 px-3 py-1 text-xs text-[#CCCCCC] hover:bg-[#3C3C3C] hover:text-white rounded flex items-center gap-1 border border-transparent disabled:opacity-60 '
          title='Reset Progress'
        >
          {isFormatting ? (
            <span className='animate-spin'>
              <VscRefresh size={14} />
            </span>
          ) : (
            <VscRefresh size={14} />
          )}
          {isFormatting ? 'Formatting...' : 'Reset'}
        </button>
        <button
          // onClick={handleDecreaseFontSize}
          onMouseDown={(e) => {
            e.preventDefault();
            handleDecreaseFontSize();
          }}
          className='h-8 px-2 text-xs text-[#CCCCCC] hover:bg-[#3C3C3C] hover:text-white rounded'
          title='Decrease Font Size'
        >
          <VscZoomOut size={14} />
        </button>
        <span className='text-[#cccccc] text-xs min-w-8 text-center'>
          {fontSize}px
        </span>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleIncreaseFontSize();
          }}
          className='h-8 px-2 text-xs text-[#CCCCCC] hover:bg-[#3C3C3C] hover:text-white rounded'
          title='Increase Font Size'
        >
          <VscZoomIn size={14} />
        </button>
      </div>
      <div className='flex items-center space-x-2'>
        <label
          htmlFor='language-select'
          className='text-xs text-[#cccccc] mr-2'
        >
          Language:
        </label>
        <select
          id='language-select'
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className='bg-[#1e1e1e] text-[#cccccc] border border-[#3e3e42] rounded px-2 py-1 text-xs focus:outline-none'
          style={{ minWidth: 90 }}
        >
          {availableLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang === 'python' ? 'Python' : lang === 'cpp' ? 'C++' : 'Java'}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
