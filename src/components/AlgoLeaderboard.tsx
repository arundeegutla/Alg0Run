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
  showPodium?: boolean;
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
  showPodium = false,
}: LeaderBoardProps) {
  const sortedLeaderboard = leaderboard.sort((a, b) => {
    if (sortBy === 'score') return b.playDetails.score - a.playDetails.score;
    if (sortBy === 'wpm') return b.playDetails.wpm - a.playDetails.wpm;
    if (sortBy === 'accuracy')
      return b.playDetails.accuracy - a.playDetails.accuracy;
    return 0;
  });

  const topThree = sortedLeaderboard.slice(0, 3);
  const rest = sortedLeaderboard.slice(3);

  const getPodiumColor = (index: number) => {
    if (index === 0) return '#4ec9b0'; // 1st - teal
    if (index === 1) return '#569cd6'; // 2nd - blue
    if (index === 2) return '#ce9178'; // 3rd - bronze
    return '#3e3e42'; // default
  };

  const renderCard = (play: (typeof sortedLeaderboard)[0], index: number) => {
    const borderColor = index < 3 ? getPodiumColor(index) : '#3e3e42';

    return (
      <Link
        key={`${play.profileId}-${index}`}
        href={`/profile/${play.profileId}`}
        className='block'
        onClick={(e) => {
          if (
            e.target &&
            (e.target as HTMLElement).classList.contains('codeforces-icon-btn')
          ) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div
          className='bg-[#1e1e1e] border rounded p-3 hover:bg-[#252526] transition-all cursor-pointer h-full'
          style={{ borderColor }}
        >
          <div className='flex items-center justify-between mb-2'>
            <div className='flex items-center gap-2'>
              <span
                className='font-bold text-lg'
                style={{ color: index < 3 ? borderColor : '#4ec9b0' }}
              >
                #{index + 1}
              </span>
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
    );
  };

  return (
    <div className='space-y-6'>
      {/* Podium for top 3 - hidden on mobile */}
      {showPodium && topThree.length > 0 && (
        <div className='hidden md:flex items-end justify-center gap-3 mb-8'>
          {/* Second place */}
          {topThree[1] && (
            <div className='flex flex-col items-center flex-1 max-w-[280px]'>
              <div className='w-full mb-3 transform hover:scale-105 transition-transform'>
                {renderCard(topThree[1], 1)}
              </div>
              <div className='w-full bg-gradient-to-t from-[#569cd6]/20 to-[#569cd6]/5 border border-[#569cd6]/30 rounded-t-lg pt-8 pb-3 px-3 relative'>
                <div className='absolute top-2 left-1/2 -translate-x-1/2 text-[#569cd6] text-xl font-bold'>
                  2nd
                </div>
              </div>
            </div>
          )}
          {/* First place */}
          {topThree[0] && (
            <div className='flex flex-col items-center flex-1 max-w-[280px]'>
              <div className='w-full mb-3 transform hover:scale-105 transition-transform'>
                {renderCard(topThree[0], 0)}
              </div>
              <div className='w-full bg-linear-to-t from-[#4ec9b0]/20 to-[#4ec9b0]/5 border border-[#4ec9b0]/30 rounded-t-lg pt-16 pb-3 px-3 relative'>
                <div className='absolute top-2 left-1/2 -translate-x-1/2 text-[#4ec9b0] text-xl font-bold'>
                  1st
                </div>
              </div>
            </div>
          )}
          {/* Third place */}
          {topThree[2] && (
            <div className='flex flex-col items-center flex-1 max-w-[280px]'>
              <div className='w-full mb-3 transform hover:scale-105 transition-transform'>
                {renderCard(topThree[2], 2)}
              </div>
              <div className='w-full bg-gradient-to-t from-[#ce9178]/20 to-[#ce9178]/5 border border-[#ce9178]/30 rounded-t-lg pt-4 pb-3 px-3 relative'>
                <div className='absolute top-2 left-1/2 -translate-x-1/2 text-[#ce9178] text-xl font-bold'>
                  3rd
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* All entries (shown on mobile without podium, desktop shows rest after podium) */}
      <div className={showPodium ? 'space-y-2 md:hidden' : 'space-y-2'}>
        {sortedLeaderboard.map((play, idx) => renderCard(play, idx))}
      </div>

      {/* Rest of the leaderboard (desktop only) */}
      {showPodium && (
        <div className='hidden md:block space-y-2'>
          {rest.map((play, idx) => renderCard(play, idx + 3))}
        </div>
      )}
    </div>
  );
}
