import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "./getCookie";

const axiosSpotifyInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 10000,
  headers: {
    "Authorization": `Bearer ${getCookie("access_token")}`
  }
});

axiosSpotifyInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (!getCookie("access_token")) { // access token expired
    window.location.href = '/api/v1/refresh'
  } 
  return config
})

axiosSpotifyInstance.interceptors.response.use((response: AxiosResponse) => {
  if (response.status === 401) {
    window.location.href = "/api/v1/login"
  } else if (response.status === 307) {
      console.log("redirecting")
  }

  return response
})

export { axiosSpotifyInstance };
