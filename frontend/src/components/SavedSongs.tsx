import React, { useState } from 'react'
import { Item } from '../types/tracksType'
import { Song } from './Song'
import { TitleDiv } from './TitleDiv'
import { Container } from './Container'

interface SavedSongsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Item[]
}

export function SavedSongs ({ items }: SavedSongsProps) {
  const [savedSongs] = useState(items.filter((item, index) => items.indexOf(item) === index))

  return <Container disablePadding>
    <TitleDiv fontSize='16px'>Your saved songs:</TitleDiv>
    {savedSongs.map(savedSong => <Song
    key={savedSong.track.id}
    imageSrc={savedSong.track.album.images[0].url}
    songTitle={savedSong.track.name}
    artists={savedSong.track.artists} />)}
  </Container>
}
