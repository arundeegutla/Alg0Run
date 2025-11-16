'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import type { Keyboard3DHandle } from '@/components/Keyboard3D';
import { Boxes } from '@/components/ui/background-boxes';
import { cn } from '@/lib/utils';

const Keyboard3D = dynamic(() => import('@/components/Keyboard3D'), {
  ssr: false,
});

const TARGET_TEXT = `// Algorithm Speed Typing`;

// Map characters to QMK key codes
const charToKeyCode = (char: string): string | null => {
  const charMap: Record<string, string> = {
    A: 'KC_A',
    B: 'KC_B',
    C: 'KC_C',
    D: 'KC_D',
    E: 'KC_E',
    F: 'KC_F',
    G: 'KC_G',
    H: 'KC_H',
    I: 'KC_I',
    J: 'KC_J',
    K: 'KC_K',
    L: 'KC_L',
    M: 'KC_M',
    N: 'KC_N',
    O: 'KC_O',
    P: 'KC_P',
    Q: 'KC_Q',
    R: 'KC_R',
    S: 'KC_S',
    T: 'KC_T',
    U: 'KC_U',
    V: 'KC_V',
    W: 'KC_W',
    X: 'KC_X',
    Y: 'KC_Y',
    Z: 'KC_Z',
    ' ': 'KC_SPC',
    '/': 'KC_SLSH',
    ':': 'KC_SCLN',
  };
  return charMap[char.toUpperCase()] || null;
};

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<Keyboard3DHandle>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);
  const isTypingRef = useRef(true);
  const isClient = typeof window !== 'undefined';

  // Cursor blinking animation
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Automated typing effect
  useEffect(() => {
    if (!isClient) return;

    currentIndexRef.current = 0;
    isTypingRef.current = true;

    const typeNextChar = () => {
      if (
        !isTypingRef.current ||
        currentIndexRef.current >= TARGET_TEXT.length
      ) {
        // Reset after a delay when complete
        if (currentIndexRef.current >= TARGET_TEXT.length) {
          setTimeout(() => {
            setTypedText('');
            currentIndexRef.current = 0;
            isTypingRef.current = true;
            typeNextChar();
          }, 2000);
        }
        return;
      }

      const char = TARGET_TEXT[currentIndexRef.current];
      const keyCode = charToKeyCode(char);

      // Trigger keyboard animation
      if (keyCode && keyboardRef.current) {
        keyboardRef.current.triggerKeyPress(keyCode);
      }

      // Update displayed text
      setTypedText(TARGET_TEXT.slice(0, currentIndexRef.current + 1));
      currentIndexRef.current++;

      // Schedule next character (randomized timing for natural feel)
      const delay = 80 + Math.random() * 120; // 80-200ms
      typingTimeoutRef.current = setTimeout(typeNextChar, delay);
    };

    // Start typing immediately
    typeNextChar();

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      isTypingRef.current = false;
    };
  }, [isClient]);

  if (!isClient) return null;

  const renderTypedText = () => {
    const chars = typedText.split('');
    const targetChars = TARGET_TEXT.split('');

    return (
      <div className='whitespace-pre'>
        {targetChars.map((char, index) => {
          const isTyped = index < chars.length;
          const isCorrect = isTyped && chars[index] === char;
          const isCurrent = index === chars.length;

          let colorClass = 'text-slate-500/30';
          if (isTyped) {
            colorClass = isCorrect ? 'text-cyan-400' : 'text-red-400';
          }

          return (
            <span
              key={index}
              className={`${colorClass} ${isTyped ? (isCorrect ? 'text-glow' : 'text-glow-red') : ''}`}
            >
              {isTyped ? chars[index] : char}
              {isCurrent && showCursor && (
                <span className='inline-block w-0.5 h-[1.2em] bg-cyan-400 ml-0.5 animate-pulse align-middle' />
              )}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className='relative flex flex-col h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground overflow-hidden'
    >
      <div className='absolute inset-0 w-full h-full bg-slate-900 z-20 mask-[radial-gradient(transparent,white)] pointer-events-none' />

      {/* Animated Background Paths */}
      {/* <div className='absolute inset-0 z-0'>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div> */}
      <Boxes />

      {/* Navigation */}
      <nav className='relative top-4 z-50 flex justify-center px-6 '>
        <div className='bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-full px-8 py-3 flex items-center gap-8'>
          <Link
            href='/'
            className='font-mono text-lg font-bold hover:opacity-80 transition'
          >
            <span className='text-slate-400'>{`{ `}</span>
            <span className='text-slate-300'>alg0run</span>
            <span className='text-slate-400'>{` }`}</span>
          </Link>

          <div className='h-6 w-px bg-slate-700/50'></div>

          <div className='flex gap-6'>
            <Link
              href='/leaderboard'
              className='text-slate-300 hover:text-cyan-400 transition font-mono text-sm'
            >
              {`[ leaderboard ]`}
            </Link>
            <Link
              href='/type'
              className='text-slate-300 hover:text-cyan-400 transition font-mono text-sm'
            >
              {`[ type ]`}
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  localStorage.removeItem('alg0_user');
                  setIsLoggedIn(false);
                }}
                className='text-slate-300 hover:text-red-400 transition font-mono text-sm'
              >
                {`[ logout ]`}
              </button>
            ) : (
              <button className='text-slate-300 hover:text-cyan-400 transition font-mono text-sm'>
                {`[ login ]`}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section - Code Editor Style */}
      <main className='z-20 relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-2 sm:py-3 min-h-0 overflow-hidden'>
        <div className='max-w-5xl mx-auto w-full'>
          {/* Code Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='font-mono text-center'
          >
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight'>
              <div className='min-h-[2em]'>{renderTypedText()}</div>
            </div>
          </motion.div>

          {/* Terminal-style Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-center'
          >
            <p className='sm:text-xs md:text-sm lg:text-base text-slate-400 font-mono max-w-2xl mx-auto px-2'>
              {`[ Type algorithms fast, dominate the leaderboard ]`}
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='flex justify-center space-y-1 sm:space-y-2 mt-5'
          >
            <Link
              href='/type'
              className='inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-slate-800/80 border border-slate-600/50 text-slate-200 font-mono font-bold rounded-sm hover:bg-slate-700/80 hover:border-slate-500/70 transition-all duration-200 text-xs sm:text-sm'
            >
              {`$ start typing...`}
            </Link>
          </motion.div>
        </div>
      </main>

      {/* 3D Keyboard - Fixed to Bottom */}
      <div className='relative z-20 shrink-0 w-full h-[45vh] min-h-[300px] max-h-[550px]'>
        <Keyboard3D ref={keyboardRef} />
      </div>
    </div>
  );
}
