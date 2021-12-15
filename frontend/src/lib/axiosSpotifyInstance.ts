import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "./getCookie";

const axiosSpotifyInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 10000,
  headers: {
    "Authorization": `Bearer ${getCookie("access_token")}`
  }
});

axiosSpotifyInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers?.Authorization === 'Bearer ') { // access token expired
    console.error("access_token expired")
  }
  return config
})

axiosSpotifyInstance.interceptors.response.use((response: AxiosResponse) => {
  if (response.status === 401) {
    window.location.href = "/api/v1/login"
  }

  console.log('response:', response.status)

  return response
})

export { axiosSpotifyInstance };
