import axios from 'axios'
import { Playlist } from '../types/getMePlaylists'
import { GetPlaylistIDTracks, Item } from '../types/getPlaylistIDTracks'
import { axiosSpotifyInstance } from './axiosSpotifyInstance'

export async function getPlaylistSongs (playlist: Playlist, addTracks: (items: Item[], playlist: string) => void) {
  try {
    let response = await axiosSpotifyInstance.get<GetPlaylistIDTracks>(playlist.tracks.href)
    addTracks(response.data.items, playlist.name)
    while (response.data.next) {
      response = await axiosSpotifyInstance.get<GetPlaylistIDTracks>(response.data.next)
      addTracks(response.data.items, playlist.name)
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

// export async function  (addTracks: (items: Item[], playlist: string) => void) {
//   try {
//     let playlists: Playlist[] = []
//     let response = await axiosSpotifyInstance.get<GetMePlaylists>('/me/playlists?limit=50')
//     playlists = playlists.concat(response.data.items)
//     response.data.items.forEach(async item => await getSongsFromPlaylist(item, addTracks))
//     while (response.data.next) {
//       response = await axiosSpotifyInstance.get<GetMePlaylists>(response.data.next)
//       playlists = playlists.concat(response.data.items)
//       response.data.items.forEach(async item => await getSongsFromPlaylist(item, addTracks))
//     }
//     return playlists
//   } catch (err: any) {
//     if (axios.isAxiosError(err)) {
//       console.log('axiosError')
//       console.log(err.response?.data)
//     } else {
//       console.error(err)
//     }
//     return []
//   }
// }
