import { createSlice } from '@reduxjs/toolkit';
import { getSettings } from '../../config/settings';

export const switchesSlice = createSlice({
  name: 'switches',
  initialState: getSettings().switches,
  reducers: {
    setBodyColor: (state, action) => {
      state.bodyColor = action.payload;
    },
    setStemColor: (state, action) => {
      state.stemColor = action.payload;
    },
    setSoundProfile: (state, action) => {
      state.soundProfile = action.payload;
    },
  },
});

export const { setBodyColor, setStemColor, setSoundProfile } =
  switchesSlice.actions;

export const selectBodyColor = (state) => state.switches.bodyColor;
export const selectStemColor = (state) => state.switches.stemColor;
export const selectSoundProfile = (state) => state.switches.soundProfile;

export default switchesSlice.reducer;
