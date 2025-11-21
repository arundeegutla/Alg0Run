'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Loading.module.css';

import { IconType } from 'react-icons';

interface LoadingProps {
  text?: string;
  icon?: IconType;
}

export default function Loading({
  text = 'Loading...',
  icon: Icon,
}: LoadingProps) {
  const [typedText, setTypedText] = useState('');
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);
  // const [showCursor, setShowCursor] = useState(true); // Unused
  const isTypingRef = useRef(true);
  const isClient = typeof window !== 'undefined';

  // Blinking cursor effect was unused, so removed to fix lint error

  useEffect(() => {
    currentIndexRef.current = 0;
    isTypingRef.current = true;

    const typeNextChar = () => {
      if (!isTypingRef.current || currentIndexRef.current >= text.length) {
        // Reset after a delay when complete
        if (currentIndexRef.current >= text.length) {
          setTimeout(() => {
            setTypedText('');
            currentIndexRef.current = 0;
            isTypingRef.current = true;
            typeNextChar();
          }, 2000);
        }
        return;
      }

      // Update displayed text
      setTypedText(text.slice(0, currentIndexRef.current + 1));
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
  }, [isClient, text]);

  const renderTypedText = () => {
    const chars = typedText.split('');
    const targetChars = text.split('');

    return (
      <div className='whitespace-pre'>
        {targetChars.map((char, index) => {
          const isTyped = index < chars.length;
          const isCorrect = isTyped && chars[index] === char;
          // const isCurrent = index === chars.length; // Unused

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
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={`w-full bg-[#0a0a12] text-slate-200 dark:bg-[#0a0a12] dark:text-slate-200 min-h-screen flex items-center justify-center`}
    >
      <div className={`${styles.text} flex items-center`}>
        {Icon && (
          <span className='mr-3 flex items-center'>
            <Icon size={32} />
          </span>
        )}
        <span className={styles.loadingWord}>{renderTypedText()}</span>
        <span className={styles.cursor} />
      </div>
    </div>
  );
}
