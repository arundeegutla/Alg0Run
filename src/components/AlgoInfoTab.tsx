'use client';

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { SiPython, SiCplusplus } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { auth } from '@/server/firebase/clientApp';
import { Algo, PlayBasic } from '@/server/trpc/types';
import { trpc } from '@/server/trpc/client';

interface AlgoInfoTabProps {
  algo: Algo | null;
}

// Helper function to convert time complexity notation to LaTeX
const convertToLatex = (complexity: string): string => {
  // Convert O(n^2) to O(n^{2})
  // Convert O(log n) to O(\log n)
  // Convert O(nlog(n)) to O(n \log n)
  let latex = complexity;

  // Replace log with \log
  latex = latex.replace(/log/g, '\\log');

  // Replace ^ with ^{} for proper LaTeX superscripts
  latex = latex.replace(/\^(\d+)/g, '^{$1}');

  // Add spacing for better readability
  latex = latex.replace(/([a-z])(\d)/gi, '$1 $2');

  return latex;
};

export default function AlgoInfoTab({ algo }: AlgoInfoTabProps) {
  const [sortBy, setSortBy] = useState<'score' | 'wpm' | 'accuracy'>('score');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [user] = useAuthState(auth);

  // Use trpc to fetch leaderboard, refetch on algo change or tab mount
  const getAlgoLeaderboard = trpc.leaderboard.getAlgoLeaderboard.useQuery(
    { algoId: algo?.id ?? '' },
    {
      enabled: !!algo && !!user,
      retry: false,
    }
  );

  // Refetch leaderboard every time algo changes (e.g., tab switch)
  useEffect(() => {
    if (getAlgoLeaderboard.refetch && !!algo && !!user) {
      getAlgoLeaderboard.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algo?.id, user]);

  const loading = getAlgoLeaderboard.isLoading;

  // Derive leaderboard from query data
  const leaderboard: PlayBasic[] =
    getAlgoLeaderboard.data && getAlgoLeaderboard.data.results
      ? getAlgoLeaderboard.data.results
      : [];

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'python':
        return <SiPython className='text-[#3776ab]' />;
      case 'cpp':
        return <SiCplusplus className='text-[#00599c]' />;
      case 'java':
        return <FaJava className='text-[#007396]' />;
      default:
        return null;
    }
  };

  // Fixed font size for info
  if (!algo) {
    return (
      <div className='h-full flex items-center justify-center text-[#858585] bg-[#1e1e1e]'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>📚</div>
          <h2 className='text-xl mb-2'>No Algorithm Selected</h2>
          <p className='text-sm'>
            Select an algorithm from the explorer to view details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full w-full flex flex-col bg-[#1e1e1e] text-lg'>
      {/* Main Content */}
      <div className='flex-1 flex flex-col items-center justify-start px-4 py-8 overflow-auto'>
        <div className='w-full max-w-4xl space-y-8'>
          {/* Header */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-[#3e3e42] pb-4'>
            <h1 className='text-4xl font-bold text-[#4ec9b0] font-mono'>
              {algo.name}
            </h1>
            <div className='bg-[#252526] border border-[#3e3e42] rounded px-4 py-2 text-right font-mono self-start sm:self-auto'>
              <span className='text-xs text-[#858585] uppercase block mb-1'>
                Time Complexity
              </span>
              <span className='text-lg text-[#4ec9b0] inline-block'>
                <InlineMath math={convertToLatex(algo.time_complexity ?? '')} />
              </span>
            </div>
          </div>

          {/* Description */}
          <div className='space-y-3'>
            <h2 className='text-2xl font-semibold text-[#569cd6] border-[#3e3e42] pb-2 font-mono'>
              Description
            </h2>
            <p className='text-[#e0e0e0] leading-relaxed text-base font-sans'>
              {algo.description}
            </p>
          </div>

          {/* Leaderboard Below Main Content */}
          <div className='w-full bg-[#1e1e1e] border-[#3e3e42] px-0 py-6 rounded-b-lg'>
            <h2 className='text-2xl font-semibold text-[#569cd6] border-[#3e3e42] pb-2 mb-4 font-mono'>
              Top Runs
            </h2>
            {/* Sort and Filter Controls */}
            <div className='flex flex-wrap items-center gap-2 mb-4'>
              <label className='text-xs text-[#858585] font-mono'>
                Sort by:
              </label>
              <select
                className='bg-[#1e1e1e] border border-[#3e3e42] rounded px-2 py-1 text-xs text-[#cccccc] font-mono outline-none'
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'score' | 'wpm' | 'accuracy')
                }
                disabled={!user}
              >
                <option value='score'>Score</option>
                <option value='wpm'>WPM</option>
                <option value='accuracy'>Accuracy</option>
              </select>
              <label className='text-xs text-[#858585] font-mono ml-4'>
                Language:
              </label>
              <select
                className='bg-[#1e1e1e] border border-[#3e3e42] rounded px-2 py-1 text-xs text-[#cccccc] font-mono outline-none'
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                disabled={!user}
              >
                <option value='all'>All</option>
                <option value='python'>Python</option>
                <option value='cpp'>C++</option>
                <option value='java'>Java</option>
              </select>
            </div>
            {!user ? (
              <div className='relative'>
                <div className='blur-sm pointer-events-none select-none'>
                  <div className='space-y-2'>
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className='bg-[#1e1e1e] border border-[#3e3e42] rounded p-3 h-16 animate-pulse'
                      />
                    ))}
                  </div>
                </div>
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                  <div className='text-[#cccccc] text-center font-mono text-base bg-[#252526cc] rounded px-4 py-2 border border-[#3e3e42]'>
                    Sign in to see the standings
                  </div>
                </div>
              </div>
            ) : loading ? (
              <div className='flex justify-center items-center h-32'>
                <div className='text-[#858585]'>Loading...</div>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className='text-center text-[#858585] py-8'>
                <div className='text-4xl mb-2'>🏆</div>
                <p className='text-sm'>No runs yet. Be the first!</p>
              </div>
            ) : (
              <div className='space-y-2'>
                {leaderboard
                  .filter(
                    (play) =>
                      languageFilter === 'all' ||
                      play.playDetails.language === languageFilter
                  )
                  .sort((a, b) => {
                    if (sortBy === 'score')
                      return b.playDetails.score - a.playDetails.score;
                    if (sortBy === 'wpm')
                      return b.playDetails.wpm - a.playDetails.wpm;
                    if (sortBy === 'accuracy')
                      return b.playDetails.accuracy - a.playDetails.accuracy;
                    return 0;
                  })
                  .slice(0, 10)
                  .map((play, index) => (
                    <div
                      key={`${play.profileId}-${index}`}
                      className='bg-[#1e1e1e] border border-[#3e3e42] rounded p-3 hover:border-[#569cd6] transition-colors'
                    >
                      <div className='flex items-center justify-between mb-2'>
                        <div className='flex items-center gap-2'>
                          <span className='text-[#4ec9b0] font-bold text-lg'>
                            #{index + 1}
                          </span>
                          <span className='text-[#cccccc] font-semibold'>
                            {play.username}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          {getLanguageIcon(play.playDetails.language)}
                        </div>
                      </div>
                      <div className='flex gap-4 text-xs'>
                        <div>
                          <span className='text-[#858585]'>Score: </span>
                          <span className='text-[#4ec9b0] font-bold'>
                            {play.playDetails.score.toFixed(0)}
                          </span>
                        </div>
                        <div>
                          <span className='text-[#858585]'>WPM: </span>
                          <span className='text-[#cccccc]'>
                            {play.playDetails.wpm.toFixed(0)}
                          </span>
                        </div>
                        <div>
                          <span className='text-[#858585]'>Accuracy: </span>
                          <span className='text-[#cccccc]'>
                            {play.playDetails.accuracy.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
