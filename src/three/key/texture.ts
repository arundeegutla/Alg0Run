import * as THREE from 'three';
import { CHERRY_LEGENDS } from '@/src/config/keyboard';

interface TextureOptions {
  w: number;
  h: number;
  legend: string;
  code: string;
  color: string;
  background: string;
}

// Font loading promise
let fontLoadedPromise: Promise<void> | null = null;

function ensureFontLoaded(): Promise<void> {
  if (fontLoadedPromise) return fontLoadedPromise;

  fontLoadedPromise = new Promise((resolve) => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        console.log('Checking for legends font...');
        const fontLoaded = document.fonts.check('80px legends');
        console.log('Legends font loaded:', fontLoaded);
        if (fontLoaded) {
          resolve();
        } else {
          console.log('Loading legends font from /fonts/legends.woff');
          const font = new FontFace('legends', 'url(/fonts/legends.woff)');
          font
            .load()
            .then(() => {
              document.fonts.add(font);
              console.log('Legends font loaded successfully');
              resolve();
            })
            .catch((err) => {
              console.error('Failed to load legends font:', err);
              resolve();
            });
        }
      });
    } else {
      console.log('document.fonts not supported, waiting 1500ms');
      setTimeout(() => resolve(), 1500);
    }
  });

  return fontLoadedPromise;
}

export const keyTexture = (opts: TextureOptions): THREE.CanvasTexture => {
  const pxPerU = 128;
  const w = opts.w;
  const h = opts.h;
  const key = opts.code;
  const fg = opts.color;
  const bg = opts.background;
  const isSpace = key === 'KC_SPC';

  const canvas = document.createElement('canvas');
  canvas.width = pxPerU * w;
  canvas.height = pxPerU * h;

  const ctx = canvas.getContext('2d')!;

  // Clear canvas to transparent first
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw base color
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw gradient to simulate sculpting
  let gradient: CanvasGradient;
  if (isSpace) {
    // Convex for spacebar
    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(0,0,0,0.15)');
    gradient.addColorStop(0.5, 'rgba(128,128,128,0.0)');
    gradient.addColorStop(1, 'rgba(255,255,255,0.15)');
  } else {
    // Concave for regular keys
    gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.0)');
    gradient.addColorStop(0.6, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.15)');
  }

  // Bottom edge highlight
  const shineOpacity = 0.4;
  const shineRight = ctx.createLinearGradient(0, 0, canvas.width, 0);
  shineRight.addColorStop(0, `rgba(255,255,255,${0 * shineOpacity})`);
  shineRight.addColorStop(0.03, `rgba(255,255,255,${0 * shineOpacity})`);
  shineRight.addColorStop(0.07, `rgba(255,255,255,${0.6 * shineOpacity})`);
  shineRight.addColorStop(0.8, `rgba(255,255,255,${0.6 * shineOpacity})`);
  shineRight.addColorStop(0.95, `rgba(255,255,255,${0 * shineOpacity})`);

  // Side edge highlight
  const shineBottom = ctx.createLinearGradient(0, 0, 0, canvas.height);
  const highlightRatio = (canvas.width - pxPerU * 0.04) / canvas.width;
  shineBottom.addColorStop(0, `rgba(255,255,255,${0 * shineOpacity})`);
  shineBottom.addColorStop(0.03, `rgba(255,255,255,${0 * shineOpacity})`);
  shineBottom.addColorStop(0.15, `rgba(255,255,255,${0.5 * shineOpacity})`);
  shineBottom.addColorStop(0.5, `rgba(255,255,255,${0.7 * shineOpacity})`);
  shineBottom.addColorStop(0.85, `rgba(255,255,255,${1.1 * shineOpacity})`);
  shineBottom.addColorStop(0.9, `rgba(255,255,255,${0.7 * shineOpacity})`);
  shineBottom.addColorStop(0.95, `rgba(255,255,255,${0 * shineOpacity})`);
  shineBottom.addColorStop(1, `rgba(255,255,255,${0 * shineOpacity})`);

  // Apply gradients
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = shineRight;
  ctx.fillRect(0, canvas.height * 0.97, canvas.width, canvas.height);

  ctx.fillStyle = shineBottom;
  ctx.fillRect(canvas.width * highlightRatio, 0, canvas.width, canvas.height);

  // Draw legend
  const drawLegend = () => {
    const legendCode = CHERRY_LEGENDS[key];

    console.log(`Drawing legend for ${key}:`, legendCode);

    if (legendCode) {
      const mainChar = String.fromCharCode(parseInt(legendCode, 16));

      console.log(`Character for ${key}:`, mainChar, `(code: ${legendCode})`);

      // Cherry profile legend configuration
      const fontSize = 80;
      const offsetX = 20;
      const offsetY = 25;

      ctx.font = `${fontSize}px legends`;
      ctx.fillStyle = fg;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      // Position: offsetX from left, offsetY from top
      ctx.fillText(mainChar, offsetX, offsetY);

      texture.needsUpdate = true;
    } else {
      console.log(`No legend code for ${key}`);
      // DEBUG: If no legend code, draw a circle to show texture is working
      ctx.fillStyle = fg;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, Math.PI * 2);
      ctx.fill();
      texture.needsUpdate = true;
    }
  };

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  // Draw legend immediately (will be blank glyph if font not loaded)
  drawLegend();

  // Wait for font to load, then redraw legend
  ensureFontLoaded().then(() => {
    drawLegend();
  });

  return texture;
};
