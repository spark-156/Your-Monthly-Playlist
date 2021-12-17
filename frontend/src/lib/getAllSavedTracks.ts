import axios from 'axios'
import { PlaylistItem, Tracks } from '../types/tracksType'
import { axiosSpotifyInstance } from './axiosSpotifyInstance'

export async function getSavedTracks (addTracks: (tracks: PlaylistItem[]) => void) {
  try {
    let response = await axiosSpotifyInstance.get<Tracks>('/me/tracks?limit=50')
    addTracks(response.data.items)
    while (response.data.next) {
      response = await axiosSpotifyInstance.get<Tracks>(response.data.next)
      addTracks(response.data.items)
    }
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      console.log('axiosError')
      console.log(err.response?.data)
    } else {
      console.error(err)
    }
  }
}
