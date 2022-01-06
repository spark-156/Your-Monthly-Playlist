import axios from 'axios'
import { AddItemsToPlaylist } from '../types/addItemsToPlaylist'
import { CreatedPlaylist } from '../types/createdPlaylist'
import { Item } from '../types/getPlaylistIDTracks'
import { Me } from '../types/meType'
import { axiosSpotifyInstance } from './axiosSpotifyInstance'

async function addItemsToPlaylist (id: string, uris: string[]) {
  try {
    const response = await axiosSpotifyInstance.post<AddItemsToPlaylist>(`playlists/${id}/tracks`, {
      uris,
      position: 0
    })
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log('axiosError')
      console.log(err.response?.data)
    } else {
      console.error(err)
    }
  }
}

export async function createPlaylist (name: string, monthPlaylists: { [playlist: string]: Item[] }) {
  let items: Item[] = []
  Object.keys(monthPlaylists).forEach(key => { items = items.concat(monthPlaylists[key]) })

  try {
    const me = await axiosSpotifyInstance.get<Me>('/me')
    const createdPlaylist = await axiosSpotifyInstance.post<CreatedPlaylist>(`/users/${me.data.id}/playlists`, { name })
    while (items.length > 0) {
      await addItemsToPlaylist(createdPlaylist.data.id, items.splice(0, 100).map(item => item.track.uri))
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log('axiosError')
      console.log(err.response?.data)
    } else {
      console.error(err)
    }
  }
}
