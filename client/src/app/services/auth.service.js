import axios from "axios";
import localStorageService from "./localStorage.service";
// import localStorageService from "./localStorage.service";
import configFile from "../config.json";

export const httpAuth = axios.create({
  baseURL: configFile.apiEndPoint + "auth/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});

const authService = {
  registration: async (payload) => {
    const { data } = await httpAuth.post(`signUp`, payload);
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post(`signInWithPassword`, {
      email,
      password,
      returnSecureToken: true
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken()
    });
    return data;
  }
};
export default authService;
