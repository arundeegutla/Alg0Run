import COLORWAYS from '../config/colorways/colorways';
import settings from '../config/settings_user_default.json';

const starting_layout_options = ['65'];

let randomItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getInitialState = () => {
  let initial = settings;
  initial.colorways.active = randomItem(Object.keys(COLORWAYS));
  initial.case.layout = randomItem(starting_layout_options);

  return initial;
};

export const initial_settings = getInitialState();
