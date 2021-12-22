import React from 'react'
import { Item } from '../types/tracksType'
import { Song } from './Song'
import { TitleDiv } from './TitleDiv'
import { v4 as uuidv4 } from 'uuid'
import { Container } from './Container'

interface SavedSongsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Item[]
}

export function SavedSongs ({ items }: SavedSongsProps) {
  return <Container disablePadding>
    <TitleDiv fontSize='16px'>Your saved songs:</TitleDiv>
    {items.map(item => <Song
    key={uuidv4()}
    imageSrc={item.track.album.images[0].url}
    songTitle={item.track.name}
    artists={item.track.artists} />)}
  </Container>
}
