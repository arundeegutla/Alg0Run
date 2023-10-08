import { Request, Response } from "express";

export type Language = "python" | "cpp" | "java";

export type Profile = {
  id: string
  userId: string,
  username: string,
  totalScore: number,
  friends: string[]
}

export type ProfileBasic = {
  id: string,
  username: string,
  totalScore: number,
}

export type Algo = {
  name: string
  code: {
    python: string,
    java: string,
    cpp: string
  }
  time_complexity: string,
  description: string,
  usage: string
}

export type Play = {
  algoId: string,
  profileId: string,
  username: string,
  playDetails: PlayDetails
}

export type PlayBasic = {
  profileId: string,
  username: string,
  playDetails: PlayDetails
}

export type PlayDetails = {
  score: number,
  language: Language,
  code_length: number,
  accuracy: number,
  wpm: number,
  time: number,
  date_completed: EpochTimeStamp
}

export const LANGUAGE_MULTIPLIER = new Map<Language, number>([
  ["python", 0.8],
  ["java", 1],
  ["cpp", 1.3]
]);

export function routeWrapper(f: Function) {
  return async (req: Request, res: Response) => {
    res.send(await f(req.body));
  }
}