import * as algo from "../services/algo";
import * as leaderboard from "../services/leaderboard";

import { Play } from "../util/models";

export async function getUserLeaderboard() {
  return {
    results: await leaderboard.getUsers(),
    error: ""
  }
}

export async function getAlgoLeaderboard(algoId: string) {
  if ((await algo.getAlgo(algoId)) === undefined) {
    return {
      error: "Algo doesn't exist"
    }
  }

  const topScores = new Map<string,Play>();

  const plays = await leaderboard.getAlgo(algoId);

  plays.forEach(p => {
    if (!topScores.has(p.profileId) || (topScores.get(p.profileId)?.playDetails.score || 0) < p.playDetails.score) {
      topScores.set(p.profileId, p);
    }
  });

  return {
    results: Array.from(plays.values()),
    error: ""
  }
}