import { z } from 'zod';

export const LanguageSchema = z.enum(['python', 'cpp', 'java']);
export type Language = z.infer<typeof LanguageSchema>;

export const ProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  username: z.string(),
  photoURL: z.string(),
  totalScore: z.number(),
  friends: z.array(z.string()),
});
export type Profile = z.infer<typeof ProfileSchema>;

export const ProfileBasicSchema = z.object({
  id: z.string(),
  username: z.string(),
  photoURL: z.string(),
  totalScore: z.number(),
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
