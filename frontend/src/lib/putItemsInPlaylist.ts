import { AddItemsToPlaylist } from '../types/addItemsToPlaylist'
import { axiosSpotifyInstance } from './axiosSpotifyInstance'

export async function putItemsInPlaylist (playlistId: string, uris: string[]) {
  try {
    const response = await axiosSpotifyInstance.put<AddItemsToPlaylist>(`playlists/${playlistId}/tracks`, {
      uris
    })
    return response.data
  } catch (err: any) {
    throw new Error(err)
  }
}
