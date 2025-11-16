import { get_qs_values } from './qs';
import { loadState } from './localStorage';
import { subOptions } from '../config/legends/subs/subs';
import COLORWAYS from '../config/colorways/colorways';
import settings from '../config/settings_user_default.json';

// const starting_colorway_options = [
//   'cafe',
//   'mecha',
//   'lunar',
//   'jamon',
//   'bento',
//   'olivia',
//   'striker',
//   'nautilus',
//   'vilebloom',
//   'hammerhead',
//   'modern_dolch',
//   'blue_samurai',
//   'red_samurai',
//   '9009',
// ];

/*
  40: layout_40,
  60: layout_60,
  65: layout_65,
  75: layout_75,
  80: layout_80,
  95: layout_95,
  100: layout_100,
  '60iso': layout_60_iso,
  '60wkl': layout_60_wkl,
  '60hhkb': layout_60_hhkb,
  '60tsangan': layout_60_tsangan,
  numpad: layout_numpad,
  '40ortho': layout_40_ortho,
  '50ortho': layout_50_ortho,
  leftnum: layout_40_leftnum,
*/
const starting_layout_options = [
  // '40',
  // '60',
  '65',
  // '75',
  // '80',
  // '100',
  // '60iso',
  // 'numpad',
  // '50ortho',
  // 'leftnum',
  // '95',
  // '60wkl',
  // '60hhkb',
  // '60tsangan',
];

const randomItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getInitialState = () => {
  const qs = get_qs_values();
  const saved_colorways = loadState();
  const initial = settings;
  if (saved_colorways) {
    initial.colorways.custom = saved_colorways.settings;
  }

  //set random initial values
  if (!qs) {
    initial.colorways.active = randomItem(Object.keys(COLORWAYS));
    //
    initial.case.layout = randomItem(starting_layout_options);
    initial.keys.legendSecondaryStyle = randomItem([
      randomItem(subOptions),
      '',
    ]);
  }

  if (saved_colorways && saved_colorways.active) {
    initial.colorways.active = saved_colorways.active;
  }

  if (qs && qs['debug']) {
    initial.settings.debug = true;
  }
  //set initial values if in query string
  if (qs && qs['size']) {
    initial.case.layout = qs['size'];
  }
  if (qs && qs['colorway']) {
    if (typeof qs['colorway'] === 'object') {
      if (!initial.colorways.custom.find((x) => x.id === qs['colorway'].id)) {
        initial.colorways.custom.push(qs['colorway']);
      }
      initial.colorways.active = qs['colorway'].id;
    } else {
      initial.colorways.active = qs['colorway'];
    }
  }
  if (qs && qs['legend']) {
    initial.keys.legendPrimaryStyle = qs['legend'];
  }
  if (qs && qs['sub']) {
    initial.keys.legendSecondaryStyle = qs['sub'];
  }
  if (qs && qs['cc']) {
    initial.case.primaryColor = `#${qs['cc']}`;
    initial.case.autoColor = false;
  }
  if (qs && qs['cf']) {
    initial.case.material = qs['cf'];
  }

  let accent = '';
  if (qs && typeof qs['colorway'] === 'object') {
    accent = qs['colorway'].swatches.accent.background;
  } else {
    accent =
      COLORWAYS[initial?.colorways?.active]?.swatches?.accent?.background;
  }
  initial.settings.sceneColor = accent;
  return initial;
};

export const initial_settings = getInitialState();
