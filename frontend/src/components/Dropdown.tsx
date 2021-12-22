import React, { useState } from 'react'
import { Item } from '../types/tracksType'
import { Button } from './Button'
import { Container } from './Container'
import { TitleDiv } from './TitleDiv'
import { TopGenres } from './TopGenres'
import { Song } from './Song'
import { v4 as uuidv4 } from 'uuid'

import styles from '../styles/Dropdown.module.css'

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  date: string,
  items: Item[]
}

export function Dropdown ({ date, items }: DropdownProps) {
  const [showItems, setShowItems] = useState<boolean>(false)
  const artistsIds: string[] = []
  items.forEach(item => item.track.artists.forEach(artist => artistsIds.push(artist.id)))

  return <>
    <Container disablePadding className={styles.dropdown} >
      <TitleDiv className={styles.date} fontSize='24px'>{date}</TitleDiv>
      <Button className={styles.arrowButton} onClick={() => setShowItems(prevState => !prevState)}>Show items</Button>
    </Container>
    {showItems ? <TopGenres artistsIds={artistsIds} /> : null}
    {showItems
      ? items.map(item => <Song
      className={styles.content}
      key={uuidv4()}
      imageSrc={item.track.album.images[0].url}
      songTitle={item.track.name}
      artists={item.track.artists} />)
      : null}
  </>
}
