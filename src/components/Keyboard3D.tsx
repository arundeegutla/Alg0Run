'use client';

import { useRef, useEffect } from 'react';
import SceneManager from '@/keyboardUtils/three/SceneManager';

// Preload fonts before rendering
const preloadFonts = async () => {
  if (typeof document !== 'undefined' && 'fonts' in document) {
    try {
      await document.fonts.load('80px legends');
      await document.fonts.ready;
    } catch (err) {
      console.warn('Failed to preload legends font:', err);
    }
  }
};

export default function Keyboard3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;

    // Initialize scene after fonts are loaded
    preloadFonts().then(() => {
      if (!mounted || !containerRef.current) return;

      // Create and initialize scene
      sceneManagerRef.current = new SceneManager(containerRef.current);
      sceneManagerRef.current.tick();
    });

    // Cleanup on unmount
    return () => {
      mounted = false;
      if (sceneManagerRef.current) {
        sceneManagerRef.current.destroy();
      }
    };
  }, []);

  return <div ref={containerRef} className='w-full h-full overflow-visible' />;
}
