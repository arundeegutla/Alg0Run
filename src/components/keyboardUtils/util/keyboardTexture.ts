import * as THREE from 'three';

// Font loading promise
let fontLoadedPromise: Promise<void> | null = null;
let fontLoadAttempted = false;

function ensureFontLoaded(): Promise<void> {
  if (fontLoadedPromise) return fontLoadedPromise;

  if (!fontLoadAttempted) {
    fontLoadAttempted = true;
  }

  fontLoadedPromise = new Promise((resolve) => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        // Double-check the legends font specifically
        const fontLoaded = document.fonts.check('80px legends');

        if (fontLoaded) {
          resolve();
        } else {
          // Try to load it explicitly
          const font = new FontFace('legends', 'url(/fonts/legends.woff)');
          font
            .load()
            .then(() => {
              document.fonts.add(font);
              resolve();
            })
            .catch(() => {
              resolve(); // Resolve anyway to not block
            });
        }
      });
    } else {
      // Fallback for browsers without FontFace API
      setTimeout(() => resolve(), 1500);
    }
  });

  return fontLoadedPromise;
}

// Map browser key codes to QMK key codes
const KEY_CODE_MAP: Record<string, string> = {
  Escape: 'KC_ESC',
  Digit1: 'KC_1',
  Digit2: 'KC_2',
  Digit3: 'KC_3',
  Digit4: 'KC_4',
  Digit5: 'KC_5',
  Digit6: 'KC_6',
  Digit7: 'KC_7',
  Digit8: 'KC_8',
  Digit9: 'KC_9',
  Digit0: 'KC_0',
  Minus: 'KC_MINS',
  Equal: 'KC_EQL',
  Backspace: 'KC_BSPC',
  Tab: 'KC_TAB',
  KeyQ: 'KC_Q',
  KeyW: 'KC_W',
  KeyE: 'KC_E',
  KeyR: 'KC_R',
  KeyT: 'KC_T',
  KeyY: 'KC_Y',
  KeyU: 'KC_U',
  KeyI: 'KC_I',
  KeyO: 'KC_O',
  KeyP: 'KC_P',
  BracketLeft: 'KC_LBRC',
  BracketRight: 'KC_RBRC',
  Backslash: 'KC_BSLS',
  CapsLock: 'KC_CAPS',
  KeyA: 'KC_A',
  KeyS: 'KC_S',
  KeyD: 'KC_D',
  KeyF: 'KC_F',
  KeyG: 'KC_G',
  KeyH: 'KC_H',
  KeyJ: 'KC_J',
  KeyK: 'KC_K',
  KeyL: 'KC_L',
  Semicolon: 'KC_SCLN',
  Quote: 'KC_QUOT',
  Enter: 'KC_ENT',
  ShiftLeft: 'KC_LSFT',
  ShiftRight: 'KC_RSFT',
  KeyZ: 'KC_Z',
  KeyX: 'KC_X',
  KeyC: 'KC_C',
  KeyV: 'KC_V',
  KeyB: 'KC_B',
  KeyN: 'KC_N',
  KeyM: 'KC_M',
  Comma: 'KC_COMM',
  Period: 'KC_DOT',
  Slash: 'KC_SLSH',
  ControlLeft: 'KC_LCTL',
  ControlRight: 'KC_RCTL',
  MetaLeft: 'KC_LGUI',
  MetaRight: 'KC_RGUI',
  AltLeft: 'KC_LALT',
  AltRight: 'KC_RALT',
  Space: 'KC_SPC',
  Home: 'KC_HOME',
  PageUp: 'KC_PGUP',
  PageDown: 'KC_PGDN',
  End: 'KC_END',
  ArrowUp: 'KC_UP',
  ArrowDown: 'KC_DOWN',
  ArrowLeft: 'KC_LEFT',
  ArrowRight: 'KC_RGHT',
  Fn: 'MO(1)',
};

// Cherry profile legend configuration (encoded unicode font)
const CHERRY_LEGENDS: Record<string, string> = {
  KC_0: 'e900',
  KC_1: 'e903',
  KC_2: 'e905',
  KC_3: 'e906',
  KC_4: 'e908',
  KC_5: 'e909',
  KC_6: 'e90a',
  KC_7: 'e90b',
  KC_8: 'e90c',
  KC_9: 'e90d',
  KC_A: 'e912',
  KC_B: 'e913',
  KC_C: 'e914',
  KC_D: 'e915',
  KC_E: 'e916',
  KC_F: 'e917',
  KC_G: 'e918',
  KC_H: 'e919',
  KC_I: 'e91a',
  KC_J: 'e91b',
  KC_K: 'e91c',
  KC_L: 'e91d',
  KC_M: 'e91e',
  KC_N: 'e91f',
  KC_O: 'e920',
  KC_P: 'e921',
  KC_Q: 'e922',
  KC_R: 'e923',
  KC_S: 'e924',
  KC_T: 'e925',
  KC_U: 'e926',
  KC_V: 'e927',
  KC_W: 'e928',
  KC_X: 'e929',
  KC_Y: 'e92a',
  KC_Z: 'e92b',
  KC_ESC: 'e941',
  KC_MINS: 'e90e',
  KC_EQL: 'e90f',
  KC_BSPC: 'e937',
  KC_TAB: 'e939',
  KC_LBRC: 'e92c',
  KC_RBRC: 'e92d',
  KC_BSLS: 'e92f',
  KC_CAPS: 'e936',
  KC_SCLN: 'e930',
  KC_QUOT: 'e931',
  KC_ENT: 'e951',
  KC_COMM: 'e932',
  KC_DOT: 'e933',
  KC_SLSH: 'e934',
  KC_LSFT: 'e947',
  KC_RSFT: 'e947',
  KC_LCTL: 'e93a',
  KC_RCTL: 'e93a',
  KC_LALT: 'e93b',
  KC_RALT: 'e93b',
  KC_LGUI: 'e93d',
  KC_RGUI: 'e93d',
  KC_SPC: '',
  KC_HOME: 'e94d',
  KC_PGUP: 'e954',
  KC_PGDN: 'e953',
  KC_END: 'e94e',
  KC_UP: 'e965',
  KC_DOWN: 'e962',
  KC_LEFT: 'e964',
  KC_RGHT: 'e963',
  'MO(1)': 'e93e',
};

export function createKeyTexture(
  width: number,
  height: number,
  keyCode: string,
  foreground: string,
  background: string
): THREE.CanvasTexture {
  const pxPerU = 128;
  const w = width;
  const h = height;
  const isSpace = keyCode === 'Space';

  const canvas = document.createElement('canvas');
  canvas.width = pxPerU * w;
  canvas.height = pxPerU * h;

  const ctx = canvas.getContext('2d')!;

  // Draw base color
  ctx.fillStyle = background;
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

  // Draw legend (will be called after font is loaded)
  const drawLegend = () => {
    const kcCode = KEY_CODE_MAP[keyCode] || '';
    const legendCode = CHERRY_LEGENDS[kcCode] || '';

    if (legendCode) {
      const mainChar = String.fromCharCode(parseInt(legendCode, 16));

      // Cherry profile settings - matching keysim exactly
      const fontSize = 80;
      const offsetX = 20;
      const offsetY = 25;

      ctx.font = `${fontSize}px legends`;
      ctx.fillStyle = foreground;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';

      // Position at top-left like keysim (fontsize + offsetY)
      const yPos = fontSize + offsetY;
      ctx.fillText(mainChar, offsetX, yPos);

      // Update texture after drawing
      texture.needsUpdate = true;
    }
  };

  const texture = new THREE.CanvasTexture(canvas);

  // Wait for font to load, then draw legend
  ensureFontLoaded().then(() => {
    drawLegend();
  });

  texture.needsUpdate = true;
  texture.minFilter = THREE.NearestMipmapNearestFilter;

  return texture;
}
