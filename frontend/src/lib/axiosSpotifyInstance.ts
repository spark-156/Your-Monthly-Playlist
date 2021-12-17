import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getCookie } from './getCookie'

const axiosSpotifyInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${getCookie('access_token')}`
  }
})

axiosSpotifyInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (!getCookie('access_token')) { // access token expired
    window.location.href = '/api/v1/refresh'
  }
  return config
})

axiosSpotifyInstance.interceptors.response.use(async (response: AxiosResponse) => {
  if (response.status === 401) {
    window.location.href = '/api/v1/login'
  } else if (response.status === 429) {
    console.log('rate limited please be patient for ' + response.headers['Retry-After'] + ' seconds.')
    // eslint-disable-next-line promise/param-names
    await new Promise(r => setTimeout(r, Number(response.headers['Retry-After'])))
    return axiosSpotifyInstance.request(response.config)
  }

  return response
})

export { axiosSpotifyInstance }
