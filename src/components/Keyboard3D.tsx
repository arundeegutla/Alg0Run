'use client';

import { useRef, useEffect } from 'react';
import SceneManager from '@/src/three/SceneManager';

export default function Keyboard3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create and initialize scene
    sceneManagerRef.current = new SceneManager(containerRef.current);
    sceneManagerRef.current.tick();

    // Cleanup on unmount
    return () => {
      if (sceneManagerRef.current) {
        sceneManagerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='w-full h-screen bg-purple-500'
      style={{ background: 'transparent' }}
    />
  );
}
