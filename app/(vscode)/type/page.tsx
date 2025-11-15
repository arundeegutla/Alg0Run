'use client';

import React, { useState, useEffect, useRef } from 'react';
import VSCodeEditor from '~/components/VSCodeEditor';
import PrimarySidebar from '~/components/PrimarySidebar';
import SecondarySidebar from '~/components/SecondarySidebar';
import StatusBar from '~/components/StatusBar';
import { Algo } from '~/firebase/models';
import api from '@/firebase/api';

export default function TypePage() {
  const [algorithms, setAlgorithms] = useState<Algo[]>([]);
  const [selectedAlgo, setSelectedAlgo] = useState<Algo | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<
    'python' | 'cpp' | 'java'
  >('python');
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 0,
    time: 0,
    progress: 0,
  });
  // Hackpack mode state
  const [hackpackMode, setHackpackMode] = useState(false);
  const [showHackpackModal, setShowHackpackModal] = useState(false);
  const [customCode, setCustomCode] = useState('');
  const [customCodeLang, setCustomCodeLang] = useState<
    'python' | 'cpp' | 'java'
  >('python');
  const primaryDefaultWidth = 'fit-content';
  const [showPrimarySidebar, setShowPrimarySidebar] = useState(true);
  const [showSecondarySidebar, setShowSecondarySidebar] = useState(true);
  const [primarySidebarWidth, setPrimarySidebarWidth] = useState<
    number | string
  >(primaryDefaultWidth);
  const [secondarySidebarWidth, setSecondarySidebarWidth] = useState(320);
  const resizingSidebar = useRef<null | 'primary' | 'secondary'>(null);

  useEffect(() => {
    api.getAllAlgos().then((res) => {
      if (res.data.error === '') {
        setAlgorithms(res.data.results);
      }
    });
  }, [setAlgorithms]);

  // Ensure hackpackMode is false if selectedAlgo is not hackpack custom
  useEffect(() => {
    if (selectedAlgo && selectedAlgo.id !== 'hackpack-custom' && hackpackMode) {
      setTimeout(() => setHackpackMode(false), 0);
    }
  }, [selectedAlgo, hackpackMode]);

  // Sidebar resizing handlers (attach listeners on mousedown)
  const [dragging, setDragging] = useState<null | 'primary' | 'secondary'>(
    null
  );
  const [hovered, setHovered] = useState<null | 'primary' | 'secondary'>(null);

  const handlePrimarySidebarMouseDown = (e: React.MouseEvent) => {
    resizingSidebar.current = 'primary';
    setDragging('primary');
    const handleMouseMove = (ev: MouseEvent) => {
      setPrimarySidebarWidth(ev.clientX);
    };
    const handleMouseUp = () => {
      resizingSidebar.current = null;
      setDragging(null);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    e.preventDefault();
  };

  const handleSecondarySidebarMouseDown = (e: React.MouseEvent) => {
    resizingSidebar.current = 'secondary';
    setDragging('secondary');
    const handleMouseMove = (ev: MouseEvent) => {
      const winWidth = window.innerWidth;
      setSecondarySidebarWidth(
        Math.max(120, Math.min(winWidth - ev.clientX, 500))
      );
    };
    const handleMouseUp = () => {
      resizingSidebar.current = null;
      setDragging(null);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    e.preventDefault();
  };

  return (
    <div className='flex h-screen w-full flex-col bg-[#1e1e1e] text-[#cccccc]'>
      {/* Hackpack Modal */}
      {showHackpackModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60'>
          <div className='bg-[#232323] rounded-lg p-6 w-[90vw] max-w-xl shadow-lg border border-[#444] flex flex-col gap-4'>
            <h2 className='text-lg font-bold mb-2'>
              Hackpack Mode: Race Your Own Code
            </h2>
            <label className='mb-1 font-semibold'>Language:</label>
            <select
              className='mb-2 p-2 rounded bg-[#181818] text-[#ccc] border border-[#444]'
              value={customCodeLang}
              onChange={(e) =>
                setCustomCodeLang(e.target.value as 'python' | 'cpp' | 'java')
              }
            >
              <option value='python'>Python</option>
              <option value='cpp'>C++</option>
              <option value='java'>Java</option>
            </select>
            <textarea
              className='w-full h-40 p-2 rounded bg-[#181818] text-[#ccc] border border-[#444] font-mono text-sm mb-2'
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              placeholder='Paste your code here...'
            />
            <div className='flex gap-2 justify-end'>
              <button
                className='px-3 py-1 rounded bg-[#444] text-[#ccc] hover:bg-[#555]'
                onClick={() => setShowHackpackModal(false)}
              >
                Cancel
              </button>
              <button
                className='px-3 py-1 rounded bg-[#007acc] text-white font-semibold hover:bg-[#005fa3]'
                disabled={!customCode.trim()}
                onClick={() => {
                  setHackpackMode(true);
                  setCurrentLanguage(customCodeLang);
                  setSelectedAlgo({
                    id: 'hackpack-custom',
                    name: 'Hackpack Custom',
                    description: 'User custom code',
                    code: {
                      python: customCodeLang === 'python' ? customCode : '',
                      java: customCodeLang === 'java' ? customCode : '',
                      cpp: customCodeLang === 'cpp' ? customCode : '',
                    },
                    time_complexity: '',
                    usage: '',
                    category: 'Custom',
                  });
                  setShowHackpackModal(false);
                }}
              >
                Start Race
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className='flex flex-1 overflow-hidden'>
        {/* Primary Sidebar - Explorer */}
        {showPrimarySidebar && (
          <div
            style={{
              width: primarySidebarWidth,
              minWidth: 200,
              maxWidth: 500,
              position: 'relative',
              zIndex: 10,
            }}
          >
            <PrimarySidebar
              algorithms={algorithms}
              selectedAlgo={selectedAlgo}
              onSelectAlgo={setSelectedAlgo}
              hackpackMode={hackpackMode}
              onHackpackClick={() => {
                if (hackpackMode) {
                  setHackpackMode(false);
                  setSelectedAlgo(null);
                } else {
                  setShowHackpackModal(true);
                }
              }}
            />
            {/* Resizer */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 8,
                height: '100%',
                cursor: 'col-resize',
                zIndex: 20,
                background: dragging === 'primary' ? '#007acc' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                transition: 'background 0.15s',
              }}
              onMouseDown={handlePrimarySidebarMouseDown}
              onDoubleClick={() => setPrimarySidebarWidth(primaryDefaultWidth)}
              onMouseEnter={() => setHovered('primary')}
              onMouseLeave={() => setHovered(null)}
            >
              {(hovered === 'primary' || dragging === 'primary') && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        margin: 2,
                        background:
                          dragging === 'primary'
                            ? '#fff'
                            : 'rgba(200,200,200,0.5)',
                        opacity: dragging === 'primary' ? 1 : 0.7,
                        transition: 'background 0.15s, opacity 0.15s',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Editor Area */}
        <div className='flex-1 flex flex-col min-w-0'>
          <VSCodeEditor
            algo={selectedAlgo}
            language={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            onStatsUpdate={setStats}
            onTogglePrimarySidebar={() =>
              setShowPrimarySidebar(!showPrimarySidebar)
            }
            onToggleSecondarySidebar={() =>
              setShowSecondarySidebar(!showSecondarySidebar)
            }
          />
        </div>

        {/* Secondary Sidebar - Stats */}
        {showSecondarySidebar && (
          <div
            style={{
              width: secondarySidebarWidth,
              minWidth: 320,
              maxWidth: 500,
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Resizer */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 8,
                height: '100%',
                cursor: 'col-resize',
                zIndex: 20,
                background:
                  dragging === 'secondary' ? '#007acc' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                transition: 'background 0.15s',
              }}
              onMouseDown={handleSecondarySidebarMouseDown}
              onDoubleClick={() => setSecondarySidebarWidth(320)}
              onMouseEnter={() => setHovered('secondary')}
              onMouseLeave={() => setHovered(null)}
            >
              {(hovered === 'secondary' || dragging === 'secondary') && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        margin: 2,
                        background:
                          dragging === 'secondary'
                            ? '#fff'
                            : 'rgba(200,200,200,0.5)',
                        opacity: dragging === 'secondary' ? 1 : 0.7,
                        transition: 'background 0.15s, opacity 0.15s',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <SecondarySidebar
              algo={selectedAlgo}
              stats={stats}
              onClose={() => setShowSecondarySidebar(false)}
            />
          </div>
        )}
      </div>

      {/* Status Bar (Footer) */}
      <StatusBar
        language={currentLanguage}
        stats={stats}
        algoName={selectedAlgo?.name || ''}
      />
    </div>
  );
}
