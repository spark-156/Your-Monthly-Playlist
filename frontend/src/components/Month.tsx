/* eslint-disable no-unused-vars */
import _ from 'lodash'
import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'
import { createPlaylist } from '../lib/createPlaylist'
import { getTopGenres } from '../lib/getTopGenres'
import { updatePlaylist } from '../lib/updatePlaylis'
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
  const [monthPlaylist, setMonthPlaylist] = useState<Playlist | undefined>(playlists.filter(playlist => playlist.name === playlistTitle)[0])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [topGenres, setTopGenres] = useState<string[]>([])
  const [loadingTopGenres, setLoadingTopGenres] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      setTopGenres(await getTopGenres(monthPlaylists))
      setLoadingTopGenres(false)
    })()
  }, [])

  return <>
    <Dropdown defaultOpen={year === now.year.toString() && month === now.monthLong} modalTitle={playlistTitle} title={month} setShowModal={setShowModal} >
      <Container disablePaddingTopAndBottom>
        <TopGenres topGenres={topGenres} loading={loadingTopGenres} />
        {Object.keys(monthPlaylists).map(playlistName => <SongList key={`${year}${month}${playlistName}`} title={playlistName} items={monthPlaylists[playlistName]} />) }
      </Container>
    </Dropdown>
    <Modal title={playlistTitle} show={showModal} onClose={() => setShowModal(false)}>
      {!monthPlaylist ? <TextDiv fontSize='24px' clickable onClick={async () => { setMonthPlaylist(await createPlaylist(playlistTitle, monthPlaylists)); setShowModal(false) }}>Create playlist</TextDiv> : null}
      {monthPlaylist ? <TextDiv fontSize='24px' clickable onClick={() => { updatePlaylist(monthPlaylist.id, monthPlaylists); setShowModal(false) }}>Update playlist</TextDiv> : null}
    </Modal>
  </>
}
