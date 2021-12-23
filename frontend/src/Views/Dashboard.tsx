import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/Container'
import { Item } from '../types/tracksType'
import { getSavedTracks } from '../lib/getAllSavedTracks'
import { DateTime } from 'luxon'
import { Dropdown } from '../components/Dropdown'
import { Loading } from '../components/Loading'

export function Dashboard () {
  const [tracks, setTracks] = useState<{ [key: string]: Item[]}>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [months, setMonths] = useState<string[]>([])

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

  return <Container maxWidth="100%" disablePadding>
    {loading
      ? <>{months.slice(0, -1).map(key => <Dropdown key={key} date={key} items={tracks[key]} />)}<Loading /></>
      : months.map(key => <Dropdown key={key} date={key} items={tracks[key]} />)}
  </Container>
}
