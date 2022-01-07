import _ from 'lodash'
import { Item } from '../types/getPlaylistIDTracks'
import { axiosSpotifyInstance } from './axiosSpotifyInstance'
import { formatPlaylistDescription } from './formatPlaylistDescription'
import { putItemsInPlaylist } from './putItemsInPlaylist'

export async function updatePlaylist (playlistId: string, monthPlaylists: { [playlist: string]: Item[] }, topGenres: string[]) {
  // create a unique array of all uris from every month (key) of the object monthPlaylists
  const uris: string[] = _
    .chain(monthPlaylists)
    .values()
    .flatten()
    .map(item => item.track.uri)
    .uniq()
    .value()

  console.log(formatPlaylistDescription(topGenres))
  try {
    while (uris.length > 0) {
      await putItemsInPlaylist(playlistId, uris.splice(0, 100))
      await axiosSpotifyInstance.put(`/playlists/${playlistId}`, {
        description: formatPlaylistDescription(topGenres)
      })
    }
  } catch (err: any) {
    throw new Error(err)
  }
}
