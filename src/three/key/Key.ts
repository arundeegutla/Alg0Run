import * as THREE from 'three';
import { keyGeometry, keyGeometryISOEnter } from './geometry';
import { keyMaterials, updateMaterials } from './materials';
import { COLORWAY_9009, isMod } from '@/src/config/keyboard';

export const KEYSTATES = {
  INITIAL: 0,
  PRESSED: 1,
  MOVING_UP: 2,
  MOVING_DOWN: 3,
};

interface KeyDimensions {
  x: number;
  y: number;
  w: number;
  h: number;
  row: number;
}

interface KeyOptions {
  code: string;
  dimensions: KeyDimensions;
  container: THREE.Group;
  isIso?: boolean;
}

export class Key {
  code: string;
  state: number;
  previousState: number;
  isIsoEnter: boolean;
  direction: number;
  gutter: number;
  startY: number;
  distPressed: number;
  pressVelocity: number;
  legend: string;
  testing: boolean;
  options: KeyOptions;
  cap!: THREE.Mesh;
  queueRelease: boolean;

  constructor(options: KeyOptions) {
    this.options = options;
    this.code = options.code;
    this.state = KEYSTATES.INITIAL;
    this.previousState = KEYSTATES.INITIAL;
    this.isIsoEnter = this.code === 'KC_ENT' && options.isIso === true;
    this.direction = -1;
    this.gutter = 0.05;
    this.startY = -0.05;
    this.distPressed = 0.25;
    this.pressVelocity = 0.1;
    this.legend = 'cherry';
    this.testing = false;
    this.queueRelease = false;
    this.setup();
  }

  get h() {
    return this.options.dimensions.h || 1;
  }

  get w() {
    return this.options.dimensions.w || 1;
  }

  get x() {
    return this.options.dimensions.x || 0;
  }

  get y() {
    return this.options.dimensions.y || 0;
  }

  get row() {
    return this.options.dimensions.row || 1;
  }

  get backgroundColor() {
    return this.swatch.background;
  }

  get foregroundColor() {
    return this.swatch.color;
  }

  get swatch() {
    // Check if modifier
    const group = isMod(this.code) ? 'mods' : 'base';

    // Check for accent keys
    if (this.code === 'KC_ESC' || this.code === 'KC_SPC') {
      return COLORWAY_9009.accent;
    }
    if (this.code === 'KC_ENT') {
      return COLORWAY_9009.accent2;
    }

    return COLORWAY_9009[group as keyof typeof COLORWAY_9009];
  }

  get materialOptions() {
    return {
      w: this.w,
      h: this.h,
      legend: this.legend,
      code: this.code,
      color: this.foregroundColor,
      background: this.backgroundColor,
      isIsoEnt: this.isIsoEnter,
    };
  }

  setup() {
    const geometryOptions = {
      row: this.row,
      w: this.w,
      h: this.h,
    };

    const geometry = this.isIsoEnter
      ? keyGeometryISOEnter()
      : keyGeometry(geometryOptions);

    const materials = keyMaterials(this.materialOptions);

    this.cap = new THREE.Mesh(geometry, materials);
    this.cap.name = this.code;
    this.cap.castShadow = false;
    this.cap.receiveShadow = false;
    this.cap.position.y = this.startY;
    this.cap.position.x = this.x;
    this.cap.position.z = this.y;

    this.options.container.add(this.cap);
  }

  destroy() {
    this.options.container.remove(this.cap);
  }

  move(dimensions: KeyDimensions) {
    this.options.dimensions = dimensions;
    this.cap.position.x = this.x;
    this.cap.position.z = this.y;
  }

  setState(state: number) {
    // If keyup event fires before key is finished animating down, queue the release
    if (this.state === KEYSTATES.MOVING_DOWN && state === KEYSTATES.MOVING_UP) {
      this.queueRelease = true;
    }

    if (
      (this.state === KEYSTATES.INITIAL &&
        (state === KEYSTATES.PRESSED || state === KEYSTATES.MOVING_UP)) ||
      (this.state === KEYSTATES.PRESSED &&
        (state === KEYSTATES.INITIAL || state === KEYSTATES.MOVING_DOWN))
    ) {
      return;
    }

    this.state = state;
  }

  reset() {
    this.cap.position.y = this.startY;
    this.setState(KEYSTATES.INITIAL);
    this.direction = -1;
  }

  bottomOut() {
    this.cap.position.y = this.startY - this.distPressed;
    this.setState(KEYSTATES.PRESSED);
    this.direction = 1;

    if (this.queueRelease) {
      this.setState(KEYSTATES.MOVING_UP);
      this.queueRelease = false;
    }
  }

  updateColors() {
    updateMaterials(this.cap, this.materialOptions);
  }

  update() {
    // Check if key needs to be updated
    if (this.state === KEYSTATES.INITIAL || this.state === KEYSTATES.PRESSED) {
      return;
    }

    // Animate key up or down
    this.cap.position.y =
      this.cap.position.y + this.pressVelocity * this.direction;

    // Key has reached max height
    if (this.cap.position.y >= this.startY) {
      this.reset();
    }

    // Key has bottomed out
    if (this.cap.position.y <= this.startY - this.distPressed) {
      this.bottomOut();
    }
  }
}
