import React, { useEffect, useState } from 'react'
import { Item } from '../types/tracksType'
import { Container } from './Container'
import { TitleDiv } from './TitleDiv'
import { TopGenres } from './TopGenres'
import { SavedSongs } from './SavedSongs'

import styles from '../styles/Dropdown.module.css'
import { Arrow, ArrowDirectionEnum } from './Arrow'
import { DateTime } from 'luxon'
// import { Dots } from './Dots'

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  date: string,
  items: Item[]
}

export function Dropdown ({ date, items }: DropdownProps) {
  const [showItems, setShowItems] = useState<boolean>(false)
  const artistsIds: string[] = []
  items.forEach(item => item.track.artists.forEach(artist => artistsIds.push(artist.id)))

  useEffect(() => {
    const now = DateTime.now()
    if (`${now.monthLong} ${now.year}` === date) {
      setShowItems(true)
    }
  }, [])

  return <>
    <Container onClick={() => setShowItems(prevState => !prevState)} disablePadding className={styles.dropdown} >
      <TitleDiv className={styles.date} fontSize='24px'>{date}</TitleDiv>
      {/* <Dots className={styles.dots} onClick={() => console.log('clicked')}/> */}
      <Arrow className={styles.arrowButton} direction={showItems ? ArrowDirectionEnum.Up : ArrowDirectionEnum.Down} />
    </Container>
    {showItems
      ? <><TopGenres artistsIds={artistsIds} /><SavedSongs items={items}/></>
      : null}
  </>
}
