export default function BlurredLeaderboard() {
  return (
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
        <a
          href='/auth'
          className='text-[#cccccc] text-center font-mono text-base bg-[#252526cc] rounded px-4 py-2 border border-[#3e3e42] hover:bg-[#2d2d30] transition-colors'
        >
          Sign in to see the standings
        </a>
      </div>
    </div>
  );
}
