import axios from 'axios'
import { Item, PlaylistItem } from '../types/tracksType'
import { axiosSpotifyInstance } from './axiosSpotifyInstance'

export async function getSavedTracks (addTracks: (tracks: Item[]) => void) {
  try {
    // TODO get all playlists and all songs from playlists as well
    let items: Item[] = []
    let response = await axiosSpotifyInstance.get<PlaylistItem>('/me/tracks?limit=50')
    items = [...items, ...response.data.items]
    addTracks(response.data.items)
    while (response.data.next) {
      response = await axiosSpotifyInstance.get<PlaylistItem>(response.data.next)
      items = [...items, ...response.data.items]
      addTracks(response.data.items)
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
