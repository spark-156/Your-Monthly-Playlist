/* eslint-disable no-unused-vars */
import _ from 'lodash'
import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'
import { createPlaylist } from '../lib/createPlaylist'
import { getArtists } from '../lib/getArtists'
import { Playlist } from '../types/getMePlaylists'
import { Item } from '../types/getPlaylistIDTracks'
import { Container } from './Container'
import { Dropdown } from './Dropdown'
import { Modal } from './Modal'
import { SongList } from './SongList'
import { TextDiv } from './TextDiv'
import { TopGenres } from './TopGenres'

interface MonthProps extends React.HTMLAttributes<HTMLDivElement> {
  year: string,
  month: string,
  monthPlaylists: {
    [playlist: string]: Item[]
  },
  playlists: Playlist[],
}

export function Month ({ playlists, year, month, monthPlaylists }: MonthProps) {
  const now = DateTime.now().setLocale('en-GB')
  const playlistTitle = `${month} ${year}`
  const [monthPlaylist, setMonthPlaylist] = useState(playlists.filter(playlist => playlist.name === playlistTitle))
  const [showModal, setShowModal] = useState<boolean>(false)
  const [topGenres, setTopGenres] = useState<string[]>([])
  const [loadingTopGenres, setLoadingTopGenres] = useState<boolean>(true)

  useEffect(() => {
    async function get () {
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
      setTopGenres(items.sort((first, second) => second[1] - first[1]).slice(0, 5).map(item => item[0]))
      setLoadingTopGenres(false)
    }
    get()
  }, [])

  return <>
    <Dropdown defaultOpen={year === now.year.toString() && month === now.monthLong} modalTitle={playlistTitle} title={month} setShowModal={setShowModal} >
      <Container disablePaddingTopAndBottom>
        <TopGenres topGenres={topGenres} loading={loadingTopGenres} />
        {Object.keys(monthPlaylists).map(playlistName => <SongList key={`${year}${month}${playlistName}`} title={playlistName} items={monthPlaylists[playlistName]} />) }
      </Container>
    </Dropdown>
    <Modal title={playlistTitle} show={showModal} onClose={() => setShowModal(false)}>
      <TextDiv fontSize='24px' clickable onClick={() => createPlaylist(playlistTitle, monthPlaylists)}>Create playlist</TextDiv>
    </Modal>
  </>
}
