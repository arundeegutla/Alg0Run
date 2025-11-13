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
    <div className='w-[320px] bg-[#252526] border-l border-[#3e3e42] flex flex-col h-full overflow-hidden font-mono'>
      {/* Header */}
      <div className='px-4 py-2 text-xs font-semibold uppercase text-[#cccccc] border-b border-[#3e3e42] flex items-center justify-between font-mono'>
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
      <div className='w-full h-24'>
        <Keyboard3D />
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto p-4'>
        {algo ? (
          <div className='space-y-6'>
            {/* Current Session Stats */}
            <div className='space-y-3'>
              <h3 className='text-sm font-semibold text-[#cccccc] border-b border-[#3e3e42] pb-2 font-mono'>
                Current Session
              </h3>

              {/* WPM */}
              <div className='bg-[#1e1e1e] rounded-lg p-4 border border-[#3e3e42] font-mono'>
                <div className='text-xs text-[#858585] uppercase mb-1 font-mono'>
                  Words Per Minute
                </div>
                <div className='text-3xl font-bold text-[#4ec9b0] font-mono'>
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
              <div className='bg-[#1e1e1e] rounded-lg p-4 border border-[#3e3e42] font-mono'>
                <div className='text-xs text-[#858585] uppercase mb-1 font-mono'>
                  Accuracy
                </div>
                <div className='text-3xl font-bold text-[#569cd6] font-mono'>
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
              <div className='bg-[#1e1e1e] rounded-lg p-4 border border-[#3e3e42] font-mono'>
                <div className='text-xs text-[#858585] uppercase mb-1 font-mono'>
                  Time Elapsed
                </div>
                <div className='text-3xl font-bold text-[#dcdcaa] font-mono'>
                  {formatTime(stats.time)}
                </div>
              </div>

              {/* Progress */}
              <div className='bg-[#1e1e1e] rounded-lg p-4 border border-[#3e3e42] font-mono'>
                <div className='text-xs text-[#858585] uppercase mb-1 font-mono'>
                  Progress
                </div>
                <div className='text-3xl font-bold text-[#c586c0] font-mono'>
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

            {/* Tips */}
            <div className='space-y-3'>
              <h3 className='text-sm font-semibold text-[#cccccc] border-b border-[#3e3e42] pb-2 font-mono'>
                Tips
              </h3>
              <div className='space-y-2 text-sm text-[#858585] font-mono'>
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
          <div className='text-center text-[#858585] mt-8 font-mono'>
            Select an algorithm to view statistics
          </div>
        )}
      </div>
    </div>
  );
}
