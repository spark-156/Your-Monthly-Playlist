import React, { useEffect } from 'react'
import { Container } from '../components/Container'
import { TitleDiv } from '../components/TitleDiv'
import { axiosSpotifyInstance } from '../lib/axiosSpotifyInstance'

export function Dashboard () {
  useEffect(() => {
    async function getData () {
      try {
        const response = await axiosSpotifyInstance.get('/me')
        console.log(response.data)
      } catch (e) {
        console.error(e)
      }
    }
    getData()
  }, [])

  return <Container maxWidth="100%" disablePadding>
    <TitleDiv>Dashboard</TitleDiv>
  </Container>
}
