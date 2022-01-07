import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { createPlaylist } from '../lib/createPlaylist'
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
  // eslint-disable-next-line no-unused-vars
  const [monthPlaylist, setMonthPlaylist] = useState(playlists.filter(playlist => playlist.name === playlistTitle))
  const [showModal, setShowModal] = useState<boolean>(false)

  return <>
    <Dropdown defaultOpen={year === now.year.toString() && month === now.monthLong} modalTitle={playlistTitle} title={month} setShowModal={setShowModal} >
      <Container disablePaddingTopAndBottom>
        <TopGenres month={monthPlaylists} />
        {Object.keys(monthPlaylists).map(playlistName => <SongList key={`${year}${month}${playlistName}`} title={playlistName} items={monthPlaylists[playlistName]} />) }
      </Container>
    </Dropdown>
    <Modal title={''} show={showModal} onClose={() => setShowModal(false)}>
      <TextDiv fontSize='24px' clickable onClick={() => createPlaylist(playlistTitle, monthPlaylists)}>Create playlist</TextDiv>
    </Modal>
  </>
}
