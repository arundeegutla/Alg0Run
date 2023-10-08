"use client";
import NavBar from '../../components/NavBar';

import "./style.css";


import React from "react";
import useTypingGame, {
  CharStateType,
  PhaseType
} from "react-typing-game-hook";

export default function TypingGameDemo() {
  let text = "def gcd(a,b):\n    if (b == 0):\n         return a\n    return gcd(b, a%b)\n";
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
    actions: { insertTyping, resetTyping, deleteTyping, setCurrIndex }
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

  return (
    <main className="default">
      <NavBar current='Type'></NavBar>
      <div className="flex flex-col items-center ml-5 bg-blue-300 w-[100%]">
        <h1>Type!</h1>
        <div
          className="typing-test"
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
      </div>
    </main>
  );
};
