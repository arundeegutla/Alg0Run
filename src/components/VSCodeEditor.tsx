'use client';

import React, {
  useEffect,
  useRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useTypingGame, {
  CharStateType,
  PhaseType,
} from 'react-typing-game-hook';
import AlgoInfoTab from './AlgoInfoTab';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/server/firebase/clientApp';
import { trpc } from '@/server/trpc/client';
import { Algo, Language, PlayDetails } from '@/server/trpc/types';
import { formatCodeAction } from '../app/(vscode)/type/actions';
import MenuBar from './VSCodeEditor/MenuBar';
import TabBar from './VSCodeEditor/TabBar';
import EditorControlsBar from './VSCodeEditor/EditorControlsBar';
import NullAlgo from './VSCodeEditor/NullAlgo';
import CodeEditor from './VSCodeEditor/CodeEditor';

interface VSCodeEditorProps {
  algo: Algo | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
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
  const availableLanguages = useMemo(() => {
    if (!algo || !algo.code) return [];
    return (['python', 'cpp', 'java'] as const).filter(
      (lang) => !!algo.code[lang]
    );
  }, [algo]);

  useEffect(() => {
    if (!algo || !algo.code) return;
    if (!availableLanguages.includes(language)) {
      if (availableLanguages.length > 0) {
        onLanguageChange(availableLanguages[0]);
      }
    }
  }, [algo, language, availableLanguages, onLanguageChange]);
  const rawCode = algo?.code?.[language] || '';
  const [isFormatting, setIsFormatting] = useState(false);
  const [fontSize, setFontSize] = useState(20);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'code' | 'info'>(
    tabParam === 'info' ? 'info' : 'code'
  );
  const [user] = useAuthState(auth);
  const [editorFocused, setEditorFocused] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [stats, setStats] = useState<{
    wpm: number;
    accuracy: number;
    time: number;
    progress: number;
  }>({ wpm: 0, accuracy: 0, time: 0, progress: 0 });

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
        const { formattedCode, error } = await formatCodeAction({
          code: rawCode,
          language,
        });
        if (error) throw new Error(error);
        setTargetCode(formattedCode || '');
      } catch (error) {
        console.error('Failed to format code:', error);
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

  useEffect(() => {
    onStatsUpdate(stats);
  }, [stats, onStatsUpdate]);

  const {
    states: { charsState, length, currIndex, phase },
    actions: { insertTyping, resetTyping, deleteTyping, getDuration },
  } = useTypingGame(targetCode, {
    skipCurrentWordOnSpace: false,
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const hasAutoSwitchedToInfo = useRef(false);

  useEffect(() => {
    if (activeTab === 'code') {
      setTimeout(() => {
        editorRef.current?.focus();
      }, 0);
    }
  }, [activeTab]);

  // Sync tab state with query param
  useEffect(() => {
    if (tabParam !== activeTab) {
      setActiveTab(tabParam === 'info' ? 'info' : 'code');
    }
  }, [tabParam, activeTab]);

  useEffect(() => {
    if (cursorRef.current && editorRef.current) {
      const cursorElement = cursorRef.current;
      const editorElement = editorRef.current;

      const cursorRect = cursorElement.getBoundingClientRect();
      const editorRect = editorElement.getBoundingClientRect();

      if (cursorRect.bottom > editorRect.bottom - 50) {
        cursorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (cursorRect.top < editorRect.top + 50) {
        cursorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currIndex]);

  const createPlayMutation = trpc.algo.createPlay.useMutation();

  const [complete, setComplete] = useState(false);
  const sendCompletion = useCallback(
    async (playDetails: PlayDetails) => {
      if (complete) return;
      setComplete(true);
      if (user && algo && algo.id !== 'hackpack-custom') {
        try {
          await createPlayMutation.mutateAsync({
            algoId: algo.id,
            playDetails,
          });
          // Dispatch custom event to signal leaderboard update
          window.dispatchEvent(new CustomEvent('algorun-leaderboard-update'));
        } catch (err) {
          console.error('Failed to send completion:', err);
        }
      }
    },
    [complete, user, algo, createPlayMutation]
  );

  // Stats calculation
  const computeStats = useCallback(() => {
    // Switch to info tab when race completes (only once)
    if (phase === PhaseType.Ended && !hasAutoSwitchedToInfo.current) {
      hasAutoSwitchedToInfo.current = true;
      setActiveTab('info');
    }

    const durationMs = getDuration();
    const timeSec = durationMs / 1000;
    const totalLength = length;
    const typedCount = currIndex >= 0 ? currIndex + 1 : 0;
    let currentCorrect = 0;
    for (let i = 0; i < typedCount; i++) {
      if (charsState[i] === CharStateType.Correct) {
        currentCorrect++;
      }
    }
    const rawAccuracy = typedCount > 0 ? currentCorrect / typedCount : 0;
    const accuracyPct = Math.max(rawAccuracy * 100, 0);
    const wpmRaw = (60 * 1000 * typedCount) / (4.7 * (durationMs || 1));
    const wpm =
      Number.isFinite(wpmRaw) && !isNaN(wpmRaw) ? Math.round(wpmRaw) : 0;
    const progress = totalLength > 0 ? (typedCount / totalLength) * 100 : 0;

    setStats({
      wpm,
      accuracy: progress === 0 ? 0 : accuracyPct,
      time: timeSec,
      progress: Number.isFinite(progress) && !isNaN(progress) ? progress : 0,
    });
  }, [length, currIndex, charsState, phase, getDuration]);

  // Call sendCompletion only when phase is Ended and only once per session
  useEffect(() => {
    if (phase === PhaseType.Ended && !complete) {
      setIsTyping(false);
      const mult = {
        python: 0.7,
        java: 1,
        cpp: 1.3,
      }[language];
      const playDetails = {
        language,
        code_length: length,
        accuracy: stats.accuracy / 100,
        wpm: stats.wpm,
        time: stats.time,
        date_completed: Date.now(),
        score: 0,
      };
      playDetails.score =
        (0.01 *
          (mult || 1) *
          Math.pow(playDetails.code_length, 1.3) *
          Math.pow(playDetails.accuracy, 3) *
          playDetails.wpm) /
        Math.sqrt(Math.max(playDetails.time, 0.001));
      playDetails.score = Math.round(playDetails.score);
      sendCompletion(playDetails);
    }
  }, [phase, complete, sendCompletion, length, language, stats]);

  useEffect(() => {
    if (!editorFocused || !isTyping) return;
    computeStats();
    const id = setInterval(() => {
      computeStats();
    }, 1000);
    return () => clearInterval(id);
  }, [computeStats, editorFocused, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let key = e.key;
    if (key.length === 1 || key === 'Backspace' || key === 'Escape') {
      e.preventDefault();
    }
    if (key === 'Escape') {
      resetTyping();
      return;
    }
    if (key === 'Backspace') {
      let i = currIndex;
      let skipped = false;
      while (i >= 0 && targetCode[i] && targetCode[i].trim() === '') {
        deleteTyping(false);
        i--;
        skipped = true;
      }
      if (!skipped) {
        deleteTyping(false);
      }
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
      setIsTyping(true);

      if (key === '\n' && currIndex + 2 < length) {
        let i = currIndex + 1;
        while (targetCode[i + 1] && targetCode[i + 1].trim() === '') {
          insertTyping(targetCode[i + 1]);
          i += 1;
        }
      }
    }
  };

  const handleTabSwitch = useCallback(
    (tab: 'code' | 'info') => {
      router.push(`?tab=${tab}`);
    },
    [router]
  );

  const handleReset = useCallback(() => {
    editorRef.current?.focus();
    handleTabSwitch('code');
    resetTyping();
    hasAutoSwitchedToInfo.current = false;
    setComplete(false);
    setIsTyping(false);
    setStats({ wpm: 0, accuracy: 0, time: 0, progress: 0 });
  }, [resetTyping, handleTabSwitch]);

  useEffect(() => {
    handleReset();
    hasAutoSwitchedToInfo.current = false;
    editorRef.current?.focus();
  }, [targetCode, handleReset]);

  const handleIncreaseFontSize = () => {
    editorRef.current?.focus();
    setFontSize((prev) => Math.min(prev + 2, 32));
  };

  const handleDecreaseFontSize = () => {
    editorRef.current?.focus();
    setFontSize((prev) => Math.max(prev - 2, 10));
  };

  const getSyntaxLanguage = (lang: Language): string => {
    switch (lang) {
      case 'python':
      case 'cpp':
      case 'java':
        return lang;
      default:
        return 'text';
    }
  };

  useEffect(() => {
    function onKeyDown(e: {
      metaKey: unknown;
      ctrlKey: unknown;
      shiftKey: unknown;
      key: string;
      preventDefault: () => void;
    }) {
      const isMac =
        typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);
      if (
        ((isMac && e.metaKey) || (!isMac && e.ctrlKey)) &&
        e.shiftKey &&
        (e.key === 'K' || e.key === 'k')
      ) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('algorun-shuffle-algo'));
      }

      if ((isMac ? e.metaKey : e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('algorun-focus-search'));
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className='flex flex-col h-full'>
      {/* Menu Bar */}
      <MenuBar
        algo={algo}
        onTogglePrimarySidebar={onTogglePrimarySidebar}
        onToggleSecondarySidebar={onToggleSecondarySidebar}
      />

      {/* Tab Bar */}
      <TabBar
        algo={algo}
        language={language}
        activeTab={activeTab}
        setActiveTab={handleTabSwitch}
        handleReset={handleReset}
      />

      {/* Editor Controls Bar */}
      {algo && activeTab === 'code' && (
        <EditorControlsBar
          handleReset={handleReset}
          isFormatting={isFormatting}
          handleIncreaseFontSize={handleIncreaseFontSize}
          handleDecreaseFontSize={handleDecreaseFontSize}
          fontSize={fontSize}
          language={language}
          availableLanguages={availableLanguages}
          onLanguageChange={onLanguageChange}
        />
      )}

      {/* Editor Content */}
      <div className='flex-1 relative overflow-hidden'>
        {activeTab === 'info' ? (
          <AlgoInfoTab algo={algo} />
        ) : (
          <>
            {isFormatting && (
              <div className='absolute top-2 right-2 z-10 bg-[#2d2d2d] border border-[#3e3e42] rounded px-3 py-1 text-xs text-[#cccccc]'>
                Formatting code...
              </div>
            )}
            {algo ? (
              <CodeEditor
                targetCode={targetCode}
                fontSize={fontSize}
                editorRef={editorRef}
                handleKeyDown={handleKeyDown}
                setEditorFocused={setEditorFocused}
                editorFocused={editorFocused}
                getSyntaxLanguage={getSyntaxLanguage}
                language={language}
                currIndex={currIndex}
                charsState={charsState}
                cursorRef={cursorRef}
              />
            ) : (
              <NullAlgo />
            )}
          </>
        )}
      </div>
    </div>
  );
}
