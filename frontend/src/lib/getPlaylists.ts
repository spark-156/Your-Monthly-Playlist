/* eslint-disable no-unused-vars */
import axios from 'axios'
import { GetMePlaylists, Playlist } from '../types/getMePlaylists'
import { GetPlaylistIDTracks, Item } from '../types/getPlaylistIDTracks'
import { axiosSpotifyInstance } from './axiosSpotifyInstance'

async function getPlaylistSongs (playlist: Playlist, addTracks: (items: Item[], playlist: string) => void) {
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

export async function getPlaylists (addTracks: (items: Item[], playlist: string) => void) {
  try {
    let response = await axiosSpotifyInstance.get<GetMePlaylists>('/me/playlists?limit=50')
    response.data.items.forEach(item => getPlaylistSongs(item, addTracks))
    while (response.data.next) {
      response = await axiosSpotifyInstance.get<GetMePlaylists>(response.data.next)
      response.data.items.forEach(item => getPlaylistSongs(item, addTracks))
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
