'use client';

import React, {
  useEffect,
  useRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
import useTypingGame, { CharStateType } from 'react-typing-game-hook';
import AlgoInfoTab from './AlgoInfoTab';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/server/firebase/clientApp';
import { trpc } from '@/server/trpc/client';
import { Algo, PlayDetails, Profile } from '@/server/trpc/types';

import { formatCodeAction } from './actions';
import MenuBar from './VSCodeEditor/MenuBar';
import TabBar from './VSCodeEditor/TabBar';
import EditorControlsBar from './VSCodeEditor/EditorControlsBar';
import NullAlgo from './VSCodeEditor/NullAlgo';
import CodeEditor from './VSCodeEditor/CodeEditor';

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
  const rawCode = algo?.code?.[language] || '';
  const [isFormatting, setIsFormatting] = useState(false);
  const [fontSize, setFontSize] = useState(20);
  const [activeTab, setActiveTab] = useState<'code' | 'info'>('code');
  const [user] = useAuthState(auth);
  const [editorFocused, setEditorFocused] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const hasAutoSwitchedToInfo = useRef(false);
  const [complete, setComplete] = useState(false);
  const createPlayMutation = trpc.algo.createPlay.useMutation();
  const [targetCode, setTargetCode] = useState(() => {
    if (!rawCode) return '';
    if (language === 'cpp' || language === 'java' || language === 'python') {
      const lines = rawCode.split(/\r?\n/);
      return lines.map((line) => line.replace(/\s+$/, '')).join('\n');
    }
    return rawCode;
  });
  const {
    states: { charsState, length, currIndex, errorChar, phase },
    actions: { insertTyping, resetTyping, deleteTyping, getDuration },
  } = useTypingGame(targetCode, {
    skipCurrentWordOnSpace: false,
  });

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

  useEffect(() => {
    resetTyping();
    setActiveTab('code');
    hasAutoSwitchedToInfo.current = false;
    editorRef.current?.focus();
  }, [targetCode, resetTyping]);

  useEffect(() => {
    if (activeTab === 'code') {
      setTimeout(() => {
        editorRef.current?.focus();
      }, 0);
    }
  }, [activeTab]);

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

  const sendCompletion = useCallback(
    async (playDetails: PlayDetails) => {
      if (complete) return;
      setComplete(true);
      if (user && algo) {
        try {
          const token = await user.getIdToken();
          const { refetch } = trpc.profile.getProfileByToken.useQuery(
            { idToken: token },
            { enabled: false }
          );
          const { data: profileResp } = await refetch();
          const profile = profileResp?.profile as Profile;
          if (!profile) return;
          await createPlayMutation.mutateAsync({
            algoId: algo.id,
            profileId: profile.id,
            playDetails,
          });
        } catch (err) {
          console.error('Failed to send completion:', err);
        }
      }
    },
    [user, algo, complete, createPlayMutation]
  );

  // Compute and update stats
  const computeAndUpdateStats = useCallback(() => {
    const durationMs = getDuration();
    const timeSec = durationMs / 1000;
    const totalLength = length;
    const typedCount = currIndex >= 0 ? currIndex + 1 : 0;

    // Accuracy based on current state of typed characters (not cumulative errors)
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

    // Update stats in parent
    onStatsUpdate({
      wpm,
      accuracy: accuracyPct,
      time: timeSec,
      progress,
    });
  }, [
    getDuration,
    length,
    currIndex,
    charsState,
    errorChar,
    language,
    onStatsUpdate,
  ]);

  useEffect(() => {
    if (!editorFocused) return;
    computeAndUpdateStats();
    const id = setInterval(() => {
      computeAndUpdateStats();
    }, 1000);
    return () => clearInterval(id);
  }, [computeAndUpdateStats, editorFocused]);

  const handleReset = () => {
    resetTyping();
    hasAutoSwitchedToInfo.current = false;
    setComplete(false);
    editorRef.current?.focus();
  };

  const handleIncreaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 32));
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 10));
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
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <MenuBar
        algo={algo}
        onTogglePrimarySidebar={onTogglePrimarySidebar}
        onToggleSecondarySidebar={onToggleSecondarySidebar}
      />

      <TabBar
        algo={algo}
        language={language}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleReset={handleReset}
      />

      {/* Editor Controls Bar */}
      {algo && activeTab === 'code' && (
        <EditorControlsBar
          isFormatting={isFormatting}
          fontSize={fontSize}
          language={language}
          availableLanguages={availableLanguages}
          handleReset={handleReset}
          handleIncreaseFontSize={handleIncreaseFontSize}
          handleDecreaseFontSize={handleDecreaseFontSize}
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
                editorFocused={editorFocused}
                language={language}
                currIndex={currIndex}
                charsState={charsState}
                cursorRef={cursorRef}
                setEditorFocused={setEditorFocused}
                deleteTyping={deleteTyping}
                insertTyping={insertTyping}
                resetTyping={resetTyping}
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
