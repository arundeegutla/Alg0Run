'use client';

import React from 'react';
import { Algo } from '~/firebase/models';
import { VscChromeClose, VscGraphLine } from 'react-icons/vsc';
import dynamic from 'next/dynamic';
const Keyboard3D = dynamic(() => import('@/components/Keyboard3D'), {
  ssr: false,
});

interface Stats {
  wpm: number;
  accuracy: number;
  time: number;
  progress: number;
}

interface SecondarySidebarProps {
  algo: Algo | null;
  stats: Stats;
  onClose: () => void;
}

export default function SecondarySidebar({
  algo,
  stats,
  onClose,
}: SecondarySidebarProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className='w-[320px] bg-[#252526] border-l border-[#3e3e42] flex flex-col h-full overflow-hidden'>
      {/* Header */}
      <div className='px-4 py-2 text-xs font-semibold uppercase text-[#cccccc] border-b border-[#3e3e42] flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <VscGraphLine size={16} />
          <span>Statistics</span>
        </div>
        <button
          onClick={onClose}
          className='hover:bg-[#2a2d2e] p-1 rounded'
          title='Close'
        >
          <VscChromeClose size={16} />
        </button>
      </div>

      {/* Keyboard 3D */}
      <div className='w-full h-28'>
        <Keyboard3D />
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto p-4'>
        {algo ? (
          <div className='space-y-6'>
            {/* Current Session Stats */}
            <div className='space-y-3'>
              <h3 className='text-sm font-semibold text-[#cccccc] border-b border-[#3e3e42] pb-2'>
                Current Session
              </h3>

              {/* WPM */}
              <div className='bg-[#1e1e1e] rounded-lg p-4 border border-[#3e3e42]'>
                <div className='text-xs text-[#858585] uppercase mb-1'>
                  Words Per Minute
                </div>
                <div className='text-3xl font-bold text-[#4ec9b0]'>
                  {stats.wpm}
                </div>
                <div className='mt-2 h-2 bg-[#3e3e42] rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-[#4ec9b0] transition-all duration-300'
                    style={{
                      width: `${Math.min((stats.wpm / 100) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Accuracy */}
              <div className='bg-[#1e1e1e] rounded-lg p-4 border border-[#3e3e42]'>
                <div className='text-xs text-[#858585] uppercase mb-1'>
                  Accuracy
                </div>
                <div className='text-3xl font-bold text-[#569cd6]'>
                  {stats.accuracy.toFixed(1)}%
                </div>
                <div className='mt-2 h-2 bg-[#3e3e42] rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-[#569cd6] transition-all duration-300'
                    style={{ width: `${stats.accuracy}%` }}
                  />
                </div>
              </div>

              {/* Time */}
              <div className='bg-[#1e1e1e] rounded-lg p-4 border border-[#3e3e42]'>
                <div className='text-xs text-[#858585] uppercase mb-1'>
                  Time Elapsed
                </div>
                <div className='text-3xl font-bold text-[#dcdcaa]'>
                  {formatTime(stats.time)}
                </div>
              </div>

              {/* Progress */}
              <div className='bg-[#1e1e1e] rounded-lg p-4 border border-[#3e3e42]'>
                <div className='text-xs text-[#858585] uppercase mb-1'>
                  Progress
                </div>
                <div className='text-3xl font-bold text-[#c586c0]'>
                  {stats.progress.toFixed(0)}%
                </div>
                <div className='mt-2 h-2 bg-[#3e3e42] rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-[#c586c0] transition-all duration-300'
                    style={{ width: `${stats.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Algorithm Info */}
            <div className='space-y-3'>
              <h3 className='text-sm font-semibold text-[#cccccc] border-b border-[#3e3e42] pb-2'>
                Algorithm Details
              </h3>

              <div className='space-y-2'>
                <div>
                  <div className='text-xs text-[#858585] uppercase'>Name</div>
                  <div className='text-sm text-[#cccccc]'>{algo.name}</div>
                </div>

                <div>
                  <div className='text-xs text-[#858585] uppercase'>
                    Time Complexity
                  </div>
                  <div className='text-sm text-[#4ec9b0] font-mono'>
                    {algo.time_complexity}
                  </div>
                </div>

                <div>
                  <div className='text-xs text-[#858585] uppercase'>
                    Description
                  </div>
                  <div className='text-sm text-[#cccccc] leading-relaxed'>
                    {algo.description}
                  </div>
                </div>

                {algo.usage && (
                  <div>
                    <div className='text-xs text-[#858585] uppercase'>
                      Usage
                    </div>
                    <div className='text-sm text-[#cccccc] leading-relaxed'>
                      {algo.usage}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className='space-y-3'>
              <h3 className='text-sm font-semibold text-[#cccccc] border-b border-[#3e3e42] pb-2'>
                Tips
              </h3>
              <div className='space-y-2 text-sm text-[#858585]'>
                <div className='flex items-start gap-2'>
                  <span className='text-[#4ec9b0]'>•</span>
                  <span>Focus on accuracy over speed</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-[#569cd6]'>•</span>
                  <span>Use proper finger placement</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-[#dcdcaa]'>•</span>
                  <span>Take breaks to avoid fatigue</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center text-[#858585] mt-8'>
            Select an algorithm to view statistics
          </div>
        )}
      </div>
    </div>
  );
}
