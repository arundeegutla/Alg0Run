'use client';

import React from 'react';
import { Algo } from '~/firebase/models';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { SiPython, SiCplusplus } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

interface AlgoInfoTabProps {
  algo: Algo | null;
  fontSize: number;
}

// Helper function to convert time complexity notation to LaTeX
const convertToLatex = (complexity: string): string => {
  // Convert O(n^2) to O(n^{2})
  // Convert O(log n) to O(\log n)
  // Convert O(nlog(n)) to O(n \log n)
  let latex = complexity;

  // Replace log with \log
  latex = latex.replace(/log/g, '\\log');

  // Replace ^ with ^{} for proper LaTeX superscripts
  latex = latex.replace(/\^(\d+)/g, '^{$1}');

  // Add spacing for better readability
  latex = latex.replace(/([a-z])(\d)/gi, '$1 $2');

  return latex;
};

export default function AlgoInfoTab({ algo }: AlgoInfoTabProps) {
  // Fixed font size for info
  if (!algo) {
    return (
      <div className='h-full flex items-center justify-center text-[#858585] bg-[#1e1e1e]'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>📚</div>
          <h2 className='text-xl mb-2'>No Algorithm Selected</h2>
          <p className='text-sm'>
            Select an algorithm from the explorer to view details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full overflow-auto bg-[#1e1e1e] p-8 text-lg font-mono'>
      <div className='max-w-4xl mx-auto space-y-2'>
        {/* Header */}
        <div className='border-[#3e3e42] pb-2'>
          <div className='flex items-start justify-between'>
            <h1 className='text-4xl font-bold text-[#4ec9b0] mb-2 font-mono'>
              {algo.name}
            </h1>
            <div className='bg-[#252526] border border-[#3e3e42] rounded px-4 py-2 text-right font-mono'>
              <span className='text-xs text-[#858585] uppercase block mb-1'>
                Time Complexity
              </span>
              <span className='text-lg text-[#4ec9b0] inline-block'>
                <InlineMath math={convertToLatex(algo.time_complexity)} />
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className='space-y-3'>
          <h2 className='text-2xl font-semibold text-[#569cd6] border-b border-[#3e3e42] pb-2 font-mono'>
            Description
          </h2>
          <p className='text-[#cccccc] leading-relaxed text-sm font-mono'>
            {algo.description}
          </p>
        </div>

        {/* Usage */}
        {algo.usage && (
          <div className='space-y-3'>
            <h2 className='text-2xl font-semibold text-[#569cd6] border-b border-[#3e3e42] pb-2 font-mono'>
              Usage
            </h2>
            <p className='text-[#cccccc] leading-relaxed font-mono'>
              {algo.usage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
