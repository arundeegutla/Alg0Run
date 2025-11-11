'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Algo } from '~/firebase/models';
import {
  VscLayoutSidebarLeft,
  VscLayoutSidebarRight,
  VscClose,
  VscCircleFilled,
  VscRefresh,
} from 'react-icons/vsc';

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
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const targetCode = algo?.code[language] || '';

  // Reset on algo or language change
  useEffect(() => {
    const resetEditor = () => {
      setUserInput('');
      setCurrentIndex(0);
      setErrors([]);
      setStartTime(null);
      setIsComplete(false);
    };
    resetEditor();
    textareaRef.current?.focus();
  }, [algo, language]);

  useEffect(() => {
    // Calculate stats
    if (!startTime || !algo) {
      onStatsUpdate({ wpm: 0, accuracy: 0, time: 0, progress: 0 });
      return;
    }

    const timeElapsed = (Date.now() - startTime) / 1000;
    const wordsTyped = userInput.length / 5; // Standard: 5 chars = 1 word
    const wpm = Math.round((wordsTyped / timeElapsed) * 60);
    const accuracy =
      userInput.length > 0
        ? ((userInput.length - errors.length) / userInput.length) * 100
        : 100;
    const progress = (currentIndex / targetCode.length) * 100;

    onStatsUpdate({
      wpm: isNaN(wpm) ? 0 : wpm,
      accuracy: isNaN(accuracy) ? 100 : accuracy,
      time: timeElapsed,
      progress: isNaN(progress) ? 0 : progress,
    });
  }, [
    userInput,
    currentIndex,
    startTime,
    errors,
    algo,
    targetCode,
    isComplete,
    onStatsUpdate,
  ]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Start timer on first keystroke
    if (!startTime && value.length === 1) {
      setStartTime(Date.now());
    }

    // Don't allow typing past the target
    if (value.length > targetCode.length) {
      return;
    }

    setUserInput(value);

    // Track errors
    const newErrors: number[] = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== targetCode[i]) {
        newErrors.push(i);
      }
    }
    setErrors(newErrors);
    setCurrentIndex(value.length);

    // Check completion
    if (value === targetCode) {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setUserInput('');
    setCurrentIndex(0);
    setErrors([]);
    setStartTime(null);
    setIsComplete(false);
    textareaRef.current?.focus();
  };

  const getLanguageIcon = (lang: string) => {
    const colors = {
      python: '#3776ab',
      cpp: '#00599c',
      java: '#007396',
    };
    return (
      <VscCircleFilled
        size={10}
        style={{ color: colors[lang as keyof typeof colors] }}
      />
    );
  };

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

        <div className='flex items-center gap-4 text-[#cccccc]'>
          <span className='hover:bg-[#505050] px-2 py-1 rounded cursor-pointer'>
            File
          </span>
          <span className='hover:bg-[#505050] px-2 py-1 rounded cursor-pointer'>
            Edit
          </span>
          <span className='hover:bg-[#505050] px-2 py-1 rounded cursor-pointer'>
            View
          </span>
          <span className='hover:bg-[#505050] px-2 py-1 rounded cursor-pointer'>
            Run
          </span>
        </div>

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
                  className={`px-3 py-1 text-xs rounded ${
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
              <pre className='absolute inset-0 p-4 font-mono text-sm leading-6 text-[#4d4d4d] overflow-auto whitespace-pre'>
                {targetCode}
              </pre>

              {/* User input overlay */}
              <div className='absolute inset-0 p-4 font-mono text-sm leading-6 overflow-auto pointer-events-none'>
                {userInput.split('').map((char, idx) => {
                  const isError = errors.includes(idx);
                  const isCorrect = !isError && char === targetCode[idx];

                  return (
                    <span
                      key={idx}
                      className={
                        isError
                          ? 'bg-red-500/30 text-red-300'
                          : isCorrect
                            ? 'text-[#cccccc]'
                            : 'text-[#858585]'
                      }
                    >
                      {char}
                    </span>
                  );
                })}
                {/* Cursor */}
                {!isComplete && (
                  <span className='inline-block w-0.5 h-5 bg-white animate-pulse ml-0.5' />
                )}
              </div>

              {/* Invisible textarea for input */}
              <textarea
                ref={textareaRef}
                value={userInput}
                onChange={handleInput}
                className='absolute inset-0 p-4 font-mono text-sm leading-6 bg-transparent text-transparent caret-transparent outline-none resize-none'
                spellCheck={false}
                autoComplete='off'
                autoCorrect='off'
                autoCapitalize='off'
                style={{ caretColor: 'transparent' }}
              />

              {/* Completion message */}
              {isComplete && (
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
