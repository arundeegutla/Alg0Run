import * as algo from "../services/algo";
import * as user from "../services/user";

import { PlayDetails, LANGUAGE_MULTIPLIER } from "../util/models";

export async function getAlgo(algoId: string) {
  const a = await algo.getAlgo(algoId);
  
  if (a === undefined) {
    return {
      error: "Algo doesn't exist"
    }
  }

  return {
    algo: a,
    error: ""
  };
}

export async function getAllAlgos() {
  return {
    algo: await algo.getAllAlgos(),
    error: ""
  };
}

export async function createPlay(algoId: string, profileId: string, playDetails: PlayDetails) {
  if (!(await algo.getAlgo(algoId))) {
    return {
      error: "Algo does not exist"
    }
  }

  let tmp = await user.getProfile(profileId);
  if (!tmp) {
    return {
      error: "Profile does not exist"
    }
  }
  
  const plays = await user.getPlays(profileId);
  
  const score = (LANGUAGE_MULTIPLIER.get(playDetails.language) || 0) * playDetails.code_length * playDetails.accuracy * playDetails.wpm / playDetails.time;
  playDetails.score = score;

  const playId = await algo.createPlay(algoId, profileId, tmp.username, playDetails);

  if (playId === undefined) {
    return {
      error: "Failed to create play"
    }
  }

  const currentAlgoScores = plays.filter(p => p.algoId === algoId).map(p => p.playDetails.score);
  const highestCurrentScore = Math.max(...currentAlgoScores, 0);

  if (score > highestCurrentScore) {
    const newTotalScore = tmp.totalScore - highestCurrentScore + score;
    await user.setScore(profileId, newTotalScore);
  }

  return {
    playId: playId,
    error: ""
  }
}