import axios from 'axios'
import { ArtistExpansive, GetArtists } from '../types/artistsType'
import { axiosSpotifyInstance } from './axiosSpotifyInstance'

export async function getArtists (artists: string[], addArtists?: (artists: ArtistExpansive[]) => void) {
  let gottenArtists: ArtistExpansive[] = []
  while (artists.length > 0) {
    try {
      const response = await axiosSpotifyInstance.get<GetArtists>(`/artists?ids=${artists.splice(0, 50).join(',')}`)
      gottenArtists = [...gottenArtists, ...response.data.artists]
      if (addArtists) {
        addArtists(response.data.artists)
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.log('axiosError', err.response?.data)
      }
    }
  }
  return await Promise.resolve(gottenArtists)
}
