import { z } from 'zod';

export const LanguageSchema = z.enum(['python', 'cpp', 'java']);
export type Language = z.infer<typeof LanguageSchema>;

export const KeyboardSettingsSchema = z.object({
  settings: z.object({
    mute: z.boolean(),
    debug: z.boolean(),
    testing: z.boolean(),
    mode: z.string(),
    sceneAutoColor: z.boolean(),
    sceneColor: z.string(),
    glowColor: z.string(),
    highContrast: z.boolean(),
    paintWithKeys: z.boolean(),
  }),
  case: z.object({
    autoColor: z.boolean(),
    primaryColor: z.string(),
    colorSecondary: z.string(),
    style: z.string(),
    bezel: z.number(),
    layout: z.string(),
    profile: z.string(),
    material: z.string(),
  }),
  keys: z.object({
    visible: z.boolean(),
    profile: z.string(),
    legendPrimaryStyle: z.string(),
    legendSecondaryStyle: z.string(),
    activeBackground: z.string(),
    activeColor: z.string(),
  }),
  switches: z.object({
    stemColor: z.string(),
    bodyColor: z.string(),
    soundProfile: z.string(),
  }),
  colorways: z.object({
    editing: z.boolean(),
    activeSwatch: z.string(),
    active: z.string(),
    custom: z.array(z.unknown()),
  }),
});
export type KeyboardSettings = z.infer<typeof KeyboardSettingsSchema>;

export const CodeForcesOAuthSessionSchema = z.object({
  code_verifier: z.string().optional(),
  state: z.string().optional(),
});
export type CodeForcesOAuthSession = z.infer<
  typeof CodeForcesOAuthSessionSchema
>;

export const ProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  username: z.string(),
  photoURL: z.string(),
  totalScore: z.number(),
  provider: z.enum(['google', 'codeforces']),
  keyboardSettings: KeyboardSettingsSchema.optional(),
});
export type Profile = z.infer<typeof ProfileSchema>;

export const ProfileBasicSchema = z.object({
  id: z.string(),
  username: z.string(),
  photoURL: z.string(),
  provider: z.enum(['google', 'codeforces']),
});
export type ProfileBasic = z.infer<typeof ProfileBasicSchema>;

export const AlgoSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  code: z.object({
    python: z.string().optional(),
    java: z.string().optional(),
    cpp: z.string().optional(),
  }),
  time_complexity: z.string().optional(),
  description: z.string().optional(),
  usage: z.string().optional(),
  category: z.string().optional(),
});
export type Algo = z.infer<typeof AlgoSchema>;

export const PlayDetailsSchema = z.object({
  score: z.number(),
  language: LanguageSchema,
  code_length: z.number(),
  accuracy: z.number(),
  wpm: z.number(),
  time: z.number(),
  date_completed: z.number(),
});
export type PlayDetails = z.infer<typeof PlayDetailsSchema>;

export const PlaySchema = z.object({
  algoId: z.string(),
  profileId: z.string(),
  username: z.string(),
  playDetails: PlayDetailsSchema,
});
export type Play = z.infer<typeof PlaySchema>;

export const PlayBasicSchema = z.object({
  profileId: z.string(),
  username: z.string(),
  playDetails: PlayDetailsSchema,
});
export type PlayBasic = z.infer<typeof PlayBasicSchema>;
