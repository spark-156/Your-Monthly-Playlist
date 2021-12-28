/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/Container'
import { Dropdown } from '../components/Dropdown'
import { Loading } from '../components/Loading'
import { Item } from '../types/getPlaylistIDTracks'
import { getPlaylists } from '../lib/getPlaylists'
import { cloneDeep } from 'lodash'
import { DateTime } from 'luxon'

type TracksType = {
  [year: string]: {
    [month: string]: {
      [playlist: string]: Item[]
    }
  }
}

export function Dashboard () {
  const [tracks, setTracks] = useState<TracksType>({})
  const [loading, setLoading] = useState<boolean>(true)

  function addTracks (items: Item[], playlist: string): void {
    setTracks(prevState => {
      const tracksClone = cloneDeep(prevState)

      items.forEach(item => {
        const addedAt = DateTime.fromISO(item.added_at)
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
      await getPlaylists(addTracks)
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    Object.keys(tracks).map(key => console.log(tracks[key]))
  }, [tracks])

  return <Container maxWidth="100%" disablePadding>
    {Object.keys(tracks).map(year => <Dropdown key={year} title={year} >

    </Dropdown>)}
    {/* {months.map((value, index, array) => {
      if (loading && index === array.length - 1) {
        return <Loading />
      } else {
        return <Dropdown key={value} date={value} items={tracks[value]} />
      }
    })} */}
  </Container>
}
