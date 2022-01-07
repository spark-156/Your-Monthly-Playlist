import _ from 'lodash'
import { Item } from '../types/getPlaylistIDTracks'
import { getArtists } from './getArtists'

export async function getTopGenres (monthPlaylists: { [playlist: string]: Item[] }) {
  const artistIds: string[] = _
    .chain(monthPlaylists)
    .values()
    .flatten()
    .map(song => song.track.artists)
    .flatten()
    .map(artist => artist.id)
    .value()
  const uniqueArtistIds: string[] = _.uniq(artistIds)
  const uniqueArtists = await getArtists([...uniqueArtistIds])
  const genresList: string[] = []
  uniqueArtistIds.forEach(id => {
    uniqueArtists.filter(artist => artist.id === id).forEach(artist => artist.genres.forEach(genre => genresList.push(genre)))
  })
  const genres: {[key: string]: number} = {}
  for (const genre of genresList) {
    genres[genre] = genres[genre] ? genres[genre] + 1 : 1
  }
  const items: [string, number][] = Object.keys(genres).map(key => [key, genres[key]])
  return items.sort((first, second) => second[1] - first[1]).slice(0, 5).map(item => item[0])
}
