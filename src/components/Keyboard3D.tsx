'use client';

import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import SceneManager from '@/components/keyboardUtils/three/SceneManager';

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

export interface Keyboard3DHandle {
  triggerKeyPress: (keyCode: string) => void;
}

const Keyboard3D = forwardRef<Keyboard3DHandle>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);

  useImperativeHandle(ref, () => ({
    triggerKeyPress: (keyCode: string) => {
      if (sceneManagerRef.current) {
        sceneManagerRef.current.triggerKeyPress(keyCode);
      }
    },
  }));

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

  return (
    <div
      ref={containerRef}
      className='w-full h-full overflow-visible mx-auto'
    />
  );
});

Keyboard3D.displayName = 'Keyboard3D';

export default Keyboard3D;
