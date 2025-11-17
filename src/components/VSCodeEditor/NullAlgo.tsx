import { motion } from 'framer-motion';
import { Rocket, Code2, FolderOpen } from 'lucide-react';
import { MdKeyboardCommandKey, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { EmptyState } from '../ui/interactive-empty-state';

export default function NullAlgo() {
  return (
    <div className='h-full flex flex-col items-center justify-center bg-[#18181b]'>
      <div className='font-mono text-4xl font-bold transition -mb-3'>
        <span className='text-slate-400/50'>{`{ `}</span>
        <span className='text-slate-300/50'>alg0run</span>
        <span className='text-slate-400/50'>{` }`}</span>
      </div>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <EmptyState
          title='No Algorithm Selected'
          icons={[
            <Rocket key='p2' className='h-7 w-7 text-[#22d3ee]' />,
            <Code2 key='p3' className='h-7 w-7 text-[#fbbf24]' />,
            <FolderOpen key='p1' className='h-7 w-7 text-[#6366f1]' />,
          ]}
          theme='dark'
          variant='subtle'
          size='lg'
          className='font-mono text-[#000908]'
        />
      </motion.div>
      <div className='-mt-8 flex flex-col items-center gap-2'>
        <div className='text-neutral-100/40 text-sm flex items-center gap-2'>
          <span>Shuffle Algorithm</span>
          <span className='flex items-center gap-1'>
            <span
              className='rounded bg-[#23232b] px-2 py-1 text-xs font-mono border border-[#444] flex items-center justify-center'
              style={{ boxShadow: '0 1px 2px #0002' }}
            >
              <MdKeyboardCommandKey size={16} />
            </span>
            <span
              className='rounded bg-[#23232b] px-2 py-1 text-xs font-mono border border-[#444] flex items-center justify-center'
              style={{ boxShadow: '0 1px 2px #0002' }}
            >
              <MdKeyboardDoubleArrowUp size={16} />
            </span>
            <span
              className='rounded bg-[#23232b] px-2 py-1 text-xs font-mono border border-[#444] flex items-center justify-center'
              style={{ boxShadow: '0 1px 2px #0002' }}
            >
              K
            </span>
          </span>
        </div>
        <div className='text-[#444] text-xs'>
          (Ctrl+Shift+K on Windows/Linux)
        </div>
      </div>
    </div>
  );
}
