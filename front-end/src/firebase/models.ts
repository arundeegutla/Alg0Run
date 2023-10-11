export type Language = "python" | "cpp" | "java";

export type Profile = {
  id: string
  userId: string,
  username: string,
  photoURL: string,
  totalScore: number,
  friends: string[]
}

export type ProfileBasic = {
  id: string,
  username: string,
  photoURL: string,
  totalScore: number,
}

export type Algo = {
  id: string,
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
  date_completed: number
}