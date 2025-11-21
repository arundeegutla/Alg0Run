'use client';

import React, { useState, useEffect } from 'react';

import { VscChevronDown, VscChevronRight, VscFile } from 'react-icons/vsc';
import { MdKeyboardCommandKey, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { Algo } from '@/server/trpc/types';

interface PrimarySidebarProps {
  allAlgos: Algo[];
  selectedAlgo: Algo | null;
  onSelectAlgo: (algo: Algo) => void;
  // Hackpack mode props
  hackpackMode?: boolean;
  onHackpackClick?: () => void;
}

export default function PrimarySidebar({
  allAlgos,
  selectedAlgo,
  onSelectAlgo,
  hackpackMode = false,
  onHackpackClick,
}: PrimarySidebarProps) {
  // Utility to get a random element from an array
  function getRandomElement<T>(arr: T[]): T | undefined {
    if (!arr.length) return undefined;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['sorting', 'searching', 'graphs', 'dynamic-programming', 'trees'])
  );

  // Filter/search state
  const [search, setSearch] = useState('');
  const searchRef = React.useRef<HTMLInputElement>(null);
  const [showLangPopover, setShowLangPopover] = useState(false);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([
    'python',
    'java',
    'cpp',
  ]);

  const languageOptions = [
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'cpp' },
  ];

  const toggleLang = (lang: string) => {
    setSelectedLangs((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  // Close popover when clicking outside
  useEffect(() => {
    if (!showLangPopover) return;
    const handleClick = (e: MouseEvent) => {
      const popover = document.getElementById('lang-popover');
      if (popover && !popover.contains(e.target as Node)) {
        setShowLangPopover(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showLangPopover]);

  // Compute filtered algorithms directly (no state)
  const algorithms = allAlgos.filter((algo) => {
    // Filter by search
    if (
      search &&
      (!algo.name || !algo.name.toLowerCase().includes(search.toLowerCase()))
    ) {
      return false;
    }
    // Filter by selected languages (must have code in at least one selected language)
    if (
      selectedLangs.length > 0 &&
      (!algo.code ||
        !selectedLangs.some(
          (lang) => algo.code && algo.code[lang as keyof typeof algo.code]
        ))
    ) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const handler = () => {
      const randomAlgo = getRandomElement(algorithms);
      if (randomAlgo) {
        onSelectAlgo(randomAlgo);
      }
    };
    window.addEventListener('algorun-shuffle-algo', handler);
    return () => window.removeEventListener('algorun-shuffle-algo', handler);
  }, [algorithms, onSelectAlgo]);

  useEffect(() => {
    const handler = () => {
      // Focus the search input
      searchRef.current?.focus();
    };
    window.addEventListener('algorun-focus-search', handler);
    return () => window.removeEventListener('algorun-focus-search', handler);
  }, [algorithms, onSelectAlgo]);

  // Categorize algorithms by Algo.category property (from filtered algorithms)
  const categorizeAlgos = () => {
    const categories: Record<string, Algo[]> = {};
    algorithms.forEach((algo) => {
      const category = algo.category || 'other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(algo);
    });
    return categories;
  };

  const categories = categorizeAlgos();

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const formatCategoryName = (category: string) => {
    return category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className='h-full w-full bg-[#252526] border-r border-[#3e3e42] flex flex-col relative'>
      {/* Sidebar Content */}
      <div className='flex-1 flex flex-col overflow-hidden relative'>
        {/* Header */}
        <div className='px-4 py-2 text-xs font-semibold uppercase text-[#cccccc] border-b border-[#3e3e42] flex items-center'>
          <span>Explorer</span>
        </div>
        {/* Mode Section */}
        <div className='px-2 py-2 border-b border-[#3e3e42] flex flex-col gap-2'>
          <button
            className={`w-full px-3 py-2 rounded text-sm font-semibold transition-colors ${hackpackMode ? 'bg-[#007acc] text-white' : 'bg-[#23232b] text-[#ccc] hover:bg-[#333]'}`}
            onClick={onHackpackClick}
          >
            {hackpackMode ? 'Hackpack: Custom Code' : 'Hackpack Mode'}
          </button>
        </div>
        {/* Content */}
        <div className='flex-1 overflow-y-auto pb-24'>
          <div className='py-1'>
            {/* Search and language filter */}
            <div className='px-2 pt-1 pb-2 flex gap-2 items-center'>
              <input
                ref={searchRef}
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search algorithms...'
                className='flex-1 px-2 py-1 rounded bg-[#23232b] text-[#ccc] border border-[#333] text-sm focus:outline-none focus:border-[#007acc] transition-colors'
                style={{ marginBottom: 4 }}
              />
              <div className='relative'>
                <button
                  className='px-2 py-1 rounded bg-[#23232b] text-[#ccc] border border-[#333] text-sm hover:bg-[#333] focus:outline-none focus:ring-2 focus:ring-[#007acc] font-semibold'
                  onClick={() => setShowLangPopover((v) => !v)}
                  type='button'
                  aria-haspopup='true'
                  aria-expanded={showLangPopover}
                >
                  Language
                </button>
                {showLangPopover && (
                  <div
                    id='lang-popover'
                    className='absolute right-0 mt-2 z-20 bg-[#23232b] border border-[#333] rounded-xl shadow-xl p-3 flex flex-col gap-2 min-w-[180px] animate-fade-in'
                    style={{ boxShadow: '0 4px 24px #0006' }}
                  >
                    <div className='mb-1 text-xs text-[#aaa] font-semibold'>
                      Select Languages
                    </div>
                    <div className='flex gap-2 flex-wrap'>
                      {languageOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type='button'
                          onClick={() => toggleLang(opt.value)}
                          className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#007acc] ${
                            selectedLangs.includes(opt.value)
                              ? 'bg-[#007acc] text-white border-[#007acc] shadow'
                              : 'bg-[#23232b] text-[#ccc] border-[#444] hover:bg-[#333]'
                          }`}
                          style={{ minWidth: 60 }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='px-2 py-1 text-xs font-semibold uppercase text-[#cccccc] flex items-center justify-between'>
              <span>Algorithms</span>
              <span className='text-[#858585]'>{algorithms.length}</span>
            </div>
            {Object.entries(categories).map(([category, algos]) => {
              if (algos.length === 0) return null;
              const isExpanded = expandedCategories.has(category);
              // Sort algos by their code length (sum of all code strings' lengths)
              const getCodeLength = (algo: Algo) => {
                if (!algo.code) return 0;
                return ['python', 'java', 'cpp']
                  .map(
                    (lang) =>
                      (algo.code?.[lang as keyof typeof algo.code] || '').length
                  )
                  .reduce((a, b) => a + b, 0);
              };
              const sortedAlgos = [...algos].sort(
                (a, b) => getCodeLength(a) - getCodeLength(b)
              );
              return (
                <div key={category} className='mb-1'>
                  <button
                    onClick={() => toggleCategory(category)}
                    className='w-full px-2 py-1 flex items-center hover:bg-[#2a2d2e] text-sm'
                  >
                    {isExpanded ? (
                      <VscChevronDown size={16} className='mr-1' />
                    ) : (
                      <VscChevronRight size={16} className='mr-1' />
                    )}
                    <span className='text-[#cccccc]'>
                      {formatCategoryName(category)}
                    </span>
                    <span className='ml-auto text-[#858585] text-xs'>
                      {algos.length}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className='ml-4'>
                      {sortedAlgos.map((algo) => (
                        <button
                          key={algo.id}
                          onClick={() => onSelectAlgo(algo)}
                          className={`w-full px-2 py-1 flex items-center hover:bg-[#2a2d2e] text-sm ${
                            selectedAlgo?.id === algo.id
                              ? 'bg-[#37373d] border-l-2 border-[#007acc]'
                              : ''
                          }`}
                        >
                          <VscFile size={16} className='mr-2 text-[#858585]' />
                          <span className='text-[#cccccc] truncate'>
                            {algo.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Random Shortcut Hint at Bottom */}
      <div className='mt-2 w-full h-fit flex flex-col items-center pb-3'>
        <div className='flex flex-col items-center gap-2'>
          <div className='text-neutral-100/40 text-sm flex flex-row items-center gap-2'>
            <span>Random</span>
            <span className='flex items-center gap-1'>
              <span
                className='rounded bg-[#23232b] px-2 py-1 text-xs font-mono border border-[#444] flex items-center justify-center'
                style={{ boxShadow: '0 1px 2px #0002' }}
              >
                <MdKeyboardCommandKey size={16} />
              </span>
              <span
                className='rounded bg-[#23232b] px-2 py-1 text-xs font-mono border border-[#444] flex items-center justify-center'
                style={{ boxShadow: '0 1px 2px #0002' }}
              >
                <MdKeyboardDoubleArrowUp size={16} />
              </span>
              <span
                className='rounded bg-[#23232b] px-2 py-1 text-xs font-mono border border-[#444] flex items-center justify-center'
                style={{ boxShadow: '0 1px 2px #0002' }}
              >
                K
              </span>
            </span>
          </div>
          <div className='text-neutral-100/40 text-sm flex flex-row items-center gap-2'>
            <span>Search</span>
            <span className='flex items-center gap-1'>
              <span
                className='rounded bg-[#23232b] px-2 py-1 text-xs font-mono border border-[#444] flex items-center justify-center'
                style={{ boxShadow: '0 1px 2px #0002' }}
              >
                <MdKeyboardCommandKey size={16} />
              </span>
              <span
                className='rounded bg-[#23232b] px-2 py-1 text-xs font-mono border border-[#444] flex items-center justify-center'
                style={{ boxShadow: '0 1px 2px #0002' }}
              >
                {'/'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
