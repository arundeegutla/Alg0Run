"use client";

import React, { useState, useEffect } from "react";
import { Algo, Language, PlayDetails, Profile } from '@/firebase/models';
import "./style.css";

import useTypingGame, {
  CharStateType,
  PhaseType
} from "react-typing-game-hook";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

import { auth } from '@/firebase/clientApp';
import api from "@/firebase/api";
import Loading from "@/components/Loading";
import RootLayout from "../../layout";

export default function TypingGameDemo({ params }: { params: { algoId: string } }) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const values = params.algoId.split("__", 2);
  const language = values[0] as Language;
  const algoId = values[1] as string;

  const [algo, setAlgo] = useState({ code: {} } as unknown as Algo);
  const [completed, setComplete] = useState(false);

  function getText(a: Algo, l: Language): string {
    return a.code[l] || "";
  }

  useEffect(() => {
    api.getAlgo(algoId).then((res) => {
      console.log(res);
      if (res.data.error === "") {
        setAlgo(res.data.algo);
      }
    })
  }, [setAlgo]);

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
      endTime
    },
    actions: { insertTyping, resetTyping, deleteTyping, setCurrIndex, getDuration }
  } = useTypingGame(getText(algo, language), {
    skipCurrentWordOnSpace: false
  });

  const handleKey = (key: any) => {
    if (key === "Escape") {
      resetTyping();
      return;
    }
    if (key === "Backspace") {
      deleteTyping(false);
      return;
    }

    if (key === "Tab") key = "\t";
    if (key === "Enter") key = "\n";
    if (key.length === 1) {
      if (getText(algo, language)[currIndex + 1] === "\n" && getText(algo, language)[currIndex + 1] !== key) {
        return;
      }

      insertTyping(key);

      if (key === "\n" && (currIndex + 2 < length)) {
        let i = currIndex + 1;
        while (getText(algo, language)[i + 1].trim() === "") {
          insertTyping(" ");
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
      const profile = (await api.getProfileByToken(token)).data.profile as Profile;
      console.log("creating play " + playDetails);
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
      score: 0
    }

    const mult = {
      "python": 0.7,
      "java": 1,
      "cpp": 1.3
    }[language];

    res.score = 0.01 * mult * Math.pow(res.code_length, 1.3) * Math.pow(res.accuracy, 3) * res.wpm / Math.sqrt(res.time);
    res.score = Math.round(res.score);

    const playDetails = res;

    if (phase !== 2) {
      return (
        <div style={{ background: "rgba(255, 255, 255, 0.5)", padding: "0px 50px 25px 50px" }} className="flex flex-col items-center ml-5 w-[100%] rounded-2xl">
          <h1>Type!</h1>
          <div style={{ overflow: "scroll" }} className="text-left typing-test"
            onKeyDown={(e) => {
              handleKey(e.key);
              e.preventDefault();
            }}
            tabIndex={0}
          >
            {getText(algo, language).split("").map((char: string, index: number) => {
              let state = charsState[index];
              let color =
                state === CharStateType.Incomplete
                  ? "black"
                  : state === CharStateType.Correct
                    ? "green"
                    : "red";
              return (
                <span
                  key={char + index}
                  style={{ color }}
                  className={currIndex + 1 === index ? "curr-letter" : ""}
                >
                  {char === "\n" ? " " : ""}{char}
                </span>
              );
            })}
          </div>
        </div>
      )
    }
    else {
      sendCompletion(playDetails);
      return (
        <div style={{ background: "rgba(255, 255, 255, 0.5)", padding: "0px 50px 25px 50px" }} className="flex flex-col items-center ml-5 w-[100%] rounded-2xl">
          <h1 style={{ color: "#5cb85c", marginTop: "15px", WebkitTextStrokeWidth: "0.5px", WebkitTextStrokeColor: "black" }} className="mt-10">Completed!</h1>
          <h2 style={{ "fontSize": "xx-large" }}>Stats:</h2>
          <span className="font-bold">Time:</span><br />
          <span>{playDetails.time.toFixed(2)} seconds</span>
          <span className="font-bold">Accuracy:</span><br />
          <span>{(playDetails.accuracy * 100).toFixed(2)}%</span>
          <span className="font-bold">Approx. WPM:</span><br />
          <span>{playDetails.wpm.toFixed(0)} words/min</span>
          <span className="font-bold">CPM:</span><br />
          <span>{(playDetails.wpm * 4.7).toFixed(0)} chars/min</span>
          <hr
            style={{
              color: "black",
              backgroundColor: "black",
              height: "2px",
              width: "50%"
            }}
          />
          <span style={{ "fontSize": "x-large" }} className="font-bold">Score:</span><br />
          <span>{playDetails.score.toFixed(0)} pts</span>
        </div>
      )
    }
  }

  if (user) {
    console.log(user.displayName);
  } else if (loading) {
    return (
      <Loading />
    );
  } else {
    router.push('/auth');
    return;
  }

  return (
    <RootLayout>
      <div style={{ height: "90vh" }}>
        {view()}
      </div>
    </RootLayout>
  );
};
