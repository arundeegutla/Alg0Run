'use client';

import React, {
  useEffect,
  useRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { Algo } from '~/firebase/models';
import {
  VscLayoutSidebarLeft,
  VscLayoutSidebarRight,
  VscClose,
  VscRefresh,
  VscZoomIn,
  VscZoomOut,
  VscSearch,
} from 'react-icons/vsc';

import { SiPython, SiCplusplus } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import useTypingGame, {
  CharStateType,
  PhaseType,
} from 'react-typing-game-hook';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import AlgoInfoTab from './AlgoInfoTab';
import { motion } from 'framer-motion';
import { EmptyState } from './ui/interactive-empty-state';
import { FolderOpen, Code2, Rocket } from 'lucide-react';

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
  const rawCode = algo?.code[language] || '';
  const [isFormatting, setIsFormatting] = useState(false);
  const [fontSize, setFontSize] = useState(20);
  const [activeTab, setActiveTab] = useState<'code' | 'info'>('code');

  // Format code with Prettier (only for TypeScript/JS)
  const [targetCode, setTargetCode] = useState(() => {
    if (!rawCode) return '';
    if (language === 'cpp' || language === 'java' || language === 'python') {
      const lines = rawCode.split(/\r?\n/);
      return lines.map((line) => line.replace(/\s+$/, '')).join('\n');
    }
    return rawCode;
  });

  const formatCode = useCallback(
    async (rawCode: string) => {
      setIsFormatting(true);
      try {
        const response = await fetch('/api/format-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: rawCode, language }),
        });

        if (!response.ok) {
          throw new Error('Failed to format code');
        }

        const { formattedCode } = await response.json();
        setTargetCode(formattedCode);
      } catch (error) {
        console.error('Failed to format code:', error);
        // Fallback: just clean up trailing whitespace
        const lines = rawCode.split(/\r?\n/);
        setTargetCode(lines.map((line) => line.replace(/\s+$/, '')).join('\n'));
      } finally {
        setIsFormatting(false);
      }
    },
    [language]
  );

  useEffect(() => {
    if (!rawCode) return;
    formatCode(rawCode);
  }, [rawCode, language, formatCode]);

  const {
    states: { charsState, length, currIndex, errorChar, phase },
    actions: { insertTyping, resetTyping, deleteTyping, getDuration },
  } = useTypingGame(targetCode, {
    skipCurrentWordOnSpace: false,
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const hasAutoSwitchedToInfo = useRef(false);

  // Reset hook when algo or language (text) changes
  useEffect(() => {
    resetTyping();
    setActiveTab('code');
    hasAutoSwitchedToInfo.current = false;
    editorRef.current?.focus();
  }, [targetCode, resetTyping]);

  // Auto-scroll to keep cursor visible
  useEffect(() => {
    if (cursorRef.current && editorRef.current) {
      const cursorElement = cursorRef.current;
      const editorElement = editorRef.current;

      const cursorRect = cursorElement.getBoundingClientRect();
      const editorRect = editorElement.getBoundingClientRect();

      // Check if cursor is below the visible area
      if (cursorRect.bottom > editorRect.bottom - 50) {
        cursorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      // Check if cursor is above the visible area
      else if (cursorRect.top < editorRect.top + 50) {
        cursorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currIndex]);

  // Stats calculation
  const computeAndUpdateStats = useCallback(() => {
    // If no algo or not started, emit zeros
    if (!algo || phase === PhaseType.NotStarted) {
      onStatsUpdate({ wpm: 0, accuracy: 0, time: 0, progress: 0 });
      return;
    }

    // Switch to info tab when race completes (only once)
    if (phase === PhaseType.Ended && !hasAutoSwitchedToInfo.current) {
      hasAutoSwitchedToInfo.current = true;
      setTimeout(() => setActiveTab('info'), 1000);
    }

    const durationMs = getDuration();
    const timeSec = durationMs / 1000;
    const totalLength = length;
    const typedCount = currIndex >= 0 ? currIndex + 1 : 0;

    // Accuracy based on current state of typed characters (not cumulative errors)
    // Count how many of the currently typed characters are correct
    let currentCorrect = 0;
    for (let i = 0; i < typedCount; i++) {
      if (charsState[i] === CharStateType.Correct) {
        currentCorrect++;
      }
    }
    const rawAccuracy = typedCount > 0 ? currentCorrect / typedCount : 0;
    const accuracyPct = Math.max(rawAccuracy * 100, 0);

    // WPM using provided formula (adapted to typed characters)
    const wpmRaw = (60 * 1000 * typedCount) / (4.7 * (durationMs || 1));
    const wpm =
      Number.isFinite(wpmRaw) && !isNaN(wpmRaw) ? Math.round(wpmRaw) : 0;

    const progress = totalLength > 0 ? (typedCount / totalLength) * 100 : 0;

    // Optional score calculation (not surfaced in UI yet)
    const mult = {
      python: 0.7,
      java: 1,
      cpp: 1.3,
    }[language];

    const res = {
      language,
      code_length: totalLength,
      accuracy: Math.max((typedCount - errorChar) / (typedCount || 1), 0),
      wpm: wpmRaw,
      time: timeSec,
      date_completed: Date.now(),
      score: 0,
    };

    res.score =
      (0.01 *
        (mult || 1) *
        Math.pow(res.code_length, 1.3) *
        Math.pow(res.accuracy, 3) *
        res.wpm) /
      Math.sqrt(Math.max(res.time, 0.001));
    res.score = Math.round(res.score);

    onStatsUpdate({
      wpm,
      accuracy: progress === 0 ? 0 : accuracyPct,
      time: timeSec,
      progress: Number.isFinite(progress) && !isNaN(progress) ? progress : 0,
    });
  }, [
    algo,
    phase,
    getDuration,
    length,
    currIndex,
    errorChar,
    charsState,
    language,
    onStatsUpdate,
  ]);

  // Refresh stats every second
  useEffect(() => {
    // Run once immediately
    computeAndUpdateStats();

    const id = setInterval(() => {
      computeAndUpdateStats();
    }, 1000);
    return () => clearInterval(id);
  }, [computeAndUpdateStats]);

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
        while (targetCode[i + 1] && targetCode[i + 1].trim() === '') {
          insertTyping(targetCode[i + 1]);
          i += 1;
        }
      }
    }
  };

  const handleReset = () => {
    resetTyping();
    hasAutoSwitchedToInfo.current = false;
    editorRef.current?.focus();
  };

  const handleIncreaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 32));
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 10));
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

  const getSyntaxLanguage = (lang: 'python' | 'cpp' | 'java'): string => {
    switch (lang) {
      case 'python':
        return 'python';
      case 'cpp':
        return 'cpp';
      case 'java':
        return 'java';
      default:
        return 'text';
    }
  };

  // Calculate indentation guides (tab lines) - only for actual tab characters
  const indentationGuides = useMemo(() => {
    if (!targetCode) return [];
    const lines = targetCode.split('\n');
    const charWidth = fontSize * 0.6; // Approximate character width based on font size
    // Collect all tab positions (in pixels) for each line
    const tabPositions = new Set<number>();
    lines.forEach((line) => {
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '\t') {
          tabPositions.add(i * charWidth);
        }
      }
    });
    return Array.from(tabPositions);
  }, [targetCode, fontSize]);

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

        <div className='flex items-center gap-1 mr-4'>
          <button
            onClick={handleDecreaseFontSize}
            className='p-1 hover:bg-[#505050] rounded'
            title='Decrease Font Size'
          >
            <VscZoomOut size={16} />
          </button>
          <span className='text-[#cccccc] text-xs min-w-8 text-center'>
            {fontSize}px
          </span>
          <button
            onClick={handleIncreaseFontSize}
            className='p-1 hover:bg-[#505050] rounded'
            title='Increase Font Size'
          >
            <VscZoomIn size={16} />
          </button>
        </div>

        <div className='ml-auto text-[#cccccc] text-xs'>
          {algo ? algo.name : 'No Algorithm Selected'}
        </div>
      </div>

      {/* Tab Bar */}
      <div className='h-9 bg-[#2d2d2d] border-b border-[#3e3e42] flex items-center'>
        {algo && (
          <div className='flex items-center h-full'>
            <div
              className={`flex items-center gap-2 px-4 h-full border-r border-[#3e3e42] text-sm ${
                activeTab === 'code'
                  ? 'bg-[#1e1e1e] text-[#cccccc]'
                  : 'bg-[#2d2d2d] text-[#858585] hover:bg-[#2a2d2e]'
              }`}
            >
              <button
                onClick={() => setActiveTab('code')}
                className='flex items-center gap-2'
              >
                {getLanguageIcon(language)}
                <span>
                  {algo.name}.
                  {language === 'cpp'
                    ? 'cpp'
                    : language === 'python'
                      ? 'py'
                      : 'java'}
                </span>
              </button>
              {activeTab === 'code' && (
                <button
                  className='ml-2 hover:bg-[#505050] rounded p-0.5'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReset();
                  }}
                  title='Reset'
                >
                  <VscClose size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setActiveTab('info')}
              className={`flex items-center gap-2 px-4 h-full border-r border-[#3e3e42] text-sm ${
                activeTab === 'info'
                  ? 'bg-[#1e1e1e] text-[#cccccc]'
                  : 'bg-[#2d2d2d] text-[#858585] hover:bg-[#2a2d2e]'
              }`}
            >
              <span>📚</span>
              <span>Info</span>
            </button>

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

            {activeTab === 'code' && (
              <button
                onClick={handleReset}
                className='ml-auto mr-4 px-3 py-1 bg-[#0e639c] hover:bg-[#1177bb] text-white text-xs rounded flex items-center gap-1'
                title='Reset Progress'
              >
                <VscRefresh size={14} />
                Reset
              </button>
            )}
          </div>
        )}
      </div>

      {/* Editor Content */}
      <div className='flex-1 relative overflow-hidden'>
        {activeTab === 'info' ? (
          <AlgoInfoTab algo={algo} fontSize={fontSize} />
        ) : (
          <>
            {isFormatting && (
              <div className='absolute top-2 right-2 z-10 bg-[#2d2d2d] border border-[#3e3e42] rounded px-3 py-1 text-xs text-[#cccccc]'>
                Formatting code...
              </div>
            )}
            {algo ? (
              <div className='h-full flex'>
                {/* Line Numbers */}
                <div
                  className='w-12 bg-[#1e1e1e] border-r border-[#3e3e42] py-4 text-right pr-2 text-[#858585] font-mono select-none overflow-hidden'
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {targetCode.split('\n').map((line: string, idx: number) => (
                    <div
                      key={idx}
                      style={{ lineHeight: `${fontSize * 1.5}px` }}
                    >
                      {idx + 1}
                    </div>
                  ))}
                </div>

                {/* Code Editor */}
                <div className='flex-1 relative'>
                  {/* Unified scroll container */}
                  <div
                    ref={editorRef}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    className='absolute inset-0 overflow-auto focus:outline-none'
                  >
                    <div className='relative'>
                      {/* Indentation guides (tab lines) - only for actual tab characters */}
                      {indentationGuides.length > 0 && (
                        <div
                          className='absolute inset-0 p-4 pointer-events-none'
                          style={{
                            backgroundImage: indentationGuides
                              .map(
                                () =>
                                  `linear-gradient(to right, rgba(99, 99, 99, 0.2) 0px, rgba(99, 99, 99, 0.2) 1px, transparent 1px)`
                              )
                              .join(','),
                            backgroundPosition: indentationGuides
                              .map((pos) => `${pos}px 0`)
                              .join(','),
                            backgroundSize: indentationGuides
                              .map(() => '1px 100%')
                              .join(','),
                            backgroundRepeat: 'no-repeat',
                          }}
                        />
                      )}

                      {/* Grayed-out code background for untyped code, syntax highlight for typed code */}
                      <div className='absolute inset-0'>
                        {/* Grayed-out full code */}
                        <div
                          className='absolute inset-0 p-4'
                          style={{
                            opacity: 0.3,
                            filter: 'grayscale(1)',
                            pointerEvents: 'none',
                          }}
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
                            }}
                            codeTagProps={{
                              style: {
                                fontFamily: 'monospace',
                                fontSize: `${fontSize}px`,
                                lineHeight: `${fontSize * 1.5}px`,
                              },
                            }}
                          >
                            {targetCode}
                          </SyntaxHighlighter>
                        </div>
                        {/* Syntax-highlighted typed code overlay */}
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
                        {targetCode
                          .split('')
                          .map((char: string, index: number) => {
                            const state = charsState[index];
                            const isIncorrect =
                              state === CharStateType.Incorrect;
                            const isCurrent = currIndex + 1 === index;

                            // Show errors with red background, cursor underline
                            // Make text transparent so syntax-highlighted code shows through
                            const bgColor = isIncorrect
                              ? 'rgba(239, 68, 68, 0.3)'
                              : 'transparent';

                            return (
                              <span
                                key={char + index}
                                style={{
                                  backgroundColor: bgColor,
                                  color: 'transparent',
                                  position: 'relative',
                                }}
                                className={isCurrent ? 'curr-letter' : ''}
                              >
                                {char === '\n' ? ' ' : ''}
                                {char}
                                {isCurrent && (
                                  <span
                                    ref={cursorRef}
                                    className='vsc-editor-cursor'
                                    style={{
                                      position: 'absolute',
                                      left: '-2px',
                                      top: '-3px',
                                      width: 'calc(1ch + 4px)',
                                      height: 'calc(100% + 6px)',
                                      background: 'rgba(78, 201, 176, 0.35)',
                                      border:
                                        '1px solid rgba(255, 255, 255, 0.35)',
                                      borderRadius: '3px',
                                      boxShadow:
                                        '0 0 0 1px rgba(0,0,0,0.35) inset, 0 0 6px rgba(78, 201, 176, 0.35)',
                                      animation:
                                        'vsc-blink 1s steps(1) infinite',
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
              </div>
            ) : (
              <div className='h-full flex items-center justify-center bg-[#18181b]'>
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <EmptyState
                    title='No Algorithm Selected'
                    icons={[
                      <FolderOpen
                        key='p1'
                        className='h-7 w-7 text-[#6366f1]'
                      />,
                      <Rocket key='p2' className='h-7 w-7 text-[#22d3ee]' />,
                      <Code2 key='p3' className='h-7 w-7 text-[#fbbf24]' />,
                    ]}
                    theme='dark'
                    variant='subtle'
                    size='lg'
                    className='font-mono text-[#e0e0e0]'
                  />
                </motion.div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
