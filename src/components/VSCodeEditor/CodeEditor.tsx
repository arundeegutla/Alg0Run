import React, { useState, useEffect } from 'react';
import { FaMousePointer } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CharStateType } from 'react-typing-game-hook';
import Noise from '../Noise';
import { Language } from '@/server/trpc/types';

interface CodeEditorProps {
  fontSize: number;
  targetCode: string;
  editorRef: React.RefObject<HTMLDivElement | null>;
  cursorRef: React.RefObject<HTMLSpanElement | null>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  setEditorFocused: React.Dispatch<React.SetStateAction<boolean>>;
  editorFocused: boolean;
  getSyntaxLanguage: (lang: Language) => string;
  language: Language;
  currIndex: number;
  charsState: (0 | 2 | 1)[];
}

export default function CodeEditor({
  fontSize,
  targetCode,
  editorRef,
  setEditorFocused,
  editorFocused,
  language,
  currIndex,
  charsState,
  cursorRef,
  handleKeyDown,
  getSyntaxLanguage,
}: CodeEditorProps) {
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent) => {
      if (e.getModifierState) {
        setCapsLockOn(e.getModifierState('CapsLock'));
      }
    };

    window.addEventListener('keydown', handleKeyEvent);
    window.addEventListener('keyup', handleKeyEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyEvent);
      window.removeEventListener('keyup', handleKeyEvent);
    };
  }, []);

  // Hide cursor when typing, show when mouse moves
  useEffect(() => {
    const handleKeyPress = () => {
      setShowCursor(false);
    };

    const handleMouseMove = () => {
      setShowCursor(true);
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className='h-full flex relative'
      style={{ cursor: showCursor ? 'auto' : 'none' }}
    >
      {/* Line Numbers */}
      <div
        className='w-12 bg-[#1e1e1e] border-r border-[#3e3e42] py-4 text-right pr-2 text-[#858585] font-mono select-none'
        style={{ fontSize: `${fontSize}px` }}
      >
        {targetCode.split('\n').map((line: string, idx: number) => (
          <div key={idx} style={{ lineHeight: `${fontSize * 1.5}px` }}>
            {idx + 1}
          </div>
        ))}
      </div>

      {/* Code Editor */}
      <div className='flex-1 relative'>
        {/* Unified scroll container */}
        <div
          ref={editorRef as React.RefObject<HTMLDivElement>}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onFocus={() => setEditorFocused(true)}
          onBlur={() => setEditorFocused(false)}
          className='absolute inset-0 overflow-auto focus:outline-none'
        >
          <div className='relative'>
            {/* Grayed-out code background for untyped code, syntax highlight for typed code */}
            <div className='absolute inset-0'>
              <div
                className='absolute inset-0 p-4'
                style={{ pointerEvents: 'none' }}
              >
                <SyntaxHighlighter
                  language={getSyntaxLanguage(language)}
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    padding: 0,
                    background: 'transparent',
                    fontSize: `${fontSize}px`,
                    lineHeight: `${fontSize * 1.5}px`,
                    fontFamily: 'monospace',
                    overflow: 'visible',
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: 'monospace',
                      fontSize: `${fontSize}px`,
                      lineHeight: `${fontSize * 1.5}px`,
                    },
                  }}
                >
                  {targetCode.slice(0, currIndex + 1)}
                </SyntaxHighlighter>
              </div>
            </div>

            {/* Typed overlay (no pointer events so scroll is shared) with visible cursor */}
            <div
              className='typing-test pointer-events-none absolute inset-0 p-4 top-0 left-0 font-mono whitespace-pre'
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: `${fontSize * 1.5}px`,
              }}
            >
              {targetCode.split('').map((char: string, index: number) => {
                const state = charsState[index];
                const isIncorrect = state === CharStateType.Incorrect;
                const isCurrent = currIndex + 1 === index;

                // Show errors with red background, cursor underline
                // Make text transparent so syntax-highlighted code shows through
                const bgColor = isIncorrect
                  ? 'rgba(239, 68, 68, 0.3)'
                  : 'transparent';

                const color =
                  state === CharStateType.Incomplete
                    ? 'rgb(99 99 99)'
                    : 'transparent';
                return (
                  <span
                    key={char + index}
                    style={{
                      backgroundColor: bgColor,
                      color,
                      position: 'relative',
                    }}
                  >
                    {char === '\n' ? ' ' : ''}
                    {char}
                    {isCurrent && (
                      <span
                        ref={cursorRef as React.RefObject<HTMLSpanElement>}
                        className='vsc-editor-cursor'
                        style={{
                          position: 'absolute',
                          left: '-2px',
                          top: '-3px',
                          width: 'calc(1ch + 4px)',
                          height: `${fontSize * 1.5}px`,
                          background: 'rgba(78, 201, 176, 0.35)',
                          border: '1px solid rgba(255, 255, 255, 0.35)',
                          borderRadius: '3px',
                          boxShadow:
                            '0 0 0 1px rgba(0,0,0,0.35) inset, 0 0 6px rgba(78, 201, 176, 0.35)',
                          animation: 'vsc-blink 1s steps(1) infinite',
                          zIndex: 2,
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                  </span>
                );
              })}
              {/* Blinking cursor keyframes */}
              <style>{`
                      @keyframes vsc-blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                      }
                    `}</style>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when not focused: blurry, hover to focus */}
      {!editorFocused && (
        <div
          className='z-20 absolute w-full h-full flex flex-col items-center justify-center bg-black/40 select-none backdrop-blur-3xl transition-all duration-200'
          style={{
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
          onMouseEnter={() => {
            editorRef!.current?.focus();
          }}
        >
          <Noise
            patternSize={250}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={4}
            patternAlpha={15}
          />
          <FaMousePointer className='mb-2 text-2xl text-[#4ec9b0]' />
          <span className='text-[#cccccc] text-base font-mono bg-[#222c] px-3 py-1 rounded shadow'>
            Hover to focus
          </span>
        </div>
      )}

      {/* Caps Lock Indicator */}
      {capsLockOn && (
        <div className='absolute bottom-2 right-2 z-30 bg-[#ff6b6b] text-white text-xs font-mono px-2 py-1 rounded shadow-lg border border-[#ff8787] select-none pointer-events-none'>
          CAPS LOCK
        </div>
      )}
    </div>
  );
}
