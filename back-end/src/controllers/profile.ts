import * as user from "../services/user";

export async function isFirstTimeUser(idToken: string) {
  const tokenResult = await user.verifyToken(idToken);
  
  if (tokenResult == undefined) {
    return { result: true };
  }
  
  const userId = tokenResult.uid;
  const profile = await user.getProfileByUserId(userId);

  if (profile === undefined) {
    return { result: true, userId: userId };
  }

  return { result: false };
}

export async function createProfile(idToken: string, username: string) {
  const res = await isFirstTimeUser(idToken);

  if (!res) {
    return {
      error: "Profile already exists for user"
    }
  }

  if (!res.userId) {
    return {
      error: "Invalid token"
    }
  }

  const profileId = user.createProfile(res.userId, username);

  if (profileId === undefined) {
    return {
      error: "Failed to create profile"
    }
  }

  return {
    profileId: profileId,
    error: ""
  }
}

export async function getProfileByToken(idToken: string) {
  const tokenResult = await user.verifyToken(idToken);
  
  if (tokenResult == undefined) {
    return {
      error: "Invalid token"
    }
  }
  
  const userId = tokenResult.uid;
  const profile = await user.getProfileByUserId(userId);

  if (profile === undefined) {
    return {
      error: "Profile does not exist for this user."
    }
  }

  profile.plays = await user.getPlays(profile.id);

  return {
    profile: profile,
    error: ""
  }
}

export async function getProfile(id: string) {
  const p = await user.getProfile(id);

  if (p === undefined) {
    return {
      error: "Profile with this ID does not exist."
    }
  }

  const plays = user.getPlays(id);

  return {
    profile: p,
    error: ""
  }
}