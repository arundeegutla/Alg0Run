'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Loading.module.css';
const TARGET_TEXT = `Loading...`;

export default function Loading() {
  const [typedText, setTypedText] = useState('');
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);
  const [showCursor, setShowCursor] = useState(true);
  const isTypingRef = useRef(true);
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
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
              {/* {isCurrent && showCursor && (
                <span className='inline-block w-0.5 h-[1.2em] bg-cyan-400 ml-0.5 animate-pulse align-middle' />
              )} */}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={`bg-[#0a0a12] text-slate-200 dark:bg-[#0a0a12] dark:text-slate-200 min-h-[100vh] flex items-center justify-center`}
    >
      <div className={`${styles.text} `}>
        <span className={styles.loadingWord}>{renderTypedText()}</span>
        <span className={styles.cursor} />
      </div>
    </div>
  );
}
