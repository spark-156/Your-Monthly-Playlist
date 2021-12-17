/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/Container'
import { TitleDiv } from '../components/TitleDiv'
import { axiosSpotifyInstance } from '../lib/axiosSpotifyInstance'
import { PlaylistItem } from '../types/tracksType'
import { Me } from '../types/meType'
import { getSavedTracks } from '../lib/getAllSavedTracks'

export function Dashboard () {
  const [me, setMe] = useState<Me>()
  const [tracks, setTracks] = useState<PlaylistItem[]>([])

  function addTracks (tracks: PlaylistItem[]) {
    setTracks(prevState => [...tracks, ...prevState])
  }

  useEffect(() => {
    async function getData () {
      try {
        const me = await axiosSpotifyInstance.get<Me>('/me')
        setMe(me.data)
        getSavedTracks(addTracks)
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

  return <Container maxWidth="100%" disablePadding>
    <TitleDiv>{me?.display_name}</TitleDiv>

  </Container>
}
