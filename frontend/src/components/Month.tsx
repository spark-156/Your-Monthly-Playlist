/* eslint-disable no-unused-vars */
import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'
import { Playlist } from '../types/getMePlaylists'
import { Item } from '../types/getPlaylistIDTracks'
import { Container } from './Container'
import { Dropdown } from './Dropdown'
import { SongList } from './SongList'
import { TopGenres } from './TopGenres'

interface MonthProps extends React.HTMLAttributes<HTMLDivElement> {
  year: string,
  month: string,
  monthPlaylists: {
    [playlist: string]: Item[]
  },
  playlists: Playlist[],
}

export function Month ({ playlists, year, month, monthPlaylists, ...props }: MonthProps) {
  const now = DateTime.now().setLocale('en-GB')
  const [monthPlaylist, setMonthPlaylist] = useState(playlists.filter(playlist => playlist.name === `${month} ${year}`))

  console.log(monthPlaylist)

  return <Dropdown monthPlaylists={monthPlaylists} defaultOpen={year === now.year.toString() && month === now.monthLong} modalTitle={`${month} ${year}`} title={month} >
    <Container disablePaddingTopAndBottom>
      <TopGenres month={monthPlaylists} />
      {Object.keys(monthPlaylists).map(playlistName => <SongList key={`${year}${month}${playlistName}`} title={playlistName} items={monthPlaylists[playlistName]} />) }
    </Container>
  </Dropdown>
}
