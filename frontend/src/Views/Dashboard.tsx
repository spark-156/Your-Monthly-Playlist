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

export function Dashboard () {
  const [me, setMe] = useState<Me>()
  const [tracks, setTracks] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const currentDateTime = DateTime.now()

  useEffect(() => {
    async function getData () {
      try {
        const me = await axiosSpotifyInstance.get<Me>('/me')
        setMe(me.data)
        setTracks(await getSavedTracks(tracks => setTracks((prevState) => [...prevState, ...tracks])))
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
  }, [me, tracks])

  if (loading) return <Container maxWidth="100%" disablePadding><TitleDiv>Loading...</TitleDiv></Container>

  return <Container maxWidth="100%" disablePadding>
    <TitleDiv>{me?.display_name}</TitleDiv>

  </Container>
}
