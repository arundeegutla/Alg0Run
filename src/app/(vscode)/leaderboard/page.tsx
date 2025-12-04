'use client';

import React from 'react';
import { trpc } from '@/server/trpc/client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/server/firebase/clientApp';

import { LeaderBoard } from '@/components/AlgoLeaderboard';
import BlurredLeaderboard from '@/components/BlurredLeaderboard';
import { SiCodeforces } from 'react-icons/si';
import { Profile } from '@/server/trpc/types';
import Loading from '@/components/Loading';

export default function LeaderboardPage() {
  const [user, loading, error] = useAuthState(auth);
  // Use getProfiles procedure to fetch leaderboard
  const getProfiles = trpc.leaderboard.getLeaderboard.useQuery(undefined, {
    enabled: !!user,
    retry: false,
  });

  const leaderboard = getProfiles.data?.results || [];

  const getUserInfo = (profileId: string): Profile => {
    const profile = leaderboard.find((p: Profile) => p.id === profileId);
    console.log('Fetching user info for profileId:', profileId, profile);
    return profile
      ? profile
      : {
          id: '',
          userId: '',
          username: 'Unknown',
          photoURL: '',
          totalScore: 0,
          provider: 'codeforces',
        };
  };

  // Helper for Codeforces icon with link
  const getProviderIcon = (profile: {
    id: string;
    username: string;
    photoURL: string;
    provider: string;
  }) => {
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
          className='ml-2 text-[#1f8acb] hover:text-[#005fa3] flex items-center cursor-pointer codeforces-icon-btn'
        >
          <SiCodeforces size={22} />
        </button>
      );
    }
    return null;
  };
  const getLanguageIcon = () => null;

  return (
    <div className='w-full h-full bg-[#1e1e1e] text-[#cccccc] flex flex-col font-mono overflow-auto'>
      {/* Terminal-style header */}
      <div className='bg-[#232323] border-b border-[#3e3e42] px-6 py-3 flex items-center gap-2'>
        <div className='flex gap-1.5'>
          <div className='w-3 h-3 rounded-full bg-[#3e3e42]'></div>
          <div className='w-3 h-3 rounded-full bg-[#3e3e42]'></div>
          <div className='w-3 h-3 rounded-full bg-[#3e3e42]'></div>
        </div>
        <span className='ml-4 text-xs text-[#858585] flex items-center gap-2'>
          <span>&gt;_</span>
          <span>alg0run ~ leaderboard</span>
        </span>
      </div>
      <div className='flex-1 flex flex-col justify-center items-center bg-[#1e1e1e]'>
        <div className='w-full max-w-2xl mx-auto rounded-lg p-8 mt-8'>
          <h1 className='text-3xl font-bold mb-2 text-[#4ec9b0] font-mono'>
            Leaderboard
          </h1>
          <p className='mb-6 text-[#858585] text-sm font-mono'>
            See the top algorithm typists and your ranking! (Top 10 shown below)
          </p>
          {loading ? (
            <Loading className='bg-transparent min-h-0' />
          ) : !user ? (
            <BlurredLeaderboard />
          ) : getProfiles.isLoading ? (
            <Loading className='bg-transparent min-h-0' />
          ) : leaderboard.length === 0 ? (
            <div className='text-center text-[#858585] py-8'>
              <div className='text-4xl mb-2'>🏆</div>
              <p className='text-sm'>No profiles yet. Be the first!</p>
            </div>
          ) : (
            <LeaderBoard
              leaderboard={leaderboard.map((profile: Profile) => ({
                profileId: profile.id,
                username:
                  'username' in profile && typeof profile.username === 'string'
                    ? profile.username
                    : 'Unknown',
                playDetails: {
                  score:
                    typeof profile.totalScore === 'number'
                      ? profile.totalScore
                      : 0,
                  language: 'python', // default since not available
                  code_length: 0,
                  accuracy: 0,
                  wpm: 0,
                  time: 0,
                  date_completed: 0,
                },
              }))}
              sortBy='score'
              getUserInfo={getUserInfo}
              getProviderIcon={getProviderIcon}
              getLanguageIcon={getLanguageIcon}
              justScoreboard={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
