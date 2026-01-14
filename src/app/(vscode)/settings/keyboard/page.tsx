'use client';

import { useState, useRef, useEffect } from 'react';
import Keyboard3D, { Keyboard3DHandle } from '@/components/Keyboard3D';
import {
  loadDefaultSettings,
  type KeyboardSettings,
} from '@/components/keyboardUtils/config/settings';
import { colorwayOptions } from '@/components/keyboardUtils/config/colorways/colorways';
import { layoutOptions } from '@/components/keyboardUtils/config/layouts/layouts';

// Transform colorway keys to display format
const colorwayDisplayOptions = colorwayOptions.map((id) => ({
  id,
  label: id
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '),
}));

// Transform layout keys to display format
const layoutDisplayOptions = layoutOptions.map((id) => ({
  id,
  label: id.includes('ortho')
    ? id.toUpperCase()
    : id === '60' || id === '65' || id === '75' || id === '80' || id === '95'
      ? `${id}%`
      : id === '100'
        ? 'Full Size'
        : id.toUpperCase(),
}));

const profileOptions = [
  { id: 'mx', label: 'Cherry MX' },
  { id: 'sa', label: 'SA Profile' },
  { id: 'dsa', label: 'DSA Profile' },
];

const materialOptions = [
  { id: 'matte', label: 'Matte' },
  { id: 'glossy', label: 'Glossy' },
  { id: 'metal', label: 'Metallic' },
];

export default function KeyboardSettingsPage() {
  const keyboardRef = useRef<Keyboard3DHandle>(null);
  const [settings, setSettings] = useState<KeyboardSettings>(() => {
    return {
      settings: {
        mute: true,
        debug: false,
        testing: false,
        mode: 'sidebar',
        sceneAutoColor: true,
        sceneColor: '#cccccc',
        glowColor: '#ffffff',
        highContrast: false,
        paintWithKeys: false,
      },
      case: {
        autoColor: true,
        primaryColor: '#eeeeee',
        colorSecondary: '#eeeeee',
        style: 'CASE_2',
        bezel: 12,
        layout: '65',
        profile: 'high',
        material: 'matte',
      },
      keys: {
        visible: true,
        profile: 'mx',
        legendPrimaryStyle: 'cherry',
        legendSecondaryStyle: '',
        activeBackground: '#51cf59',
        activeColor: '#ffffff',
      },
      switches: {
        stemColor: 'red',
        bodyColor: 'blue',
        soundProfile: 'default',
      },
      colorways: {
        editing: false,
        activeSwatch: 'accent',
        active: 'handarbeit',
        custom: [],
      },
    };
  });
  const [activeTab, setActiveTab] = useState<
    'appearance' | 'layout' | 'advanced'
  >('appearance');

  useEffect(() => {
    console.log('Current Settings:', settings);
  }, [settings]);

  const updateSettings = (updates: Partial<KeyboardSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const updateColorway = (colorwayId: string) => {
    updateSettings({
      colorways: {
        ...settings.colorways,
        active: colorwayId,
      },
    });
  };

  const updateCaseSetting = (key: string, value: string | number | boolean) => {
    updateSettings({
      case: {
        ...settings.case,
        [key]: value,
      },
    });
  };

  const updateKeysSetting = (key: string, value: string | boolean) => {
    updateSettings({
      keys: {
        ...settings.keys,
        [key]: value,
      },
    });
  };

  const resetToDefaults = () => {
    setSettings(loadDefaultSettings());
  };

  return (
    <div className='flex flex-col h-screen w-full bg-[#1e1e1e] text-[#cccccc]'>
      {/* Header */}
      <div className='border-b border-[#3c3c3c] px-6 py-4'>
        <h1 className='text-2xl font-semibold text-white'>
          Keyboard Customization
        </h1>
        <p className='text-sm text-[#858585] mt-1'>
          Personalize your typing experience
        </p>
      </div>

      <div className='flex flex-1 overflow-hidden'>
        {/* Left Panel - Settings */}
        <div className='w-96 border-r border-[#3c3c3c] flex flex-col'>
          {/* Tabs */}
          <div className='flex border-b border-[#3c3c3c]'>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'appearance'
                  ? 'bg-[#2d2d2d] text-white border-b-2 border-[#007acc]'
                  : 'text-[#858585] hover:text-white hover:bg-[#2a2a2a]'
              }`}
            >
              Appearance
            </button>
            <button
              onClick={() => setActiveTab('layout')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'layout'
                  ? 'bg-[#2d2d2d] text-white border-b-2 border-[#007acc]'
                  : 'text-[#858585] hover:text-white hover:bg-[#2a2a2a]'
              }`}
            >
              Layout
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'advanced'
                  ? 'bg-[#2d2d2d] text-white border-b-2 border-[#007acc]'
                  : 'text-[#858585] hover:text-white hover:bg-[#2a2a2a]'
              }`}
            >
              Advanced
            </button>
          </div>

          {/* Settings Content */}
          <div className='flex-1 overflow-y-auto p-6 space-y-6'>
            {activeTab === 'appearance' && (
              <>
                {/* Colorway Selection */}
                <div>
                  <label className='block text-sm font-medium text-white mb-3'>
                    Keycap Colorway
                  </label>
                  <div className='grid grid-cols-2 gap-2 max-h-96 overflow-y-auto'>
                    {colorwayDisplayOptions.map((colorway) => (
                      <button
                        key={colorway.id}
                        onClick={() => updateColorway(colorway.id)}
                        className={`px-3 py-2 text-xs rounded border transition-all ${
                          settings.colorways.active === colorway.id
                            ? 'bg-[#007acc] border-[#007acc] text-white'
                            : 'bg-[#2d2d2d] border-[#3c3c3c] text-[#cccccc] hover:border-[#007acc]'
                        }`}
                      >
                        {colorway.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Case Color */}
                <div>
                  <label className='block text-sm font-medium text-white mb-3'>
                    Case Color
                  </label>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <input
                        type='checkbox'
                        id='autoColor'
                        checked={settings.case.autoColor}
                        onChange={(e) =>
                          updateCaseSetting('autoColor', e.target.checked)
                        }
                        className='w-4 h-4 accent-[#007acc]'
                      />
                      <label
                        htmlFor='autoColor'
                        className='text-sm text-[#cccccc]'
                      >
                        Auto-match with keycaps
                      </label>
                    </div>
                    {!settings.case.autoColor && (
                      <div className='flex items-center gap-3'>
                        <input
                          type='color'
                          value={settings.case.primaryColor}
                          onChange={(e) =>
                            updateCaseSetting('primaryColor', e.target.value)
                          }
                          className='w-10 h-10 rounded border border-[#3c3c3c] bg-transparent cursor-pointer'
                        />
                        <span className='text-sm text-[#858585] font-mono'>
                          {settings.case.primaryColor}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Material */}
                <div>
                  <label className='block text-sm font-medium text-white mb-3'>
                    Case Material
                  </label>
                  <div className='grid grid-cols-3 gap-2'>
                    {materialOptions.map((material) => (
                      <button
                        key={material.id}
                        onClick={() =>
                          updateCaseSetting('material', material.id)
                        }
                        className={`px-3 py-2 text-xs rounded border transition-all ${
                          settings.case.material === material.id
                            ? 'bg-[#007acc] border-[#007acc] text-white'
                            : 'bg-[#2d2d2d] border-[#3c3c3c] text-[#cccccc] hover:border-[#007acc]'
                        }`}
                      >
                        {material.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key Profile */}
                <div>
                  <label className='block text-sm font-medium text-white mb-3'>
                    Keycap Profile
                  </label>
                  <div className='grid grid-cols-3 gap-2'>
                    {profileOptions.map((profile) => (
                      <button
                        key={profile.id}
                        onClick={() => updateKeysSetting('profile', profile.id)}
                        className={`px-3 py-2 text-xs rounded border transition-all ${
                          settings.keys.profile === profile.id
                            ? 'bg-[#007acc] border-[#007acc] text-white'
                            : 'bg-[#2d2d2d] border-[#3c3c3c] text-[#cccccc] hover:border-[#007acc]'
                        }`}
                      >
                        {profile.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'layout' && (
              <>
                {/* Keyboard Layout */}
                <div>
                  <label className='block text-sm font-medium text-white mb-3'>
                    Keyboard Layout
                  </label>
                  <div className='grid grid-cols-3 gap-2'>
                    {layoutDisplayOptions.map((layout) => (
                      <button
                        key={layout.id}
                        onClick={() => updateCaseSetting('layout', layout.id)}
                        className={`px-3 py-2 text-xs rounded border transition-all ${
                          settings.case.layout === layout.id
                            ? 'bg-[#007acc] border-[#007acc] text-white'
                            : 'bg-[#2d2d2d] border-[#3c3c3c] text-[#cccccc] hover:border-[#007acc]'
                        }`}
                      >
                        {layout.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Case Style */}
                <div>
                  <label className='block text-sm font-medium text-white mb-3'>
                    Case Style
                  </label>
                  <select
                    value={settings.case.style}
                    onChange={(e) => updateCaseSetting('style', e.target.value)}
                    className='w-full px-3 py-2 bg-[#2d2d2d] border border-[#3c3c3c] rounded text-sm text-[#cccccc] focus:outline-none focus:border-[#007acc]'
                  >
                    <option value='CASE_1'>Standard</option>
                    <option value='CASE_2'>High Profile</option>
                    <option value='CASE_3'>Low Profile</option>
                  </select>
                </div>

                {/* Bezel Size */}
                <div>
                  <label className='block text-sm font-medium text-white mb-3'>
                    Bezel Size: {settings.case.bezel}mm
                  </label>
                  <input
                    type='range'
                    min='0'
                    max='20'
                    value={settings.case.bezel}
                    onChange={(e) =>
                      updateCaseSetting('bezel', parseInt(e.target.value))
                    }
                    className='w-full accent-[#007acc]'
                  />
                </div>
              </>
            )}

            {activeTab === 'advanced' && (
              <>
                {/* Active Key Highlight */}
                <div>
                  <label className='block text-sm font-medium text-white mb-3'>
                    Active Key Highlight
                  </label>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <label className='text-xs text-[#858585] w-24'>
                        Background
                      </label>
                      <input
                        type='color'
                        value={settings.keys.activeBackground}
                        onChange={(e) =>
                          updateKeysSetting('activeBackground', e.target.value)
                        }
                        className='w-10 h-10 rounded border border-[#3c3c3c] bg-transparent cursor-pointer'
                      />
                      <span className='text-sm text-[#858585] font-mono'>
                        {settings.keys.activeBackground}
                      </span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <label className='text-xs text-[#858585] w-24'>
                        Text
                      </label>
                      <input
                        type='color'
                        value={settings.keys.activeColor}
                        onChange={(e) =>
                          updateKeysSetting('activeColor', e.target.value)
                        }
                        className='w-10 h-10 rounded border border-[#3c3c3c] bg-transparent cursor-pointer'
                      />
                      <span className='text-sm text-[#858585] font-mono'>
                        {settings.keys.activeColor}
                      </span>
                    </div>
                  </div>
                </div>

                {/* High Contrast Mode */}
                <div>
                  <label className='block text-sm font-medium text-white mb-3'>
                    Display Options
                  </label>
                  <div className='flex items-center gap-3'>
                    <input
                      type='checkbox'
                      id='highContrast'
                      checked={settings.settings.highContrast}
                      onChange={(e) =>
                        updateSettings({
                          settings: {
                            ...settings.settings,
                            highContrast: e.target.checked,
                          },
                        })
                      }
                      className='w-4 h-4 accent-[#007acc]'
                    />
                    <label
                      htmlFor='highContrast'
                      className='text-sm text-[#cccccc]'
                    >
                      High Contrast Mode
                    </label>
                  </div>
                </div>

                {/* Legend Styles */}
                <div>
                  <label className='block text-sm font-medium text-white mb-3'>
                    Legend Style
                  </label>
                  <select
                    value={settings.keys.legendPrimaryStyle}
                    onChange={(e) =>
                      updateKeysSetting('legendPrimaryStyle', e.target.value)
                    }
                    className='w-full px-3 py-2 bg-[#2d2d2d] border border-[#3c3c3c] rounded text-sm text-[#cccccc] focus:outline-none focus:border-[#007acc]'
                  >
                    <option value='cherry'>Cherry</option>
                    <option value='gmk'>GMK</option>
                    <option value='modern'>Modern</option>
                    <option value='retro'>Retro</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Footer Actions */}
          <div className='border-t border-[#3c3c3c] p-4 flex gap-3'>
            <button
              onClick={resetToDefaults}
              className='flex-1 px-4 py-2 bg-[#2d2d2d] border border-[#3c3c3c] rounded text-sm text-[#cccccc] hover:bg-[#3c3c3c] transition-colors'
            >
              Reset to Defaults
            </button>
            <button
              onClick={() => {
                // Save settings to localStorage or API
                localStorage.setItem(
                  'keyboardSettings',
                  JSON.stringify(settings)
                );
              }}
              className='flex-1 px-4 py-2 bg-[#007acc] rounded text-sm text-white hover:bg-[#005a9e] transition-colors'
            >
              Save Settings
            </button>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className='flex-1 flex flex-col bg-[#252526]'>
          <div className='border-b border-[#3c3c3c] px-6 py-3'>
            <h2 className='text-sm font-medium text-[#cccccc]'>Live Preview</h2>
          </div>
          <div className='flex-1 flex items-center justify-center '>
            <div className='w-full h-full'>
              <Keyboard3D
                ref={keyboardRef}
                cameraZoom={16}
                keyboardOptions={settings}
              />
            </div>
          </div>
          <div className='border-t border-[#3c3c3c] px-6 py-3 bg-[#1e1e1e]'>
            <p className='text-xs text-[#858585]'>
              💡 Tip: Click and drag to rotate the keyboard • Use the controls
              on the left to customize
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
