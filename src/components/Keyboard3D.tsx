'use client';

import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import SceneManager from '@/components/keyboardUtils/three/SceneManager';
import type { KeyboardSettings } from '@/components/keyboardUtils/config/settings';

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

interface Keyboard3DProps {
  cameraZoom?: number;
  keyboardOptions?: Partial<KeyboardSettings>;
}

const Keyboard3D = forwardRef<Keyboard3DHandle, Keyboard3DProps>(
  ({ cameraZoom = 10, keyboardOptions }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneManagerRef = useRef<SceneManager | null>(null);
    const isInitializedRef = useRef(false);
    const previousSettingsRef = useRef<string>('');

    useImperativeHandle(ref, () => ({
      triggerKeyPress: (keyCode: string) => {
        if (sceneManagerRef.current) {
          sceneManagerRef.current.triggerKeyPress(keyCode);
        }
      },
    }));

    // Initialize scene once
    useEffect(() => {
      if (!containerRef.current || isInitializedRef.current) return;

      let mounted = true;

      // Initialize scene after fonts are loaded
      preloadFonts().then(() => {
        if (!mounted || !containerRef.current) return;

        // Create and initialize scene
        sceneManagerRef.current = new SceneManager(
          containerRef.current,
          cameraZoom,
          keyboardOptions
        );
        sceneManagerRef.current.tick();
        isInitializedRef.current = true;

        // Store initial settings
        if (keyboardOptions) {
          previousSettingsRef.current = JSON.stringify(keyboardOptions);
        }
      });

      // Cleanup on unmount
      return () => {
        mounted = false;
        isInitializedRef.current = false;
        if (sceneManagerRef.current) {
          sceneManagerRef.current.destroy();
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cameraZoom]); // Only recreate if cameraZoom changes, not keyboardOptions

    // Update settings when they change
    useEffect(() => {
      if (!sceneManagerRef.current || !keyboardOptions) {
        return;
      }

      const newSettingsStr = JSON.stringify(keyboardOptions);

      // Only update if settings actually changed
      if (newSettingsStr !== previousSettingsRef.current) {
        previousSettingsRef.current = newSettingsStr;
        sceneManagerRef.current.updateSettings(
          keyboardOptions as KeyboardSettings
        );
      }
    }, [keyboardOptions]);

    return (
      <div
        ref={containerRef}
        className='w-full h-full overflow-visible mx-auto'
      />
    );
  }
);

Keyboard3D.displayName = 'Keyboard3D';

export default Keyboard3D;
