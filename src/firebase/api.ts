import axios from 'axios';
import { PlayDetails } from './models';

export const http = axios.create({
  baseURL: '/api',
  headers: {
    'Content-type': 'application/json',
  },
});

class ApiService {
  async getAllAlgos() {
    return await http.post('/algo/all');
  }

  async getAlgo(algoId: string) {
    return await http.post('/algo/get', { algoId: algoId });
  }

  async createPlay(
    algoId: string,
    profileId: string,
    playDetails: PlayDetails
  ) {
    return http.post('/algo/createPlay', {
      algoId: algoId,
      profileId: profileId,
      playDetails: playDetails,
    });
  }

  async algoLeaderboard(algoId: string) {
    return http.post('/leaderboard/algo', { algoId: algoId });
  }

  async userLeaderboard() {
    return http.post('/leaderboard/users');
  }

  async createProfile(idToken: string, username: string, photoURL: string) {
    return http.post('/profile/create', {
      idToken: idToken,
      username: username,
      photoURL: photoURL,
    });
  }

  async getProfile(profileId: string) {
    return http.post('/profile/get', { profileId: profileId });
  }

  async getProfileByToken(idToken: string) {
    return http.post('/profile/getByToken', { idToken: idToken });
  }

  async isFirstTime(idToken: string) {
    return http.post('/profile/isFirstTime', { idToken: idToken });
  }

  async addFriend(profileId: string, friendId: string) {
    return http.post('/profile/addFriend', {
      profileId: profileId,
      friendId: friendId,
    });
  }

  async removeFriend(profileId: string, friendId: string) {
    return http.post('/profile/removeFriend', {
      profileId: profileId,
      friendId: friendId,
    });
  }
}

const newAPI = new ApiService();
export default newAPI;
