'use client';
import * as THREE from 'three';
import { keyTexture } from './texture';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import ambiantOcclusionPath from '@/assets/dist/shadow-key-noise.png';
import lightMapPath from '@/assets/materials/white.png';

let loader = null;
let ambiantOcclusionMap = null;
let lightMap = null;

const initTextures = () => {
  if (typeof window === 'undefined') return;
  
  if (!loader) {
    loader = new TextureLoader();
    
    ambiantOcclusionMap = loader.load(ambiantOcclusionPath);
    ambiantOcclusionMap.wrapS = THREE.RepeatWrapping;
    ambiantOcclusionMap.wrapT = THREE.RepeatWrapping;

    lightMap = loader.load(lightMapPath);
    lightMap.wrapS = THREE.RepeatWrapping;
    lightMap.wrapT = THREE.RepeatWrapping;
  }
};

var computed_materials = {};

export const KEY_MATERIAL_STATES = {
  DEFAULT: 0,
  ACTIVE: 1,
  HIGHLIGHTED: 2,
};

export const setKeyMaterialState = (mesh, state, isoent) => {
  if (state === KEY_MATERIAL_STATES.DEFAULT) {
    setMaterialIndexes(mesh, 2, 3, isoent);
  }
  if (state === KEY_MATERIAL_STATES.ACTIVE) {
    setMaterialIndexes(mesh, 0, 1, isoent);
  }
  if (state === KEY_MATERIAL_STATES.HIGHLIGHTED) {
    setMaterialIndexes(mesh, 0, 1, isoent);
  }
};

const setMaterialIndexes = (mesh, side, top, isoent) => {
  // In BufferGeometry, we use groups to assign materials
  // The geometry has indices organized as:
  // - Top faces first (with texture/label)
  // - Then corners and side faces (solid color)
  mesh.geometry.clearGroups();

  if (isoent) {
    // ISO Enter key has different group structure
    // Top faces: 10 triangles = 30 indices
    // Corners and sides: 20 triangles = 60 indices
    mesh.geometry.addGroup(0, 30, top); // Top face
    mesh.geometry.addGroup(30, 60, side); // Corners and sides
  } else {
    // Standard key geometry structure:
    // - Top faces: 6 triangles = 18 indices (top top + top bottom + top center)
    // - Corner faces: 4 triangles = 12 indices
    // - Side faces: 8 triangles = 24 indices
    // Total: 18 + 12 + 24 = 54 indices
    mesh.geometry.addGroup(0, 18, top); // Top faces (with texture)
    mesh.geometry.addGroup(18, 36, side); // Corners and sides (solid color)
  }
};

//generate top and side materials for a single color set
const getMaterialSet = (opts, offset) => {
  initTextures();
  
  let key = `mat${opts.background}`;

  let legendTexture = keyTexture(opts);
  let top = new THREE.MeshLambertMaterial({
    map: legendTexture,
    lightMap: lightMap,
    lightMapIntensity: 0,
    emissive: new THREE.Color(0x000000),
    emissiveIntensity: 0,
  });
  top.map.minFilter = THREE.LinearFilter;

  if (computed_materials[key]) {
    return [computed_materials[key].clone(), top];
  }
  let side = new THREE.MeshStandardMaterial({
    aoMap: ambiantOcclusionMap,
    color: opts.background,
    aoMapIntensity: 0.4,
    lightMap: lightMap,
    lightMapIntensity: 0,
    emissive: new THREE.Color(0x000000),
    emissiveIntensity: 0,
  });
  computed_materials[key] = side;
  return [side, top];
};

export const keyMaterials = (opts) => {
  let base = getMaterialSet(opts);
  opts.color = opts.activeColor;
  opts.background = opts.activeBackground;
  let active = getMaterialSet(opts);
  let materials = [...active, ...base];
  return materials;
};

export const updateMaterials = (mesh, opts) => {
  let base = getMaterialSet(opts);
  mesh.material[2] = base[0];
  mesh.material[3] = base[1];
  setKeyMaterialState(mesh, KEY_MATERIAL_STATES.DEFAULT, opts.isIsoEnt);
};

export const updateActiveMaterials = (mesh, opts) => {
  opts.color = opts.activeColor;
  opts.background = opts.activeBackground;
  let active = getMaterialSet(opts);
  mesh.material[0] = active[0];
  mesh.material[1] = active[1];
  setKeyMaterialState(mesh, KEY_MATERIAL_STATES.DEFAULT, opts.isIsoEnt);
};

//simulate highlighting by toggling lightmap intensity
export const enableHighlight = (key_mesh, layer) => {
  key_mesh.material.forEach((m) => (m.lightMapIntensity = 0.2));
};
export const disableHighlight = (key_mesh, layer) => {
  key_mesh.material.forEach((m) => (m.lightMapIntensity = 0));
};
