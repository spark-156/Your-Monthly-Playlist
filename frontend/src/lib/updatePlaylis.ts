import _ from 'lodash'
import { Item } from '../types/getPlaylistIDTracks'
import { putItemsInPlaylist } from './putItemsInPlaylist'

export async function updatePlaylist (playlistId: string, monthPlaylists: { [playlist: string]: Item[] }) {
  // create a unique array of all uris from every month (key) of the object monthPlaylists
  const uris: string[] = _
    .chain(monthPlaylists)
    .values()
    .flatten()
    .map(item => item.track.uri)
    .uniq()
    .value()

  try {
    while (uris.length > 0) {
      await putItemsInPlaylist(playlistId, uris.splice(0, 100))
    }
  } catch (err: any) {
    throw new Error(err)
  }
}
