import * as THREE from 'three';
import Util from '../../util/math';
import KeyUtil from '../../util/keyboard';
import ColorUtil from '../../util/color';
import KEYMAPS from '../../config/keymaps/keymaps';
import LAYOUTS from '../../config/layouts/layouts';
import { subscribe } from 'redux-subscriber';
import { Key, KEYSTATES } from './Key';
import Collection from '../collection';

export default class KeyManager extends Collection {
  constructor(scene, settings, colorway) {
    super({ scene });
    this.settings = settings;
    this.colorway = colorway;
    this.height = 1.1;
    this.angle = 6;
    this.setup();
  }

  setup() {
    this.group = new THREE.Object3D();
    this.group.name = 'KEYS';
    this.editing = false;
    this.paintWithKeys = false;
    this.unsubscribers = [];
    this.getLayout();
    this.getKeymap();
    this.createKeys();
    this.bindPressedEvents();
    this.bindPaintEvent();
    this.position();
    this.scene.add(this.group);

    this.unsubscribers.push(subscribe('case.layout', (state) => {
      this.getLayout(state.case.layout);
      this.getKeymap(state.case.layout);
      this.createKeys();
      this.position();
    }));
    this.unsubscribers.push(subscribe('colorways.editing', (state) => {
      this.editing = state.colorways.editing;
    }));
    this.unsubscribers.push(subscribe('settings.paintWithKeys', (state) => {
      this.paintWithKeys = state.settings.paintWithKeys;
    }));
  }

  get width() {
    return this.layoutFull.width;
  }
  get depth() {
    return this.layoutFull.height;
  }
  get angleOffset() {
    return Math.sin(Util.toRad(this.angle)) * this.depth;
  }

  position() {
    this.group.rotation.x = Util.toRad(this.angle);
    this.group.position.x = -this.layoutFull.width / 2;
    this.group.position.y = this.angleOffset + this.height;
  }

  getKeymap(id = this.settings.case.layout) {
    this.keymap = KEYMAPS[id].layers[0];
  }

  getLayout(id = this.settings.case.layout) {
    this.layoutFull = LAYOUTS[id];
    this.layout = LAYOUTS[id].layouts['LAYOUT'].layout;
  }

  bindPressedEvents() {
    this.onKeyDown = (e) => {
      let code = KeyUtil.getKeyCode(e.code);
      let key = this.getKey(code);
      if (!key) return;
      if (this.editing && this.paintWithKeys) {
        this.paintKey(code);
      }
      key.setState(KEYSTATES.MOVING_DOWN);
    };
    this.onKeyUp = (e) => {
      let code = KeyUtil.getKeyCode(e.code);
      let key = this.getKey(code);
      if (!key) return;
      key.setState(KEYSTATES.MOVING_UP);
    };

    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  bindPaintEvent() {
    this.onKeyPainted = (e) => {
      this.paintKey(e.detail);
    };
    document.addEventListener('key_painted', this.onKeyPainted);
  }

  paintKey(code) {
    ColorUtil.addCodeToOverride(code);
    this.getKey(code).updateColors();
  }

  removeKey(key) {
    key.destroy();
    this.remove(key);
  }

  removeAllOldKeys() {
    this.components = this.components.filter((x) => {
      let keep = this.keymap.includes(x.code);
      if (!keep) x.destroy();
      return keep;
    });
  }

  createKeys() {
    let seen = []; //for boards with multiple keys of same code
    this.removeAllOldKeys();
    for (let i = 0; i < this.layout.length; i++) {
      let code = this.keymap[i];
      let dimensions = this.layout[i];
      dimensions.row = KeyUtil.getKeyProfile(
        i,
        this.layout,
        this.layoutFull.height
      );
      let existingKey = this.getKey(code);
      if (existingKey && !seen.includes(code)) {
        if (this.matchesSize(existingKey, dimensions)) {
          existingKey.move(dimensions);
          seen.push(code);
          continue;
        }
        this.removeKey(existingKey);
      }
      let K = new Key({
        dimensions: dimensions,
        container: this.group,
        isIso: this.layoutFull?.is_iso,
        colorway: this.colorway,
        code: code,
      });
      this.add(K);
      seen.push(code);
    }
  }

  getKey(code) {
    let k = this.components.find((x) => x.code === code);
    return k;
  }

  matchesSize(k, dimensions) {
    let hmatch = (k.options.dimensions?.h || 1) === (dimensions?.h || 1);
    let wmatch = (k.options.dimensions?.w || 1) === (dimensions?.w || 1);
    return hmatch && wmatch;
  }

  dispose() {
    this.scene.remove(this.group);
    
    if (this.onKeyDown) document.removeEventListener('keydown', this.onKeyDown);
    if (this.onKeyUp) document.removeEventListener('keyup', this.onKeyUp);
    if (this.onKeyPainted) document.removeEventListener('key_painted', this.onKeyPainted);
    
    if (this.unsubscribers) {
      this.unsubscribers.forEach(unsub => unsub());
    }

    if (this.components) {
        this.components.forEach(key => {
            if (key.destroy) key.destroy();
        });
    }
    this.components = [];
  }
}
