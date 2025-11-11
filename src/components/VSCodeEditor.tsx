'use client';

import React, { useEffect, useRef } from 'react';
import { Algo } from '~/firebase/models';
import {
  VscLayoutSidebarLeft,
  VscLayoutSidebarRight,
  VscClose,
  VscRefresh,
} from 'react-icons/vsc';
import { SiPython, SiCplusplus } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import useTypingGame, {
  CharStateType,
  PhaseType,
} from 'react-typing-game-hook';

interface VSCodeEditorProps {
  algo: Algo | null;
  language: 'python' | 'cpp' | 'java';
  onLanguageChange: (lang: 'python' | 'cpp' | 'java') => void;
  onStatsUpdate: (stats: {
    wpm: number;
    accuracy: number;
    time: number;
    progress: number;
  }) => void;
  onTogglePrimarySidebar: () => void;
  onToggleSecondarySidebar: () => void;
}

export default function VSCodeEditor({
  algo,
  language,
  onLanguageChange,
  onStatsUpdate,
  onTogglePrimarySidebar,
  onToggleSecondarySidebar,
}: VSCodeEditorProps) {
  const targetCode = algo?.code[language] || '';

  const {
    states: { charsState, length, currIndex, correctChar, errorChar, phase },
    actions: { insertTyping, resetTyping, deleteTyping, getDuration },
  } = useTypingGame(targetCode, {
    skipCurrentWordOnSpace: false,
  });

  const editorRef = useRef<HTMLDivElement>(null);

  // Reset hook when algo or language (text) changes
  useEffect(() => {
    resetTyping();
    editorRef.current?.focus();
  }, [targetCode, resetTyping]);

  // Stats calculation
  useEffect(() => {
    if (!algo || phase === PhaseType.NotStarted) {
      onStatsUpdate({ wpm: 0, accuracy: 100, time: 0, progress: 0 });
      return;
    }

    const durationMs = getDuration();
    const timeSec = durationMs / 1000;
    const typedCount = currIndex >= 0 ? currIndex + 1 : 0; // number of chars attempted
    const wordsTyped = typedCount / 5;
    const wpm = timeSec > 0 ? Math.round((wordsTyped / timeSec) * 60) : 0;
    const accuracyBase = correctChar + errorChar;
    const accuracy =
      accuracyBase > 0 ? (correctChar / accuracyBase) * 100 : 100;
    const progress = length > 0 ? (typedCount / length) * 100 : 0;

    onStatsUpdate({
      wpm: isNaN(wpm) ? 0 : wpm,
      accuracy: isNaN(accuracy) ? 100 : accuracy,
      time: timeSec,
      progress: isNaN(progress) ? 0 : progress,
    });
  }, [
    algo,
    currIndex,
    correctChar,
    errorChar,
    length,
    phase,
    getDuration,
    onStatsUpdate,
  ]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let key = e.key;
    // Prevent default browser actions like scrolling on space
    if (key.length === 1 || key === 'Backspace' || key === 'Escape') {
      e.preventDefault();
    }
    if (key === 'Escape') {
      resetTyping();
      return;
    }
    if (key === 'Backspace') {
      deleteTyping(false);
      return;
    }

    if (key === 'Tab') key = '\t';
    if (key === 'Enter') key = '\n';
    if (key.length === 1) {
      if (
        targetCode[currIndex + 1] === '\n' &&
        targetCode[currIndex + 1] !== key
      ) {
        return;
      }

      insertTyping(key);

      if (key === '\n' && currIndex + 2 < length) {
        let i = currIndex + 1;
        while (targetCode[i + 1].trim() === '') {
          insertTyping(' ');
          i += 1;
        }
      }
    }
  };

  const handleReset = () => {
    resetTyping();
    editorRef.current?.focus();
  };

  const getLanguageIcon = (lang: string) => {
    const iconProps = { size: 14 };
    switch (lang) {
      case 'python':
        return <SiPython {...iconProps} />;
      case 'cpp':
        return <SiCplusplus {...iconProps} />;
      case 'java':
        return <FaJava {...iconProps} />;
      default:
        return null;
    }
  };

  const defaultColor = 'rgb(99 99 99)';
  const correctColor = 'white';
  const wrongColor = 'rgb(99 99 99)';

  return (
    <div className='flex flex-col h-full'>
      {/* Menu Bar */}
      <div className='h-9 bg-[#3c3c3c] border-b border-[#3e3e42] flex items-center px-2 text-sm'>
        <button
          onClick={onTogglePrimarySidebar}
          className='p-1 hover:bg-[#505050] rounded mr-1'
          title='Toggle Primary Sidebar'
        >
          <VscLayoutSidebarLeft size={16} />
        </button>
        <button
          onClick={onToggleSecondarySidebar}
          className='p-1 hover:bg-[#505050] rounded mr-4'
          title='Toggle Secondary Sidebar'
        >
          <VscLayoutSidebarRight size={16} />
        </button>

        <div className='ml-auto text-[#cccccc] text-xs'>
          {algo ? algo.name : 'No Algorithm Selected'}
        </div>
      </div>

      {/* Tab Bar */}
      <div className='h-9 bg-[#2d2d2d] border-b border-[#3e3e42] flex items-center'>
        {algo && (
          <div className='flex items-center h-full'>
            <div className='flex items-center gap-2 px-4 h-full bg-[#1e1e1e] border-r border-[#3e3e42] text-sm text-[#cccccc]'>
              {getLanguageIcon(language)}
              <span>
                {algo.name}.
                {language === 'cpp'
                  ? 'cpp'
                  : language === 'python'
                    ? 'py'
                    : 'java'}
              </span>
              <button
                className='ml-2 hover:bg-[#505050] rounded p-0.5'
                onClick={handleReset}
                title='Reset'
              >
                <VscClose size={14} />
              </button>
            </div>

            {/* Language selector */}
            <div className='flex items-center gap-1 ml-4'>
              {(['python', 'cpp', 'java'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`cursor-pointer px-3 py-1 text-xs rounded ${
                    language === lang
                      ? 'bg-[#37373d] text-[#cccccc]'
                      : 'text-[#858585] hover:bg-[#2a2d2e]'
                  }`}
                >
                  {lang === 'cpp'
                    ? 'C++'
                    : lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>

            <button
              onClick={handleReset}
              className='ml-auto mr-4 px-3 py-1 bg-[#0e639c] hover:bg-[#1177bb] text-white text-xs rounded flex items-center gap-1'
              title='Reset Progress'
            >
              <VscRefresh size={14} />
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Editor Content */}
      <div className='flex-1 relative overflow-hidden'>
        {algo ? (
          <div className='h-full flex'>
            {/* Line Numbers */}
            <div className='w-12 bg-[#1e1e1e] border-r border-[#3e3e42] py-4 text-right pr-2 text-[#858585] text-sm font-mono select-none overflow-hidden'>
              {targetCode.split('\n').map((line: string, idx: number) => (
                <div key={idx} className='leading-6'>
                  {idx + 1}
                </div>
              ))}
            </div>

            {/* Code Editor */}
            <div className='flex-1 relative'>
              {/* Target code (background) */}
              {/* Unified scroll container */}
              <div
                ref={editorRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className='absolute inset-0 overflow-auto focus:outline-none'
              >
                <div className='relative p-4 font-mono text-sm leading-6 whitespace-pre'>
                  {/* Target code underlay */}
                  {/* <pre className='text-[#4d4d4d] whitespace-pre'>
                    {targetCode}
                  </pre> */}

                  {/* Typed overlay (no pointer events so scroll is shared) */}
                  <div className='typing-test pointer-events-none absolute inset-0 p-4 top-0 left-0'>
                    {/* {chars.split('').map((char, idx) => {
                      const state = charsState[idx];
                      let className = '';
                      if (state === CharStateType.Correct)
                        className += ' text-[#cccccc]';
                      else if (state === CharStateType.Incorrect)
                        className += ' bg-red-500/30 text-red-300';
                      else className += ' text-transparent';
                      return (
                        <span key={idx + char} className={className}>
                          {char}
                        </span>
                      );
                    })} */}

                    {targetCode.split('').map((char: string, index: number) => {
                      const state = charsState[index];
                      const color =
                        state === CharStateType.Incomplete
                          ? defaultColor
                          : state === CharStateType.Correct
                            ? correctColor
                            : wrongColor;
                      return (
                        <span
                          key={char + index}
                          style={{ color: color }}
                          className={
                            currIndex + 1 === index
                              ? 'curr-letter'
                              : !(
                                    state === CharStateType.Incomplete ||
                                    state === CharStateType.Correct
                                  )
                                ? 'bg-red-400'
                                : ''
                          }
                        >
                          {char === '\n' ? ' ' : ''}
                          {char}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Completion message */}
              {phase === PhaseType.Ended && (
                <div className='absolute inset-0 flex items-center justify-center bg-[#1e1e1e]/90'>
                  <div className='bg-[#2d2d2d] border border-[#3e3e42] rounded-lg p-8 text-center'>
                    <div className='text-4xl mb-4'>🎉</div>
                    <h2 className='text-2xl font-bold text-[#4ec9b0] mb-2'>
                      Complete!
                    </h2>
                    <p className='text-[#cccccc] mb-4'>
                      You&apos;ve successfully typed the entire algorithm!
                    </p>
                    <button
                      onClick={handleReset}
                      className='px-6 py-2 bg-[#0e639c] hover:bg-[#1177bb] text-white rounded'
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='h-full flex items-center justify-center text-[#858585]'>
            <div className='text-center'>
              <div className='text-6xl mb-4'>📝</div>
              <h2 className='text-xl mb-2'>No Algorithm Selected</h2>
              <p className='text-sm'>
                Select an algorithm from the explorer to start typing
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
