'use client';

import React from 'react';
import {
  VscGithubInverted,
  VscInfo,
  VscWarning,
  VscBell,
} from 'react-icons/vsc';

interface Stats {
  wpm: number;
  accuracy: number;
  time: number;
  progress: number;
}

interface StatusBarProps {
  language: 'python' | 'cpp' | 'java';
  stats: Stats;
  algoName: string;
}

export default function StatusBar({
  language,
  stats,
  algoName,
}: StatusBarProps) {
  const languageDisplayNames = {
    python: 'Python',
    cpp: 'C++',
    java: 'Java',
  };

  const languageColors = {
    python: '#3776ab',
    cpp: '#00599c',
    java: '#007396',
  };

  return (
    <div className='h-6 bg-[#007acc] text-white flex items-center justify-between px-2 text-xs border-t border-[#007acc]'>
      {/* Center Section - Stats */}
      <div className='flex items-center gap-6'>
        {algoName && (
          <div className='flex items-center gap-2'>
            <span className='opacity-80'>Algorithm:</span>
            <span className='font-semibold'>{algoName}</span>
          </div>
        )}

        <div className='flex items-center gap-2'>
          <span className='opacity-80'>WPM:</span>
          <span className='font-semibold'>{stats.wpm}</span>
        </div>

        <div className='flex items-center gap-2'>
          <span className='opacity-80'>Accuracy:</span>
          <span className='font-semibold'>{stats.accuracy.toFixed(1)}%</span>
        </div>

        <div className='flex items-center gap-2'>
          <span className='opacity-80'>Progress:</span>
          <span className='font-semibold'>{stats.progress.toFixed(0)}%</span>
        </div>
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-4'>
        {/* Language */}
        <div
          className='flex items-center gap-2 hover:bg-[#005a9e] px-2 py-0.5 rounded cursor-pointer'
          style={{ borderLeft: `3px solid ${languageColors[language]}` }}
        >
          <span>{languageDisplayNames[language]}</span>
        </div>

        {/* GitHub Link */}
        <a
          href='https://github.com/arundeegutla/Alg0Run'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 hover:bg-[#005a9e] px-2 py-0.5 rounded cursor-pointer'
          title='View on GitHub'
        >
          <VscGithubInverted size={14} />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
}
