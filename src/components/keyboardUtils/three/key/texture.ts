import * as THREE from 'three';
import LEGENDS from '../../config/legends/primary/primary';
import SUBS from '../../config/legends/subs/subs';
import { isAlpha } from '../../config/keyboard';

// Type definitions
interface TextureOptions {
  w: number;
  h: number;
  legend: string;
  sub?: string;
  code: string;
  color: string;
  subColor?: string;
  background: string;
}

interface LegendChar {
  top: string;
  bottom?: string;
}

interface Legend {
  id: string;
  fontFamily: string;
  subsSupported: boolean;
  centered: boolean;
  encoded: boolean;
  offsetX: number;
  offsetY: number;
  yOffsetTop?: number;
  yOffsetBottom?: number;
  yOffsetMod?: number;
  fontsize: number;
  chars: Record<string, string | LegendChar>;
}

interface SubLegend {
  fontFamily: string;
  fontSizeMultiplier: number;
  chars: Record<string, string | LegendChar>;
}

// Generates a texture with canvas for top of key
export const keyTexture = (opts: TextureOptions): THREE.CanvasTexture => {
  let w = opts.w;
  const h = opts.h;
  const legend = opts.legend;
  const sublegend = opts.sub;
  const key = opts.code;
  const pxPerU = 128;
  const subColor = opts.subColor || opts.color;
  const fg = opts.color;
  const bg = opts.background;

  // ISO enter add extra .25 for overhang
  const isIsoEnter = key === 'KC_ENT' && h > 1;
  if (isIsoEnter) {
    w = w + 0.25;
  }

  const canvas = document.createElement('canvas');
  canvas.height = pxPerU * h;
  canvas.width = pxPerU * w;

  const ctx = canvas.getContext('2d')!;

  // Draw base color
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw gradient to simulate sculpting
  let gradient: CanvasGradient;
  if (key === 'KC_SPC') {
    // Convex
    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(0,0,0,0.15)');
    gradient.addColorStop(0.5, 'rgba(128,128,128,0.0)');
    gradient.addColorStop(1, 'rgba(255,255,255,0.15)');
  } else {
    // Concave
    // Simulate slight curve with gradient on face
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

  // Draw gradients
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = shineRight;
  ctx.fillRect(0, canvas.height * 0.97, canvas.width, canvas.height);

  ctx.fillStyle = shineBottom;
  ctx.fillRect(canvas.width * highlightRatio, 0, canvas.width, canvas.height);

  const l: Legend = LEGENDS[legend as keyof typeof LEGENDS] as Legend;
  let mainChar: string | LegendChar = l?.chars[key] || '';

  // 1u bs and enter
  if (key === 'KC_BSPC' && w <= 1) {
    mainChar = l?.chars['KC_BSISO'] || mainChar;
  }
  if ((key === 'KC_ENT' && w <= 1) || isIsoEnter) {
    mainChar = l?.chars['KC_ENISO'] || mainChar;
  }

  const modWord =
    !l.encoded && typeof mainChar === 'string' && mainChar.length > 1; // Mods use multi character words instead of symbols (sa)
  const subLegendData = sublegend ? SUBS[sublegend as keyof typeof SUBS] : null;

  // Convert to unicode value if encoded for custom fonts
  if (typeof mainChar === 'string') {
    mainChar =
      l.encoded && mainChar.length > 1
        ? String.fromCharCode(parseInt(mainChar, 16))
        : mainChar;
  }

  // Font size
  let fontScaler = 1;
  if (typeof mainChar === 'object' && mainChar.top) fontScaler = 1 / 2; // Number keys 2 characters stacked
  if (typeof mainChar === 'string' && modWord) fontScaler = 1 / 4; // Keys with full words for modifier text i.e. "Enter", "Alt", "Home"
  const fontSize = l.fontsize * (fontScaler + 0.25);

  // Set font style
  if (modWord) {
    ctx.font = `700 ${fontSize}px ${l.fontFamily}`;
  } else {
    ctx.font = `${fontSize}px ${l.fontFamily}`;
  }
  ctx.fillStyle = fg;

  if (l.centered) {
    ctx.textAlign = 'center';
    l.offsetX = (w * pxPerU) / 2;
  } else {
    ctx.textAlign = 'left';
  }

  let ent_off_x = 0;
  let ent_off_y = 0;
  if (isIsoEnter) {
    ent_off_x = 15;
    ent_off_y = 6;
  }

  if (typeof mainChar === 'object' && mainChar.top) {
    ctx.fillText(mainChar.top, l.offsetX, l.offsetY + (l.yOffsetTop || 0));
    ctx.fillText(
      mainChar.bottom || '',
      l.offsetX,
      l.offsetY + (l.yOffsetBottom || 0)
    );
  } else if (typeof mainChar === 'string') {
    ctx.fillText(
      mainChar,
      l.offsetX + ent_off_x,
      l.fontsize + (isAlpha(key) ? l.offsetY : l.yOffsetMod || 0) + ent_off_y
    );
  }

  // // Sub characters
  // if (sublegend && subChar && l.subsSupported) {
  //   const sub: SubLegend = SUBS[sublegend as keyof typeof SUBS] as SubLegend;
  //   const multiplier = sub.fontSizeMultiplier * 0.35;
  //   ctx.fillStyle = subColor || fg;
  //   ctx.font = `bold ${pxPerU * multiplier}px ${sub.fontFamily}`;
  //   if (typeof subChar === 'object' && subChar.top) {
  //     ctx.fillText(subChar.top, pxPerU * 0.55, pxPerU * 0.4);
  //     ctx.fillText(subChar.bottom || '', pxPerU * 0.55, pxPerU * 0.8);
  //   } else if (typeof subChar === 'string') {
  //     ctx.fillText(subChar, pxPerU * 0.55, pxPerU * 0.8);
  //   }
  // }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.NearestMipmapNearestFilter;

  // Flip texture to correct mirroring
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;

  return texture;
};
