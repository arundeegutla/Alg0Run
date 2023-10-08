"use client";
import NavBar from '../../components/NavBar';

import "./style.css";


import React from "react";
import useTypingGame, {
  CharStateType,
  PhaseType
} from "react-typing-game-hook";

export default function TypingGameDemo() {
  let text = `int binarySearch(int arr[], int l, int r, int x){\n    while (l <= r) {\n        int m = l + (r - l) / 2;`;
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
  } = useTypingGame(text, {
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
      if (text[currIndex + 1] === "\n" && text[currIndex + 1] !== key) {
        return;
      }

      insertTyping(key);

      if (key === "\n" && (currIndex + 2 < length)) {
        let i = currIndex + 1;
        while (text[i + 1].trim() === "") {
          insertTyping(" ");
          i += 1;
        }
      }
    }
  };

  const playDetails = {
    language: 1.3,
    code_length: length,
    accuracy: correctChar / length,
    wpm: (60 * 1000 * length) / (4.7 * getDuration() || 1),
    cpm: (60 * 1000 * length) / (getDuration() || 1),
    time: getDuration() / 1000,
    score: 0
  }

  playDetails.score = 0.005 * playDetails.language * Math.pow(playDetails.code_length, 1.3) * playDetails.accuracy * playDetails.wpm / Math.sqrt(playDetails.time);

  return (
    <div className="default">
      <NavBar current='Type'></NavBar>
      {phase !== 2 ?
        <div className="flex flex-col items-center ml-5 bg-blue-300 w-[100%]">
          <h1>Type!</h1>
          <div className="text-left typing-test"
            onKeyDown={(e) => {
              handleKey(e.key);
              e.preventDefault();
            }}
            tabIndex={0}
          >
            {text.split("").map((char: string, index: number) => {
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
        </div> :
        <div className="flex flex-col items-center ml-5 bg-green-300 w-[100%]">
          <h1 className="mt-10">Completed!</h1>
          <h2 style={{ "fontSize": "xx-large" }}>Stats:</h2>
          <span className="font-bold">Time:</span><br />
          <span>{playDetails.time.toFixed(2)} seconds</span>
          <span className="font-bold">Accuracy:</span><br />
          <span>{(playDetails.accuracy * 100).toFixed(2)}%</span>
          <span className="font-bold">Approx. WPM:</span><br />
          <span>{playDetails.wpm.toFixed(0)} words/min</span>
          <span className="font-bold">CPM:</span><br />
          <span>{playDetails.cpm.toFixed(0)} chars/min</span>
          <hr
            style={{
              color: "black",
              backgroundColor: "black",
              height: "2px",
              width: "20%"
            }}
          />
          <span style={{ "fontSize": "x-large" }} className="font-bold">Score:</span><br />
          <span>{playDetails.score.toFixed(0)} pts</span>
        </div>
      }
    </div>
  );
};
