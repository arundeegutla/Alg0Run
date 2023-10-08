import axios from "axios";
import { PlayDetails } from "./models";

export const http = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});

class ApiService {
  async getAllAlgos() {
    return await http.post("/algo/all");
  }

  async getAlgo(algoId: string) {
    return await http.post("/algo/get", { algoId: algoId });
  }

  async createPlay(algoId: string, profileId: string, playDetails: PlayDetails) {
    return http.post("/algo/createPlay", { algoId: algoId, profileId: profileId, playDetails: playDetails });
  }
  
  async algoLeaderboard(algoId: string) {
    return http.post("/api/leaderboard/algo", { algoId: algoId });
  }
  
  async userLeaderboard() {
    return http.post("/api/leaderboard/users");
  }
  
  async createProfile(idToken: string, username: string) {
    return http.post("/api/profile/create", { idToken: idToken, username: username });
  }
  
  async getProfile(profileId: string) {
    return http.post("/api/profile/get", { profileId: profileId });
  }
  
  async getProfileByToken(idToken: string) {
    return http.post("/api/profile/getByToken", { idToken: idToken });
  }
  
  async isFirstTime(idToken: string) {
    return http.post("/api/profile/isFirstTime", { idToken: idToken });
  }
  
  async addFriend(profileId: string, friendId: string) {
    return http.post("/api/profile/addFriend", { profileId: profileId, friendId: friendId });
  }

  async removeFriend(profileId: string, friendId: string) {
    return http.post("/api/profile/removeFriend", { profileId: profileId, friendId: friendId });
  }
}

export default new ApiService();