'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Algo, Language, PlayDetails, Profile } from '@/firebase/models';
import './style.css';

import useTypingGame, {
  CharStateType,
  PhaseType,
} from 'react-typing-game-hook';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

import { auth } from '@/firebase/clientApp';
import api from '@/firebase/api';
import Loading from '@/components/Loading';
import RootLayout from '../../layout';

export default function TypingGameDemo({
  params,
}: {
  params: { algoId: string };
}) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const values = params.algoId.split('__', 2);
  const language = values[0] as Language;
  const algoId = values[1] as string;

  const [algo, setAlgo] = useState({ code: {} } as unknown as Algo);
  const [completed, setComplete] = useState(false);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  function getText(a: Algo, l: Language): string {
    return a.code[l] || '';
  }

  useEffect(() => {
    
    api.getAlgo(algoId).then((res) => {
      console.log(res);
      if (res.data.error === '') {
        setAlgo(res.data.algo);
      }
    });

    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };

  }, [setAlgo, isRunning]);

  const {
    states: {
      charsState,
      length,
      currIndex,
      currChar,
      correctChar,
      errorChar,
      phase,
      startTime,
      endTime,
    },
    actions: {
      insertTyping,
      resetTyping,
      deleteTyping,
      setCurrIndex,
      getDuration,
    },
  } = useTypingGame(getText(algo, language), {
    skipCurrentWordOnSpace: false,
  });

  const handleKey = (key: any) => {
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
        getText(algo, language)[currIndex + 1] === '\n' &&
        getText(algo, language)[currIndex + 1] !== key
      ) {
        return;
      }

      insertTyping(key);

      if (key === '\n' && currIndex + 2 < length) {
        let i = currIndex + 1;
        while (getText(algo, language)[i + 1].trim() === '') {
          insertTyping(' ');
          i += 1;
        }
      }
    }
  };

  function view() {
    async function sendCompletion(playDetails: PlayDetails) {
      if (!user || completed) return;

      setComplete(true);
      const token = await user.getIdToken();
      const profile = (await api.getProfileByToken(token)).data
        .profile as Profile;
      console.log('creating play ' + playDetails);
      api.createPlay(algoId, profile.id, playDetails);
    }

    let res = {
      language: language,
      code_length: length,
      accuracy: Math.max((length - errorChar) / length, 0),
      wpm: (60 * 1000 * length) / (4.7 * getDuration() || 1),
      // cpm: (60 * 1000 * length) / (getDuration() || 1),
      time: getDuration() / 1000,
      date_completed: Date.now(),
      score: 0,
    };

    const mult = {
      python: 0.7,
      java: 1,
      cpp: 1.3,
    }[language];

    res.score =
      (0.01 *
        mult *
        Math.pow(res.code_length, 1.3) *
        Math.pow(res.accuracy, 3) *
        res.wpm) /
      Math.sqrt(res.time);
    res.score = Math.round(res.score);

    const playDetails = res;

    const defaultColor = 'rgb(99 99 99)';
    const correctColor = 'white';
    const wrongColor = 'rgb(99 99 99)';

    if (phase !== 2) {
      return (
        <div
          onKeyDown={(e) => {
            setIsRunning(true);
            handleKey(e.key);
            e.preventDefault();
          }}
          className="flex flex-col items-center justify-center mt-5 "
        >
          <div className='flex flex-row items-center justify-between'>
            <h1 className="text-5xl">
              Type
            </h1>
            <div className='flex justify-center items-center bg-[#FFFFFF]/[0.6] w-10 h-10 p-1 aspect-square rounded-2xl m-2 text-black font-semibold'>
                {time}
            </div>
          </div>
          <div className="relative flex flex-col items-center justify-start rounded-2xl bg-[#282727]/[0.6] text-black p-4 mt-5">
            
            <div
              className="text-left typing-test scrollbar-hide overflow-auto"
              tabIndex={0}
            >
              {getText(algo, language)
                .split('')
                .map((char: string, index: number) => {
                  let state = charsState[index];
                  let color =
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
      );
    } else {
      sendCompletion(playDetails);
      return (
        <div className="flex flex-row items-center justify-center h-full">
          <div className="flex flex-col items-center justify-start rounded-2xl bg-white/[0.6] text-black p-8 m-5 h-[90%] w-[40%]">
            <h1 className="text-5xl">Stats</h1>
            <div className="flex flex-row items-center">
              <div className="flex flex-col items-center p-8 m-2 w-[50%]">
                <span>Time (seconds)</span>
                <span className="text-3xl font-bold">
                  {playDetails.time.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col items-center p-8 m-2 w-[50%]">
                <span>Accuracy</span>
                <span className="text-3xl font-bold">
                  {(playDetails.accuracy * 100).toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="flex flex-col items-center p-8 m-2 w-[50%]">
                <span>WPM (words/min)</span>
                <span className="text-3xl font-bold">
                  {playDetails.wpm.toFixed(0)}
                </span>
              </div>
              <div className="flex flex-col items-center p-8 m-2 w-[50%]">
                <span>CPM (chars/min)</span>
                <span className="text-3xl font-bold">
                  {(playDetails.wpm * 4.7).toFixed(0)}
                </span>
              </div>
            </div>

            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col items-center p-8 m-2 w-[50%]">
                <span>Score (pts)</span>
                <h1 className="text-green-800">
                  +{playDetails.score.toFixed(0)}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start rounded-2xl bg-white/[0.6] text-black p-8 m-5 h-[90%] w-[60%]">
            <h1 className="text-5xl">{algo.name}</h1>
            <h2>{algo.time_complexity}</h2>
            <div>{algo.description}</div>
          </div>
        </div>
      );
    }
  }

  if (user) {
    console.log(user.displayName);
  } else if (loading) {
    return <Loading />;
  } else {
    router.push('/auth');
    return;
  }

  return <RootLayout>{view()}</RootLayout>;
}
