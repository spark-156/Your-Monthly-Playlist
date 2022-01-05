import React from 'react'
import { Container } from './Container'
import { TitleDiv } from './TitleDiv'

export function NotFound () {
  return <Container>
    <TitleDiv fontSize='20px'>It seems like you haven&apos;t added anything to your spotify library yet. Find some tunes you like and add them to your liked songs or playlists. They&apos;ll show up here when you do.</TitleDiv>
  </Container>
}
