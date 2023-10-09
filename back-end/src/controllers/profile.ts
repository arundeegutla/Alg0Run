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
  if (!res.result) {
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

  const plays = await user.getPlays(profile.id);

  return {
    profile: profile,
    plays: plays,
    error: ""
  }
}

export async function getProfile(profileId: string) {
  const p = await user.getProfile(profileId);

  if (p === undefined) {
    return {
      error: "Profile with this ID does not exist."
    }
  }

  const plays = await user.getPlays(profileId);

  return {
    profile: p,
    plays: plays,
    error: ""
  }
}

export async function addFriend(profileId: string, friendId: string) {
  if (!user.getProfile(profileId)) {
    return {
      error: "Profile does not exist"
    }
  }

  if (!user.getProfile(friendId)) {
    return {
      error: "Friend does not exist"
    }
  }

  const res = user.addFriend(profileId, friendId);

  if (res === undefined) {
    return {
      error: "Failed to remove friend"
    }
  }

  return {
    error: ""
  }
}

export async function removeFriend(profileId: string, friendId: string) {
  if (!user.getProfile(profileId)) {
    return {
      error: "Profile does not exist"
    }
  }

  if (!user.getProfile(friendId)) {
    return {
      error: "Friend does not exist"
    }
  }

  const res = user.removeFriend(profileId, friendId);

  if (res === undefined) {
    return {
      error: "Failed to add friend"
    }
  }

  return {
    error: ""
  }
}