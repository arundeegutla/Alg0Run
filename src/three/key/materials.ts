import * as THREE from 'three';
import { keyTexture } from './texture';

interface MaterialOptions {
  w: number;
  h: number;
  legend: string;
  code: string;
  color: string;
  background: string;
  isIsoEnt?: boolean;
}

const aoMapLoader = new THREE.TextureLoader();
let aoMap: THREE.Texture | null = null;

const loadAOMap = () => {
  if (!aoMap) {
    aoMap = aoMapLoader.load('/textures/shadow-key-noise.png');
    aoMap.wrapS = THREE.RepeatWrapping;
    aoMap.wrapT = THREE.RepeatWrapping;
    aoMap.colorSpace = THREE.SRGBColorSpace;
  }
  return aoMap;
};

export const keyMaterials = (opts: MaterialOptions): THREE.Material[] => {
  const legendTexture = keyTexture(opts);
  const ao = loadAOMap();

  // Top material with legend texture - use LinearFilter like keysim
  const topMaterial = new THREE.MeshLambertMaterial({
    map: legendTexture,
    color: 0xffffff, // White base so texture shows correctly
    aoMap: ao,
    aoMapIntensity: 0.2,
  });

  // Apply linear filtering for smoother text
  if (topMaterial.map) {
    topMaterial.map.minFilter = THREE.LinearFilter;
    topMaterial.map.magFilter = THREE.LinearFilter;
    topMaterial.map.needsUpdate = true;
  }

  // Side material with color and AO
  const sideMaterial = new THREE.MeshStandardMaterial({
    color: opts.background,
    aoMap: ao,
    aoMapIntensity: 0.4,
    roughness: 0.5,
    metalness: 0.1,
  });

  return [sideMaterial, topMaterial];
};

export const updateMaterials = (mesh: THREE.Mesh, opts: MaterialOptions) => {
  const materials = keyMaterials(opts);
  if (Array.isArray(mesh.material)) {
    mesh.material[0] = materials[0];
    mesh.material[1] = materials[1];
  }
};
