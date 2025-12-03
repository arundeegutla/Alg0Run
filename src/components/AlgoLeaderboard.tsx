import { PlayDetails, ProfileBasic } from '@/server/trpc/types';
import Image from 'next/image';
import Link from 'next/link';

interface LeaderBoardProps {
  leaderboard: {
    profileId: string;
    username: string;
    playDetails: PlayDetails;
  }[];
  sortBy: 'score' | 'wpm' | 'accuracy';
  justScoreboard?: boolean;
  getUserInfo: (profileId: string) => ProfileBasic;
  getProviderIcon: (profile: ProfileBasic) => React.ReactNode;
  getLanguageIcon: (language: string) => React.ReactNode;
}

export function LeaderBoard({
  leaderboard,
  sortBy,
  getUserInfo,
  getProviderIcon,
  getLanguageIcon,
  justScoreboard = false,
}: LeaderBoardProps) {
  return (
    <div className='space-y-2'>
      {leaderboard
        .sort((a, b) => {
          if (sortBy === 'score')
            return b.playDetails.score - a.playDetails.score;
          if (sortBy === 'wpm') return b.playDetails.wpm - a.playDetails.wpm;
          if (sortBy === 'accuracy')
            return b.playDetails.accuracy - a.playDetails.accuracy;
          return 0;
        })
        .map((play, index) => (
          <Link
            key={`${play.profileId}-${index}`}
            href={`/profile/${play.profileId}`}
            className='block'
            onClick={(e) => {
              // Prevent navigation if the click originated from the Codeforces icon button
              if (
                e.target &&
                (e.target as HTMLElement).classList.contains(
                  'codeforces-icon-btn'
                )
              ) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            <div className='bg-[#1e1e1e] border border-[#3e3e42] rounded p-3 hover:border-[#569cd6] transition-colors cursor-pointer'>
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2'>
                  <span className='text-[#4ec9b0] font-bold text-lg'>
                    #{index + 1}
                  </span>
                  {/* Profile picture */}
                  {getUserInfo(play.profileId).photoURL && (
                    <Image
                      src={getUserInfo(play.profileId).photoURL}
                      alt={play.username}
                      width={32}
                      height={32}
                      className='w-8 h-8 rounded-full border border-[#3e3e42] object-cover bg-[#232323]'
                      style={{ minWidth: 32, minHeight: 32 }}
                    />
                  )}
                  <span className='text-[#cccccc] font-semibold flex items-center'>
                    {play.username}
                    {getProviderIcon(getUserInfo(play.profileId))}
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
                {!justScoreboard && (
                  <div>
                    <span className='text-[#858585]'>WPM: </span>
                    <span className='text-[#cccccc]'>
                      {play.playDetails.wpm.toFixed(0)}
                    </span>
                  </div>
                )}
                {!justScoreboard && (
                  <div>
                    <span className='text-[#858585]'>Accuracy: </span>
                    <span className='text-[#cccccc]'>
                      {(play.playDetails.accuracy * 100).toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
