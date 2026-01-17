'use client';

import { useState, useRef, useEffect } from 'react';
import { trpc } from '@/server/trpc/client';
import Keyboard3D, { Keyboard3DHandle } from '@/components/Keyboard3D';
import Loading from '@/components/Loading';
import {
  getSettings,
  type KeyboardSettings,
} from '@/components/keyboardUtils/config/settings';
import COLORWAYS, {
  colorwayOptions,
} from '@/components/keyboardUtils/config/colorways/colorways';
import { layoutOptions } from '@/components/keyboardUtils/config/layouts/layouts';
import toast from 'react-hot-toast';

// Transform colorway keys to display format
const colorwayDisplayOptions = colorwayOptions.map((id) => {
  const colors = COLORWAYS[id as keyof typeof COLORWAYS];
  return {
    id,
    label: id
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    colors: [
      colors.swatches.base.background,
      colors.swatches.mods.background,
      colors.swatches.accent.background,
    ],
  };
});

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

const materialOptions = [
  { id: 'matte', label: 'Matte' },
  { id: 'glossy', label: 'Glossy' },
  { id: 'metal', label: 'Metallic' },
];

export default function KeyboardSettingsPage() {
  const keyboardRef = useRef<Keyboard3DHandle>(null);
  const [settings, setSettings] = useState<KeyboardSettings | null>(null);

  const { data: profileData } = trpc.profile.getProfile.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const updateKeyboardSettingsMutation =
    trpc.profile.updateKeyboardSettings.useMutation();

  const handleSaveSettings = () => {
    updateKeyboardSettingsMutation.mutate({
      keyboardSettings: settings!,
    });
    toast.success('Keyboard settings saved');
  };

  useEffect(() => {
    if (profileData?.profile.keyboardSettings) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSettings(profileData.profile.keyboardSettings);
    } else if (profileData?.profile) {
      setSettings(getSettings());
    }
  }, [profileData]);

  useEffect(() => {
    console.log('Current Settings:', settings);
  }, [settings]);

  const updateSettings = (updates: Partial<KeyboardSettings>) => {
    setSettings((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        ...updates,
      };
    });
  };

  const updateColorway = (colorwayId: string) => {
    if (!settings) return;
    updateSettings({
      colorways: {
        ...settings.colorways,
        active: colorwayId,
      },
    });
  };

  const updateCaseSetting = (key: string, value: string | number | boolean) => {
    if (!settings) return;
    updateSettings({
      case: {
        ...settings.case,
        [key]: value,
      },
    });
  };

  const resetToDefaults = () => {
    updateSettings(getSettings());
  };

  if (!settings) return <Loading />;

  return (
    <div className='flex flex-col h-screen w-full bg-[#1e1e1e] text-[#cccccc]'>
      {/* Header */}
      <div className='border-b border-[#3c3c3c] px-6 py-4'>
        <h1 className='text-2xl font-semibold text-white font-mono'>
          Keyboard Customization
        </h1>
      </div>

      <div className='flex flex-1 overflow-hidden'>
        {/* Left Panel - Settings */}
        <div className='w-96 border-r border-[#3c3c3c] flex flex-col'>
          {/* Settings Content */}
          <div className='flex-1 overflow-y-auto p-6 space-y-6'>
            {/* Colorway Selection */}
            <div>
              <label className='block text-xs font-medium text-[#cccccc] uppercase tracking-wider mb-3'>
                Keycap Colorway
              </label>
              <div className='grid grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2 custom-scrollbar'>
                {colorwayDisplayOptions.map((colorway) => (
                  <button
                    key={colorway.id}
                    onClick={() => updateColorway(colorway.id)}
                    className={`group relative h-14 rounded-lg overflow-hidden transition-all duration-200 ${
                      settings.colorways.active === colorway.id
                        ? 'ring-2 ring-[#007acc] ring-offset-2 ring-offset-[#1e1e1e] scale-[1.02]'
                        : 'hover:opacity-90'
                    }`}
                  >
                    <div
                      className='absolute inset-0'
                      style={{
                        background: `linear-gradient(135deg, ${colorway.colors[0]} 0%, ${colorway.colors[1]} 50%, ${colorway.colors[2]} 100%)`,
                      }}
                    />
                    <div className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors' />
                    <div className='absolute inset-x-0 bottom-0 p-2 bg-linear-to-t from-black/90 to-transparent'>
                      <span className='text-xs font-medium text-white [text-shadow:0_1px_2px_rgb(0_0_0/80%)] block truncate text-left pl-1'>
                        {colorway.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Case Color */}
            <div className='flex flex-row gap-6 w-full'>
              <div className='flex-1'>
                <label className='block text-xs font-medium text-[#cccccc] uppercase tracking-wider mb-3'>
                  Primary Color
                </label>
                <div className='flex items-center gap-3 bg-[#2d2d2d] p-2 rounded-lg border border-[#3c3c3c]'>
                  <div className='relative w-8 h-8 rounded-full shadow-inner overflow-hidden ring-1 ring-[#3c3c3c]'>
                    <input
                      type='color'
                      value={settings.case.primaryColor}
                      onChange={(e) =>
                        updateCaseSetting('primaryColor', e.target.value)
                      }
                      className='absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer p-0 border-0'
                    />
                  </div>
                  <span className='text-xs text-[#858585] font-mono uppercase'>
                    {settings.case.primaryColor}
                  </span>
                </div>
              </div>

              {/* Secondary Case Color */}
              <div className='flex-1'>
                <label className='block text-xs font-medium text-[#cccccc] uppercase tracking-wider mb-3'>
                  Secondary Color
                </label>
                <div className='flex items-center gap-3 bg-[#2d2d2d] p-2 rounded-lg border border-[#3c3c3c]'>
                  <div className='relative w-8 h-8 rounded-full shadow-inner overflow-hidden ring-1 ring-[#3c3c3c]'>
                    <input
                      type='color'
                      value={settings.case.colorSecondary}
                      onChange={(e) =>
                        updateCaseSetting('colorSecondary', e.target.value)
                      }
                      className='absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer p-0 border-0'
                    />
                  </div>
                  <span className='text-xs text-[#858585] font-mono uppercase'>
                    {settings.case.colorSecondary}
                  </span>
                </div>
              </div>
            </div>

            {/* Material */}
            <div>
              <label className='block text-xs font-medium text-[#cccccc] uppercase tracking-wider mb-3'>
                Case Material
              </label>
              <div className='bg-[#252526] p-1 rounded-lg border border-[#3c3c3c] flex gap-1'>
                {materialOptions.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => updateCaseSetting('material', material.id)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                      settings.case.material === material.id
                        ? 'bg-[#3c3c3c] text-white shadow-sm'
                        : 'text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d]'
                    }`}
                  >
                    {material.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyboard Layout */}
            <div>
              <label className='block text-xs font-medium text-[#cccccc] uppercase tracking-wider mb-3'>
                Keyboard Layout
              </label>
              <div className='grid grid-cols-4 gap-2'>
                {layoutDisplayOptions.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => updateCaseSetting('layout', layout.id)}
                    className={`px-2 py-2 text-xs font-medium rounded border transition-all duration-200 ${
                      settings.case.layout === layout.id
                        ? 'bg-[#007acc] border-[#007acc] text-white shadow-md'
                        : 'bg-[#2d2d2d] border-[#3c3c3c] text-[#cccccc] hover:border-[#505050]'
                    }`}
                  >
                    {layout.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Case Style */}
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-xs font-medium text-[#cccccc] uppercase tracking-wider mb-3'>
                  Case Style
                </label>
                <div className='relative'>
                  <select
                    value={settings.case.style}
                    onChange={(e) => updateCaseSetting('style', e.target.value)}
                    className='w-full appearance-none px-3 py-2 bg-[#2d2d2d] border border-[#3c3c3c] rounded text-sm text-[#cccccc] focus:outline-none focus:border-[#007acc] cursor-pointer'
                  >
                    <option value='CASE_1'>Standard</option>
                    <option value='CASE_2'>High Profile</option>
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#cccccc] text-xs'>
                    ▼
                  </div>
                </div>
              </div>

              {/* Bezel Size */}
              <div>
                <label className='block text-xs font-medium text-[#cccccc] uppercase tracking-wider mb-3'>
                  Bezel Size:{' '}
                  <span className='text-white'>{settings.case.bezel}mm</span>
                </label>
                <div className='h-[38px] flex items-center px-1'>
                  <input
                    type='range'
                    min='1'
                    max='10'
                    value={settings.case.bezel}
                    onChange={(e) =>
                      updateCaseSetting('bezel', parseInt(e.target.value))
                    }
                    className='w-full h-1.5 bg-[#3c3c3c] rounded-lg appearance-none cursor-pointer accent-[#007acc]'
                  />
                </div>
              </div>
            </div>
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
                handleSaveSettings();
              }}
              className='flex-1 px-4 py-2 bg-[#007acc] rounded text-sm text-white hover:bg-[#005a9e] transition-colors'
            >
              Save Settings
            </button>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className='flex-1 flex flex-col bg-[#252526]'>
          <div className='flex-1 flex items-center justify-center '>
            <div className='w-full h-full'>
              <Keyboard3D ref={keyboardRef} keyboardOptions={settings} />
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
