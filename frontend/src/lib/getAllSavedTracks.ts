import axios from 'axios'
import { Item, GetPlaylistIDTracks } from '../types/getPlaylistIDTracks'
import { axiosSpotifyInstance } from './axiosSpotifyInstance'

export async function getSavedTracks (addTracks: (items: Item[], playlist: string) => void) {
  try {
    let items: Item[] = []
    let response = await axiosSpotifyInstance.get<GetPlaylistIDTracks>('/me/tracks?limit=50')
    items = [...items, ...response.data.items]
    addTracks(response.data.items, 'Liked Songs')
    while (response.data.next) {
      response = await axiosSpotifyInstance.get<GetPlaylistIDTracks>(response.data.next)
      items = [...items, ...response.data.items]
      addTracks(response.data.items, 'Liked Songs')
    }
    return items
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
