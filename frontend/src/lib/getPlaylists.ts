import axios from 'axios'
import { GetMePlaylists, Playlist } from '../types/getMePlaylists'
import { axiosSpotifyInstance } from './axiosSpotifyInstance'

export async function getPlaylists () {
  // get current users playlists
  let playlists: Playlist[] = []
  try {
    let response = await axiosSpotifyInstance.get<GetMePlaylists>('/me/playlists?limit=50')
    playlists = playlists.concat(response.data.items)
    while (response.data.next) {
      response = await axiosSpotifyInstance.get<GetMePlaylists>(response.data.next)
      playlists = playlists.concat(response.data.items)
    }
    return playlists
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      console.log('axiosError')
      console.log(err.response?.data)
    } else {
      console.error(err)
    }
    return []
  }
}
