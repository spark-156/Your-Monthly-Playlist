/* eslint-disable no-unused-vars */
import axios from 'axios'
import { DateTime } from 'luxon'
import { GetMePlaylists, Playlist } from '../types/getMePlaylists'
import { GetPlaylistIDTracks, Item } from '../types/getPlaylistIDTracks'
import { axiosSpotifyInstance } from './axiosSpotifyInstance'

export function saveItem (item: Item, playlistName: string, addTrack: (year: string, month: string, playlist:string, item: Item) => void) {
  const addedAt = DateTime.fromISO(item.added_at)
  addTrack(`${addedAt.year}`, addedAt.monthLong, playlistName, item)
}

async function getPlaylistSongs (playlist: Playlist, addTrack: (year: string, month: string, playlist:string, item: Item) => void) {
  try {
    let response = await axiosSpotifyInstance.get<GetPlaylistIDTracks>(playlist.tracks.href)
    response.data.items.forEach(item => saveItem(item, playlist.name, addTrack))
    while (response.data.next) {
      response = await axiosSpotifyInstance.get<GetPlaylistIDTracks>(response.data.next)
      response.data.items.forEach(item => saveItem(item, playlist.name, addTrack))
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

export async function getPlaylists (addTrack: (year: string, month: string, playlist:string, item: Item) => void) {
  try {
    let response = await axiosSpotifyInstance.get<GetMePlaylists>('/me/playlists?limit=50')
    response.data.items.forEach(item => getPlaylistSongs(item, addTrack))
    while (response.data.next) {
      response = await axiosSpotifyInstance.get<GetMePlaylists>(response.data.next)
      response.data.items.forEach(item => getPlaylistSongs(item, addTrack))
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
