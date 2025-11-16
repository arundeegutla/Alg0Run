import defaultSettings from './settings_user_default.json';

export interface KeyboardSettings {
  settings: {
    mute: boolean;
    debug: boolean;
    testing: boolean;
    mode: string;
    sceneAutoColor: boolean;
    sceneColor: string;
    glowColor: string;
    highContrast: boolean;
    paintWithKeys: boolean;
  };
  case: {
    autoColor: boolean;
    primaryColor: string;
    colorSecondary: string;
    style: string;
    bezel: number;
    layout: string;
    profile: string;
    material: string;
  };
  keys: {
    visible: boolean;
    profile: string;
    legendPrimaryStyle: string;
    legendSecondaryStyle: string;
    activeBackground: string;
    activeColor: string;
  };
  switches: {
    stemColor: string;
    bodyColor: string;
    soundProfile: string;
  };
  colorways: {
    editing: boolean;
    activeSwatch: string;
    active: string;
    custom: unknown[];
  };
}

// Load default settings
export const loadDefaultSettings = (): KeyboardSettings => {
  return defaultSettings as KeyboardSettings;
};

// Load colorway by name
export const loadColorway = async (colorwayName: string) => {
  try {
    const colorway = await import(`./colorways/colorway_${colorwayName}.json`);
    return colorway.default;
  } catch (error) {
    console.error(`Failed to load colorway: ${colorwayName}`, error);
    // Fallback to a default colorway structure
    return {
      id: colorwayName,
      label: colorwayName,
      manufacturer: '',
      swatches: {
        base: { background: '#d8d2c3', color: '#171718' },
        mods: { background: '#aca693', color: '#171718' },
        accent: { background: '#c87e74', color: '#171718' },
        accent2: { background: '#768e72', color: '#171718' },
      },
      override: {},
    };
  }
};

export const getSettings = loadDefaultSettings;
