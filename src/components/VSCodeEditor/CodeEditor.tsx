import React from 'react';
import { FaMousePointer } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CharStateType } from 'react-typing-game-hook';

interface CodeEditorProps {
  fontSize: number;
  targetCode: string;
  editorRef: React.RefObject<HTMLDivElement | null>;
  setEditorFocused: React.Dispatch<React.SetStateAction<boolean>>;
  editorFocused: boolean;
  language: 'python' | 'cpp' | 'java';
  currIndex: number;
  charsState: (0 | 1 | 2)[];
  cursorRef: React.RefObject<HTMLSpanElement | null>;
  resetTyping: () => void;
  insertTyping: (char: string) => void;
  deleteTyping: (skipWhitespace: boolean) => void;
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
  resetTyping,
  insertTyping,
  deleteTyping,
}: CodeEditorProps) {
  // Store bounding rect for overlay positioning
  const [editorRect, setEditorRect] = React.useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  // Update bounding rect when not focused
  React.useLayoutEffect(() => {
    if (!editorFocused && editorRef.current) {
      const rect = editorRef.current.getBoundingClientRect();
      setEditorRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [editorFocused, editorRef]);
  // Optimized handleKeyDown for performance, defined as a normal function to avoid update depth issues
  function handleKey(e: React.KeyboardEvent<HTMLDivElement>) {
    let { key } = e;
    // Only prevent default for handled keys
    if (
      key.length === 1 ||
      key === 'Backspace' ||
      key === 'Escape' ||
      key === 'Tab' ||
      key === 'Enter'
    ) {
      e.preventDefault();
    } else {
      return;
    }

    // Fast path: Escape resets
    if (key === 'Escape') {
      resetTyping();
      return;
    }

    // Fast path: Backspace
    if (key === 'Backspace') {
      let i = currIndex;
      // Skip whitespace backwards
      while (i >= 0 && targetCode[i] && targetCode[i].trim() === '') {
        deleteTyping(false);
        i--;
      }
      if (i === currIndex) {
        // No whitespace skipped, delete current
        deleteTyping(false);
      }
      return;
    }

    // Normalize key for Tab/Enter
    if (key === 'Tab') key = '\t';
    else if (key === 'Enter') key = '\n';

    // Only process single character keys
    if (key.length === 1) {
      // Prevent typing if next char is newline and not matching
      const nextChar = targetCode[currIndex + 1];
      if (nextChar === '\n' && nextChar !== key) {
        return;
      }

      insertTyping(key);

      // If Enter, auto-insert following whitespace
      if (key === '\n' && currIndex + 2 < targetCode.length) {
        let i = currIndex + 1;
        while (targetCode[i + 1] && targetCode[i + 1].trim() === '') {
          insertTyping(targetCode[i + 1]);
          i++;
        }
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let { key } = e;

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
  return (
    <div className='h-full flex'>
      {/* Line Numbers */}
      <div
        className='w-12 bg-[#1e1e1e] border-r border-[#3e3e42] py-4 text-right pr-2 text-[#858585] font-mono select-none overflow-hidden'
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
          ref={editorRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onFocus={() => setEditorFocused(true)}
          onBlur={() => setEditorFocused(false)}
          className='absolute inset-0 overflow-auto focus:outline-none'
        >
          {/* Overlay when not focused: blurry, hover to focus */}
          {!editorFocused && (
            <div
              className='z-20 flex flex-col items-center justify-center bg-black/40 select-none backdrop-blur-sm transition-all duration-200'
              style={{
                pointerEvents: 'auto',
                cursor: 'pointer',
                position: 'fixed',
                top: editorRect ? editorRect.top : 0,
                left: editorRect ? editorRect.left : 0,
                width: editorRect ? editorRect.width : '100%',
                height: editorRect ? editorRect.height : '100%',
              }}
              onMouseEnter={() => {
                editorRef.current?.focus();
              }}
            >
              <FaMousePointer className='mb-2 text-2xl text-[#4ec9b0]' />
              <span className='text-[#cccccc] text-base font-mono bg-[#222c] px-3 py-1 rounded shadow'>
                Hover to focus
              </span>
            </div>
          )}
          <div className='relative'>
            <div className='absolute inset-0'>
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
    </div>
  );
}
