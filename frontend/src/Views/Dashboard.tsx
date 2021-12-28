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
import { TopGenres } from '../components/TopGenres'

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

export function Dashboard () {
  const [tracks, setTracks] = useState<TracksType>({})
  const [loading, setLoading] = useState<boolean>(true)

  const now = DateTime.now()

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
    {Object.keys(tracks).reverse().map(year => <Dropdown defaultOpen={year === now.year.toString()} key={year} title={year} >
      <Container disablePaddingTopAndBottom>
        {Object.keys(tracks[year]).sort((a, b) => { return monthNames[b] - monthNames[a] }).map(month => <Dropdown defaultOpen={year === now.year.toString() && month === now.monthLong} key={`${year}${month}`} title={month} >
            <TopGenres month={tracks[year][month]} />
        </Dropdown>)}
      </Container>
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
