import axios from 'axios'
import _ from 'lodash'
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
  // create a unique array of all uris from every month (key) of the object monthPlaylists
  const uris: string[] = _
    .chain(monthPlaylists)
    .values()
    .flatten()
    .map(item => item.track.uri)
    .uniq()
    .value()

  try {
    const me = await axiosSpotifyInstance.get<Me>('/me')
    const createdPlaylist = await axiosSpotifyInstance.post<CreatedPlaylist>(`/users/${me.data.id}/playlists`, { name })
    while (uris.length > 0) {
      await addItemsToPlaylist(createdPlaylist.data.id, uris.splice(0, 100))
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
