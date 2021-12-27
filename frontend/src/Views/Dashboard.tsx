/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/Container'
import { Dropdown } from '../components/Dropdown'
import { Loading } from '../components/Loading'
import { Item } from '../types/getPlaylistIDTracks'
import { getPlaylists } from '../lib/getPlaylists'
import { cloneDeep } from 'lodash'

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

  function addTrack (year: string, month: string, playlist:string, item: Item): void {
    setTracks(prevState => {
      const tracksClone = cloneDeep(prevState)

      if (tracksClone[year]) {
        if (tracksClone[year][month]) {
          if (tracksClone[year][month][playlist]) {
            tracksClone[year][month][playlist].push(item)
          } else {
            tracksClone[year][month][playlist] = [item]
          }
        } else {
          tracksClone[year][month] = {
            [playlist]: [item]
          }
        }
      } else {
        tracksClone[year] = {
          [month]: {
            [playlist]: [item]
          }
        }
      }
      return tracksClone
    })
  }

  useEffect(() => {
    (async () => {
      await getPlaylists(addTrack)
      setLoading(false)
    })()
  }, [])

  return <Container maxWidth="100%" disablePadding>
    {Object.keys(tracks).map(year => <Dropdown key={year} title={year}>
      hi im here
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
