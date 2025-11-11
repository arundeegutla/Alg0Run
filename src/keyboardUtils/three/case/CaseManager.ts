/**
 * CaseManager - Manages the keyboard case 3D rendering
 *
 * This class handles:
 * - Case geometry creation (styles: CASE_1, CASE_2)
 * - Material rendering (matte, brushed, glossy finishes)
 * - Texture loading and application
 * - Plate and badge creation
 * - Shadow rendering
 * - Redux store subscriptions for real-time updates
 * - Environment mapping and lighting
 */

import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { LAYOUT_65 } from '@/keyboardUtils/config/keyboard';
import type { KeyboardSettings } from '@/keyboardUtils/config/settings';
import LAYOUTS from '@/keyboardUtils/config/layouts/layouts';
import case_1 from './case_1';
import case_2 from './case_2';
import badge from './badge';
import { lightTexture } from './lightTexture';
import type { StaticImageData } from 'next/image';

// @ts-expect-error - redux-subscriber doesn't have types
import { subscribe } from 'redux-subscriber';

// Asset imports
import shadowPath from '@/assets/dist/shadow-key-noise.png';
import noisePath from '@/assets/dist/noise.png';
import brushedRoughness from '@/assets/dist/brushed-metal_roughness-512.png';
import brushedAlbedo from '@/assets/dist/brushed-metal_albedo-512.png';
import brushedAo from '@/assets/dist/brushed-metal_ao-512.png';

import shadow_path_65 from '@/assets/shadows/65.png';

// Helper to get image src from StaticImageData
const getImageSrc = (img: StaticImageData | string): string => {
  return typeof img === 'string' ? img : img.src;
};

const shadow_paths: Record<string, string> = {
  shadow_path_65: getImageSrc(shadow_path_65),
};

interface MaterialOptions {
  metalness?: number;
  roughness?: number;
  clearcoat?: number;
  aoMapIntensity?: number;
  clearcoatRoughness?: number;
  lightMapIntensity?: number;
  envMapIntensity?: number;
  lightMap?: THREE.Texture;
  envMap?: THREE.CubeTexture;
  roughnessMap?: THREE.Texture;
  map?: THREE.Texture;
  aoMap?: THREE.Texture;
  color?: string | number;
}

const MATERIAL_OPTIONS: Record<string, MaterialOptions> = {
  matte: {
    metalness: 0,
    roughness: 1,
    clearcoat: 0,
    aoMapIntensity: 0.1,
    clearcoatRoughness: 1,
    lightMapIntensity: 0.2,
  },
  brushed: {
    metalness: 0.4,
    aoMapIntensity: 0.4,
    envMapIntensity: 0.1,
  },
  glossy: {
    metalness: 0.8,
    roughness: 0.1,
    aoMapIntensity: 0.4,
    envMapIntensity: 0.5,
  },
};

// Utility to convert degrees to radians
const toRad = (degrees: number) => (degrees * Math.PI) / 180;

export default class CaseManager {
  scene: THREE.Scene;
  group: THREE.Group;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layout: any;
  layoutName: string;
  style: string;
  color: string;
  finish: string;
  bezel: number;
  height: number;
  angle: number;
  r: number;
  texScale: number;
  caseMesh!: THREE.Mesh;
  plate!: THREE.Mesh;
  shadow!: THREE.Mesh;
  badgeMesh?: THREE.Mesh;
  settings: KeyboardSettings;
  loader: TextureLoader;

  // Textures
  aoNoiseTexture!: THREE.Texture;
  aoShadowTexture!: THREE.Texture;
  roughnessMap!: THREE.Texture;
  albedoMap!: THREE.Texture;
  ao!: THREE.Texture;
  lightTexture!: THREE.Texture;
  cubemap!: THREE.CubeTexture;

  constructor(scene: THREE.Scene, settings: KeyboardSettings) {
    this.scene = scene;
    this.settings = settings;
    this.group = new THREE.Group();
    this.group.name = 'CASE';
    this.layoutName = settings.case.layout || '65';
    this.style = settings.case.style || 'CASE_1';
    this.color = settings.case.primaryColor;
    this.finish = settings.case.material || 'matte';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.layout = (LAYOUTS as any)[this.layoutName] || LAYOUT_65;
    this.texScale = 0.1;
    this.bezel = 0.5;
    this.height = 1;
    this.angle = 6;
    this.r = 0.5;
    this.loader = new TextureLoader();
    this.setup();
  }

  get width() {
    return this.layout.width + this.bezel * 2;
  }

  get depth() {
    return this.layout.height + this.bezel * 2;
  }

  get angleOffset() {
    return Math.sin(toRad(this.angle)) * this.depth;
  }

  setup() {
    this.loadTextures();
    this.createCaseShadow();
    this.createBadge();
    this.createPlate();
    this.createCase();
    this.position();
    this.scene.add(this.group);
    this.setupSubscriptions();
  }

  setupSubscriptions() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribe('case.primaryColor', (state: any) => {
      this.color = state.case.primaryColor;
      this.updateCaseMaterial();
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribe('case.material', (state: any) => {
      this.finish = state.case.material;
      this.updateCaseMaterial();
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribe('case.style', (state: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.layout = (LAYOUTS as any)[state.case.layout];
      this.style = state.case.style;
      this.updateCaseGeometry();
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribe('case.layout', (state: any) => {
      this.layoutName = state.case.layout;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.layout = (LAYOUTS as any)[state.case.layout];
      this.updateCaseGeometry();
      this.createCaseShadow();
      this.createBadge();
      this.createPlate();
    });

    subscribe('colorways.active', () => {
      this.updateLightMap();
    });
  }

  position() {
    this.group.rotation.x = toRad(this.angle);
    this.group.position.x = -this.layout.width / 2;
    this.group.position.y = this.angleOffset + this.height;
  }

  loadTextures() {
    this.aoNoiseTexture = this.loader.load(getImageSrc(noisePath));
    this.aoNoiseTexture.wrapS = THREE.RepeatWrapping;
    this.aoNoiseTexture.wrapT = THREE.RepeatWrapping;

    this.aoShadowTexture = this.loader.load(getImageSrc(shadowPath));
    this.aoShadowTexture.wrapS = THREE.RepeatWrapping;
    this.aoShadowTexture.wrapT = THREE.RepeatWrapping;

    this.roughnessMap = this.loader.load(getImageSrc(brushedRoughness));
    this.roughnessMap.wrapS = THREE.RepeatWrapping;
    this.roughnessMap.wrapT = THREE.RepeatWrapping;
    this.roughnessMap.repeat.x = this.texScale;
    this.roughnessMap.repeat.y = this.texScale;
    this.roughnessMap.rotation = Math.PI / 2;

    this.albedoMap = this.loader.load(getImageSrc(brushedAlbedo));
    this.albedoMap.wrapS = THREE.RepeatWrapping;
    this.albedoMap.wrapT = THREE.RepeatWrapping;
    this.albedoMap.repeat.x = this.texScale;
    this.albedoMap.repeat.y = this.texScale;
    this.albedoMap.rotation = Math.PI / 2;

    this.ao = this.loader.load(getImageSrc(brushedAo));
    this.ao.wrapS = THREE.RepeatWrapping;
    this.ao.wrapT = THREE.RepeatWrapping;
    this.ao.repeat.x = this.texScale;
    this.ao.repeat.y = this.texScale;
    this.ao.rotation = Math.PI / 2;

    // Note: ColorUtil.getAccent() needs to be implemented
    // For now using a placeholder color
    this.lightTexture = lightTexture('#ff6b6b');
  }

  createPlate() {
    if (this.plate) this.group.remove(this.plate);

    const geometry = new THREE.PlaneGeometry(
      this.width - this.bezel * 2,
      this.depth - this.bezel * 2
    );
    const material = new THREE.MeshLambertMaterial({
      color: 'black',
    });

    this.plate = new THREE.Mesh(geometry, material);
    this.plate.rotation.x = -Math.PI / 2;
    this.plate.name = 'IGNORE';
    this.plate.layers.enable(1);
    this.plate.position.set(
      this.width / 2 - this.bezel,
      -0.5,
      this.depth / 2 - this.bezel
    );

    this.group.add(this.plate);
  }

  createBadge() {
    if (this.badgeMesh) this.group.remove(this.badgeMesh);

    if (this.layout.width > 18) {
      const w = this.layout.width;
      let bw = 3;
      bw = w > 19 ? 4 : bw;
      bw = w > 21 ? 4 : bw;
      let bx = 15.25;
      bx = w > 19 ? 15.5 : bx;
      bx = w > 21 ? 18.5 : bx;

      this.badgeMesh = badge(bw, this.cubemap);
      this.badgeMesh.position.x += bx;
      this.group.add(this.badgeMesh);
    }
  }

  createCaseShadow() {
    if (this.shadow) this.scene.remove(this.shadow);

    const sh_w = this.style === 'CASE_1' ? 32.7 : 32;
    const sh_h = this.style === 'CASE_1' ? 33 : 31.5;
    const sh_o = this.style === 'CASE_1' ? 0 : -0.05;

    const shadowTex = this.loader.load(
      shadow_paths[`shadow_path_${this.layoutName}`]
    );
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
    });

    this.shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(sh_w, sh_h),
      shadowMat
    );
    this.shadow.position.z = this.depth / 2 - this.bezel + sh_o;
    this.shadow.position.y = 0.01;
    if (this.shadow.material instanceof THREE.Material) {
      this.shadow.material.side = THREE.DoubleSide;
    }
    this.shadow.rotation.x = -Math.PI / 2;

    this.scene.add(this.shadow);
  }

  getCaseMesh(layout = this.layout, style = this.style) {
    let mesh: THREE.Mesh;
    if (style === 'CASE_1') {
      mesh = case_1(layout, this.color);
    } else {
      mesh = case_2(layout, this.color);
    }
    return mesh;
  }

  createCase() {
    this.caseMesh = this.getCaseMesh();
    this.updateCaseMaterial();
    this.group.add(this.caseMesh);
  }

  updateCaseGeometry() {
    const mesh = this.getCaseMesh();
    this.caseMesh.geometry = mesh.geometry;
    this.caseMesh.position.set(
      mesh.position.x,
      mesh.position.y,
      mesh.position.z
    );
    this.position();
  }

  updateLightMap() {
    // Note: ColorUtil.getAccent() needs to be implemented
    this.lightTexture = lightTexture('#ff6b6b');
    if (Array.isArray(this.caseMesh.material) && this.caseMesh.material[1]) {
      const mat = this.caseMesh.material[1] as THREE.MeshPhysicalMaterial;
      mat.lightMap = this.lightTexture;
    }
  }

  updateCaseMaterial(color = this.color, finish = this.finish) {
    const materials: THREE.MeshPhysicalMaterial[] = [];
    const options: MaterialOptions = { ...MATERIAL_OPTIONS[finish] };
    options.lightMap = this.ao;

    if (finish !== 'matte') {
      options.envMap = this.cubemap;
      options.roughnessMap = this.roughnessMap;
      options.map = this.albedoMap;
    }

    // Primary material
    const materialPrimary = new THREE.MeshPhysicalMaterial({
      ...options,
      color: color,
    });

    // Side material
    const sideOptions: MaterialOptions = { ...options };
    sideOptions.lightMap = this.lightTexture;
    const materialSecondary = new THREE.MeshPhysicalMaterial({
      ...sideOptions,
      color: color,
      aoMap: this.aoShadowTexture,
      aoMapIntensity: 0.6,
    });

    materials.push(materialPrimary, materialSecondary);
    this.caseMesh.material = materials;
  }
}
