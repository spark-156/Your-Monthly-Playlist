import axios from 'axios'
import _ from 'lodash'
import { Playlist } from '../types/getMePlaylists'
import { Item } from '../types/getPlaylistIDTracks'
import { Me } from '../types/meType'
import { axiosSpotifyInstance } from './axiosSpotifyInstance'
import { putItemsInPlaylist } from './putItemsInPlaylist'

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
    const response = await axiosSpotifyInstance.post<Playlist>(`/users/${me.data.id}/playlists`, { name })
    while (uris.length > 0) {
      await putItemsInPlaylist(response.data.id, uris.splice(0, 100))
    }
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
