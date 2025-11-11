'use client';

import React, { useState, useEffect } from 'react';
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
  const [showPrimarySidebar, setShowPrimarySidebar] = useState(true);
  const [showSecondarySidebar, setShowSecondarySidebar] = useState(true);

  useEffect(() => {
    api.getAllAlgos().then((res) => {
      if (res.data.error === '') {
        setAlgorithms(res.data.results);
      }
    });
  }, [setAlgorithms]);

  return (
    <div className='flex h-screen w-screen flex-col bg-[#1e1e1e] text-[#cccccc]'>
      {/* Main Content Area */}
      <div className='flex flex-1 overflow-hidden'>
        {/* Primary Sidebar - Explorer */}
        {showPrimarySidebar && (
          <PrimarySidebar
            algorithms={algorithms}
            selectedAlgo={selectedAlgo}
            onSelectAlgo={setSelectedAlgo}
            onClose={() => setShowPrimarySidebar(false)}
          />
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
          <SecondarySidebar
            algo={selectedAlgo}
            stats={stats}
            onClose={() => setShowSecondarySidebar(false)}
          />
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
