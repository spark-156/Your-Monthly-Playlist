import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getCookie } from './getCookie'

const axiosSpotifyInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    Authorization: `Bearer ${getCookie('access_token')}`
  }
})

axiosSpotifyInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (!getCookie('access_token') && getCookie('has_refresh_token')) { // access token expired
    await axios.get('/api/v1/refresh')
    config.headers = { Authorization: `Bearer ${getCookie('access_token')}` }
  }
  if (!getCookie('has_refresh_token')) { // never logged in so go to login page
    window.location.href = '/'
  }
  if (config.headers?.Authorization === 'Bearer ') { // weird bug where bearer token does not get set properly
    config.headers = { Authorization: `Bearer ${getCookie('access_token')}` }
  }
  return config
})

axiosSpotifyInstance.interceptors.response.use(async (response: AxiosResponse) => {
  if (response.status === 401) {
    window.location.href = '/api/v1/login'
  }

  return response
}, async (error: AxiosError) => {
  console.log('error on axios', error)
  if (error.response?.status === 429) {
    if (error.response.headers['retry-after']) {
      // eslint-disable-next-line promise/param-names
      await new Promise(r => setTimeout(r, Number(error.response?.headers['retry-after']) * 1000))
    } else {
      // eslint-disable-next-line promise/param-names
      await new Promise(r => setTimeout(r, 2000))
    }
    return axiosSpotifyInstance.request(error.response.config)
  }
})

export { axiosSpotifyInstance }
