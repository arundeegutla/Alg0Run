import { get_qs_values } from './qs';
import { loadState } from './localStorage';
import { subOptions } from '../config/legends/subs/subs';
import COLORWAYS from '../config/colorways/colorways';
import settings from '../config/settings_user_default.json';

const starting_colorway_options = [
  'cafe',
  'mecha',
  'lunar',
  'jamon',
  'bento',
  'olivia',
  'striker',
  'bushido',
  'oblivion',
  'nautilus',
  'vilebloom',
  'handarbeit',
  'hammerhead',
  'modern_dolch',
  'blue_samurai',
  'red_samurai',
];

const starting_layout_options = ['60iso', '65'];

let randomItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getInitialState = () => {
  let initial = settings;
  initial.colorways.active = randomItem(starting_colorway_options);
  initial.case.layout = randomItem(starting_layout_options);
  initial.keys.legendSecondaryStyle = randomItem([randomItem(subOptions), '']);

  return initial;
};

export const initial_settings = getInitialState();
