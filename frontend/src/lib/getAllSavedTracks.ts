/* eslint-disable no-unused-vars */
import axios from 'axios'
import { DateTime } from 'luxon'
import { Item, PlaylistItem, TrimmedItem } from '../types/tracksType'
import { axiosSpotifyInstance } from './axiosSpotifyInstance'

function trimItem (items: Item[]): TrimmedItem[] {
  return items.map(item => {
    const trimmedItem: TrimmedItem = {
      added_at: item.added_at,
      track: {
        href: item.track.href,
        name: item.track.name,
        previewURL: item.track.previewURL,
        uri: item.track.uri,
        id: item.track.id
      }
    }
    return trimmedItem
  })
}

export async function getSavedTracks (addTracks: (tracks: Item[]) => void) {
  // const savedItemsString = window.localStorage.getItem('items')
  // if (savedItemsString) {
  //   const savedItems: TrimmedItem[] = JSON.parse(savedItemsString)
  //   return savedItems
  // }

  try {
    let items: Item[] = []
    let response = await axiosSpotifyInstance.get<PlaylistItem>('/me/tracks?limit=50')
    items = [...items, ...response.data.items]
    addTracks(response.data.items)
    while (response.data.next) {
      response = await axiosSpotifyInstance.get<PlaylistItem>(response.data.next)
      items = [...items, ...response.data.items]
      addTracks(response.data.items)
    }
    // window.localStorage.setItem('items', JSON.stringify(trimItem(items)))
    // window.localStorage.setItem('lastItemsRefresh', DateTime.now().toISO())
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
