import React, { useState } from 'react'
import { Item } from '../types/getPlaylistIDTracks'
import { Song } from './Song'
import { TitleDiv } from './TitleDiv'
import { Container, ContainerDirectionEnum } from './Container'
import { TextDiv } from './TextDiv'

interface SavedSongsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Item[],
  title: string
}

export function SongList ({ items, title }: SavedSongsProps) {
  const [savedSongs] = useState(items.filter((item, index) => items.indexOf(item) === index))

  return <Container disablePadding>
    <TitleDiv fontSize='20px'>{title}</TitleDiv>
    <TextDiv>You added {items.length} song{items.length > 1 ? 's' : null} to this playlist</TextDiv>
    <Container style={{ paddingTop: 0 }} direction={ContainerDirectionEnum.Right}>
      {savedSongs.map(savedSong => <Song
      key={savedSong.track.id}
      imageSrc={savedSong.track.album.images[0].url}
      songTitle={savedSong.track.name}
      artists={savedSong.track.artists.map(artist => artist.name)} />)}
    </Container>
  </Container>
}
