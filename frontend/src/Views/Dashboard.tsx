import React, { useEffect, useState } from 'react'
import { Container } from '../components/Container'
import { Dropdown } from '../components/Dropdown'
import { Item } from '../types/getPlaylistIDTracks'
import { getPlaylistSongs } from '../lib/getPlaylistSongs'
import { cloneDeep } from 'lodash'
import { DateTime } from 'luxon'
import { getSavedTracks } from '../lib/getAllSavedTracks'
import { NotFound } from '../components/NotFound'
import { Loading } from '../components/Loading'
import { Month } from '../components/Month'
import { Playlist } from '../types/getMePlaylists'
import { getPlaylists } from '../lib/getPlaylists'

type TracksType = {
  [year: string]: {
    [month: string]: {
      [playlist: string]: Item[]
    }
  }
}

const monthNames: {[key: string]: number} = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12
}

/* eslint-disable no-unused-vars */
enum errors {
  NotFound
}
/* eslint-enable no-unused-vars */

export function Dashboard () {
  const [tracks, setTracks] = useState<TracksType>({})
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<errors>()

  const now = DateTime.now().setLocale('en-GB')

  function addTracks (items: Item[], playlist: string): void {
    setTracks(prevState => {
      const tracksClone = cloneDeep(prevState)

      items.forEach(item => {
        const addedAt = DateTime.fromISO(item.added_at).setLocale('en-GB')
        if (tracksClone[`${addedAt.year}`]) {
          if (tracksClone[`${addedAt.year}`][addedAt.monthLong]) {
            if (tracksClone[`${addedAt.year}`][addedAt.monthLong][playlist]) {
              tracksClone[`${addedAt.year}`][addedAt.monthLong][playlist].push(item)
            } else {
              tracksClone[`${addedAt.year}`][addedAt.monthLong][playlist] = [item]
            }
          } else {
            tracksClone[`${addedAt.year}`][addedAt.monthLong] = {
              [playlist]: [item]
            }
          }
        } else {
          tracksClone[`${addedAt.year}`] = {
            [addedAt.monthLong]: {
              [playlist]: [item]
            }
          }
        }
      })

      return tracksClone
    })
  }

  useEffect(() => {
    (async () => {
      const playlists = await getPlaylists()
      setPlaylists(playlists)
      playlists.forEach(async playlist => await getPlaylistSongs(playlist, addTracks))
      await getSavedTracks(addTracks)
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (!loading) {
      if (Object.keys(tracks).length === 0) setError(errors.NotFound) // Nothing found at all
    }
  }, [loading])

  return <Container maxWidth="100%" disablePadding>
    {Object.keys(tracks).reverse().map(year => <Dropdown bigTitle defaultOpen={year === now.year.toString()} key={year} title={year} >
      <Container disablePaddingTopAndBottom>
        {Object.keys(tracks[year]).sort((a, b) => { return monthNames[b] - monthNames[a] }).map(month => <Month playlists={playlists} month={month} year={year} monthPlaylists={tracks[year][month]} key={`${year} ${month}`} />)}
      </Container>
    </Dropdown>)}
    {loading
      ? <Loading />
      : <>
      {error === errors.NotFound ? <NotFound /> : null}
    </>}
  </Container>
}
