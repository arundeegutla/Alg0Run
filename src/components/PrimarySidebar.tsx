'use client';

import React, { useState } from 'react';
import { Algo } from '~/firebase/models';
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
  VscChevronDown,
  VscChevronRight,
  VscFile,
} from 'react-icons/vsc';

interface PrimarySidebarProps {
  algorithms: Algo[];
  selectedAlgo: Algo | null;
  onSelectAlgo: (algo: Algo) => void;
  onClose?: () => void;
}

export default function PrimarySidebar({
  algorithms,
  selectedAlgo,
  onSelectAlgo,
  onClose,
}: PrimarySidebarProps) {
  const [activeView, setActiveView] = useState<'explorer' | 'search'>(
    'explorer'
  );
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['sorting', 'searching', 'graphs', 'dynamic-programming', 'trees'])
  );

  // Categorize algorithms by type (you can customize this based on your data)
  const categorizeAlgos = () => {
    const categories: Record<string, Algo[]> = {
      sorting: [],
      searching: [],
      graphs: [],
      'dynamic-programming': [],
      trees: [],
      other: [],
    };

    algorithms.forEach((algo) => {
      const name = algo.name.toLowerCase();
      if (name.includes('sort')) {
        categories.sorting.push(algo);
      } else if (name.includes('search') || name.includes('find')) {
        categories.searching.push(algo);
      } else if (
        name.includes('graph') ||
        name.includes('bfs') ||
        name.includes('dfs') ||
        name.includes('dijkstra')
      ) {
        categories.graphs.push(algo);
      } else if (name.includes('dp') || name.includes('dynamic')) {
        categories['dynamic-programming'].push(algo);
      } else if (name.includes('tree') || name.includes('bst')) {
        categories.trees.push(algo);
      } else {
        categories.other.push(algo);
      }
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
    <div className='flex h-full w-[300px] bg-[#252526] border-r border-[#3e3e42]'>
      {/* Activity Bar */}
      <div className='w-12 bg-[#333333] flex flex-col items-center py-2 border-r border-[#3e3e42]'>
        <button
          onClick={() => setActiveView('explorer')}
          className={`p-3 mb-1 hover:bg-[#2a2d2e] rounded ${activeView === 'explorer' ? 'bg-[#37373d] border-l-2 border-[#007acc]' : ''}`}
          title='Explorer'
        >
          <VscFiles size={24} />
        </button>
        <button
          onClick={() => setActiveView('search')}
          className={`p-3 mb-1 hover:bg-[#2a2d2e] rounded ${activeView === 'search' ? 'bg-[#37373d] border-l-2 border-[#007acc]' : ''}`}
          title='Search'
        >
          <VscSearch size={24} />
        </button>
        <button
          className='p-3 mb-1 hover:bg-[#2a2d2e] rounded'
          title='Source Control'
        >
          <VscSourceControl size={24} />
        </button>
        <button className='p-3 mb-1 hover:bg-[#2a2d2e] rounded' title='Debug'>
          <VscDebugAlt size={24} />
        </button>
        <button
          className='p-3 mb-1 hover:bg-[#2a2d2e] rounded'
          title='Extensions'
        >
          <VscExtensions size={24} />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Header */}
        <div className='px-4 py-2 text-xs font-semibold uppercase text-[#cccccc] border-b border-[#3e3e42]'>
          {activeView === 'explorer' ? 'Explorer' : 'Search'}
        </div>

        {/* Content */}
        {activeView === 'explorer' && (
          <div className='flex-1 overflow-y-auto'>
            <div className='py-1'>
              <div className='px-2 py-1 text-xs font-semibold uppercase text-[#cccccc] flex items-center justify-between'>
                <span>Algorithms</span>
                <span className='text-[#858585]'>{algorithms.length}</span>
              </div>

              {Object.entries(categories).map(([category, algos]) => {
                if (algos.length === 0) return null;
                const isExpanded = expandedCategories.has(category);

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
                        {algos.map((algo) => (
                          <button
                            key={algo.id}
                            onClick={() => onSelectAlgo(algo)}
                            className={`w-full px-2 py-1 flex items-center hover:bg-[#2a2d2e] text-sm ${
                              selectedAlgo?.id === algo.id
                                ? 'bg-[#37373d] border-l-2 border-[#007acc]'
                                : ''
                            }`}
                          >
                            <VscFile
                              size={16}
                              className='mr-2 text-[#858585]'
                            />
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
        )}

        {activeView === 'search' && (
          <div className='flex-1 p-4'>
            <input
              type='text'
              placeholder='Search algorithms...'
              className='w-full px-3 py-2 bg-[#3c3c3c] border border-[#3e3e42] rounded text-sm text-[#cccccc] focus:outline-none focus:border-[#007acc]'
            />
            <div className='mt-4 text-sm text-[#858585]'>
              Type to search algorithms
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
