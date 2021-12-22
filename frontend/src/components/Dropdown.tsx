import React, { useState } from 'react'
import { Item } from '../types/tracksType'
import { Container } from './Container'
import { TitleDiv } from './TitleDiv'
import { TopGenres } from './TopGenres'
import { SavedSongs } from './SavedSongs'

import styles from '../styles/Dropdown.module.css'
import { Arrow, DirectionEnum } from './Arrow'

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  date: string,
  items: Item[]
}

export function Dropdown ({ date, items }: DropdownProps) {
  const [showItems, setShowItems] = useState<boolean>(false)
  const artistsIds: string[] = []
  items.forEach(item => item.track.artists.forEach(artist => artistsIds.push(artist.id)))

  return <>
    <Container disablePadding className={styles.dropdown} onClick={() => setShowItems(prevState => !prevState)}>
      <TitleDiv className={styles.date} fontSize='24px'>{date}</TitleDiv>
      <Arrow className={styles.arrowButton} direction={showItems ? DirectionEnum.Up : DirectionEnum.Down} />
    </Container>
    {showItems
      ? <><TopGenres artistsIds={artistsIds} /><SavedSongs items={items}/></>
      : null}
  </>
}
