/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/Container'
import { TitleDiv } from '../components/TitleDiv'
import { axiosSpotifyInstance } from '../lib/axiosSpotifyInstance'
import { Item } from '../types/tracksType'
import { Me } from '../types/meType'
import { getSavedTracks } from '../lib/getAllSavedTracks'
import { DateTime } from 'luxon'
import { Dropdown } from '../components/Dropdown'

export function Dashboard () {
  const [me, setMe] = useState<Me>()
  const [tracks, setTracks] = useState<{ [key: string]: Item[]}>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [months, setMonths] = useState<string[]>([])

  const currentDateTime = DateTime.now()

  function addTracks (items: Item[]): void {
    setTracks(prevState => {
      items.forEach(item => {
        const itemDate = DateTime.fromISO(item.added_at)
        const itemDateString = `${itemDate.monthLong} ${itemDate.year}`
        if (prevState[itemDateString]) {
          prevState[itemDateString] = [item, ...prevState[itemDateString]]
        } else {
          prevState[itemDateString] = [item]
        }
      })
      setMonths(Object.keys(prevState))
      return prevState
    })
  }

  useEffect(() => {
    async function getData () {
      try {
        const me = await axiosSpotifyInstance.get<Me>('/me')
        setMe(me.data)
        await getSavedTracks(addTracks)
        setLoading(false)
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          console.log('axiosError')
          console.log(err.response?.data)
        } else {
          console.error(err)
        }
      }
    }
    getData()
  }, [])

  useEffect(() => {
    console.log({ me, tracks })
    let count = 0
    Object.keys(tracks).forEach(key => { count += tracks[key].length })
    console.log(Object.keys(tracks), count)
  }, [me, tracks])

  return <Container maxWidth="100%" disablePadding>
    <TitleDiv>{me?.display_name}</TitleDiv>
    {months.map(key => <Dropdown key={key} date={key} items={tracks[key]} />)}
  </Container>
}
