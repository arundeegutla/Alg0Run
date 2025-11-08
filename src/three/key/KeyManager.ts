import * as THREE from 'three';
import { Key, KEYSTATES } from './Key';
import { KEY_CODE_MAP, LAYOUT_65, KEYMAP_65 } from '@/src/config/keyboard';

export default class KeyManager {
  scene: THREE.Scene;
  group: THREE.Group;
  height: number;
  angle: number;
  keys: Key[];
  layout: typeof LAYOUT_65;
  keymap: typeof KEYMAP_65;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = 'KEYS';
    this.height = 1.1;
    this.angle = 6;
    this.keys = [];
    this.layout = LAYOUT_65;
    this.keymap = KEYMAP_65;
    this.setup();
  }

  get width() {
    return this.layout.width;
  }

  get depth() {
    return this.layout.height;
  }

  get angleOffset() {
    return Math.sin((this.angle * Math.PI) / 180) * this.depth;
  }

  setup() {
    this.createKeys();
    this.bindPressedEvents();
    this.position();
    this.scene.add(this.group);
  }

  position() {
    this.group.rotation.x = (this.angle * Math.PI) / 180;
    this.group.position.x = -this.layout.width / 2;
    this.group.position.y = this.angleOffset + this.height;
  }

  bindPressedEvents() {
    document.addEventListener('keydown', (e) => {
      const browserCode = e.code;
      const qmkCode = KEY_CODE_MAP[browserCode];
      if (!qmkCode) return;

      const key = this.getKey(qmkCode);
      if (!key) return;

      key.setState(KEYSTATES.MOVING_DOWN);
    });

    document.addEventListener('keyup', (e) => {
      const browserCode = e.code;
      const qmkCode = KEY_CODE_MAP[browserCode];
      if (!qmkCode) return;

      const key = this.getKey(qmkCode);
      if (!key) return;

      key.setState(KEYSTATES.MOVING_UP);
    });
  }

  createKeys() {
    // Clear existing keys
    this.keys.forEach((key) => key.destroy());
    this.keys = [];

    // Create new keys
    for (let i = 0; i < this.layout.layout.length; i++) {
      const code = this.keymap[i];
      const dimensions = this.layout.layout[i];

      const key = new Key({
        dimensions,
        container: this.group,
        isIso: false,
        code,
      });

      this.keys.push(key);
    }
  }

  getKey(code: string): Key | undefined {
    return this.keys.find((k) => k.code === code);
  }

  update() {
    this.keys.forEach((key) => key.update());
  }
}
