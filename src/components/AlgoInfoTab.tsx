'use client';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { SiCodeforces } from 'react-icons/si';
import { auth } from '@/server/firebase/clientApp';
import { Algo, PlayBasic, ProfileBasic } from '@/server/trpc/types';
import { trpc } from '@/server/trpc/client';
import { userProfileCache, useUserProfiles } from '@/hooks/useUserProfile';
import BlurredLeaderboard from './BlurredLeaderboard';
import { LeaderBoard } from './AlgoLeaderboard';
import PythonOriginal from 'devicons-react/icons/PythonOriginal';
import Cpp from 'devicons-react/icons/CplusplusOriginal';
import Java from 'devicons-react/icons/JavaOriginal';
interface AlgoInfoTabProps {
  algo: Algo | null;
}

const convertToLatex = (complexity: string): string => {
  let latex = complexity;
  latex = latex.replace(/log/g, '\\log');
  latex = latex.replace(/\^(\d+)/g, '^{$1}');
  latex = latex.replace(/([a-z])(\d)/gi, '$1 $2');
  return latex;
};

export default function AlgoInfoTab({ algo }: AlgoInfoTabProps) {
  const [sortBy, setSortBy] = useState<'score' | 'wpm' | 'accuracy'>('score');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [user] = useAuthState(auth);

  const shouldShowLeaderboard = algo?.id !== 'hackpack-custom';
  const getAlgoLeaderboard = trpc.leaderboard.getAlgoLeaderboard.useQuery(
    { algoId: algo?.id ?? '', language: languageFilter },
    {
      enabled: !!algo && !!user && shouldShowLeaderboard,
      retry: false,
    }
  );

  useEffect(() => {
    if (
      getAlgoLeaderboard.refetch &&
      !!algo &&
      !!user &&
      shouldShowLeaderboard
    ) {
      getAlgoLeaderboard.refetch();
    }

    function handleLeaderboardUpdate() {
      if (
        getAlgoLeaderboard.refetch &&
        !!algo &&
        !!user &&
        shouldShowLeaderboard
      ) {
        getAlgoLeaderboard.refetch();
      }
    }
    window.addEventListener(
      'algorun-leaderboard-update',
      handleLeaderboardUpdate
    );
    return () => {
      window.removeEventListener(
        'algorun-leaderboard-update',
        handleLeaderboardUpdate
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algo?.id, user, languageFilter]);

  const loading = getAlgoLeaderboard.isLoading;

  // Derive leaderboard from query data
  const leaderboard: PlayBasic[] =
    getAlgoLeaderboard.data && getAlgoLeaderboard.data.results
      ? getAlgoLeaderboard.data.results
      : [];

  const profileIds = leaderboard.map((play) => play.profileId);
  const userProfiles = useUserProfiles(profileIds);

  // Helper function to get user info from cache/state
  const getUserInfo = (profileId: string): ProfileBasic => {
    return (
      userProfiles.get(profileId) ||
      userProfileCache.get(profileId) || {
        id: profileId,
        username: 'Unknown',
        photoURL: '',
        provider: 'codeforces',
      }
    );
  };

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'python':
        return <PythonOriginal size={20} />;
      case 'cpp':
        return <Cpp className='text-[#00599c]' size={20} />;
      case 'java':
        return <Java className='text-[#007396]' size={20} />;
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

  // Helper for Codeforces icon with link
  const getProviderIcon = (profile: ProfileBasic) => {
    if (profile.provider === 'codeforces' && profile.username) {
      return (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(
              `https://codeforces.com/profile/${profile.username}`,
              '_blank',
              'noopener,noreferrer'
            );
          }}
          title='View Codeforces profile'
          className='ml-1 text-[#1f8acb] hover:text-[#005fa3] flex items-center cursor-pointer codeforces-icon-btn'
        >
          <SiCodeforces size={18} />
        </button>
      );
    }
    return null;
  };

  const EmptyLeaderboard = () => {
    return (
      <div className='text-center text-[#858585] py-8'>
        <div className='text-4xl mb-2'>🏆</div>
        <p className='text-sm'>No runs yet. Be the first!</p>
      </div>
    );
  };

  return (
    <div className='h-full w-full flex flex-col bg-[#1e1e1e] text-lg'>
      <div className='flex-1 flex flex-col items-center justify-start px-4 py-8 overflow-auto'>
        <div className='w-full max-w-4xl space-y-8'>
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

          <div className='space-y-3'>
            <h2 className='text-2xl font-semibold text-[#569cd6] border-[#3e3e42] pb-2 font-mono'>
              Description
            </h2>
            <p className='text-[#e0e0e0] leading-relaxed text-base font-sans'>
              {algo.description}
            </p>
          </div>

          {shouldShowLeaderboard && (
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
                <BlurredLeaderboard />
              ) : loading ? (
                <div className='flex justify-center items-center h-32'>
                  Loading...
                </div>
              ) : leaderboard.length === 0 ? (
                <EmptyLeaderboard />
              ) : (
                <LeaderBoard
                  leaderboard={leaderboard}
                  sortBy={sortBy}
                  getUserInfo={getUserInfo}
                  getProviderIcon={getProviderIcon}
                  getLanguageIcon={getLanguageIcon}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
