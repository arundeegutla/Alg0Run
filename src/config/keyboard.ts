// Map browser key codes to QMK key codes
export const KEY_CODE_MAP: Record<string, string> = {
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
export const CHERRY_LEGENDS: Record<string, string> = {
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

// GMK 9009 Colorway
export const COLORWAY_9009 = {
  base: { background: '#d8d2c3', color: '#171718' },
  mods: { background: '#aca693', color: '#171718' },
  accent: { background: '#c87e74', color: '#171718' },
  accent2: { background: '#768e72', color: '#171718' },
};

// 65% Keyboard Layout
export const LAYOUT_65 = {
  width: 16,
  height: 5,
  layout: [
    // Row 1 (row: 1)
    { x: 0, y: 0, w: 1, h: 1, row: 1 }, // Esc
    { x: 1, y: 0, w: 1, h: 1, row: 1 }, // 1
    { x: 2, y: 0, w: 1, h: 1, row: 1 }, // 2
    { x: 3, y: 0, w: 1, h: 1, row: 1 }, // 3
    { x: 4, y: 0, w: 1, h: 1, row: 1 }, // 4
    { x: 5, y: 0, w: 1, h: 1, row: 1 }, // 5
    { x: 6, y: 0, w: 1, h: 1, row: 1 }, // 6
    { x: 7, y: 0, w: 1, h: 1, row: 1 }, // 7
    { x: 8, y: 0, w: 1, h: 1, row: 1 }, // 8
    { x: 9, y: 0, w: 1, h: 1, row: 1 }, // 9
    { x: 10, y: 0, w: 1, h: 1, row: 1 }, // 0
    { x: 11, y: 0, w: 1, h: 1, row: 1 }, // -
    { x: 12, y: 0, w: 1, h: 1, row: 1 }, // =
    { x: 13, y: 0, w: 2, h: 1, row: 1 }, // Backspace
    { x: 15, y: 0, w: 1, h: 1, row: 1 }, // Home

    // Row 2 (row: 2)
    { x: 0, y: 1, w: 1.5, h: 1, row: 2 }, // Tab
    { x: 1.5, y: 1, w: 1, h: 1, row: 2 }, // Q
    { x: 2.5, y: 1, w: 1, h: 1, row: 2 }, // W
    { x: 3.5, y: 1, w: 1, h: 1, row: 2 }, // E
    { x: 4.5, y: 1, w: 1, h: 1, row: 2 }, // R
    { x: 5.5, y: 1, w: 1, h: 1, row: 2 }, // T
    { x: 6.5, y: 1, w: 1, h: 1, row: 2 }, // Y
    { x: 7.5, y: 1, w: 1, h: 1, row: 2 }, // U
    { x: 8.5, y: 1, w: 1, h: 1, row: 2 }, // I
    { x: 9.5, y: 1, w: 1, h: 1, row: 2 }, // O
    { x: 10.5, y: 1, w: 1, h: 1, row: 2 }, // P
    { x: 11.5, y: 1, w: 1, h: 1, row: 2 }, // [
    { x: 12.5, y: 1, w: 1, h: 1, row: 2 }, // ]
    { x: 13.5, y: 1, w: 1.5, h: 1, row: 2 }, // \
    { x: 15, y: 1, w: 1, h: 1, row: 2 }, // PgUp

    // Row 3 (row: 3)
    { x: 0, y: 2, w: 1.75, h: 1, row: 3 }, // Caps
    { x: 1.75, y: 2, w: 1, h: 1, row: 3 }, // A
    { x: 2.75, y: 2, w: 1, h: 1, row: 3 }, // S
    { x: 3.75, y: 2, w: 1, h: 1, row: 3 }, // D
    { x: 4.75, y: 2, w: 1, h: 1, row: 3 }, // F
    { x: 5.75, y: 2, w: 1, h: 1, row: 3 }, // G
    { x: 6.75, y: 2, w: 1, h: 1, row: 3 }, // H
    { x: 7.75, y: 2, w: 1, h: 1, row: 3 }, // J
    { x: 8.75, y: 2, w: 1, h: 1, row: 3 }, // K
    { x: 9.75, y: 2, w: 1, h: 1, row: 3 }, // L
    { x: 10.75, y: 2, w: 1, h: 1, row: 3 }, // ;
    { x: 11.75, y: 2, w: 1, h: 1, row: 3 }, // '
    { x: 12.75, y: 2, w: 2.25, h: 1, row: 3 }, // Enter
    { x: 15, y: 2, w: 1, h: 1, row: 3 }, // PgDn

    // Row 4 (row: 4)
    { x: 0, y: 3, w: 2.25, h: 1, row: 4 }, // LShift
    { x: 2.25, y: 3, w: 1, h: 1, row: 4 }, // Z
    { x: 3.25, y: 3, w: 1, h: 1, row: 4 }, // X
    { x: 4.25, y: 3, w: 1, h: 1, row: 4 }, // C
    { x: 5.25, y: 3, w: 1, h: 1, row: 4 }, // V
    { x: 6.25, y: 3, w: 1, h: 1, row: 4 }, // B
    { x: 7.25, y: 3, w: 1, h: 1, row: 4 }, // N
    { x: 8.25, y: 3, w: 1, h: 1, row: 4 }, // M
    { x: 9.25, y: 3, w: 1, h: 1, row: 4 }, // ,
    { x: 10.25, y: 3, w: 1, h: 1, row: 4 }, // .
    { x: 11.25, y: 3, w: 1, h: 1, row: 4 }, // /
    { x: 12.25, y: 3, w: 1.75, h: 1, row: 4 }, // RShift
    { x: 14, y: 3, w: 1, h: 1, row: 4 }, // Up
    { x: 15, y: 3, w: 1, h: 1, row: 4 }, // End

    // Row 5 (row: 4)
    { x: 0, y: 4, w: 1.25, h: 1, row: 4 }, // LCtrl
    { x: 1.25, y: 4, w: 1.25, h: 1, row: 4 }, // LWin
    { x: 2.5, y: 4, w: 1.25, h: 1, row: 4 }, // LAlt
    { x: 3.75, y: 4, w: 6.25, h: 1, row: 4 }, // Space
    { x: 10, y: 4, w: 1.25, h: 1, row: 4 }, // RAlt
    { x: 11.25, y: 4, w: 1.25, h: 1, row: 4 }, // Fn
    { x: 13, y: 4, w: 1, h: 1, row: 4 }, // Left
    { x: 14, y: 4, w: 1, h: 1, row: 4 }, // Down
    { x: 15, y: 4, w: 1, h: 1, row: 4 }, // Right
  ],
};

// Keymap (QMK codes in layout order)
export const KEYMAP_65 = [
  'KC_ESC',
  'KC_1',
  'KC_2',
  'KC_3',
  'KC_4',
  'KC_5',
  'KC_6',
  'KC_7',
  'KC_8',
  'KC_9',
  'KC_0',
  'KC_MINS',
  'KC_EQL',
  'KC_BSPC',
  'KC_HOME',
  'KC_TAB',
  'KC_Q',
  'KC_W',
  'KC_E',
  'KC_R',
  'KC_T',
  'KC_Y',
  'KC_U',
  'KC_I',
  'KC_O',
  'KC_P',
  'KC_LBRC',
  'KC_RBRC',
  'KC_BSLS',
  'KC_PGUP',
  'KC_CAPS',
  'KC_A',
  'KC_S',
  'KC_D',
  'KC_F',
  'KC_G',
  'KC_H',
  'KC_J',
  'KC_K',
  'KC_L',
  'KC_SCLN',
  'KC_QUOT',
  'KC_ENT',
  'KC_PGDN',
  'KC_LSFT',
  'KC_Z',
  'KC_X',
  'KC_C',
  'KC_V',
  'KC_B',
  'KC_N',
  'KC_M',
  'KC_COMM',
  'KC_DOT',
  'KC_SLSH',
  'KC_RSFT',
  'KC_UP',
  'KC_END',
  'KC_LCTL',
  'KC_LGUI',
  'KC_LALT',
  'KC_SPC',
  'KC_RALT',
  'MO(1)',
  'KC_LEFT',
  'KC_DOWN',
  'KC_RGHT',
];

// Modifier keys (for colorway)
export const MOD_KEYS = [
  'KC_ESC',
  'KC_TAB',
  'KC_CAPS',
  'KC_LSFT',
  'KC_RSFT',
  'KC_LCTL',
  'KC_LGUI',
  'KC_LALT',
  'KC_RALT',
  'MO(1)',
  'KC_BSPC',
  'KC_BSLS',
  'KC_HOME',
  'KC_PGUP',
  'KC_PGDN',
  'KC_END',
  'KC_UP',
  'KC_DOWN',
  'KC_LEFT',
  'KC_RGHT',
];

export const isAlpha = (code: string) => {
  return /^KC_[A-Z]$/.test(code);
};

export const isMod = (code: string) => {
  return MOD_KEYS.includes(code);
};
