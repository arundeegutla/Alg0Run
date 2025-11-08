import * as THREE from 'three';

export function lightTexture(accentColor: string): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.height = size;
  canvas.width = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get 2D context');
  }

  // Base white fill
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Overlay with semi-transparent accent color
  ctx.fillStyle = `${accentColor}80`; // Add alpha channel (50% opacity)
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  return texture;
}
